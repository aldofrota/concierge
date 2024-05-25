import "./index.scss";

import FormLogin from "@/components/forms/login";

const Login = () => {
  return (
    <>
      <div className="main-login">
        <div className="left">
          <img className="logo" src="/logo.png" alt="Logo concierge" />
          <h1>Bem vindo ao Concierge</h1>
        </div>
        <div className="right">
          <div className="effects">
            <span className="ef-1">
              <span className="ef-2">
                <span className="ef-3"></span>
              </span>
            </span>
          </div>
        </div>
        <img className="logo-mobile" src="/logo.png" alt="Logo concierge" />
        <div className="forms-app">
          <FormLogin />
        </div>
      </div>
    </>
  );
};

export default Login;
