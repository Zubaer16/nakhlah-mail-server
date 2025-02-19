import SibApiV3Sdk from 'sib-api-v3-sdk'
import config from '../config/config.js'
import {
  fetchUsersSubscriptionDaysLeft
} from '../utils/fetchMailTemplate.util.js'

const usersSubscriptionDaysLeftMailTemplate = await fetchUsersSubscriptionDaysLeft()

const defaultClient = SibApiV3Sdk.ApiClient.instance
const apiKeyInstance = defaultClient.authentications['api-key']
apiKeyInstance.apiKey = config.emailServiceSecret

const sendUsersSubscriptionDaysLeft = async (usersSubscriptionDaysLeft) => {
  if (usersSubscriptionDaysLeft.length === 0) {
    console.log('No subscription days left emails to send.')
    return
  }

  const transactionalEmailsApi = new SibApiV3Sdk.TransactionalEmailsApi()

  const usersSubscriptionDaysLeftEmails = usersSubscriptionDaysLeft.map((user) => {
    const username = user.email // Using email as username
    const daysLeft = user.daysLeft

    // Replace placeholders in the template
    const htmlContent = usersSubscriptionDaysLeftMailTemplate.body
      .replace('{{username}}', username)
      .replace('{{X}}', daysLeft)

    return {
      email: username,
      htmlContent: htmlContent,
    }
  })

  

  try {
   
   
    // Send emails to users with minimum days left for subscription
    if (usersSubscriptionDaysLeftEmails.length > 0) {
      for (let user of usersSubscriptionDaysLeftEmails) {
        const sendSmtpEmailWithProgress = {
          sender: { name: 'Nakhlah Team', email: 'zubaer.ahmed7690@gmail.com' },
          to: [{ email: user.email }],
          subject: usersSubscriptionDaysLeftMailTemplate.subject,
          htmlContent: user.htmlContent,
        }

        try {
          await transactionalEmailsApi.sendTransacEmail(
            sendSmtpEmailWithProgress
          )
          console.log(
            `Subscription days left emails sent successfully to ${user.email}`,
            
          )
        } catch (error) {
          console.error(
            `Error sending subscription days left emails to ${user.email}:`,
            error.response?.data || error.message
          )
        }
      }
    }
  } catch (error) {
    console.error(
      'Error sending subscription days left emails:',
      error.response?.data || error.message
    )
  }
}

export default { sendUsersSubscriptionDaysLeft }
