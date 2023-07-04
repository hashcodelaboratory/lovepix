import Endpoint from "../endpoint";

const withHost = (endpoint: Endpoint) => new URL(`${process.env.NEXT_PUBLIC_SMART_EMAILING_HOST!}/${endpoint}`)

export default withHost