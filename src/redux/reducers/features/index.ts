import { combineReducers } from "@reduxjs/toolkit";
import { shoppingCartDrawerReducer } from "./shopping-cart-drawer.reducer";
import { paymentSuccessfulModalReducer } from "./payment-successful-modal.reducer";
import { toastManagerReducer } from "./toast-manager.reducer";

export const FEATURE_REDUCERS = combineReducers({
    shoppingCartDrawer: shoppingCartDrawerReducer,
    paymentSuccessfulModal: paymentSuccessfulModalReducer,
    toastManager: toastManagerReducer,
})