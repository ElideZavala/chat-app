import {useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { usePostLoginMutation, usePostSignUpMutation } from '@/state/api';

const Login = ({setUser, setSecret }) => {
    const [ isRegister, serIsRegister ] = useState(false);
    const [ username, setUsername ]     = useState('');
    const [ password, setPassword ]     = useState('');
    const [ triggerLogin, resultLogin ] = usePostLoginMutation();
    const [ triggerSignUp ]             = usePostSignUpMutation();

    const handleLogin = () => {
        triggerLogin({ username, password });
    } 

    const handleRegister = () => { 
        triggerSignUp({ username, password });
    }

    useEffect(() => {
        if (resultLogin.data?.response) {
            setUser(username);
            setSecret(password);
        }
    
    }, [resultLogin.data]) // eslint-disable-line 

    return (
        <main className='login-page'>
            <section className='login-container'>
                <h2 className='title'>CHATGPT APP</h2>
                <p className='register-change' onClick={() => serIsRegister(!isRegister)}>
                    { isRegister ?  "Already a user?" : "Are you new user?" } 
                </p>

                <div>
                    <input
                        className='login-input'
                        type='text'
                        placeholder='Username'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        className='login-input'
                        type='password'
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div className='login-actions'>
                    {
                        isRegister ? (
                            <button 
                                className='button'
                                type='button'
                                onClick={handleRegister}
                            >
                                Register
                            </button>
                        ) : (
                            <button 
                                className='button'
                                onClick={handleLogin}
                            >
                                Login
                            </button>
                        )
                    }
                </div>
            </section>
        </main>
    )
}

export default Login;

Login.propTypes = {
    setUser: PropTypes.func,
    setSecret: PropTypes.func,
};