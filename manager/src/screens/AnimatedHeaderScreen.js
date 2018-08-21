import React, { Component } from 'react';
import {
  Animated,
  View,
  Text,
  StyleSheet,
  Image,
  StatusBar,
  ScrollView,
  FlatList,
  Dimensions
} from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { HeaderTitle, Header, HeaderBackButton } from 'react-navigation';
import { TabView, TabBar } from 'react-native-tab-view';
import ExampleImage from '../../src/assets/images/example_image.jpg';
import { Card } from '../components/common';

const HomeScreen = ({ list }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Text style={{ alignSelf: 'center' }}>Home Screen!</Text>
      <ScrollView
        style={styles.fill}
        scrollEventThrottle={16}
        onScroll={Animated.event([{ nativeEvent: {
            contentOffset: {
              y: this.scrollY
            }
          } }])}
      >
        <FlatList
          data={list}
          renderItem={
            obj =>
              <Card style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Text>List Item: {obj.item}</Text>
              </Card>

          }
          keyExtractor={text => text}
        />
      </ScrollView>
    </View>
  );
};

const SettingsScreen = ({ list }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Text style={{ alignSelf: 'center' }}>Settings Screen!</Text>
      <ScrollView
        style={styles.fill}
        scrollEventThrottle={16}
        onScroll={() => console.log('scrolling settings screen')}
      >
        <FlatList
          data={list}
          renderItem={obj =>
            <Card style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Text>List Item: {obj.item}</Text>
            </Card>
          }
          keyExtractor={text => text}
        />
      </ScrollView>
    </View>
  );
};

// TODO
// Replace all '200' in navigationOptions to navigation.getParam('headerHeight', Header.HEIGHT)
class AnimatedHeaderScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerBackground: (
        <View style={styles.headerBackgroundViewStyle}>
          <Image
            style={[
              styles.imageStyle,
              { height: navigation.getParam('headerHeight', Header.HEIGHT) }
            ]}
            source={ExampleImage}
            blurRadius={0}
          />
          <View
            style={[
              styles.imageStyle,
              { backgroundColor: 'rgba(0,0,0,0.4)',
              height: navigation.getParam('headerHeight', Header.HEIGHT) }
            ]}
          />
        </View>
      ),
      headerTitle: <HeaderTitle style={styles.headerTitleStyle}>Header Title!</HeaderTitle>,
      headerStyle: {
        overflow: 'hidden',
        height: navigation.getParam('headerHeight', Header.HEIGHT) - getStatusBarHeight(),
        backgroundSize: 'contain'
      },
      headerLeftContainerStyle: { // Always stick to upper left
        flexDirection: 'column',
        justifyContent: 'flex-start'
      },
      headerTintColor: 'white' // Back button icon color
    };
  }

  constructor(props) {
    super(props);

    // Min height of image, actual header height is (this height - getStatusBarHeight()
    this.state = {
      HEADER_MAX_HEIGHT: 200,
      HEADER_MIN_HEIGHT: Header.HEIGHT,
      HEADER_SCROLL_DISTANCE: 200 - Header.HEIGHT,
      list: ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten',
            'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen',
            'eighteen', 'nineteen', 'twenty'],
      navigationState: {
        index: 0,
        routes: [
          { key: 'home', title: 'Home' },
          { key: 'settings', title: 'Settings' }
        ]
      }
    };

    this.renderScene = this.renderScene.bind(this);
    this.handleIndexChange = this.handleIndexChange.bind(this);
    this.handleTabPress = this.handleTabPress.bind(this);
    this.scrollY = new Animated.Value(0);
  }

  componentWillMount() {
    // this.props.navigation.setParams({
    //   headerHeight: this.scrollY.interpolate({
    //     inputRange: [0, this.state.HEADER_SCROLL_DISTANCE],
    //     outputRange: [this.state.HEADER_MAX_HEIGHT, this.state.HEADER_MIN_HEIGHT],
    //     extrapolate: 'clamp'
    //   })
    // });
    this.props.navigation.setParams({
      headerHeight: this.state.HEADER_MAX_HEIGHT
    });
  }

  handleIndexChange(index) {
    console.log(index);
    this.setState((prevState) => ({
      navigationState: { ...prevState.navigationState }, index
    }));
  }

  handleTabPress({ route }) {
    switch (route.key) {
      case 'home':
        this.handleIndexChange(0);
        return;
      case 'settings':
        this.handleIndexChange(1);
        return;
      default:
        return;
    }
  }

  renderScene = ({ route }) => {
    switch (route.key) {
    case 'home':
      return <HomeScreen list={this.state.list} />;
    case 'settings':
      return <SettingsScreen list={this.state.list} />;
    default:
      return null;
    }
  }

  render() {
    // NOTE: Custom tab view
    return (
      <View
        style={styles.fill}
      >
        <StatusBar barStyle="light-content" />
        <TabView
          navigationState={this.state.navigationState}
          renderScene={this.renderScene}
          renderTabBar={props =>
            <TabBar
              {...props}
              useNativeDriver
              onTabPress={this.handleTabPress}
              indicatorStyle={{ borderBottomColor: 'pink', borderBottomWidth: 2 }}
            />
          }
          onIndexChange={this.handleIndexChange}
          canJumpToTab={() => true}
          useNativeDriver
        />
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
  },
  headerBackgroundViewStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitleStyle: {
    color: 'white',
    fontSize: 22
  }
});

export { AnimatedHeaderScreen };
