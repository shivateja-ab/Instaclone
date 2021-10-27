import { getToken } from "../../utils/authOperations";
import {useLocation,useParams} from "react-router";
import './index.css'
function Deletepost(){
    const location = useLocation();
    const id=location.state.userid._id
    console.log(id)
    const url=`http://localhost:5000/posts/${id}`

        async function Delete(){
            const response = await fetch(url,{
                method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                headers: {
                    'Content-Type': 'application/json',
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization':`Bearer ${getToken()}`,

                },
                redirect: 'follow', // manual, *follow, error
                referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            });
            
            console.log(await response.json())
            window.location.href='/posts';
        }
        
    return <div>
        <div className="container">
        <button className='choose' onClick={()=>{Delete()}}>yes</button>
        <button className='choose' onClick={()=>{window.location.href='/posts'}}>no</button>
        </div>
    </div>
}
export default Deletepost;