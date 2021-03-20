import React from 'react';
import {View, ScrollView, FlatList} from 'react-native';

import Layout from '../../constants/Layout';
import Colors from '../../constants/Colors';
import Text from '../../components/Text';
import MenuContextual from '../../components/MenuContextual';

import {users} from '../AdmonBusiness/Data';

const width = Layout.window.width;
const height = Layout.window.height;

function Scroll() {
  const [usersArray, setUsersArray] = React.useState([]);
  const [scroll, setScroll] = React.useState(false);
  const [displayMenu, setDisplayMenu] = React.useState(false);
  const [touch, setTouch] = React.useState(false);

  /* COMPONENTDIDMOUNT */
  React.useEffect(() => {
    getUsersArray(users);
  }, []);

  const getUsersArray = data => {
    const usersKeys = Object.keys(data);
    const arrayOfUsers = usersKeys.map(item => data[item]);
    setUsersArray(arrayOfUsers);
  };

  return (
    <View>
      <ScrollView
        style={{height: height}}
        scrollEnabled={!scroll}
        onScroll={event => {
          // console.log('scrollview', event.nativeEvent.contentOffset.y);
          event.nativeEvent.contentOffset.y === 200 ? setScroll(true) : null;
        }}>
        <View style={{height: 200, backgroundColor: Colors.personal}} />

        <View style={{height: height}}>
          <Text style={{height: 100, backgroundColor: Colors.business}}>
            {'Lista de usuarios'}
          </Text>
          <View style={{height: 530, paddingBottom: 10}}>
            <FlatList
              nestedScrollEnabled={scroll}
              initialNumToRender={5}
              onScroll={event => {
                setDisplayMenu(false);
                // console.log('flatlist', event.nativeEvent.contentOffset.y);
                event.nativeEvent.contentOffset.y === 0
                  ? setScroll(false)
                  : null;
              }}
              data={usersArray}
              renderItem={({item}) => (
                <Item
                  item={item}
                  setDisplayMenu={setDisplayMenu}
                  setTouch={setTouch}
                />
              )}
              keyExtractor={(item, index) => index.toString()}
            />
            {displayMenu && (
              <MenuContextual opciones={[{text: 'Eliminar'}]} touch={touch} />
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const Item = ({item, setDisplayMenu, setTouch}) => {
  return (
    <View
      onStartShouldSetResponder={event => {
        console.log(event.nativeEvent);
        setDisplayMenu(true);
        setTouch(event.nativeEvent);
      }}>
      <Text style={{height: 35}}>{item.nombre}</Text>
    </View>
  );
};

export default Scroll;
