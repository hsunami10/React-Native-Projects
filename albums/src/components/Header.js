import React from 'react';
import { Text, View } from 'react-native';

// View: "Box" to put elements in

const Header = props => {
  const { viewStyle, textStyle } = styles; // Destructure styles object
  return (
    <View style={viewStyle}>
      <Text style={textStyle}>{props.headerText}</Text>
    </View>
  );
};

// Similar to CSS, except uses CamelCase instead of dash-case
const styles = {
  viewStyle: {
    backgroundColor: '#F8F8F8',
    justifyContent: 'center', // Vertical
    alignItems: 'center', // Horizontal
    height: 60,
    paddingTop: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2,
    position: 'relative'
  },
  textStyle: {
    fontSize: 20
  }
};

export default Header;
