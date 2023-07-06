/**
 * Reducer not used anymore.
 * 
 * React Reducer made for understanding only. Also check out `authContext.tsx`.
 */

export enum AuthActionType {
    LOGIN,
    LOGOUT,
}

type LoginAction = { type: AuthActionType.LOGIN, payload: User };
type LogoutAction = { type: AuthActionType.LOGOUT };
export type AuthAction = LoginAction
    | LogoutAction;

type AuthState = {
    token?: string,
    user: User | undefined
}

export type User = {
    email: string,
    firstname: string,
    lastname: string
}

export function authReducer(state: AuthState, action: AuthAction) {
    switch (action.type) {
        case AuthActionType.LOGIN:
            return {
                user: { ...action.payload }
            };

        case AuthActionType.LOGOUT:
            return {
                user: undefined
            };

        default:
            throw Error('Unknown action: ' + action);
    }
}