import React, { Component } from 'react';
import { View, Dimensions } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner, CardSection } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { loggedIn: null };
  }

  componentWillMount() {
    firebase.initializeApp({
      apiKey: 'AIzaSyBbhpBW7iTZ1iL2d2dEVzXsn45s4AotBOY',
      authDomain: 'auth-a5d69.firebaseapp.com',
      databaseURL: 'https://auth-a5d69.firebaseio.com',
      projectId: 'auth-a5d69',
      storageBucket: 'auth-a5d69.appspot.com',
      messagingSenderId: '517312185797'
    });

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
          <CardSection>
            <Button onPress={() => firebase.auth().signOut()}>
              Log Out
            </Button>
          </CardSection>
        );
      case false:
        return (
          <LoginForm />
        );
      default:
        return (
          <View style={styles.spinnerStyle}>
            <Spinner size="large" />
          </View>
        );
    }
  }

  render() {
    return (
      <View>
        <Header headerText="Authentication" />
        {this.renderContent()}
      </View>
    );
  }
}

const styles = {
  spinnerStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  }
};

export default App;
