import "./index.css";
import { Heart } from "react-bootstrap-icons";
import {Link} from "react-router-dom";


function Post({id,title,body,image,_id}){
    return <div className="post">
        <div className='btn'>
        <button><Link to={{pathname:'/update',state:{userid:{_id}}}}>update</Link></button>
        <button><Link to={{pathname:'/delete',state:{userid:{_id}}}}>delete</Link></button>
        </div>
        <img className="image" src={image} alt="pic"/>
        <h3>{title}</h3>
        <h4>{body}</h4>
        < Heart className='heart' />
    </div>
}
 export default Post;