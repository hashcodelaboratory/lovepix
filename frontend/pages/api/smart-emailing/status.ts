import type {NextApiRequest, NextApiResponse} from 'next'
import axios from "axios";
import {statusEndpoint} from "../../../src/api/smart-emailing/utils/endpoint-composer";
import authorizationHeaders from "../../../src/api/smart-emailing/utils/authorization-headers";
import {logRequestTrigger} from "../../../src/api/logger/logger";

type Response = {
  status: string
  message: string
}

const FAILURE_STATUS = 'NOK'

const status = async (
  req: NextApiRequest,
  res: NextApiResponse<Response>
) => {
  try {
    const uri = statusEndpoint().href
    const headers = authorizationHeaders()

    logRequestTrigger(uri, req.method)
    const result = await axios.get(uri, {
      headers
    })

    res.status(200).json(result.data as Response)
  } catch (error) {
    res.status(500).json({status: FAILURE_STATUS, message: (error as Error).message})
  }
}

export default status
