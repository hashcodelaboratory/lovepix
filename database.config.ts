import Dexie from "dexie";
import {StoreNames} from "./src/common/indexed-db/enums/storeNames";

const database = new Dexie("waller");
database.version(1).stores({
    configurations: '',
    order: ''
});

export const configurationsTable = database.table(StoreNames.CONFIGURATIONS);
export const orderTable = database.table(StoreNames.ORDER);

export default database;