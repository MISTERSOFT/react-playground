import { Link, useLocation } from 'react-router-dom';
import { routes } from '../../App';
import logo from '../../logo.svg'
import { LoginModal } from '../login-modal/LoginModal';
import { AuthContext } from '../../contexts/authContext';
import { Fragment, useContext } from 'react';
import { AuthActionType, User } from '../../reducers/authReducer';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '../icons/Icons';

export function NavMenu() {
    const { user: loggedUser, dispatch } = useContext(AuthContext);
    const currentLocation = useLocation()
    const activePageClass = 'block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500';
    const otherPageClass = 'block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'

    const links = routes.map(route => {
        if (route.path && route.name) {
            const isCurrent = currentLocation.pathname === route.path;
            return <Link
                to={route.path}
                className={isCurrent ? activePageClass : otherPageClass}
                aria-current={isCurrent ? 'page' : undefined}
            >{route.name}
            </Link>;
        }
        return undefined;
    }).filter(Boolean);

    function logout() {
        dispatch({ type: AuthActionType.LOGOUT });
    }

    return (
        <nav className="bg-white border-gray-200 dark:bg-gray-900">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link to='/' className="flex items-center">
                    <img src={logo} className="h-8 mr-3" alt="Flowbite Logo" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">React Playground</span>
                </Link>

                <div className='flex items-center'>
                    <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
                    </button>
                    <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                        <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                            {
                                links.map((link, i) => <li key={i}>{link}</li>)
                            }
                        </ul>
                    </div>

                    {
                        loggedUser
                            ? <UserMenuDropdown className='ml-4' loggedUser={loggedUser} onLogout={logout} />
                            : <LoginModal />
                    }
                </div>
            </div>
        </nav >

    )
}

function UserMenuDropdown({ className, loggedUser, onLogout }: { className: string, loggedUser: User | undefined, onLogout: () => void }) {
    return (
        <Menu as="div" className={`relative ${className}`}>
            <div>
                <Menu.Button className="
                    items-center
                    inline-flex
                    w-full
                    justify-center
                    gap-x-1.5
                    rounded-md
                    bg-white
                    px-3
                    py-2
                    text-sm
                    font-semibold
                    text-gray-900
                    shadow-sm
                    hover:bg-gray-50
                    focus:outline-none
                    dark:bg-blue-600
                    dark:hover:bg-blue-700
                    dark:text-white
                ">
                    <img
                        className="inline-block h-6 w-6 rounded-full"
                        src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt="profile picture"
                    />
                    {loggedUser?.firstname} {loggedUser?.lastname}
                    <ChevronDownIcon size={3} className="text-gray-400" aria-hidden="true" />
                </Menu.Button>
            </div>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                        <Menu.Item>
                            <a
                                href="#"
                                className='text-gray-700 block px-4 py-2 text-sm'
                            >
                                Account settings
                            </a>
                        </Menu.Item>
                        <Menu.Item>
                            <button
                                type="button"
                                className='text-gray-700 block w-full px-4 py-2 text-left text-sm'
                                onClick={onLogout}
                            >
                                Sign out
                            </button>
                        </Menu.Item>
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    )
}