import React from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';

import {Navigation} from 'react-native-navigation';

import Layout from '../../../constants/Layout';
import Colors from '../../../constants/Colors';
import Text from '../../../components/Text';
import Header from '../../../components/Header';

import SocialBlock from '../../../components/ProfilesBlocks/SocialBlock';
import RecommendationsBlock from '../../../components/ProfilesBlocks/RecommendationsBlock';
import DistinctionsBlock from '../../../components/ProfilesBlocks/DistinctionsBlock';
import ComplimentsBlock from '../../../components/ProfilesBlocks/ComplimentsBlock';
import ProductsBlock from '../../../components/ProfilesBlocks/ProductsBlock';
import NewsBlock from '../../../components/ProfilesBlocks/NewsBlock';
import StoriesBlock from '../../../components/ProfilesBlocks/StoriesBlock';
import SocialFeed from '../../../components/ProfilesBlocks/SocialFeed';
import CelebritySummaryBlock from '../../../components/ProfilesBlocks/CelebritySummaryBlock';
import InterestsBlock from '../../../components/ProfilesBlocks/InterestsBlock';
import CommonCardsBlock from '../../../components/ProfilesBlocks/CommonCardsBlock';
import RepresentanteBlock from '../../../components/ProfilesBlocks/RepresentanteBlock';
import PersonalVIPlLinkRequestBlock from '../../../components/ProfilesBlocks/PersonalVIPlLinkRequestBlock';

/* VIP */
import FollowBlock from '../../../components/ProfilesBlocks/FollowBlock';
import LinkPersonalBlock from '../../../components/ProfilesBlocks/LinkPersonalBlock';

/* DATA */
import {users} from '../../../testData/dataAdmon';

const height = Layout.window.height;

/* STYLES */
const styles = StyleSheet.create({
  mainContainer: {
    height: height,
    backgroundColor: Colors.grayLight,
  },
  socialBlockHeader: {
    elevation: 5,
    backgroundColor: 'white',
  },
  container: {
    height: 50,
    elevation: 2,
    backgroundColor: 'white',
    marginBottom: 5,
  },
});

