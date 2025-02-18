import SibApiV3Sdk from 'sib-api-v3-sdk'
import config from '../config/config.js'
import {
  fetchUsersWithProgress,
  fetchUsersWithoutProgress,
} from '../utils/fetchMailTemplate.util.js'

const usersWithProgressMailTemplate = await fetchUsersWithProgress()
const usersWithoutProgressMailTemplate = await fetchUsersWithoutProgress()

const defaultClient = SibApiV3Sdk.ApiClient.instance
const apiKeyInstance = defaultClient.authentications['api-key']
apiKeyInstance.apiKey = config.emailServiceSecret

const sendUsersProgressAndEmails = async (usersProgressAndEmails) => {
  if (usersProgressAndEmails.length === 0) {
    console.log('No emails to send.')
    return
  }
  const usersWithProgress = usersProgressAndEmails.filter(
    (user) => user.progress.length > 0
  )
  const usersWithoutProgress = usersProgressAndEmails.filter(
    (user) => user.progress.length === 0
  )
  const transactionalEmailsApi = new SibApiV3Sdk.TransactionalEmailsApi()

  const usersWithProgressEmails = usersWithProgress.map((user) => {
    const username = user.email // Using email as username
    const progressList = user.progress
      .map((p) => `<p>${p.unit} - ${p.level} - ${p.lesson}</p>`)
      .join('') // Generate progress HTML

    // Replace placeholders in the template
    const htmlContent = usersWithProgressMailTemplate.body
      .replace('{{username}}', username)
      .replace('{{progress}}', progressList)

    return {
      email: username,
      htmlContent: htmlContent,
    }
  })

  const sendSmtpEmail = {
    sender: { name: 'Nakhlah Team', email: 'zubaer.ahmed7690@gmail.com' },
    to: usersWithoutProgress,
    subject: usersWithoutProgressMailTemplate.subject,
    htmlContent: usersWithoutProgressMailTemplate.body,
  }

  try {
    await transactionalEmailsApi.sendTransacEmail(sendSmtpEmail)
    // Send emails to users with progress
    if (usersWithProgressEmails.length > 0) {
      for (let user of usersWithProgressEmails) {
        const sendSmtpEmailWithProgress = {
          sender: { name: 'Nakhlah Team', email: 'zubaer.ahmed7690@gmail.com' },
          to: [{ email: user.email }],
          subject: usersWithProgressMailTemplate.subject,
          htmlContent: user.htmlContent,
        }

        try {
          await transactionalEmailsApi.sendTransacEmail(
            sendSmtpEmailWithProgress
          )
          console.log(
            `Email sent successfully to ${user.email} with progress:`,
            user
          )
        } catch (error) {
          console.error(
            `Error sending email to ${user.email}:`,
            error.response?.data || error.message
          )
        }
      }
    }
  } catch (error) {
    console.error(
      'Error sending emails:',
      error.response?.data || error.message
    )
  }
}

export default { sendUsersProgressAndEmails }
