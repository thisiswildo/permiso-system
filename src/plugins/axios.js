import Vue from "vue";
import Axios from "axios";
import VueAxios from "vue-axios";
import $store from "../store";

// Dev
const baseURL = "https://localhost:44310/";

const http = Axios.create({ baseURL });

http.interceptors.request.use(
  function (config) {
    $store.commit("setError", null);
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    // Do something with response error
    $store.commit("setError", error.message);
    return Promise.reject(error);
  }
);

Vue.use(VueAxios, http);
