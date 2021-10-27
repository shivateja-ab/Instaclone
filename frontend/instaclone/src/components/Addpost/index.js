import {Button} from "react-bootstrap";
import {useState} from "react";
import { getToken } from "../../utils/authOperations";
import './index.css';
import {Link} from "react-router-dom"

function Addpost(){
    const [image,setImage]=useState('')
    const [url,setUrl]=useState('')
    const handleImg=(e)=>{
        setImage(e.target.files[0])
        const data=new FormData();
        data.append('file',image);
        data.append("upload_preset","instaclone");
        data.append("cloud_name","dcz0z98i4");
        fetch("https://api.cloudinary.com/v1_1/dcz0z98i4/image/upload",{
            method:"post",
            body:data
        }).then(res=>res.json())
        .then(data=>{
            setUrl(data.url)
            console.log(url)
        })
        .catch(err=>{
            console.log(err)
        })
        }
        const newpost = async e=>{
            e.preventDefault();
            const response = await fetch("http://localhost:5000/posts",{
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
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
                body: JSON.stringify({
                    name:e.target.name.value,
                    description:e.target.description.value,
                    image:url,
                    location:e.target.location.value
                })// body data type must match "Content-Type" header
                
            });
            
            console.log(await response.json())
        }
    return <div className="Addpost">
        < div className="addform">
            <form onSubmit={e=>{newpost(e)}}>
                <label htmlFor="image"></label>
                <input className='addimage' name="image" type="file" accept='image/*' onChange={e=>{handleImg(e)}} />
                <label htmlFor="name"></label>
                <input className='addname' placeholder='Author' name="name" type="text" />
                <label htmlFor="location"></label>
                <input className='addlocation' placeholder='Location' type="text" name="location" />
                <label htmlFor="description"></label>
                <input className='adddesc' placeholder='Description' name="description" type="text" />
                
                <Link to='/posts'><Button type="submit" className='postbtn'>Post</Button></Link>
            </form>
        </div>
    </div>
}
export default Addpost;