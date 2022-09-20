import {useQuery, UseQueryResult} from "react-query";
import {doc, getDoc} from "@firebase/firestore";
import {database} from "../../../../utils/firebase/config";
import {Collections, Languages} from "../../../../utils/firebase/enums";

const MATERIALS_TRANSLATIONS_KEY = 'MATERIALS_TRANSLATIONS';

const getTranslations = async (): Promise<any> => {
    const docRef = doc(database, Collections.TRANSLATIONS, Languages.EN);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        return undefined;
    }
}

export const useTranslations = (): UseQueryResult<any> =>
    useQuery([MATERIALS_TRANSLATIONS_KEY], () => getTranslations());