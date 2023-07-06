import { AnyAction } from "@reduxjs/toolkit"
import { µAuthLoginFailed, µAuthLoadUserDetailsSuccessed, µAuthLoadUserDetailsFailed, µAuthLogoutSuccessed } from "../actions/auth.actions"

export type LoginRequestPayload = {
    username: string,
    password: string
}

export type User = {
    id: number,
    email: string,
    username: string,
    password: string,
    name: {
        firstname: string,
        lastname: string
    },
    address: {
        city: string,
        street: string,
        number: number,
        zipcode: string,
        geolocation: {
            lat: string,
            long: string
        }
    },
    phone: string
}

type AuthState = {
    user?: User
}


const initialState: AuthState = {
    user: undefined
}

export function authReducer(state: AuthState = initialState, action: AnyAction): AuthState {
    if (µAuthLoadUserDetailsSuccessed.match(action)) {
        const  user = action.payload;
        return {
            ...state,
            user
        }
    }

    if (µAuthLoadUserDetailsFailed.match(action)) {
        return { ...state, user: undefined };
    }

    if (µAuthLoginFailed.match(action)) {
        return { ...state, user: undefined };
    }

    if (µAuthLogoutSuccessed.match(action)) {
        return { ...state, user: undefined };
    }

    return state;
}
