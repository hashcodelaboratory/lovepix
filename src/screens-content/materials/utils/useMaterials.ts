import {useQuery, UseQueryResult} from "react-query";

const MATERIALS_TRANSLATIONS_KEY = 'MATERIALS_TRANSLATIONS';

const getMaterialsTranslations = async (): Promise<any> => {

}

const useMaterialsTranslations = (): UseQueryResult<any> =>
    useQuery([MATERIALS_TRANSLATIONS_KEY], () => getMaterialsTranslations());