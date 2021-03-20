import React from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';

import {Navigation} from 'react-native-navigation';

import Layout from '../../../constants/Layout';
import Colors from '../../../constants/Colors';
import Text from '../../../components/Text';
import Header from '../../../components/Header';

import SocialBlock from '../../../components/ProfilesBlocks/SocialBlock';
import SummaryBlock from '../../../components/ProfilesBlocks/SummaryBlock';
import LinkBusinessBlock from '../../../components/ProfilesBlocks/LinkBusinessBlock';
import RecommendationsBlock from '../../../components/ProfilesBlocks/RecommendationsBlock';
import DistinctionsBlock from '../../../components/ProfilesBlocks/DistinctionsBlock';
import ComplimentsBlock from '../../../components/ProfilesBlocks/ComplimentsBlock';
import ProductsBlock from '../../../components/ProfilesBlocks/ProductsBlock';
import StoriesBlock from '../../../components/ProfilesBlocks/StoriesBlock';
import SocialFeed from '../../../components/ProfilesBlocks/SocialFeed';

import LinkBusinessVIPBlock from '../../../components/ProfilesBlocks/LinkBusinessVIPBlock';

import SuggestionsBlock from '../../../components/ProfilesBlocks/ComplaintsBlock';
import PromotionsBlock from '../../../components/ProfilesBlocks/PromotionsBlock';
import ServicesBlock from '../../../components/ProfilesBlocks/ServicesBlock';
import StaffBlock from '../../../components/ProfilesBlocks/StaffBlock';
import BranchesBlock from '../../../components/ProfilesBlocks/BranchesBlock';

