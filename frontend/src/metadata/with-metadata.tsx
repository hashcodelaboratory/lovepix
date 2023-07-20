import { useRouter } from "next/router";
import {HigherOrderComponent} from "../types/higher-order-component";
import {Head} from "./head";
import {metadata} from "../localization/metadata";
import { Pages } from "constants/pages/urls";

export const withMetadata: HigherOrderComponent = (WrappedComponent) =>
  // eslint-disable-next-line react/display-name
  (props) => {
    const router = useRouter()

    const {titleKey, descriptionKey} = metadata[router.pathname as Pages]

    return <>
      <Head title={titleKey} description={descriptionKey}/>
      <WrappedComponent {...props}/>
    </>
  }