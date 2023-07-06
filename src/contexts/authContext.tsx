/**
 * Deprecated.
 * 
 * React Context made for understanding purpose. Not used anymore.
 * Replaced by a Redux Store.
 */

import { Dispatch, createContext } from "react";
import { AuthAction, User } from "../redux/reducers/authReducer.deprecated";

type AuthContextValue = {
    user: User | undefined
    dispatch: Dispatch<AuthAction>
}; 

export const AuthContext = createContext<AuthContextValue>({
    user: undefined,
    dispatch: () => {}
});