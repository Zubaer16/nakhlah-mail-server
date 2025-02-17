import SibApiV3Sdk from 'sib-api-v3-sdk'
import config from '../config/config.js'
import { fetchSubscriptionOffer } from '../utils/fetchMailTemplate.util.js'

const subscriptionOffer = await fetchSubscriptionOffer()

const defaultClient = SibApiV3Sdk.ApiClient.instance
const apiKeyInstance = defaultClient.authentications['api-key']
apiKeyInstance.apiKey = config.emailServiceSecret

const sendNonSubscriberEmails = async (nonSubscriberEmails) => {
  if (nonSubscriberEmails.length === 0) {
    console.log('No emails to send.')
    return
  }

  const emailList = nonSubscriberEmails.map((email) => ({ email }))
  const transactionalEmailsApi = new SibApiV3Sdk.TransactionalEmailsApi()

  const sendSmtpEmail = {
    sender: { name: 'Nakhlah Team', email: 'zubaer.ahmed7690@gmail.com' },
    to: emailList,
    subject: subscriptionOffer.subject,
    htmlContent: subscriptionOffer.body,
  }

  try {
    await transactionalEmailsApi.sendTransacEmail(sendSmtpEmail)
    console.log('Emails sent successfully to:', nonSubscriberEmails)
  } catch (error) {
    console.error(
      'Error sending emails:',
      error.response?.data || error.message
    )
  }
}

export default { sendNonSubscriberEmails }
