import http from "../common/http";

const basePath = '/mock';

const api = {
    getFolderTree() {
        return http.get(`${basePath}/folderTree.json`);
    },

    search(value: string) {
        return http.get(`${basePath}/folderTree.json`, { query: value });
    },

    getDataSource() {
        return http.get(`${basePath}/dataSource.json`);
    },

    getDataSourceById(sourceId: string): Promise<DataSourceType> {
        return new Promise<DataSourceType>((resolve, reject) => {
            const mockDataSource: DataSourceType = {
                id: sourceId,
                name: `dataSource` + sourceId,
                type: 'MySQL',
                jdbcUrl: 'http://jdbc:127.0.0.1//3306',
                updateTime: Date.now() + ''
            }
            resolve(mockDataSource)
        });
    },

    createDataSource(dataSource: Omit<DataSourceType, 'id'>) {
        return new Promise((resolve, reject) => {
            resolve({
                code: 200,
                message: 'success',
                data: dataSource
            })
        });
    }
}

export default api;