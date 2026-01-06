import { useState } from "react"
import authContext from "./authContext"
import { BaseUrl } from "../BaseUrls"



function AuthState({ children }) {

    const [token, setToken] = useState(localStorage.getItem('token') || "")
    const [user, setUser] = useState({})

    const getProfile = async () => {
        try {
            const res = await fetch(`${BaseUrl}/api/v3.2/auth/profile`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "token": token
                }
            })
            const data = await res.json()
            if (data.success) {
                setUser(data.user)
                console.log(user)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <authContext.Provider value={{ token, setToken, user, setUser, getProfile }}>
            {children}
        </authContext.Provider>
    )
}

export default AuthState
