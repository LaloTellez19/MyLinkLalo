import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  TextInput,
} from 'react-native';

import {Navigation} from 'react-native-navigation';

import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';
import Text from '../Text';
import Icon from '../Icon';
import ModalDarkBackground from '../ModalDarkBackground';

const width = Layout.window.width;
const height = Layout.window.height;

/* STYLES */
const styles = StyleSheet.create({
  mainContainer: {
    width: width,
    height: '100%',
  },
  /* AWARDS LIST STYLES */
  awardsList: {
    height: height - 63 - 73,
    alignItems: 'center',
  },
  list: {
    flex: 1,
  },
  award: {
    width: width / 3,
    alignItems: 'center',
    marginTop: 5,
  },
  awardOptionImg: {
    width: width / 3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: 5,
  },
  awardImageContainer: {
    width: width / 5,
    height: width / 5,
    borderWidth: 0.5,
    borderColor: Colors.gray,
    borderRadius: 10,
    elevation: 10,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  awardImage: {
    width: width / 5,
    height: width / 5,
    borderRadius: 10,
  },
  awardText: {
    width: width / 5,
    fontSize: 12,
    color: Colors.defaultTextColor,
    marginTop: 5,
    marginBottom: 2,
    marginLeft: 35,
    textAlign: 'center',
  },
  /* MODAL STYLES */
  addEditAward: {
    width: width / 1.2,
    height: width / 1.2,
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 0.5,
    borderColor: Colors.gray,
    borderRadius: 10,
    marginTop: 25,
  },
  addEditAwardImageContainer: {
    width: '50%',
    height: '50%',
    borderWidth: 0.5,
    borderColor: Colors.gray,
    borderRadius: 10,
    backgroundColor: Colors.gray,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    overflow: 'hidden',
  },
  addEditAwardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  addEditAwardText: {
    fontSize: 16,
    fontFamily: 'HelveticaNeueLt',
    color: Colors.defaultTextColor,
    marginTop: 10,
  },
  /* ADD AWARD BUTTON STYLES */
  addAward: {
    width: width / 2,
    height: 40,
    backgroundColor: 'white',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    borderColor: Colors.gray,
    borderRadius: 10,
    marginTop: 15,
    marginBottom: 10,
  },
  addAwardText: {
    fontSize: 14,
    color: 'white',
  },
});

const response = [
  {
    img:
      'https://i.picsum.photos/id/63/200/300.jpg?hmac=Zhw62KKdLbsw5yRcx9gVDEQq4kzPwjZUrJAJUIryu6k',
    title: 'Botón Diamante',
  },
  {
    img:
      'https://i.picsum.photos/id/570/200/300.jpg?hmac=fMlqjNmBSgN75P_tCU-PVSGzRYQxU23Xqd593HxZSZQ',
    title: 'Influencer Favorito 2016',
  },
  {
    img:
      'https://i.picsum.photos/id/786/200/300.jpg?hmac=ukrca61AOMxrxsEnCf7j49AnyoIwIsyIikReiUhm6zQ',
    title: '1 millón de suscriptores',
  },
  {
    img:
      'https://i.picsum.photos/id/63/200/300.jpg?hmac=Zhw62KKdLbsw5yRcx9gVDEQq4kzPwjZUrJAJUIryu6k',
    title: 'Botón Diamante',
  },
  {
    img:
      'https://i.picsum.photos/id/570/200/300.jpg?hmac=fMlqjNmBSgN75P_tCU-PVSGzRYQxU23Xqd593HxZSZQ',
    title: 'Influencer Favorito 2016',
  },
  {
    img:
      'https://i.picsum.photos/id/786/200/300.jpg?hmac=ukrca61AOMxrxsEnCf7j49AnyoIwIsyIikReiUhm6zQ',
    title: '1 millón de suscriptores',
  },
  {
    img:
      'https://i.picsum.photos/id/63/200/300.jpg?hmac=Zhw62KKdLbsw5yRcx9gVDEQq4kzPwjZUrJAJUIryu6k',
    title: 'Botón Diamante',
  },
  {
    img:
      'https://i.picsum.photos/id/570/200/300.jpg?hmac=fMlqjNmBSgN75P_tCU-PVSGzRYQxU23Xqd593HxZSZQ',
    title: 'Influencer Favorito 2016',
  },
  {
    img:
      'https://i.picsum.photos/id/786/200/300.jpg?hmac=ukrca61AOMxrxsEnCf7j49AnyoIwIsyIikReiUhm6zQ',
    title: '1 millón de suscriptores',
  },
  {
    img:
      'https://i.picsum.photos/id/63/200/300.jpg?hmac=Zhw62KKdLbsw5yRcx9gVDEQq4kzPwjZUrJAJUIryu6k',
    title: 'Botón Diamante',
  },
  {
    img:
      'https://i.picsum.photos/id/570/200/300.jpg?hmac=fMlqjNmBSgN75P_tCU-PVSGzRYQxU23Xqd593HxZSZQ',
    title: 'Influencer Favorito 2016',
  },
  {
    img:
      'https://i.picsum.photos/id/786/200/300.jpg?hmac=ukrca61AOMxrxsEnCf7j49AnyoIwIsyIikReiUhm6zQ',
    title: '1 millón de suscriptores',
  },
  {
    img:
      'https://i.picsum.photos/id/63/200/300.jpg?hmac=Zhw62KKdLbsw5yRcx9gVDEQq4kzPwjZUrJAJUIryu6k',
    title: 'Botón Diamante',
  },
  {
    img:
      'https://i.picsum.photos/id/570/200/300.jpg?hmac=fMlqjNmBSgN75P_tCU-PVSGzRYQxU23Xqd593HxZSZQ',
    title: 'Influencer Favorito 2016',
  },
  {
    img:
      'https://i.picsum.photos/id/786/200/300.jpg?hmac=ukrca61AOMxrxsEnCf7j49AnyoIwIsyIikReiUhm6zQ',
    title: '1 millón de suscriptores',
  },
];

class AwardsAdmin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      awards: [],
      accountColor: this.props.personal ? Colors.personal : Colors.business,
      awardSelected: {},
    };

    this.handleAddEditAward = this.handleAddEditAward.bind(this);
  }

  getData = () => {
    this.setState({awards: response});
  };

  componentDidMount() {
    this.getData();
  }

  setAddEditAward = (adding, award) => {
    this.setState({adding: adding, awardSelected: award});
    Navigation.push(this.props.componentId, {
      component: {
        name: 'my-link.AddEditAward',
        passProps: {
          adding: adding,
          awardSelected: award,
          accountColor: this.state.accountColor,
          handleAddEditAward: this.handleAddEditAward,
        },
      },
    });
  };

  handleAddEditAward = (award, adding) => {
    const {awards, awardSelected} = this.state;

    if (adding) {
      this.setState({awards: [...awards, award], addEditAward: false});
    } else {
      awards[awardSelected.index] = award;
      this.setState({awards: [...awards], addEditAward: false});
    }
  };

  render() {
    const {awards, accountColor} = this.state;
    const {updateListInViewOffset} = this.props;

    return (
      <View style={styles.mainContainer}>
        {/* AWARDS LIST */}
        <View style={styles.awardsList}>
          <FlatList
            data={awards}
            numColumns={3}
            renderItem={({item, index}) => (
              <Award
                item={{...item, index}}
                handleItemSelected={() => {
                  this.setAddEditAward(false, {...item, index});
                }}
              />
            )}
            ListFooterComponent={
              <Button
                onPress={() => {
                  this.setAddEditAward(true, null);
                }}
                accountColor={accountColor}
                text={'Agregar'}
              />
            }
            keyExtractor={(item, index) => index.toString()}
            style={styles.list}
            onScroll={event => {
              const offsetY = event.nativeEvent.contentOffset.y;
              updateListInViewOffset(offsetY);
            }}
          />
        </View>
      </View>
    );
  }
}

const Award = ({item, handleItemSelected}) => {
  return (
    <TouchableOpacity
      style={styles.award}
      onPress={() => handleItemSelected()}
      activeOpacity={0.7}>
      <View style={styles.awardOptionImg}>
        <Icon name="data_filter" size={30} factor={1} Borderless />
        <View style={styles.awardImageContainer}>
          <Image style={styles.awardImage} source={{uri: item.img}} />
        </View>
      </View>
      <Text style={styles.awardText}>{item.title}</Text>
    </TouchableOpacity>
  );
};

const Button = ({onPress, accountColor, text}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        onPress();
      }}
      style={[styles.addAward, {backgroundColor: accountColor}]}>
      <Text style={styles.addAwardText}>{text}</Text>
    </TouchableOpacity>
  );
};

export default AwardsAdmin;
