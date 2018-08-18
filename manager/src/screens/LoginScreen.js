import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import LoginForm from '../components/LoginForm';

class LoginScreen extends Component {
  // static navigationOptions = ({ navigation }) => {
  //   return {
  //     title: 'Login',
  //     headerRight: (
  //       <Button
  //         onPress={navigation.getParam('increaseCount')}
  //         title="+1"
  //         color="#000"
  //       />
  //     ),
  //     headerLeft: (
  //       <Button
  //         onPress={() => navigation.navigate('Fade1')}
  //         title="Fade"
  //         color="#000"
  //       />
  //     )
  //     // headerBackTitle: 'Back' // Name back button for next screen
  //   };
  // };

  static navigationOptions = ({ navigation }) => {
    return {
      header: (
        <View>
          <TextInput style={styles.headerInputStyle} placeholder="header input" />
        </View>
      )
    };
  }

  constructor(props) {
    super(props);

    this.state = { count: 0 };
    this.increaseCount = this.increaseCount.bind(this);
  }

  componentWillMount() {
    this.props.navigation.setParams({
      increaseCount: this.increaseCount,
      decreaseCount: this.decreaseCount
    });
  }

  increaseCount = () => {
    this.setState({ count: this.state.count + 1 });
  }

  render() {
    return (
      <View style={styles.viewStyle}>
        <LoginForm navigation={this.props.navigation} />
        <Text style={{ alignSelf: 'center' }}>
          Count: {this.state.count}
        </Text>
      </View>
    );
  }
}

const styles = {
  viewStyle: {
    flex: 1,
    marginTop: getStatusBarHeight()
  },
  headerInputStyle: {
    height: 30,
    color: 'green',
    backgroundColor: 'white',
    borderColor: 'red',
    borderWidth: 1
  }
};

export { LoginScreen };
