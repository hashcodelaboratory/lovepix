import {Container, Grid, Typography} from "@mui/material";
import styles from "./about-us.module.scss";
import {useTranslation} from "next-i18next";
import {messages} from "../../messages/messages";

const CustomAboutUs = () => {
    const { t } = useTranslation();

    return(
        <Container className={styles.container}>
            <Grid container rowSpacing={2} sx={{mb: 8}}>
                <Grid item>
                    <Typography variant="h4">{String(t(messages.aboutUsFrom))}</Typography>
                </Grid>
                <Grid item>
                    <Typography>
                        {String(t(messages.aboutUsThanks))}
                    </Typography>
                </Grid>
            </Grid>
            <Grid container rowSpacing={2} sx={{mb: 8}}>
                <Grid item>
                    <Typography variant="h5">{String(t(messages.aboutUsWant))}</Typography>
                </Grid>
                <Grid item sx={{ mt: 8 }}>
                    <Typography variant="h5">{String(t(messages.aboutUsHelp))}</Typography>
                </Grid>
            </Grid>
            <Grid container rowSpacing={2}>
                <Grid item>
                    <Typography variant="h6">{String(t(messages.aboutUsPriorities))}</Typography>
                </Grid>
                <Grid item>
                    <Typography variant="h3">{String(t(messages.aboutUsProud))}</Typography>
                </Grid>
            </Grid>
        </Container>
    )
}

export default CustomAboutUs