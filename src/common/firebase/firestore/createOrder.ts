import { MutationOptions, useMutation, UseMutationResult } from "react-query";
import {
  collection,
  doc as document,
  doc,
  setDoc,
  writeBatch,
} from "@firebase/firestore";
import { database, storage } from "../config";
import { Collections } from "../enums";
import { Delivery } from "../../enums/delivery";
import { FormInputs } from "../../types/form";
import { getDownloadURL, ref, uploadBytes } from "@firebase/storage";
import { StorageFolder } from "../storage/enums";
import { Image } from "../../types/order";
import { Payment } from "../../enums/payment";

type CreateOrderRequest = {
  form: FormInputs;
  date: number;
  shoppingCart: {
    images: Image[];
  };
  totalPrice: number;
  delivery: Delivery;
  payment: Payment;
};

const uploadToStorage = async (orderId: string, images: Image[]) => {
  const payload: Image[] = [];
  images.map(async (image: Image, index) => {
    const uploadURL = `${StorageFolder.ORDERS}/${orderId}/images/`;

    const urlRef = await ref(storage, `${uploadURL}/updated/`);
    const originRef = await ref(storage, `${uploadURL}/origin/`);

    const urlRes = await fetch(image.url);
    const originRes = await fetch(image.origin);

    const urlFile = await urlRes.blob();
    const originFile = await originRes.blob();

    const {
      metadata: { name: urlName },
    } = await uploadBytes(urlRef, urlFile);

    const {
      metadata: { name: originName },
    } = await uploadBytes(originRef, originFile);

    if (urlName && originName) {
      const url = await getDownloadURL(
        ref(storage, `${StorageFolder.ORDERS}/${orderId}/images/${urlName}`)
      );

      const origin = await getDownloadURL(
        ref(storage, `${StorageFolder.ORDERS}/${orderId}/images/${originName}`)
      );

      payload.push({
        ...image,
        url: url,
        origin: origin,
      });

      if (index === payload.length - 1) {
        const batch = writeBatch(database);
        const docRef = document(database, Collections.ORDERS, orderId);
        await batch.update(docRef, {
          shoppingCart: {
            images: payload,
          },
        });

        await batch.commit();
      }
    }
  });
};

const createOrder = async (data: CreateOrderRequest) => {
  const newOrderRef = doc(collection(database, Collections.ORDERS));

  await setDoc(newOrderRef, data);

  await uploadToStorage(newOrderRef.id, data.shoppingCart.images);
};

export const useCreateOrder = (
  options?: MutationOptions<any, any, CreateOrderRequest>
): UseMutationResult<any, any, CreateOrderRequest> =>
  useMutation(createOrder, options);
