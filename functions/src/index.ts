import * as functions from "firebase-functions";
import axios from "axios";

export const addContactToNewsletter = functions.https.onRequest(
  async (request, response) => {
    const parsedBody = JSON.parse(request.body);

    const _ = await axios.post(
      "https://app.smartemailing.cz/api/v3/import", {
        settings: {
          update: true,
        },
        data: [
          {
            emailaddress: parsedBody.email,
            contactlists: [
              {
                id: 2,
                status: "confirmed",
              },
            ],
          },
        ],
      },
      {
        headers: {
          // eslint-disable-next-line max-len
          "Authorization": "Basic aW5mb0Bsb3ZlcGl4LnNrOmh5bms4eWdiZGNyMmxtZzVsMGJxYXc2bG5pbGJmeWwzeHI2dnQwNGU=",
        },
      });
    response.json({data: _.data});
  }
);
