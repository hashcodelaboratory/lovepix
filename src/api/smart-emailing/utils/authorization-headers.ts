import Headers from "../headers";

const authorizationHeaders = (): Headers => ({
  Authorization: process.env.NEXT_PUBLIC_SMART_EMAILING_TOKEN!
})

export default authorizationHeaders