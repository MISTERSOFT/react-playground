import { µToastManagerClearing } from "../../redux/actions/features/toast-manager.actions"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { selectAnimationTransitionOut, selectToasts } from "../../redux/selectors/features/toast-manager.selectors"
import { Toast } from "./Toast"

export function ToastContainer() {
    const dispatch = useAppDispatch()
    const toasts = useAppSelector(selectToasts)
    const animationTransitionOut = useAppSelector(selectAnimationTransitionOut)

    const handleOnTimeout = (timestamp: number) => {
        dispatch(µToastManagerClearing(timestamp))
    }

    return <div>
        {toasts.map((toastConfig, i) => <Toast
            key={toastConfig.timestamp}
            {...toastConfig}
            visible={toastConfig.visible}
            animationTransitionOut={animationTransitionOut}
            onTimeout={handleOnTimeout}
        />)}
    </div>
}