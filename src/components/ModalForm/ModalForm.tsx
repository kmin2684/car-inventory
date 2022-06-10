import {useState, useEffect, useLayoutEffect} from 'react';
import './ModalForm.css'

import { useTypedSelector, useAppDispatch } from "../../store";
import { modalFormActions } from "../../store/modalFormSlice";
import { snackBarActions } from '../../store/snackBarSlice';

import { useGetCarsQuery, useUpdateCarMutation, useAddCarMutation, useDeleteCarMutation } from '../../store/mainApi';

import Dialog from '@mui/material/Dialog';
import { Grid, Paper} from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import LoadingButton from '@mui/lab/LoadingButton';

export default function ModalForm() {

    const modalForm = useTypedSelector(state => state.modalForm);
    const dispatch = useAppDispatch();

    const [submitEnabled, setSubmitEnabled] = useState(false);
    
    const [make, setMake] = useState(modalForm.carData.make);
    const [model, setModel] = useState(modalForm.carData.model);
    const [year, setYear] = useState(modalForm.carData.year);
    const [price, setPrice] = useState(modalForm.carData.price)
    const [isLive, setIsLive] = useState(modalForm.carData.isLive);

    const fetchedCars = useGetCarsQuery(null);
    const [updateCar, {isLoading: isUpdating}] = useUpdateCarMutation();
    const [addCar, {isLoading: isAdding}] = useAddCarMutation();
    const [deleteCar, {isLoading: isDeleting}] = useDeleteCarMutation()

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setPrice(e.target.value.replace(/[^0-9]/g, ''));
    }

    const handleYearChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setYear(e.target.value.replace(/[^0-9]/g, ''));
    }

    const handleMakeChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setMake(e.target.value)
        
    }

    const handleModelChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setModel(e.target.value)
    }

    const handleSaleStatusChange = (e: SelectChangeEvent<string>) => {
        if (e.target.value === 'Live') {
            setIsLive(true)
        } else {
            setIsLive(false)
        }
    }



    const handleModalClose = () => {
        dispatch(modalFormActions.turnOn(false))
      }

    const handleFormSubmit = async () => {
        const data = {
            make: make.trim(),
            model: model.trim(),
            year: Number(year.trim()),
            price: Number(price.trim()),
            isLive, 
        }
        if (modalForm.isEdit) {

            try {
                await updateCar({id: modalForm.carData.id, patch: data})
                dispatch(snackBarActions.turnSuccess({on: true, message: `successfully editted ${modalForm.carData.id}`}))
            } catch {
                dispatch(snackBarActions.turnError({on: true, message: `an error occurred editting ${modalForm.carData.id}`}))
            }
            

        } else {
                try {
                    await addCar(data);
                    dispatch(snackBarActions.turnSuccess({on: true, message: `successfully added the model ${model}`}))
                } catch {
                    dispatch(snackBarActions.turnError({on: true, message: `an error occurred adding the model ${model}`}))
                }
            }
        
        dispatch(modalFormActions.turnOn(false));
        setTimeout(fetchedCars.refetch, 500)
        }

    const handleDelete = async () => {
        try {
            await deleteCar(modalForm.carData.id)
            dispatch(snackBarActions.turnSuccess({on: true, message: `successfully deleted ${modalForm.carData.id}`}))
        } catch {
            dispatch(snackBarActions.turnError({on: true, message: `an error occurred deleting ${modalForm.carData.id}`}))
        }
        
        while (isDeleting) {
            console.log('Deleting a car');
        }
        dispatch(modalFormActions.turnOn(false));
        setTimeout(fetchedCars.refetch, 500)
    }

    useLayoutEffect(() => {
        setMake(modalForm.carData.make)
    }, [modalForm.isOn,modalForm.carData.make])

    useLayoutEffect(() => {
        setModel(modalForm.carData.model)
    }, [modalForm.isOn,modalForm.carData.model])

    useLayoutEffect(() => {
        setYear(modalForm.carData.year)
    }, [modalForm.isOn,modalForm.carData.year])

    useLayoutEffect(() => {
        setPrice(modalForm.carData.price)
    }, [modalForm.isOn,modalForm.carData.price])

    useLayoutEffect(() => {
        setIsLive(modalForm.carData.isLive)
    }, [modalForm.isOn,modalForm.carData.isLive])

    useLayoutEffect(() => {
        if (make.trim() && model.trim() && year.trim() && price.trim() ) {
            setSubmitEnabled(true)
        } else {
            setSubmitEnabled(false)
        }
    }, [make, model, year, price])

    return ( <>    
        <Dialog className='ModalForm' open={modalForm.isOn} maxWidth='lg' fullWidth={true} >
            <Paper className="title"> 
                {modalForm.isEdit ? 
                    `Edit: ${modalForm.carData.id}` 
                    :
                    `Add a new vehicle`   
                }
            </Paper>
            <Grid container columns={{ xs: 12, sm: 12, md: 12, lg:12 }} justifyContent="flex-start">   

            <FormControl required sx={{ m: 1, minWidth: 120 }}>
                <TextField
                    required
                    id="outlined-required"
                    label="Make"
                    value={make}
                    onChange={handleMakeChange}
                />
                <FormHelperText>Required</FormHelperText>
            </FormControl>

            <FormControl required sx={{ m: 1, minWidth: 120 }}>
                <TextField
                    required
                    id="outlined-required"
                    label="Model"
                    value={model}
                    onChange={handleModelChange}
                />
                <FormHelperText>Required</FormHelperText>
            </FormControl>
            
            <FormControl required sx={{ m: 1, minWidth: 120 }}>
                <TextField
                    required
                    id="outlined-required"
                    label="Year"
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                    onChange = {handleYearChange}
                    value = {year}
                    
                />
                <FormHelperText>Required</FormHelperText>
            </FormControl>

            <FormControl required sx={{ m: 1, minWidth: 120 }}>
                <TextField
                    required
                    id="outlined-required"
                    label="Price ($)"
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                    onChange = {handlePriceChange}
                    value = {price}
                />
                <FormHelperText>Required</FormHelperText>
            </FormControl>

            <FormControl required sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-required-label">Status</InputLabel>
                <Select
                labelId="demo-simple-select-required-label"
                id="demo-simple-select-required"
                value={isLive ? 'Live' : 'Sold'}
                label="Status *"
                onChange={handleSaleStatusChange}
                >
                    <MenuItem value={'Live'}>Live</MenuItem>
                    <MenuItem value={'Sold'}>Sold</MenuItem>
                </Select>
                <FormHelperText>Required</FormHelperText>
            </FormControl>


            </Grid>
            <div className='footer'>
                {modalForm.isEdit? 
                <LoadingButton 
                loading={isUpdating || isAdding || isDeleting} 
                loadingIndicator={(isUpdating || isAdding)? 'updating' : 'deleting'} 
                onClick={handleDelete} variant="contained" color='error'
                disabled = {isLive}
                >Delete</LoadingButton> : 
                <div> </div>
                }
                <div>
                    <LoadingButton 
                    loading={isUpdating || isAdding || isDeleting} 
                    loadingIndicator={(isUpdating || isAdding)? 'updating' : 'deleting'} 
                    disabled={!submitEnabled} onClick={handleFormSubmit} variant="contained">Submit</LoadingButton>
                    <Button onClick={handleModalClose} variant="contained" style={{marginLeft: '0.5rem'}}>Cancel</Button>
                </div>
            </div>
        </Dialog>
        </>
        )
}