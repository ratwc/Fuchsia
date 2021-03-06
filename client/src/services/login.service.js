import axios from "axios";

const url = "http://localhost:5000/api/login";

class LoginService {
  // Gets token, stores in local storage

  static async login(email, password) {
    const res = await axios.post(url, { email, password });
    const token = res.data.data.token;
    localStorage.setItem("jwt", JSON.stringify(token));
  }

  // Removes JWT from local storage
  static logout() {
    localStorage.removeItem("jwt");
  }
}

export default LoginService;
