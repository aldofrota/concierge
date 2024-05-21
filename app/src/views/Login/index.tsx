import "./index.scss";
// import { PiInstagramLogoFill } from "react-icons/pi";
import { Popover } from "antd";

import FormLogin from "../../components/forms/login";
import FormRecovery from "../../components/forms/recovery";
import { useState } from "react";

const Login = () => {
  const [formActive, setFormActive] = useState("Login");

  return (
    <>
      <div className="main-login">
        <div className="left">
          <img className="logo" src="/logo.png" alt="Logo concierge" />
          <h1>Bem vindo ao Concierge</h1>
          <div className="social-medias">
            <Popover content="Ir para o Instagram">
              <a
                href="https://www.instagram.com/concierge.tecnologia"
                target="_blank"
                rel="noopener noreferrer"
              >
                {/* <PiInstagramLogoFill className="icon" /> */}
              </a>
            </Popover>
          </div>
        </div>
        <div className="right">
          <div className="effects">
            <span className="ef-1"></span>
            <span className="ef-2"></span>
          </div>
        </div>
        <img className="logo-mobile" src="/logo.png" alt="Logo concierge" />
        <div className="forms-app">
          {formActive === "Login" ? (
            <FormLogin setFormActive={setFormActive} />
          ) : (
            <FormRecovery setFormActive={setFormActive} />
          )}
        </div>
      </div>
    </>
  );
};

export default Login;
