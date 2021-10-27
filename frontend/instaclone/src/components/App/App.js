import { Switch,Route,BrowserRouter as Router} from "react-router-dom";
import Homepage from "../HomePage";
import Posts from "../Posts";
import RegisterPage from "../RegisterPage";
import PrivateRoute from "./PrivateRoute";
import Addpost from "../Addpost";
import Updatepost from "../Updatepost";
import Deletepost from "../Deletepost";
//import Addpost from "../Addpost";
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Homepage} />
        <PrivateRoute exact path = '/posts' component={Posts} />
        <Route exact path='/register' component={RegisterPage} />
        <Route exact path = '/addpost' component={Addpost} />
        <Route exact path = '/update' component={Updatepost} />
        <Route exact path = '/delete' component={Deletepost} />
      </Switch>
    </Router>
  );
}

export default App;



