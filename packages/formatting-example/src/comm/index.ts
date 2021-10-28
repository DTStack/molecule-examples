import { debounce } from 'lodash';
import moment from 'moment';

// 请求防抖动
export function debounceEventHander(func: any, wait?: number, options?: any) {
    const debounced = debounce(func, wait, options);
    return function (e: any) {
        e.persist();
        return debounced(e);
    };
}

/**
 * 匹配自定义任务参数
 * @param {Array} taskCustomParams
 * @param {String} sqlText
 */
export function matchTaskParams(taskCustomParams: any, sqlText: any) {
    const regx = /\$\{([.\w]+)\}/g;
    const data: any = [];
    let res = null;
    while ((res = regx.exec(sqlText)) !== null) {
        const name = res[1];
        const param: any = {
            paramName: name,
            paramCommand: '',
        };
        const sysParam = taskCustomParams.find(
            (item: any) => item.paramName === name
        );
        if (sysParam) {
            param.type = 0;
            param.paramCommand = sysParam.paramCommand;
        } else {
            param.type = 1;
        }
        // 去重
        const exist = data.find((item: any) => name === item.paramName);
        if (!exist) {
            data.push(param);
        }
    }
    return data;
}

export function formatDateTime(timestap: string | number | Date) {
    return moment(timestap).format('YYYY-MM-DD HH:mm:ss');
}

export function checkExist(prop: any) {
    return prop !== undefined && prop !== null && prop !== '';
}

export function formJsonValidator(rule: any, value: any, callback: any) {
    let msg: any;
    try {
        if (value) {
            const t = JSON.parse(value);
            if (typeof t !== 'object') {
                msg = '请填写正确的JSON';
            }
        }
    } catch (e) {
        msg = '请检查JSON格式，确认无中英文符号混用！';
    } finally {
        callback(msg);
    }
}