/* DATA */
import {
  users,
  misServiciosResponse,
  colaboradoresResponse,
} from '../../../testData/dataAdmon';

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
    foto: users.tybg2345.foto,
    pais: 'es',
    nombre: [users.tybg2345.nombre],
    apellido: [],
    link: 'tybg2345',
    linkname: 'tybgrill2345',
    rol: 'youtube.com/watch?',
    descripcion: 'Los mejores waffles de la ciudad',
    followers: 9500000,
    following: 531,
    socialTitle: 'Influencer',
    socialDescription: 'hello',
    category: 'food',
    subCategory: 'food',
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
    premium: true,
  },
  linkBusiness: {
    messages: 3,
    emails: 57,
    scheduleData: [
      {
        opening: {
          hour: 7,
          minutes: 45,
          pm: false,
        },
        closing: {
          hour: 16,
          minutes: 5,
          pm: true,
        },
        opens: true,
      },
      {
        opening: {
          hour: 8,
          minutes: 15,
          pm: false,
        },
        closing: {
          hour: 15,
          minutes: 15,
          pm: true,
        },
        opens: true,
      },
      {
        opening: {
          hour: 9,
          minutes: 30,
          pm: false,
        },
        closing: {
          hour: 18,
          minutes: 35,
          pm: true,
        },
        opens: true,
      },
      {
        opening: {
          hour: 10,
          minutes: 30,
          pm: false,
        },
        closing: {
          hour: 17,
          minutes: 45,
          pm: true,
        },
        opens: true,
      },
      {
        opening: {
          hour: 9,
          minutes: 30,
          pm: false,
        },
        closing: {
          hour: 20,
          minutes: 55,
          pm: true,
        },
        opens: true,
      },
      {
        opening: {
          hour: 8,
          minutes: 30,
          pm: false,
        },
        closing: {
          hour: 16,
          minutes: 5,
          pm: true,
        },
        opens: false,
      },
      {
        opening: {
          hour: 10,
          minutes: 30,
          pm: false,
        },
        closing: {
          hour: 14,
          minutes: 25,
          pm: true,
        },
        opens: false,
      },
    ],
    agent: {
      nombre: 'Daniela',
      apellido_paterno: 'Valencia',
      link: 'danivalencia',
      linkname: 'danielavalenciaMX',
    },
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
        compliment: 'Limpio',
        total: 11000,
      },
      {
        id: 'influencer',
        compliment: 'Honesto',
        total: 431,
      },
      {
        id: 'sexier',
        compliment: 'Amable',
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
  promotions: {
    promotions: [
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
    ],
  },
  services: {
    services: [...misServiciosResponse.data.servicios],
  },
  staff: {
    staff: colaboradoresResponse.data.colaboradores,
  },
  branches: {
    branches: [
      {
        ...users.tybg2345,
        domicilio: {
          calle: 'Boulevard Bonfil',
          ciudad: 'Tizayuca',
          codigo_postal: '58963',
          colonia: 'El Palmar',
          estado: 'Hidalgo',
        },
        tipo: 1,
        isMatriz: false,
        promotions: 1,
      },
      {
        ...users.tybg2345,
        domicilio: {
          calle: 'Boulevard Bonfil',
          ciudad: 'Mineral de la Reforma',
          codigo_postal: '25695',
          colonia: 'El Palmar',
          estado: 'Hidalgo',
        },
        tipo: 1,
        isMatriz: true,
        promotions: 0,
      },
      {
        ...users.tybg2345,
        domicilio: {
          calle: 'Boulevard Bonfil',
          ciudad: 'Tulancingo',
          codigo_postal: '86542',
          colonia: 'El Palmar',
          estado: 'Hidalgo',
        },
        tipo: 1,
        isMatriz: false,
        promotions: 1,
      },
      {
        ...users.tybg2345,
        domicilio: {
          calle: 'Boulevard Bonfil',
          ciudad: 'Mineral de la Reforma',
          codigo_postal: '58963',
          colonia: 'El Palmar',
          estado: 'Hidalgo',
        },
        tipo: 1,
        isMatriz: false,
        promotions: 0,
      },
      {
        ...users.tybg2345,
        domicilio: {
          calle: 'Boulevard Bonfil',
          ciudad: 'Pachuca de Soto',
          codigo_postal: '25695',
          colonia: 'El Palmar',
          estado: 'Hidalgo',
        },
        tipo: 1,
        isMatriz: true,
        promotions: 1,
      },
      {
        ...users.tybg2345,
        domicilio: {
          calle: 'Boulevard Bonfil',
          ciudad: 'Tizayuca',
          codigo_postal: '86542',
          colonia: 'El Palmar',
          estado: 'Hidalgo',
        },
        tipo: 1,
        isMatriz: false,
        promotions: 0,
      },
      {
        ...users.tybg2345,
        domicilio: {
          calle: 'Boulevard Bonfil',
          ciudad: 'Tulancingo',
          codigo_postal: '58963',
          colonia: 'El Palmar',
          estado: 'Hidalgo',
        },
        tipo: 1,
        isMatriz: false,
        promotions: 1,
      },
      {
        ...users.tybg2345,
        domicilio: {
          calle: 'Boulevard Bonfil',
          ciudad: 'Mineral de la Reforma',
          codigo_postal: '25695',
          colonia: 'El Palmar',
          estado: 'Hidalgo',
        },
        tipo: 1,
        isMatriz: true,
        promotions: 0,
      },
      {
        ...users.tybg2345,
        domicilio: {
          calle: 'Boulevard Bonfil',
          ciudad: 'Pachuca de Soto',
          codigo_postal: '86542',
          colonia: 'El Palmar',
          estado: 'Hidalgo',
        },
        tipo: 1,
        isMatriz: false,
        promotions: 1,
      },
      {
        ...users.tybg2345,
        domicilio: {
          calle: 'Boulevard Bonfil',
          ciudad: 'Tulancingo',
          codigo_postal: '58963',
          colonia: 'El Palmar',
          estado: 'Hidalgo',
        },
        tipo: 1,
        isMatriz: false,
        promotions: 0,
      },
      {
        ...users.tybg2345,
        domicilio: {
          calle: 'Boulevard Bonfil',
          ciudad: 'Tizayuca',
          codigo_postal: '25695',
          colonia: 'El Palmar',
          estado: 'Hidalgo',
        },
        tipo: 1,
        isMatriz: true,
        promotions: 1,
      },
      {
        ...users.tybg2345,
        domicilio: {
          calle: 'Boulevard Bonfil',
          ciudad: 'Mineral de la Reforma',
          codigo_postal: '25695',
          colonia: 'El Palmar',
          estado: 'Hidalgo',
        },
        tipo: 1,
        isMatriz: true,
        promotions: 0,
      },
      {
        ...users.tybg2345,
        domicilio: {
          calle: 'Boulevard Bonfil',
          ciudad: 'Tizayuca',
          codigo_postal: '58963',
          colonia: 'El Palmar',
          estado: 'Hidalgo',
        },
        tipo: 1,
        isMatriz: false,
        promotions: 1,
      },
      {
        ...users.tybg2345,
        domicilio: {
          calle: 'Boulevard Bonfil',
          ciudad: 'Mineral de la Reforma',
          codigo_postal: '25695',
          colonia: 'El Palmar',
          estado: 'Hidalgo',
        },
        tipo: 1,
        isMatriz: true,
        promotions: 0,
      },
      {
        ...users.tybg2345,
        domicilio: {
          calle: 'Boulevard Bonfil',
          ciudad: 'Tulancingo',
          codigo_postal: '86542',
          colonia: 'El Palmar',
          estado: 'Hidalgo',
        },
        tipo: 1,
        isMatriz: false,
        promotions: 1,
      },
      {
        ...users.tybg2345,
        domicilio: {
          calle: 'Boulevard Bonfil',
          ciudad: 'Mineral de la Reforma',
          codigo_postal: '58963',
          colonia: 'El Palmar',
          estado: 'Hidalgo',
        },
        tipo: 1,
        isMatriz: false,
        promotions: 0,
      },
      {
        ...users.tybg2345,
        domicilio: {
          calle: 'Boulevard Bonfil',
          ciudad: 'Pachuca de Soto',
          codigo_postal: '25695',
          colonia: 'El Palmar',
          estado: 'Hidalgo',
        },
        tipo: 1,
        isMatriz: true,
        promotions: 1,
      },
      {
        ...users.tybg2345,
        domicilio: {
          calle: 'Boulevard Bonfil',
          ciudad: 'Tizayuca',
          codigo_postal: '86542',
          colonia: 'El Palmar',
          estado: 'Hidalgo',
        },
        tipo: 1,
        isMatriz: false,
        promotions: 0,
      },
      {
        ...users.tybg2345,
        domicilio: {
          calle: 'Boulevard Bonfil',
          ciudad: 'Tulancingo',
          codigo_postal: '58963',
          colonia: 'El Palmar',
          estado: 'Hidalgo',
        },
        tipo: 1,
        isMatriz: false,
        promotions: 1,
      },
      {
        ...users.tybg2345,
        domicilio: {
          calle: 'Boulevard Bonfil',
          ciudad: 'Mineral de la Reforma',
          codigo_postal: '25695',
          colonia: 'El Palmar',
          estado: 'Hidalgo',
        },
        tipo: 1,
        isMatriz: true,
        promotions: 0,
      },
      {
        ...users.tybg2345,
        domicilio: {
          calle: 'Boulevard Bonfil',
          ciudad: 'Pachuca de Soto',
          codigo_postal: '86542',
          colonia: 'El Palmar',
          estado: 'Hidalgo',
        },
        tipo: 1,
        isMatriz: false,
        promotions: 2,
      },
      {
        ...users.tybg2345,
        domicilio: {
          calle: 'Boulevard Bonfil',
          ciudad: 'Tulancingo',
          codigo_postal: '58963',
          colonia: 'El Palmar',
          estado: 'Hidalgo',
        },
        tipo: 1,
        isMatriz: false,
        promotions: 5,
      },
      {
        ...users.tybg2345,
        domicilio: {
          calle: 'Boulevard Bonfil',
          ciudad: 'Tizayuca',
          codigo_postal: '25695',
          colonia: 'El Palmar',
          estado: 'Hidalgo',
        },
        tipo: 1,
        isMatriz: true,
        promotions: 10,
      },
      {
        ...users.tybg2345,
        domicilio: {
          calle: 'Boulevard Bonfil',
          ciudad: 'Mineral de la Reforma',
          codigo_postal: '25695',
          colonia: 'El Palmar',
          estado: 'Hidalgo',
        },
        tipo: 1,
        isMatriz: true,
        promotions: 1,
      },
    ],
  },
  tipo: 1,
  vip: 1,
};

class BusinessProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      linkname: 'tybg2345',
      data: {},
      loading: true,
      error: null,
      vipState: 0,
    };
  }

  componentDidMount() {
    this.getData();
  }

  componentWillUnmount() {
    // console.log('vipState: ', this.state.vipState);
    // this.setState({vipState: 0});
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
    const {linkname, data, loading, error} = this.state;
    const owner = true;

    /* DARK MODE / VIP STYLES */
    const backgroundColorDark =
      data.vip === 2 || data.vip === 1
        ? {backgroundColor: 'black'}
        : {backgroundColor: Colors.grayLight};

    return (
      <ScrollView style={[styles.mainContainer, backgroundColorDark]}>
        {!loading && !error && (
          <View>
            <View style={[styles.socialBlockHeader, backgroundColorDark]}>
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

            {/* SUMMARY BLOCK */}
            <SummaryBlock
              linkname={''}
              data={{
                ...data.social,
                ...data.summary,
                tipo: data.tipo,
                vip: data.vip,
              }}
            />

            {/* LINK BUSINESS BLOCK */}
            <LinkBusinessBlock
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

            {/* VIP LINK BUSINESS BLOCK */}
            <LinkBusinessVIPBlock
              linkname={''}
              data={{...data.linkBusiness, tipo: data.tipo, vip: data.vip}}
            />

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
              data={{
                ...data.social,
                ...data.compliments,
                tipo: data.tipo,
                vip: data.vip,
                owner: owner,
              }}
            />

            {/* COMPLAINTS BLOCK */}
            <SuggestionsBlock
              linkname={''}
              data={{...data.compliments, tipo: data.tipo, vip: data.vip}}
            />
            
            {/* PRODUCTS BLOCK */}
            <PromotionsBlock
              linkname={linkname}
              data={{...data.promotions, tipo: data.tipo, vip: data.vip}}
            />

            {/* PRODUCTS BLOCK */}
            <ProductsBlock
              linkname={''}
              data={{...data.products, tipo: data.tipo, vip: data.vip}}
            />

            {/* SERVICES BLOCK */}
            <ServicesBlock
              linkname={''}
              data={{...data.services, tipo: data.tipo, vip: data.vip}}
            />

            {/* STAFF BLOCK */}
            <StaffBlock
              linkname={''}
              data={{...data.staff, tipo: data.tipo, vip: data.vip}}
            />

            {/* BRANCHES BLOCK */}
            <BranchesBlock
              linkname={''}
              data={{
                ...data.branches,
                ...data.social,
                tipo: data.tipo,
                vip: data.vip,
              }}
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

export default BusinessProfile;
