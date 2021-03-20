import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';

import {Navigation} from 'react-native-navigation';

import {Text, Icon, ProfilePicture} from '@my-link-corporation/components';
import Colors from '@my-link-corporation/components/constants/Colors';
import Layout from '@my-link-corporation/components/constants/Layout';
import MenuTabs from '../../MenuTabs';
import {Rankin, RankinTop} from '../../BusinessInfoHeader';

import {PromotionsList} from '../PromotionsBlock';

const width = Layout.window.width;

/* STYLES */
const styles = StyleSheet.create({
  /* MAIN CONTAINER STYLES */
  mainContainer: {
    elevation: 2,
    backgroundColor: 'white',
    marginBottom: 5,
  },
  /* BLOCK NAME STYLES */
  blockName: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  blockNameText: {
    width: width / 1.3,
    fontSize: 16,
    color: Colors.defaultTextColor,
    marginLeft: 10,
    marginRight: 10,
  },
  seeAll: {
    fontSize: 14,
    color: Colors.personal,
  },
  /* SERVICES LIST */
  menuTabs: {
    marginTop: -20,
    borderBottomWidth: 0.5,
    borderColor: Colors.gray,
  },
  /* TOP CONTAINER STYLES */
  topContainer: {
    width: width,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: 10,
    marginBottom: 10,
  },
  topContainerItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  topContainerText: {
    fontSize: 14,
    color: Colors.defaultTextColor,
    marginLeft: 10,
  },
  /* BUSINESS LIST STYLES */
  businessList: {
    backgroundColor: Colors.grayLight,
  },
  businessItem: {
    width: 85,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  businessName: {
    fontSize: 12,
    color: Colors.defaultTextColor,
    marginTop: 5,
  },
  /* CONTENT STYLES */
  contentContainer: {
    width: width,
    elevation: 10,
    backgroundColor: 'white',
  },
  businessImgs: {
    width: '100%',
    height: 250,
  },
  businessImgScroll: {
    width: '100%',
    height: '100%',
  },
  businessImg: {
    width: width,
    height: 250,
    resizeMode: 'cover',
  },
  businessImgSelector: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 15,
  },
  businessImgSelectorOption: {
    width: 12,
    height: 12,
    borderRadius: 360,
    borderWidth: 1.5,
    borderColor: 'white',
    backgroundColor: Colors.business,
    elevation: 2,
    marginLeft: 2,
    marginRight: 2,
  },
  businessPicture: {
    position: 'absolute',
    top: 20,
    right: 15,
  },
  businessDetails: {
    elevation: 0,
  },
  businessInfo: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: 5,
    marginBottom: 5,
  },
  businessInfoName: {
    width: '50%',
    fontSize: 18,
    color: Colors.defaultTextColor,
  },
  businessLocation: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 14,
  },
  businessLocationText: {
    width: '47%',
    fontSize: 16,
    color: Colors.defaultTextColor,
  },
  recommendationsContainer: {
    alignSelf: 'center',
    alignItems: 'center',
  },
  recommendations: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
  },
  recommendationsTotal: {
    fontSize: 18,
    color: Colors.eerieBlack,
  },
  recommendationsText: {
    fontSize: 12,
    color: Colors.defaultTextColor,
  },
  businessOptions: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: 5,
    marginBottom: 10,
  },
  businessOption: {
    alignItems: 'center',
  },
  businessOptionCounter: {
    width: 27,
    height: 27,
    position: 'absolute',
    top: -5,
    right: 5,
    elevation: 2,
    backgroundColor: Colors.business,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 360,
    alignItems: 'center',
    justifyContent: 'center',
  },
  businessOptionCounterText: {
    fontSize: 12,
    color: 'white',
  },
  businessOptionText: {
    fontSize: 14,
    color: Colors.defaultTextColor,
  },
});

class DirectoryBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentView: 0,
      topContainerItems: [],
      businessData: [],
      itemSelected: 0,
      loading: true,
      currentImg: 0,
      activePromotion: 0,
      offValue: width / 1.7,
      goToFirstPromo: false,
    };

    this.menu = ['Directorio', 'Promociones'];
    this.businessOption = [
      {
        counter: true,
        icon: 'brand',
        text: 'Promociones',
      },
      {
        icon: 'wallet_save',
        text: 'Guardar',
        onPress: this.saveCard,
      },
      {
        icon: 'recommendation',
        text: 'Recomendar',
        onPress: this.makeRecommendation,
        colorless: true,
      },
    ];

    this.scrollImgs = React.createRef(null);

    this.saveCard = this.saveCard.bind(this);
    this.makeRecommendation = this.makeRecommendation.bind(this);
    this.setActivePromotion = this.setActivePromotion.bind(this);
  }

  getData = () => {
    const promotions = [
      {
        title: 'Festeja tu Cumpleaños',
        img:
          'https://i.picsum.photos/id/188/200/300.jpg?hmac=zXtOB5OFoSyQezQ-b1qLr4dwQ3z1vpR-O6XAY7Dw79w',
        valid: 'Todo el mes de Enero',
      },
      {
        title: 'Festeja tu Cumpleaños',
        img:
          'https://i.picsum.photos/id/833/200/300.jpg?hmac=b_oHYH2fuGTTRs2679QZsX0IQq4rTJaywPYnYnOGPtE',
        valid: 'Todo el mes de Febrero',
      },
      {
        title: 'Festeja tu Cumpleaños',
        img:
          'https://i.picsum.photos/id/191/200/300.jpg?hmac=CHbfFOcICYpJ4GXstpLztK5ds_l5NYOdgHORuCEIY_g',
        valid: 'Todo el mes de Marzo',
      },
      {
        title: 'Festeja tu Cumpleaños',
        img:
          'https://i.picsum.photos/id/605/200/300.jpg?hmac=XxO9Fq91nFhrH3zq-9AlrpU84EnKslY5CeTA_6dBlRg',
        valid: 'Todo el mes de Abril',
      },
      {
        title: 'Festeja tu Cumpleaños',
        img:
          'https://i.picsum.photos/id/447/200/300.jpg?hmac=WubV-ZWbMgXijt9RLYedmkiaSer2IFiVD7xek928gC8',
        valid: 'Todo el mes de Mayo',
      },
      {
        title: 'Festeja tu Cumpleaños',
        img:
          'https://i.picsum.photos/id/188/200/300.jpg?hmac=zXtOB5OFoSyQezQ-b1qLr4dwQ3z1vpR-O6XAY7Dw79w',
        valid: 'Todo el mes de Enero',
      },
      {
        title: 'Festeja tu Cumpleaños',
        img:
          'https://i.picsum.photos/id/833/200/300.jpg?hmac=b_oHYH2fuGTTRs2679QZsX0IQq4rTJaywPYnYnOGPtE',
        valid: 'Todo el mes de Febrero',
      },
      {
        title: 'Festeja tu Cumpleaños',
        img:
          'https://i.picsum.photos/id/191/200/300.jpg?hmac=CHbfFOcICYpJ4GXstpLztK5ds_l5NYOdgHORuCEIY_g',
        valid: 'Todo el mes de Marzo',
      },
      {
        title: 'Festeja tu Cumpleaños',
        img:
          'https://i.picsum.photos/id/605/200/300.jpg?hmac=XxO9Fq91nFhrH3zq-9AlrpU84EnKslY5CeTA_6dBlRg',
        valid: 'Todo el mes de Abril',
      },
      {
        title: 'Festeja tu Cumpleaños',
        img:
          'https://i.picsum.photos/id/447/200/300.jpg?hmac=WubV-ZWbMgXijt9RLYedmkiaSer2IFiVD7xek928gC8',
        valid: 'Todo el mes de Mayo',
      },
      {
        title: 'Festeja tu Cumpleaños',
        img:
          'https://i.picsum.photos/id/188/200/300.jpg?hmac=zXtOB5OFoSyQezQ-b1qLr4dwQ3z1vpR-O6XAY7Dw79w',
        valid: 'Todo el mes de Enero',
      },
      {
        title: 'Festeja tu Cumpleaños',
        img:
          'https://i.picsum.photos/id/833/200/300.jpg?hmac=b_oHYH2fuGTTRs2679QZsX0IQq4rTJaywPYnYnOGPtE',
        valid: 'Todo el mes de Febrero',
      },
      {
        title: 'Festeja tu Cumpleaños',
        img:
          'https://i.picsum.photos/id/191/200/300.jpg?hmac=CHbfFOcICYpJ4GXstpLztK5ds_l5NYOdgHORuCEIY_g',
        valid: 'Todo el mes de Marzo',
      },
      {
        title: 'Festeja tu Cumpleaños',
        img:
          'https://i.picsum.photos/id/605/200/300.jpg?hmac=XxO9Fq91nFhrH3zq-9AlrpU84EnKslY5CeTA_6dBlRg',
        valid: 'Todo el mes de Abril',
      },
      {
        title: 'Festeja tu Cumpleaños',
        img:
          'https://i.picsum.photos/id/447/200/300.jpg?hmac=WubV-ZWbMgXijt9RLYedmkiaSer2IFiVD7xek928gC8',
        valid: 'Todo el mes de Mayo',
      },
      {
        title: 'Festeja tu Cumpleaños',
        img:
          'https://i.picsum.photos/id/188/200/300.jpg?hmac=zXtOB5OFoSyQezQ-b1qLr4dwQ3z1vpR-O6XAY7Dw79w',
        valid: 'Todo el mes de Enero',
      },
      {
        title: 'Festeja tu Cumpleaños',
        img:
          'https://i.picsum.photos/id/833/200/300.jpg?hmac=b_oHYH2fuGTTRs2679QZsX0IQq4rTJaywPYnYnOGPtE',
        valid: 'Todo el mes de Febrero',
      },
      {
        title: 'Festeja tu Cumpleaños',
        img:
          'https://i.picsum.photos/id/191/200/300.jpg?hmac=CHbfFOcICYpJ4GXstpLztK5ds_l5NYOdgHORuCEIY_g',
        valid: 'Todo el mes de Marzo',
      },
      {
        title: 'Festeja tu Cumpleaños',
        img:
          'https://i.picsum.photos/id/605/200/300.jpg?hmac=XxO9Fq91nFhrH3zq-9AlrpU84EnKslY5CeTA_6dBlRg',
        valid: 'Todo el mes de Abril',
      },
      {
        title: 'Festeja tu Cumpleaños',
        img:
          'https://i.picsum.photos/id/447/200/300.jpg?hmac=WubV-ZWbMgXijt9RLYedmkiaSer2IFiVD7xek928gC8',
        valid: 'Todo el mes de Mayo',
      },
    ];

    const response = [
      {
        linkname: '',
        name: 'A',
        imgs: [
          'https://i.picsum.photos/id/650/200/200.jpg',
          'https://i.picsum.photos/id/350/200/200.jpg',
          'https://i.picsum.photos/id/450/200/200.jpg',
        ],
        location: 'Local 136, 2° piso',
        recommendations: 163,
        ranking: 6,
        promotions: promotions.slice(0, 5),
      },
      {
        linkname: '',
        name: 'B',
        imgs: [
          'https://i.picsum.photos/id/100/200/200.jpg',
          'https://i.picsum.photos/id/200/200/200.jpg',
          'https://i.picsum.photos/id/300/200/200.jpg',
          'https://st4.depositphotos.com/1801497/22779/v/450/depositphotos_227794040-stock-illustration-vector-logo-belgian-waffles-dark.jpg',
        ],
        location: 'Local 136, 2° piso',
        recommendations: 163,
        ranking: 1,
        promotions: promotions.slice(5, 10),
      },
      {
        linkname: '',
        name: 'C',
        imgs: [
          'https://i.picsum.photos/id/177/200/200.jpg',
          'https://i.picsum.photos/id/179/200/200.jpg',
          'https://i.picsum.photos/id/173/200/200.jpg',
        ],
        location: 'Local 136, 2° piso',
        recommendations: 163,
        ranking: 2,
        promotions: promotions.slice(10, 15),
      },
      {
        linkname: '',
        name: 'D',
        imgs: [
          'https://i.picsum.photos/id/175/200/200.jpg',
          'https://i.picsum.photos/id/178/200/200.jpg',
          'https://i.picsum.photos/id/168/200/200.jpg',
          'https://i.picsum.photos/id/178/200/200.jpg',
        ],
        location: 'Local 136, 2° piso',
        recommendations: 163,
        ranking: 3,
        promotions: promotions.slice(15, 20),
      },
      {
        linkname: '',
        name: 'E',
        imgs: [
          'https://i.picsum.photos/id/650/200/200.jpg',
          'https://i.picsum.photos/id/350/200/200.jpg',
          'https://i.picsum.photos/id/450/200/200.jpg',
        ],
        location: 'Local 136, 2° piso',
        recommendations: 163,
        ranking: 4,
        promotions: promotions.slice(0, 5),
      },
      {
        linkname: '',
        name: 'F',
        imgs: [
          'https://i.picsum.photos/id/100/200/200.jpg',
          'https://i.picsum.photos/id/200/200/200.jpg',
          'https://i.picsum.photos/id/300/200/200.jpg',
          'https://st4.depositphotos.com/1801497/22779/v/450/depositphotos_227794040-stock-illustration-vector-logo-belgian-waffles-dark.jpg',
        ],
        location: 'Local 136, 2° piso',
        recommendations: 163,
        ranking: 8,
        promotions: promotions.slice(5, 10),
      },
    ];

    let totalPromotions = 0;

    response.map(item => {
      totalPromotions += item.promotions.length;
    });

    const topItems = [
      {
        icon: 'business',
        text: 'Negocios',
        total: response.length,
      },
      {
        icon: 'brand',
        text: 'Promociones',
        total: totalPromotions < 100 ? totalPromotions : '+99',
      },
    ];

    this.setState({
      businessData: response,
      topContainerItems: topItems,
      loading: false,
    });
  };

  componentDidMount() {
    this.getData();
  }

  handleSeeAll = () => {
    console.log('button pressed');
    Navigation.push(this.props.componentId, {
      component: {
        name: 'my-link.Directory',
        passProps: {
          data: this.props.data,
        },
      },
    });
  };

  changeCurrentView = view => {
    this.setState({
      currentView: view,
    });
  };

  selectBusiness = index => {
    const currentView = this.state.currentView;

    this.setState(
      {
        itemSelected: index,
        currentImg: 0,
      },
      () => (currentView === 0 ? this.scrollImgTo(0) : this.backToFirstPromo()),
    );
  };

  scrollImgTo = img => {
    if (this.scrollImgs) {
      this.scrollImgs.current.scrollTo({
        x: width * img,
        y: 0,
        animated: false,
      });
    }
  };

  changeCurrentImg = img => {
    this.setState({currentImg: img});
  };

  backToFirstPromo = () => {
    this.setState({
      activePromotion: 0,
      goToFirstPromo: true,
    });
  };

  saveCard = () => {
    console.log('saveCard');
  };

  makeRecommendation = () => {
    console.log('makeRecommendation');
  };

  setActivePromotion = active => {
    this.setState({
      activePromotion: active,
      goToFirstPromo: active === 0,
    });
  };

  promotionOptions = (save = false) => {
    if (save) {
      console.log('Save!!!');
    } else {
      console.log('Share!!!');
    }
  };

  render() {
    const {
      currentView,
      currentImg,
      topContainerItems,
      businessData,
      itemSelected,
      loading,
      activePromotion,
      offValue,
      goToFirstPromo,
    } = this.state;

    const {data} = this.props;

    const services = data.services;
    const vip = data.vip === 1;
    const vipDark = data.vip === 2;

    const backgroundColor = vipDark
      ? {backgroundColor: Colors.jet}
      : {backgroundColor: 'white'};

    const backgroundColor_2 = vipDark
      ? {backgroundColor: 'black'}
      : {backgroundColor: 'white'};

    const textColor = vipDark
      ? {color: Colors.silverChalice}
      : {color: Colors.defaultTextColor};

    const textColor_2 = vipDark
      ? {color: Colors.golden}
      : vip
      ? {color: 'black'}
      : {color: Colors.personal};

    const textColor_3 = vipDark
      ? {color: Colors.grayLight}
      : {color: Colors.defaultTextColor};

    return (
      <View style={[styles.mainContainer, backgroundColor]}>
        <View style={[{elevation: 10}, backgroundColor]}>
          {/* BLOCK NAME */}
          <View style={styles.blockName}>
            <Text style={[styles.blockNameText, textColor]}>
              {'Directorio'}
            </Text>
            <TouchableOpacity onPress={() => this.handleSeeAll()}>
              <Text style={[styles.seeAll, textColor_2]}>{'Ver todo'}</Text>
            </TouchableOpacity>
          </View>

          {/* MENU TABS */}
          <View style={styles.menuTabs}>
            {/* MENU */}
            <MenuTabs
              opciones={this.menu}
              seleccion={currentView}
              seleccionar={this.changeCurrentView}
              fontSize={18}
              personal={!vipDark}
              textColor={vipDark ? Colors.silverMetallic : false}
            />
          </View>

          {/* TOP CONTAINER */}
          {!loading && (
            <View style={styles.topContainer}>
              {topContainerItems.map((item, index) => (
                <TopContainerItem
                  key={index}
                  item={item}
                  selected={index === currentView}
                  vipDark={vipDark}
                  textColor={textColor_3}
                />
              ))}
            </View>
          )}
        </View>

        {!loading && (
          <View>
            {/* BUSINESS LIST */}
            <View style={[styles.businessList, backgroundColor]}>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={businessData}
                renderItem={({item, index}) => (
                  <TouchableOpacity onPress={() => this.selectBusiness(index)}>
                    <BusinessItem
                      item={item}
                      selected={itemSelected === index}
                      colors={[backgroundColor]}
                    />
                  </TouchableOpacity>
                )}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>

            {currentView === 0 && (
              <View>
                {/* BUSINESS SELECTED INFO */}
                <View style={styles.contentContainer}>
                  <View style={styles.businessImgs}>
                    {/* BUSINESS IMGS */}
                    <ScrollView
                      ref={this.scrollImgs}
                      style={styles.businessImgScroll}
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      pagingEnabled
                      onScroll={event => {
                        if (event.nativeEvent.contentOffset.x % width === 0) {
                          const index =
                            event.nativeEvent.contentOffset.x / width;
                          this.changeCurrentImg(index);
                        }
                      }}>
                      {businessData[itemSelected].imgs.map((item, index) => {
                        return (
                          <Image
                            key={index}
                            style={styles.businessImg}
                            source={{uri: item}}
                          />
                        );
                      })}
                    </ScrollView>
                    <View style={styles.businessImgSelector}>
                      {businessData[itemSelected].imgs.map((item, index) => (
                        <TouchableOpacity
                          style={[
                            styles.businessImgSelectorOption,
                            {
                              backgroundColor:
                                index !== currentImg
                                  ? Colors.business
                                  : Colors.golden,
                            },
                          ]}
                          key={index}
                          onPress={() => this.scrollImgTo(index)}
                        />
                      ))}
                    </View>

                    {/* BUSINESS PROPILE PICTURE */}
                    <View style={styles.businessPicture}>
                      <ProfilePicture
                        linkname={businessData[itemSelected].linkname}
                        size={60}
                        Business
                      />
                    </View>
                  </View>

                  {/* BUSINESS INFO */}
                  <View style={[styles.businessDetails, backgroundColor]}>
                    <View style={styles.businessInfo}>
                      <Icon
                        size={55}
                        factor={0.8}
                        background={Colors.business}
                        forceColor
                        color={'white'}
                      />
                      <Text style={[styles.businessInfoName, textColor_3]}>
                        {businessData[itemSelected].name}
                      </Text>
                      <View>
                        {businessData[itemSelected].ranking <= 5 && (
                          <RankinTop
                            rankin={businessData[itemSelected].ranking}
                            size={45}
                            textColor={vipDark ? 'white' : null}
                            borderless
                          />
                        )}
                        {businessData[itemSelected].ranking > 5 && (
                          <Rankin
                            rankin={businessData[itemSelected].ranking}
                            size={45}
                            textColor={vipDark ? 'white' : null}
                            borderless
                          />
                        )}
                      </View>
                    </View>

                    {/* BUSINESS LOCATION */}
                    <View style={styles.businessLocation}>
                      <Icon name="location" size={40} factor={0.8} Borderless />
                      <Text style={[styles.businessLocationText, textColor_3]}>
                        {businessData[itemSelected].location}
                      </Text>
                      <View style={styles.recommendationsContainer}>
                        <View style={styles.recommendations}>
                          <Text
                            style={[styles.recommendationsTotal, textColor]}>
                            {businessData[itemSelected].recommendations}
                          </Text>
                          <Icon
                            name="recommendation"
                            size={40}
                            factor={0.8}
                            Borderless
                            Colorless
                          />
                        </View>
                        <Text style={[styles.recommendationsText, textColor_3]}>
                          {'Recomendaciones'}
                        </Text>
                      </View>
                    </View>

                    {/* BUSINESS OPTIONS */}
                    <View style={styles.businessOptions}>
                      {this.businessOption.map((item, index) => (
                        <BusinessOption
                          key={index}
                          item={item}
                          promotions={
                            businessData[itemSelected].promotions.length
                          }
                          textColor={textColor_3}
                          vipDark={vipDark}
                        />
                      ))}
                    </View>
                  </View>
                </View>
              </View>
            )}

            {currentView === 1 && (
              <View style={[styles.contentContainer, backgroundColor]}>
                <PromotionsList
                  data={businessData[itemSelected].promotions}
                  linkname={this.props.linkname}
                  activePromotion={activePromotion}
                  offValue={offValue}
                  setActivePromotion={this.setActivePromotion}
                  promotionOptions={this.promotionOptions}
                  resetScroll={goToFirstPromo}
                  vipDark={vipDark}
                />
              </View>
            )}
          </View>
        )}
      </View>
    );
  }
}

