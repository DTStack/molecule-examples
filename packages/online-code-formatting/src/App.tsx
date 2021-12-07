import React from 'react';
import { MoleculeProvider, Workbench } from '@dtinsight/molecule';
import '@dtinsight/molecule/esm/style/mo.css';

import './App.css';

import { customExtensions } from './extensions';

function App() {
  return (
    <MoleculeProvider extensions={customExtensions}>
        <Workbench />
    </MoleculeProvider>
  );
}

export default App;
