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
import Uploader from "./uploader/uploader";
import GalleryDetail from "./detail/gallery-detail";

const UploadImagesTable = () => {
  const {
    state: { galleryImages },
  } = useContext(DashboardContext);

  const { enqueueSnackbar } = useSnackbar();

  const { t } = useTranslation();

  const queryClient = useQueryClient();

  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([]);
  const [detailRow, setDetailRow] = useState<GridRowParams>();

  const data = galleryImages?.map(({ name, url , size, timeCreated, contentType }, index) => ({
    id: index,
    name: name,
    url: url,
    size: size,
    timeCreated: timeCreated,
    contentType: contentType
  })) ?? [];

  const reset = () => {
    setSelectionModel([]);
    setSelectedRows([]);
  };

  const removeData = () => {
    const result = removeUploadedImages(selectedRows, queryClient);
    if (result === "") {
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
        <h1>{String(t(messages.uploadedImages))}</h1>
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
            <GalleryDetail row={detailRow?.row} />
            <Uploader />
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

export default UploadImagesTable;
