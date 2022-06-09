import React from 'react';
import molecule from '@dtinsight/molecule';
import styled from 'styled-components'
import { container } from 'tsyringe';

import API from '../../api';
import { FormItem } from '../../components/formItem';
import { existCreateDataSourceView } from '../../extensions/dataSource/base';
import { NotificationController } from '@dtinsight/molecule/esm/controller';

const Button = molecule.component.Button;

const CreateDataSource = styled.div`
    width: 50%;
    margin: auto;
`

const CreateDataBtn= styled(Button)`
    width: 120px;
    display: inline-block;
`

export class CreateDataSourceView extends React.Component {

    state = {
        data: [],
        currentDataSource: undefined
    }

    formRef: React.RefObject<HTMLFormElement>;

    constructor(props: any) {
        super(props);
        this.formRef = React.createRef();
    }

    componentDidMount() {}

    submit = async (e: React.FormEvent) => {
        const form = new FormData(this.formRef.current || undefined);
        const dataSource = {
            name: form.get('name')?.toString() || '',
            type: form.get('type')?.toString() || '',
            jdbcUrl: form.get('jdbcUrl')?.toString()  || '',
            updateTime: new Date().getTime().toString()
        }

        API.createDataSource(dataSource).then((res: any) => {
            if (res.code === 200) {

                molecule.notification.add([{
                    id: 2,
                    value: dataSource,
                    render(item) {
                        return <p>Create the Database <b>{item.value.name}</b> is success!</p>
                    }
                }]);
                container.resolve(NotificationController).toggleNotifications();
                // molecule.notification.toggleNotification(); // Invalid
            }
        });
    }

    close = async (e: React.FormEvent) => {
        existCreateDataSourceView();
    }

    render() {
        return (
            <CreateDataSource className="dataSource__create">
               <form ref={this.formRef} onSubmit={this.submit}>
                    <FormItem label="Name" name="name"/>
                    <FormItem label="Type" name="type"/>
                    <FormItem label="JdbcUrl" name="jdbcUrl"/>
                    <FormItem style={{ textAlign: 'left' }}>
                        <CreateDataBtn style={{ marginLeft: 0 }} onClick={this.submit}>Create</CreateDataBtn>
                        <CreateDataBtn onClick={this.close}>Close</CreateDataBtn>
                    </FormItem>
               </form>
            </CreateDataSource>
        );
    }
}

export default CreateDataSourceView;
