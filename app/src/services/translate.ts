import { Language } from "@/types/language";
import { StorageServiceImpl } from "./storage";

import pt from "../language/pt.json";
import en from "../language/en.json";
import es from "../language/es.json";

interface TranslationService {
  getTranslation(): Language;
}

export class TranslationServiceImpl implements TranslationService {
  private language: string;

  constructor() {
    const storage = new StorageServiceImpl();
    this.language = storage.getData("language");
  }

  getTranslation(): Language {
    switch (this.language) {
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
