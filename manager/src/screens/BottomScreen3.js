import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';

class BottomScreen3 extends Component {
  static navigationOptions = () => {
    return {
      title: 'Bottom Screen 3'
    };
  }

  render() {
    return (
      <View style={styles.viewStyle}>
        <Text>Bottom Screen!</Text>
        <Button
          title="Fade to One"
          color="brown"
          onPress={() => this.props.navigation.goBack()}
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
    backgroundColor: 'yellow'
  }
};

export { BottomScreen3 };
