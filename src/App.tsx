import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import DataTable from './components/DataTable/DataTable';
import ResponsiveDrawer from './components/Drawer/ResponsiveDrawer';
import PersistentDrawer from './components/Drawer/PersistentDrawer';
import ModalForm from './components/ModalForm/ModalForm';
import './App.css';


function App() {
  return (
    <div className="App">
      <header className="App-header">
      </header>
      <PersistentDrawer />
      <ModalForm />
    </div>
  );
}

export default App;
