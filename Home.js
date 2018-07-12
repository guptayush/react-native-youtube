import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  BackHandler
} from 'react-native';
import ListItem from './ListItem';
const apiKey = 'AIzaSyBz1lJanTdxrHlp59Bkcxpz706MFltp598';

class Home extends Component{
	static navigationOptions =({navigation})=> ({
	    headerStyle: {
	      backgroundColor: '#fff'
	    },
	    headerLeft: (
	      <TouchableHighlight>
	        <Image 
	          style={{height: 20, width: 90,marginLeft: 15}} 
	          source={require('./images/logo.png')} />
	      </TouchableHighlight>
	    ),
	    headerRight: (    
	        <TouchableOpacity style={{paddingHorizontal: 15}} onPress={()=>navigation.navigate('Profile')}>
	          <Image source={require('./images/profile.jpg')} style={{height:30,width:30,borderRadius:15}} />
	        </TouchableOpacity>
	    )
	})

	constructor(props){
		super(props);
		this.state={
			data:[],
			isLoadingMore:false,
			pageToken:'',
			refresh:false
		}
		this.fetchData = this.fetchData.bind(this);
		this.fetchMore = this.fetchMore.bind(this);
		this.fetch= this.fetch.bind(this);
		this.handleBackPress=this.handleBackPress.bind(this);
	}

	fetchMore(){
		console.log('more',this.state.isLoadingMore)
		this.fetchData(res => {
	    	console.log(res)
	     	
	      	this.setState({
		        data: this.state.data.concat(res.items),
		        pageToken:res.nextPageToken,
	      	},()=>this.setState({isLoadingMore:false})) 
	    })
	}

	fetchData(callback){
		let pageToken= this.state.pageToken !=='' ? `&pageToken=${this.state.pageToken}` : ''; 
		fetch(`https://www.googleapis.com/youtube/v3/search/?part=snippet&q=comedy&maxResults=10&key=${apiKey}${pageToken}`)
	    .then(response => response.json())
	    .then(callback)
	    .catch(error => {
	      console.error(error)
	    })
	}

	fetch(){
		this.setState({refresh:true})
		this.fetchData(res => {
	    	console.log(res)
	     	var items = res.items;
	     	this.setState({
		        data: items,
		        pageToken:res.nextPageToken,
		        refresh:false
	      	}) 
	    })
	}

	componentWillMount(){
	    this.fetch();
	    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
	}
	componentWillUnmount() {
    	BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  	}
  	handleBackPress(){
	  	BackHandler.exitApp();
  	}

	render(){
		return(
			<FlatList
	        	data={this.state.data} 
	        	renderItem={({item}) =>(
	            	<ListItem item={item} />
	          	)}
	          	onEndReached={() =>{
	          		if(!this.state.isLoadingMore)
	          		this.setState({ isLoadingMore: true }, () => this.fetchMore())}
	          	}
	          	onEndReachedThreshold={0.01}
	          	refreshControl={ <RefreshControl refreshing={this.state.refresh} onRefresh={this.fetch} /> }
	          	keyExtractor={(item, index) => index}
	          	ListFooterComponent={() => {
	            	return (
	              	this.state.isLoadingMore &&
	              	<View style={{ flex: 1, padding: 12, backgroundColor: '#fff' }}>
	                	<ActivityIndicator size="small" />
	              	</View>
	            	);
	          	}}
        	/>
		)
	}
}





export default Home;