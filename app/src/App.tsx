import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ConfigProvider } from "antd";
import PrivateRoutes from "./routes/Index";
import Login from "@/views/Login";

function App() {
  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "var(--concierge-3)",
          },
        }}
      >
        <Router>
          <Routes>
            <Route path="*" element={<PrivateRoutes />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Router>
      </ConfigProvider>
    </>
  );
}

export default App;
