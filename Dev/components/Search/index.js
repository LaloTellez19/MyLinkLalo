import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

import Icon from '../../components/Icon';
import Colors from '../../constants/Colors';

const styles = StyleSheet.create({
  busqueda: {
    alignItems: 'center',
  },
  buscarIcon: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    top: 15,
    left: 115,
    elevation: 0.1,
    backgroundColor: Colors.grayLight,
    borderColor: Colors.grayLight,
  },
  buscarInput: {
    width: 280,
    height: 40,
    backgroundColor: Colors.grayLight,
    marginTop: 15,
    marginBottom: 5,
    textAlign: 'center',
    paddingTop: 5,
    paddingBottom: 7,
    borderRadius: 10,
    fontSize: 16,
    fontFamily: 'HelveticaNeueLt',
    color: Colors.defaultTextColor,
  },
});

function Search(props) {
  const {small, left} = props;

  const [busqueda, onChangeBusqueda] = React.useState('');
  const [displayIcon, setDisplayIcon] = React.useState(true);

  const onFocus = () => {
    setDisplayIcon(true);
  };

  const onSubmitEditing = () => {
    props.obtenerValorBusqueda(busqueda);
    Keyboard.dismiss();
  };

  /* HANDLE SEARCH */
  const handleSearch = text => {
    onChangeBusqueda(text);

    if (text === '') {
      props.obtenerValorBusqueda(text);
      Keyboard.dismiss();
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.busqueda}>
        {displayIcon && busqueda === '' && (
          <View
            style={[
              styles.buscarIcon,
              left ? {left: left} : null,
              small ? {top: 5} : null,
            ]}>
            <Icon
              name="search"
              factor={0.7}
              Borderless
              forceColor
              color={Colors.gray}
            />
          </View>
        )}
        <TextInput
          style={[
            styles.buscarInput,
            props.width ? {width: props.width} : null,
            small ? {marginTop: 5} : null,
          ]}
          onChangeText={text => handleSearch(text)}
          value={busqueda}
          placeholder={'Buscar'}
          onFocus={() => onFocus()}
          onEndEditing={() => setDisplayIcon(true)}
          onSubmitEditing={() => onSubmitEditing()}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

export default Search;
