import Box from '@mui/material/Box';
import {DataGrid, GridCallbackDetails, GridSelectionModel} from '@mui/x-data-grid';
import styles from '../../../../dashboard.module.scss'
import {useContext, useState} from "react";
import DashboardContext from "../../../../context/dashboard-context";
import {UPLOADED_IMAGES_COLUMNS} from "./utils";
import {deleteObject, ref} from "@firebase/storage";
import {storage} from "../../../../../../../utils/firebase/config";
import {messages} from "../../../../../../messages/messages";
import {SNACKBAR_OPTIONS_ERROR, SNACKBAR_OPTIONS_SUCCESS} from "../../../../../../snackbar/config";
import {useSnackbar} from "notistack";
import {useTranslation} from "next-i18next";
import {useQueryClient} from "react-query";
import {UPLOADED_IMAGES_KEY} from "../../../../api/uploadedImages";
import DeleteIcon from '@mui/icons-material/Delete';

const Table = () => {
    const { state } = useContext(DashboardContext);
    const { uploadedImages } = state;

    const { enqueueSnackbar } = useSnackbar();

    const { t } = useTranslation();

    const queryClient = useQueryClient();

    const [selectedRows, setSelectedRows] = useState<string[]>([]);

    const data = uploadedImages.map(({ bucket, name, fullPath }, index) => (
        {
            id: index + 1,
            bucket: bucket,
            name: name,
            fullPath: fullPath
        }
    ));

    const removeData = () => {
        let error = "";
        selectedRows.forEach(row => {
            const desertRef = ref(storage, row);
            deleteObject(desertRef).then(() => {
                queryClient.invalidateQueries(UPLOADED_IMAGES_KEY);
            }).catch((err) => {
                error = err;
            });
        });

        if (error === "") {
            enqueueSnackbar(String(t(messages.fileUploaded)), SNACKBAR_OPTIONS_SUCCESS);
        } else {
            enqueueSnackbar(error, SNACKBAR_OPTIONS_ERROR);
        }
    }

    const selectionChanged = (selectionModel: GridSelectionModel, details: GridCallbackDetails) => {
        setSelectedRows(selectionModel.map((item, index) => data[index].fullPath));
    }

    const buttonText = `( ${selectedRows.length} ) Remove all`;

    return (
        <Box sx={{height: 400, width: '100%'}}>
            <DataGrid
                className={styles.contentTable}
                rows={data}
                columns={UPLOADED_IMAGES_COLUMNS}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
                disableSelectionOnClick
                onSelectionModelChange={selectionChanged}
            />
            {selectedRows.length > 0 && <button className={styles.removeButton} onClick={removeData}>
                {buttonText}
                <DeleteIcon sx={{marginLeft: 1}}/>
            </button>}
        </Box>
    )
}

export default Table