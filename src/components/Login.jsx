import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addUser } from '../utils/userSlice'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../constants'

const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [error, setError] = useState("")
  const [isLogin, setIsLogin] = useState(true)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const loginHandler = async () => {
    const api = isLogin ? 'login' : "signup"
    const loginData = {
      "emailId": email,
      "password": password
    }

    const signUpData = {
      "emailId": email.toLowerCase(),
      "password": password,
      "firstName": firstName,
      "lastName": lastName
    }
    const data = isLogin ? loginData : signUpData
    try {
      const res = await axios.post(`${BASE_URL}/${api}`, data,
        {
          withCredentials: true
        })
      if (res.status == 200 && isLogin) {
        navigate('/')
        dispatch(addUser(res.data))
      } else if (!(res.status == 200 && isLogin)) {
        navigate('/profile')
        dispatch(addUser(res.data.user))
      } else {
        throw new Error(res.data);

      }


    } catch (error) {
      console.log('error while login..', error)
      setError(error?.response?.data)
    }
  }


  return (
    <div className="card bg-base-200 w-96 shadow-lg flex justify-center  align-middle mx-auto mt-[10%]">

      <div className="card-body items-center text-center">
        <h2 className="card-title">{isLogin ? "Login" : "SignUp"}</h2>
<form onSubmit={loginHandler}>


        {!isLogin && <><label className="input validator my-2">
          <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></g></svg>
          <input type="input" required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="FirstName" pattern="[A-Za-z][A-Za-z0-9\-]*" minlength="3" maxlength="30" title="Only letters, numbers or dash" />
        </label>
          <label className="input validator my-2">
            <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></g></svg>
            <input type="input" required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="lastName" pattern="[A-Za-z][A-Za-z0-9\-]*" minlength="3" maxlength="30" title="Only letters, numbers or dash" />
          </label>

         
          </>}

        <label className="input validator my-2">
          <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></g></svg>
          <input type="input" required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Username" pattern="[A-Za-z][A-Za-z0-9\-]*" minlength="3" maxlength="30" title="Only letters, numbers or dash" />
        </label>
        


        <label class="input validator my-2">
          <svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g stroke-linejoin="round" stroke-linecap="round" stroke-width="2.5" fill="none" stroke="currentColor"><path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path><circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle></g></svg>
          <input type="password" required value={password}
            onChange={(e) => setPassword(e.target.value)}

            placeholder="Password" minlength="8" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}" title="Must be more than 8 characters, including number, lowercase letter, uppercase letter" />
        </label>
        
        {error && <p>{error}</p>}
        <button type = 'submit' className="btn btn-outline btn-primary w-full" onClick={loginHandler}>{isLogin ? "Login" : "SignUp"}</button>
</form>
        
        <p onClick={() => setIsLogin(val => !val)} >
          {isLogin ? 'new user? signup here' : 'Are you member? Login here'}
          </p>
      </div>
    </div>
  )
}

export default Login