import React,{useState,useEffect} from "react";
import "./userRegistration.css";
import axios from 'axios'

const Registration=()=>{
    const [name,setName]=useState("")
    const [title,setTitle]=useState("")
    const [phone,setPhone]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [street,setStreet]=useState("")
    const [city,setCity]=useState("")
    const [pincode,setPincode]=useState(0)
    console.log(name,title)

    const data=(e)=>{
        e.preventDefault()
        axios.post('/register',{
            title,
            name,
            phone,
            email,
            password,
            street,
            city,
            pincode
        }).then((res)=>console.log(res))
        .catch(err=>console.log(err))

    }
    

    return <div>
        <h1>User Registration Form</h1>
        <form onSubmit={(event) => {event.preventDefault()}} 
        onReset={(event) => event.preventDefault()}>
            <div className="name">
                <label>Title : </label>
                <select value={title} onChange={(e)=>setTitle(e.target.value)}>
                    <option value="Mr">Mr</option>
                    <option value="Mrs">Mrs</option>
                    <option value="Miss">Miss</option>
                </select>
                <label>Name : </label>
                <input type="text" value={name} onChange={(e)=>setName(e.target.value)}/>
            </div>
            <div className="phone">
                <label>Phone : </label>
                <input type="tel" value={phone} onChange={(e)=>setPhone(e.target.value)}/>
            </div>
            <div className="email">
                <label>Email : </label>
                <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
            </div>
            <div className="password">
                <label>Password : </label>
                <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
            </div>
            <div className="address">
                <label>Address : Street</label>
                <input type="text" value={street} onChange={(e)=>setStreet(e.target.value)}/><br/>
               City: <input type="text" value={city} onChange={(e)=>setCity(e.target.value)}/><br/>
               Pincode: <input type="number" value={pincode} onChange={(e)=>setPincode(e.target.value)}/>
            </div>
            <div className="btn">
                <button type="submit" onClick={data}>Submit</button>
                <button type="reset">Reset</button>
            </div>
        </form>
    </div>
}

export default Registration