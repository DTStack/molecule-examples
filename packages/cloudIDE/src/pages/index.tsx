import { useState, useEffect } from 'react';
import { Form, Input, Button, message, Card, Modal } from 'antd';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import { history } from 'umi';
import styles from './index.less';

export default function IndexPage() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [steps, setSteps] = useState(0);
  const [repos, setRepos] = useState<{ repo: string; loading: boolean }[]>([]);
  const [visible, setVisible] = useState(false);
  const [repoVal, setVal] = useState('');

  useEffect(() => {
    fetch('/api/users/isLogin', {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          setSteps(1);
          getRepo();
        }
      });
  }, []);

  const getRepo = () => {
    fetch('/api/mo/getRepo', {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          if (res.data.repos.some((repo: any) => repo.loading)) {
            setTimeout(() => {
              getRepo();
            }, 1000);
          }
          setRepos(res.data.repos);
        } else {
          message.error(res.message);
        }
      });
  };

  const onFinish = (values: any) => {
    setLoading(true);
    fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify(values),
      headers: {
        'content-type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          form.resetFields();
          setSteps(1);
        } else {
          message.error('登陆失败');
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleChooseRepo = (repo: { repo: string; loading: boolean }) => {
    if (!repo.loading) {
      fetch('/api/mo/chooseRepo', {
        method: 'POST',
        body: JSON.stringify({ repo: repo.repo }),
        headers: {
          'content-type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.success) {
            history.push('/workspace');
          } else {
            message.error(res.message);
          }
        });
    }
  };

  const handleOpenModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    fetch('/api/mo/createRepo', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ repo: repoVal }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          setVisible(false);
          getRepo();
        } else {
          message.error(res.message);
        }
      });
  };

  const handleCancel = () => {
    setVal('');
    setVisible(false);
  };

  const handleValChange = (e: any) => {
    setVal(e.target.value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {steps === 0 && (
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                { required: true, message: 'Please input your username!' },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: 'Please input your password!' },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 10, span: 12 }}>
              <Button loading={loading} type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        )}
        {steps === 1 && (
          <div>
            <Card title="Workspace">
              {repos.map((repo) => (
                <Card.Grid
                  key={repo.repo}
                  className={styles.card}
                  onClick={() => handleChooseRepo(repo)}
                >
                  {repo.repo}
                  <br />
                  {repo.loading && <LoadingOutlined />}
                </Card.Grid>
              ))}
              <Card.Grid className={styles.card} onClick={handleOpenModal}>
                Add Repo
                <PlusOutlined />
              </Card.Grid>
            </Card>
          </div>
        )}
      </div>
      <Modal
        title="Add repository"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input
          placeholder="Input repository"
          value={repoVal}
          onChange={handleValChange}
        />
      </Modal>
    </div>
  );
}
