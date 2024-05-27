import axios from "axios";
import env from "@env";
import { StorageServiceImpl } from "./storage";

const axiosInstance = axios.create({
  baseURL: env.API, // Insira sua URL base aqui
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const storage = new StorageServiceImpl();
    const token = storage.getData("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
// Interceptor de resposta
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Tratar erros de forma diferenciada aqui
    if (error.response) {
      // O servidor retornou um código de status diferente de 2xx
      const errorMessage =
        error.response.data && error.response.data.error
          ? error.response.data.error
          : "Erro na resposta do servidor";

      return Promise.reject({
        status: error.response.status,
        message: errorMessage,
      });
    } else if (error.request) {
      // A solicitação foi feita, mas não recebeu resposta
      return Promise.reject({
        status: 0, // Indique um código de erro personalizado para erros de requisição
        message: "Não foi possível obter resposta do servidor",
      });
    } else {
      // Ocorreu um erro durante o processo de requisição
      return Promise.reject({
        status: 500, // Indique um código de erro personalizado para outros tipos de erro
        message: "Erro durante o processamento da requisição",
      });
    }
  }
);

export default axiosInstance;
