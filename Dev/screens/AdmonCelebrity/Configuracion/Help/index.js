import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';

import Colors from '../../../../constants/Colors';
import Text from '../../../../components/Text';
import {userHelper} from '../../../../helpers/API';

/* STYLES */
const styles = StyleSheet.create({
  button: {
    width: 200,
    height: 50,
    backgroundColor: Colors.business,
    borderRadius: 10,
    elevation: 5,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
  },
});

class Help extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  testDeletePost = ref => {
    userHelper
      .deleteUserPosts(ref)
      .then(() => {})
      .catch(err => console.log(err));
  };

  render() {
    return (
      <View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.testDeletePost('OQIDAd2GDUMYyzfFESbE')}>
          <Text style={styles.buttonText}>{'Delete post'}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Help;
