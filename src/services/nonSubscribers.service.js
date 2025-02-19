import SibApiV3Sdk from 'sib-api-v3-sdk'
import config from '../config/config.js'
import { fetchSubscriptionOfferMailTemplate } from '../utils/fetchMailTemplate.util.js'

const subscriptionOfferMailTemplate = await fetchSubscriptionOfferMailTemplate()

const defaultClient = SibApiV3Sdk.ApiClient.instance
const apiKeyInstance = defaultClient.authentications['api-key']
apiKeyInstance.apiKey = config.emailServiceSecret

const sendNonSubscriberEmails = async (nonSubscriberEmails) => {
  if (nonSubscriberEmails.length === 0) {
    console.log('No nonsubscribers emails to send.')
    return
  }

  const emailList = nonSubscriberEmails.map((email) => ({ email }))
  const transactionalEmailsApi = new SibApiV3Sdk.TransactionalEmailsApi()

  const sendSmtpEmail = {
    sender: { name: 'Nakhlah Team', email: 'zubaer.ahmed7690@gmail.com' },
    to: emailList,
    subject: subscriptionOfferMailTemplate.subject,
    htmlContent: subscriptionOfferMailTemplate.body,
  }

  try {
    await transactionalEmailsApi.sendTransacEmail(sendSmtpEmail)
    console.log('Nonsubscribers emails sent successfully to:', nonSubscriberEmails)
  } catch (error) {
    console.error(
      'Error sending nonsubscribers emails:',
      error.response?.data || error.message
    )
  }
}

export default { sendNonSubscriberEmails }
