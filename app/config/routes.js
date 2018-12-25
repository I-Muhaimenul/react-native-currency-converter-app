import { createStackNavigator } from 'react-navigation';
import { StatusBar } from 'react-native';

import Home from '../screens/Home';
import CurrencyList from '../screens/CurrencyList';
import Options from '../screens/Options';
import Themes from '../screens/Themes';

// need to wrap the root componenet to navigate through routes

const Homstack = createStackNavigator({
    Home: {
        screen: Home,
        navigationOptions: {
            header: () => null,
        }
    },
    Options: {
        screen: Options,
        navigationOptions: ({ navigation }) => ({
            headerTitle: 'Options'
        }) 
    },
    Themes: {
        screen: Themes,
        navigationOptions: ({ navigation }) => ({
            headerTitle: 'Themes'
        }) 
    }
},{
    headerMode: 'screen'
});

const CurrencyListStack = createStackNavigator({
    CurrencyList: {
        screen: CurrencyList,
        navigationOptions: ({ navigation }) => ({
            headerTitle: navigation.state.params.title
        }) 
    }
});

export default createStackNavigator({
    Home: {
        screen: Homstack
    },
    CurrencyList: {
        screen: CurrencyListStack
    }
},
{
  mode: 'modal',
  cardStyle: { paddingTop: StatusBar.currentHeight },
  headerMode: 'none'
}
);