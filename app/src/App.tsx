import React, { useEffect, useState } from "react";
import {
  Navigate,
  Route,
  Routes,
  BrowserRouter as Router,
  useNavigate,
  useLocation,
} from "react-router-dom";
import {
  DeploymentUnitOutlined,
  PieChartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, ConfigProvider, Layout, Menu, theme } from "antd";
import locale from "antd/locale/pt_BR";

// Rotas
import Home from "@/views/Home";
import NotFound from "@/views/Notfound";
import Users from "@/views/Users";
import Rollouts from "@/views/Rollouts";
import Login from "@/views/Login";

import { StorageServiceImpl } from "@/services/storage";
import MenuProfile from "@/components/MenuProfile";
import LanguageComponent from "@/components/Language";
import { TranslationServiceImpl } from "./services/translate";
import { Language } from "./types/language";

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

const App: React.FC = () => {
  const storage = new StorageServiceImpl();
  const [collapsed, setCollapsed] = useState(false);

  const isAuthenticated = () => {
    // const token = storage.getData("token");
    const token = true;

    return !!token;
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#205896",
        },
      }}
    >
      <Router>
        <Routes>
          {/* Rota de Login */}
          <Route path="/login" element={<Login />} />

          {/* Rotas protegidas */}
          <Route
            path="/*"
            element={
              isAuthenticated() ? (
                <ProtectedRoutes
                  collapsed={collapsed}
                  setCollapsed={setCollapsed}
                />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
        </Routes>
      </Router>
    </ConfigProvider>
  );
};

const ProtectedRoutes: React.FC<{
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
}> = ({ collapsed, setCollapsed }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [activeRoute, setActiveRoute] = useState(["/dados"]);
  const translation = new TranslationServiceImpl();
  const [language, setLanguage] = useState<Language>();

  const navigate = useNavigate();
  const location = useLocation();

  const items: MenuItem[] = [
    getItem(language?.menu.data, "/dados", <PieChartOutlined />),
    getItem(language?.menu.rollouts, "/rollouts", <DeploymentUnitOutlined />),
    getItem(language?.menu.users, "/users", <UserOutlined />),
  ];

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    setActiveRoute([e.key]);
    navigate(e.key);
  };

  useEffect(() => {
    if (location.pathname !== activeRoute[0]) {
      navigate(activeRoute[0]);
    }
  }, [location]);

  useEffect(() => {
    setLanguage(translation.getTranslation());
  }, []);

  return (
    <ConfigProvider
      locale={locale}
      theme={{
        token: {
          colorPrimary: "#205896",
        },
      }}
    >
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <div className="logo-menu">
            {collapsed ? (
              <img className="close" src="/favicon.ico" alt="" />
            ) : (
              <img className="open" src="/logo.png" alt="" />
            )}
          </div>
          <Menu
            theme="dark"
            defaultSelectedKeys={activeRoute}
            mode="inline"
            items={items}
            onClick={handleMenuClick}
          />
        </Sider>
        <Layout>
          <Header
            className="header-app"
            style={{ padding: 0, background: colorBgContainer }}
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
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              <Routes>
                <Route path="/dados" element={<Home />} />
                <Route path="/rollouts" element={<Rollouts />} />
                <Route path="/users" element={<Users />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Concierge ©{new Date().getFullYear()} {language?.copy}
          </Footer>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default App;
