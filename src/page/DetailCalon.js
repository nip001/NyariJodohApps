import React, { Component } from 'react'
import { Image, Text, View,StyleSheet,Dimensions, TouchableOpacity  } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import call from 'react-native-phone-call';

export class DetailCalon extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount(){
    }

    renderMarker(){
        return (<Marker
              key={this.props.route.params.id}
              coordinate={{ latitude : parseFloat(this.props.route.params.latitude) , longitude :  parseFloat(this.props.route.params.longitude) }}
            />)
    }
    
    triggerCall(){
    
        const args = {
          number: this.props.route.params.nohp,
          prompt: true,
        };
        // Make a call
        call(args).catch(console.error);
    };

    render() {
        return (
            <View>
                <Image style={{alignSelf:"center",width:300,height:300}}
                    source={{uri:`http://386f073a02f0.ngrok.io/user/image/${this.props.route.params.image}`}}
                />
                <View style={{flexDirection:"row"}}>
                    <View style={{margin:20}}>
                        <Text> Name : {this.props.route.params.name} </Text>
                        <Text> Umur : {this.props.route.params.umur} </Text>
                        <Text> Username : {this.props.route.params.username} </Text>
                        <Text> No.HP : {this.props.route.params.nohp} </Text>
                    </View>
                    <TouchableOpacity 
                        onPress={()=>{this.triggerCall()}}
                    >
                        <Image style={{marginLeft:80,width:50,height:50}}
                            source={{uri:`https://freepngimg.com/download/money/75358-mobile-money-telephone-call-phones-bank-gmail.png`}}
                        />
                    </TouchableOpacity>
                </View>
                <MapView style={styles.map} 
              
                initialRegion={{
                    latitude: -6.240786,
                    longitude: 106.8557614,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}>
                    {this.renderMarker()}
                 </MapView>
            </View>
        )
    }
}

export default DetailCalon

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
  });