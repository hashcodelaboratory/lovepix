import nodemailer, {TransportOptions} from "nodemailer";
import {
  NODE_MAILER_HOST,
  NODE_MAILER_PASSWORD,
  NODE_MAILER_PORT,
  NODE_MAILER_SECURE,
  NODE_MAILER_SERVICE,
  NODE_MAILER_USER,
  NODE_MAILER_HOST_TEST,
  NODE_MAILER_PASSWORD_TEST,
  NODE_MAILER_PORT_TEST,
  NODE_MAILER_SECURE_TEST,
  NODE_MAILER_SERVICE_TEST,
  NODE_MAILER_USER_TEST
} from "./constants";

export const transporter = nodemailer.createTransport({
  pool: true,
  service: NODE_MAILER_SERVICE,
  host: NODE_MAILER_HOST,
  secure: NODE_MAILER_SECURE,
  port: NODE_MAILER_PORT,
  auth: {
    user: NODE_MAILER_USER,
    pass: NODE_MAILER_PASSWORD,
  },
  tls: {
    // do not fail on invalid certs
    rejectUnauthorized: false,
  },
} as TransportOptions)