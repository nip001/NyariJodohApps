import axios from 'axios';
import React, { Component } from 'react'
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'

export class DataCalon extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataCalon:{}
        }
    }
    componentDidMount() {
        // if(this.props.isLogin){
        //     this.props.navigation.navigate('Home')
        // }else{
            this.getCalon()
        // }
    }

    getCalon(){
        axios.get(`http://386f073a02f0.ngrok.io/jodoh/calon/${this.props.dataUser.id}`)
        .then((response)=>{
            let data =response.data
            this.setState({dataCalon:data})
        })
        .catch((error)=>{
            console.log(error)
        })
    }
   
    render() {
        return (
            <View>
                <FlatList
                    data={this.state.dataCalon}
                    keyExtractor={item=>item.idjodoh.id}
                    renderItem={({item})=>(
                        <TouchableOpacity style={{borderWidth:5,borderColor:"red",flexDirection:"row",margin:5}} onPress={()=>{this.props.navigation.navigate("DetailCalon",item.idjodoh)}}>
                            <Image style={{width:100,height:100}}
                                source={{uri:`http://386f073a02f0.ngrok.io/user/image/${item.idjodoh.image}`}}
                            />
                            <View style={{flexDirection:"column",alignSelf:"center"}}>
                                <Text>Name : {item.idjodoh.name}</Text>
                                <Text>Umur : {item.idjodoh.umur}</Text>
                                <Text>Username : {item.idjodoh.username}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    
    dataUser:state.LoginReducer.dataUser
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(DataCalon)
