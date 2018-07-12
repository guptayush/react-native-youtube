import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TextInput,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import LikeIcon from 'react-native-vector-icons/EvilIcons';
const SCREEN_WIDTH = Dimensions.get('window').width;

export default class ListItem extends Component{

	constructor(props){
		super(props);
		this.state={
			comment:false,
			like:false,	
		}
		this.comment = this.comment.bind(this);
		this.like = this.like.bind(this);
	}

	comment(){
		this.setState((prevState)=>{ 
				return {
					comment: !this.state.comment
				} 
		})
	}

	like(){
		this.setState((prevState)=>{ 
				return {
					like: !this.state.like
				} 
		})
	}

	render(){
		const {item} = this.props;
		return (
	        <View style={styles.body}  >
				<Image source={{uri: item.snippet.thumbnails.medium.url}} 
						style={{width:SCREEN_WIDTH*0.92,height:SCREEN_WIDTH*0.52}} resizeMode={'contain'} />
				<View style={styles.button}>
					{!this.state.like ? <LikeIcon name='like' size={40} color='#555' onPress={this.like}/>
						:
					<LikeIcon name='like' size={40} color='blue' onPress={this.like} />
					}
					<LikeIcon name='comment' size={40} color='#555' onPress={this.comment}/> 
					<Text style={{color:'#000',paddingLeft:10}} >{item.snippet.title}</Text>
				</View>
				{this.state.comment && 
				<TextInput style={styles.commentBox}
			        placeholder="Enter Comment"
			        value={this.state.c}
			        onChangeText={(c) => this.setState({ c })}
			    />}
			</View>
	    );
	}
}

const styles = StyleSheet.create({
body: {
    backgroundColor: '#fff',
    borderWidth:0.4,
    alignItems:'center',
    justifyContent:'center',
    padding: 30,
    borderColor: '#bab8b8',
},
button:{
	flex:1,
	flexDirection:'row',
	alignItems:'center',
    justifyContent:'space-between',
    padding:20,
    paddingBottom:0
},
commentBox:{
	flex:1,
	width:390
}
})