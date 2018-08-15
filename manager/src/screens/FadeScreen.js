import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';

class FadeScreen extends Component {
  static navigationOptions = () => {
    return {
      title: 'Fade Screen 1'
    };
  }

  render() {
    return (
      <View style={styles.viewStyle}>
        <Text>Fade Screen!</Text>
        <Button
          title="Fade to Two"
          color="purple"
          onPress={() => this.props.navigation.navigate('Fade2')}
        />
        <Button
          title="Bottom to Three"
          color="black"
          onPress={() => this.props.navigation.navigate('Bottom3')}
        />
        <Button
          title="Back to Log In"
          color="red"
          onPress={() => this.props.navigation.navigate('LogIn')}
        />
      </View>
    );
  }
}

const styles = {
  viewStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green'
  }
};

export { FadeScreen };
