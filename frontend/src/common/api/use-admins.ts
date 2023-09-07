import { database } from '../firebase/config'
import { Collections } from '../firebase/enums'
import { collection, getDocs } from "@firebase/firestore";
import { useQuery, UseQueryResult } from 'react-query'

export const ADMINS_KEY = "ADMINS";

export type admin = {
  id: string;
  email: string;
}

const getAdmins = async (): Promise<admin[]> => {
  const querySnapshot = await getDocs(collection(database, Collections.ADMINS));
  return querySnapshot.docs.map(
    (doc) => ({ id: doc.id, ...doc.data() } as admin),
  );
};

export const useAdmins = (): UseQueryResult<admin[]> =>
  useQuery([ADMINS_KEY], () => getAdmins());