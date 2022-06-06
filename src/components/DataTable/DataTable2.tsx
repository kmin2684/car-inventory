import {useState} from 'react'; 
import { useTypedSelector, useAppDispatch } from "../../store";
import { modalFormActions, initialState as modalFormState } from "../../store/modalFormSlice";

import { useGetCarsQuery } from '../../store/mainApi';

import { DataGrid, GridApi, GridCellValue, GridColumns, GridToolbar, GridValueFormatterParams, GridComparatorFn, getGridNumericOperators   } from '@mui/x-data-grid';
import { DataGridPro } from '@mui/x-data-grid-pro';
import {cars2} from '../../data/data';
import { Button } from '@mui/material';
import { numberWithCommas } from '../../utils/utilFunctions';
import './DataTable.css';


const gridStringNumberComparator: GridComparatorFn<string> = (v1, v2) =>
  Number(v1) - Number(v2);

export function columns (handlerFunction: any) : GridColumns { 
  return [
    { field: 'id', headerName: 'ID', width: 200, resizable: true },
    { field: 'make', headerName: 'Make', width: 130 },
    { field: 'model', headerName: 'Model', width: 130 },
    { field: 'year', headerName: 'Year', width: 100, },
    { field: 'price', headerName: 'Price', width: 100, filterOperators: getGridNumericOperators()},
    { field: 'isLive', headerName: 'Status', width: 100, valueFormatter: (params: GridValueFormatterParams<boolean>) => { return params.value ? "Live" : "Sold"} },
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
    
          return <Button onClick={onClick}>Edit</Button>;
        },
      }
  ];}


const DataTable2: React.FC = () => {

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

    if (fetchedCars.isLoading || fetchedCars.isFetching) {
      return <div>...isLoading</div>
    } else if (fetchedCars.isError) {
      return <div>An error occured retrieving data from the database</div>
    } else if (!fetchedCars.data) {
      return <div>There are no cars to display</div>
    }

    console.log('fetchedCars', fetchedCars); 
    // const carsRefined = fetchedCars.data.map(obj => {
    //   const [key, value] = Object.entries(obj)[0]
    //   return {id: key, ...value}; 
    // }
    //   )

    const entries = Object.entries(fetchedCars.data);
    const carsRefined = entries.map(entry => {
      return {id: entry[0], ...entry[1]}
    })
    
    console.log('carsRefined', carsRefined);

    return (
        <div className="DataTable">
          <DataGrid
            // rows={cars}
            rows={cars2}
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

export default DataTable2;