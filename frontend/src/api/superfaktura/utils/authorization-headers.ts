import Headers from '../headers'

const authorizationHeaders = (): Headers => ({
  Authorization: `SFAPI email=${process.env.NEXT_PUBLIC_AUTH_EMAIL}&apikey=${process.env.NEXT_PUBLIC_AUTH_API_KEY}&company_id=${process.env.NEXT_PUBLIC_AUTH_COMPANY_ID}&module=${process.env.NEXT_PUBLIC_AUTH_MODULE}`,
  'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
})

export default authorizationHeaders
