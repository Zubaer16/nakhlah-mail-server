import axios from 'axios'
import config from '../config/config.js'
import emailService from '../services/usersProgress.service.js'

const fetchUsersProgressAndEmails = async (pageSize, pageIndex) => {
  try {
    console.log(`Fetching data for page ${pageIndex} with size ${pageSize}`)
    const { data } = await axios.get(config.usersProgressListApi.url, {
      params: {
        'pagination[pageSize]': pageSize, // Using pagination[pageSize]
        'pagination[page]': pageIndex, // API pagination parameter for page size
      },
      headers: { Authorization: `Bearer ${config.token}` },
    })

    return data.data // return non-subscriber data from the page
  } catch (error) {
    console.error(
      'Error fetching users progress:',
      error.response?.data || error.message
    )
    throw error
  }
}

const getPageCount = async (pageSize) => {
  try {
    const { data } = await axios.get(config.usersProgressListApi.url, {
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

const processUsersProgressAndEmails = async (pageSize) => {
  try {
    // Get the total number of pages dynamically from the API
    const pageCount = await getPageCount(pageSize)
    // const pageCount = 1

    // Loop through each page and send emails
    for (let pageIndex = 1; pageIndex <= pageCount; pageIndex++) {
      console.log(`Processing page ${pageIndex} of ${pageCount}...`)
      // const emails = await fetchUsersProgressAndEmails(pageSize, pageIndex)
      const emails = [
        {
          email: 'zubaer.ahmed7690@gmail.com',
          progress: [
            {
              unit: 'Meet and Greet',
              level: 'Task 01',
              lesson: 'Lesson 02',
            },
          ],
        },
        {
          email: 'zubaer.16@gmail.com',
          progress: [
            {
              unit: 'Meet and Greet',
              level: 'Task 01',
              lesson: 'Lesson 02',
            },
            {
              unit: 'Meet and Greet',
              level: 'Task 02',
              lesson: 'Lesson 01',
            },
            {
              unit: 'Meet and Greet',
              level: 'Task 02',
              lesson: 'Lesson 02',
            },
          ],
        },
        {
          email: 'zubaer.16@gmail.com',
          progress: [],
        },
      ]

      if (emails.length > 0) {
        await emailService.sendUsersProgressAndEmails(emails)
        console.log(`Successfully sent emails for page ${pageIndex}`)
      } else {
        console.log(`No emails found for page ${pageIndex}`)
      }
    }
  } catch (error) {
    console.error('Error processing users progress:', error.message)
  }
}

export default { processUsersProgressAndEmails }
