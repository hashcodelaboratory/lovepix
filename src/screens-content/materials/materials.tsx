import {useTranslation} from "next-i18next";
import {messages} from "../../messages/messages";
import {Material, materialSection} from "./components/section";
import {database} from "../../../utils/firebase/config";
import {doc} from "@firebase/firestore";
import {Collections, Documents} from "../../../utils/firebase/enums";

const CustomMaterials = () => {

    const { t } = useTranslation();

    const docRef = doc(database, Collections.MATERIALS, Documents.CANVAS_EN);
    // const docSnap = await getDoc(docRef);

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



    return (<>{materials.map(materialSection)}</>);
}

export default CustomMaterials