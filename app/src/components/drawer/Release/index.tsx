import "./index.scss";
import { useEffect, useState } from "react";
import { Button, Drawer, Space, message } from "antd";
import { TagsInput } from "react-tag-input-component";
import axiosInstance from "@/services/axios.intance";
import Search from "antd/es/transfer/search";

const DrawerRelease = ({ show, handleClose }: any) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);
  const [ids, setIds] = useState<string[]>([]);
  const [originalIds, setOriginalIds] = useState<string[]>([]); // Novo estado para armazenar os dados originais
  const [valueSearch, setValueSearch] = useState<string>("");

  const onFinish = async (data: any) => {
    setLoading(true);
    await axiosInstance
      .post("/create", data)
      .then((res) => {
        setLoading(false);
        messageApi.success(res.data.message);
        handleClose();
      })
      .catch((reason) => {
        messageApi.error(reason.message);
        setLoading(false);
      });
  };

  const hadleTagRelease = (data: string[]) => {
    if (data.length === 0) {
      setIds([]);
      return;
    }

    if (data.length > ids.length) {
      const lastItem = data[data.length - 1];
      if (lastItem === undefined) {
        return;
      }

      const newItems = lastItem
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item !== "" && !ids.includes(item)); // Verifica se o item já existe

      if (newItems.length > 0) {
        setIds((prevSelected) => [...prevSelected, ...newItems]);
        setOriginalIds((prevSelected) => [...prevSelected, ...newItems]); // Atualiza os dados originais
      }
    } else {
      setIds([...data]);
    }
  };

  const onSearch = (value: string) => {
    setValueSearch(value);
    const filteredIds = originalIds.filter((id) => id.includes(value)); // Filtra os IDs com base no valor da pesquisa
    setIds(filteredIds);
  };

  useEffect(() => {
    if (show) {
      // form.resetFields();
    }
  }, [show]);

  return (
    <>
      {contextHolder}
      <Drawer
        open={show}
        onClose={handleClose}
        title="Release"
        extra={
          <Space>
            <Button onClick={handleClose}>Cancelar</Button>
            <Button type="primary" loading={loading}>
              Salvar
            </Button>
          </Space>
        }
      >
        <Search
          value={valueSearch}
          placeholder="Pesquisar Ids"
          onChange={(e: any) => onSearch(e.target.value)}
        />
        <div className="release-ids">
          <div className="title-release">
            <span>Empresas</span>
            <span>{ids.length}</span>
          </div>
          <TagsInput
            value={ids}
            onChange={hadleTagRelease}
            name="Ids"
            placeHolder="Digite o id da empresa"
            classNames={{ input: "input-tag" }}
          />
        </div>
      </Drawer>
    </>
  );
};
export default DrawerRelease;
