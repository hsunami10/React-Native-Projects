import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';

class FadeScreen2 extends Component {
  static navigationOptions = () => {
    return {
      title: 'Fade Screen 2'
    };
  }

  render() {
    return (
      <View style={styles.viewStyle}>
        <Text>Fade Screen 2!</Text>
        <Button
          title="Fade to One"
          color="pink"
          onPress={() => this.props.navigation.navigate('Fade1')}
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
    backgroundColor: 'blue'
  }
};

export { FadeScreen2 };
