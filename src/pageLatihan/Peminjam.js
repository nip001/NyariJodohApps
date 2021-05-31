import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import axios from 'axios'
import { Picker } from '@react-native-picker/picker'

export class Peminjam extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name:"",
            nohp:"",
            databuku:[{
                id: 1,
                isbn: "12223",
                namabuku: "Mantap",
            }],
            idbuku:{
                id: 1,
                isbn: "12223",
                namabuku: "Mantap",
            },
        }
    }

    componentDidMount(){
        this.getDataBuku()
    }

    getDataBuku(){
        axios.get('http://386f073a02f0.ngrok.io/buku/')
        .then((response) =>{
            let data = response.data
            console.log(data)
            this.setState({databuku:data})
        })
        .catch((error) =>{
            console.log(error)
        })
    }
    
    submitHandler() {
        axios.post('http://386f073a02f0.ngrok.io/peminjam/',this.state)
        .then((response)=>{
            let data = response.data
            alert(data)
            this.props.navigation.navigate('Home')
        })
        .catch((error)=>{
            console.log(error)
        })
    }

    pickerChange(index){
        this.state.databuku.map( (v,i)=>{
         if( index === i ){
           this.setState({
           idbuku: this.state.databuku[index]
          })
         }
        })
    }

    render() {
        return (
            <View>
                <Text> Nama Peminjam </Text>
                <TextInput placeholder="masukan nama peminjam" onChangeText={(value)=>{this.setState({name: value})}}/>
                <Text> No Hp </Text>
                <TextInput placeholder="masukan nomor handphone" onChangeText={(value)=>{this.setState({nohp: value})}}/>
                <Text> Pilih Buku </Text>
                <Picker
                    selectedValue={this.state.idbuku.namabuku}
                    mode="dropdown"
                    style={{ height: 50, width: 300 }}
                    onValueChange={(itemValue, itemIndex) => this.pickerChange(itemIndex)}>
                        
                        {
                        this.state.databuku.map( (v)=>{
                         return <Picker.Item label={v.namabuku} value={v} />
                        })
                        }

                </Picker>
                <TouchableOpacity onPress={()=>{this.submitHandler()}}><Text>Submit</Text></TouchableOpacity>
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Peminjam)
