import React from 'react';
import {View, StyleSheet, Image} from 'react-native';

import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';
import IconPack from '../../constants/IconPack';
import Icon from '../Icon';
import Text from '../Text';
import ProfilePicture from '../ProfilePicture';
import UserImage from '../UserImage';
import SemiCircleProgressBar from '../SemiCircleProgressBar';

const width = Layout.window.width;

/* STYLES */
const styles = StyleSheet.create({
  container: {
    marginBottom: 5,
  },
  /* ESTILOS BUSINESS INFO */
  businessInfo: {
    marginTop: 25,
  },
  businessEncabezado: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  tipoText: {
    fontSize: 18,
    textAlign: 'center',
    color: Colors.defaultTextColor,
  },
  especialidadText: {
    fontSize: 14,
    textAlign: 'center',
    color: Colors.defaultTextColor,
  },
  rankinContainer: {
    width: 57,
    height: 57,
    alignItems: 'center',
    borderColor: Colors.gray,
    borderWidth: 0.5,
    borderRadius: 100,
  },
  rankinPosition: {
    position: 'absolute',
    top: 10,
    alignSelf: 'center',
    color: Colors.defaultTextColor,
  },
  rankinText: {
    fontSize: 10,
    color: Colors.defaultTextColor,
    marginTop: -8,
  },
  /* ESTILOS UBICACION BUSINESS */
  businessLocation: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: Colors.grayLight,
    height: 60,
    marginTop: 20,
    paddingLeft: 5,
  },
  locationIcon: {
    width: width / 3,
    alignItems: 'center',
  },
  locationText: {
    width: width / 3,
    textAlign: 'center',
    fontSize: 16,
    color: Colors.defaultTextColor,
  },
  date: {
    width: width / 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 12,
    color: Colors.defaultTextColor,
  },
  /* ESTILOS RESUMEN BUSINESS */
  businessResumen: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 5,
  },
  businessImagen: {
    marginLeft: 10,
    marginRight: 100,
  },
  businessRecomendaciones: {
    alignItems: 'center',
    marginLeft: 90,
    marginRight: 10,
  },
  businessRecomendacionesIcon: {
    width: 65,
    height: 65,
    marginTop: -10,
  },
  recomendacionesText: {
    marginTop: -10,
    fontSize: 14,
    color: Colors.defaultTextColor,
  },
  /* ESTILOS RECOMENDACIONES / RANKIN TRACKER */
  recomendacionesRankinContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
  trackerText: {
    marginTop: 15,
    fontSize: 12,
    color: Colors.defaultTextColor,
  },
  recomendacionesCounterContainer: {
    marginTop: -100,
    alignItems: 'center',
  },
  recomendacionesCounter: {
    width: 50,
    height: 50,
    borderWidth: 0.5,
    borderColor: Colors.gray,
    borderRadius: 100,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  recomendacionesCounterText: {
    textAlign: 'center',
    fontSize: 14,
    color: Colors.defaultTextColor,
  },
  mensajes: {
    marginTop: 20,
    alignItems: 'center',
  },
  mensajeSubirRankin: {
    fontSize: 12,
    color: Colors.defaultTextColor,
  },
  mensajeProcura: {
    fontSize: 14,
    color: Colors.defaultTextColor,
  },
});

/* TOP RANKIN */
const topRankin = [
  {
    name: 'Titanium',
    factor: 2,
  },
  {
    name: 'Platino',
    factor: 1.9,
  },
  {
    name: 'Oro',
    factor: 1.8,
  },
  {
    name: 'Plata',
    factor: 1.7,
  },
  {
    name: 'Bronce',
    factor: 1.6,
  },
];

/* CATEGORIAS */
const categorias = {
  compras: {
    id: 'compras',
    name: 'brand',
    text: 'Compras',
  },
  educacion: {
    id: 'educacion',
    name: 'school',
    text: 'Educación',
  },
  cafeyte: {
    id: 'cafeyte',
    name: 'coffee',
    text: 'Cafe y Té',
  },
  restaurantes: {
    id: 'restaurantes',
    name: 'food',
    text: 'Restaurantes',
  },
  bares: {
    id: 'bares',
    name: 'bar',
    text: 'Bares',
  },
  tiendas: {
    id: 'tiendas',
    name: 'store',
    text: 'Tiendas',
  },
  fiestas: {
    id: 'fiestas',
    name: 'ballons',
    text: 'Fiestas',
  },
};

