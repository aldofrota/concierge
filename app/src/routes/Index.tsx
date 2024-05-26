import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";

import Users from "@/views/Users";
import NotFound from "@/views/Notfound";
import Home from "@/views/Home";
import LanguageComponent from "@/components/Language";
import { Breadcrumb, Layout, Menu, MenuProps } from "antd";
import { StorageServiceImpl } from "@/services/storage";
import { useEffect, useState } from "react";
import { TranslationServiceImpl } from "@/services/translate";
import { Language } from "@/types/language";

import {
  DeploymentUnitOutlined,
  PieChartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import MenuProfile from "@/components/MenuProfile";
import Rollouts from "@/views/Rollouts";

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const PrivateRoutes = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const storage = new StorageServiceImpl();
  const translation = new TranslationServiceImpl();
  const [language, setLanguage] = useState<Language>();

  const [collapsed, setCollapsed] = useState(false);

  const isAuthenticated = () => {
    const token = storage.getData("token");
    return !!token;
  };

  const items: MenuItem[] = [
    getItem(language?.menu.data, "/dashboard", <PieChartOutlined />),
    getItem(language?.menu.rollouts, "/rollouts", <DeploymentUnitOutlined />),
    getItem(language?.menu.users, "/users", <UserOutlined />),
  ];

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    navigate(e.key);
  };

  useEffect(() => {
    setLanguage(translation.getTranslation());
  }, []);

  return isAuthenticated() ? (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="logo-menu">
          {collapsed ? (
            <img
              className="close"
              src="/favicon-white.ico"
              alt="Icone concierge"
            />
          ) : (
            <img className="open" src="/logo-white.png" alt="Logo concierge" />
          )}
        </div>
        <Menu
          theme="dark"
          defaultSelectedKeys={[location.pathname]}
          mode="inline"
          items={items}
          onClick={handleMenuClick}
        />
      </Sider>
      <Layout>
        <Header
          className="header-app"
          style={{ padding: 0, background: "#fff" }}
        >
          <LanguageComponent />
          <MenuProfile />
        </Header>
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}></Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: "#fff",
              borderRadius: "20px",
            }}
          >
            <Routes>
              <Route path="/dashboard" element={<Home />} />
              <Route path="/rollouts" element={<Rollouts />} />
              <Route path="/users" element={<Users />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Concierge ©{new Date().getFullYear()}{" "}
          <a
            href="https://github.com/aldofrota"
            target="_blank"
            rel="noopener noreferrer"
          >
            {language?.copy}
          </a>
        </Footer>
      </Layout>
    </Layout>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default PrivateRoutes;
