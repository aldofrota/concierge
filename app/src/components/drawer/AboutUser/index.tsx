import "./index.scss";
import { useEffect, useState } from "react";
import axiosInstance from "../../../services/axios.intance";
import { Checkbox, Drawer, Form, Input, Spin, Switch, message } from "antd";
import { StorageServiceImpl } from "../../../services/storage";
import moment from "moment";

const DrawerAboutUser = ({ show, handleClose, userId }: any) => {
  const storage = new StorageServiceImpl();
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);

  const [updateUser, setUpdateUser] = useState<boolean>(false);
  const [originalUser, setOriginalUser] = useState<any>();
  const [userData, setUserData] = useState<any>({});

  const getUser = async (id: string) => {
    // setLoading(true);
    // await axiosInstance
    //   .get("/users/" + id)
    //   .then(async (res) => {
    //     setLoading(false);
    //     res.data.status = res.data.status === "A" ? true : false;
    //     setUserData({ ...res.data });
    //     form.setFieldsValue(res.data);
    //   })
    //   .catch((reason) => {
    //     setLoading(false);
    //     messageApi.error("Erro ao buscar os dados do Usuário 🥺");
    //     console.error(reason);
    //   });
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
    // setLoading(true);
    // data.status = data.status === true ? "A" : "I";
    // await axiosInstance
    //   .put("users/" + userId, data)
    //   .then((res) => {
    //     messageApi.success(res.data.message);
    //     const user = storage.getData("user");
    //     if (user.id === userId) {
    //       storage.setData("permissions", res.data.permissions);
    //     }
    //     getUser(userId);
    //   })
    //   .catch((reason) => {
    //     messageApi.error(reason.message);
    //     setLoading(false);
    //   });
  };

  const handlePermission = (label: string, value: boolean) => {
    const updatedPermissions = {
      ...userData.permissions,
      [label]: value,
    };

    setUserData({
      ...userData,
      permissions: updatedPermissions,
    });
  };

  useEffect(() => {
    if (userId) {
      getUser(userId);
    } else {
      setUpdateUser(false);
    }
  }, [userId]);

  return (
    <>
      {contextHolder}
      <Drawer open={show} onClose={handleClose} title="Dados do usuário">
        {loading ? (
          <div className="loading-data">
            <Spin size="large" />
          </div>
        ) : (
          <div className="main-about-user">
            <div className="body-about-user">
              {storage.getData("permissions").updateUser && (
                <Checkbox
                  className="label-edit"
                  checked={updateUser}
                  onChange={(e) => handleUpdateUser(e.target.checked)}
                >
                  <span>Editar usuário</span>
                </Checkbox>
              )}
              <Form
                layout="vertical"
                disabled={!updateUser}
                form={form}
                key={userId}
                onFinish={onFinish}
              >
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
                <Form.Item label="Status" name="status" valuePropName="checked">
                  <Switch unCheckedChildren="Inativo" checkedChildren="Ativo" />
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
                      onChange={(e) => handlePermission("menuLeads", e)}
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
                      onChange={(e) => handlePermission("menuDeals", e)}
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
                      onChange={(e) => handlePermission("menuInvoicing", e)}
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
                      onChange={(e) => handlePermission("menuDashboard", e)}
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
                    <Switch onChange={(e) => handlePermission("menuMeta", e)} />
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
                      onChange={(e) => handlePermission("menuGoogle", e)}
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
                      onChange={(e) => handlePermission("menuWhatsapp", e)}
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
                      onChange={(e) => handlePermission("menuChannels", e)}
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
                      onChange={(e) => handlePermission("menuWebhooks", e)}
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
                      onChange={(e) => handlePermission("menuCompany", e)}
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
                      onChange={(e) => handlePermission("menuUsers", e)}
                    />
                  </Form.Item>
                </div>
                {userData?.permissions?.menuUsers && (
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
                      onChange={(e) => handlePermission("menuFunnels", e)}
                    />
                  </Form.Item>
                </div>
                <div className="createdAt-item">
                  <span className="label">Cadastrado em</span>
                  <span className="data">
                    {moment(userData.createdAt).format("DD/MM/YYYY HH:mm")}
                  </span>
                </div>
              </Form>
              <div></div>
            </div>
            {updateUser ? (
              <div className="footer-about-user">
                <button className="btn-danger" onClick={() => handleClose()}>
                  Cancelar
                </button>
                <button className="btn-standard" onClick={() => form.submit()}>
                  Salvar
                </button>
              </div>
            ) : (
              ""
            )}
          </div>
        )}
      </Drawer>
    </>
  );
};
export default DrawerAboutUser;
