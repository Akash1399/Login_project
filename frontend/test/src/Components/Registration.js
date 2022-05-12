
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import React from 'react';
import './Registration.css'



function Registration() {
    const navigate= useNavigate()
    const [user, setUser] = useState({
        fname: "", lname: "", email: "", password: ""
    })
    // const [message,setmessage]=useState("")


    // Email Validation
    // const emailValidation=()=>{
    //     const regEx=/[a-zA-z0-9._%+-]+@[a-z0-9]+.[a-z]{2,8}()/g
    //     if(regEx.test(user.email)){
    //         setmessage("Email is valid")
    //     }else if(!regEx.test(user.email) && user.email===""){
    //         setmessage("Email is invalid")
    //     }else{
    //         setmessage("")
    //     }
    // }

    let name, value
    const handleinputs = (e) => {
        name = e.target.name
        value = e.target.value
        setUser({ ...user, [name]: value })
    }

    const PostData = async (e) => {
        e.preventDefault()

        const { fname , lname ,email ,password } = user
        const res = await fetch('/register', {
            method: 'POST',
            headers: {
                'content-type': "application/json"
            },
            body: JSON.stringify({
                fname, lname, email, password
            })
        });
        const data=await res.json()
        if(res.status ===422 || !data){
            window.alert("All field Data is Mandatory")
        }else if(res.status===402 || !data){
            window.alert("User Already Exist")
        }
        else{
            window.alert('Registration Done Correctly.')
            navigate("/")
        }
    } 
    return (
        <>
            <section>
                <div className='mainDiv'>
                    <h2 className='Title'>Create a new account </h2>
                    <p className='paraTitle'>Use your email to create a new account</p>

                    <form method='POST'>
                        <input type="text" value={user.fname} name='fname' className='Itext' onChange={handleinputs} placeholder="First Name" required/><br/>
                        <input type="text" value={user.lname} name='lname' className='Itext' onChange={handleinputs} placeholder="Last Name" /><br/>
                        <input type="email" value={user.email} name='email' className='Itext' onChange={handleinputs} placeholder="Email" /><br/>
                        <input type="password" value={user.password} name='password' className='Itext' onChange={handleinputs} placeholder="Password" /><br/>
                        <span><input type="checkbox" className='Itext' />I Have read the <a href='/'>Terms and Conditions</a></span><br/>
                        <input type='submit' onClick={PostData}/>
                    </form>
                    <p>Have an account? <a href="/">Sign In</a></p>

                </div>
            </section>
        </>
    );
}

export default Registration;