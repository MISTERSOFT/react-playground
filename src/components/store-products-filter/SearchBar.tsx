import { FormEvent } from "react";
import { SearchIcon } from "../icons/Icons";

export function SearchBar({ onSearch }: { onSearch: (value: string) => void }) {
    function handleOnSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const search = e.currentTarget.elements.namedItem('search') as HTMLInputElement;
        onSearch(search.value);
    }

    return <form className="flex-1 mr-2" onSubmit={handleOnSubmit}>
        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
        <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <SearchIcon size={4} className="text-white" />
            </div>
            <input type="search" id="search" className="block w-full p-2.5 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Mockups, Logos..." />
            <button type="submit" className="text-white absolute inset-y-0 right-0 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
        </div>
    </form>
}