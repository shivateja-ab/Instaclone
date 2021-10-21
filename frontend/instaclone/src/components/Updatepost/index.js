import {Button} from "react-bootstrap";
import { getToken } from "../../utils/authOperations";
import {useLocation,useParams} from "react-router";
function Updatepost(){
    const location = useLocation();
    const id=location.state.userid._id

    const url=`http://localhost:5000/posts/${id}`

        const post = async e=>{
            e.preventDefault();
            const response = await fetch(url,{
                method: 'PUT', // *GET, POST, PUT, DELETE, etc.
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
                    title:e.target.title.value,
                    body:e.target.body.value,
                    image:e.target.image.value,
                })// body data type must match "Content-Type" header
                
            });
            console.log(await response.json())
        }
    return <div className="Updatepost">
        < div className="form">
            <form onSubmit={e=>{post(e)}}>
                <label htmlFor="title">Title</label>
                <input type="text" name="title" />
                <label htmlFor="body">Body</label>
                <input name="body" type="text" />
                <label htmlFor="image">Image</label>
                <input name="image" type="text" />
                <Button type="submit" className='btn'>Submit</Button>
            </form>
        </div>
    </div>
}
export default Updatepost;