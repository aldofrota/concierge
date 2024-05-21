import React, { useState } from "react";
import {
  Navigate,
  Route,
  Routes,
  BrowserRouter as Router,
} from "react-router-dom";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, ConfigProvider, Layout, Menu, theme } from "antd";

// Rotas
import Home from "./views/Home";
import NotFound from "./views/Notfound";
import Users from "./views/Users";
import Rollouts from "./views/Rollouts";
import { StorageServiceImpl } from "./services/storage";
import Login from "./views/Login";

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

const items: MenuItem[] = [
  getItem("Option 1", "1", <PieChartOutlined />),
  getItem("Option 2", "2", <DesktopOutlined />),
  getItem("User", "sub1", <UserOutlined />, [
    getItem("Tom", "3"),
    getItem("Bill", "4"),
    getItem("Alex", "5"),
  ]),
  getItem("Team", "sub2", <TeamOutlined />, [
    getItem("Team 1", "6"),
    getItem("Team 2", "8"),
  ]),
  getItem("Files", "9", <FileOutlined />),
];

const App: React.FC = () => {
  const storage = new StorageServiceImpl();
  const [collapsed, setCollapsed] = useState(false);

  const isAuthenticated = () => {
    const token = storage.getData("token");
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

  return (
    <ConfigProvider
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
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            defaultSelectedKeys={["1"]}
            mode="inline"
            items={items}
          />
        </Sider>
        <Layout>
          <Header style={{ padding: 0, background: colorBgContainer }} />
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
                <Route path="/" element={<Home />} />
                <Route path="/rollouts" element={<Rollouts />} />
                <Route path="/users" element={<Users />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Concierge ©{new Date().getFullYear()} Created by Aldo Frota
          </Footer>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default App;
