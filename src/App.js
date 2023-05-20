import { useContext } from "react";
import Auth from './Component/Auth/Auth';
import Feed from './Component/Feed/Feed';
import {GlobalContext} from './State/Context/GlobalContext';

function App() {
  const {isAuthenticated, isOnboarded}  = useContext(GlobalContext);

  return isAuthenticated && isOnboarded ? <Feed /> : <Auth />  ;

};

export default App;