const TopContainerItem = ({item, selected, vipDark, textColor}) => {
  const activeColor = vipDark ? Colors.jet : Colors.grayLight;
  const inactiveColor = vipDark ? Colors.jet : 'white';

  const selectedStyle = {
    backgroundColor: selected ? activeColor : inactiveColor,
    padding: 5,
    borderRadius: 5,
  };

  return (
    <View style={[styles.topContainerItem, selectedStyle]}>
      <Icon
        name={item.icon}
        size={45}
        factor={0.8}
        forceColor
        color={Colors.grayBold}
        background={Colors.grayLight}
      />
      <Text style={[styles.topContainerText, textColor]}>{`${item.total} ${
        item.text
      }`}</Text>
    </View>
  );
};

const BusinessItem = ({item, selected, colors}) => {
  const selectedStyle = {
    elevation: selected ? 10 : 0,
    borderRightWidth: 0.5,
    borderLeftWidth: 0.5,
    borderColor: selected ? Colors.gray : 'transparent',
  };

  return (
    <View style={[styles.businessItem, selectedStyle, colors[0]]}>
      <ProfilePicture linkname={item.linkname} size={50} Business />
      <Text style={styles.businessName}>{item.name}</Text>
    </View>
  );
};

const BusinessOption = ({item, promotions, textColor, vipDark}) => {
  return (
    <TouchableOpacity
      style={styles.businessOption}
      onPress={() => (item.onPress ? item.onPress() : null)}>
      {item.counter && (
        <View style={styles.businessOptionCounter}>
          <Text style={styles.businessOptionCounterText}>
            {promotions < 100 ? promotions : '+99'}
          </Text>
        </View>
      )}
      <Icon
        name={item.icon}
        size={45}
        factor={0.8}
        Borderless
        Colorless={item.colorless}
        forceColor
        color={vipDark ? 'white' : Colors.gray}
      />
      <Text style={[styles.businessOptionText, textColor]}>{item.text}</Text>
    </TouchableOpacity>
  );
};

export default DirectoryBlock;
