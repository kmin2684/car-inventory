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
    return ( <>    
        <Dialog className='ModalForm' open={true} maxWidth='lg' fullWidth={true} >
            <Paper className="title"> form </Paper>
            <Grid container columns={{ xs: 12, sm: 12, md: 12, lg:12 }} justifyContent="flex-start">   
                <TextField
                    required
                    id="outlined-required"
                    label="Make"
                    
                />
                <TextField
                    required
                    id="outlined-required"
                    label="Model"
                    
                />
                <TextField
                    required
                    id="outlined-required"
                    label="Year"
                    
                />
                <TextField
                    required
                    id="outlined-required"
                    label="Price"
                    
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                />



            <FormControl required sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-required-label">Status</InputLabel>
                <Select
                labelId="demo-simple-select-required-label"
                id="demo-simple-select-required"
                value={'Live'}
                label="Status *"
                // onChange={handleChange}
                >
                    <MenuItem value={'Live'}>Live</MenuItem>
                    <MenuItem value={'Sold'}>Sold</MenuItem>
                </Select>
                <FormHelperText>Required</FormHelperText>
            </FormControl>


            </Grid>
            <Button>Submit</Button>
            <Button>Cancel</Button>
        </Dialog>
        </>
        )
}