const allData = {
  social: {
    foto: 'https://randomuser.me/api/portraits/women/75.jpg',
    pais: 'es',
    nombre: ['Tabata'],
    apellido: ['Casamadrid'],
    link: 'tabata0039',
    linkname: 'tabataCas0039',
    rol: 'youtube.com/watch?',
    descripcion: 'Holiwis',
    followers: 9500000,
    following: 531,
    category: 'Social',
    subCategory: 'Influencer',
    socialLinks: {
      my_link: 'my_link_social',
      hashtag: 'hashtag_social',
      facebook: 'facebook_social',
      twitter: 'twitter_social',
      instagram: 'instagram_social',
      linkedin: 'linkedin_social',
      youtube: 'youtube_social',
    },
  },
  summary: {
    rankin: 6,
    recommendations: 817,
    following: true,
    myRecommendations: 17,
    checkIn: 3,
  },
  linkBusiness: {
    messages: 3,
    emails: 57,
    agent: {
      nombre: 'Daniela',
      apellido_paterno: 'Valencia',
      link: 'danivalencia',
      linkname: 'danielavalenciaMX',
    },
  },
  interests: {
    interests: [
      'Idiomas',
      'color',
      '3D',
      'Iluminacion',
      'diseño de interiores',
      'materiales',
      'espacio',
      'holiwis, holiwis',
    ],
  },
  recommendations: {
    cards: [
      users.eonmarketing,
      users.itlatinoamericano,
      users.maido15,
      users.pujolPolanco,
    ],
  },
  awards: {
    awards: [
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
    ],
  },
  
  compliments: {
    compliments: [
      {
        id: 'trendy',
        compliment: 'Personalidad del momento',
        total: 11000,
      },
      {
        id: 'influencer',
        compliment: 'Marcador de tendencia',
        total: 431,
      },
      {
        id: 'sexier',
        compliment: 'La más sexy',
        total: 287,
      },
    ],
  },
  products: {
    products: [
      {
        img:
          'https://i.picsum.photos/id/188/200/300.jpg?hmac=zXtOB5OFoSyQezQ-b1qLr4dwQ3z1vpR-O6XAY7Dw79w',
        name: 'Ropa',
      },
      {
        img:
          'https://i.picsum.photos/id/833/200/300.jpg?hmac=b_oHYH2fuGTTRs2679QZsX0IQq4rTJaywPYnYnOGPtE',
        name: 'Maquillaje',
      },
      {
        img:
          'https://i.picsum.photos/id/191/200/300.jpg?hmac=CHbfFOcICYpJ4GXstpLztK5ds_l5NYOdgHORuCEIY_g',
        name: 'Recetas',
      },
      {
        img:
          'https://i.picsum.photos/id/605/200/300.jpg?hmac=XxO9Fq91nFhrH3zq-9AlrpU84EnKslY5CeTA_6dBlRg',
        name: 'Zapatos',
      },
    ],
  },
  news: {
    news: [
      {
        img:
          'https://i.picsum.photos/id/339/200/300.jpg?hmac=rX8fDMMSNKZhzvcqJCduRuj33pXDgDlJiqOMqSuNwOo',
        title: 'Yomi sushi',
        content:
          'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry´s standard dummy text ever since the 1500s.',
        date: {
          year: '2020',
          month: 'Julio',
          day: '13',
        },
      },
      {
        img:
          'https://i.picsum.photos/id/369/200/300.jpg?hmac=ZM5SPtUsEjxc4HjsZXj3DAHeKWSaZV6r8sJMGiLYIJ8',
        title: '2',
        content:
          'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry´s standard dummy text ever since the 1500s.',
        date: {
          year: '2020',
          month: 'Julio',
          day: '13',
        },
      },
      {
        img:
          'https://i.picsum.photos/id/55/200/300.jpg?hmac=VjTl-6Y6NNyUWof_G17-KlocVl0QuUoxpir1beSTl8A',
        title: '3',
        content:
          'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry´s standard dummy text ever since the 1500s.',
        date: {
          year: '2020',
          month: 'Julio',
          day: '13',
        },
      },
    ],
  },
  stories: {
    stories: [
      {
        img:
          'https://i.picsum.photos/id/969/200/300.jpg?hmac=c2_qrnkxo7rpO3oK-Lto9vTVaCKc5sow7GjMpKiPQN8',
        title: 'Martes de alitas',
        counter: 4,
      },
      {
        img:
          'https://i.picsum.photos/id/390/200/300.jpg?hmac=m2OBPNcWKpibmpjeOD_5Bnl5rx-6WjYtzfGnleMgyhU',
        title: 'Destilados de algo',
        counter: 40,
      },
      {
        img:
          'https://i.picsum.photos/id/511/200/300.jpg?hmac=3pjxomHmNfWivxE47hYNY3VdnJTTJtcRJmQ3ihqJcBA',
        title: 'Viernes de chilaquiles',
        counter: 54,
      },
      {
        img:
          'https://i.picsum.photos/id/282/200/300.jpg?hmac=CVnHWoW4uSir_3zYiJzNPVs8XMSyf968WjkWvPlwu3g',
        title: 'Cervezas al 2 x 1',
        counter: 44,
      },
      {
        img:
          'https://i.picsum.photos/id/947/200/300.jpg?hmac=xWi3fTvb1sKlC9ahIla_xr0F3Bjq9UIpXx19e7EMG4o',
        title: 'Aguas frescas gratis',
        counter: 13,
      },
      {
        img:
          'https://i.picsum.photos/id/477/200/300.jpg?hmac=Y-uy4_ZZZ6HOZCxdiN04OOypBZ3y2dY2gAfu9MvZMSE',
        title: 'Noche de nachos',
        counter: 100,
      },
    ],
  },
  socialFeed: {},
  tipo: 5,
  vip: 1,
};

