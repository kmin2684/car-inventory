import {useState, useEffect} from 'react';

import { useTypedSelector, useAppDispatch } from "../../store";
import { modalFormActions } from "../../store/modalFormSlice";

import { useUpdateCarMutation, useAddCarMutation, useDeleteCarMutation } from '../../store/mainApi';

import Dialog from '@mui/material/Dialog';
import { Grid, Paper} from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';

export default function ModalForm() {

    const modalForm = useTypedSelector(state => state.modalForm);
    const dispatch = useAppDispatch();

    const [submitEnabled, setSubmitEnabled] = useState(false);
    
    const [make, setMake] = useState(modalForm.carData.make);
    const [model, setModel] = useState(modalForm.carData.model);
    const [year, setYear] = useState(modalForm.carData.year);
    const [price, setPrice] = useState(modalForm.carData.price)
    const [isLive, setIsLive] = useState(modalForm.carData.isLive);

    const [updateCar, {isLoading: isUpdating}] = useUpdateCarMutation();

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        // dispatch(modalFormActions.updatePrice(onlyNums)); 
        setPrice(e.target.value.replace(/[^0-9]/g, ''));
    }

    const handleYearChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        // dispatch(modalFormActions.replaceCarData({...modalForm.carData, Year: onlyNums})); 
        setYear(e.target.value.replace(/[^0-9]/g, ''));
    }

    const handleMakeChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setMake(e.target.value)
        // dispatch(modalFormActions.replaceCarData({...modalForm.carData, make}))
        
    }

    const handleModelChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setModel(e.target.value)
        // const model = e.target.value;
        // dispatch(modalFormActions.replaceCarData({...modalForm.carData, model}))
    }

    const handleSaleStatusChange = (e: SelectChangeEvent<string>) => {
        if (e.target.value === 'Live') {
            setIsLive(true)
            // dispatch(modalFormActions.replaceCarData({...modalForm.carData, isLive: true}))
        } else {
            setIsLive(false)
            // dispatch(modalFormActions.replaceCarData({...modalForm.carData, isLive: false}))
        }
    }



    const handleModalClose = () => {
        dispatch(modalFormActions.turnOn(false))
      }

    const handleFormSubmit = () => {
        if (modalForm.isEdit) {
            const data = {
                make: make.trim(),
                model: model.trim(),
                year: year.trim(),
                price: price.trim(),
                isLive, 
            }
            console.log('edit', modalForm.carData.id, data)
            updateCar({id: modalForm.carData.id, patch: data})

        } else {
                console.log('add a new car', 
                {
                    make: make.trim(),
                    model: model.trim(),
                    year: year.trim(),
                    price: price.trim(),
                    isLive, 
                })
            }
        dispatch(modalFormActions.turnOn(false));
            
        }

    useEffect(() => {
        setMake(modalForm.carData.make)
    }, [modalForm.isOn,modalForm.carData.make])

    useEffect(() => {
        setModel(modalForm.carData.model)
    }, [modalForm.isOn,modalForm.carData.model])

    useEffect(() => {
        setYear(modalForm.carData.year)
    }, [modalForm.isOn,modalForm.carData.year])

    useEffect(() => {
        setPrice(modalForm.carData.price)
    }, [modalForm.isOn,modalForm.carData.price])

    useEffect(() => {
        setIsLive(modalForm.carData.isLive)
    }, [modalForm.isOn,modalForm.carData.isLive])

    useEffect(() => {
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
            {modalForm.isEdit? <Button>Delete</Button> : null}
            <Button disabled={!submitEnabled} onClick={handleFormSubmit}>Submit</Button>
            <Button onClick={handleModalClose}>Cancel</Button>
        </Dialog>
        </>
        )
}