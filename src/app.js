import express from 'express'
import cron from 'node-cron'
import nonSubscribersCronUtil from './utils/nonSubscribersCron.util.js'
import streakMissCronUtil from './utils/streakMissCron.util.js'
import usersProgressCronUtil from './utils/usersProgress.util.js'

const app = express()

cron.schedule('*/1 * * * *', async () => {
  const pageSize = 500 // Number of emails to fetch per page
  console.log('Cron job started: Sending bulk emails...')
  // await nonSubscribersCronUtil.processNonSubscriberEmails(pageSize)
  // await streakMissCronUtil.processStreakMissedUsersEmails(pageSize)
  await usersProgressCronUtil.processUsersProgressAndEmails(pageSize)
  console.log('Cron job completed')
})

export default app
