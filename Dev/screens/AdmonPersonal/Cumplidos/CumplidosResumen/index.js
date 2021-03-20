import React from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';

import Layout from '../../../../constants/Layout';
import Colors from '../../../../constants/Colors';
import Text from '../../../../components/Text';
import ComplimentsContainer from '../../../../components/ComplimentsContainer';
import UsersArray from '../../../../components/UsersArray';

const ilustration = require('../../../../assets/images/complimentsFullView/1.png');

const width = Layout.window.width;

/* STYLES */
const styles = StyleSheet.create({
  noCompliments: {
    height: 220,
    width: '100%',
    resizeMode: 'cover',
  },
  /* COMPLIMENTS SUMMARY STYLES */
  misDistinciones: {
    height: 220,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -35,
  },
  misDistincionesItem: {
    alignItems: 'center',
    marginTop: 0,
    paddingTop: 5,
    paddingLeft: 30,
    paddingRight: 30,
    backgroundColor: Colors.grayLight,
    elevation: 0,
  },
  misDistincionesTopItem: {
    marginTop: -40,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    marginRight: 15,
    marginLeft: 15,
    paddingLeft: 0,
    paddingRight: 0,
  },
  complimentTotal: {
    width: 50,
    height: 25,
    backgroundColor: 'white',
    borderWidth: 0.5,
    borderRadius: 10,
    borderColor: Colors.gray,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  complimentTotalText: {
    fontSize: 14,
    color: Colors.defaultTextColor,
    textAlign: 'center',
  },
  misDistincionesIlustracion: {
    width: 75,
    height: 75,
  },
  misTopCumplidoIlustracion: {
    width: 80,
    height: 80,
  },
  ilustracionBorder: {
    borderWidth: 3,
    borderRadius: 100,
    borderColor: Colors.gray,
  },
  misDistincionesNombre: {
    fontSize: 14,
    color: Colors.defaultTextColor,
    marginTop: 3,
  },
  miTopDistincionUsers: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: -10,
    left: width / 3.9,
    elevation: 2,
  },
});

function CumplidosResumen(props) {
  const {datosVistaDistincion, distincionesInfo, vipDark} = props;
  const order = [1, 0, 2];
  const defaultImage = 'https://i.picsum.photos/id/179/200/200.jpg';

  /* GET TOTAL DISPLAYED */
  const getTotalDisplayed = value => {
    let displayedValue = 0;

    if (value >= 1000 && value < 1000000) {
      displayedValue = `${value / 1000}K`;
    } else if (value >= 1000000) {
      displayedValue = `${value / 1000000}M`;
    } else {
      displayedValue = value;
    }

    return displayedValue;
  };

  const backgroundColor = vipDark
    ? {backgroundColor: 'black'}
    : {backgroundColor: Colors.grayLight};

  const backgroundColor_2 = vipDark
    ? {backgroundColor: Colors.jet}
    : {backgroundColor: 'white'};

  const totalContainer = vipDark
    ? {backgroundColor: Colors.jet, borderColor: 'white'}
    : {backgroundColor: 'white', borderColor: Colors.gray};

  const textColor = vipDark
    ? {color: Colors.grayLight}
    : {color: Colors.defaultTextColor};

  const textColor_2 = vipDark
    ? {color: Colors.silverMetallic}
    : {color: Colors.defaultTextColor};

  return (
    <View style={[backgroundColor_2]}>
      {datosVistaDistincion.length > 0 && (
        <ComplimentsContainer dark={vipDark}>
          <View style={[styles.misDistinciones]}>
            {order.map((item, index) => (
              <Compliment
                key={index}
                distincionesInfo={distincionesInfo}
                compliment={datosVistaDistincion[item]}
                defaultImage={defaultImage}
                top={index === 1}
                getTotalDisplayed={getTotalDisplayed}
                backgroundColors={[backgroundColor, totalContainer]}
                textColors={[textColor, textColor_2]}
              />
            ))}
          </View>
        </ComplimentsContainer>
      )}

      {datosVistaDistincion.length === 0 && (
        <ComplimentsContainer dark={vipDark}>
          <View>
            <Image style={styles.noCompliments} source={ilustration} />
          </View>
        </ComplimentsContainer>
      )}
    </View>
  );
}

const Compliment = ({
  distincionesInfo,
  compliment,
  defaultImage,
  top,
  getTotalDisplayed,
  backgroundColors,
  textColors,
}) => {
  return (
    <View
      style={[
        styles.misDistincionesItem,
        top ? styles.misDistincionesTopItem : null,
        backgroundColors[0],
      ]}>
      <View style={[styles.complimentTotal, backgroundColors[1]]}>
        <Text style={[styles.complimentTotalText, textColors[0]]}>
          {getTotalDisplayed(compliment.total)}
        </Text>
      </View>
      <Image
        style={[styles.misDistincionesIlustracion, styles.ilustracionBorder]}
        source={
          distincionesInfo[compliment.key].ilustracion || {
            uri: defaultImage,
          }
        }
      />
      <Text style={[styles.misDistincionesNombre, textColors[1]]}>
        {distincionesInfo[compliment.key].distincion}
      </Text>

      {top && (
        <View style={styles.miTopDistincionUsers}>
          <UsersArray users={compliment.users.slice(0, 3)} />
        </View>
      )}
    </View>
  );
};

export default CumplidosResumen;
