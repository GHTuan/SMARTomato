// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, {useState, createRef} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import AsyncStorage from '@react-native-community/async-storage';

import Loader from './Components/Loader';

const LoginScreen = ({navigation}) => {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');

  const passwordInputRef = createRef();

  const handleSubmitPress = () => {
    setErrortext('');
    if (!userEmail) {
      alert('Please fill Email');
      return;
    }
    if (!userPassword) {
      alert('Please fill Password');
      return;
    }
    setLoading(true);
    fetch('http://localhost:4000/signin', {
      method: 'POST',
      headers: {
        //Header Defination
        "Content-Type":"application/json",
      },
      body: JSON.stringify({
        email: userEmail,
        password: userPassword,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        //Hide Loader
        setLoading(false);
        // If server response message same as Data Matched
        if (responseJson.token) {
          let multi_set_pairs = [
            ['token', JSON.stringify(responseJson.token)],
            ['userinfo', JSON.stringify(responseJson.user)],
          ];
          let multi_merge_pairs = [
            ['token', JSON.stringify(responseJson.token)],
            ['userinfo', JSON.stringify(responseJson.user)],
          ];
          
          AsyncStorage.multiSet(multi_set_pairs, err => {
            AsyncStorage.multiMerge(multi_merge_pairs);
          });
          // example of getting an item in storage
          AsyncStorage.getItem('token', (err, stores) => {
            console.log(stores)
          });
          
          navigation.replace('TabNavigationRoutes');
        } else {
          setErrortext(responseJson.error);
          console.log('Please check your email id or password');
        }
      })
      .catch((error) => {
        //Hide Loader
        setLoading(false);
        console.error(error);
      });
  };

  return (
    <View style={styles.mainBody}>
      <LinearGradient colors={['#43FE01', '#00B2FE']}
      start={{ x: 0, y: 0 }} 
      end={{ x: 1, y: 1 }}
      style={{height: '100%'}}>
        <Loader loading={loading} />
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            flex: 1,
            justifyContent: 'center',
            alignContent: 'center',
          }}>
          <View>
            <KeyboardAvoidingView enabled>
              <View>
                <View style={[styles.headerContainer, {alignItems: 'center'}]}>
                  <Text style={[styles.headerText, {color: '#FFFFFF'}]}>SMAR</Text>
                  <Text style={[styles.headerText,{color: '#DF2A2A'}]}>Tomato</Text>
                </View>
                <View style={{alignItems: 'center', marginBottom: 20}}>
                  <Image
                    source={require('../Image/aboutreact.png')}
                    style={{
                      width: '50%',
                      height: 100,
                      resizeMode: 'contain',
                      margin: 5,
                    }}
                  />
                </View>
                <View>
                  <Text style={styles.welText}>Happy To See You</Text>
                  <Text style={styles.welText}>Back!</Text>
                </View>
              </View>
              <View style={styles.SectionStyle}>
                <TextInput
                  style={styles.inputStyle}
                  onChangeText={(UserEmail) =>
                    setUserEmail(UserEmail)
                  }
                  placeholder="Enter your Email or Username" //dummy@abc.com
                  placeholderTextColor="#8b9cb5"
                  autoCapitalize="none"
                  keyboardType="email-address"
                  returnKeyType="next"
                  onSubmitEditing={() =>
                    passwordInputRef.current &&
                    passwordInputRef.current.focus()
                  }
                  underlineColorAndroid="#f000"
                  blurOnSubmit={false}
                />
              </View>
              <View style={styles.SectionStyle}>
                <TextInput
                  style={styles.inputStyle}
                  onChangeText={(UserPassword) =>
                    setUserPassword(UserPassword)
                  }
                  placeholder="Enter your Password" //12345
                  placeholderTextColor="#8b9cb5"
                  keyboardType="default"
                  ref={passwordInputRef}
                  onSubmitEditing={Keyboard.dismiss}
                  blurOnSubmit={false}
                  secureTextEntry={true}
                  underlineColorAndroid="#f000"
                  returnKeyType="next"
                />
              </View>
              {errortext != '' ? (
                <Text style={styles.errorTextStyle}>
                  {errortext}
                </Text>
              ) : null}
              <TouchableOpacity
                style={styles.buttonStyle}
                activeOpacity={0.5}
                onPress={handleSubmitPress}>
                <Text style={styles.buttonTextStyle}>LOGIN</Text>
              </TouchableOpacity>
              <View style={{flexDirection: 'row', alignItems: 'center', 
              justifyContent: 'center', marginTop: 20}}>
                <Text>New Here? </Text>
                <Text
                  style={styles.registerTextStyle}
                  onPress={() => navigation.navigate('RegisterScreen')}>
                  Register
                </Text>
              </View>
            </KeyboardAvoidingView>
          </View>
        </ScrollView>
      </LinearGradient>
    </View>
  );
};
export default LoginScreen;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#307ecc',
    alignContent: 'center',
  },
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontFamily: 'Montserrat',
    fontSize: 30,
    fontWeight: '700',
    lineHeight: 67.05,
    marginTop:20,
  },
  welText:{
    color:'white',
    marginLeft: 40,
    fontSize: 20,
  },
  buttonStyle: {
    backgroundColor: '#242760',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#242760',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 25,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
  inputStyle: {
    flex: 1,
    color: 'black',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#dadae8',
    backgroundColor: 'white',
  },
  registerTextStyle: {
    color: '#373DB7',
    fontWeight: 'bold',
    fontSize: 14,
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
});