
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  TextInput,
  TouchableHighlight,
  AsyncStorage
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
const profileData={
	name:"Ayush Gupta",
	gender:"Male",
	age:"22"
}
export default class Profile extends Component{

	static navigationOptions= {
		title:"Profile",

	}
  
	render(){
		return(
			<View style={{flex :1, marginHorizontal:20}}>
				<Image source={require('./images/profile.jpg')} style={styles.pic} />
				<Text style={styles.summary} > Name : {profileData.name} </Text>
				<Text style={styles.summary} > Gender : {profileData.gender} </Text>
				<Text style={styles.summary} > Age : {profileData.age} </Text>
				<TouchableHighlight underlayColor='transparent' 
					onPress={()=>{AsyncStorage.setItem('isLoggedIn', 'false');this.props.navigation.navigate('Login')}} >
					<View style={{flexDirection:'row',marginTop:40}} >
						<Icon name="sign-out" size={30} color="#555"/>
						<Text style={{color:"#555",fontSize:20}} > Sign Out </Text>
					</View>
				</TouchableHighlight>
				
			</View>
		)
	}
}

const styles = StyleSheet.create({
	pic:{
		height:120,
		width:120,
		borderRadius:60,
		marginTop:20
	},
	summary:{
		color:"#555",
		fontSize:20,
		marginTop:10
	},
})