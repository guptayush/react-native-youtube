import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableHighlight,
  AsyncStorage
} from 'react-native';

const credentials=[
{
  email:'ayush@admin.com',
  password:'admin123'
},
{
  email:'ayush@qwerty.com',
  password:'qwerty123'
}
];

export default class Login extends Component {
  constructor(props){
    super(props);
    this.state={
      email:'',
      password:'',
      validateEmail:true,
      validatePass:true,
      loading:true
    }
    this.submit = this.submit.bind(this);
    this.validate = this.validate.bind(this);
    this.validateEmail=this.validateEmail.bind(this);
    this.validatePass=this.validatePass.bind(this);
  }

  async componentWillMount(){
    const value = await AsyncStorage.getItem('isLoggedIn');
    console.log(value)
    if (value === 'true') {
      this.props.navigation.navigate('Homepage')
      setTimeout(()=>this.setState({loading:false}),3000)
    }
    else
      this.setState({loading:false})
  }

  validate(){
    return new Promise((resolve,reject)=>{
      credentials.forEach((item)=>{
        if(item.email==this.state.email && item.password==this.state.password){
          resolve();
        }
      })
      
      reject();
    })
  }

  validateEmail(){
    let res = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/.test(this.state.email);
    console.log(res)
    if(this.state.email == '')
      this.setState({ validateEmail: false });
    else if (res) {
      this.setState({ validateEmail: true });
      console.log('res')
    }
    else {
      this.setState({ validateEmail: false });
      console.log('else')
    }
  }
  validatePass(){
    if(this.state.password == ''){
      this.setState({validatePass:false})
    }
    else
      this.setState({validatePass:true})
  }

  submit(){
    let res = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/.test(this.state.email);
    this.validatePass();
    this.validateEmail();
    if(this.state.password != '' && res){
      this.validate()
      .then(()=>{
        AsyncStorage.setItem('isLoggedIn', 'true' );
        this.props.navigation.navigate('Homepage')
      })
      .catch(()=>alert("Wrong Email or Password"))
    }
  }
  render() {

    return (
      <View style={{flex:1,margin:70}}>
        {!this.state.loading &&<View style={{flex:1}}>
        <View style={styles.logo}>
          <Image 
            style={{height: 50, width: 200}} 
            source={require('./images/logo.png')}
            resizeMode={'contain'} />
        </View>
        <View style={styles.container}>
          <TextInput 
                placeholder="Enter Email"
                value={this.state.email}
                onBlur={this.validateEmail}
                onChangeText={(email) => this.setState({ email,validateEmail:true })}
          />
          {!this.state.validateEmail && <Text style={{ color: '#F00',marginLeft:5}}>Enter valid email</Text>}
          <TextInput
                placeholder="Enter password"
                value={this.state.password}
                secureTextEntry={true}
                onChangeText={(password) => this.setState({ password,validatePass:true })}
          />
          {!this.state.validatePass && <Text style={{ color: '#F00',marginLeft:5 }}>Enter password</Text>}

          <TouchableHighlight underlayColor='#f44271' style={styles.button}
            onPress={this.submit}>
              <Text style={{fontSize:16,color:'black',textAlign:'center'}}>Submit</Text>
          </TouchableHighlight>
          
        </View>
        </View>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent:'flex-start',
    marginTop:30
  },
  logo:{
    flex:0.5,
    justifyContent:'flex-end',
    alignItems:'center'
  },
  button:{
    marginTop:15,
    padding:10,
    backgroundColor:'#FF0000',
    borderRadius:5
  }
});
