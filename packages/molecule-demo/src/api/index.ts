import http from "../common/http";

const basePath = '/mock';

const api = {
    getFolderTree() {
        return http.get(`${basePath}/folderTree.json`);
    },

    search(value: string) {
        return http.get(`${basePath}/folderTree.json`, { query: value });
    },
}

export default api;