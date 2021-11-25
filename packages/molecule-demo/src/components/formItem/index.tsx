import React from 'react';
import molecule from '@dtinsight/molecule';
import styled from 'styled-components'


const Input = molecule.component.Input;

export type FormItemProps = {
    style?: React.CSSProperties;
    className?: string;
    label: string;
    name: string;
    id: string;
}


export const FormItemWrapper = styled.div`
    margin-bottom: 10px;
`;

export const FormItemLabel = styled.label`
    line-height: 28px;
`;

export function FormItem(props: React.PropsWithChildren<Partial<FormItemProps>>) {
    const { id, label, name, children, ...restProps} = props;
    return (
        <FormItemWrapper {...restProps}>
            { label ? <FormItemLabel title={label} htmlFor={id}>
                {label}: 
                </FormItemLabel>
            : null }
            { children || <Input id={id} name={name || label} autoComplete="false"/>}
        </FormItemWrapper>
    )
}