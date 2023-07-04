import { configurationsTable, orderTable } from "../../../../database.config";

export const clearIndexedDb = async () => {
  await configurationsTable.clear();
  await orderTable.clear();
}