import {Grid, Typography} from "@mui/material";
import Image from "next/image";

type Material = {
    title: string
    subtitle: string
    description: string
    illustration: string
}

const materials: Material[] = [
    {
        title: 'Canvas',
        subtitle: 'The paintings on canvas stretched on a quality wooden frame are the most used.',
        description: 'The canvas looks very decent and warm. It has a fine structure and is ideally taut. The printed motif continues along the edges of the image. Small hooks are ready for hanging on the back.',
        illustration: 'https://firebasestorage.googleapis.com/v0/b/waller-development.appspot.com/o/materials-page%2Ffoto-na-platno.jpeg?alt=media&token=4cd5ef22-a11c-41ed-9a78-b24d1dc54ed7'
    },
    {
        title: 'Akryl - plexiglass',
        subtitle: 'The paintings have a high gloss, which is suitable for both dark and light motifs.',
        description: 'It is especially suitable for modern interiors. The hanging value also adds value to the image. You can either use hooks or aluminum spacers to offset the picture 3 cm from the wall.',
        illustration: 'https://firebasestorage.googleapis.com/v0/b/waller-development.appspot.com/o/materials-page%2Fakryl.png?alt=media&token=a22ad0a2-dd7b-497e-834b-87b229c5b02c'
    },
    {
        title: 'Aluminium plate',
        subtitle: 'Our specialty is printing directly on aluminum plate.',
        description: 'It is a sandwich material, which consists of three layers of aluminum – plastic – aluminum with a thickness of 3 mm. This material is very strong and durable, also suitable for outdoor use. The printed surface has a completely fine, matte structure and looks very pleasant. As with acrylic, there are several hanging options. Either a hook or spacers.',
        illustration: 'https://firebasestorage.googleapis.com/v0/b/waller-development.appspot.com/o/materials-page%2Faluminium.png?alt=media&token=e7731043-dd86-4202-b048-8fd6966e0084'
    }
]

const CustomMaterials = () => {
    const materialComponent = (material: Material, index: number) => {
        const direction = index % 2 ? "row-reverse" : "row"
        const align = index % 2 ? "flex-end" : "flex-start"
        const textAlign = index % 2 ? "right" :  "left"

        return <Grid sx={{my: 8}} container rowSpacing={4} columnSpacing={4} direction={direction}>
            <Grid item xs={12} md={3}>
                <Image
                    alt={material.title}
                    style={{ borderRadius: 10 }}
                    key={material.illustration}
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
                        <Typography variant="h5" fontWeight="bold" textAlign={textAlign}>{material.title}</Typography>
                    </Grid>
                    <Grid item>
                        <Typography textAlign={textAlign}>{material.subtitle}</Typography>
                    </Grid>
                    <Grid item>
                        <Typography textAlign={textAlign}>{material.description}</Typography>
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