class PersonalVIP extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      linkname: this.props.linkname,
      user: {},
      data: {},
      loading: true,
      error: null,
      vipState: 0,
    };
  }
  

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    this.setState({
      data: allData,
      loading: false,
      vipState: allData.vip,
    });
  };

  goBack = () => {
    Navigation.dismissOverlay(this.props.componentId);
  };

  setDarkMode = darkMode => {
    const updatedData = this.state.data;
    const vipState = this.state.vipState;
    const falseValue = vipState === 2 ? 1 : vipState;
    updatedData.vip = darkMode ? 2 : falseValue;

    this.setState({
      data: updatedData,
    });
  };

  render() {
    const {user, data, loading, error} = this.state;

    const backgroundColor =
      data.vip === 2
        ? {backgroundColor: 'black'}
        : {backgroundColor: Colors.grayLight};

    return (
      <ScrollView style={[styles.mainContainer, backgroundColor]}>
        {!loading && !error && (
          <View>
            <View style={[styles.socialBlockHeader, backgroundColor]}>
              {/* HEADER */}
              <Header
                goBack={this.goBack}
                color={data.vip === 2 ? 'black' : null}
              />
              {/* SOCIAL BLOCK */}
              <SocialBlock
                linkname={''}
                data={{...data.social, tipo: data.tipo, vip: data.vip}}
                setDarkMode={darkMode => {
                  this.setDarkMode(darkMode);
                }}
                
              />
            </View>

            {/* VIP FOLLOW BLOCK */}
             <FollowBlock
              linkname={''}
              data={{
                following: data.summary.following,
                tipo: data.tipo,
                vip: data.vip,
              }}
            /> 

            {/* CELEBRITY SUMMARY BLOCK */}
            <CelebritySummaryBlock
              linkname={''}
              data={{
                ...data.social,
                ...data.summary,
                tipo: data.tipo,
                vip: data.vip,
              }}
            />

            {/* LINK BUSINESS BLOCK */}
            <LinkPersonalBlock
              linkname={''}
              data={{
                ...data.linkBusiness,
                tipo: data.tipo,
                vip: data.vip,
                phoneData: [
                  {
                    icon: 'phone',
                    type: 'Teléfono',
                    data: '7196872',
                  },
                  {
                    icon: 'mobile',
                    type: 'Celular',
                    data: '7712589534',
                  },
                  {
                    icon: 'message_send',
                    type: 'Mensajes',
                    data: '7715876924',
                  },
                ],
                emailData: [
                  {
                    icon: 'my_link',
                    type: 'My-Link',
                    data: 'rick@my-link.com',
                  },
                  {
                    icon: 'email',
                    type: 'Correo',
                    data: 'mlopez@gmail.com',
                  },
                ],
                documents: [
                  {
                    name: 'tab_internet',
                    type: 'Pasaporte',
                  },
                  {
                    name: 'tab_personal',
                    type: 'Identificación personal',
                  },
                  {
                    name: 'tab_car',
                    type: 'Licencia de conducir',
                  },
                  {
                    name: 'tab_school',
                    type: 'Cédula profesional',
                  },
                  {
                    name: 'tab_work',
                    type: 'Currículum',
                  },
                ],
              }}
            />

            {/*REPRESENTANTE */}
            <RepresentanteBlock linkname={''}
              data={{...data.linkBusiness, tipo: data.tipo, vip: data.vip}}/>

            {/* INTERESTS BLOCK */}
            <InterestsBlock linkname={''}   data={{...data.interests, tipo: data.tipo, vip: data.vip}}/>  

            {/*  RECOMMENDATIONS BLOCK */}
            <RecommendationsBlock
              linkname={''}
              data={{
                ...data.recommendations,
                ...data.social,
                tipo: data.tipo,
                vip: data.vip,
              }}
            />

            {/* DISTINCTIONS BLOCK */}
            <DistinctionsBlock
              linkname={''}
              data={{
                ...data.awards,
                ...data.social,
                tipo: data.tipo,
                vip: data.vip,
              }}
            />

            {/* COMPLIMENTS BLOCK */}
            <ComplimentsBlock
              linkname={''}
              data={{...data.compliments, tipo: data.tipo, vip: data.vip}}
            />

            {/* PRODUCTS BLOCK */}
            <ProductsBlock
              linkname={''}
              data={{...data.products, tipo: data.tipo, vip: data.vip}}
            />

            {/* NEWS BLOCK */}
            <NewsBlock
              linkname={''}
              data={{
                ...data.news,
                ...data.social,
                tipo: data.tipo,
                vip: data.vip,
              }}
            />

            {/* COMPLIMENTS BLOCK */}
            <CommonCardsBlock
              linkname={''}
              data={{...data.commonCards, tipo: data.tipo, vip: data.vip}}
            />

            {/* STORIES BLOCK */}
            <StoriesBlock
              linkname={''}
              data={{...data.stories, tipo: data.tipo, vip: data.vip}}
            />

            {/* SOCIAL FEED */}
            <SocialFeed
              linkname={''}
              data={{...data.socialFeed, tipo: data.tipo, vip: data.vip}}
            />
          </View>
        )}
      </ScrollView>
    );
  }
}

export default PersonalVIP;
