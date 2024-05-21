import { withHost, withHost_test } from "./with-host";
import Endpoint from "../endpoint";

const statusEndpoint = () => withHost(Endpoint.status);
const testStatusEndpoint = () => withHost_test(Endpoint.status);

const registerEndpoint = () => withHost(Endpoint.register);
const testRegisterEndpoint = () => withHost_test(Endpoint.register);

export { statusEndpoint, testStatusEndpoint, registerEndpoint, testRegisterEndpoint };