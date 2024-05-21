import Headers from "../headers";

const authorizationHeaders = (): Headers => ({
  Authorization: process.env.NEXT_PUBLIC_SMART_EMAILING_TOKEN!
})

const authorizationHeaders_test = (): Headers => ({
  Authorization: process.env.NEXT_PUBLIC_SMART_EMAILING_TOKEN_TEST!
})

export { authorizationHeaders, authorizationHeaders_test };