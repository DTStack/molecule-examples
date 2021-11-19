import 'reflect-metadata';
import { container } from 'tsyringe';
import React, { useCallback, useEffect } from 'react';

import { connect } from '@dtinsight/molecule/esm/react';
import { MenuBarController } from '@dtinsight/molecule/esm/controller/menuBar';

import { IMenuBar, IMenuBarItem } from '@dtinsight/molecule/esm/model/workbench/menuBar';
import { IMenuBarController } from '@dtinsight/molecule/esm/controller/menuBar';
import { IMenuProps, Menu, MenuMode } from '@dtinsight/molecule/esm/components';
import { KeybindingHelper } from '@dtinsight/molecule/esm/services/keybinding';
import { MenuBarService } from '@dtinsight/molecule/esm/services';

import './style.css';
import styled from 'styled-components';

const menuBarService = container.resolve(MenuBarService);
const menuBarController = container.resolve(MenuBarController);

const Logo = styled.img`
    height: 25px;
    margin: 0 12px;
`

export function MenuBar(props: IMenuBar & IMenuBarController) {
    const { data, onClick, updateFocusinEle } = props;

    const addKeybindingForData = (
        rawData: IMenuBarItem[] = []
    ): IMenuProps[] => {
        const resData: IMenuProps[] = rawData.concat();
        const stack = [...resData];
        while (stack.length) {
            const head = stack.pop();
            if (head) {
                if (head?.data) {
                    stack.push(...head.data);
                } else {
                    const simplyKeybinding =
                        KeybindingHelper.queryGlobalKeybinding(head.id!) || [];
                    if (simplyKeybinding.length) {
                        head.keybinding = KeybindingHelper.convertSimpleKeybindingToString(
                            simplyKeybinding
                        );
                    }
                }
            }
        }
        return resData;
    };

    const handleClick = (e: React.MouseEvent, item: IMenuBarItem) => {
        onClick?.(e, item);
    };

    const handleSaveFocusinEle = useCallback((e: FocusEvent) => {
        updateFocusinEle?.(e.target as HTMLElement | null);
    }, [updateFocusinEle]);

    useEffect(() => {
        document.body.addEventListener('focusin', handleSaveFocusinEle);
        return () => {
            document.body.removeEventListener('focusin', handleSaveFocusinEle);
        };
    }, [ handleSaveFocusinEle ]);

    return (
        <div className="myMenuBar">
            <Logo alt="logo" src="logo@1x.png"/>
            <Menu
                role="menu"
                mode={MenuMode.Horizontal}
                trigger="click"
                onClick={handleClick}
                style={{ width: '100%' }}
                data={addKeybindingForData(data)}
            />
        </div>
    );
}

const MyMenuBarView = connect(menuBarService, MenuBar, menuBarController);

export default MyMenuBarView;
