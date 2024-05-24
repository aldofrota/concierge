import "./index.scss";
import { useEffect, useState } from "react";
import { Button, Drawer, Space, message } from "antd";
import { TagsInput } from "react-tag-input-component";
import axiosInstance from "@/services/axios.intance";
import Search from "antd/es/transfer/search";
import { TRollout } from "@/types/rollout";
import { TranslationServiceImpl } from "@/services/translate";
import { Language } from "@/types/language";

const DrawerRelease = ({ show, handleClose, flagger }: any) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);
  const [rollout, setRollout] = useState<TRollout>();
  const [ids, setIds] = useState<string[]>([]);
  const [originalIds, setOriginalIds] = useState<string[]>([]); // Novo estado para armazenar os dados originais
  const [valueSearch, setValueSearch] = useState<string>("");
  const [isFiltering, setIsFiltering] = useState<boolean>(false);

  const translation = new TranslationServiceImpl();
  const [language, setLanguage] = useState<Language>();

  const onFinish = async () => {
    setLoading(true);
    const { toAdd, toRemove } = findDifferences(rollout!.ids, originalIds);

    if (toAdd.length > 0) {
      await axiosInstance
        .put(`/release/${rollout!.flagger}`, { ids: toAdd })
        .then((res) => {
          setLoading(false);
          messageApi.success(res.data.message);
          handleClose();
        })
        .catch((reason) => {
          setLoading(false);
          messageApi.error(reason.message);
        });
    }

    if (toRemove.length > 0) {
      await axiosInstance
        .put(`/unrelease/${rollout!.flagger}`, { ids: toRemove })
        .then((res) => {
          setLoading(false);
          messageApi.success(res.data.message);
          handleClose();
        })
        .catch((reason) => {
          messageApi.error(reason.message);
          setLoading(false);
        });
    }

    setLoading(false);
  };

  const getRollout = async (flagger: string) => {
    setLoading(true);
    await axiosInstance
      .get(`/${flagger}`)
      .then((res) => {
        setLoading(false);
        if (res.data.payload.ids === null) res.data.payload.ids = [];
        setRollout(res.data.payload);
        if (res.data.payload.ids) {
          setIds(res.data.payload.ids);
          setOriginalIds(res.data.payload.ids);
        }
      })
      .catch((reason) => {
        messageApi.error(reason.message);
        setLoading(false);
      });
  };

  const handleTagRelease = (data: string[]) => {
    if (data.length === 0) {
      setIds([]);
      if (!isFiltering) {
        setOriginalIds([]);
      }
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
        setIds((prevSelected) => [...prevSelected, ...new Set(newItems)]);
        if (!isFiltering) {
          // Se não estiver filtrando, atualiza os dados originais
          setOriginalIds((prevSelected) => [
            ...prevSelected,
            ...new Set(newItems),
          ]);
        }
      }
    } else {
      setIds([...data]);
      if (!isFiltering) {
        // Se não estiver filtrando, atualiza os dados originais
        setOriginalIds([...data]);
      }
    }
  };

  const onSearch = (value: string) => {
    setValueSearch(value);
    if (value !== "") {
      setIsFiltering(true); // Ativa o filtro
      const filteredIds = originalIds.filter((id) => id.includes(value)); // Filtra os IDs com base no valor da pesquisa
      setIds(filteredIds);
    } else {
      setIsFiltering(false); // Desativa o filtro
      setIds(originalIds); // Define os IDs de volta para os dados originais quando a pesquisa é limpa
    }
  };

  const handleRemoveTag = (tag: string) => {
    const newArray = originalIds.filter((id) => id !== tag);
    setOriginalIds([...newArray]);
  };

  const findDifferences = (arr1: string[], arr2: string[]) => {
    return {
      toAdd: arr2.filter((item: string) => !arr1.includes(item)),
      toRemove: arr1.filter((item: string) => !arr2.includes(item)),
    };
  };

  useEffect(() => {
    if (show) {
      getRollout(flagger);
      setLanguage(translation.getTranslation());
    }
    return () => {
      setOriginalIds([]);
      setIds([]);
    };
  }, [show]);

  return (
    <>
      {contextHolder}
      <Drawer
        open={show}
        onClose={() => handleClose()}
        title={language?.drawers.release}
        extra={
          <Space>
            <Button onClick={() => handleClose()}>
              {language?.actions_buttons.cancel}
            </Button>
            <Button type="primary" loading={loading} onClick={onFinish}>
              {language?.actions_buttons.save}
            </Button>
          </Space>
        }
      >
        <h3 className="title-flagger">{rollout?.flagger}</h3>
        <Search
          value={valueSearch}
          placeholder={language?.placeHolders.search}
          onChange={(e: any) => onSearch(e.target.value)}
        />
        <div className="release-ids">
          <div className="title-release">
            <span>{language?.titles.companies}</span>
            <span>{ids.length}</span>
          </div>
          <TagsInput
            value={ids}
            onChange={handleTagRelease}
            name="Ids"
            placeHolder={language?.placeHolders.type_it}
            classNames={{ input: "input-tag" }}
            onRemoved={handleRemoveTag}
          />
        </div>
      </Drawer>
    </>
  );
};
export default DrawerRelease;
