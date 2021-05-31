import { Picker } from '@react-native-picker/picker'
import React, { Component } from 'react'
import { Text, StyleSheet, View, TextInput, TouchableOpacity, Button, Image, ScrollView } from 'react-native'

import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import axios from 'axios';

export default class Register extends Component {
    constructor(props) {
        super(props)
        this.state={
            username:"",
            name:"",
            jeniskelamin:"",
            nohp:"",
            umur:"",
            image:"https://asset.kompas.com/crops/7aeyQXv6hi9593Gh1ppQgPeSMkg=/0x8:1747x1172/750x500/data/photo/2020/11/26/5fbf40c4507ae.jpg",
            latitude:13.377722,
            longitude:13.377722
        }
    }

    componentDidMount(){
        this.getPermission()
        this.getLocation()
    }
    async getPermission(){
        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
              alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
    }

    async pickImage(){
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          });
      
          console.log(result);
          
          if (!result.cancelled) {
              console.log(result.uri)
              this.setState({image:result.uri})
          }
    }
    
    async getLocation(){
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          return;
        }
    
        let location = await Location.getCurrentPositionAsync({});
        console.log("Lokasinya adalah :" + JSON.stringify(location));

        this.setState({
            latitude: location.coords.latitude,
            longitude:location.coords.longitude
        })
    };

    handlerSubmit(){
        
        let formData = new FormData();
        let filename = this.state.image;
        console.log("nama gambar "+ filename.split('/').pop())
        formData.append('data',JSON.stringify(this.state))
        formData.append('file',{
            uri: this.state.image, //Your Image File Path
            type: 'image/jpeg', 
            name: filename.split('/').pop(),
         })
        axios.post('http://386f073a02f0.ngrok.io/user/',formData,{
            headers:{
                'Content-Type': 'multipart/form-data'
            }
        })
        .then((response)=>{
            alert(response.data)
            this.props.navigation.navigate("Home")
        })
        .catch((error)=>{
            console.log(error)
        })
    }

    render() {
        return (
            <ScrollView>
                <Text style={{padding:10}}> Username: </Text>
                <TextInput placeholder="Username Anda" style={{borderWidth:5,margin:5,padding:10}} onChangeText={(value)=>{this.setState({username:value})}}/>
                <Text style={{padding:10}}> Name: </Text>
                <TextInput placeholder="Name Anda" style={{borderWidth:5,margin:5,padding:10}} onChangeText={(value)=>{this.setState({name:value})}}/>
                <Text> Jenis Kelamin </Text>
                <Picker
                    selectedValue={this.state.jeniskelamin}
                    style={{ height: 50, width: 300 }}
                    onValueChange={(itemValue) => this.setState({ jeniskelamin: itemValue })}>
                    <Picker.Item label="Masukan Pilihan"/>
                    <Picker.Item label="Male" value="male" />
                    <Picker.Item label="Female" value="female" />
                </Picker>
                <Text style={{padding:10}}> No. Hp: </Text>
                <TextInput placeholder="No. Hp Anda" style={{borderWidth:5,margin:5,padding:10}} onChangeText={(value)=>{this.setState({nohp:value})}}/>
                <Text style={{padding:10}}> Umur: </Text>
                <TextInput placeholder="Umur Anda" style={{borderWidth:5,margin:5,padding:10}} onChangeText={(value)=>{this.setState({umur:value})}}/>
                <Button title="Pick an image from camera roll" onPress={()=>{this.pickImage()}} />
                <Image source={{ uri: this.state.image }} style={{ width: 200, height: 200,alignSelf:'center' }} />
                
                    <TouchableOpacity style={styles.buttonStyle} onPress={()=>{this.handlerSubmit()}}>
                        <Text style={styles.textStyle}>Submit</Text>
                    </TouchableOpacity>
            
            </ScrollView>
        )
    }
}

styles = StyleSheet.create({
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
