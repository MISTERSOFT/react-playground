import { useState } from "react"
import { ChevronDownIcon, ChevronUpIcon, CloseIcon } from "../icons/Icons"
import { Category } from "../../redux/reducers/store.reducer"
import './CategoriesSelector.scss';

function DropdownItemTag({ title, onRemoveClick }: { title: string, onRemoveClick: () => void }) {
    return <div className="flex justify-center items-center m-1 font-medium py-1 px-2 rounded-full text-white dark:bg-blue-600">
        <div className="text-xs font-normal leading-none max-w-full flex-initial">{title}</div>
        <div className="flex flex-auto flex-row-reverse">
            <button onClick={onRemoveClick}>
                <CloseIcon size={3} className="ml-2 hover:cursor-pointer text-white" />
            </button>
        </div>
    </div>
}

function DropdownItem({ title, onClick }: { title: string, onClick: () => void }) {
    // border-gray-100
    return <div className="cursor-pointer w-full dark:hover:bg-gray-600 text-white" onClick={onClick}>
        {/* hover:border-gray-100 */}
        <div className="flex w-full items-center p-2 border-transparent relative ">
            <div className="w-full items-center flex">
                <div className="mx-2 leading-6">{title}</div>
            </div>
        </div>
    </div>
}

export function CategoriesSelector({ categories, onSelectionChange }: { categories: Category[], onSelectionChange: (categories: Category[]) => void }) {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedCategories, setSelectedCategories] = useState<Category[]>([])
    const remainingCategories = categories.filter(x => !selectedCategories.includes(x))

    function handleToggleOpen() {
        setIsOpen(!isOpen)
    }

    function handleOnItemTagRemove(category: string) {
        const newSelection = selectedCategories.filter(c => c !== category);
        setSelectedCategories(newSelection)
        onSelectionChange(newSelection)
    }

    function handleOnItemClick(category: string) {
        const newSelection = [...selectedCategories, category];
        setSelectedCategories(newSelection)
        onSelectionChange(newSelection)
    }

    return <>
        <div className="flex flex-col items-center relative">
            <div className="
                        p-1
                        flex
                        border
                        border-gray-200
                        bg-gray-700
                        rounded
                        dark:bg-gray-700
                        dark:border-gray-600
                        dark:focus:ring-blue-500
                        dark:focus:border-blue-500
                        ">
                <div className="flex flex-auto flex-wrap">
                    {selectedCategories.map(c => <DropdownItemTag key={c} title={c} onRemoveClick={() => handleOnItemTagRemove(c)} />)}
                    <div className="flex-1">
                        <input placeholder="Categories..." className="bg-transparent p-1 px-2 appearance-none outline-none h-full w-full text-gray-800 dark:text-white dark:placeholder-gray-400" />
                    </div>
                </div>
                <div className="text-gray-300 w-8 py-1 pl-2 pr-1 border-l flex items-center border-gray-400">
                    <button className="cursor-pointer w-6 h-6 text-gray-600 outline-none focus:outline-none" onClick={handleToggleOpen}>
                        {
                            isOpen ?
                            <ChevronUpIcon size={3} className="text-white" /> :
                            <ChevronDownIcon size={3} className="text-white" />
                        }
                    </button>
                </div>
            </div>
            {
                isOpen &&
                <div className="absolute top-100-percent shadow top-100 dark:bg-gray-700 z-40 w-full lef-0 rounded max-h-select overflow-y-auto">
                    <div className="flex flex-col w-full">
                        {remainingCategories.map(c => <DropdownItem key={c} title={c} onClick={() => handleOnItemClick(c)} />)}
                    </div>
                </div>
            }
        </div>
    </>
}