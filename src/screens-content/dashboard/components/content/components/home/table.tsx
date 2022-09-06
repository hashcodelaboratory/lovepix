import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import styles from '../../../../dashboard.module.scss'
import {useContext} from "react";
import DashboardContext from "../../../../context/dashboard-context";

const Table = () => {

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'bucket',
            headerName: 'Bucket',
            width: 250,
            editable: false,
        },
        {
            field: 'fullPath',
            headerName: 'Full path',
            type: 'string',
            width: 300,
            editable: false,
        },
        {
            field: 'name',
            headerName: 'Name',
            width: 150,
            editable: false,
        }
    ];

    const { state } = useContext(DashboardContext);
    const { uploadedImages } = state;

    const data = uploadedImages.map(({ bucket, name, fullPath }, index) => (
        {
            id: index + 1,
            bucket: bucket,
            name: name,
            fullPath: fullPath
        }
    ))

    return (
        <Box sx={{height: 400, width: '100%'}}>
            <DataGrid
                className={styles.contentTable}
                rows={data}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
                disableSelectionOnClick
            />
        </Box>
    )
}

export default Table