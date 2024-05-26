import "./index.scss";
import { useEffect, useState } from "react";
import {
  Button,
  Drawer,
  Form,
  Input,
  Select,
  Space,
  Switch,
  message,
} from "antd";
import { TranslationServiceImpl } from "@/services/translate";
import { Language } from "@/types/language";
import axiosInstance from "@/services/axios.intance";

const DrawerRegisterUser = ({ show, handleClose }: any) => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);

  const translation = new TranslationServiceImpl();
  const [language, setLanguage] = useState<Language>();

  const onFinish = async (data: any) => {
    setLoading(true);
    const { confirmPassword, ...newUser } = data;
    await axiosInstance
      .post("/users/create", newUser)
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

  // Função customizada de validação para confirmar se as senhas são iguais
  const validatePasswordConfirmation = ({ getFieldValue }: any) => ({
    validator(_: any, value: string) {
      if (!value || getFieldValue("password") === value) {
        return Promise.resolve();
      }
      return Promise.reject(new Error(language?.rules.passwordNotEqual));
    },
  });

  useEffect(() => {
    if (show) {
      form.resetFields();
      setLanguage(translation.getTranslation());
    }
  }, [show]);

  return (
    <>
      {contextHolder}
      <Drawer
        open={show}
        onClose={handleClose}
        title={language?.drawers.register_user}
        extra={
          <Space>
            <Button onClick={handleClose}>
              {language?.actions_buttons.cancel}
            </Button>
            <Button
              type="primary"
              onClick={() => form.submit()}
              loading={loading}
            >
              {language?.actions_buttons.save}
            </Button>
          </Space>
        }
      >
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Form.Item
            label={language?.labels_form.name}
            name="name"
            rules={[
              {
                required: true,
                message: language?.rules.name,
              },
            ]}
          >
            <Input placeholder={language?.placeHolders.name} />
          </Form.Item>
          <Form.Item
            label={language?.labels_form.email}
            name="email"
            rules={[
              {
                type: "email",
                message: language?.rules.invalidEmail,
              },
              {
                required: true,
                message: language?.rules.email,
              },
            ]}
          >
            <Input placeholder={language?.placeHolders.email} />
          </Form.Item>
          <Form.Item
            label={language?.labels_form.password}
            name="password"
            rules={[
              {
                required: true,
                message: language?.rules.password,
              },
            ]}
          >
            <Input.Password placeholder={language?.placeHolders.password} />
          </Form.Item>
          <Form.Item
            label={language?.labels_form.confirmPassword}
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              {
                required: true,
                message: language?.rules.password,
              },
              ({ getFieldValue }) =>
                validatePasswordConfirmation({ getFieldValue }),
            ]}
          >
            <Input.Password
              placeholder={language?.placeHolders.repeatPassword}
            />
          </Form.Item>
          <Form.Item
            label={language?.labels_form.language}
            name="language"
            rules={[{ required: true, message: language?.rules.language }]}
          >
            <Select allowClear placeholder={language?.placeHolders.language}>
              <Select.Option value="portuguese">Português</Select.Option>
              <Select.Option value="english">English</Select.Option>
              <Select.Option value="spanish">Español</Select.Option>
            </Select>
          </Form.Item>
          <div className="divider-item">
            <span>{language?.labels_form.create_rollout}</span>
            <Form.Item
              name={["permissions", "create_rollout"]}
              valuePropName="checked"
              className="divider-switch"
            >
              <Switch />
            </Form.Item>
          </div>
          <div className="divider-item">
            <span>{language?.labels_form.update_release}</span>
            <Form.Item
              name={["permissions", "update_release"]}
              valuePropName="checked"
              className="divider-switch"
            >
              <Switch />
            </Form.Item>
          </div>
          <div className="divider-item">
            <span>{language?.labels_form.remove_rollout}</span>
            <Form.Item
              name={["permissions", "remove_rollout"]}
              valuePropName="checked"
              className="divider-switch"
            >
              <Switch />
            </Form.Item>
          </div>
          <div className="divider-item">
            <span>{language?.labels_form.admin}</span>
            <Form.Item
              name={["permissions", "admin"]}
              valuePropName="checked"
              className="divider-switch"
            >
              <Switch />
            </Form.Item>
          </div>
        </Form>
      </Drawer>
    </>
  );
};
export default DrawerRegisterUser;
