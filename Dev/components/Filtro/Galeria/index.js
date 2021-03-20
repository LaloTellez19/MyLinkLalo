import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import Text from '../../../components/Text';
import Icon from '../../../components/Icon';
import Colors from '../../../constants/Colors';
import Layout from '../../../constants/Layout';

const width = Layout.window.width;

/* STYLES */
const styles = StyleSheet.create({
  /* ESTILOS BOTTOM SHADOW */
  bottomShadow: {
    paddingBottom: 15,
    marginBottom: 5,
    elevation: 5,
    backgroundColor: 'white',
  },
  /* ESTILOS GALERIA HEADER */
  galeriaHeader: {
    height: 100,
    paddingTop: 10,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  galeriaHeaderItems: {
    width: width / 4,
    alignItems: 'center',
    paddingTop: 5,
    paddingBottom: 5,
  },
  galeriaHeaderImgContainer: {
    alignItems: 'center',
  },
  galeriaHeaderImg: {
    height: 60,
    width: 60,
    borderRadius: 10,
  },
  galeriaHeaderText: {
    fontSize: 12,
    color: Colors.defaultTextColor,
  },
  /* ESTILOS GALERIA */
  galeria: {
    height: 260,
    marginTop: 3,
    marginLeft: 1,
    paddingBottom: 20,
  },
  galeriaImgContainer: {
    margin: 2,
    flex: 1,
  },
  galeriaImg: {
    width: 83,
    height: 83,
    resizeMode: 'cover',
  },
});

const todo = [
  {
    name: 'camera',
  },
  {
    name: 'gallery',
  },
  {
    name: 'trash',
  },
  {
    name: 'box_out',
  },
];

const albumesInfoResponse = [
  {
    img: 'https://i.picsum.photos/id/876/200/200.jpg',
    text: 'Viajes',
    galeria: [
      {
        uri: 'https://i.picsum.photos/id/876/200/200.jpg',
      },
      {
        uri: 'https://i.picsum.photos/id/876/200/200.jpg',
      },
      {
        uri: 'https://i.picsum.photos/id/876/200/200.jpg',
      },
      {
        uri: 'https://i.picsum.photos/id/876/200/200.jpg',
      },
    ],
  },
  {
    img: 'https://i.picsum.photos/id/225/200/200.jpg',
    text: 'Postres',
    galeria: [
      {
        uri: 'https://i.picsum.photos/id/225/200/200.jpg',
      },
      {
        uri: 'https://i.picsum.photos/id/225/200/200.jpg',
      },
      {
        uri: 'https://i.picsum.photos/id/225/200/200.jpg',
      },
      {
        uri: 'https://i.picsum.photos/id/225/200/200.jpg',
      },
    ],
  },
  {
    img: 'https://i.picsum.photos/id/317/200/200.jpg',
    text: 'Familia',
    galeria: [
      {
        uri: 'https://i.picsum.photos/id/317/200/200.jpg',
      },
      {
        uri: 'https://i.picsum.photos/id/317/200/200.jpg',
      },
      {
        uri: 'https://i.picsum.photos/id/317/200/200.jpg',
      },
      {
        uri: 'https://i.picsum.photos/id/317/200/200.jpg',
      },
    ],
  },
  {
    img: 'https://i.picsum.photos/id/232/200/200.jpg',
    text: 'Mascotas',
    galeria: [
      {
        uri: 'https://i.picsum.photos/id/232/200/200.jpg',
      },
      {
        uri: 'https://i.picsum.photos/id/232/200/200.jpg',
      },
      {
        uri: 'https://i.picsum.photos/id/232/200/200.jpg',
      },
      {
        uri: 'https://i.picsum.photos/id/232/200/200.jpg',
      },
    ],
  },
  {
    img: 'https://i.picsum.photos/id/987/200/200.jpg',
    text: 'Paisajes',
    galeria: [
      {
        uri: 'https://i.picsum.photos/id/987/200/200.jpg',
      },
      {
        uri: 'https://i.picsum.photos/id/987/200/200.jpg',
      },
      {
        uri: 'https://i.picsum.photos/id/987/200/200.jpg',
      },
      {
        uri: 'https://i.picsum.photos/id/987/200/200.jpg',
      },
    ],
  },
];

const galeriaTodoResponse = [
  {
    uri: 'https://i.picsum.photos/id/650/200/200.jpg',
  },
  {
    uri: 'https://i.picsum.photos/id/660/200/200.jpg',
  },
  {
    uri: 'https://i.picsum.photos/id/670/200/200.jpg',
  },
  {
    uri: 'https://i.picsum.photos/id/680/200/200.jpg',
  },
  {
    uri: 'https://i.picsum.photos/id/690/200/200.jpg',
  },
  {
    uri: 'https://i.picsum.photos/id/700/200/200.jpg',
  },
  {
    uri: 'https://i.picsum.photos/id/695/200/200.jpg',
  },
  {
    uri: 'https://i.picsum.photos/id/635/200/200.jpg',
  },
  {
    uri: 'https://i.picsum.photos/id/730/200/200.jpg',
  },
  {
    uri: 'https://i.picsum.photos/id/740/200/200.jpg',
  },
  {
    uri: 'https://i.picsum.photos/id/735/200/200.jpg',
  },
  {
    uri: 'https://i.picsum.photos/id/760/200/200.jpg',
  },
  {
    uri: 'https://i.picsum.photos/id/770/200/200.jpg',
  },
  {
    uri: 'https://i.picsum.photos/id/768/200/200.jpg',
  },
  {
    uri: 'https://i.picsum.photos/id/767/200/200.jpg',
  },
  {
    uri: 'https://i.picsum.photos/id/765/200/200.jpg',
  },
];

function Galeria(props) {
  const {seleccion} = props;
  const [galeriaHeader, setGaleriaHeader] = React.useState([]);
  const [galeria, setGaleria] = React.useState([]);

  /* COMPONENTDIDMOUNT / COMPONENTDIDUPDATE */
  React.useEffect(() => {
    setGaleriaHeader(
      seleccion === 'Todo'
        ? todo
        : seleccion === 'Álbumes'
        ? albumesInfoResponse
        : null,
    );
    setGaleria(
      seleccion === 'Todo'
        ? galeriaTodoResponse
        : seleccion === 'Álbumes'
        ? albumesInfoResponse[0].galeria
        : null,
    );
  }, [seleccion]);

  /* CONTROLAR SELECCION DE ALBUM */
  const seleccionarAlbum = index => {
    setGaleria(albumesInfoResponse[index].galeria);
  };

  return (
    <View>
      <View style={{overflow: 'hidden'}}>
        <View style={styles.bottomShadow} />
      </View>

      {/* FOTO-MENU */}
      <View style={styles.galeriaHeader}>
        <FotosMenu
          galeriaHeader={galeriaHeader}
          seleccion={seleccion}
          seleccionarAlbum={seleccionarAlbum}
        />
      </View>

      {/* GALERIA */}
      <View style={styles.galeria}>
        <FlatList
          numColumns={4}
          data={galeria}
          renderItem={({item, index}) => (
            <TouchableOpacity style={styles.galeriaImgContainer}>
              <Image style={styles.galeriaImg} source={{uri: item.uri}} />
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  );
}

const FotosMenu = ({galeriaHeader, seleccion, seleccionarAlbum}) => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {galeriaHeader.map((item, index) => {
        return (
          <View style={styles.galeriaHeaderItems} key={index}>
            {seleccion === 'Todo' && (
              <Icon
                name={item.name}
                size={65}
                Borderless
                forceColor
                color={Colors.gray}
              />
            )}
            {seleccion !== 'Todo' && (
              <TouchableOpacity
                style={styles.galeriaHeaderImgContainer}
                onPress={() => seleccionarAlbum(index)}>
                <Image
                  style={styles.galeriaHeaderImg}
                  source={{uri: item.img}}
                />
                <Text style={styles.galeriaHeaderText}>{item.text}</Text>
              </TouchableOpacity>
            )}
          </View>
        );
      })}
    </ScrollView>
  );
};
export default Galeria;
