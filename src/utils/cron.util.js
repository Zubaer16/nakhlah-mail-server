import axios from 'axios'
import config from '../config/config.js'
import emailService from '../services/email.service.js'
import { $generateHtmlFromNodes } from '@lexical/html'

const fetchNonSubscribers = async () => {
  try {
    const { data } = await axios.get(config.nonSubscriberApi.url, {
      headers: { Authorization: `Bearer ${config.nonSubscriberApi.token}` },
    })
    return data.data
  } catch (error) {
    console.error(
      'Error fetching subscriptions:',
      error.response?.data || error.message
    )
    throw error
  }
}

// const fetchNon

const processNonSubscriberEmails = async () => {
  try {
    const emails = await fetchNonSubscribers()
    await emailService.sendNonSubscriberEmails(emails)
  } catch (error) {
    console.error('Error processing subscriptions:', error.message)
  }
}

export default { processNonSubscriberEmails }
