import "./index.scss";
import { Button, Drawer, Form, Input, Space, message } from "antd";
import { StorageServiceImpl } from "../../../services/storage";
import { useEffect, useState } from "react";
import { User } from "@/types/user";
import axiosInstance from "@/services/axios.intance";
import { TranslationServiceImpl } from "@/services/translate";
import { Language } from "@/types/language";

const DrawerProfileUser = ({ show, handleClose }: any) => {
  const storage = new StorageServiceImpl();
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<any>(null);

  const translation = new TranslationServiceImpl();
  const [language, setLanguage] = useState<Language>();

  // Inicializa o estado com os dados do usuário
  const [user] = useState<User>(() => {
    return storage.getData("user");
  });

  const onFinish = async (data: any) => {
    // setLoading(true);
    // const { confirmPassword, ...password } = data;
    // await axiosInstance
    //   .post("users/update-password", password)
    //   .then((res) => {
    //     setLoading(false);
    //     messageApi.success(res.data.message);
    //     handleClose();
    //   })
    //   .catch((reason) => {
    //     messageApi.error(reason.message);
    //     setLoading(false);
    //   });
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

  useEffect(() => {
    if (show) {
      form.resetFields();
      setLanguage(translation.getTranslation());
    } else {
      setImage(null);
    }
  }, [show]);

  return (
    <>
      {contextHolder}
      <Drawer
        title={language?.drawers.profile}
        onClose={handleClose}
        open={show}
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
        <div className="main-profile-user">
          <div className="profile-infos">
            <span className="profile-name">{user.name ?? "Concierge"}</span>
            <span className="profile-email">
              {user.email ?? "contato@concierge.com"}
            </span>
          </div>
          <Form
            layout="vertical"
            style={{ width: "100%", padding: "20px" }}
            form={form}
            onFinish={onFinish}
          >
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
              <Input.Password />
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
              <Input.Password />
            </Form.Item>
          </Form>
        </div>
      </Drawer>
    </>
  );
};
export default DrawerProfileUser;
