import faunadb from "faunadb";
import Constants from "../constants";
import Mailchimp from '../plugins/mailchimp'
const client = new faunadb.Client({ secret: `${Constants.faunaDbKey}` });
const { Create, Collection } = faunadb.query;
export default {
  async store(req: any, res: any) {
    try {
    
      const { email, uid, date, sub_newsletter } = req.body;
      var meetupId = uid
       await client.query(
        Create(Collection("meetups"), {
          data: { uid, email, date },
        })
      );
      if(sub_newsletter) {
        try {
          await Mailchimp.subNewsletter('', email)
        } catch (error) {
            console.log('here')
             res.json({message: 'Your seat has been reserved, thank you!. You were already subscribed to newsletter'});
             return;
        }
      }
      res.json({message: 'Your seat has been reserved, thank you!'});

    } catch (error) {
      console.log('error: ', error)
      res.status(401).json({message: `We could not fulfill your request at the moment. If the problem persists, please contact info@freecodecamplisbon.org to reserve your seat and add the subject "Seat Reservation for ${meetupId} meetup" to your email.`})
      console.log('error MeetupController@store: ', error.requestResult.statusCode)
      
    }
  },
};
