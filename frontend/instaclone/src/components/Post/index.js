import "./index.css";
import { Heart } from "react-bootstrap-icons";
import {Link} from "react-router-dom";
import {useState} from "react";
import { getToken } from "../../utils/authOperations";
import Deletepost from "../Deletepost";

function Post({id,name,description,image,date,location,_id,likedusers,user}){
    const postid=_id;
    const userid=user;
    const likers=likedusers.length
    const [liked,setLiked]=useState(false)
    const [total,setTotal]=useState(likers)
    const [style,setStyle]=useState('blackheart')
    const Date=date.toString()
    const month={'01':'Jan','02':'Feb','03':'Mar','04':'Apr','05':'May','06':'Jun','07':'Jul','08':'Aug','09':'Sep','10':'Oct','11':'Nov','12':'Dec'}
    const updatedDate=Date.slice(8,10)+' '+month[Date.slice(5,7)]+' '+Date.slice(0,4)

    const url=`http://localhost:5000/posts/${_id}/like`
        console.log(url)
    const like = async ()=>{
        const response = await fetch(url,{
        method: 'PUT', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
                    'Content-Type': 'application/json',
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': `Bearer ${getToken()}`

                },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify({
            Id:userid
        })// body data type must match "Content-Type" header
                
    });
    
    const Data = await response.json()
    setTotal(Data.data.post.likedusers.length)
    }


    const url2=`http://localhost:5000/posts/${_id}/unlike`
        console.log(url)
    const unlike = async ()=>{
        const response = await fetch(url2,{
        method: 'PUT', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
                    'Content-Type': 'application/json',
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': `Bearer ${getToken()}`

                },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify({
            Id:userid
        })// body data type must match "Content-Type" header
          
    });
    const Data=await response.json()
    setTotal(Data.data.post.likedusers.length)
    }
    
    function likeUpdate(postid){
        console.log(postid)
        if(liked){
            setLiked(!liked)
            setStyle('redheart')
            unlike();

        }
        else{
            setLiked(!liked)
            setStyle('blackheart')
            like();
        }
        
        
            
    }
    
    return <div className='post'>
    <div className='profile'><div className='details'><b className='myname'>{name}</b><small className='place'>{location}</small></div>
        <div className="dropdown">
            <a className="btn btn-success dropdown-toggle" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                
            </a>

        <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
            <Link to={{pathname:'/update',state:{userid:{_id}}}}><li><a className="dropdown-item" >Update</a></li></Link>
            <Link to={{pathname:'/delete',state:{userid:{_id}}}}><li><a className="dropdown-item">Delete</a></li></Link>
        </ul>
        </div>
        
        
    
    
    
    
    </div>
    <div className='image'><img className='postimg' src={image} alt='postImage' width='405' height='220'></img></div>
    <div className='likes'><div className={style}><i className="fas fa-heart" onClick={(_id)=>{likeUpdate(_id)}} ></i><i className="fab fa-telegram-plane"></i><br></br><div className='like'><i>{total}</i><i>likes</i></div></div><div className='date'><i>{updatedDate}</i></div></div>
    <div className='content'>{description}</div>
    </div>
}
 export default Post;