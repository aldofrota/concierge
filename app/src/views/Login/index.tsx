import "./index.scss";
import { useEffect, useState } from "react";

import { TranslationServiceImpl } from "@/services/translate";
import FormLogin from "@/components/forms/login";
import { Language } from "@/types/language";

const Login = () => {
  const translation = new TranslationServiceImpl();
  const [language, setLanguage] = useState<Language>();

  useEffect(() => {
    setLanguage(translation.getTranslation());
  }, []);

  return (
    <>
      <div className="main-login">
        <div className="left">
          <img className="logo" src="/logo-white.png" alt="Logo concierge" />
          <h1>{language?.welcome}</h1>
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
        <img
          className="logo-mobile"
          src="/logo-white.png"
          alt="Logo concierge"
        />
        <div className="forms-app">
          <FormLogin />
        </div>
      </div>
    </>
  );
};

export default Login;
