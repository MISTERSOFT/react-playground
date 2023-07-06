import { Dialog, Transition } from "@headlessui/react";
import { FormEvent, Fragment, useState } from "react";
import { Form, TextBox } from "../form/Form";
import { CloseIcon } from "../icons/Icons";
import { Button } from "../ui/Button";
// import { AuthContext } from "../../contexts/authContext";
// import { AuthActionType } from "../../redux/reducers/authReducer";
import { µAuthLoginRequest } from "../../redux/actions/auth.actions";
import { useAppDispatch } from "../../redux/hooks";

export function LoginModal() {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useAppDispatch()
    // const { dispatch } = useContext(AuthContext);

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        // const { username, password } = e.target.elements
        const username = e.currentTarget.elements.namedItem('username') as HTMLInputElement
        const password = e.currentTarget.elements.namedItem('password') as HTMLInputElement

        // Fake auth
        // if (email.value !== 'john@doe.com' && password.value !== 'azerty') {
        //     // We can imagine a wrong response from server, we just return by now
        //     return;
        // }

        // dispatch({
        //     type: AuthActionType.LOGIN,
        //     payload: { email: email.value, firstname: 'John', lastname: 'Doe' }
        // });
        dispatch(µAuthLoginRequest({ username: username.value, password: password.value }))
    }

    return (
        <>
            <Button className='ml-4' onClick={openModal}>Login</Button>

            <Transition appear show={isOpen} as={Fragment}>
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
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-gray-700 p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium text-gray-900 dark:text-white mb-4"
                                    >
                                        Sign in to our platform

                                        <button
                                            type="button"
                                            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                                            onClick={closeModal}>
                                            <CloseIcon size={4} className="text-white" />
                                            <span className="sr-only">Close modal</span>
                                        </button>
                                    </Dialog.Title>

                                    <Form className="mt-2 space-y-6" onSubmit={handleSubmit}>
                                        <TextBox type="text" label="Your username" id="username" name="username" placeholder="johndoe" required={true} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" value="mor_2314" />
                                        <TextBox type="password" label="Your password" id="password" name="password" placeholder="••••••••" required={true} value="83r5^_" />
                                        <Button type="submit" className="w-full">Login to your account</Button>
                                    </Form>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}
