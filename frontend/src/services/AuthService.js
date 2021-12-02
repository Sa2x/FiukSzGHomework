import axios from "axios"
import authHeader from "./AuthHeader";

const API_URL = "http://localhost:8080/user/"

class AuthService {
    login(email, password) {
        const user = {
            email,
            password
        }

        return axios
            .post(API_URL + "login", user)
            .then(response => {
                if (response.data.token) {
                    localStorage.setItem("user", JSON.stringify(response.data))
                }
                return response.data
            })
    }

    logout() {
        localStorage.removeItem("user")
    }

    register(email, password, confirmedPassword) {
        const user = {
            email,
            password,
            confirmedPassword
        }

        return axios.post(API_URL + "register", user)
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'))
    }
}

export default new AuthService()