import axios from "axios"

const API_URL = "http://localhost:8080/user/"

class AuthService {
    login(email, password) {
        const user = {
            email: email,
            password: password
        }

        return axios
            .post(API_URL + "login", { user })
            .then(response => {
                if (response.data.accessToken) {
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
            email: email,
            password: password,
            confirmedPassword: confirmedPassword
        }

        return axios.post(API_URL + "register", { user })
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'))
    }
}

export default new AuthService()