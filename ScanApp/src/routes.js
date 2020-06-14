// |> Importando as dependencias
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Scan from  './pages/Scan';
import Cart from './pages/Cart';
import Products from './pages/Products'
import { View, StyleSheet, Image } from 'react-native';

import Car from './assets/scan.png';
import List from './assets/list.png';
import Scanner from './assets/cart.png';

import CartProvider from './pages/Products'

const NavTab = createBottomTabNavigator();

export default function Navigator(){
    return(

            <NavigationContainer>
                <NavTab.Navigator  tabBarOptions={{tabStyle:BarIcons}} initialRouteName={Scan}>
                    <NavTab.Screen name="Scan" options={{tabBarIcon:BarIcons}}  component={Scan} />
                    <NavTab.Screen name="Produtos" component={Products} />
                    <NavTab.Screen name="Carrinho" component={ Cart} />
                </NavTab.Navigator>
            </NavigationContainer>
    );
}


function BarIcons(){
    return(
    <>
        <View style={styles.tab}> 
            <Image style={{ left: 248, top: 22}} source={Scanner} />
            <Image style={{right: 1}} source={Car} />
            <Image style={{ width: 20, left: 125, bottom: 20}} source={List} />
        </View>
    </>
    );
}

const styles = StyleSheet.create({
    
})


