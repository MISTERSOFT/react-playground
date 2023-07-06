import { redirect, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectProductById } from "../../redux/selectors/store.selectors";
import { CartOutlineIcon, ChevronSortIcon } from "../../components/icons/Icons";
import { Button } from "../../components/ui/Button";
import { FormEvent } from "react";
import { µStoreAddProductToCart } from "../../redux/actions/store.actions";
import { selectIsAuth } from "../../redux/selectors/auth.selectors";

export function ProductPage() {
    const params = useParams<{ productId: string }>()
    const productId = Number(params['productId'])

    if (Number.isNaN(productId) || productId === 0) {
        redirect('/store')
    }

    const dispatch = useAppDispatch()
    const isAuth = useAppSelector(selectIsAuth)
    const product = useAppSelector(state => selectProductById(state, productId))

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const quantityEl = e.currentTarget.elements.namedItem('quantity') as HTMLSelectElement
        dispatch(µStoreAddProductToCart({ productId, quantity: +quantityEl.value }))
    }

    return <>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
            <div className="flex flex-col md:flex-row -mx-4">
                <div className="md:flex-1 px-4">
                    <div className="h-64 md:h-80 rounded-lg bg-gray-100 mb-4">
                        <img src={product?.image} alt={product?.title} className="h-full w-full" />
                    </div>
                </div>
                <div className="md:flex-1 px-4">
                    <h2 className="mb-2 leading-tight tracking-tight font-bold text-white text-2xl md:text-3xl">Lorem ipsum dolor, sit amet consectetur, adipisicing elit.</h2>

                    <div className="flex items-center space-x-4 my-4">
                        <div>
                            <div className="rounded-lg flex py-2 px-3 text-white">
                                <span className="font-bold text-3xl">{product?.formattedPrice}</span>
                            </div>
                        </div>
                        <div className="flex-1">
                            <p className="text-gray-300 text-xl font-semibold">Save 12%</p>
                            <p className="text-gray-400 text-sm">Inclusive of all Taxes.</p>
                        </div>
                    </div>

                    <p className="text-gray-300">{product?.description}</p>

                    {isAuth &&
                        <form className="flex py-4 space-x-4" onSubmit={handleSubmit}>
                            <div className="relative">
                                <div className="text-center left-0 pt-2 right-0 absolute block text-xs uppercase text-gray-100 tracking-wide font-semibold">Qty</div>
                                <select name="quantity" className="cursor-pointer appearance-none rounded-xl pl-4 pr-8 h-14 flex items-end pb-1
                            dark:bg-gray-700 dark:focus:ring-blue-500 focus:outline-none dark:text-white">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </select>
                                <ChevronSortIcon size={4} className="absolute right-0 bottom-0 text-white mb-2 mr-2" />
                            </div>

                            <Button type="submit" styleType="success" className="flex items-center">
                                Add To Cart
                                <CartOutlineIcon size={4} className="ml-2 text-white" />
                            </Button>
                        </form>
                    }
                </div>
            </div>
        </div>
    </>
}