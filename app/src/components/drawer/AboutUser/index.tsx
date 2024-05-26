import { useEffect, useState } from "react";
import axiosInstance from "@/services/axios.intance";
import {
  Button,
  Checkbox,
  Drawer,
  Form,
  Input,
  Select,
  Space,
  Switch,
  message,
} from "antd";
import { StorageServiceImpl } from "@/services/storage";
import { TranslationServiceImpl } from "@/services/translate";
import { Language } from "@/types/language";

const DrawerAboutUser = ({ show, handleClose, userId }: any) => {
  const storage = new StorageServiceImpl();
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);

  const translation = new TranslationServiceImpl();
  const [language, setLanguage] = useState<Language>();

  const [updateUser, setUpdateUser] = useState<boolean>(false);
  const [originalUser, setOriginalUser] = useState<any>();
  const [userData, setUserData] = useState<any>({});
  const [password, setPassword] = useState<string>("");

  const getUser = async (id: string) => {
    setLoading(true);

    await axiosInstance
      .get("/users/" + id)
      .then(async (res) => {
        setLoading(false);
        res.data.status = res.data.status === "active" ? true : false;
        setUserData({ ...res.data });
        form.setFieldsValue(res.data);
      })
      .catch((reason) => {
        setLoading(false);
        messageApi.error("Erro ao buscar os dados do Usuário 🥺");
        console.error(reason);
      });
  };

  const handleUpdateUser = (status: boolean) => {
    setUpdateUser(status);
    if (status) {
      setOriginalUser({ ...userData });
    } else {
      setUserData({ ...originalUser });
      form.setFieldsValue(originalUser);
    }
  };

  const onFinish = async (data: any) => {
    setLoading(true);
    await axiosInstance
      .put(`users/${userId}/update`, data)
      .then((res) => {
        messageApi.success("Status atualizado");
        const user = storage.getData("user");
        if (user.id === userId) {
          storage.setData("permissions", res.data);
        }
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
      return Promise.reject(new Error("As senhas não coincidem!"));
    },
  });

  const handlePassword = (value: string) => {
    setPassword(value);
  };

  useEffect(() => {
    if (userId) {
      getUser(userId);
      setLanguage(translation.getTranslation());
    } else {
      setUpdateUser(false);
    }
  }, [userId]);

  return (
    <>
      {contextHolder}
      <Drawer
        open={show}
        onClose={handleClose}
        title={language?.drawers.user_data}
        extra={
          updateUser && (
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
          )
        }
      >
        <div className="main-about-user">
          {storage.getData("permissions").admin && (
            <Checkbox
              className="label-edit"
              checked={updateUser}
              onChange={(e) => handleUpdateUser(e.target.checked)}
            >
              <span>{language?.labels_form.update_user}</span>
            </Checkbox>
          )}
          <Form
            layout="vertical"
            disabled={!updateUser}
            form={form}
            onFinish={onFinish}
          >
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
            {updateUser && (
              <>
                <Form.Item
                  label={language?.labels_form.password}
                  name="password"
                  rules={[
                    {
                      required: password.length > 0,
                      message: language?.rules.password,
                    },
                  ]}
                >
                  <Input.Password
                    onChange={(e) => handlePassword(e.target.value)}
                    placeholder={language?.placeHolders.password}
                  />
                </Form.Item>
                <Form.Item
                  label={language?.labels_form.confirmPassword}
                  name="confirmPassword"
                  dependencies={["password"]}
                  rules={[
                    {
                      required: password.length > 0,
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
              </>
            )}

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
        </div>
      </Drawer>
    </>
  );
};
export default DrawerAboutUser;
