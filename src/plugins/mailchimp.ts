import Mailchimp from 'mailchimp-api-v3';
import Constants from '../constants'

const mailchimp = new Mailchimp(`${Constants.mailchimpApiKey}`)

export default {
  subNewsletter(name: string, email: string, data: any = {}) {
    return mailchimp.post({
      method: 'post',
      path: `/lists/${Constants.mailchimpDefaultListId}/members`,
      body: {
        merge_fields: { FNAME: name },
        email_address: email,
        status: 'subscribed',
        ...data
      },
    })
  }
}
export {mailchimp}