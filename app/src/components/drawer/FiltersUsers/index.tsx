import "./index.scss";
import { Drawer, Form, Input, Radio } from "antd";
import { useEffect, useState } from "react";

const DrawerFiltersUsers = ({
  show,
  handleClose,
  applyFilters,
  preFilters,
}: any) => {
  const [filters, setFilters] = useState({ name: "", email: "", status: "" });

  useEffect(() => {
    setFilters({ ...filters, ...preFilters });
  }, [preFilters]);

  const onChangeFilter = (label: string, e: any) => {
    setFilters({
      ...filters,
      [label]: e.target.value,
    });
  };

  const apply = () => {
    let apply: any = { ...filters };
    if (apply.name === "") delete apply.name;
    if (apply.email === "") delete apply.email;
    if (apply.status === "") delete apply.status;
    applyFilters(apply);
  };

  return (
    <>
      <Drawer open={show} onClose={handleClose} title="Filtros">
        <Form className="main-filters-users" layout="vertical">
          <Form.Item label="Usuário">
            <Input
              placeholder="Nome do usuário"
              onChange={(e) => onChangeFilter("name", e)}
              value={filters.name}
            />
          </Form.Item>
          <Form.Item label="E-mail">
            <Input
              placeholder="E-mail do usuário"
              onChange={(e) => onChangeFilter("email", e)}
              value={filters.email}
            />
          </Form.Item>
          <Form.Item label="Status">
            <Radio.Group
              style={{ display: "flex", justifyContent: "center" }}
              onChange={(e) => onChangeFilter("status", e)}
              value={filters.status}
            >
              <Radio value="">Todos</Radio>
              <Radio value="A">Ativos</Radio>
              <Radio value="I">Inativos</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item>
            <button onClick={apply} className="button-filter">
              Aplicar Filtros
            </button>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
};

export default DrawerFiltersUsers;
