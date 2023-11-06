import { GridColDef } from "@mui/x-data-grid";

export const getDimensionsColumns = (): GridColDef[] => [
  {
    field: "name",
    headerName: "Name",
    width: 200,
    editable: false,
  },
  ...MATERIALS.map((material) => ({
    field: `price.${material.type}`,
    headerName: `${t(localizationKey.priceFor) + t(material.title)}`,
    width: 300,
    editable: true,
    renderCell: (a: any) => <div>{a.row.price?.[material.type] ?? '-'}</div>,
  })),
]
