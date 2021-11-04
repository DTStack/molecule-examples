/**
 * 存储项目ID的 key 名称
 */
export const PROJECT_KEY = 'project_id';

export const formItemLayout: any = {
    // 表单正常布局
    labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
    },
};

// 发布的item类别
export const publishType = {
    TASK: 0,
    TABLE: 1,
    RESOURCE: 2,
    FUNCTION: 3,
    PRODUCER: 4,
};

export const TASK_TYPE = {
    // 任务类型
    VIRTUAL_NODE: -1,
    /**
     * SparkSQL
     */
    SQL: 0,
    MR: 1,
    SYNC: 2,
    PYTHON: 3,
    R: 4,
    DEEP_LEARNING: 5,
    PYTHON_23: 6,
    SHELL: 7,
    ML: 8,
    HAHDOOPMR: 9,
    WORKFLOW: 10, // 工作流
    DATA_COLLECTION: 11, // 实时采集
    CARBONSQL: 12, // CarbonSQL
    NOTEBOOK: 13,
    EXPERIMENT: 14,
    LIBRASQL: 15,
    CUBE_KYLIN: 16,
    HIVESQL: 17,
    IMPALA_SQL: 18, // ImpalaSQL
    TI_DB_SQL: 19,
    ORACLE_SQL: 20,
    GREEN_PLUM_SQL: 21,
    TENSORFLOW_1X: 22,
    KERAS: 23,
    PRESTO: 24,
    PYTORCH: 25,
    INCEPTOR: 28,
    SHELL_AGENT: 29,
    ADB: 30,
};

export const DATA_SOURCE = {
    MYSQL: 1,
    ORACLE: 2,
    SQLSERVER: 3,
    POSTGRESQL: 4,
    RDBMS: 5,
    HDFS: 6,
    HIVE_2: 7,
    HBASE: 8,
    FTP: 9,
    MAXCOMPUTE: 10,
    ES: 11,
    REDIS: 12,
    MONGODB: 13,
    ADS: 15,
    DB2: 19,
    CARBONDATA: 20,
    LIBRASQL: 21,
    GBASE: 22,
    KYLIN: 23,
    KUDU: 24,
    CLICK_HOUSE: 25,
    HIVE_1: 27,
    POLAR_DB: 28,
    IMPALA: 29,
    PHOENIX: 30,
    TI_DB: 31,
    SQLSERVER_2017_LATER: 32,
    /**
     * 达梦数据库
     */
    DM: 35,
    GREEN_PLUM: 36,
    PHOENIX5: 38,
    KINGBASE: 40,
    HIVE_SERVER: 45,
    HIVE_3: 50,
    S3: 51,
    INCEPTOR: 52,
    ADB: 54,
    INFLUXDB: 55,
    OPEN_TS_DB: 56,
};

export const OPENTSDB_CULUMNS = [
    {
        type: 'STRING',
        key: 'metric',
    },
    {
        type: 'STRING',
        key: 'timestamp',
    },
    {
        type: 'STRING',
        key: 'value',
    },
    {
        type: 'STRING',
        key: 'tags',
    },
];

export const SUPPROT_SUB_LIBRARY_DB_ARRAY: any = [
    // 支持分库分表的数据库类型r
    DATA_SOURCE.MYSQL,
    // DATA_SOURCE.ORACLE,
    // DATA_SOURCE.SQLSERVER,
    // DATA_SOURCE.POSTGRESQL,
];

export const HELP_DOC_URL = {
    INDEX: '/public/helpSite/batch/v3.0/Summary.html',
    DATA_SOURCE: '/public/helpSite/batch/v3.0/DataIntegration/Overview.html',
    DATA_SYNC: '/public/helpSite/batch/v3.0/DataIntegration/JobConfig.html',
    TASKPARAMS:
        '/public/helpSite/batch/v3.0/DataDevelop/ScheduleConfig.html#ParamConfig',
};

export const DATA_SYNC_MODE = {
    // 数据同步模式-正常/增量
    NORMAL: 0, // 正常
    INCREMENT: 1, // 增量
};

export const TASK_STATUS = {
    // 任务状态
    ALL: null as any,
    WAIT_SUBMIT: 0,
    CREATED: 1,
    INVOKED: 2,
    DEPLOYING: 3,
    RUNNING: 4,
    FINISHED: 5,
    STOPING: 6,
    STOPED: 7,
    RUN_FAILED: 8, // 运行失败
    SUBMIT_FAILED: 9, // 提交失败
    PARENT_FAILD: 21, // 上游失败
    SUBMITTING: 10,
    RESTARTING: 11,
    SET_SUCCESS: 12,
    KILLED: 13,
    TASK_STATUS_NOT_FOUND: 15, // 暂时无法获取任务状态
    WAIT_RUN: 16,
    WAIT_COMPUTE: 17,
    FROZEN: 18,
    DO_FAIL: 22,
    AUTO_CANCEL: 24, // 自动取消
};

export const SCRIPT_TYPE = {
    // 脚本类型
    SQL: 0,
    PYTHON2: 1,
    PYTHON3: 2,
    SHELL: 3,
    LIBRASQL: 4,
    IMPALA_SQL: 5,
    TI_DB_SQL: 6,
};

export const hdfsFieldTypes: any = [
    // hdfs 类型
    'STRING',
    'VARCHAR',
    'CHAR',
    'TINYINT',
    'SMALLINT',
    'INT',
    'BIGINT',
    'FLOAT',
    'DECIMAL',
    'DOUBLE',
    'TIMESTAMP',
    'DATE',
];

export const hbaseFieldTypes = [
    // HBase 类型
    'BOOLEAN',
    'INT',
    'STRING',
    'LONG',
    'DOUBLE',
    'SHORT',
    'FLOAT',
];

// 资源类型
export const RESOURCE_TYPE = {
    0: 'other',
    OTHER: 0,
    1: 'jar',
    JAR: 1,
    2: 'py',
    PY: 2,
    3: 'zip',
    ZIP: 3,
    4: 'egg',
    EGG: 4,
};
