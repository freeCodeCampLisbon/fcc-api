import faunadb from "faunadb";
import Constants from "../constants";
const client = new faunadb.Client({ secret: `${Constants.faunaDbKey}` });
const { Create, Collection } = faunadb.query;
export default {
  async store(req: any, res: any) {
    try {
    
      const { email, uid, date } = req.body;
      var meetupId = uid
      const doc = await client.query(
        Create(Collection("meetups"), {
          data: { uid, email, date },
        })
      );
      res.json({message: 'Your seat has been reserved, thank you!'});

    } catch (error) {
      console.log('error: ', error)
      res.status(401).json({message: `We could not fulfill your request at the moment. If the problem persists, please contact info@freecodecamplisbon.org to reserve your seat and add the subject "Seat Reservation for ${meetupId} meetup" to your email.`})
      console.log('error MeetupController@store: ', error.requestResult.statusCode)
      
    }
  },
};
