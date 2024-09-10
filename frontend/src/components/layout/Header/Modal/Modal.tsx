import { setLoginStatus } from "../../../../redux/actions/tracksActions.ts";
import React, { useEffect, useState, FormEvent } from 'react';
import { useDispatch } from "react-redux";
import './Modal.scss';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const [formValid, setFormValid] = useState(false);
    const [emailDirty, setEmailDirty] = useState(false);
    const [passwordDirty, setPasswordDirty] = useState(false);
    const [emailError, setEmailError] = useState('Email cannot be empty');
    const [passwordError, setPasswordError] = useState('Password cannot be empty');

    useEffect(() => {
        if (emailError || passwordError) {
            setFormValid(false);
        } else {
            setFormValid(true);
        }
    }, [emailError, passwordError]);

    const switchLogin = () => {
        setIsLogin(!isLogin);
        setEmailDirty(false);
        setPasswordDirty(false);
    };

    const emailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        const re = /^(([^<>()[\],;:\s@"]+(\.[^<>()[\],;:\s@"]+)*)|(".+"))@(([^<>()[\],;:\s@"]+\.)+[^<>()[\],;:\s@"]{2,})$/i;
        if (!re.test(String(e.target.value).toLowerCase())) {
            setEmailError('Please enter valid email');
        } else {
            setEmailError('');
        }
    };

    const passwordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        if (e.target.value.length < 8) {
            setPasswordError('Password must be at least 8 characters long');
            if (!e.target.value) {
                setPasswordError('Password cannot be empty');
            }
        } else {
            setPasswordError('');
        }
    };

    const blurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
        switch (e.target.name) {
            case 'email':
                setEmailDirty(true);
                break;
            case 'password':
                setPasswordDirty(true);
                break;
        }
    };

    const handleSubmitReg = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                if (data.token) {
                    localStorage.setItem('authToken', data.token);
                    dispatch(setLoginStatus(true));
                }
            } else {
                const data = await response.json();
                setEmailError(data.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleSubmitLog = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                if (data.token) {
                    localStorage.setItem('authToken', data.token);
                    dispatch(setLoginStatus(true));
                } else {
                    const data = await response.json();
                    setPasswordError(data.message);
                }
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };


    if (!isOpen) return null;
    return (
        <div className="modal" onClick={onClose}>
            <div className="modal__content" onClick={(e) => e.stopPropagation()}>
                <span className="modal__content__close" onClick={onClose}>&times;</span>

                {isLogin ? (
                    <>
                        <h2>Login</h2>
                        {(emailDirty && emailError) && <div style={{ color: 'red', fontSize: 14 }}>{emailError}</div>}
                        <form onSubmit={handleSubmitLog}>
                            <input
                                onChange={emailHandler}
                                value={email}
                                onBlur={blurHandler}
                                name="email"
                                type="text"
                                placeholder="Email address"
                            />
                            {(passwordError && passwordDirty) && <div style={{ color: 'red', fontSize: 14 }}>{passwordError}</div>}
                            <input
                                onChange={passwordHandler}
                                value={password}
                                onBlur={blurHandler}
                                name="password"
                                type="password"
                                placeholder="Password"
                            />
                            <button disabled={!formValid} type="submit">Sign In</button>
                        </form>
                        <p className="modal__content__button">
                            Don't have an account?&nbsp;<a href="#" onClick={switchLogin}>Register here</a>
                        </p>
                    </>
                ) : (
                    <>
                        <h2>Sign up</h2>
                        {(emailDirty && emailError) && <div style={{color: 'red', fontSize: 14}}>{emailError}</div>}
                        <form onSubmit={handleSubmitReg}>
                            <input
                                onChange={emailHandler}
                                value={email}
                                onBlur={blurHandler}
                                name="email"
                                type="text"
                                placeholder="Email address"
                            />
                            {(passwordError && passwordDirty) &&
                                <div style={{color: 'red', fontSize: 14}}>{passwordError}</div>}
                            <input
                                onChange={passwordHandler}
                                value={password}
                                onBlur={blurHandler}
                                name="password"
                                type="password"
                                placeholder="Password"
                            />
                            <button disabled={!formValid} type="submit">Register</button>
                        </form>
                        <p className="modal__content__button">
                            Already have an account?&nbsp;<a href="#" onClick={switchLogin}>Login</a>
                        </p>
                    </>
                )}
            </div>
        </div>
    );
};

export default Modal;
