import Mailchimp from '../plugins/mailchimp'

export default {
 async index(req: any, res: any) {

  const { email, name } = req.body
  try {
    const results = await Mailchimp.subNewsletter(name, email)
    console.log('results: ', results)
    res.json({meesage: "Subscription successful, thank you for joining us"})
  
  } catch (e) {
    console.log('error: ', e)
    res.status(400).json({ errors: { email: ['Already Subscribed'] } })

  }
  },
}
