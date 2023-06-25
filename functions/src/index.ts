import * as functions from "firebase-functions";
import axios from "axios";

const API_URL = "https://moja.superfaktura.sk";
const AUTH_EMAIL = "info@lovepix.sk";
const AUTH_API_KEY = "rlmMjO7gK0D3lUrpuCwCJ0zoUvSjq8Ye";
const AUTH_COMPANY_ID = "94061";
const AUTH_MODULE = "MyCustomModule";

export const addContactToNewsletter = functions.https.onRequest(
  async (request, response) => {
    const parsedBody = JSON.parse(request.body);

    const _ = await axios.post(
      "https://app.smartemailing.cz/api/v3/import",
      {
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
          Authorization:
            "Basic aW5mb0Bsb3ZlcGl4LnNrOmh5bms4eWdiZGNyMmxtZzVsMGJxYXc2bG5pbGJmeWwzeHI2dnQwNGU=",
        },
      }
    );
    response.json({data: _.data});
  }
);

export const createInvoice = functions.https.onRequest(
  async (request, response) => {
    response.set("Access-Control-Allow-Origin", "*");
    response.set(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );

    const parsedBody = JSON.parse(request.body);

    const config = {
      headers: {
        "Authorization": `SFAPI email=${AUTH_EMAIL}&apikey=${AUTH_API_KEY}&company_id=${AUTH_COMPANY_ID}&module=${AUTH_MODULE}`,
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
    };

    const res = await axios
      .post(
        `${API_URL}/invoices/create`,
        "data=" + JSON.stringify(parsedBody),
        config
      )
      .then((result) => {
        console.debug(result);
      })
      .catch((err) => {
        console.error(err);
      });
    response.json({data: res});
  }
);
