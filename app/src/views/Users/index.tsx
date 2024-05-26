import "./index.scss";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Popconfirm, Table, Tooltip, message } from "antd";

import { User } from "@/types/user";

import axiosInstance from "@/services/axios.intance";
import { StorageServiceImpl } from "@/services/storage";

import DrawerAboutUser from "@/components/drawer/AboutUser";
import DrawerRegisterUser from "@/components/drawer/RegisterUser";
import { TranslationServiceImpl } from "@/services/translate";
import { Language } from "@/types/language";

const Users = () => {
  const storage = new StorageServiceImpl();
  const translation = new TranslationServiceImpl();
  const [language, setLanguage] = useState<Language>();

  const [messageApi, contextHolder] = message.useMessage();

  // Variáveis referentes aos Drawers
  const [showRegisterUser, setShowRegisterUser] = useState(false);
  const [showAboutUser, setShowAboutUser] = useState(false);
  const [showAboutUserId, setShowAboutUserId] = useState<any>(null);

  const [dataSource, setDataSource] = useState<User[]>([]);
  const columns = [
    {
      title: language?.labels_form.name,
      dataIndex: "name",
    },
    {
      title: language?.labels_form.email,
      dataIndex: "email",
    },
    {
      title: language?.labels_form.status,
      dataIndex: "status",
      render: (status: string) => (
        <span>
          {status === "active" ? (
            <span
              style={{ color: "green" }}
              className="material-symbols-rounded cursor-default"
            >
              task_alt
            </span>
          ) : (
            <span
              style={{ color: "red" }}
              className="material-symbols-rounded cursor-default"
            >
              cancel
            </span>
          )}
        </span>
      ),
    },
    {
      title: "",
      dataIndex: "",
      width: 120,
      render: (_: any, record: any) => (
        <div className="actions-user">
          <Tooltip title={language?.tooltips.about} placement="bottom">
            <span
              className="material-symbols-rounded icon"
              onClick={() => handleAboutUser(record._id)}
            >
              info
            </span>
          </Tooltip>
          {storage.getData("permissions").admin && (
            <>
              <Popconfirm
                title={language?.popsconfirm.update_status.title}
                description={
                  record.status === "active"
                    ? language?.popsconfirm.update_status.description
                    : language?.popsconfirm.update_status.description_2
                }
                onConfirm={() => handleStatusUser(record)}
                okText={language?.actions_buttons.yes}
                cancelText={language?.actions_buttons.no}
              >
                <Tooltip
                  title={
                    record.status === "active"
                      ? language?.tooltips.inactive
                      : language?.tooltips.active
                  }
                  placement="bottom"
                >
                  {record.status === "active" ? (
                    <span className="material-symbols-rounded icon">
                      toggle_on
                    </span>
                  ) : (
                    <span className="material-symbols-rounded icon">
                      toggle_off
                    </span>
                  )}
                </Tooltip>
              </Popconfirm>
              <Popconfirm
                title={language?.popsconfirm.remove_user.title}
                description={language?.popsconfirm.remove_user.description}
                onConfirm={() => deleteUser(record._id)}
                okText={language?.actions_buttons.yes}
                cancelText={language?.actions_buttons.no}
              >
                <Tooltip title={language?.tooltips.remove} placement="bottom">
                  <span className="material-symbols-rounded icon">delete</span>
                </Tooltip>
              </Popconfirm>
            </>
          )}
        </div>
      ),
    },
  ];

  const getUsers = async () => {
    await axiosInstance
      .get("/users/all")
      .then((res) => {
        setDataSource(res.data);
      })
      .catch((reason) => {
        messageApi.error(reason.message);
      });
  };

  const handleAboutUser = (id: any = null) => {
    if (typeof id === "string") {
      setShowAboutUserId(id);
      setShowAboutUser(true);
    } else {
      setShowAboutUserId(null);
      setShowAboutUser(false);
    }
  };

  const handleRegisterUser = () => {
    setShowRegisterUser(!showRegisterUser);
  };

  const deleteUser = async (id: string) => {
    await axiosInstance
      .delete(`/users/${id}/delete`)
      .then(() => {
        messageApi.success(language?.responsesAPI.remove_user);
        getUsers();
      })
      .catch((reason) => {
        messageApi.error(reason.message);
      });
  };

  const handleStatusUser = async (user: User) => {
    const status = user.status === "active" ? "inactive" : "active";

    await axiosInstance
      .put(`users/${user._id}/update`, { status })
      .then(() => {
        messageApi.success(language?.responsesAPI.update_status);
        getUsers();
      })
      .catch((reason) => {
        messageApi.error(reason.message);
      });
  };

  useEffect(() => {
    getUsers();
  }, [showAboutUser, showRegisterUser]);

  useEffect(() => {
    setLanguage(translation.getTranslation());
  }, []);

  return (
    <>
      {contextHolder}
      <DrawerAboutUser
        show={showAboutUser}
        handleClose={handleAboutUser}
        userId={showAboutUserId}
      />
      <DrawerRegisterUser
        show={showRegisterUser}
        handleClose={handleRegisterUser}
      />
      <Container fluid="sm">
        <div className="main-users">
          <div className="actions">
            {storage.getData("permissions").admin && (
              <button className="btn-create" onClick={handleRegisterUser}>
                {language?.actions_buttons.create_new}
              </button>
            )}
          </div>
          <div className="table-users">
            <Table
              rowKey={(row) => row._id}
              columns={columns}
              dataSource={dataSource}
              pagination={{
                position: ["none", "none"],
              }}
              scroll={{ y: 400 }}
            />
          </div>
        </div>
      </Container>
    </>
  );
};
export default Users;
