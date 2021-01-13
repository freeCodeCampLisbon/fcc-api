import faunadb from "faunadb";
import Constants from "../constants";
import Mailchimp from "../plugins/mailchimp";
const client = new faunadb.Client({ secret: `${Constants.faunaDbKey}` });
const { Create, Collection, Match, Get, Index } = faunadb.query;
export default {
  async store(req: any, res: any) {
    try {
      const { email, uid, date, sub_newsletter, name } = req.body;
      var meetupId = uid;

      // Check if user has already reserved their seat
      try {
        await client.query(
          Get(Match(Index("meetup_users_by_uid_and_email"), [email, uid]))
        );
        res.status(409).json({
          message: "You've already reserved your seat for this meetup",
          type: 'warning'
        });
        return;
      } catch (error) {
        console.log("error MeetupController: ", error);
      }

      await client.query(
        Create(Collection("meetups"), {
          data: { uid, email, date, name },
        })
      );
      if (sub_newsletter) {
       
        try {
          await Mailchimp.subNewsletter(name, email);
        } catch (error) {
         
          res.json({
            message:
              "Your seat has been reserved, thank you!. You were already subscribed to newsletter",
            type: 'success'
          });
          return;
        }
      }
      res.json({ message: "Your seat has been reserved, thank you!", type: 'success' });
    } catch (error) {
      console.log("error: ", error);
      res.status(401).json({
        message: `We could not fulfill your request at the moment. If the problem persists, please contact info@freecodecamplisbon.org to reserve your seat and add the subject "Seat Reservation for ${meetupId} meetup" to your email.`,
        type: 'danger'
      });
     
    }
  },
};
