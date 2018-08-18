import React from 'react';
import { View, TextInput } from 'react-native';
import { Header } from 'react-navigation';
import { getStatusBarHeight } from 'react-native-status-bar-height';

// NOTE: Custom header
export const SearchHeader = ({ placeholder }) => {
  return (
    <View style={styles.viewStyle}>
      <TextInput
        style={styles.headerInputStyle}
        placeholder={placeholder || 'Search...'}
      />
    </View>
  );
};

const styles = {
  viewStyle: {
    height: Header.HEIGHT,
    borderWidth: 1,
    borderColor: 'blue',
    backgroundColor: 'gray'
  },
  headerInputStyle: {
    flex: 1,
    color: 'green',
    marginTop: getStatusBarHeight() + (Header.HEIGHT / 20),
    marginBottom: Header.HEIGHT / 10,
    marginRight: 10,
    marginLeft: 10,
    backgroundColor: 'white',
    borderColor: 'red',
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 10
  }
};
