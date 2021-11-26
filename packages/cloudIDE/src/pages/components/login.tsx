import { useState, useEffect } from 'react';
import molecule from '@dtinsight/molecule';
import { Modal, Form, Input, Button, message, Steps } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import ReactDOM from 'react-dom';
import { terminalService } from '../extensions/terminal';

const { Step } = Steps;

let loginParentNode: HTMLDivElement | null = null;

export function gotoLogin() {
  if (!loginParentNode) {
    const div = document.createElement('div');
    loginParentNode = div;
    ReactDOM.render(<Login visible />, div);
    document.body.appendChild(div);
  } else {
    ReactDOM.render(<Login visible />, loginParentNode);
  }
}

export function closeLogin() {
  ReactDOM.render(<Login visible={false} />, loginParentNode);
}

function Login({ visible }: { visible: boolean }) {
  const [form] = Form.useForm();
  const [form2] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [currentSteps, setStep] = useState(0);

  useEffect(() => {
    fetch('/api/users/isLogin', {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => {
        const { isLogin, repo } = res;
        if (res.success) {
          if (isLogin && !repo) {
            setStep(1);
          } else if (isLogin && repo) {
            molecule.notification.add([
              {
                id: new Date().getTime(),
                value: 'Already Done!',
              },
            ]);
            molecule.panel.setActive('terminal');
            terminalService.setBasePath(repo);
            closeLogin();
          }
        }
      });
  }, []);

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
          molecule.notification.add([
            {
              id: 1,
              value: (
                <p>
                  <CheckOutlined />
                  登陆成功
                </p>
              ),
            },
          ]);
          setStep(1);
          form.resetFields();
        } else {
          message.error('登陆失败');
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onRepoFinish = (values: any) => {
    fetch('/api/mo/register', {
      method: 'POST',
      body: JSON.stringify(values),
      headers: {
        'content-type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          const { basePath } = res.data;
          terminalService.setBasePath(basePath);
          terminalService.createWebsocket(`git clone ${values.repository}`);
          closeLogin();
        }
      });
  };

  return (
    <Modal
      title="login"
      getContainer={() => loginParentNode!}
      visible={visible}
      footer={null}
      closable={false}
    >
      <Steps style={{ marginBottom: 20 }} current={currentSteps}>
        <Step title="Login" />
        <Step title="Choose reposity" />
      </Steps>
      {currentSteps === 0 && (
        <Form
          form={form}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button loading={loading} type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      )}
      {currentSteps === 1 && (
        <Form
          form={form2}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          onFinish={onRepoFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Repo"
            name="repository"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button loading={loading} type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
}
