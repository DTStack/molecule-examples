import React from 'react';
import { MoleculeProvider, Workbench } from '@dtinsight/molecule';
import '@dtinsight/molecule/esm/style/mo.css';

function IDE() {
    return (
        <MoleculeProvider extensions={[]}>
            <Workbench />
        </MoleculeProvider>
    );
}

export default IDE;
