import { useAuthContext } from "./useAuthContext"
import { useSkillsContext } from "./useSkillsContext"

export const useLogout = () => {
    const {dispatch} = useAuthContext()
    const {dispatch:skillsDispatch} = useSkillsContext()

        const logout = () => {
            //remove the user from storage
            localStorage.removeItem('user')

            dispatch({type:'LOGOUT'})
            skillsDispatch({type:'SET_SKILLS',payload:null})

        }

    return {logout}
} 