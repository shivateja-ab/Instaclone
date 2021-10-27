import {Button} from "react-bootstrap";
import {Link} from "react-router-dom";
import './index.css';
import image from './homepic.png';

function Registerpage(){
    const register = async e=>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/register",{
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',

            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify({
                name:e.target.name.value,
                email:e.target.email.value,
                password:e.target.password.value,
            })// body data type must match "Content-Type" header
            
        });
        alert('sign-up success')
        window.location.href='/';
        console.log(await response.json())
    }

    return <div className="Registerpage">
        <div className='regscreenimg'><img className='regimg' src={image} alt='regimg'></img></div>
        < div className='regscreen'>
            <form onSubmit={e=>{register(e)}}>
                <label htmlFor="name">Name</label>
                <input type="name" name="name" />
                <label htmlFor="email">Email</label>
                <input type="email" name="email" />
                <label htmlFor="password">Password</label>
                <input name="password" type="password" />
                <Button type="submit" className='signupbtn'>SignUp</Button>
            </form>
        </div>
    </div>

}
export default Registerpage;