import { Language } from "@/types/language";
import { User } from "@/types/user";
import { StorageServiceImpl } from "./storage";

import pt from "../language/pt.json";
import en from "../language/en.json";
import es from "../language/es.json";

interface TranslationService {
  getTranslation(): Language;
}

export class TranslationServiceImpl implements TranslationService {
  private user: User;

  constructor() {
    const storage = new StorageServiceImpl();
    this.user = storage.getData("user");
  }

  getTranslation(): Language {
    switch (this.user.language) {
      case "portuguese":
        return pt;
      case "english":
        return en;
      case "spanish":
        return es;
      default:
        return en;
    }
  }
}
