import { ButtonHTMLAttributes, PropsWithChildren } from "react";

const BUTTON_TYPES = {
    default: 'text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 ml-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800',
    success: 'focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800',
    danger: 'focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 ml-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'
}

type ButtonStyleType = keyof typeof BUTTON_TYPES;
type ButtonProps = {
    styleType?: ButtonStyleType
} & PropsWithChildren<ButtonHTMLAttributes<{}>>;

export function Button({ styleType = 'default', type, className, children, ...otherProps }: ButtonProps) {
    return <button
        type={type || 'button'}
        className={`${className} ${BUTTON_TYPES[styleType]}`}
        {...otherProps}
    >
        {children}
    </button>
}