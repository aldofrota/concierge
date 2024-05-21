import "./index.scss";
import { Link } from "react-router-dom";
import { IoChevronDownOutline } from "react-icons/io5";
import { ItemType } from "antd/es/menu/hooks/useItems";
import { Dropdown } from "antd";

import routesApp from "@/routes/routes";
import Notifications from "./components/Notifications";
import MenuProfile from "./components/MenuProfile";
import Time from "./components/Time";
import Search from "./components/Search";
import { StorageServiceImpl } from "@/services/storage";

const Navbar = () => {
  const storage = new StorageServiceImpl();

  const menuEnable = (item: any) => {
    const userPermissions = storage.getData("permissions");
    return userPermissions[item.permission];
  };

  const MenuDropdown = ({ item }: { item: any }) => {
    const items: ItemType[] = [];

    item.children.map((sub: any, index: number) => {
      if (menuEnable(sub))
        items.push({
          label: (
            <Link className="sub-item" to={`${sub.path}`}>
              <span className="material-symbols-rounded icon">{sub.icon}</span>
              {sub.name}
            </Link>
          ),
          key: index,
        });
    });
    if (items.length > 0)
      return (
        <Dropdown menu={{ items }} trigger={["click"]}>
          <div className="item">
            {item.name}
            <IoChevronDownOutline className="icon" />
          </div>
        </Dropdown>
      );
  };

  return (
    <>
      <div className="main-navbar">
        <div className="logo">
          <Link to="/">
            <img src="/logo.png" alt="Logo Concierge" />
          </Link>
        </div>
        <div className="itens">
          {routesApp.map((route, index) => {
            return <MenuDropdown item={route} key={index} />;
          })}
        </div>
        <div className="actions">
          <Time />
          <Search />
          <Notifications />
          <MenuProfile />
        </div>
      </div>
    </>
  );
};

export default Navbar;
