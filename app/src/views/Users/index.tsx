import "./index.scss";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Badge, Pagination, Popconfirm, Table, Tooltip, message } from "antd";

import { QueryResponseUser, User } from "@/types/user";

import axiosInstance from "../../services/axios.intance";
import { StorageServiceImpl } from "../../services/storage";

import DrawerAboutUser from "../../components/drawer/AboutUser";
import DrawerRegisterUser from "../../components/drawer/RegisterUser";
import DrawerFiltersUsers from "../../components/drawer/FiltersUsers";

const Users = () => {
  const storage = new StorageServiceImpl();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [rowSelected, setRowSelected] = useState<string[]>([]);
  const [filters, setFilters] = useState<any>({});
  const [showFilters, setShowFilters] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  // Variáveis referentes aos offcanvas
  const [showRegisterUser, setShowRegisterUser] = useState(false);
  const [showAboutUser, setShowAboutUser] = useState(false);
  const [showAboutUserId, setShowAboutUserId] = useState<any>(null);

  const [dataSource, setDataSource] = useState<QueryResponseUser>({
    users: [],
    meta: {
      page: 1,
      limit: 10,
      total: 0,
      totalPages: 1,
    },
  });
  const columns = [
    {
      title: "Nome",
      dataIndex: "name",
    },
    {
      title: "E-mail",
      dataIndex: "email",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status: string) => (
        <span>
          {status === "A" ? (
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
      width: 70,
      render: (_: any, record: any) => (
        <Tooltip title="Informações do usuário" color={"var(--concierge-1)"}>
          <span
            className="material-symbols-rounded cursor-pointer"
            onClick={() => handleAboutUser(record.id)}
          >
            info
          </span>
        </Tooltip>
      ),
    },
  ];
  const rowSelection = {
    onChange: (_: React.Key[], selectedRows: User[]) => {
      setRowSelected([]);
      setRowSelected([...selectedRows.map((row) => row.id)]);
    },
    getCheckboxProps: (record: User) => ({
      name: record.name,
    }),
  };

  const onChangePagination = async (page: number, pageSize: number) => {
    dataSource.meta.page = page;
    dataSource.meta.limit = pageSize;
    // await getUsers(filters);
  };

  const qtdSelectedMsg = (qtd: number) => {
    if (qtd > 1) {
      return `${qtd} Selecionados`;
    } else {
      return `${qtd} Selecionado`;
    }
  };

  const handleFilters = () => {
    setShowFilters(!showFilters);
  };

  const applyFilters = (applyFilter: {
    name: string;
    email: string;
    status: string;
  }) => {
    if (Object.entries(applyFilter).length === 0) {
      storage.deleteData("filters_users");
      setFilters({});
    } else {
      storage.setData("filters_users", applyFilter);
      setFilters(applyFilter);
    }
    handleFilters();
    // getUsers(applyFilter, true);
  };

  // const getUsers = async (
  //   filters: { name: string; status: string },
  //   resetPage: boolean = false
  // ) => {
  //   const user: User = storage.getData("user");
  //   const pagination = {
  //     page: resetPage ? 1 : dataSource.meta.page,
  //     limit: dataSource.meta.limit,
  //   };
  //   const query = {
  //     companyId: user.companyId,
  //     ...filters,
  //     ...pagination,
  //   };

  //   await axiosInstance
  //     .get("/users", { params: query })
  //     .then((res) => {
  //       setDataSource(res.data);
  //     })
  //     .catch((reason) => {
  //       messageApi.error(reason.message);
  //     });
  // };

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

  const getDataFilters = () => {
    const contain_filters = storage.getData("filters_users");
    if (contain_filters) {
      setFilters(contain_filters);
      // getUsers(contain_filters, true);
    } else {
      setFilters({});
      // getUsers(filters, true);
    }
  };

  const deleteUsers = async () => {
    // setLoadingDelete(true);
    // messageApi.open({
    //   type: "loading",
    //   content: "Deletando usuário...",
    //   duration: 0, // Duração como 0 para não fechar automaticamente
    // });
    // await axiosInstance
    //   .post("/users/delete", rowSelected)
    //   .then((res) => {
    //     setLoadingDelete(false);
    //     messageApi.destroy();
    //     messageApi.success(res.data.message);
    //     setRowSelected([]);
    //     getDataFilters();
    //   })
    //   .catch((reason) => {
    //     setLoadingDelete(false);
    //     messageApi.destroy();
    //     messageApi.error(reason.message);
    //   });
  };

  useEffect(() => {
    if (!showAboutUser || !showRegisterUser) getDataFilters();
    if (
      !storage.getData("permissions").menuUsers &&
      !storage.getData("user").owner
    ) {
      navigate("/");
    }
  }, [showAboutUser, showRegisterUser]);

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
      <DrawerFiltersUsers
        show={showFilters}
        handleClose={handleFilters}
        applyFilters={applyFilters}
        preFilters={filters}
      />
      <Container fluid="sm">
        <div className="main-users">
          <div className="actions">
            <div className="filters-actions">
              <div className="filter">
                <Tooltip title="Filtros" color={"var(--concierge-1)"}>
                  <Badge count={Object.keys(filters).length} size="small">
                    {/* <FaFilter className="icon" onClick={handleFilters} /> */}
                  </Badge>
                </Tooltip>
              </div>
              <div className="action">
                {storage.getData("permissions").registerUser && (
                  <button className="btn-standard" onClick={handleRegisterUser}>
                    Criar novo
                  </button>
                )}
              </div>
            </div>
            <div
              className={`action-itens-selected ${
                rowSelected.length > 0 ? "active" : ""
              }`}
            >
              <span className="qtd">{qtdSelectedMsg(rowSelected.length)}</span>
              <div className="btns">
                {storage.getData("permissions").deleteUser && (
                  <>
                    <Popconfirm
                      title="Excluir usuários"
                      description="Você deseja excluir os usuários selecionados?"
                      onConfirm={deleteUsers}
                      okText="Sim"
                      cancelText="Não"
                    >
                      <Tooltip
                        title="Excluir usuários selecionados"
                        color={"var(--concierge-1)"}
                      >
                        <button
                          disabled={loadingDelete}
                          className="button-action"
                        >
                          Excluir
                        </button>
                      </Tooltip>
                    </Popconfirm>
                    <Tooltip
                      title="Só é possível excluir o usuário se não houver nenhuma ação vinculada ao mesmo."
                      color={"var(--concierge-1)"}
                    >
                      <span
                        style={{ cursor: "help" }}
                        className="material-symbols-rounded cursor-pointer"
                      >
                        info
                      </span>
                    </Tooltip>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="table-departments">
            <Table
              rowSelection={{
                type: "checkbox",
                ...rowSelection,
              }}
              rowKey={(row) => row.id}
              columns={columns}
              dataSource={dataSource.users}
              size="small"
              pagination={{
                position: ["none", "none"],
                pageSize: dataSource.meta.limit,
              }}
              scroll={{ y: 270 }}
            />
            <Pagination
              className="pagination-table"
              total={dataSource.meta.total}
              pageSize={dataSource.meta.limit}
              current={dataSource.meta.page}
              showSizeChanger
              showQuickJumper
              onChange={onChangePagination}
              showTotal={(total) => `Total de ${total} itens`}
            />
          </div>
        </div>
      </Container>
    </>
  );
};
export default Users;
