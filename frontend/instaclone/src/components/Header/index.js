import './index.css';
import {Link} from 'react-router-dom';
import { PlusCircle } from 'react-bootstrap-icons';

function Header(){
    return <div className='Header'>
        <Link to='/' ><h2>Instaclone</h2></Link>
        {PlusCircle}Add Post
    </div>
}
export default Header;