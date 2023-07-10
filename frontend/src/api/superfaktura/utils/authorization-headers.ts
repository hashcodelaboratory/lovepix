import Headers from '../headers'
import {SUPERFAKTURA_API_KEY, SUPERFAKTURA_COMPANY_ID, SUPERFAKTURA_EMAIL, SUPERFAKTURA_MODULE} from "../contants";

const authorizationHeaders = (): Headers => ({
  Authorization: `SFAPI email=${SUPERFAKTURA_EMAIL}&apikey=${SUPERFAKTURA_API_KEY}&company_id=${SUPERFAKTURA_COMPANY_ID}&module=${SUPERFAKTURA_MODULE}`,
  'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
})

export default authorizationHeaders
