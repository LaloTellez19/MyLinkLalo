import React from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Picker,
  StyleSheet,
} from 'react-native';

import Icon from '../../../components/Icon';
import Text from '../../../components/Text';
import Colors from '../../../constants/Colors';
import Layout from '../../../constants/Layout';

const width = Layout.window.width;

/* STYLES */
const styles = StyleSheet.create({
  /* ESTILOS TIENDA */
  tienda: {
    height: 500,
    paddingBottom: 20,
  },
  /* ESTILOS TITULO VISTA */
  tituloImpresion: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  tituloImpresionText: {
    textAlign: 'center',
    paddingLeft: 20,
    paddingRight: 5,
    color: Colors.defaultTextColor,
    fontSize: 22,
  },
  /* ESTILOS ILUSTRACION */
  ilustracionContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  ilustracion: {
    width: 310,
    height: 310,
    borderRadius: 10,
    justifyContent: 'center',
  },
  /* ESTILOS BENEFICIOS */
  beneficios: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 50,
    marginBottom: 30,
  },
  beneficiosTitulo: {
    fontSize: 18,
    color: Colors.defaultTextColor,
    marginBottom: 15,
  },
  beneficiosText: {
    fontSize: 14,
    color: Colors.defaultTextColor,
    marginBottom: 15,
    marginRight: 20,
    marginLeft: 20,
  },
  listaIncluye: {
    marginBottom: 5,
    marginLeft: 10,
  },
  /* ESTILOS CATEGORIA TARJETA */
  categoriaTarjeta: {
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  categoriaTarjetaTitulo: {
    fontSize: 18,
    color: Colors.defaultTextColor,
    marginBottom: 5,
    paddingBottom: 10,
    marginLeft: 20,
  },
  tiposTarjeta: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 20,
    paddingTop: 25,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: Colors.gray,
  },
  seleccionarTipoTarjeta: {
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 15,
  },
  pickerContainer: {
    borderWidth: 0.5,
    borderColor: Colors.gray,
    borderRadius: 5,
    marginLeft: 10,
  },
  pickerTipoTarjeta: {
    width: 105,
    height: 30,
    color: Colors.defaultTextColor,
  },
  precioTarjeta: {
    alignItems: 'center',
  },
  precio: {
    width: 130,
    height: 30,
    borderWidth: 0.5,
    borderColor: Colors.gray,
    color: Colors.defaultTextColor,
    textAlign: 'center',
    paddingTop: 5,
    borderRadius: 5,
  },
  categoriaTarjetaLabel: {
    fontSize: 12,
    color: Colors.defaultTextColor,
  },
  /* ESTILOS LISTA */
  listaImpresion: {
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 0.5,
    borderColor: Colors.gray,
  },
  itemListImpresion: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 30,
    marginBottom: 25,
  },
  itemListImpresionText: {
    fontSize: 16,
    color: Colors.defaultTextColor,
    marginLeft: 20,
  },
  /* ESTILOS COMPRAR */
  comprar: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 50,
  },
  comprarButton: {
    width: 200,
    height: 45,
    borderRadius: 10,
    backgroundColor: Colors.personal,
    marginBottom: 10,
  },
  comprarButtonText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    paddingTop: 10,
  },
  agregarAlCarrito: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
    height: 45,
    borderRadius: 10,
    backgroundColor: Colors.business,
  },
  agregarButtonText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
});

const imgTest =
  'https://images-na.ssl-images-amazon.com/images/I/71BekDJBb3L._SL1425_.jpg';

