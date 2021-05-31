import axios from 'axios'
import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity,StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { LoginAction } from '../redux/Action'

export class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username:"",
            nohp:"",
        }
    }

    loginHandler(){
        axios.get('http://386f073a02f0.ngrok.io/user/login',{
            params:{
                username:this.state.username,
                nohp:this.state.nohp,
            }
        })
        .then((response)=>{
            let data=response.data;
            if(data !== ""){
                this.props.LoginAction(true,"isLogin")
                this.props.LoginAction(data,"dataUser")
                alert("Login berhasil")
                this.props.navigation.navigate('MainMenu')
            }else{
                alert("login gagal")
                this.props.LoginAction(false,"isLogin")
            }
        })
    }
    
    render() {
        return (
            <View>
                <Text style={{padding:10}}> Username :  </Text>
                <TextInput placeholder="masukan username" style={{borderWidth:5,margin:5,padding:10}} onChangeText={(value)=>{this.setState({username:value})}}/>
                <Text style={{padding:10}}> No.Hp :  </Text>
                <TextInput placeholder="masukan nomor handphone" style={{borderWidth:5,margin:5,padding:10}} onChangeText={(value)=>{this.setState({nohp:value})}}/>
                <TouchableOpacity style={styles.buttonStyle} onPress={()=>{this.loginHandler()}}><Text style={styles.textStyle}>Login</Text></TouchableOpacity>
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    LoginAction,
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)

const styles = StyleSheet.create({
    viewButton:{  
        flexWrap:"wrap-reverse",
    },
    buttonStyle:{
        borderWidth:5,
        margin:20,
    },
    textStyle:{
        textAlign: 'center',
        margin:10
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