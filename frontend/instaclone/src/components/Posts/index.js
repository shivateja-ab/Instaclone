import { useEffect, useState } from "react";
import { getToken } from "../../utils/authOperations";
import Post from "../Post";
import "./index.css";
import Header from "../Header";
import {Link} from 'react-router-dom';

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
            setPosts(data.posts);
            

        }catch(e){
            console.log(e)
        };

    }
    useEffect(()=>{ getData(); }, []);

    return (
        <div>
            <Link to='/addpost'> add post </Link>
            <div className="posts" >
                {Posts.map(post=>
                  <Post key={post._id} {...post} />    
                )}
            </div>

        </div>
    )
}
export default Posts;