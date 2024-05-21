import Endpoint from "../endpoint";

const withHost = (endpoint: Endpoint) => new URL(`${process.env.NEXT_PUBLIC_SMART_EMAILING_HOST!}/${endpoint}`);

const withHost_test = (endpoint: Endpoint) => new URL(`${process.env.NEXT_PUBLIC_SMART_EMAILING_HOST_TEST!}/${endpoint}`);

export { withHost, withHost_test };