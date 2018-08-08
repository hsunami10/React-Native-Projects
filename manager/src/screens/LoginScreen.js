import React, { Component } from 'react';
import { Button, View, Text } from 'react-native';
import LoginForm from '../components/LoginForm';

class LoginScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Login',
      headerRight: (
        <Button
          onPress={navigation.getParam('increaseCount')}
          title="+1"
          color="#fff"
        />
      ),
      // headerBackTitle: 'Back' // Name back button for next screen
    };
  };

  state = { count: 0 };

  componentDidMount() {
    this.props.navigation.setParams({ increaseCount: this._increaseCount });
  }

  _increaseCount = () => {
    this.setState({ count: this.state.count + 1 });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <LoginForm navigation={this.props.navigation} />
        <Text style={{ alignSelf: 'center' }}>
          {this.state.count}
        </Text>
      </View>
    );
  }
}

export { LoginScreen };
