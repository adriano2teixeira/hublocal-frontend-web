import { useContext } from "react"
import { AuthContext } from "../contexts/auth.context"


export const useAuthContext = () => {
    const ctx = useContext(AuthContext)
    return ctx
}

