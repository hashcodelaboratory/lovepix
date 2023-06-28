import { messages } from "../../../../../../../../../messages/messages";
import { useTranslation } from "next-i18next";

type Props = {
  id?: string;
}

const OrderDetailTitle = ({ id }: Props): JSX.Element => {
  const { t } = useTranslation();

  return <p><b>{t(messages.singleOrder)}</b> {id}</p>;
};

export default OrderDetailTitle;