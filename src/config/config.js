import dotenv from 'dotenv'
dotenv.config()

const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  emailServiceSecret: process.env.EMAIL_SERVICE_SECRET,
  token: process.env.DEV_API_TOKEN,
  nonSubscribersListApi: {
    url: process.env.NONSUBSCRIBERS_LIST_API_URL,
  },
  streakMissedUsersListApi: {
    url: process.env.STREAK_MISSED_USERS_LIST_API_URL,
  },
  usersProgressListApi: {
    url: process.env.USERS_PROGRESS_LIST_API_URL,
  },
  mailTemplateApi: {
    subscriptionOfferMailTemplateApi: {
      url: process.env.SUBSCRIPTION_OFFER_MAIL_TEMPLATE_API_URL,
    },
    streakMissMailTemplateApi: {
      url: process.env.STREAK_MISS_MAIL_TEMPLATE_API_URL,
    },
  },
}

export default config
