import {useState, useRef, useEffect} from 'react'; 
import { useTypedSelector, useAppDispatch } from "../../store";
import { modalFormActions, initialState as modalFormState } from "../../store/modalFormSlice";
import EditButton from '../EditButton/EditButton'


import { useGetCarsQuery } from '../../store/mainApi';

import {BetweenOperator} from './BetweenOperator';

import { DataGrid, GridApi, GridCellValue, 
  GridColumns, GridToolbar, GridValueFormatterParams, GridComparatorFn, getGridNumericOperators,
  GridFilterOperator, GridFilterItem, GridFilterInputValueProps   
} from '@mui/x-data-grid';
import { DataGridPro } from '@mui/x-data-grid-pro';
import {cars} from '../../data/data';
import { Button } from '@mui/material';
import { numberWithCommas } from '../../utils/utilFunctions';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import Box from '@mui/material/Box';
import SyncIcon from '@mui/icons-material/Sync';
import EditIcon from '@mui/icons-material/Edit';

import './DataTable.css';


const gridStringNumberComparator: GridComparatorFn<string> = (v1, v2) =>
  Number(v1) - Number(v2);



export function columns (handlerFunction: any) : GridColumns { 
  return [
    { field: 'id', headerName: 'ID', width: 230, resizable: true },
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
            console.log(thisRow);
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
    
          // return <Button onClick={onClick}>Edit</Button>;
          // return <Button onClick={onClick} endIcon={<EditIcon/>}></Button>;
          return <EditButton onClick={onClick}/>;
        },
      }
  ];}


const DataTable: React.FC = () => {

    const [pageSize, setPageSize] = useState(10);
    const pageSizeChangeHandler = (size:number) => {
        setPageSize(size);
    } 

    const modalForm = useTypedSelector(state => state.modalForm);
    const dispatch = useAppDispatch();

    const handleEditClick = (carData: typeof modalFormState.carData) => {
      dispatch(modalFormActions.replaceModalForm({
        isOn:true,
        isEdit: true,
        carData
      }))
    }

    const fetchedCars = useGetCarsQuery(null);

    // if (fetchedCars.isLoading || fetchedCars.isFetching) {
    //   return <div>...isLoading</div>
    // } else if (fetchedCars.isError) {
    //   return <div>An error occured retrieving data from the database</div>
    // } else if (!fetchedCars.data) {
    //   return <div>There are no cars to display</div>
    // }

    console.log('fetchedCars', fetchedCars); 
    // const carsRefined = fetchedCars.data.map(obj => {
    //   const [key, value] = Object.entries(obj)[0]
    //   return {id: key, ...value}; 
    // }
    //   )

    const entries = Object.entries(fetchedCars.data!);
    const carsRefined = entries.map(entry => {
      return {id: entry[0], ...entry[1]}
    })
    
    console.log('carsRefined', carsRefined);

    return (
        <div className="DataTable">
          <DataGrid
            // rows={cars}
            rows={carsRefined}
            columns={columns(handleEditClick)}
            pageSize={pageSize}
            rowsPerPageOptions={[5, 10, 20]}
            onPageSizeChange={pageSizeChangeHandler}
            autoHeight={true}
            hideFooterSelectedRowCount={true}
            components={{ Toolbar: GridToolbar }}
            componentsProps={{
              toolbar: {
                showQuickFilter: true,
                quickFilterProps: { debounceMs: 500 },
              },
            }}
          />
        </div>
    )}

export default DataTable;