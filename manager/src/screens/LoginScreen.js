import React, { Component } from 'react';
import {
  View,
  Text,
  Button,
  TouchableHighlight,
  ActivityIndicator,
} from 'react-native';
import { web } from 'react-native-communications';
import LoginForm from '../components/LoginForm';

class LoginScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Log In',
      headerRight: (
        <Button
          onPress={navigation.getParam('increaseCount')}
          title="+1"
          color="#000"
        />
      ),
      headerLeft: (
        <Button
          onPress={() => navigation.navigate('Fade1')}
          title="Fade"
          color="#000"
        />
      ),
      headerBackTitle: null,
      // headerBackTitle: 'Back' // Name back button for next screen
    };
  };

  constructor(props) {
    super(props);

    this.state = { count: 0, loading: false, success: false };
    this.increaseCount = this.increaseCount.bind(this);
    this.onPress = this.onPress.bind(this);
  }

  componentWillMount() {
    this.props.navigation.setParams({
      increaseCount: this.increaseCount
    });
  }

  onPress() {
    this.setState({ loading: !this.state.loading }, () => {
      setTimeout(() => {
        this.setState((prevState) => ({
          loading: !prevState.loading,
          success: !prevState.success
        }));
      }, 2500);
    });
  }

  increaseCount() {
    this.setState({ count: this.state.count + 1 });
  }

  // TODO: Split these up into smaller components
  renderButton() {
    if (this.state.success) {
      return (
        <TouchableHighlight
          disabled
          style={[styles.button, { backgroundColor: '#24e07c' }]}
          underlayColor="#24e07c"
        >
          <Text>Success!</Text>
        </TouchableHighlight>
      );
    } else if (!this.state.loading) {
      return (
        <TouchableHighlight
          disabled={this.state.loading}
          style={styles.button}
          underlayColor="#4d98d6"
          onPress={this.onPress}
        >
          <Text>Press Me!</Text>
        </TouchableHighlight>
      );
    }
    return (
      <TouchableHighlight
        disabled={this.state.loading}
        style={styles.button}
        underlayColor="#4d98d6"
        onPress={this.onPress}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <ActivityIndicator />
          <Text style={{ paddingLeft: 10 }}>Loading...</Text>
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <LoginForm navigation={this.props.navigation} />
        <Button title="Web" onPress={() => web('https://www.google.com')} />
        {this.renderButton()}
        <Text style={{ alignSelf: 'center' }}>
          Count: {this.state.count}
        </Text>
        <Button
          title="Go To Animated Header Screen"
          onPress={() => this.props.navigation.navigate('AnimatedHeaderScreen')}
        />
      </View>
    );
  }
}

const styles = {
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#82b7e3',
    height: 50,
  }
};

export { LoginScreen };
