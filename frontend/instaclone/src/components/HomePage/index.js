import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { setToken } from "../../utils/authOperations";
import "./index.css";
import image from './homepic.png';


function HomePage(){
    const login = async e=>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/login",{
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify({
                email:e.target.email.value,
                password:e.target.password.value
            })// body data type must match "Content-Type" header
            
        })
        const {data}=await response.json();
        const token= data.token;
        setToken(token);
        window.location.href='/posts';
        
        console.log('token',token)
    }



    return <div className="Homepage">
        <div className='homescreenimg'><img className='homeimg' src={image} alt='homepic'></img></div>
        < div className='formscreen'>
            <form onSubmit={e=>{login(e)}}>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" />
                <label htmlFor="password">Password</label>
                <input name="password" type="password" />
                <Button type="submit" className='loginbtn'>Login</Button>
                <Link to='/register'> Not a member? register here </Link>
            </form>
        </div>
    </div>
};
export default HomePage;