import {useState} from 'react'; 
import { useTypedSelector, useAppDispatch } from "../../store";
import { modalFormActions, initialState as modalFormState } from "../../store/modalFormSlice";
import { useGetCarsQuery } from '../../store/mainApi';
import {columns} from './columns'
import { DataGrid,  GridToolbar} from '@mui/x-data-grid';
import './DataTable.css';


const DataTable: React.FC = () => {

    const [pageSize, setPageSize] = useState(10);
    const fetchedCars = useGetCarsQuery(null);

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

    const entries = Object.entries(fetchedCars.data!);
    const carsRefined = entries.map(entry => ({id: entry[0], ...entry[1]}))

    return (
        <div className="DataTable">
          <DataGrid
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