// |> Importando as dependencias
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Scan from  './pages/Scan';
import Cart from './pages/Cart';

const NavTab = createBottomTabNavigator();

function Navigator(){
    return(
        <NavigationContainer>
            <NavTab.Navigator initialRouteName={Scan}>
                <NavTab.Screen name="Scan" component={Scan} />
                <NavTab.Screen name="Carrinho" component={ Cart} />
            </NavTab.Navigator>
        </NavigationContainer>
    );
}

export default Navigator;