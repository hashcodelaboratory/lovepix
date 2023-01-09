import {GridColDef} from "@mui/x-data-grid";
import styles from "../../../../../dashboard.module.scss";
import Image from "next/image";
import {ImageLayout} from "../../../../../../home/enums/enums";

export const ORDERS_COLUMNS: GridColDef[] = [
    {
        field: 'id',
        headerName: 'ID',
        width: 150,
        editable: false,
        filterable: true
    },
    {
        field: 'date',
        headerName: 'Date',
        width: 150,
        editable: false,
        renderCell: ({ value }) => <div className={styles.status}>{value}</div>
    },
    {
        field: 'delivery',
        headerName: 'Delivery',
        type: 'string',
        width: 200,
        editable: false,
    },
    {
        field: 'payment',
        headerName: 'Payment',
        type: 'string',
        width: 200,
        editable: false,
    },
    {
        field: 'origin',
        headerName: 'Origin',
        editable: false,
        renderCell: ({ value }) =>
            value && <a target="_blank" href={`https:${value}`} rel="noopener noreferrer">
                <Image alt="origin" style={{ borderRadius: 6, cursor: "pointer" }} src={`https:${value}`} width={40} height={40} layout={ImageLayout.FIXED} />
            </a>
    },
    {
        field: 'edited',
        headerName: 'Edited',
        editable: false,
        renderCell: ({ value }) =>
            value && <a target="_blank" href={`https:${value}`} rel="noopener noreferrer">
                <Image alt="edited" style={{ borderRadius: 6, cursor: "pointer" }} src={`https:${value}`} width={40} height={40} layout={ImageLayout.FIXED} />
            </a>
    },
];