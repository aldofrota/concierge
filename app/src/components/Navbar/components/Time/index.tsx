import "./index.scss";
import { useState, useEffect } from "react";
import { User } from "@/types/user";
import { StorageServiceImpl } from "@/services/storage";

import moment from "moment-timezone";
import "moment/locale/pt-br";
moment.locale("pt");
moment.updateLocale("pt", {
  months: [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ],
});

const Time = () => {
  const storage = new StorageServiceImpl();

  const [user] = useState<User>(() => {
    return storage.getData("user");
  });

  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateCurrentTime = () => {
      const is24 = user.is24or12 === "24";
      const now = moment()
        .tz(user.timezone ?? "America/Fortaleza")
        .format(`D [de] MMMM, ${is24 ? "HH:mm:ss" : "h:mm:ss A"}`);
      setCurrentTime(now);
    };
    updateCurrentTime();

    // Atualiza a hora a cada segundo
    const intervalId = setInterval(updateCurrentTime, 1000);

    // Limpa o intervalo quando o componente for desmontado
    return () => clearInterval(intervalId);
  }, [user.timezone]);

  return (
    <div className="main-time">
      <span className="material-symbols-rounded icon">schedule</span>
      <span>{currentTime}</span>
    </div>
  );
};

export default Time;
