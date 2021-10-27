import { useEffect, useState } from "react";
import { getToken } from "../../utils/authOperations";
import Post from "../Post";
import "./index.css";
import {Link} from 'react-router-dom';
import logo from './logoinsta.png';

function Posts(){
    const [Posts,setPosts]=useState([]);
    async function getData(){
        try{
            const response=await fetch("http://localhost:5000/posts",{
                method: 'GET', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                headers: {
                    'Content-Type': 'application/json',
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization':`Bearer ${getToken()}`,
                    },
                redirect: 'follow', // manual, *follow, error
                referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-ur
            });
            const {data}= await response.json();
            console.log(data.posts);
            setPosts(data.posts.reverse());
            

        }catch(e){
            console.log(e)
        };

    }
    useEffect(()=>{ getData(); }, []); //component did mount

    return (
        <div>
            <div className='header'>
                <div className='appname'><img className='logo' src={logo} alt='logo'></img><h3 className='instanature'>Instaclone</h3></div><Link to='/addpost'> <div className='camicon'><i className="fas fa-camera"></i></div> </Link>
            </div>
            <div className="posts" >
                {Posts.map(post=>
                  <Post key={post._id} {...post} />    
                )}
            </div>

        </div>
    )
}
export default Posts;