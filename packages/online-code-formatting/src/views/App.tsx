import React from 'react';
import { MoleculeProvider, Workbench } from '@dtinsight/molecule';
import { customExtensions } from './extensions';
import '@dtinsight/molecule/esm/style/mo.css';

function IDE() {
    return (
        <MoleculeProvider extensions={customExtensions}>
            <Workbench />
        </MoleculeProvider>
    );
}

export default IDE;
