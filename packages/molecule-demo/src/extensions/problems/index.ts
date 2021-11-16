import molecule from '@dtinsight/molecule';
import { IExtension } from '@dtinsight/molecule/esm/model/extension';
import { IExtensionService } from '@dtinsight/molecule/esm/services';

const mockProblems = {
    id: 1,
    name: 'text.tsx',
    isLeaf: false,
    value: {
        code: 'text.tsx',
        message: 'Folder',
        startLineNumber: 0,
        startColumn: 1,
        endLineNumber: 0,
        endColumn: 1,
        status: 1,
    },
    children: [
        {
            id: 3,
            name: '0-1',
            isLeaf: true,
            value: {
                code: 'endLineNumber',
                message: 'Syntax Error',
                startLineNumber: 0,
                startColumn: 1,
                endLineNumber: 0,
                endColumn: 1,
                status: 8,
            },
            children: [],
        },
        {
            id: 4,
            name: '0-1',
            isLeaf: true,
            value: {
                code: 'endLineNumber',
                message: 'Warning, useless variables!',
                startLineNumber: 0,
                startColumn: 1,
                endLineNumber: 0,
                endColumn: 1,
                status: 4,
            },
            children: [],
        },
        {
            id: 5,
            name: '0-1',
            isLeaf: true,
            value: {
                code: 'endLineNumber',
                message: 'Just a normal message!',
                startLineNumber: 0,
                startColumn: 1,
                endLineNumber: 0,
                endColumn: 1,
                status: 2,
            },
            children: [],
        },
    ],
};

export class ProblemsExtension implements IExtension {

    id: string = '';
    name: string = '';

    constructor(
        id: string = 'Problems', 
        name: string = 'Problems'
    ) {
        this.id = id;
        this.name = name;
    }

    activate(extensionCtx: IExtensionService): void {
        molecule.problems.add(mockProblems);
    }

    dispose(extensionCtx: IExtensionService): void {
        molecule.panel.remove(mockProblems.id + '');
    }
}