import {
  DataGrid,
  GridCallbackDetails, GridRowParams,
  GridSelectionModel,
} from "@mui/x-data-grid";
import styles from "../../../../dashboard.module.scss";
import { useContext, useState } from "react";
import DashboardContext from "../../../../context/dashboard-context";
import { getUploadImagesColumns } from "../utils/columns/uploadImagesColumns";
import { messages } from "../../../../../../messages/messages";
import {
  SNACKBAR_OPTIONS_ERROR,
  SNACKBAR_OPTIONS_SUCCESS,
} from "../../../../../../snackbar/config";
import { useSnackbar } from "notistack";
import { useTranslation } from "next-i18next";
import { useQueryClient } from "react-query";
import DeleteIcon from "@mui/icons-material/Delete";
import { removeUploadedImages } from "../../../../api/gallery/removeUploadedImages";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ProductDetail from "./detail/product-detail";
import { UPLOADED_IMAGES_KEY } from "../../../../api/gallery/useUploadedImages";
import { GALLERY_KEY } from "../../../../../../common/api/use-gallery";

const ProductsTable = () => {
  const {
    state: { galleryImages },
  } = useContext(DashboardContext);

  const { enqueueSnackbar } = useSnackbar();

  const { t } = useTranslation();

  const queryClient = useQueryClient();

  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([]);
  const [detailRow, setDetailRow] = useState<GridRowParams>();

  const data = galleryImages?.map(({ id, name, url , size, timeCreated, contentType, price, categories, dimensions }, index) => ({
    id: index,
    name: name,
    url: url,
    size: size,
    timeCreated: timeCreated,
    contentType: contentType,
    price: price,
    docId: id,
    categories: categories,
    dimensions: dimensions
  })) ?? [];

  const reset = () => {
    setSelectionModel([]);
    setSelectedRows([]);
  };

  const removeData = async () => {
    const result = removeUploadedImages(selectedRows);
    if (result === "") {
      await queryClient.invalidateQueries(UPLOADED_IMAGES_KEY);
      await queryClient.invalidateQueries(GALLERY_KEY);
      enqueueSnackbar(
        String(t(messages.filesRemoved)),
        SNACKBAR_OPTIONS_SUCCESS,
      );
      reset();
    } else {
      enqueueSnackbar(result, SNACKBAR_OPTIONS_ERROR);
    }
  };

  const selectionChanged = (
    selectionModel: GridSelectionModel,
    details: GridCallbackDetails,
  ) => {
    setSelectionModel(selectionModel);
    setSelectedRows(selectionModel.map((item, index) =>
      (data[index].name)));
  };

  const buttonText = `(${selectedRows.length}) ${String(t(messages.removeAll))}`;

  const onRowClick = (details: GridRowParams) => {
    setDetailRow(details);
  }

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <h1>{String(t(messages.products))}</h1>
      </AccordionSummary>
      <AccordionDetails>
        <div className={styles.rowContainer}>
          <DataGrid
            className={styles.contentTable}
            rows={data}
            columns={getUploadImagesColumns()}
            pageSize={10}
            rowsPerPageOptions={[5]}
            checkboxSelection
            disableSelectionOnClick
            selectionModel={selectionModel}
            onSelectionModelChange={selectionChanged}
            onRowClick={onRowClick}
            autoHeight
          />
          <div>
            <ProductDetail row={detailRow?.row} />
          </div>
        </div>
        <button
          className={styles.removeButton}
          onClick={removeData}
          disabled={selectedRows.length === 0}
        >
          {buttonText}
          <DeleteIcon sx={{ marginLeft: 1 }} />
        </button>
      </AccordionDetails>
    </Accordion>
  );
};

export default ProductsTable;
