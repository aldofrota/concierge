import { useEffect, useState } from "react";
import "./index.scss";
import axiosInstance from "@/services/axios.intance";
import { Popconfirm, Tooltip, message } from "antd";
import { Container } from "react-bootstrap";
import { TRollout } from "@/types/rollout";
import DrawerRegisterFlagger from "@/components/drawer/RegisterFlagger";
import DrawerRelease from "@/components/drawer/Release";

const Rollouts = () => {
  const [flaggers, setFlaggers] = useState<TRollout[]>([]);
  const [flaggerRelease, setFlaggerRelease] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showRelease, setShowRelease] = useState(false);
  const [fullRolloutFlagger, setFullRolloutFlagger] = useState<string>("");
  const [removeFlagger, setRemoveFlagger] = useState<string>("");
  const [messageApi, contextHolder] = message.useMessage();

  const getFlaggers = async () => {
    setLoading(true);
    await axiosInstance
      .get("/all")
      .then(async (res) => {
        setLoading(false);
        setFlaggers(res.data.flaggers);
      })
      .catch((reason) => {
        setLoading(false);
        messageApi.error("Erro ao buscar os rollouts 🥺");
        console.error(reason);
      });
  };

  const getBattery = (rollout: TRollout) => {
    if (rollout.full_rollout) {
      return "battery_full";
    } else if (Number(rollout.ids[0]) > 0) {
      return "battery_4_bar";
    } else {
      return "battery_0_bar";
    }
  };

  const getTooltip = (rollout: TRollout) => {
    if (rollout.full_rollout) {
      return "Full rollout";
    } else if (Number(rollout.ids[0]) > 0) {
      return "Rollout Parcial";
    } else {
      return "Rollout vazio";
    }
  };

  const handleRemoveFlagger = async () => {
    setLoading(true);
    await axiosInstance
      .delete(`/${removeFlagger}`)
      .then(() => {
        setLoading(false);
        messageApi.success("Flagger removida 😄");
        setRemoveFlagger("");
        getFlaggers();
      })
      .catch((reason) => {
        setLoading(false);
        messageApi.error("Erro ao remover a flagger 🥺");
        console.error(reason);
      });
  };

  const handleFullRollout = async (rollout: TRollout) => {
    setLoading(true);
    await axiosInstance
      .put(`/full-rollout/${rollout.flagger}`, {
        full_rollout: !rollout.full_rollout,
      })
      .then(() => {
        setLoading(false);
        messageApi.success(
          !rollout.full_rollout
            ? "Colocado em full rollout 😄"
            : "Tirado do full rollout 😄"
        );
        setFullRolloutFlagger("");
        getFlaggers();
      })
      .catch((reason) => {
        setLoading(false);
        messageApi.error(
          !rollout.full_rollout
            ? "Erro ao colocar em full rollout 🥺"
            : "Erro ao remover do full rollout 🥺"
        );
        console.error(reason);
      });
  };

  const fullRollout = (flagger: string) => {
    return flagger === fullRolloutFlagger;
  };

  const remove = (flagger: string) => {
    return flagger === removeFlagger;
  };

  const handleDrawerRegister = () => {
    setShowRegister(!showRegister);
  };

  const handleDrawerRelease = (flagger: any = null) => {
    if (flagger) {
      setFlaggerRelease(flagger);
      setShowRelease(true);
    } else {
      setFlaggerRelease(flagger);
      setShowRelease(false);
    }
  };

  useEffect(() => {
    getFlaggers();
  }, [showRegister, showRelease]);
  return (
    <>
      {contextHolder}
      <DrawerRegisterFlagger
        show={showRegister}
        handleClose={handleDrawerRegister}
      />
      <DrawerRelease
        show={showRelease}
        handleClose={handleDrawerRelease}
        flagger={flaggerRelease}
      />
      <Container fluid="sm">
        <div className="flaggers">
          <div className="title-flaggers">
            <span className="label">Flaggers</span>
            <span
              className="material-symbols-rounded icon"
              onClick={handleDrawerRegister}
            >
              control_point_duplicate
            </span>
          </div>
          <div className="flaggers-list">
            {flaggers.map((flagger) => {
              return (
                <div className="flagger" key={flagger.flagger}>
                  <span className="label">
                    <span>{flagger.flagger}</span>
                    <span>{flagger.description}</span>
                  </span>
                  <div className="actions">
                    {!flagger.full_rollout && (
                      <Tooltip title="Ids no release" placement="bottom">
                        <span
                          className="material-symbols-rounded icon"
                          onClick={() => handleDrawerRelease(flagger.flagger)}
                        >
                          new_releases
                        </span>
                      </Tooltip>
                    )}
                    <Popconfirm
                      title="Full Rollout"
                      description={
                        flagger.full_rollout
                          ? "Você deseja remover do full rollout?"
                          : "Você deseja colocar em full rollout?"
                      }
                      open={fullRollout(flagger.flagger)}
                      onCancel={() => setFullRolloutFlagger("")}
                      onConfirm={() => handleFullRollout(flagger)}
                      okButtonProps={{ loading }}
                      okText="Sim"
                      cancelText="Não"
                    >
                      <Tooltip title={getTooltip(flagger)} placement="bottom">
                        <span
                          className="material-symbols-rounded icon"
                          onClick={() => setFullRolloutFlagger(flagger.flagger)}
                        >
                          {getBattery(flagger)}
                        </span>
                      </Tooltip>
                    </Popconfirm>
                    <Popconfirm
                      title="Remover flagger"
                      description={`Deseja remover a flagger ${flagger.flagger}`}
                      open={remove(flagger.flagger)}
                      onCancel={() => setRemoveFlagger("")}
                      onConfirm={handleRemoveFlagger}
                      okButtonProps={{ loading }}
                      okText="Sim"
                      cancelText="Não"
                    >
                      <Tooltip title="Remover flagger" placement="bottom">
                        <span
                          className="material-symbols-rounded icon"
                          onClick={() => setRemoveFlagger(flagger.flagger)}
                        >
                          delete
                        </span>
                      </Tooltip>
                    </Popconfirm>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </>
  );
};

export default Rollouts;
