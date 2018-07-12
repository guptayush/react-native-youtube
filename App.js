import { StackNavigator } from 'react-navigation';
import Login from './Login';
import Home from './Home';
import Profile from './Profile';

const Stack = StackNavigator({
  Login:{
    screen:Login,
    navigationOptions:()=>({
      header:null
    })
  },
  Homepage:{
    screen:Home,
  },
  Profile:{
  	screen:Profile
  }
});

export default Stack;