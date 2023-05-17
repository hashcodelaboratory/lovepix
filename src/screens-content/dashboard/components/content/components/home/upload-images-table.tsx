import {
  DataGrid,
  GridCallbackDetails,
  GridSelectionModel,
} from "@mui/x-data-grid";
import styles from "../../../../dashboard.module.scss";
import { useContext, useState } from "react";
import DashboardContext from "../../../../context/dashboard-context";
import { getUploadImagesColumns } from "./utils/uploadImagesColumns";
import { messages } from "../../../../../../messages/messages";
import {
  SNACKBAR_OPTIONS_ERROR,
  SNACKBAR_OPTIONS_SUCCESS,
} from "../../../../../../snackbar/config";
import { useSnackbar } from "notistack";
import { useTranslation } from "next-i18next";
import { useQueryClient } from "react-query";
import DeleteIcon from "@mui/icons-material/Delete";
import { removeUploadedImages } from "./utils/removeUploadedImages";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const UploadImagesTable = () => {
  const {
    state: { uploadImages },
  } = useContext(DashboardContext);

  const { enqueueSnackbar } = useSnackbar();

  const { t } = useTranslation();

  const queryClient = useQueryClient();

  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([]);

  const data = uploadImages?.map(({ bucket, name, fullPath }, index) => ({
      id: index,
      name: name,
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
    setSelectedRows(selectionModel.map((item, index) => data[index].name));
  };

  const buttonText = `(${selectedRows.length}) ${String(t(messages.removeAll))}`;

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
          autoHeight
        />
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
