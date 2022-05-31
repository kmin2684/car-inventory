import { DataGrid, GridApi, GridCellValue } from '@mui/x-data-grid';
import {cars} from '../../data/data';
import { Button } from '@mui/material';

export const columns = [
    { field: 'id', headerName: 'No', width: 70 },
    { field: 'make', headerName: 'Make', width: 130 },
    { field: 'model', headerName: 'Model', width: 130 },
    { field: 'year', headerName: 'Year', width: 130 },
    { field: 'price', headerName: 'Price', width: 130, valueGetter: (params: {row: {price: number}}) => `${params.row.price}` },
    { field: 'isLive', headerName: 'Status', width: 130, valueGetter: (params: {row: {isLive: Boolean}}) => params.row.isLive ? "Live" : "Sold"},
    {
        field: 'edit',
        headerName: '',
        sortable: false,
        renderCell: (params : any) => {
          const onClick = (e: any) => {
            e.stopPropagation(); // don't select this row after clicking
    
            const api: GridApi = params.api;
            const thisRow: Record<string, GridCellValue> = {};
    
            api
              .getAllColumns()
              .filter((c) => c.field !== '__check__' && !!c)
              .forEach(
                (c) => (thisRow[c.field] = params.getValue(params.id, c.field)),
              );
    
            return alert(JSON.stringify(thisRow, null, 4));
          };
    
          return <Button onClick={onClick}>Click</Button>;
        },
      }
  ];

const DataTable: React.FC = () => {

    return (
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={cars}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5, 10, 20]}
          />
        </div>
    )}

export default DataTable;