import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import SignIn from './signIn';
import Main from './main';
import AddNew from './addNew'

const Routes = createAppContainer(createStackNavigator({
  SignIn: { 
    screen: SignIn,
  },
  Main: {
    screen: Main,
  },
  AddNew: {
    screen: AddNew,
  }
}));


export default Routes;