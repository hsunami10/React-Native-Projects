import React, { Component } from 'react';
import {
  Animated,
  View,
  Text,
  StyleSheet,
  Image,
  StatusBar,
  ScrollView,
  FlatList
} from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { HeaderTitle, Header } from 'react-navigation';
import ExampleImage from '../../src/assets/images/example_image.jpg';
import { Card } from '../components/common';

class AnimatedHeaderScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerBackground: (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Image
          style={[
            styles.imageStyle,
            { height: navigation.getParam('headerHeight', Header.HEIGHT) }
          ]}
          source={ExampleImage}
          blurRadius={0}
        />
      </View>
    ),
    headerTitle: <HeaderTitle style={{ color: 'white' }}>Header Title!</HeaderTitle>,
    headerStyle: {
      overflow: 'hidden',
      height: navigation.getParam('headerHeight', Header.HEIGHT) - getStatusBarHeight()
    },
    headerLeftContainerStyle: {
      flexDirection: 'column',
      justifyContent: 'flex-start'
    },
    headerTintColor: 'white' // Back button icon color
  })

  constructor(props) {
    super(props);

    // Min height of image, actual header height is (this height - getStatusBarHeight()
    this.state = {
      scrollY: new Animated.Value(0),
      HEADER_MAX_HEIGHT: 200,
      HEADER_MIN_HEIGHT: Header.HEIGHT,
      list: ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten',
            'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen',
            'eighteen', 'nineteen', 'twenty']
    };
    this.renderItem = this.renderItem.bind(this);
  }

  componentWillMount() {
    console.log(this.state);
    this.props.navigation.setParams({ headerHeight: this.state.HEADER_MAX_HEIGHT });
  }

  renderItem(obj) {
    return (
      <Card style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Text>List Item: {obj.item}</Text>
      </Card>
    );
  }

  render() {
    return (
      <View
        style={styles.fill}
      >
        <StatusBar barStyle="light-content" />
        <ScrollView style={styles.fill}>
          <FlatList
            data={this.state.list}
            renderItem={this.renderItem}
            keyExtractor={text => text}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  fill: {
    flex: 1
  },
  imageStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: null,
    height: Header.HEIGHT,
    resizeMode: 'cover',
  }
});

export { AnimatedHeaderScreen };
