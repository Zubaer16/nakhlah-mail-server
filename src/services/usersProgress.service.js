import SibApiV3Sdk from 'sib-api-v3-sdk'
import config from '../config/config.js'
import { fetchStreakMissMailTemplate } from '../utils/fetchMailTemplate.util.js'

// const streakMissMailTemplate = await fetchStreakMissMailTemplate()

const defaultClient = SibApiV3Sdk.ApiClient.instance
const apiKeyInstance = defaultClient.authentications['api-key']
apiKeyInstance.apiKey = config.emailServiceSecret

const sendUsersProgressAndEmails = async (usersProgressAndEmails) => {
  if (usersProgressAndEmails.email.length === 0) {
    console.log('No emails to send.')
    return
  }
  // Separate users with and without progress
  const usersWithProgress = {
    email: [],
    progress: [],
  }
  const usersWithoutProgress = {
    email: [],
    progress: [],
  }

  // Iterate through emails and progress arrays together
  usersProgressAndEmails.email.forEach((email, index) => {
    if (
      usersProgressAndEmails.progress[index] &&
      usersProgressAndEmails.progress[index].length > 0
    ) {
      usersWithProgress.email.push(email)
      usersWithProgress.progress.push(usersProgressAndEmails.progress[index])
    } else {
      usersWithoutProgress.email.push(email)
      usersWithoutProgress.progress.push([])
    }
  })

  console.log('Users with progress:', usersWithProgress)
  console.log('Users without progress:', usersWithoutProgress)
  const emailListWithProgress = usersWithProgress.email.map((email, index) => ({
    email,
    progress: usersProgressAndEmails.progress[index] || [],
  }))
  const emailListWithoutProgress = usersWithoutProgress.email.map(
    (email, index) => ({
      email,
      progress: usersProgressAndEmails.progress[index] || [],
    })
  )
  const transactionalEmailsApi = new SibApiV3Sdk.TransactionalEmailsApi()

  const sendSmtpEmail = {
    sender: { name: 'Nakhlah Team', email: 'zubaer.ahmed7690@gmail.com' },
    to: emailList,
    subject: streakMissMailTemplate.subject,
    htmlContent: streakMissMailTemplate.body,
  }

  try {
    await transactionalEmailsApi.sendTransacEmail(sendSmtpEmail)
    console.log('Emails sent successfully to:', streakMissedUsersEmails)
  } catch (error) {
    console.error(
      'Error sending emails:',
      error.response?.data || error.message
    )
  }
}

export default { sendStreakMissedUsersEmails }
