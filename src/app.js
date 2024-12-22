import express from 'express'
import cron from 'node-cron'
import cronUtil from './utils/cron.util.js'

const app = express()

cron.schedule('*/1 * * * *', async () => {
  console.log('Cron job started: Sending bulk emails...')
  await cronUtil.processNonSubscriberEmails()
  console.log('Cron job completed')
})

export default app
