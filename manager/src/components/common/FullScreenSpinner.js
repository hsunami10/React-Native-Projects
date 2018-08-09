import React from 'react';
import { View, ActivityIndicator } from 'react-native';

// Render spinner over all elements, in the center of the screen
// Render AFTER all other elements
const FullScreenSpinner = ({ size, color }) => {
  return (
    <View style={styles.spinnerStyle}>
      <ActivityIndicator
        size={size || 'large'}
        color={color || 'black'}
      />
    </View>
  );
};

const styles = {
  spinnerStyle: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
};

export { FullScreenSpinner };
