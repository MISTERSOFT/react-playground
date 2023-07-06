import { Provider } from "react-redux";
import { store } from "./store";
import { PropsWithChildren, useEffect } from "react";
import { µAuthInit } from "./actions/auth.actions";
import { µStoreInit } from "./actions/store.actions";

export function ReduxProvider({ children }: PropsWithChildren) {

    useEffect(() => {
        // Try to login user on app init
        store.dispatch(µAuthInit());
        // Trigger store initialization here. It ensure products loading is triggered, even if we land/refresh on a product page 
        store.dispatch(µStoreInit());
    }, []);


    return <Provider store={store}>
        {children}
    </Provider>
}