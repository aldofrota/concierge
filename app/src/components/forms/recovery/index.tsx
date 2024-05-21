import { Form, Input, Spin, message } from "antd";

import "./index.scss";
import { useState } from "react";

const initialValue = {
  email: "",
};

const FormRecovery = ({ setFormActive }: any) => {
  // Estados
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);

  // Hooks
  const [form] = Form.useForm();

  const onFinish = async ({ email }: { email: string }) => {
    // setLoading(true);
    // await auth
    //   .recoveryPassword({ email })
    //   .then((res) => {
    //     if (res.status) {
    //       messageApi.success(res.message + " 😄", 3000);
    //       setTimeout(() => {
    //         setFormActive("Login");
    //       }, 3000);
    //     } else {
    //       messageApi.error(res.message + " 🥲");
    //     }
    //     setLoading(false);
    //   })
    //   .catch((reason) => {
    //     const error = reason.response?.data;
    //     console.error(reason);
    //     if (typeof error.message === "string") {
    //       messageApi.error(error.message);
    //     } else if (Array.isArray(error.message)) {
    //       error.message.map((err: string) => messageApi.error(err));
    //     }
    //     setLoading(false);
    //   });
  };

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
          <h2>Redefinir Senha</h2>
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

        <Form.Item className="button">
          {!loading ? (
            <button className="button-enter">Redefinir</button>
          ) : (
            <div className="info-enter">
              <span>Solicitando</span>
              <Spin size="small" />
            </div>
          )}
        </Form.Item>

        <button
          className="btn-recovery"
          onClick={() => setFormActive("Login")}
          type="button"
        >
          Voltar para o Login 😝
        </button>
      </Form>
    </>
  );
};

export default FormRecovery;
