import { useEffect, useState } from "react";
import "./index.scss";
import { StorageServiceImpl } from "@/services/storage";
import { User } from "@/types/user";

const CustomDropdown = () => {
  const storage = new StorageServiceImpl();
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState("portuguese");

  // Inicializa o estado com os dados do usuário
  const [user] = useState<User>(() => {
    return storage.getData("user");
  });

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

  const defineLanguage = (language: string) => {
    setLanguage(language);
    let user: User = {
      id: "",
      name: "Concierge",
      email: "contato@concierge.com",
      status: "A",
      language: language,
      permission: {
        viewRollout: true,
        createRollout: true,
        createUser: true,
        removeRollout: true,
        updateRelease: true,
      },
    };
    storage.setData("user", user);
    setIsOpen(false);
    window.location.reload();
  };

  useEffect(() => {
    setLanguage(user.language);
  }, []);

  return (
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
  );
};

export default CustomDropdown;
