import axios from "axios";

export class HttpService {
  constructor() {
    axios.defaults.baseURL = "http://localhost:8000/api/";
    axios.defaults.headers.accept = "application/json";
    this.axios = axios;

    Object.assign(this.axios.defaults.headers.common, {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    });
  }

  setHeaders(headers) {
    Object.assign(axios.defaults.headers.common, headers);
  }
}
