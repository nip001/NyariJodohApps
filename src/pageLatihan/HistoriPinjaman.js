import axios from 'axios'
import React, { Component } from 'react'
import { View, Text, FlatList } from 'react-native'
import { connect } from 'react-redux'

export class HistoriPinjaman extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataPeminjam:[{}]
        }
    }

    componentDidMount(){
        this.getDataPeminjam()
    }


    getDataPeminjam(){
        axios.get('http://386f073a02f0.ngrok.io/peminjam/')
        .then((response) =>{
            let data = response.data
            console.log(data)
            this.setState({dataPeminjam:data})
        })
        .catch((error) =>{
            console.log(error)
        })
    }
    render() {
        return (
        <FlatList
            data={this.state.dataPeminjam}
            keyExtractor={item=>item.id}
            renderItem={({item})=>(
                <View style={{borderWidth:5,borderColor:"red",margin:5}}>
                        <Text>Name : {item.name}</Text>
                        <Text>nohp : {item.nohp}</Text>
                        <Text>namabuku : {JSON.stringify(item.idbuku)}</Text>
                        {/* <Text>isbn : {item.idbuku.isbn}</Text> */}
                </View>
            )}
        />
        )
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(HistoriPinjaman)
