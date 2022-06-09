import 'whatwg-fetch';

class Http {

    get(url: any, params?: any) {
        const newUrl = params ? this.build(url, params) : url;
        return this.request(newUrl, {
            method: 'GET',
        });
    }

    post(url: any, body?: any) {
        const options: any = { method: 'POST' };
        if (body) options.body = JSON.stringify(body);
        return this.request(url, options);
    }

    postAsFormData(url: any, params: any) {
        const options: any = { method: 'POST' };
        if (params) options.body = this.buildFormData(params);
        return this.request(url, options);
    }

    postForm(url: any, form: any) {
        const options: any = { method: 'POST' };
        if (form) options.body = new FormData(form);
        return this.request(url, options);
    }

    request(url: any, options: RequestInit) {
        options.credentials = 'same-origin';
        options.headers = {
            ...options.headers,
        };
        return (
            fetch(url, options)
                .then((response: any) => {
                    return response.json();
                })
                .then((res) => {
                    return res;
                })
                .catch((err: any) => {
                    return err;
                })
        );
    }

    defaultHeader() {
        const header: any = {
            Accept: '*/*',
            'Content-Type': 'application/json',
        };
        return header;
    }

    build(url: any, params: any) {
        const ps: any = [];
        if (params) {
            for (const p in params) {
                if (p) {
                    ps.push(p + '=' + encodeURIComponent(params[p]));
                }
            }
        }
        return url + '?' + ps.join('&');
    }

    buildFormData(params: any) {
        if (params) {
            const data = new FormData();
            for (const p in params) {
                if (p) {
                    data.append(p, params[p]);
                }
            }
            return data;
        }
    }
}

const httpUtils = new Http();

export default httpUtils;