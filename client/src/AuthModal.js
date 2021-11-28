import Input from "./Input";
import Button from "./Button";
import { useState, useContext } from 'react';
import axios from 'axios';
import AuthModalContext from "./AuthModelContext";
import ClickOutHandler from 'react-clickout-handler'
import UserContext from "./UserContext";

function AuthModal() {
    const [modalType, setModalType] = useState('login');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const modalContext = useContext(AuthModalContext);
    const user = useContext(UserContext);

    const visibleClass = modalContext.show !== false ? 'flex' : 'hidden';
    if (modalContext.show && modalContext.show !== modalType) {
        setModalType(modalContext.show);
    }

    async function register(e) {
        e.preventDefault();
        const data = { email, username, password };
        try {
            const resp = await axios.post('http://localhost:4000/user/register', data, { withCredentials: true })
                .then(() => {
                    user.setUser({ username });
                    setEmail('');
                    setUsername('');
                    setPassword('');
                    modalContext.setShow(false)
                });
            console.log(resp);
        } catch (error) {
            console.log('error' + error);
            if (error.response.status === 409)
                alert("Email or username is already in use.");
            if (error.response.status === 500)
                alert("Internal server error. Please try again.");
        }
    }

    function login() {
        const data = { username, password };
        axios.post('http://localhost:4000/user/login', data, { withCredentials: true })
            .then(() => {
                modalContext.setShow(false);
                user.setUser({ username });
            })
            .catch((err) => {
                if (err.response.status === 404)
                    alert("No user with such username.");
                if (err.response.status === 422)
                    alert("Incorrect password.");
                if (err.response.status === 500)
                    alert("Internal server error. Please try again.");
            });
    }

    return (
        <div className={"w-screen h-screen fixed top-0 left-0 z-20 flex " + visibleClass} style={{ backgroundColor: 'rgba(0,0,0,.6)' }}>
            <ClickOutHandler onClickOut={() => modalContext.setShow(false)}>
                <div className="w-3/4 sm:w-1/2 md:w-2/4 lg:w-1/4 border border-discuss_dark-brightest bg-discuss_dark p-5 text-discuss_text self-center mx-auto rounded-md ">
                    {modalType === 'login' && (
                        <h1 className="text-2xl mb-5">Login</h1>
                    )}
                    {modalType === 'register' && (
                        <h1 className="text-2xl mb-5">Sign Up</h1>
                    )}
                    {modalType === 'register' && (
                        <label>
                            <span className="text-discuss_text-darker text-sm">E-mail: </span>
                            <Input type="email" className="mb-3 w-full " value={email} onChange={e => setEmail(e.target.value)} />
                        </label>
                    )}
                    <label>
                        <span className="text-discuss_text-darker text-sm">Username: </span>
                        <Input type="text" className="mb-3 w-full" value={username} onChange={e => setUsername(e.target.value)} />
                    </label>
                    <label>
                        <span className="text-discuss_text-darker text-sm" >Password: </span>
                        <Input type="password" className=" mb-3 w-full " value={password} onChange={e => setPassword(e.target.value)} />
                    </label>

                    {modalType === 'login' && (
                        <Button className="w-full py-2 mb-3" style={{ borderRadius: '.3rem' }} onClick={e => login()}>
                            Log In
                        </Button>
                    )}
                    {modalType === 'register' && (
                        <Button className="w-full py-2 mb-3" style={{ borderRadius: '.3rem' }} onClick={e => register(e)}>
                            Sign Up
                        </Button>
                    )}

                    {modalType === 'login' && (
                        <div>
                            New user? <button className="text-blue-600" onClick={() => modalContext.setShow('register')}>SIGN UP</button>

                        </div>

                    )}
                    {modalType === 'register' && (
                        <div>
                            Already have an account? <button className="text-blue-600" onClick={() => modalContext.setShow('login')}>LOG IN</button>
                        </div>
                    )}
                </div>
            </ClickOutHandler >
        </div >
    );
};

export default AuthModal;