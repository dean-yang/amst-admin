import { Form, Input, Button } from 'antd';
import fetch from '../../services/axios'
import api from '../../api'

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const Login = (props:any) => {
  const onFinish = (values: any) => {
    fetch.post(api.login,values).then((res:any )=> {
      for(let key in res.data){
        localStorage.setItem(key,res.data[key])
      }
      props.history.push('/firstPro')
    })
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div style={{display:"flex",justifyContent:"center",alignItems:"center",width:"100%",height:"100%"}}>
    <Form
      {...layout}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="用户名"
        name="adminUsername"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="密码"
        name="adminPassword"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          登陆
        </Button>
      </Form.Item>
    </Form>
    </div>

  );
};
export default Login