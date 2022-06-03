import {useState} from 'react';

import { useTypedSelector, useAppDispatch } from "../../store";
import { modalFormActions } from "../../store/modalFormSlice";

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

    const [price, setPrice] = useState<string | null>(null); 
    const [year, setYear] = useState<string | null>(null); 

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const onlyNums = e.target.value.replace(/[^0-9]/g, '');
        setPrice(onlyNums); 
    }

    const handleYearChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const onlyNums = e.target.value.replace(/[^0-9]/g, '');
        setYear(onlyNums);
    }

    const handleMakeChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        console.log('text field label is', e.target.labels)
        const make = e.target.value;
        dispatch(modalFormActions.replaceCarData({...modalForm.carData, make}))

    }


    return ( <>    
        <Dialog className='ModalForm' open={modalForm.isOn} maxWidth='lg' fullWidth={true} >
            <Paper className="title"> 
                {modalForm.isEdit ? 
                    `Edit - ${modalForm.carData.id}` 
                    :
                    `Add a new vehicle`   
            
            }
            form 
            </Paper>
            <Grid container columns={{ xs: 12, sm: 12, md: 12, lg:12 }} justifyContent="flex-start">   

            <FormControl required sx={{ m: 1, minWidth: 120 }}>
                <TextField
                    required
                    id="outlined-required"
                    label="Make"
                    value={modalForm.carData.make}
                    onChange={handleMakeChange}
                />
                <FormHelperText>Required</FormHelperText>
            </FormControl>

            <FormControl required sx={{ m: 1, minWidth: 120 }}>
                <TextField
                    required
                    id="outlined-required"
                    label="Model"
                    
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
                value={modalForm.carData.isLive ? 'Live' : 'Sold'}
                label="Status *"
                // onChange={handleChange}
                >
                    <MenuItem value={'Live'}>Live</MenuItem>
                    <MenuItem value={'Sold'}>Sold</MenuItem>
                </Select>
                <FormHelperText>Required</FormHelperText>
            </FormControl>


            </Grid>
            {modalForm.isEdit? null : <Button>Delete</Button>}
            <Button>Submit</Button>
            <Button>Cancel</Button>
        </Dialog>
        </>
        )
}