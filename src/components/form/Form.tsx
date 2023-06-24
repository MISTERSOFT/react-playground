import { FormEventHandler, InputHTMLAttributes, PropsWithChildren, TextareaHTMLAttributes } from "react";

export function Form({ className, onSubmit, children }: PropsWithChildren<{ className?: string, onSubmit?: FormEventHandler<HTMLFormElement> }>) {
    return (
        <form className={className} onSubmit={onSubmit}>
            {children}
        </form>
    )
}

type TextBoxProps = InputHTMLAttributes<HTMLInputElement> & {
    label?: string
}
export function TextBox({ type = 'text', label, id, name, placeholder, className, value, onChange, required }: TextBoxProps) {
    return (
        <div>
            {
                label
                ? <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
                : <></>
            }
            <input
                type={type}
                id={id}
                name={name}
                className={`${className} bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                placeholder={placeholder}
                value={onChange ? value : undefined}
                defaultValue={onChange ? undefined : value}
                onChange={onChange}
                required={required}
            >
            </input>
        </div>
    )
}

type CheckBoxProps = InputHTMLAttributes<HTMLInputElement> & {
}
export function CheckBox({ id, checked, ...otherProps }: CheckBoxProps) {
    return (
        <input
            checked={checked}
            id={id}
            type="checkbox"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            {...otherProps}
        />
    )
}

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
    label: string
}
export function TextArea({ id, name, placeholder, label }: TextAreaProps) {
    return (
        <div>
            <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
            <textarea
                id={id}
                rows={4}
                name={name}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder={placeholder}>
            </textarea>
        </div>
    )
}

type SwitchProps = InputHTMLAttributes<HTMLInputElement> & {
    label: string
}
export function SwitchBox({ id, name, label, disabled, checked }: SwitchProps) {
    return (
        <label htmlFor={id} className="relative inline-flex items-center mb-4 cursor-pointer">
            <input type="checkbox" id={id} name={name} className="sr-only peer" disabled={disabled} checked={checked} />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">{label}</span>
        </label>
    )
}