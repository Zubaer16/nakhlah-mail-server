import SibApiV3Sdk from 'sib-api-v3-sdk'
import config from '../config/config.js'

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
    subject: 'Embark on Your Arabic Learning Journey with Nakhlah! 🌟',
    //     htmlContent: ` <table style="width: 100%; font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    //   <tr>
    //     <td>
    //       <h1 style="font-size: 24px; color: #333; margin-bottom: 20px;">Discover the Art of Arabic with Nakhlah 🌟</h1>
    //     </td>
    //   </tr>
    //   <tr>
    //     <td>
    //       <p style="margin-bottom: 20px;">
    //         <strong><em>Are you ready to embark on a journey to learn Arabic and unlock new opportunities?</em></strong>
    //         Nakhlah is your gateway to mastering Arabic efficiently and beautifully.
    //       </p>
    //     </td>
    //   </tr>
    //   <tr>
    //     <td>
    //       <p style="margin-bottom: 20px;">
    //         <strong><em>Whether you are a beginner or looking to refine your skills, Nakhlah offers:</em></strong>
    //       </p>
    //       <ul style="margin: 0; padding-left: 20px; margin-bottom: 20px;">
    //         <li style="margin-bottom: 10px;">Interactive Learning Tools</li>
    //         <li style="margin-bottom: 10px;">Expert-Curated Lessons</li>
    //         <li>Flexible Learning Paths</li>
    //       </ul>
    //     </td>
    //   </tr>
    //   <tr>
    //     <td>
    //       <p style="margin-bottom: 20px;">
    //         Join thousands of learners and take the first step today!
    //         <a href="https://nakhlah.com/subscribe" style="color: #0066cc; text-decoration: none;">Subscribe Now</a>
    //       </p>
    //     </td>
    //   </tr>
    //   <tr>
    //     <td>
    //       <p style="margin-bottom: 20px;">
    //         Experience a platform designed to make Arabic learning easy, engaging, and enjoyable.
    //       </p>
    //     </td>
    //   </tr>
    //   <tr>
    //     <td>
    //       <p style="margin-bottom: 20px; font-style: italic;">We can’t wait to have you with us!</p>
    //     </td>
    //   </tr>
    //   <tr>
    //     <td>
    //       <p style="margin-bottom: 5px; font-weight: bold;">Warm regards,</p>
    //       <p>The Nakhlah Team</p>
    //     </td>
    //   </tr>
    // </table>
    // `, // Use the provided HTML content here.
    htmlContent: generateEmailHtml(),
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
