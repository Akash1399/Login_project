import './Registration'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './loggin.css'
import React from 'react';



function Login() {
  const navigate = useNavigate()
  const [user, setUser] = useState({
    email: "", password: ""
  })

  let name, value
  const handleinput = (e) => {
    name = e.target.name
    value = e.target.value
    setUser({ ...user, [name]: value })
  }
  const PostData = async (e) => {
    e.preventDefault()

    const { email, password } = user
    const res = await fetch('/sigin', {
      method: 'POST',
      headers: {
        'content-type': "application/json"
      },
      body: JSON.stringify({
        email, password
      })
    })
    const data = await res.json()
    if (res.status === 422 || !data) {
      window.alert("Fill the All fields!")
    }else if(res.status===402 || !data){
      window.alert("Invalid credentials")
    }
     else {
      navigate("/dashboard")
    }
  }
  return (
    <>
      <section>
        <div className="MainDiv">
          <h2>Sign in</h2>
          <form>
            <input type="email" className='Iemail' name='email' onChange={handleinput} placeholder="Email Address" /><br />
            <input type="Password" className='Ipassword' name='password' onChange={handleinput} placeholder="Password" /><br />
            <input type='submit' onClick={PostData} />
          </form>
          <p>Don't have an account?<a href="/register">Sign up</a></p>
        </div>


      </section>
    </>
  );

}
export default Login;