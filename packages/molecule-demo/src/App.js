// import logo from './logo.svg';
import './App.css';
import { MoleculeProvider, Workbench } from '@dtinsight/molecule';
import '@dtinsight/molecule/esm/style/mo.css';

window.__DEVELOPMENT__ = false;

function App() {
  return (
    <div className="App">
      <MoleculeProvider extensions={[]}>
            <Workbench />
      </MoleculeProvider>
    </div>
  );
}

export default App;
