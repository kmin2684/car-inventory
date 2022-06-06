import React from 'react';
import { useTypedSelector, useAppDispatch } from './store';
import { snackBarActions } from './store/snackBarSlice';


import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import DataTable from './components/DataTable/DataTable';
import ResponsiveDrawer from './components/Drawer/ResponsiveDrawer';
import PersistentDrawer from './components/Drawer/PersistentDrawer';
import ModalForm from './components/ModalForm/ModalForm';
import Alert from './components/Alert/Alert'

import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

import './App.css';


function App() {
  const snackBar = useTypedSelector(state => state.snackBar);
  const dispatch = useAppDispatch();
  
  const handleSuccessClose = () => {
    dispatch(snackBarActions.turnSuccess({on: false, message: ''}))
  }

  const handleErrorClose = () => {
    dispatch(snackBarActions.turnError({on: false, message: ''}))
  }

  return (
    <div className="App">
      <header className="App-header">
      </header>
      <PersistentDrawer />
      <ModalForm />

      <Snackbar open={snackBar.successOn} autoHideDuration={4000} onClose={handleSuccessClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert onClose={handleSuccessClose} severity="success" sx={{ width: '100%' }}>
          {snackBar.message}
        </Alert>
      </Snackbar>

      <Snackbar open={snackBar.errorOn} autoHideDuration={4000} onClose={handleErrorClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert onClose={handleErrorClose} severity="success" sx={{ width: '100%' }}>
          {snackBar.message}
        </Alert>
      </Snackbar>

    </div>
  );
}

export default App;
