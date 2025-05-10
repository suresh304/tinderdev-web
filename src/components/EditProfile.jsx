import React, { useState } from 'react'
import FeedCard from './FeedCard'
import axios from 'axios'
import { BASE_URL } from '../constants'
import { useDispatch } from 'react-redux'
import { addUser } from '../utils/userSlice'
import Toast from './Toast'

const EditProfile = (user) => {
  console.log("edit profile user>>>>>>>>>>>>>>>>>>>>>>", user)
  // const {firstName,lastName,age,photoUrl} = user
  const [firstName, setFirstName] = useState(user.firstName)
  const [lastName, setLastName] = useState(user.lastName)
  const [age, setAge] = useState(user.age)
  const [gender, setGender] = useState()
  const [error, setError] = useState()
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl || '')
  const [about,setAbout] = useState(user.about)
  const dispatch = useDispatch()
  const [showtoast, setShowtoast] = useState(false)


  const updateProfileHandler = async () => {
    try {
      const res = await axios.patch(`${BASE_URL}/profile/edit`, { firstName, lastName, age, photoUrl ,about}, { withCredentials: true })
      dispatch(addUser(res.data))
      setShowtoast(true)
      setTimeout(() => { setShowtoast(false) }, 3000)
      // clearInterval(i)

    } catch (error) {
      setError(error)
      console.log("error in updating profile", error)
    }
  }

  return (


    <div className='flex justify-center items-center mt-[7%] flex-wrap-reverse'>
      <div className="card bg-base-200 w-96 h-[60vh] shadow-sm  my-auto ">
        <div className="card-body items-center text-center">
          <h2 className="card-title">Edit Profile</h2>
          <label className="input validator my-2">
            <p className=''>FirstName</p>
            <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></g></svg>
            <input type="input" required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="firstName" pattern="[A-Za-z][A-Za-z0-9\-]*" minlength="3" maxlength="30" title="Only letters, numbers or dash" />
          </label>



          <label class="input validator my-2">
            <p className=''>Lastname</p>

            <svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g stroke-linejoin="round" stroke-linecap="round" stroke-width="2.5" fill="none" stroke="currentColor"><path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path><circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle></g></svg>
            <input type="input" required value={lastName}
              onChange={(e) => setLastName(e.target.value)}

              placeholder="LastName" minlength="8" title="Must be more than 8 characters, including number, lowercase letter, uppercase letter" />
          </label>
          <label class="input validator my-2">
            <p className=''>age</p>

            <svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g stroke-linejoin="round" stroke-linecap="round" stroke-width="2.5" fill="none" stroke="currentColor"><path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path><circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle></g></svg>
            <input type="input" required value={age}
              onChange={(e) => setAge(e.target.value)}

              placeholder="age" minlength="8" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}" title="Must be more than 8 characters, including number, lowercase letter, uppercase letter" />
          </label>
          <label class="input validator my-2">
            <p className=''>PhotoUrl</p>

            <svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g stroke-linejoin="round" stroke-linecap="round" stroke-width="2.5" fill="none" stroke="currentColor"><path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path><circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle></g></svg>
            <input type="input" required value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}

              placeholder="photoUrl" minlength="8" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}" title="Must be more than 8 characters, including number, lowercase letter, uppercase letter" />
          </label>
          <label class="input validator my-2">
          <svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g stroke-linejoin="round" stroke-linecap="round" stroke-width="2.5" fill="none" stroke="currentColor"><path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path><circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle></g></svg>
          <input type="input" required value={about}
            onChange={(e) => setAbout(e.target.value)}

            placeholder="About" minlength="8" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}" title="Must be more than 8 characters, including number, lowercase letter, uppercase letter" />
        </label>

          {error && <p>{error}</p>}
          <button className="btn btn-outline btn-primary w-full" onClick={updateProfileHandler}>Update</button>

        </div>
      </div>

      <FeedCard {...{ age, firstName, lastName, gender, photoUrl,about }} />
      {showtoast && <Toast message={"Profile Updated successfully"} />}
    </div>
  )
}

export default EditProfile