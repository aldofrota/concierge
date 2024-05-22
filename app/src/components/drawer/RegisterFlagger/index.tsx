import { useEffect, useState } from "react";
import {
  Button,
  DatePicker,
  Drawer,
  Form,
  Input,
  Space,
  Switch,
  message,
} from "antd";
import axiosInstance from "@/services/axios.intance";
import TextArea from "antd/es/input/TextArea";

const DrawerRegisterFlagger = ({ show, handleClose }: any) => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);

  const onFinish = async (data: any) => {
    setLoading(true);
    await axiosInstance
      .post("/create", data)
      .then((res) => {
        setLoading(false);
        messageApi.success(res.data.message);
        handleClose();
      })
      .catch((reason) => {
        messageApi.error(reason.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (show) {
      form.resetFields();
    }
  }, [show]);

  return (
    <>
      {contextHolder}
      <Drawer
        open={show}
        onClose={handleClose}
        title="Cadastrar flagger"
        extra={
          <Space>
            <Button onClick={handleClose}>Cancelar</Button>
            <Button
              type="primary"
              onClick={() => form.submit()}
              loading={loading}
            >
              Salvar
            </Button>
          </Space>
        }
      >
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Form.Item
            label="Flagger"
            name="flagger"
            rules={[
              {
                required: true,
                message: "Informe o nome da Flagger!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Data de expiração"
            name="expiration_at"
            rules={[
              {
                required: true,
                message: "Informe a data para expiração!",
              },
            ]}
          >
            <DatePicker format="DD/MM/YYYY" />
          </Form.Item>
          <Form.Item
            label="Full rollout"
            name="full_rollout"
            valuePropName="checked"
            className="divider-switch"
          >
            <Switch checkedChildren="Sim" unCheckedChildren="Não" />
          </Form.Item>
          <Form.Item
            label="Descrição"
            name="description"
            rules={[
              {
                required: true,
                message: "Informe uma descrição!",
              },
            ]}
          >
            <TextArea rows={4} />
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
};
export default DrawerRegisterFlagger;
