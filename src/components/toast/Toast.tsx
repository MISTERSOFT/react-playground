import { Transition } from "@headlessui/react"
import { Fragment, useEffect } from "react"
import { ToastConfig } from "../../redux/reducers/features/toast-manager.reducer"
import { CartIcon } from "../icons/Icons"

type ToastProps = ToastConfig & {
    onTimeout: (timestamp: number) => void,
    animationTransitionOut: number
}

export function Toast({ visible, icon, clearWithin, text, timestamp, onTimeout, animationTransitionOut }: ToastProps) {
    const position = 'fixed top-3'

    useEffect(() => {
        if (visible) {
            const timeoutId = setTimeout(() => {
                onTimeout(timestamp)
            }, clearWithin)
            return () => {
                clearTimeout(timeoutId)
            }
        }
    })

    let iconComponent;
    switch (icon) {
        case 'cart':
            iconComponent = <CartIcon size={4} className="text-white" />
            break;
        default:
            break;
    }

    return <>
        <Transition
            as={Fragment}
            show={visible}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave={`ease-in duration-${animationTransitionOut}`}
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
        >
            <div className={`${position} z-40 flex items-center w-full max-w-xs p-4 space-x-4 text-gray-500 bg-white divide-x divide-gray-200 rounded-lg shadow dark:text-gray-400 dark:divide-gray-700 space-x dark:bg-gray-800`} role="alert">
                {iconComponent}
                <div className="pl-4 text-sm font-normal">{text}</div>
            </div>
        </Transition>
    </>
}