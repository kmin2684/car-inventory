import {useState} from 'react'; 
import { DataGrid, GridApi, GridCellValue, GridColumns } from '@mui/x-data-grid';
import {cars} from '../../data/data';
import { Button } from '@mui/material';
import { numberWithCommas } from '../../utils/utilFunctions';
import './DataTable.css';


export const columns: GridColumns = [
    { field: 'id', headerName: 'No', width: 70 },
    { field: 'make', headerName: 'Make', width: 130 },
    { field: 'model', headerName: 'Model', width: 130 },
    { field: 'year', headerName: 'Year', width: 130 },
    { field: 'price', headerName: 'Price', width: 130, valueGetter: (params: {row: {price: number}}) => `$${numberWithCommas(params.row.price)}` },
    { field: 'isLive', headerName: 'Status', width: 130, valueGetter: (params: {row: {isLive: Boolean}}) => params.row.isLive ? "Live" : "Sold"},
    {
        field: 'edit',
        headerName: '',
        width: 130, 
        sortable: false,
        hideSortIcons: true,
        disableColumnMenu: true,
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
    
          return <Button onClick={onClick}>Edit</Button>;
        },
      }
  ];

const DataTable: React.FC = () => {

    const [pageSize, setPageSize] = useState(10);
    const pageSizeChangeHandler = (size:number) => {
        setPageSize(size);
    } 

    return (
        <div className="DataTable">
          <DataGrid
            rows={cars}
            columns={columns}
            pageSize={pageSize}
            rowsPerPageOptions={[5, 10, 20]}
            onPageSizeChange={pageSizeChangeHandler}
            autoHeight={true}
            hideFooterSelectedRowCount={true}
          />
        </div>
    )}

export default DataTable;