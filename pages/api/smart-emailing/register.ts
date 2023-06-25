import type {NextApiRequest, NextApiResponse} from 'next'
import axios from "axios";
import {registerEndpoint} from "../../../api/smart-emailing/utils/endpoint-composer";
import authorizationHeaders from "../../../api/smart-emailing/utils/authorization-headers";
import {logRequestTrigger} from "../../../api/logger/logger";
import RegistrationStatus from "../../../api/smart-emailing/registration-status";
import ContactListStatus from "../../../api/smart-emailing/contact-list-status";

type Response = {
  status?: RegistrationStatus,
  contacts_map?: {
    emailaddress: string,
    contact_id: 32
  }[]
  error?: string
}

const BAD_REQUEST_ERROR_MESSAGE = 'Bad request!'

const register = async (
  req: NextApiRequest,
  res: NextApiResponse<Response>
) => {
  try {
    if (req.method !== 'POST') {
      res.status(400).json({
        error: BAD_REQUEST_ERROR_MESSAGE
      })

      return
    }

    if (!req.body || !req.body.email) {
      res.status(400).json({
        error: BAD_REQUEST_ERROR_MESSAGE
      })

      return
    }

    const email = req.body.email


    const uri = registerEndpoint().href
    const headers = authorizationHeaders()

    logRequestTrigger(uri, req.method, req.body)
    const result = await axios.post(uri, {
      settings: {
        update: true
      },
      data: [
        {
          emailaddress: email,
          contactlists: [
            {
              id: process.env.NEXT_PUBLIC_SMART_EMAILING_CONTACT_LIST_ID!,
              status: ContactListStatus.confirmed
            }
          ]
        }
      ]
    }, {
      headers
    })

    res.status(201).json(result.data as Response)
  } catch (error) {
    res.status(500).json({error: (error as Error).message})
  }
}

export default register
