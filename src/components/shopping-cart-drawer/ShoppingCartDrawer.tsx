import { Fragment, useCallback } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CloseIcon } from '../icons/Icons'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { µShoppingCartDrawerClose } from '../../redux/actions/features/shopping-cart-drawer.actions'
import { selectIsShoppingCartDrawerOpen } from '../../redux/selectors/features/shopping-cart-drawer.selectors'
import { selectCartSubtotal, selectProductsInCart } from '../../redux/selectors/store.selectors'
import { Link } from 'react-router-dom'
import { µStoreCheckoutRequest, µStoreRemoveProductFromCart } from '../../redux/actions/store.actions'

export function ShoppingCartDrawer() {
    const dispatch = useAppDispatch()
    const isOpen = useAppSelector(selectIsShoppingCartDrawerOpen)
    const products = useAppSelector(selectProductsInCart)
    const subtotal = useAppSelector(selectCartSubtotal)
    const checkoutDisabled = products.length === 0

    const closeShoppingCartDrawer = useCallback(() => dispatch(µShoppingCartDrawerClose()), [dispatch])
    const checkout = useCallback(() => dispatch(µStoreCheckoutRequest()), [dispatch])
    const removeProductFromCart = (productId: number) => dispatch(µStoreRemoveProductFromCart(productId))

    return (
        <Transition.Root show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeShoppingCartDrawer}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                            <Transition.Child
                                as={Fragment}
                                enter="transform transition ease-in-out duration-500 sm:duration-700"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transform transition ease-in-out duration-500 sm:duration-700"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                                    <div className="flex h-full flex-col overflow-y-scroll bg-white dark:bg-gray-900 shadow-xl">
                                        <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                                            <div className="flex items-start justify-between">
                                                <Dialog.Title className="text-lg font-medium text-gray-900 dark:text-white">Shopping cart</Dialog.Title>
                                                <div className="ml-3 flex h-7 items-center">
                                                    <button
                                                        type="button"
                                                        className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                                                        onClick={closeShoppingCartDrawer}
                                                    >
                                                        <span className="sr-only">Close panel</span>
                                                        <CloseIcon size={6} className='text-white' />
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="mt-8">
                                                <div className="flow-root">
                                                    <ul className="-my-6 divide-y divide-gray-200">
                                                        {products.map((product) => (
                                                            <li key={product.item.id} className="flex py-6">
                                                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                                    <img
                                                                        src={product.item.image}
                                                                        alt={product.item.title}
                                                                        className="h-full w-full object-cover object-center"
                                                                    />
                                                                </div>

                                                                <div className="ml-4 flex flex-1 flex-col">
                                                                    <div>
                                                                        <div className="flex justify-between text-base font-medium text-gray-900 dark:text-white">
                                                                            <h3>
                                                                                <Link to={`/store/${product.item.id}`}>{product.item.title}</Link>
                                                                            </h3>
                                                                            <p className="ml-4">{product.formattedTotalPrice}</p>
                                                                        </div>
                                                                        <p className="mt-1 text-sm text-gray-100">{product.item.category}</p>
                                                                    </div>
                                                                    <div className="flex flex-1 items-end justify-between text-sm">
                                                                        <p className="text-gray-100">Qty {product.quantity}</p>

                                                                        <div className="flex">
                                                                            <button
                                                                                type="button"
                                                                                className="font-medium text-gray-100 hover:text-gray-300"
                                                                                onClick={() => removeProductFromCart(product.item.id)}
                                                                            >
                                                                                Remove
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                    <div hidden={products.length > 0} className='dark:text-white font-semibold mt-8 text-2xl text-center'>Your cart is empty :(</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                                            <div className="flex justify-between text-base font-medium text-gray-900 dark:text-white">
                                                <p>Subtotal</p>
                                                <p>{subtotal}</p>
                                            </div>
                                            <p className="mt-0.5 text-sm text-gray-100">Shipping and taxes calculated at checkout.</p>
                                            <div className="mt-6">
                                                <button
                                                    className={`w-full flex items-center justify-center rounded-md border border-transparent px-6 py-3 text-base font-medium text-white shadow-sm ${checkoutDisabled ? 'bg-indigo-300 cursor-not-allowed' : 'bg-green-700 hover:bg-green-800'}`}
                                                    onClick={checkout}
                                                    disabled={checkoutDisabled}
                                                >
                                                    Checkout
                                                </button>
                                            </div>
                                            <div className="mt-6 flex justify-center text-center text-sm text-gray-100">
                                                <p>
                                                    or
                                                    <button
                                                        type="button"
                                                        className="pl-2 font-medium text-gray-100 hover:text-gray-300"
                                                        onClick={closeShoppingCartDrawer}
                                                    >
                                                        Continue Shopping
                                                        <span aria-hidden="true"> &rarr;</span>
                                                    </button>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
