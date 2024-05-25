import "./index.scss";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Spin, message } from "antd";

import env from "@/config/env.json";
import axios from "axios";
import { StorageServiceImpl } from "@/services/storage";

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

  const onFinish = async (data: { email: string; password: string }) => {
    setLoading(true);
    await axios
      .post(env.conciergeAuth, data)
      .then((res) => {
        const { token, permissions, language, ...user } = res.data;
        const setedUser = storage.setData("user", user);
        const setedPermissions = storage.setData("permissions", permissions);
        const setedToken = storage.setData("token", token);
        const setedLanguage = storage.setData("language", language);
        if (setedUser && setedToken && setedPermissions && setedLanguage) {
          messageApi.success("Bom trabalho 😄");
          navigate("/");
        } else {
          messageApi.error("Erro ao efetuar Login 🥺");
        }
        setLoading(false);
      })
      .catch((reason) => {
        setLoading(false);
        console.log(reason);
        messageApi.error("reason.response.error");
      });
  };

  useEffect(() => {
    // storage.deleteData("token");
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
          <h2>Login</h2>
        </div>

        <Form.Item
          label="E-mail"
          name="email"
          rules={[{ required: true, message: "Informe o seu E-mail!" }]}
          className="input-form"
        >
          <Input
            prefix={
              <span className="material-symbols-rounded icon-form">mail</span>
            }
            style={{ padding: "8px 15px" }}
            placeholder="email@email.com"
            type="email"
          />
        </Form.Item>

        <Form.Item
          label="Senha"
          name="password"
          rules={[{ required: true, message: "Informe a senha!" }]}
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
            <button className="button-enter">Entrar</button>
          ) : (
            <div className="info-enter">
              <span>Entrando</span>
              <Spin size="small" />
            </div>
          )}
        </Form.Item>
      </Form>
    </>
  );
};

export default FormLogin;
