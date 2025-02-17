import express from 'express'
import cron from 'node-cron'
import cronUtil from './utils/nonSubscribersCron.util.js'

const app = express()

cron.schedule('*/1 * * * *', async () => {
  const pageSize = 500 // Number of emails to fetch per page
  console.log('Cron job started: Sending bulk emails...')
  await cronUtil.processNonSubscriberEmails(pageSize)
  console.log('Cron job completed')
})

export default app
