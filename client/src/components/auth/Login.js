import React, {useState, useContext} from 'react'
import { UserContext } from '../../UserContext'
import {Navigate} from 'react-router-dom'


const Login = () => {
    const { user, setUser } = useContext(UserContext)

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [nameError, setNameError] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')

    const submitHandler = async e =>{
        e.preventDefault();
        setNameError('')
        setEmailError('')
        setPasswordError('')

        console.log(name, email, password)
        try {
            const res = await fetch('http://localhost:5000/login',{
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify({name, email, password}),
                headers: {'Content-Type':'application/json'}
            })
            const data = await res.json();
            console.log(data)
            if(data.errors){
                if ('email' in data.errors) setEmailError(data.errors.email);
                if ('password' in data.errors) setPasswordError(data.errors.password);
            }
            if(data.user) {
                setUser(data.user)
            }
        } catch (error) {
            console.log(error)
        }
    }

    if(user) {
        return <Navigate to="/" />
    }
    return (
        <div className="row">
            <h2>Login</h2>
            <form className="col s12" onSubmit={submitHandler}>
                <div className="row">
                    <div className="input-field col s12">
                        <input id="email" type="email" className="validate"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        />
                        <label htmlFor="email">Email</label>
                        <div className='email error red-text'>{emailError}</div>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                        <input id="password" type="password" className="validate"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        />
                        <label htmlFor="password">Password</label>
                        <div className='password error red-text'>{passwordError}</div>
                    </div>
                </div>
                <button className='btn'> Login </button>
            </form>
        </div>
    )
}

export default Login