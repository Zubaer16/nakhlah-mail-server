import SibApiV3Sdk from 'sib-api-v3-sdk'
import config from '../config/config.js'
import { fetchStreakMissMailTemplate } from '../utils/fetchMailTemplate.util.js'

const streakMissMailTemplate = await fetchStreakMissMailTemplate()

const defaultClient = SibApiV3Sdk.ApiClient.instance
const apiKeyInstance = defaultClient.authentications['api-key']
apiKeyInstance.apiKey = config.emailServiceSecret

const sendStreakMissedUsersEmails = async (streakMissedUsersEmails) => {
  if (streakMissedUsersEmails.length === 0) {
    console.log('No emails to send.')
    return
  }

  const emailList = streakMissedUsersEmails.map((email) => ({ email }))
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
