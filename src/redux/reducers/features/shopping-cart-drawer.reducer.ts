import { AnyAction } from "@reduxjs/toolkit"
import { µShoppingCartDrawerClose, µShoppingCartDrawerOpen } from "../../actions/features/shopping-cart-drawer.actions"

type FeatureShoppingCartDrawerState = {
    isOpen: boolean
}


const initialState: FeatureShoppingCartDrawerState = {
    isOpen: false
}

export function shoppingCartDrawerReducer(state: FeatureShoppingCartDrawerState = initialState, action: AnyAction): FeatureShoppingCartDrawerState {
    if (µShoppingCartDrawerOpen.match(action)) {
        return { isOpen: true }
    }

    if (µShoppingCartDrawerClose.match(action)) {
        return { isOpen: false }
    }

    return state;
}
