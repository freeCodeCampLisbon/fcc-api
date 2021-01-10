import Mailchimp from 'mailchimp-api-v3';
import Constants from '../constants'

export default {
 async index(req: any, res: any) {
  
  const mailchimp = new Mailchimp(`${Constants.mailchimpApiKey}`)
  const { email, name } = req.body
  try {
    const results = await mailchimp.post({
      method: 'post',
      path: `/lists/${Constants.mailchimpDefaultListId}/members`,
      body: {
        merge_fields: { FNAME: name },
        email_address: email,
        status: 'subscribed',
      },
    })
    res.json(results)
  
  } catch (e) {
    console.log('error: ', e)
    res.status(400).json({ errors: { email: ['Already Subscribed'] } })

  }
  },
}
