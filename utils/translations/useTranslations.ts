import {useQuery, UseQueryResult} from "react-query";
import {doc, getDoc} from "@firebase/firestore";
import {database} from "../firebase/config";
import {Collections, Languages} from "../firebase/enums";

const MATERIALS_TRANSLATIONS_KEY = 'MATERIALS_TRANSLATIONS';

const getTranslations = async (language: string): Promise<any> => {
    const document = language === 'en' ? Languages.EN : Languages.SK;
    const docRef = doc(database, Collections.TRANSLATIONS, document);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        return undefined;
    }
}

export const useTranslations = (language: string): UseQueryResult<any> =>
    useQuery([MATERIALS_TRANSLATIONS_KEY], () => getTranslations(language));