import {useEffect} from "react";
import pluginConfig from "./cookie-consent-config";

const CookieConsent = () => {
  useEffect(() => {
    /**
     * useEffect is executed twice (React 18+),
     * make sure the plugin is initialized and executed once
     */
    if (!document.getElementById('cc--main')) {
      // @ts-ignore
      window.CC = window.initCookieConsent();
      // @ts-ignore
      window.CC.run(pluginConfig);
    }
  }, []);

  return null;
}

export default CookieConsent