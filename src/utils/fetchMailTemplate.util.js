import axios from 'axios'
import config from '../config/config.js'

const fetchSubscriptionOfferMailTemplate = async () => {
  try {
    const { data } = await axios.get(
      config.mailTemplateApi.subscriptionOfferMailTemplateApi.url,
      {
        headers: { Authorization: `Bearer ${config.token}` },
      }
    )
    const template = {
      subject: data.data.attributes.subject,
      body: data.data.attributes.body,
    }
    return template // return non-subscriber data from the page
  } catch (error) {
    console.error(
      'Error fetching subscription offer:',
      error.response?.data || error.message
    )
    throw error
  }
}

const fetchStreakMissMailTemplate = async () => {
  try {
    const { data } = await axios.get(
      config.mailTemplateApi.streakMissMailTemplateApi.url,
      {
        headers: { Authorization: `Bearer ${config.token}` },
      }
    )
    const template = {
      subject: data.data.attributes.subject,
      body: data.data.attributes.body,
    }
    return template // return non-subscriber data from the page
  } catch (error) {
    console.error(
      'Error fetching subscription offer:',
      error.response?.data || error.message
    )
    throw error
  }
}

export { fetchSubscriptionOfferMailTemplate, fetchStreakMissMailTemplate }
