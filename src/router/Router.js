import React, { Component } from 'react'
import { Text, View } from 'react-native'

import { createStackNavigator } from '@react-navigation/stack';
import Home from '../pageLatihan/Home';
import Buku from '../pageLatihan/Buku';
import Peminjam from '../pageLatihan/Peminjam';
import HistoriPinjaman from '../pageLatihan/HistoriPinjaman';
// import Home from '../page/Home';
// import Login from '../page/Login';
// import Register from '../page/Register';
// import MainMenu from '../page/MainMenu';
// import PilihCalon from '../page/PilihCalon';
// import DataCalon from '../page/DataCalon';
// import DetailCalon from '../page/DetailCalon';

const Stack = createStackNavigator();

export class Router extends Component {
    render() {
        return (
            <Stack.Navigator>
                <Stack.Screen name="Home" component={Home} />
                {/* <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Register" component={Register} />
                <Stack.Screen name="MainMenu" component={MainMenu} />
                <Stack.Screen name="PilihCalon" component={PilihCalon} />
                <Stack.Screen name="DataCalon" component={DataCalon} />
                <Stack.Screen name="DetailCalon" component={DetailCalon} /> */}
                <Stack.Screen name="Buku" component={Buku} />
                <Stack.Screen name="Peminjam" component={Peminjam} />
                <Stack.Screen name="HistoriPinjaman" component={HistoriPinjaman} />
            </Stack.Navigator>
        )
    }
}

export default Router
