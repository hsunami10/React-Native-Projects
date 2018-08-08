import React from 'react';
import { View } from 'react-native';

/*
NOTE: Style override
"Style" prop can take an array
Any repeated properties to the right of the array will override anything to the left

ex. props.style overrides containerStyle.flexDirection to 'column', not default 'row'
*/
const CardSection = props => {
  return (
    <View style={[styles.containerStyle, props.style]}>
      {props.children}
    </View>
  );
};

const styles = {
  containerStyle: {
    borderBottomWidth: 1,
    padding: 5,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderColor: '#ddd',
    position: 'relative'
  }
};

export { CardSection };
