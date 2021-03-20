import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';

import Colors from '../../../constants/Colors';
import Layout from '../../../constants/Layout';
import Text from '../../../components/Text';
import CalendarioPicker from '../../../components/CalendarioPicker';
import Loading from '../../../components/Loading';
import ErrorOrNoData from '../../../components/ErrorOrNoData';

/* DATA */
import {noticiasResponse} from '../../../testData/dataAdmon';

const width = Layout.window.width;

/* STYLES */
const styles = StyleSheet.create({
  mainContainer: {
    width: width,
    flex: 1,
    backgroundColor: 'white',
  },
  /* CALENDAR STYLES */
  calendar: {
    width: '100%',
    borderBottomWidth: 0.5,
    borderColor: Colors.gray,
  },
  listaNoticias: {
    width: width,
    alignSelf: 'center',
    flex: 1,
    backgroundColor: 'white',
    marginTop: 10,
  },
  listaNoticiasItem: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 10,
    borderRadius: 10,
    borderColor: Colors.gray,
    borderWidth: 0.5,
  },
  listaNoticiasImagen: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginLeft: 15,
    marginTop: 5,
  },
  listaNoticiasContent: {
    width: 225,
    marginLeft: 15,
    color: Colors.defaultTextColor,
  },
  listaNoticiasTitle: {
    fontSize: 18,
    color: Colors.defaultTextColor,
  },
  listaNoticiasMessage: {
    marginTop: 3,
    fontSize: 14,
    color: Colors.defaultTextColor,
  },
  verNoticiaCompletaTouch: {
    marginTop: 3,
    width: 55,
  },
  verNoticiaCompletaText: {
    fontSize: 14,
    color: Colors.personal,
    paddingTop: 5,
    paddingBottom: 20,
    paddingRight: 10,
  },
  verComentariosTouch: {
    maxWidth: 250,
    marginTop: -15,
    marginLeft: 50,
    marginRight: 5,
  },
  verComentariosText: {
    fontSize: 14,
    color: Colors.defaultTextColor,
    textAlign: 'right',
  },
});

class Noticias extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listaNoticias: [],
      itemSelected: {},
      loading: true,
      error: null,
    };

    this.menuMonths = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
    ];

    this.seleccionarNoticias = this.seleccionarNoticias.bind(this);
    this.handleItemSelection = this.handleItemSelection.bind(this);
  }

  getData = date => {
    const errorGettingData = {
      title: 'Data not found',
      message: 'Try with another date or try to reload',
    };

    const response = noticiasResponse.data.noticias[date.toLowerCase()];

    if (response) {
      this.setState({
        listaNoticias: response,
        loading: false,
        error: null,
      });
    } else {
      this.setState({
        error: errorGettingData,
        loading: false,
      });
    }
  };

  /* SELECCIONAR LISTA DE NOTICIAS AÑO / MES */
  seleccionarNoticias = date => {
    const month = this.menuMonths[date.getMonth()];
    this.getData(month);
  };

  /* HANDLE ITEM SELECTION */
  handleItemSelection = item => {
    this.setState({itemSelected: item});
    console.log(`Ver noticia : ${item.title}`);
  };

  render() {
    const {loading, error, listaNoticias} = this.state;
    const {updateListInViewOffset} = this.props;

    return (
      <View style={styles.mainContainer}>
        {/* PICKER MES / AÑO */}
        <View style={styles.calendar}>
          <CalendarioPicker
            obtnerItemCalendario={this.seleccionarNoticias}
            newPicker
          />
        </View>

        {loading && <Loading />}

        {error && <ErrorOrNoData title={error.title} message={error.message} />}

        {/* LISTA DE NOTICIAS */}
        {!loading && !error && (
          <View style={styles.listaNoticias}>
            <FlatList
              nestedScrollEnabled={true}
              data={listaNoticias}
              renderItem={({item, index}) => (
                <Noticia
                  item={{...item, index}}
                  handleItemSelection={this.handleItemSelection}
                />
              )}
              keyExtractor={(item, index) => index.toString()}
              onMomentumScrollEnd={event => {
                const offsetY = event.nativeEvent.contentOffset.y;
                updateListInViewOffset(offsetY);
              }}
            />
          </View>
        )}
      </View>
    );
  }
}

const Noticia = ({item, handleItemSelection}) => {
  return (
    <View style={styles.listaNoticiasItem}>
      {/* IMAGEN NOTICIA */}
      <Image style={styles.listaNoticiasImagen} source={{uri: item.image}} />

      {/* CONTENIDO NOTICIA */}
      <View style={styles.listaNoticiasContent}>
        <Text style={styles.listaNoticiasTitle}>{item.title}</Text>
        <Text style={styles.listaNoticiasMessage} numberOfLines={1}>
          {item.message}
        </Text>
        {/* VER NOTICIA COMPLETA */}
        <TouchableOpacity
          style={styles.verNoticiaCompletaTouch}
          onPress={() => {
            handleItemSelection(item);
          }}>
          <Text style={styles.verNoticiaCompletaText}>{'más...'}</Text>
        </TouchableOpacity>
        {/* VER COMENTARIOS DE NOTICIA */}
        <TouchableOpacity
          style={styles.verComentariosTouch}
          onPress={() => handleItemSelection(item)}>
          <Text style={styles.verComentariosText}>{`Ver los ${
            item.comments
          } comentarios`}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Noticias;
