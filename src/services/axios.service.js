/* eslint-disable no-useless-catch */
import axios from 'axios';
import store from '@/store';

const axiosInstance = axios.create({
  baseURL: 'https://apidemo.iut-bm.univ-fcomte.fr/herocorp', 
  timeout: 10000, 
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    const orgSecret = store.state.secretPhrase.organizationPassword;
    if (orgSecret) {
      config.headers['org-secret'] = orgSecret;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error(`Erreur ${error.response.status}:`, error.response.data.message || error.message);
    } else if (error.request) {
      console.error("Pas de réponse reçue du serveur:", error.request);
    } else {
      console.error("Erreur lors de la configuration de la requête:", error.message);
    }
    return Promise.reject(error);
  }
);

const get = async (url, params = {}) => {
  try {
    const response = await axiosInstance.get(url, { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const post = async (url, data = {}) => {
  try {
    const response = await axiosInstance.post(url, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const put = async (url, data = {}) => {
  try {
    const response = await axiosInstance.put(url, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const patch = async (url, data = {}) => {
  try {
    const response = await axiosInstance.patch(url, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const axiosService = {
  get,
  post,
  put,
  patch,
};

export default axiosService;
