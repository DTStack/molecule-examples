import React from 'react';
import './App.css';

import { MoleculeProvider, Workbench } from '@dtinsight/molecule';
import '@dtinsight/molecule/esm/style/mo.css';

import extensions from './extensions';

(window as any).__DEVELOPMENT__ = false;

function App() {
  return (
    <div className="App">
       <MoleculeProvider extensions={extensions}>
            <Workbench />
        </MoleculeProvider>
    </div>
  );
}

export default App;
