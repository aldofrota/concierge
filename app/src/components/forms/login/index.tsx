import "./index.scss";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Spin, message } from "antd";

import { StorageServiceImpl } from "@/services/storage";
import axiosInstance from "@/services/axios.intance";
import { TranslationServiceImpl } from "@/services/translate";
import { Language } from "@/types/language";

const initialValue = {
  email: "",
  password: "",
};

const FormLogin = ({}) => {
  // Estados
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);

  // Hooks
  const [form] = Form.useForm();
  const navigate = useNavigate();

  // Services
  const storage = new StorageServiceImpl();
  const translation = new TranslationServiceImpl();
  const [language, setLanguage] = useState<Language>();

  const onFinish = async (data: { email: string; password: string }) => {
    setLoading(true);
    await axiosInstance
      .post("/auth", data)
      .then((res) => {
        const { token, permissions, language, ...user } = res.data;
        const setedUser = storage.setData("user", user);
        const setedPermissions = storage.setData("permissions", permissions);
        const setedToken = storage.setData("token", token);
        const setedLanguage = storage.setData("language", language);
        if (setedUser && setedToken && setedPermissions && setedLanguage) {
          setLoading(false);
          navigate("/dashboard");
        }
      })
      .catch((reason) => {
        setLoading(false);
        messageApi.error(reason.message);
      });
  };

  useEffect(() => {
    storage.deleteData("token");
    setLanguage(translation.getTranslation());
  }, []);

  return (
    <>
      {contextHolder}
      <Form
        className="login-form"
        form={form}
        onFinish={onFinish}
        initialValues={initialValue}
        layout="vertical"
      >
        <div className="title-form">
          <h2>{language?.titles.login}</h2>
        </div>

        <Form.Item
          label={language?.labels_form.email}
          name="email"
          rules={[{ required: true, message: language?.rules.email }]}
          className="input-form"
        >
          <Input
            prefix={
              <span className="material-symbols-rounded icon-form">mail</span>
            }
            style={{ padding: "8px 15px" }}
            placeholder={language?.placeHolders.email}
            type="email"
          />
        </Form.Item>

        <Form.Item
          label={language?.labels_form.password}
          name="password"
          rules={[{ required: true, message: language?.rules.password }]}
          className="input-form"
        >
          <Input.Password
            prefix={
              <span className="material-symbols-rounded icon-form">lock</span>
            }
            style={{ padding: "8px 15px" }}
            placeholder="********"
          />
        </Form.Item>

        <Form.Item className="button">
          {!loading ? (
            <button className="button-enter">
              {language?.actions_buttons.enter}
            </button>
          ) : (
            <div className="info-enter">
              <span>{language?.actions_buttons.entering}</span>
              <Spin size="small" />
            </div>
          )}
        </Form.Item>
      </Form>
    </>
  );
};

export default FormLogin;
