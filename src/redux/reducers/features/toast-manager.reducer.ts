import { AnyAction } from "@reduxjs/toolkit"
import { µToastManagerClearDone, µToastManagerClearing, µToastManagerCreate } from "../../actions/features/toast-manager.actions"

export type ToastParams = {
    icon: 'cart',
    text: string,
    clearWithin: number,
}

export type ToastConfig = ToastParams & {
    timestamp: number,
    visible: boolean
}

type FeatureToastManagerState = {
    items: ToastConfig[],
    durations: {
        animationTransitionOut: number
    }
}


const initialState: FeatureToastManagerState = {
    items: [],
    durations: {
        animationTransitionOut: 200
    }
}

export function toastManagerReducer(state: FeatureToastManagerState = initialState, action: AnyAction): FeatureToastManagerState {
    if (µToastManagerCreate.match(action)) {
        return {
            ...state,
            items: [...state.items, { ...action.payload, timestamp: Date.now(), visible: true }]
        }
    }

    if (µToastManagerClearing.match(action)) {
        return {
            ...state,
            items: state.items.map(toast => {
                if (toast.timestamp === action.payload) {
                    return { ...toast, visible: false }
                }
                return toast
            })
        }
    }

    if (µToastManagerClearDone.match(action)) {
        return {
            ...state,
            items: state.items.filter(x => x.timestamp !== action.payload)
        }
    }

    return state;
}
