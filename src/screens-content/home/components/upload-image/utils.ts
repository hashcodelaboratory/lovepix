import { CONF } from "common/indexed-db/enums/storeNames";
import { CONFIGURATOR } from "constants/pages/urls";
import { IndexableType, Table } from "dexie";
import { NextRouter } from "next/router";

const imageSource = (sourceUrl: string) =>
  `${sourceUrl}?w=248&fit=crop&auto=format`;

const imageSourceSet = (sourceUrl: string) =>
  `${sourceUrl}?w=248&fit=crop&auto=format&dpr=2 2x`;

const handleDB =
  (
    sourceUrl: string,
    data: unknown,
    configurationsTable: Table<any, IndexableType>,
    router: NextRouter
  ) =>
  async () => {
    const res = await fetch(sourceUrl ?? "");

    const file = await res.blob();

    const fr = new FileReader();

    fr.readAsDataURL(file);

    fr.onload = () => {
      const dataPayload = {
        origin: fr.result as string,
        image: undefined,
        dimensionId: undefined,
        material: undefined,
      };

      data
        ? configurationsTable.update(CONF, dataPayload)
        : configurationsTable.add(dataPayload, CONF);
    };

    router.push({
      pathname: CONFIGURATOR,
    });
  };

export { imageSource, imageSourceSet, handleDB };
