type IconProps = {
    size: number,
    className?: string
    strokeWidth?: number
};

function iconClassName(size: number, className: string = '') {
    return `w-${size} h-${size} text-gray-800 ${className}`;
}

/**
 * Size: https://tailwindcss.com/docs/height#fixed-heights
 * @param param0 
 * @returns 
 */
export function TrashIcon({ size, className }: IconProps) {
    return (
        <svg
            className={iconClassName(size, className)}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 20">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h16M7 8v8m4-8v8M7 1h4a1 1 0 0 1 1 1v3H6V2a1 1 0 0 1 1-1ZM3 5h12v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5Z" />
        </svg>
    )
}

export function EditIcon({ size, className }: IconProps) {
    return (
        <svg
            className={iconClassName(size, className)}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 21 21">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7.418 17.861 1 20l2.139-6.418m4.279 4.279 10.7-10.7a3.027 3.027 0 0 0-2.14-5.165c-.802 0-1.571.319-2.139.886l-10.7 10.7m4.279 4.279-4.279-4.279m2.139 2.14 7.844-7.844m-1.426-2.853 4.279 4.279" />
        </svg>
    )
}

export function ValidateIcon({ size, className }: IconProps) {
    return (
        <svg className={iconClassName(size, className)} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5.917 5.724 10.5 15 1.5" />
        </svg>
    )
}

export function CloseIcon({ size, className }: IconProps) {
    return (
        <svg className={iconClassName(size, className)} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
            <path d="m9.414 8 5.293-5.293a1 1 0 1 0-1.414-1.414L8 6.586 2.707 1.293a1 1 0 0 0-1.414 1.414L6.586 8l-5.293 5.293a1 1 0 1 0 1.414 1.414L8 9.414l5.293 5.293a1 1 0 0 0 1.414-1.414L9.414 8Z" />
        </svg>
    )
}

export function ChevronDownIcon({ size, className }: IconProps) {
    return <svg className={iconClassName(size, className)} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
    </svg>
}

export function ChevronUpIcon({ size, className }: IconProps) {
    return <svg className={iconClassName(size, className)} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5" />
    </svg>
}

export function SearchIcon({ size, className }: IconProps) {
    // "w-5 h-5 text-gray-500 dark:text-gray-400"
    return <svg className={iconClassName(size, className)} aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
    </svg>
}

export function ChevronSortIcon({ size, className }: IconProps) {
    // "w-6 h-6 text-gray-800 dark:text-white"
    return <svg className={iconClassName(size, className)} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 16">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5m0 6 4 4 4-4" />
    </svg>
}

export function CartOutlineIcon({ size, className }: IconProps) {
    return <svg className={iconClassName(size, className)} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 15a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0h8m-8 0-1-4m9 4a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-9-4h10l2-7H3m2 7L3 4m0 0-.792-3H1" />
    </svg>
}

export function CartIcon({ size, className }: IconProps) {
    return <svg className={iconClassName(size, className)} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 21">
        <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z" />
    </svg>
}

export function CheckIcon({ size, className, strokeWidth = 2 }: IconProps) {
    return <svg className={iconClassName(size, className)} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={strokeWidth} d="M1 5.917 5.724 10.5 15 1.5" />
    </svg>
}