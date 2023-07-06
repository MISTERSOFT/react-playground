import { AnyAction } from "@reduxjs/toolkit"
import { µPaymentSuccessfulModalClose, µPaymentSuccessfulModalOpen } from "../../actions/features/payment-successful-modal.actions"

type FeaturePaymentSuccessfulModalState = {
    isOpen: boolean
}


const initialState: FeaturePaymentSuccessfulModalState = {
    isOpen: false
}

export function paymentSuccessfulModalReducer(state: FeaturePaymentSuccessfulModalState = initialState, action: AnyAction): FeaturePaymentSuccessfulModalState {
    if (µPaymentSuccessfulModalOpen.match(action)) {
        return { isOpen: true }
    }

    if (µPaymentSuccessfulModalClose.match(action)) {
        return { isOpen: false }
    }

    return state;
}
