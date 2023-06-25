import withHost from "./with-host";
import Endpoint from "../endpoint";

const statusEndpoint = () => withHost(Endpoint.status)

const registerEndpoint = () => withHost(Endpoint.register)

export {statusEndpoint, registerEndpoint}