import Box from "@mui/material/Box";
import { DataGrid, GridCellParams } from "@mui/x-data-grid";
import styles from "../../../../dashboard.module.scss";
import { useContext, useState } from "react";
import DashboardContext from "../../../../context/dashboard-context";
import { messages } from "../../../../../../messages/messages";
import { SNACKBAR_OPTIONS_ERROR, SNACKBAR_OPTIONS_SUCCESS } from "../../../../../../snackbar/config";
import { useSnackbar } from "notistack";
import { useTranslation } from "next-i18next";
import { useQueryClient } from "react-query";
import DeleteIcon from "@mui/icons-material/Delete";
import { ORDERS_COLUMNS } from "./utils/ordersColumns";
import { removeOrders } from "./utils/removeOrders";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import OrderDetail from "./detail/order-detail";
import { Order } from "../../../../../../common/types/order";

const OrdersTable = () => {
  const { state: { orders } } = useContext(DashboardContext);

  const { enqueueSnackbar } = useSnackbar();

  const { t } = useTranslation();

  const queryClient = useQueryClient();

  const [order, setOrder] = useState<Order>();

  const data = orders.map(({ id, date, form, delivery, payment, shoppingCart, totalPrice, pdf }) => (
    {
      id: id,
      date: new Date(date).toLocaleDateString() ?? "",
      name: `${form?.firstName} ${form?.lastName}`,
      // totalPrice: totalPrice ?? "",
      // delivery: t(delivery),
      // payment: t(payment) ?? "",
      // origin: shoppingCart?.images?.map(({ origin }) => origin) ?? "-",
      // edited: shoppingCart?.images?.map(({ url }) => url) ?? "-",
      // pdf: shoppingCart?.images?.map((image) => ({ image, id, pdf })),
    }
  ));

  const removeData = () => {
    const result = removeOrders(orders.map(({ id }) => id), queryClient);
    if (result === "") {
      enqueueSnackbar(String(t(messages.filesRemoved)), SNACKBAR_OPTIONS_SUCCESS);
    } else {
      enqueueSnackbar(result, SNACKBAR_OPTIONS_ERROR);
    }
  };

  const changeOrderId = (e: GridCellParams) => {
    setOrder(orders.find(({ id }) => id === e.id.toString()));
  };

  const buttonText = String(t(messages.removeAll));

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <h1>{String(t(messages.orders))}</h1>
      </AccordionSummary>
      <AccordionDetails>
        <div style={{ display: "flex" }}>
          <Box sx={{ marginBottom: 12, width: 470, height: 500 }}>
            <DataGrid
              className={styles.contentTable}
              rows={data ?? []}
              columns={ORDERS_COLUMNS}
              autoPageSize
              onCellClick={changeOrderId}
            />
            <button className={styles.removeButton} onClick={removeData}>
              {buttonText}
              <DeleteIcon sx={{ marginLeft: 1 }} />
            </button>
          </Box>
          <Box sx={{
            marginBottom: 12,
            width: 1100,
            height: 500,
          }}>
            <OrderDetail order={order} />
          </Box>
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

export default OrdersTable;