import React from 'react';
import {SafeAreaView} from 'react-native';
import AllMyScreens from './screens/AllMyScreens';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  render() {
    console.log('componentId: ', this.props);
    return (
      <SafeAreaView
        style={{width: '100%', height: '100%', backgroundColor: 'white'}}>
        <AllMyScreens componentId={this.props.componentId} />
      </SafeAreaView>
    );
  }
}
