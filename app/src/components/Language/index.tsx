import { useEffect, useState } from "react";
import "./index.scss";
import { StorageServiceImpl } from "@/services/storage";
import axiosInstance from "@/services/axios.intance";
import { message } from "antd";

const CustomDropdown = () => {
  const storage = new StorageServiceImpl();
  const [messageApi, contextHolder] = message.useMessage();
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState("portuguese");

  const allLanguagesOptions = [
    { value: "portuguese", icon: "pt", label: "Português" },
    { value: "english", icon: "en", label: "English" },
    { value: "spanish", icon: "es", label: "Español" },
  ];

  const languageInfo = allLanguagesOptions.find(
    (option) => option.value === language
  );

  const languageOptions = [languageInfo];
  const remainingLanguageOptions = allLanguagesOptions.filter(
    (option) => option.value !== language
  );

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const defineLanguage = async (language: string) => {
    setLanguage(language);
    storage.setData("language", language);
    const user = storage.getData("user");
    await axiosInstance
      .put(`users/${user._id}/update`, { language })
      .then(() => {
        setIsOpen(false);
      })
      .catch((reason) => {
        messageApi.error(reason.message);
      });
    window.location.reload();
  };

  useEffect(() => {
    setLanguage(storage.getData("language"));
  }, []);

  return (
    <>
      {contextHolder}
      <div className="custom-parent">
        <button className="custom-dropdown-toggle" onClick={toggleDropdown}>
          <div className="selected-option">
            <img
              src={`/language/${languageInfo?.icon}.png`}
              className="language-icon"
            />
            <span className="language-label">{languageInfo?.label}</span>
          </div>
          <span
            className={`material-symbols-rounded dropdown-icon ${
              isOpen ? "dropdown-icon-open" : ""
            }`}
          >
            keyboard_arrow_down
          </span>
        </button>
        {isOpen && (
          <div className="custom-dropdown-menu">
            {languageOptions.map((language, index) => (
              <div
                key={index}
                className="custom-dropdown-item"
                onClick={() => defineLanguage(language!.value)}
              >
                <img
                  src={`/language/${language?.icon}.png`}
                  className="language-icon"
                />
                {language!.label}
                {language!.value === language!.value && (
                  <span className="material-symbols-rounded item-check">
                    check
                  </span>
                )}
              </div>
            ))}
            <div className="separator"></div>
            {remainingLanguageOptions.map((language) => (
              <div
                key={language.value}
                className="custom-dropdown-item"
                onClick={() => defineLanguage(language.value)}
              >
                <img
                  src={`/language/${language?.icon}.png`}
                  className="language-icon"
                />
                {language.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default CustomDropdown;
