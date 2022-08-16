import {messages} from "../../../messages/messages";

export const STEPS: {
    title: string;
    img: string;
}[] = [
    {
        title: messages.uploadPhotoStepOne,
        img: "https://firebasestorage.googleapis.com/v0/b/waller-development.appspot.com/o/home-page%2Fupload.png?alt=media&token=47587d25-5be2-429e-b1f8-61acaa982532"
    },
    {
        title: messages.uploadPhotoStepTwo,
        img: "https://firebasestorage.googleapis.com/v0/b/waller-development.appspot.com/o/home-page%2Fsize.png?alt=media&token=ed92cacf-9267-4322-9e55-f245b53770f9"
    },
    {
        title: messages.uploadPhotoStepThree,
        img: "https://firebasestorage.googleapis.com/v0/b/waller-development.appspot.com/o/home-page%2FScreenshot%202022-08-16%20at%2011.18.54.png?alt=media&token=9f21d337-5801-46b4-a688-ae757c46bb11"
    },
    {
        title: messages.uploadPhotoStepFour,
        img: "https://firebasestorage.googleapis.com/v0/b/waller-development.appspot.com/o/home-page%2Fmaterial.png?alt=media&token=31b3ddb6-d30b-4e7a-a2b1-b130a470d0de"
    }
]

export const STEPS_GRID_STYLE = { justifyContent: { xs: "center", sm: "space-between", md: "space-between", lg: "space-between", xl: "space-between" } }