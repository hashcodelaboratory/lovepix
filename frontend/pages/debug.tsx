import {Grid} from '@mui/material';
import type {NextPage} from 'next'
import React from "react";
import Typography from "@mui/material/Typography";

const replaceMiddleWithAsterisks = (input: string): string => {
  if (input.length <= 4) {
    return input;
  }

  const firstTwoChars = input.slice(0, 2);
  const lastTwoChars = input.slice(-2);
  const middleAsterisks = '*'.repeat(input.length - 4);

  return firstTwoChars + middleAsterisks + lastTwoChars;
}

const Debug: NextPage = () => {

  const variable = (name: string, value: any) => <Grid item>
    <Typography>
      {name}: <span style={{color: 'grey'}}>{replaceMiddleWithAsterisks(value)}</span>
    </Typography>
  </Grid>

  return (
    <div>
      <header>
      </header>

      <main>
        <Grid container direction="column">
          {variable("NEXT_PUBLIC_SMART_EMAILING_HOST", process.env.NEXT_PUBLIC_SMART_EMAILING_HOST)}
          {variable("NEXT_PUBLIC_SMART_EMAILING_TOKEN", process.env.NEXT_PUBLIC_SMART_EMAILING_TOKEN)}
          {variable("NEXT_PUBLIC_SMART_EMAILING_CONTACT_LIST_ID", process.env.NEXT_PUBLIC_SMART_EMAILING_CONTACT_LIST_ID)}
          {variable("NEXT_PUBLIC_SUPERFAKTURA_EMAIL", process.env.NEXT_PUBLIC_SUPERFAKTURA_EMAIL)}
          {variable("NEXT_PUBLIC_SUPERFAKTURA_API_KEY", process.env.NEXT_PUBLIC_SUPERFAKTURA_API_KEY)}
          {variable("NEXT_PUBLIC_SUPERFAKTURA_COMPANY_ID", process.env.NEXT_PUBLIC_SUPERFAKTURA_COMPANY_ID)}
          {variable("NEXT_PUBLIC_SUPERFAKTURA_MODULE", process.env.NEXT_PUBLIC_SUPERFAKTURA_MODULE)}
          {variable("NEXT_PUBLIC_STRIPE_PUBLIC_KEY", process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY)}
          {variable("NEXT_PUBLIC_STRIPE_SECRET_KEY", process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY)}
          {variable("NEXT_PUBLIC_NODE_MAILER_SERVICE", process.env.NEXT_PUBLIC_NODE_MAILER_SERVICE)}
          {variable("NEXT_PUBLIC_NODE_MAILER_HOST", process.env.NEXT_PUBLIC_NODE_MAILER_HOST)}
          {variable("NEXT_PUBLIC_NODE_MAILER_SECURE", process.env.NEXT_PUBLIC_NODE_MAILER_SECURE)}
          {variable("NEXT_PUBLIC_NODE_MAILER_PORT", process.env.NEXT_PUBLIC_NODE_MAILER_PORT)}
          {variable("NEXT_PUBLIC_NODE_MAILER_USER", process.env.NEXT_PUBLIC_NODE_MAILER_USER)}
          {variable("NEXT_PUBLIC_NODE_MAILER_PASSWORD", process.env.NEXT_PUBLIC_NODE_MAILER_PASSWORD)}
        </Grid>
      </main>

      <footer>
      </footer>
    </div>
  )
}

export default Debug
