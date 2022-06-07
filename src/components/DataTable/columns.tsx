
import {BetweenOperator} from './BetweenOperator';
import { GridApi, GridColumns, GridValueFormatterParams, GridComparatorFn, GridCellValue} from '@mui/x-data-grid';
import { numberWithCommas } from '../../utils/utilFunctions';
import EditButton from '../EditButton/EditButton'

const gridStringNumberComparator: GridComparatorFn<string> = (v1, v2) =>
  Number(v1) - Number(v2);

export function columns (handlerFunction: any) : GridColumns { 
    return [
      { field: 'id', headerName: 'ID', width: 230 },
      { field: 'make', headerName: 'Make', width: 130 },
      { field: 'model', headerName: 'Model', width: 130 },
      { field: 'year', headerName: 'Year', width: 100, sortComparator: gridStringNumberComparator,
      filterOperators: BetweenOperator
     },
      { field: 'price', headerName: 'Price', width: 100, 
      valueFormatter: (params: GridValueFormatterParams<string>) => { return `$${numberWithCommas(params.value)}`},
      sortComparator: gridStringNumberComparator,
      filterOperators: BetweenOperator,
    
    },
      { field: 'isLive', headerName: 'Status', width: 100, valueGetter: (params: {row: {isLive: boolean}}) => { return params.row.isLive ? "Live" : "Sold"} },
      {
          field: 'edit',
          headerName: 'Edit',
          width: 70, 
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
              if (typeof thisRow.price === 'string') {
  
                handlerFunction({
                  id: thisRow.id,
                  make: thisRow.make,
                  model: thisRow.model,
                  year: thisRow.year, 
                  price: thisRow.price.replace(/[^0-9]/g, ''),
                  isLive: thisRow.isLive === 'Live' ? true : false ,
                })
                  
              }
              
            };
            return <EditButton onClick={onClick}/>;
          },
        }
    ];}