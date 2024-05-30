import Headers from '../headers'
import {SUPERFAKTURA_API_KEY, SUPERFAKTURA_COMPANY_ID, SUPERFAKTURA_EMAIL, SUPERFAKTURA_MODULE, SUPERFAKTURA_API_KEY_TEST, SUPERFAKTURA_COMPANY_ID_TEST, SUPERFAKTURA_EMAIL_TEST, SUPERFAKTURA_MODULE_TEST} from "../constants";

const authorizationHeaders = (): Headers => ({
  Authorization: `SFAPI email=${SUPERFAKTURA_EMAIL}&apikey=${SUPERFAKTURA_API_KEY}&company_id=${SUPERFAKTURA_COMPANY_ID}&module=${SUPERFAKTURA_MODULE}`,
  'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
})

const authorizationHeaders_test = (): Headers => ({
  Authorization: `SFAPI email=${SUPERFAKTURA_EMAIL_TEST}&apikey=${SUPERFAKTURA_API_KEY_TEST}&company_id=${SUPERFAKTURA_COMPANY_ID_TEST}&module=${SUPERFAKTURA_MODULE_TEST}`,
  'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
})

export { authorizationHeaders, authorizationHeaders_test };
