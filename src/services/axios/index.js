import axios from "axios";

axios.defaults.baseURL = "https://duyhiep-blog.herokuapp.com";
axios.defaults.headers = {
  "Content-type": "application/x-www-form-urlencoded",
  "Access-Control-Allow-Origin": "*",
};

export default axios;
