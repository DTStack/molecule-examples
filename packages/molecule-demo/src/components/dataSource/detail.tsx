import React from 'react';

export type DataSourceDetailProps = {
    dataSource?: Partial<DataSourceType>;
}

const styledTable = {
    margin: 10,
    display: 'block'
}

export function DataSourceDetail({ dataSource = {} }: DataSourceDetailProps) {
    const { name, type, jdbcUrl, updateTime } = dataSource;
    return (
        <div className="dataSource__detail">
            <table style={styledTable}>
                <tr><td>Name：</td><td>{name}</td></tr>
                <tr><td>Type：</td><td>{type}</td></tr>
                <tr><td>JdbcUrl：</td><td>{jdbcUrl}</td></tr>
                <tr><td>Update Time：</td><td>{updateTime}</td></tr>
            </table>
        </div>
    );
}

export default DataSourceDetail;
