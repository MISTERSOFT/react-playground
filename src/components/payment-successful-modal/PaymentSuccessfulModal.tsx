import { Fragment, useCallback } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CheckIcon } from '../icons/Icons'
import { Button } from '../ui/Button'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { selectIsPaymentSuccessfulModalOpen } from '../../redux/selectors/features/payment-successful-modal.selectors'
import { µPaymentSuccessfulModalClose } from '../../redux/actions/features/payment-successful-modal.actions'

export function PaymentSuccessfulModal() {
    const dispatch = useAppDispatch()
    const isOpen = useAppSelector(selectIsPaymentSuccessfulModalOpen)

    const closeModal = useCallback(() => dispatch(µPaymentSuccessfulModalClose()), [dispatch])

    return (
        <Transition.Root show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeModal}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                <div className="bg-gray-800 px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                    <div className="text-center">
                                        <Dialog.Title as="h1" className="flex flex-col items-center text-base font-semibold leading-6 text-white">
                                            <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 mb-4">
                                                <CheckIcon size={6} strokeWidth={1} className='text-green-600' />
                                            </div>
                                            Payment successful
                                        </Dialog.Title>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-100">
                                                Thank you for your purchase !
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-800 px-4 py-6">
                                    <Button styleType='default' className='w-full' onClick={closeModal}>Continue shopping</Button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}