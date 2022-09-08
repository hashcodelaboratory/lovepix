import {Grid, Typography} from "@mui/material";
import Image from "next/image";
import { v4 as uuidv4 } from 'uuid';
import {useTranslation} from "next-i18next";
import {messages} from "../../messages/messages";

type Material = {
    title: string
    subtitle: string
    description: string
    illustration: string
}



const CustomMaterials = () => {

    const { t } = useTranslation();

    const materials: Material[] = [
        {
            title: String(t(messages.materialsCanvasTitle)),
            subtitle: String(t(messages.materialsCanvasSubTitle)),
            description: String(t(messages.materialsCanvasDescription)),
            illustration: 'https://firebasestorage.googleapis.com/v0/b/waller-development.appspot.com/o/materials-page%2Ffoto-na-platno.jpeg?alt=media&token=4cd5ef22-a11c-41ed-9a78-b24d1dc54ed7'
        },
        {
            title: String(t(messages.materialsAcrylTitle)),
            subtitle: String(t(messages.materialsAcrylSubTitle)),
            description: String(t(messages.materialsAcrylDescription)),
            illustration: 'https://firebasestorage.googleapis.com/v0/b/waller-development.appspot.com/o/materials-page%2Fakryl.png?alt=media&token=a22ad0a2-dd7b-497e-834b-87b229c5b02c'
        },
        {
            title: String(t(messages.materialsAluminiumTitle)),
            subtitle: String(t(messages.materialsAluminiumSubTitle)),
            description: String(t(messages.materialsAluminiumDescription)),
            illustration: 'https://firebasestorage.googleapis.com/v0/b/waller-development.appspot.com/o/materials-page%2Faluminium.png?alt=media&token=e7731043-dd86-4202-b048-8fd6966e0084'
        }
    ];

    const materialComponent = (material: Material, index: number) => {
        const direction = index % 2 ? "row-reverse" : "row"
        const align = index % 2 ? "flex-end" : "flex-start"
        const textAlign = index % 2 ? "right" :  "left"

        return <Grid sx={{my: 8}} container rowSpacing={4} columnSpacing={4} direction={direction}>
            <Grid item xs={12} md={3}>
                <Image
                    alt={material.title}
                    style={{ borderRadius: 10 }}
                    key={uuidv4()}
                    src={material.illustration}
                    height={200}
                    width={200}
                    layout="responsive"
                    objectFit="cover"
                />
            </Grid>
            <Grid item xs={12} md={9}>
                <Grid container direction="column" rowSpacing={2} alignItems={align}>
                    <Grid item>
                        <Typography variant="h4" fontWeight="bold" textAlign={textAlign}>{material.title}</Typography>
                    </Grid>
                    <Grid item>
                        <Typography textAlign={textAlign} fontWeight="100" fontSize={16}>{material.subtitle}</Typography>
                    </Grid>
                    <Grid item>
                        <Typography textAlign={textAlign} fontWeight="100">{material.description}</Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    }

    return (
        <>{materials.map(materialComponent)}</>
    );
}

export default CustomMaterials