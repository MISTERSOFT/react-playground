import { Dispatch, createContext } from "react";
import { AuthAction, User } from "../reducers/authReducer";

type AuthContextValue = {
    user: User | undefined
    dispatch: Dispatch<AuthAction>
}; 

export const AuthContext = createContext<AuthContextValue>({
    user: undefined,
    dispatch: () => {}
});