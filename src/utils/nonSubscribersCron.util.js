import axios from 'axios'
import config from '../config/config.js'
import emailService from '../services/nonSubscribers.service.js'

const fetchNonSubscribers = async (pageSize, pageIndex) => {
  try {
    console.log(`Fetching data for page ${pageIndex} with size ${pageSize}`)
    const { data } = await axios.get(config.nonSubscribersListApi.url, {
      params: {
        'pagination[pageSize]': pageSize, // Using pagination[pageSize]
        'pagination[page]': pageIndex, // API pagination parameter for page size
      },
      headers: { Authorization: `Bearer ${config.token}` },
    })

    return data.data // return non-subscriber data from the page
  } catch (error) {
    console.error(
      'Error fetching subscriptions:',
      error.response?.data || error.message
    )
    throw error
  }
}

const getPageCount = async (pageSize) => {
  try {
    const { data } = await axios.get(config.nonSubscribersListApi.url, {
      params: {
        'pagination[pageSize]': pageSize, // Using pagination[pageSize]
        'pagination[page]': 1, // Use the same page size
      },
      headers: { Authorization: `Bearer ${config.token}` },
    })

    const totalPages = data.meta.pagination.pageCount // Calculate total pages
    console.log(`Total pages to fetch: ${totalPages}`)
    return totalPages
  } catch (error) {
    console.error(
      'Error fetching page count:',
      error.response?.data || error.message
    )
    throw error
  }
}
// const fetchNon

const processNonSubscriberEmails = async (pageSize) => {
  try {
    // Get the total number of pages dynamically from the API
    // const pageCount = await getPageCount(pageSize)
    const pageCount = 1

    // Loop through each page and send emails
    for (let pageIndex = 1; pageIndex <= pageCount; pageIndex++) {
      console.log(`Processing page ${pageIndex} of ${pageCount}...`)
      // const emails = await fetchNonSubscribers(pageSize, pageIndex)
      const emails = ['zubaer.ahmed7690@gmail.com', 'zubaer.16@gmail.com']

      if (emails.length > 0) {
        await emailService.sendNonSubscriberEmails(emails)
        console.log(`emails are ${emails}`)
        console.log(`Successfully sent emails for page ${pageIndex}`)
      } else {
        console.log(`No emails found for page ${pageIndex}`)
      }
    }
  } catch (error) {
    console.error('Error processing subscriptions:', error.message)
  }
}

export default { processNonSubscriberEmails }
