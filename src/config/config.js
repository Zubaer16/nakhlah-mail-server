import dotenv from 'dotenv'
dotenv.config()

const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  emailServiceSecret: process.env.EMAIL_SERVICE_SECRET,
  nonSubscriberApi: {
    token: process.env.NONSUBSCRIBER_DEV_API_TOKEN,
    url: process.env.NONSUBSCRIBER_API_URL,
  },
}

export default config
