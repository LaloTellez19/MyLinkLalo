import React from 'react';
import {View, StyleSheet, Image, ScrollView} from 'react-native';

import Icon from '../../../components/Icon';
import Text from '../../../components/Text';
import Colors from '../../../constants/Colors';
import Loading from '../../../components/Loading';
import ErrorOrNoData from '../../../components/ErrorOrNoData';

/* STYLES */
const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    flex: 1,
    alignSelf: 'center',
    backgroundColor: Colors.grayLight,
    marginTop: 0,
  },
  /* ESTILOS CONTENIDO / ILUSTRACION */
  contenido: {
    width: '100%',
    // height: '81%',
    alignSelf: 'center',
    alignItems: 'center',
  },
  videoContainer: {
    width: '80%',
    height: '87%',
    alignItems: 'center',
    backgroundColor: 'white',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  ilustracion: {
    height: 250,
    resizeMode: 'contain',
    marginTop: 20,
  },
  /* ESTILOS MENU RA */
  menuRA: {
    width: '100%',
    height: '10%',
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  menuRAItem: {
    alignItems: 'center',
    width: '33.3%',
  },
  menuRAText: {
    textAlign: 'center',
    color: Colors.defaultTextColor,
    fontSize: 14,
  },
});

class RealidadAumentada extends React.Component {
  constructor(props) {
    super(props);
    this.menu = ['Mi R.A', 'Crear video', 'Abrir galería'];
    this.state = {
      activeColor: this.props.personal ? Colors.personal : Colors.business,
      myAR: false,
      seleccionRA: this.menu[0],
      loading: true,
      error: null,
    };

    this.menuOptions = [
      {
        name: 'movie',
        text: this.menu[0],
      },
      {
        name: 'videocall',
        text: this.menu[1],
      },
      {
        name: 'gallery',
        text: this.menu[2],
      },
    ];
  }

  getData = () => {
    const errorGettingData = {
      title: 'Data not found',
      message: 'Try to reload',
    };

    const response = {uri: 'https://i.picsum.photos/id/150/200/200.jpg'};

    if (response) {
      this.setState({
        myAR: response,
        loading: false,
      });
    } else {
      this.setState({
        error: errorGettingData,
        loading: false,
      });
    }
  };

  componentDidMount() {
    this.getData();
  }

  seleccionarOpcion = seleccion => {
    this.setState({seleccionRA: seleccion});

    switch (seleccion) {
      case this.menu[0]:
        console.log(this.menu[0]);
        break;
      case this.menu[1]:
        this.crearVideo();
        break;
      case this.menu[2]:
        this.abrirGaleria();
        break;
    }
  };

  crearVideo = () => {
    console.log(this.menu[1]);
  };

  abrirGaleria = () => {
    console.log(this.menu[2]);
  };

  render() {
    const {loading, error, myAR, seleccionRA, activeColor} = this.state;

    return (
      <View style={styles.mainContainer}>
        {loading && <Loading />}

        {error && <ErrorOrNoData title={error.title} message={error.message} />}

        {/* THERE´S NO AR*/}
        {!loading && !error && (
          <View>
            {/* MY AR */}
            {myAR && (
              <View style={styles.contenido}>
                <View style={styles.videoContainer}>
                  <Image style={styles.ilustracion} source={{uri: myAR.uri}} />
                </View>
              </View>
            )}

            {/* MENU */}
            <View style={styles.menuRA}>
              {this.menuOptions.map((item, index) => (
                <View style={styles.menuRAItem} key={index}>
                  <Icon
                    name={item.name}
                    size={50}
                    factor={0.8}
                    Borderless
                    forceColor
                    color={
                      seleccionRA === item.text ? activeColor : Colors.gray
                    }
                    onPress={() => this.seleccionarOpcion(item.text)}
                  />
                  <Text
                    style={[
                      styles.menuRAText,
                      {
                        color:
                          seleccionRA === item.text
                            ? activeColor
                            : Colors.defaultTextColor,
                      },
                    ]}>
                    {item.text}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        )}
      </View>
    );
  }
}

export default RealidadAumentada;