/* Header de la lista de business rankin en TOP de CLIENTES */
function BusinessInfoHeader(props) {
  const {user, info, top} = props;
  const [
    percentageToNextBusiness,
    setPercentageToNextBusiness,
  ] = React.useState(0);

  React.useEffect(() => {
    getRecommendationsDifference(info);
  }, []);

  /* GET RECOMMENDATIONS DIFFERENCE */
  const getRecommendationsDifference = data => {
    const percentage =
      (data.total_recommendations * 100) / data.next_business_recommendations;
    setPercentageToNextBusiness(percentage);
  };

  return (
    <View style={[styles.container, {height: top ? 510 : 340}]}>
      {/* INFO GENERAL DEL BUSINESS */}
      {props.top && (
        <View style={styles.businessInfo}>
          {/* ENCABEZADO BUSINESS */}
          <View style={styles.businessEncabezado}>
            {/* ICON CATEGORIA BUSINESS */}
            <View style={styles.businessIcon}>
              <Icon
                name={categorias[info.category].name}
                size={55}
                background={Colors.business}
              />
            </View>
            {/* TIPO / ESPECIALIDAD BUSINESS */}
            <View style={styles.businessTipoEspecialidad}>
              <Text style={styles.tipoText}>{info.type}</Text>
              <Text style={styles.especialidadText}>{info.specialty}</Text>
            </View>
            {/* RANKIN BUSINESS */}
            {info.rankin <= 5 && <RankinTop rankin={info.rankin} />}
            {info.rankin > 5 && <Rankin rankin={info.rankin} />}
          </View>

          {/* UBICACION BUSINESS */}
          <View style={styles.businessLocation}>
            {/* UBICACION ICONO */}
            <View style={styles.locationIcon}>
              <Icon name="location" size={45} forceColor color={Colors.gray} />
            </View>
            {/* UBICACION BUSINESS */}
            <View>
              <Text style={styles.locationText}>{info.location}</Text>
            </View>
            {/* FECHA */}
            <View style={styles.date}>
              <Icon
                name="clock_timer"
                size={30}
                Borderless
                forceColor
                color={Colors.gray}
              />
              <Text style={styles.dateText}>{'17 Oct 2018'}</Text>
            </View>
          </View>
        </View>
      )}

      {/* IMAGEN DEL BUSINESS Y SU RANKIN */}
      <View style={styles.businessResumen}>
        <View style={styles.businessImagen}>
          <ProfilePicture linkname={user.linkname} size={55} Business />
        </View>

        <View style={styles.businessRecomendaciones}>
          {/* <Icon name="recommendation" size={70} Borderless /> */}
          <Image
            style={styles.businessRecomendacionesIcon}
            source={IconPack.recommendation}
          />
          <Text style={styles.recomendacionesText}>{`${
            info.total_recommendations
          }`}</Text>
        </View>
      </View>

      {/* TRACKER DE RECOMENDACIONES / RANKIN */}
      <View style={styles.recomendacionesRankinContainer}>
        <SemiCircleProgressBar
          radius={120}
          percentage={percentageToNextBusiness}>
          <View style={styles.recomendacionesCounterContainer}>
            <Text style={styles.trackerText}>{'Recomendaciones'}</Text>
            <View style={styles.recomendacionesCounter}>
              <Text style={styles.recomendacionesCounterText}>
                {info.total_recommendations}
              </Text>
            </View>
          </View>
        </SemiCircleProgressBar>

        <View
          style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
          {/* RANKIN DE MI BUSINESS */}
          {info.rankin <= 5 && <RankinTop rankin={info.rankin} />}
          {info.rankin > 5 && <Rankin rankin={info.rankin} />}

          {/* RANKIN DEL BUSINESS CON LA SIGUIENTE POSICION */}
          <View style={{marginLeft: 170}}>
            <RankinTop rankin={info.rankin - 1} />
          </View>
        </View>

        {/* MENSAJE RECOMENDACION */}
        <View style={styles.mensajes}>
          <Text style={styles.mensajeSubirRankin}>
            {'Las recomendaciones subiran tu rankin'}
          </Text>
          <Text style={styles.mensajeProcura}>
            {'¡Procura que tus clientes te recomienden!'}
          </Text>
        </View>
      </View>
    </View>
  );
}

const Rankin = ({rankin, borderless, size, textColor, noText}) => {
  const rankinContainer = {
    width: size || 57,
    height: size || 57,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Colors.gray,
    borderWidth: 0.5,
    borderRadius: 100,
  };

  return (
    <View
      style={[
        rankinContainer,
        borderless ? {borderColor: 'transparent'} : null,
      ]}>
      <Icon
        name="ribbon"
        Borderless
        size={45}
        factor={1}
        color={textColor ? textColor : Colors.gray}
      />
      <Text
        style={[
          styles.rankinPosition,
          {color: textColor ? textColor : Colors.defaultTextColor},
        ]}>
        {rankin}
      </Text>
      {!noText && (
        <Text
          style={[
            styles.rankinText,
            {color: textColor ? textColor : Colors.defaultTextColor},
          ]}>
          {'Rankin'}
        </Text>
      )}
    </View>
  );
};

const RankinTop = ({rankin, borderless, top, size, textColor, noText}) => {
  const rankinContainer = {
    width: size || 57,
    height: size || 57,
    alignItems: 'center',
    borderColor: Colors.gray,
    borderWidth: 0.5,
    borderRadius: 100,
  };

  return (
    <View
      style={[
        rankinContainer,
        borderless ? {borderColor: 'transparent'} : null,
      ]}>
      <Icon
        name={`top_${rankin}`}
        Borderless
        size={45}
        factor={top ? topRankin[rankin - 1].factor : 1}
        Colorless
      />
      {!noText && (
        <Text
          style={[
            styles.rankinText,
            {marginTop: -10},
            {color: textColor ? textColor : Colors.defaultTextColor},
          ]}>
          {topRankin[rankin - 1].name}
        </Text>
      )}
    </View>
  );
};

export {Rankin, RankinTop};

export default BusinessInfoHeader;
