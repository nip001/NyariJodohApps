import React, { Component } from 'react'
import { Text, View ,StyleSheet, TouchableOpacity} from 'react-native'
import { connect } from 'react-redux'
import { LoginAction } from '../redux/Action'


export class MainMenu extends Component {
    render() {
        return (
            <View>
                <TouchableOpacity style={styles.buttonStyle} onPress={()=>{this.props.navigation.navigate("DataCalon")}}><Text style={{alignSelf:"center"}}>Data Calon</Text></TouchableOpacity>
                <TouchableOpacity style={styles.buttonStyle} onPress={()=>{this.props.navigation.navigate("PilihCalon")}}><Text style={{alignSelf:"center"}}>Pilih Calon</Text></TouchableOpacity>
                <TouchableOpacity style={styles.buttonStyle} onPress={()=>{this.props.LoginAction(false,"isLogin"); this.props.navigation.navigate("Home")}}><Text style={{alignSelf:"center"}}>Keluar</Text></TouchableOpacity>
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    LoginAction,
}

export default connect(mapStateToProps, mapDispatchToProps)(MainMenu)

const styles = StyleSheet.create({
    buttonStyle:{
        borderWidth:5,
        margin:20,
    },

})
