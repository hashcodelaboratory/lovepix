import {GridColDef} from "@mui/x-data-grid";
import styles from "../../../../../dashboard.module.scss";
import Image from "next/image";
import {ImageLayout} from "../../../../../../home/enums/enums";
import Button from "@mui/material/Button";
import {generatePdf} from "./post-processing/generatePdf";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

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
        field: 'totalPrice',
        headerName: 'Total price',
        type: 'number',
        width: 100,
        editable: false,
        renderCell: ({ value }) => <div>{Number(value).toFixed(2)} €</div>
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
    {
        field: 'pdf',
        headerName: 'Post-processing PDF',
        width: 300,
        editable: false,
        renderCell: ({ value }) => {
            const url = value[0].image.url;
            const pdf = value[0].pdf;
            return pdf ? <PictureAsPdfIcon color="error" /> : <Button variant="contained" onClick={() => generatePdf(value[0].image, value[0].id)}>{url?.toString().substring(url?.toString().length - 12, url?.toString().length + 1)}</Button>
        }
    },
];