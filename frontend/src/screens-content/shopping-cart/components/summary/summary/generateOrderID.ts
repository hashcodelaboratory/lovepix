import { QuerySnapshot } from "@firebase/firestore";

const LOVEPIX = "LOVEPIX";

export const generateOrderID = (docSnap: QuerySnapshot): string => {
  const arrayNumberIds = docSnap.docs.map(({ id }) =>
    Number(id.substring(id.length - 4)),
  );

  const maxValue = Math.max(...arrayNumberIds)

  const orderNumber = String(
    maxValue > 0 ? maxValue + 1 : 253,
  ).padStart(4, "0");

  return `${LOVEPIX}${orderNumber}`;
};