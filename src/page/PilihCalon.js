import axios from 'axios'
import React, { Component } from 'react'
import { View, Text,Platform, StyleSheet} from 'react-native'
import { connect } from 'react-redux'
import SwipeableCard from '../component/SwipeableCard'
import * as geolib from 'geolib';

export class PilihCalon extends Component {
    constructor(props) {
        super(props)
        this.state= {
            genderTarget:"",
            dataTarget:[
                {
                    name:""
                },
                {
                    name:""
                },
            ],
            Sample_Card_Array: [{
                id: '1', card_Title: '人物', backgroundColor: '#FFC107',
              },{
                id: '2', card_Title: 'Card 2', backgroundColor: '#ED2525',
              },{
                id: '3', card_Title: 'Card 3', backgroundColor: '#E7o88E',
              },{
                id: '4', card_Title: 'Card 4', backgroundColor: '#00BCD4',
              },{
                id: '5', card_Title: 'Card 5', backgroundColor: '#FFFB14',
              }],
            No_More_Card: false,
        }
    }

    componentDidMount(){
        this.setState({
            dataTarget: this.state.dataTarget.reverse(),
        });
    
        if (this.state.dataTarget.length == 0) {
          this.setState({ No_More_Card: true });
        }
        this.getData()
    }
    
    removeCard = id => {
        this.state.dataTarget.splice(
          this.state.dataTarget.findIndex(x => x.id == id),
          1
        );
    
        this.setState({ dataTarget: this.state.dataTarget }, () => {
          if (this.state.dataTarget.length == 0) {
            this.setState({ No_More_Card: true });
          }
        });
    };


    getData(){
        axios.get(`http://386f073a02f0.ngrok.io/user/gender/${this.props.dataUser.jeniskelamin}`)
        .then((response)=>{
            let data = response.data
            let result = geolib.orderByDistance(this.props.dataUser,data)
            this.setState({dataTarget:result})
        })
        .catch((error)=>{
            console.log(error)
        })
    }


    render() {
        return (
            <View style={styles.MainContainer}>
              {this.state.dataTarget.map((item, key) => {
                return(
                
                <SwipeableCard
                  key={key}
                  item={item}
                  removeCard={this.removeCard.bind(this, item.id)}
                />)
                })}
              {this.state.No_More_Card ? (
                <Text style={{ fontSize: 22, color: '#000' }}>No Cards Found.</Text>
              ) : null}
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    dataUser:state.LoginReducer.dataUser
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(PilihCalon)

const styles = StyleSheet.create({
    MainContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: Platform.OS === 'ios' ? 20 : 0,
    },
  
    card_Style: {
      width: '75%',
      height: '45%',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      borderRadius: 7,
    },
  
    Card_Title: {
      color: '#fff',
      fontSize: 24,
    },
  
    Left_Text_Style: {
      top: 22,
      right: 32,
      position: 'absolute',
      color: '#fff',
      fontSize: 20,
      fontWeight: 'bold',
      backgroundColor: 'transparent',
    },
  
    Right_Text_Style: {
      top: 22,
      left: 32,
      position: 'absolute',
      color: '#fff',
      fontSize: 20,
      fontWeight: 'bold',
      backgroundColor: 'transparent',
    },
  });
  