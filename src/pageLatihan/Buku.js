import axios from 'axios';
import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'

export class Buku extends Component {
    constructor(props) {
        super(props);
        this.state={
            namabuku:"",
            isbn:""
        }
    }

    
    submitHandler(){
        axios.post('http://386f073a02f0.ngrok.io/buku/',this.state)
        .then((response)=>{
            let data = response.data
            alert(data)
            this.props.navigation.navigate('Home')
        })
        .catch((error)=>{
            console.log(error)
        })
    }

    render() {
        return (
            <View>
                <Text> Nama Buku </Text>
                <TextInput placeholder="masukan nama buku" onChangeText={(value)=>{this.setState({namabuku: value})}}/>
                <Text> ISBN Buku </Text>
                <TextInput placeholder="masukan isbn" onChangeText={(value)=>{this.setState({isbn: value})}}/>
                <TouchableOpacity onPress={()=>{this.submitHandler()}}><Text>Submit</Text></TouchableOpacity>
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Buku)
