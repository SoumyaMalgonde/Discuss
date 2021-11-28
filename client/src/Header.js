import Logo from './images/logo.png';
import Avatar from './images/avatar.png';
import { BellIcon, ChatIcon, ChevronDownIcon, LoginIcon, LogoutIcon, PlusIcon, SearchIcon, UserIcon } from '@heroicons/react/outline'
import Button from './Button';
import { useState, useContext } from 'react';
import ClickOutHandler from 'react-clickout-handler'
import AuthModalContext from './AuthModelContext';
import UserContext from './UserContext';
import { Link } from 'react-router-dom';

function Header() {
    const [userDropdownVisibilityClass, setUserDropdownVisibilityClass] = useState('hidden');
    function toggleUserDropdown() {
        if (userDropdownVisibilityClass === 'hidden') {
            setUserDropdownVisibilityClass('block');
        } else {
            setUserDropdownVisibilityClass('hidden');
        }
    }
    const authModal = useContext(AuthModalContext);
    const user = useContext(UserContext);

    return (
        <header className="w-full bg-discuss_dark p-2">
            <div className="flex mx-4 relative">
                <Link to="/">
                    <img src={Logo} alt="" className="w-8 h-8 mr-4" />
                </Link>
                <form action="" className="bg-discuss_dark-brighter px-3 flex rounded-md border border-discuss_border mx-4 flex-grow">
                    <SearchIcon className="text-gray-400 h-6 w-6 mt-2" />
                    <input type="text" className="bg-discuss_dark-brighter text-sm p-1 pl-2 pr-0 block focus:outline-none text-white" placeholder="Search" />
                </form>

                {user.username && (
                    <>
                        <button className="px-2 py-1">
                            <ChatIcon className="text-gray-400 w-6 h-6 m-1 mx-2" />
                        </button>
                        <button className="px-2 py-1">
                            <BellIcon className="text-gray-400 w-6 h-6 m-1 mx-2" />
                        </button>
                        <button className="px-2 py-1">
                            <PlusIcon className="text-gray-400 w-6 h-6 m-1 mx-2" />
                        </button>
                    </>
                )}

                {!user.username && (
                    <div className="mx-3 hidden sm:block ">
                        <Button outline className="mr-1 h-8" onClick={() => authModal.setShow('login')}>Log In</Button>
                        <Button className="h-8" onClick={() => authModal.setShow('register')}>Sign Up</Button>
                    </div>
                )}

                <ClickOutHandler onClickOut={() => setUserDropdownVisibilityClass('hidden')}>
                    <button className="rounded-md flex ml-4 border border-gray-700" onClick={() => toggleUserDropdown()}>
                        {!user.username && (
                            <UserIcon className="w-6 h-6 m-1 text-gray-400" />
                        )}

                        {user.username && (
                            <div className="w-8 h-8 mt-1">
                                <img src={Avatar} alt="" />
                            </div>
                        )}

                        <ChevronDownIcon className="text-gray-500 w-6 h-6 m-1 mt-2" />
                    </button>
                    <div className={"absolute right-0 top-8 bg-discuss_dark border border-gray-700 z-10 rounded-md text-discuss_text overflow-hidden " + userDropdownVisibilityClass}>
                        {user.username && (
                            <span className="block w-50 py-2 px-3 text-sm">
                                Hello, {user.username}!
                            </span>
                        )}
                        {!user.username && (
                            <button className="block flex w-50 py-2 px-3 hover:bg-gray-300 hover:text-black text-sm" onClick={() => authModal.setShow('login')}>
                                <LoginIcon className="w-5 h-5 mr-2" />
                                Log In / Sign Up
                            </button>
                        )}

                        {user.username && (
                            <button className="block flex w-50 py-2 px-3 hover:bg-gray-300 hover:text-black text-sm" onClick={() => user.logout()}>
                                <LogoutIcon className="w-5 h-5 mr-2" />
                                Logout
                            </button>
                        )}
                    </div>

                </ClickOutHandler>


            </div>

        </header>
    );
}

export default Header;