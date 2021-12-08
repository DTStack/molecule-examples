import React from 'react';
import { Routes, Route } from "react-router-dom";

import { MoleculeProvider, Workbench } from '@dtinsight/molecule';
import '@dtinsight/molecule/esm/style/mo.css';

import extensions from './extensions';
import MyWorkbench from './views/myWorkbench';
import './App.css';

(window as any).__DEVELOPMENT__ = false;

function NotFound() {
  return (
    <main style={{ padding: "1rem" }}>
      <p>There's nothing here!</p>
    </main>
  )
}

function App() {
  return (
    <div className="App">
        <MoleculeProvider extensions={extensions}>
          <Routes>
            <Route path="/" element={<MyWorkbench />} />
            <Route path="vscode" element={<Workbench />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </MoleculeProvider>
    </div>
  );
}

export default App;
