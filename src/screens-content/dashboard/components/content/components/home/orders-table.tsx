import Box from '@mui/material/Box';
import {DataGrid, GridCallbackDetails, GridSelectionModel} from '@mui/x-data-grid';
import styles from '../../../../dashboard.module.scss'
import {useContext, useState} from "react";
import DashboardContext from "../../../../context/dashboard-context";
import {messages} from "../../../../../../messages/messages";
import {SNACKBAR_OPTIONS_ERROR, SNACKBAR_OPTIONS_SUCCESS} from "../../../../../../snackbar/config";
import {useSnackbar} from "notistack";
import {useTranslation} from "next-i18next";
import {useQueryClient} from "react-query";
import DeleteIcon from '@mui/icons-material/Delete';
import {ORDERS_COLUMNS} from "./utils/ordersColumns";
import {removeOrders} from "./utils/removeOrders";

const OrdersTable = () => {
    const { state: { orders } } = useContext(DashboardContext);

    const { enqueueSnackbar } = useSnackbar();

    const { t } = useTranslation();

    const queryClient = useQueryClient();

    const [selectedRows, setSelectedRows] = useState<string[]>([]);
    const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([]);

    const data = orders.map(({ id, image}) => (
        {
            id: id,
            orderID: image?.name ?? '',
            status: image?.status,
            url: image?.url ?? ''
        }
    ));

    const reset = () => {
        setSelectionModel([]);
        setSelectedRows([]);
    }

    const removeData = () => {
        const result = removeOrders(selectedRows, queryClient);
        if (result === "") {
            enqueueSnackbar(String(t(messages.filesRemoved)), SNACKBAR_OPTIONS_SUCCESS);
            reset();
        } else {
            enqueueSnackbar(result, SNACKBAR_OPTIONS_ERROR);
        }
    }

    const selectionChanged = (selectionModel: GridSelectionModel, details: GridCallbackDetails) => {
        setSelectionModel(selectionModel);
        setSelectedRows(selectionModel.map((item, index) => data[index].id));
    }

    const buttonText = `(${selectedRows.length}) ${String(t(messages.removeAll))}`;

    return (
        <>
            <h1>{String(t(messages.orders))}</h1>
            <Box sx={{height: 400, width: '100%', marginBottom: 12 }}>
                <DataGrid
                    className={styles.contentTable}
                    rows={data ?? []}
                    columns={ORDERS_COLUMNS}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                    disableSelectionOnClick
                    selectionModel={selectionModel}
                    onSelectionModelChange={selectionChanged}
                />
                <button className={styles.removeButton} onClick={removeData} disabled={!selectedRows.length}>
                    {buttonText}
                    <DeleteIcon sx={{marginLeft: 1}}/>
                </button>
            </Box>
        </>
    )
}

export default OrdersTable