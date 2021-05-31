import React, { Component } from 'react'
import { Text, TouchableOpacity, View, StyleSheet, Image } from 'react-native'

export class Home extends Component {
    render() {
        return (
            <View>
                <View style={styles.titleView}>
                    <Text style={styles.titleStyle}>Nyari Jodoh</Text>
                    <Image
                        source={{uri:"https://pngimage.net/wp-content/uploads/2018/06/vector-hati-png-2.png"}}
                        style={{width:100,height:100}}
                    />

                </View>

                <TouchableOpacity style={styles.buttonStyle} onPress={()=>{this.props.navigation.navigate("Login")}}>
                    <Text style={styles.textStyle}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonStyle} onPress={()=>{this.props.navigation.navigate("Register")}}>
                    <Text style={styles.textStyle}>Register</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default Home

styles = StyleSheet.create({
    
    buttonStyle:{
        borderWidth:5,
        margin:20,
    },
    textStyle:{
        textAlign: 'center',
    },
    titleStyle:{
        textAlign: 'center',
        padding:20,
        fontSize:30
    },
    titleView:{
        alignSelf:"center",
        padding:20,
        flexDirection:"row"
    }

})