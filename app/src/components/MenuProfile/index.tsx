import "./index.scss";
import { useState } from "react";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, MenuProps } from "antd";
import { Link } from "react-router-dom";
import { StorageServiceImpl } from "../../services/storage";
import { User } from "../../types/user";
import DrawerProfileUser from "../drawer/Profile";

const MenuProfile = () => {
  const storage = new StorageServiceImpl();
  const [showProfile, setShowProfile] = useState(false);

  // Inicializa o estado com os dados do usuário
  const [user] = useState<User>(() => {
    return storage.getData("user");
  });

  const handleDrawerProfile = () => {
    setShowProfile(!showProfile);
  };

  const items: MenuProps["items"] = [
    {
      label: (
        <div className="panel-user">
          <span className="name">{user.name ?? "Concierge"}</span>
          <span className="email">{user.email ?? "contato@concierge.com"}</span>
        </div>
      ),
      type: "group",
    },
    {
      label: (
        <div className="item-menu-profile" onClick={handleDrawerProfile}>
          <span className="material-symbols-rounded icon">account_box</span>
          Perfil
        </div>
      ),
      key: "2",
    },
    {
      type: "divider",
    },
    {
      label: (
        <Link className="item-menu-profile" to="/login">
          <span className="material-symbols-rounded icon">logout</span>
          Sair
        </Link>
      ),
      key: "3",
    },
  ];

  return (
    <>
      <DrawerProfileUser show={showProfile} handleClose={handleDrawerProfile} />
      <div className="main-menu-profile">
        <Dropdown menu={{ items }} trigger={["click"]}>
          <div className="btn-menu">
            <span className="material-symbols-rounded icon">stat_minus_1</span>
            <span className="material-symbols-rounded person">person</span>
          </div>
        </Dropdown>
      </div>
    </>
  );
};

export default MenuProfile;