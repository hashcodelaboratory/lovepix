import * as React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import thanks from "../../assets/thanks.png";
import styles from "./thanks.module.scss";
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

const Thank = (): JSX.Element => {
  const router = useRouter();

  // TODO: implement cancel flow
  // const stripeStatusCanceled = router.query?.canceled as string;

  const handleClose = () => {
    router.push({
      pathname: "/",
      query: null,
    });
  };

  const redirect = () => {
    router.push('/')
  }

  useEffect(() => {
    if (((router.query?.success as string) === "true")) {
      // TODO
    }
    if (((router.query?.canceled as string) === "true")) {
      // TODO
    }
  }, [router.query]);

  return (
    <Container>
      <div className={styles.container}>
        <h1>Ďakujeme za Vašu objenávku!</h1>
        <p className={styles.text}>Vaša objednávka bola úspešne odoslaná!</p>
        <p className={styles.text}>V prípade akýchkoľvek otázok nás môžete kontaktovať.</p>
        <p className={styles.text}>Ďakujeme, že ste nakupovali v našom obchode!</p>
        <p onClick={redirect} className={styles.link}>
          Späť na domovskú stránku
          <ArrowRightAltIcon />
        </p>
        <Image
          src={thanks}
          alt="user-image"
          layout="intrinsic"
          width={400}
          height={240}
        />
      </div>
    </Container>
  );
};

export default Thank;