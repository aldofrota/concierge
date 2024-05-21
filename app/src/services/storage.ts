import CryptoJS from "crypto-js";
import env from "../config/env.json";

interface StorageService {
  setData(key: string, data: any): any;
  getData(key: string): any;
}

export class StorageServiceImpl implements StorageService {
  getData(key: string) {
    try {
      const dataEncrypt = localStorage.getItem(key) as string;
      const dataDecrypt = decrypt(dataEncrypt);
      return JSON.parse(dataDecrypt);
    } catch (_) {
      return false;
    }
  }
  setData(key: string, data: any) {
    try {
      const dataEncript = encrypt(JSON.stringify(data));
      localStorage.setItem(key, dataEncript);
      return true;
    } catch (_) {
      return false;
    }
  }
  deleteData(key: string) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (_) {
      return false;
    }
  }
}
function encrypt(text: string) {
  return CryptoJS.AES.encrypt(text, env.keyEncripy).toString();
}

function decrypt(text: string) {
  const bytes = CryptoJS.AES.decrypt(text, env.keyEncripy);
  return bytes.toString(CryptoJS.enc.Utf8);
}