function ImpresionTarjetas(props) {
  const {administrador} = props;
  const [pickerValue, setPickerValue] = React.useState('Personal');
  const preciosTarjetas = {
    Personal: 500.0,
    Business: 1000.0,
  };

  const comprar = () => {
    console.log('comprar');
  };

  const agregarACarrito = () => {
    console.log('agregar');
  };

  return (
    <ScrollView style={styles.tienda} nestedScrollEnabled={true}>
      {/* TITULO */}
      <View style={styles.tituloImpresion}>
        <Icon name="card" />
        <Text style={styles.tituloImpresionText}>
          {'Impresión de Tarjetas'}
        </Text>
      </View>

      {/* IMAGEN IMPRESION */}
      <View style={styles.ilustracionContainer}>
        <Image
          style={styles.ilustracion}
          source={{uri: props.uri || imgTest}}
        />
      </View>

      {/* BENEFICIOS */}
      <View style={styles.beneficios}>
        <Text style={styles.beneficiosTitulo}>{'Beneficios'}</Text>
        <View>
          <Text style={styles.beneficiosText}>
            {
              'Nos aseguramos de que tus tarjetas My-Link se vean tan bien en papel como se ven en tu pantalla.'
            }
          </Text>
          <Text style={styles.beneficiosText}>
            {
              'Imprimimos tus tarjetas My-Link que te encantarán y a un precio accesible.'
            }
          </Text>
          <Text style={styles.beneficiosText}>
            {
              'Puedes tener tu tarjeta Personal o Business con su diseño característico y sus respectivos beneficios que incluyen:'
            }
          </Text>
          <View style={styles.listaIncluye}>
            <Text style={styles.beneficiosText}>
              {'\u2022 Realidad Aumentada'}
            </Text>
            <Text style={styles.beneficiosText}>
              {'\u2022 Código QR(Que registra su Link)'}
            </Text>
          </View>
        </View>
        <View />
        <Text style={styles.beneficiosText}>
          {
            'Entregamos el paquete de 500 impresiones a tu casa entre 3 y 5 días después, o puedes elegir la opción de envio exprés.'
          }
        </Text>
      </View>

      {/* CATEGORIA */}
      <View style={styles.categoriaTarjeta}>
        <Text style={styles.categoriaTarjetaTitulo}>
          {'Categoría de Tarjeta'}
        </Text>
        <View style={styles.tiposTarjeta}>
          <Icon
            name="personal_card"
            forceColor
            color={'white'}
            background={
              administrador === 'personal' ? Colors.personal : Colors.business
            }
          />
          <View style={styles.seleccionarTipoTarjeta}>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={pickerValue}
                style={styles.pickerTipoTarjeta}
                onValueChange={(itemValue, itemIndex) =>
                  setPickerValue(itemValue)
                }>
                <Picker.Item label="Personal" value="Personal" />
                <Picker.Item label="Business" value="Business" />
              </Picker>
            </View>
            <Text style={styles.categoriaTarjetaLabel}>{'Tarjeta'}</Text>
          </View>
          <View style={styles.precioTarjeta}>
            <Text style={styles.precio}>{`$ ${
              preciosTarjetas[pickerValue]
            }`}</Text>
            <Text style={styles.categoriaTarjetaLabel}>
              {'Cantidad a pagar'}
            </Text>
          </View>
        </View>
      </View>

      {/* LISTA */}
      <View style={styles.listaImpresion}>
        <View style={styles.itemListImpresion}>
          <Icon name="unknown" size={50} />
          <Text style={styles.itemListImpresionText}>{'Tamaño'}</Text>
        </View>
        <View style={styles.itemListImpresion}>
          <Icon name="unknown" size={50} />
          <Text style={styles.itemListImpresionText}>{'Envío'}</Text>
        </View>
        <View style={styles.itemListImpresion}>
          <Icon name="unknown" size={50} />
          <Text style={styles.itemListImpresionText}>{'Devolución'}</Text>
        </View>
      </View>

      {/* COMPRAR */}
      <View style={styles.comprar}>
        <TouchableOpacity
          style={[
            styles.comprarButton,
            {
              backgroundColor:
                administrador === 'personal'
                  ? Colors.personal
                  : Colors.business,
            },
          ]}
          onPress={() => comprar()}>
          <Text style={styles.comprarButtonText}>{`Comprar por $ ${
            preciosTarjetas[pickerValue]
          }`}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.agregarAlCarrito}
          onPress={() => agregarACarrito()}>
          <Icon name="card" Borderless forceColor color={'white'} />
          <Text style={styles.agregarButtonText}>{'Agregar al carrito'}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

export default ImpresionTarjetas;
