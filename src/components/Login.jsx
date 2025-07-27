import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addUser } from '../utils/userSlice'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../constants'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [error, setError] = useState('')
  const [isLogin, setIsLogin] = useState(true)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const loginHandler = async (e) => {
    e.preventDefault()
    const api = isLogin ? 'login' : 'signup'

    const data = isLogin
      ? { email_id: email, password }
      : {
          email_id: email.toLowerCase(),
          password,
          first_name: firstName,
          last_name: lastName,
        }

    try {
      const res = await axios.post(`${BASE_URL}/${api}`, data, { withCredentials: true })

      if (res.status === 200 && isLogin) {
        dispatch(addUser(res.data))
        navigate('/')
      } else if (!isLogin && res.status === 200) {
        dispatch(addUser(res.data.user))
        navigate('/profile')
      } else {
        throw new Error(res.data)
      }
    } catch (error) {
      console.error('Login error:', error)
      setError(error?.response?.data || 'An error occurred')
    }
  }

  return (
    <div className="card bg-base-200 w-96 shadow-xl mx-auto mt-24">
      <div className="card-body items-center text-center">
        <h2 className="card-title text-3xl mb-4 p-2 bg-amber-100"><i> Welcome Surechat 👋</i></h2>
        <h2 className="card-title text-2xl mb-4">{isLogin ? 'Login' : 'Sign Up'}</h2>

        <form onSubmit={loginHandler} className="w-full">
          {!isLogin && (
            <>
              <label className="input input-bordered flex items-center gap-2 mb-3">
                <input
                  type="text"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First Name"
                  pattern="[A-Za-z][A-Za-z0-9\-]*"
                  minLength="3"
                  maxLength="30"
                  className="w-full"
                  title="Only letters, numbers, or dash"
                />
              </label>

              <label className="input input-bordered flex items-center gap-2 mb-3">
                <input
                  type="text"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Last Name"
                  pattern="[A-Za-z][A-Za-z0-9\-]*"
                  minLength="3"
                  maxLength="30"
                  className="w-full"
                  title="Only letters, numbers, or dash"
                />
              </label>
            </>
          )}

          <label className="input input-bordered flex items-center gap-2 mb-3">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full"
            />
          </label>

          <label className="input input-bordered flex items-center gap-2 mb-3">
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              minLength="3"
              // pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}"
              className="w-full"
              title="Must be more than 8 characters, including number, lowercase and uppercase letter"
            />
          </label>

          {error && <p className="text-red-500 text-sm my-2">{error}</p>}

          <button type="submit" className="btn btn-primary w-full mt-2">
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>

        <p
          onClick={() => setIsLogin((val) => !val)}
          className="text-sm mt-4 cursor-pointer text-blue-600 hover:underline"
        >
          {isLogin ? 'New user? Sign up here' : 'Already have an account? Login here'}
        </p>
      </div>
    </div>
  )
}

export default Login
