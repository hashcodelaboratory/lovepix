export const addContactToNewsletter = async (email: string) => {
  const username = 'info@lovepix.sk';
  const password = 'hynk8ygbdcr2lmg5l0bqaw6lnilbfyl3xr6vt04e';

  // return await fetch('https://app.smartemailing.cz/api/v3/check-credentials', {
  //   method: 'POST',
  //   mode: "cors",
  //   headers: {
  //     'Authorization': 'Basic ' + btoa(username + ":" + password),
  //     'Content-Type': 'application/json',
  //     "Access-Control-Allow-Origin": "*",
  //     "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
  //   },
  //   body: JSON.stringify({
  //     "settings": {
  //       "update": true
  //     },
  //     "data": [
  //       {
  //         "emailaddress": email,
  //         "contactlists": [
  //           {
  //             "id": 2,
  //             "status": "confirmed"
  //           }
  //         ],
  //       }
  //     ]
  //   }),
  // });

  return await fetch('https://us-central1-waller-development.cloudfunctions.net/helloWorld', {
    //   method: 'POST',
    headers: {
      'Authorization': 'Basic aW5mb0Bsb3ZlcGl4LnNrOmh5bms4eWdiZGNyMmxtZzVsMGJxYXc2bG5pbGJmeWwzeHI2dnQwNGU=',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
    }
    //   body: JSON.stringify({
    //     "settings": {
    //       "update": true
    //     },
    //     "data": [
    //       {
    //         "emailaddress": email,
    //         "contactlists": [
    //           {
    //             "id": 2,
    //             "status": "confirmed"
    //           }
    //         ],
    //       }
    //     ]
    //   }),);
  })
}