import React from 'react';
import { Routes, Route } from "react-router-dom";

import { MoleculeProvider, Workbench } from '@dtinsight/molecule';
import '@dtinsight/molecule/esm/style/mo.css';

import extensions from './extensions';
import MyWorkbench from './views/myWorkbench';
import './App.css';

(window as any).__DEVELOPMENT__ = false;

function App() {
  return (
    <div className="App">
        <MoleculeProvider extensions={extensions}>
          <Routes>
            <Route path="/" element={<MyWorkbench />} />
            <Route path="/vscode" element={<Workbench />} />
          </Routes>
        </MoleculeProvider>
    </div>
  );
}

export default App;
