import "./index.scss";
import { useEffect, useState } from "react";
import { Drawer, Form, Input, Spin, Switch, message } from "antd";
import axiosInstance from "../../../services/axios.intance";
import { StorageServiceImpl } from "../../../services/storage";

const DrawerRegisterUser = ({ show, handleClose }: any) => {
  const storage = new StorageServiceImpl();
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);
  const [permissions, setPermissions] = useState<any>({});

  const onFinish = async (data: any) => {
    // setLoading(true);
    // const { confirmPassword, ...newUser } = data;
    // await axiosInstance
    //   .post("users", newUser)
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

  const handleSwitchChange = (key: string, checked: boolean) => {
    setPermissions({
      ...permissions,
      [key]: checked,
    });
  };

  const showPermissions = (label: string) => {
    return permissions[label];
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
      setPermissions({});
    }
  }, [show]);

  return (
    <>
      {contextHolder}
      <Drawer open={show} onClose={handleClose} title="Cadastrar usuário">
        {loading ? (
          <div className="loading-data">
            <Spin size="large" />
          </div>
        ) : (
          <div className="main-about-user">
            <div className="body-about-user">
              <Form layout="vertical" form={form} onFinish={onFinish}>
                <Form.Item
                  label="Nome"
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: "Informe o nome do usuário!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="E-mail"
                  name="email"
                  rules={[
                    {
                      type: "email",
                      message: "E-mail inválido!",
                    },
                    {
                      required: true,
                      message: "Informe o E-mail!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Senha"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Informe o Senha!",
                    },
                  ]}
                >
                  <Input.Password />
                </Form.Item>
                <Form.Item
                  label="Confirmar senha"
                  name="confirmPassword"
                  dependencies={["password"]}
                  rules={[
                    {
                      required: true,
                      message: "Informe a Senha!",
                    },
                    ({ getFieldValue }) =>
                      validatePasswordConfirmation({ getFieldValue }),
                  ]}
                >
                  <Input.Password />
                </Form.Item>
                <div className="divider-title">Permissões</div>
                <div className="divider-item">
                  <span>Menu Contatos</span>
                  <Form.Item
                    name={["permissions", "menuLeads"]}
                    valuePropName="checked"
                    className="divider-switch"
                  >
                    <Switch
                      onChange={(e) => handleSwitchChange("menuLeads", e)}
                    />
                  </Form.Item>
                </div>
                <div className="divider-item">
                  <span>Menu Negociações</span>
                  <Form.Item
                    name={["permissions", "menuDeals"]}
                    valuePropName="checked"
                    className="divider-switch"
                  >
                    <Switch
                      onChange={(e) => handleSwitchChange("menuDeals", e)}
                    />
                  </Form.Item>
                </div>
                <div className="divider-item">
                  <span>Menu Faturamentos</span>
                  <Form.Item
                    name={["permissions", "menuInvoicing"]}
                    valuePropName="checked"
                    className="divider-switch"
                  >
                    <Switch
                      onChange={(e) => handleSwitchChange("menuInvoicing", e)}
                    />
                  </Form.Item>
                </div>
                <div className="divider-item">
                  <span>Menu Dashboard</span>
                  <Form.Item
                    name={["permissions", "menuDashboard"]}
                    valuePropName="checked"
                    className="divider-switch"
                  >
                    <Switch
                      onChange={(e) => handleSwitchChange("menuDashboard", e)}
                    />
                  </Form.Item>
                </div>
                <div className="divider-item">
                  <span>Menu Meta Ads</span>
                  <Form.Item
                    name={["permissions", "menuMeta"]}
                    valuePropName="checked"
                    className="divider-switch"
                  >
                    <Switch
                      onChange={(e) => handleSwitchChange("menuMeta", e)}
                    />
                  </Form.Item>
                </div>
                <div className="divider-item">
                  <span>Menu Google Ads</span>
                  <Form.Item
                    name={["permissions", "menuGoogle"]}
                    valuePropName="checked"
                    className="divider-switch"
                  >
                    <Switch
                      onChange={(e) => handleSwitchChange("menuGoogle", e)}
                    />
                  </Form.Item>
                </div>
                <div className="divider-item">
                  <span>Menu campanhas Whatsapp</span>
                  <Form.Item
                    name={["permissions", "menuWhatsapp"]}
                    valuePropName="checked"
                    className="divider-switch"
                  >
                    <Switch
                      onChange={(e) => handleSwitchChange("menuWhatsapp", e)}
                    />
                  </Form.Item>
                </div>
                <div className="divider-item">
                  <span>Menu Redes Sociais</span>
                  <Form.Item
                    name={["permissions", "menuChannels"]}
                    valuePropName="checked"
                    className="divider-switch"
                  >
                    <Switch
                      onChange={(e) => handleSwitchChange("menuChannels", e)}
                    />
                  </Form.Item>
                </div>
                <div className="divider-item">
                  <span>Menu Webhooks</span>
                  <Form.Item
                    name={["permissions", "menuWebhooks"]}
                    valuePropName="checked"
                    className="divider-switch"
                  >
                    <Switch
                      onChange={(e) => handleSwitchChange("menuWebhooks", e)}
                    />
                  </Form.Item>
                </div>
                <div className="divider-item">
                  <span>Menu Empresa</span>
                  <Form.Item
                    name={["permissions", "menuCompany"]}
                    valuePropName="checked"
                    className="divider-switch"
                  >
                    <Switch
                      onChange={(e) => handleSwitchChange("menuCompany", e)}
                    />
                  </Form.Item>
                </div>
                <div className="divider-item">
                  <span>Menu Usuários</span>
                  <Form.Item
                    name={["permissions", "menuUsers"]}
                    valuePropName="checked"
                    className="divider-switch"
                  >
                    <Switch
                      onChange={(e) => handleSwitchChange("menuUsers", e)}
                    />
                  </Form.Item>
                </div>
                {showPermissions("menuUsers") && (
                  <div className="switch-permissions">
                    <Form.Item
                      name={["permissions", "registerUser"]}
                      valuePropName="checked"
                      className="permission"
                    >
                      <Switch
                        unCheckedChildren="Cadastrar"
                        checkedChildren="Cadastrar"
                      />
                    </Form.Item>
                    {(storage.getData("user").owner ||
                      storage.getData("permissions").updateUser) && (
                      <Form.Item
                        name={["permissions", "updateUser"]}
                        valuePropName="checked"
                        className="permission"
                      >
                        <Switch
                          unCheckedChildren="Atualizar"
                          checkedChildren="Atualizar"
                        />
                      </Form.Item>
                    )}
                    <Form.Item
                      name={["permissions", "deleteUser"]}
                      valuePropName="checked"
                      className="permission"
                    >
                      <Switch
                        unCheckedChildren="Deletar"
                        checkedChildren="Deletar"
                      />
                    </Form.Item>
                  </div>
                )}
                <div className="divider-item">
                  <span>Menu Funis e etapas</span>
                  <Form.Item
                    name={["permissions", "menuFunnels"]}
                    valuePropName="checked"
                    className="divider-switch"
                  >
                    <Switch
                      onChange={(e) => handleSwitchChange("menuFunnels", e)}
                    />
                  </Form.Item>
                </div>
              </Form>
              <div></div>
            </div>
            <div className="footer-about-user">
              <button className="btn-danger" onClick={() => handleClose()}>
                Cancelar
              </button>
              <button className="btn-standard" onClick={() => form.submit()}>
                Salvar
              </button>
            </div>
          </div>
        )}
      </Drawer>
    </>
  );
};
export default DrawerRegisterUser;
