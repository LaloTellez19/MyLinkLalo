/**
 * @format
 */

import {Navigation} from 'react-native-navigation';
import App from './App';

/* ADMIN */
import PersonalAdmin from '../Dev/screens/AdmonPersonal/Home';
import BusinessAdmin from '../Dev/screens/AdmonBusiness/Home';
import CelebrityAdmin from '../Dev/screens/AdmonCelebrity/Home';
import BusinessPLUSAdmin from '../Dev/screens/AdmonBusinessPLUS/Home';


import MiPerfil from '../Dev/components/MiPerfil';
import AddEditCategory from '../Dev/screens/AdmonBusiness/Informacion/Producto/AddEditCategory';
import AddEditProduct from '../Dev/screens/AdmonBusiness/Informacion/Producto/AddEditProduct';
import AddEditServices from '../Dev/screens/AdmonBusiness/Informacion/Servicios/SeleccionarServicios';
import BusinessLinking from '../Dev/screens/AdmonBusiness/Configuracion/Vinculacion';
import LinkNewBusiness from '../Dev/screens/AdmonBusiness/Configuracion/Vinculacion/LinkNewBusiness';
import MailBoxMessage from '../Dev/screens/AdmonBusiness/Buzon/ResponderMensaje';
import AddEditAward from '../Dev/components/AddEditAward';
import ProfileDataSettings from '../Dev/screens/AdmonPersonal/Privacidad/Perfiles/ProfileDataSettings';
import ReorganizarDirectorio from '../Dev/screens/AdmonBusinessPLUS/Negocios/Directorio/Reorganizar/ReorganizarDirectorio';
/* STORE */
import Store from '../Dev/screens/Tienda/index';

import MyCards from '../Dev/screens/Tienda/StoreWallet/MyCards';
import MyLinkBalance from '../Dev/screens/Tienda/StoreWallet/MyLinkBalance';
import AddCard from '../Dev/screens/Tienda/StoreWallet/MyLinkBalance/AddCard';
import AddMyLinkBalance from '../Dev/screens/Tienda/StoreWallet/MyLinkBalance/AddMyLinkBalance';

/* HELP */
import Help from '../Dev/screens/Help';

/* PROFILES */
import BusinessProfile from '../Dev/screens/Profiles/Business';
import PersonalProfile from '../Dev/screens/Profiles/Personal';
import CelebrityProfile from '../Dev/screens/Profiles/Celebrity';
import PersonalVIP from '../Dev/screens/Profiles/PersonalVIP';

import ProfileCompliments from '../Dev/screens/Profiles/FullViews/Compliments';
import SelectCompliment from '../Dev/screens/Profiles/FullViews/SelectCompliment';
import CommonCards from '../Dev/screens/Profiles/FullViews/CommonCards';
import ProfileRecommendations from '../Dev/screens/Profiles/FullViews/ProfileRecommendations';
import Complaint from '../Dev/screens/Profiles/FullViews/Complaint';
import Products from '../Dev/screens/AdmonBusiness/Informacion/Producto';
import Services from '../Dev/screens/AdmonBusiness/Informacion/Servicios';
import Branches from '../Dev/screens/Profiles/FullViews/Branches';
import NewsProfile from '../Dev/screens/Profiles/FullViews/News';
import StaffProfile from '../Dev/screens/AdmonBusiness/Propietario/Puestos';
import SharedData from '../Dev/screens/Profiles/FullViews/SharedData';
import ProductDetails from '../Dev/screens/Profiles/FullViews/ProductDetails';
import Awards from '../Dev/screens/Profiles/FullViews/Awards';

import MisCupones from  '../Dev/screens/MisCupones';

Navigation.registerComponent('my-link.Home', () => App);

/* ADMIN */
Navigation.registerComponent('my-link.PersonalAdmin', () => PersonalAdmin);
Navigation.registerComponent('my-link.BusinessAdmin', () => BusinessAdmin);
Navigation.registerComponent('my-link.CelebrityAdmin', () => CelebrityAdmin);
Navigation.registerComponent('my-link.BusinessPLUSAdmin', () => BusinessPLUSAdmin);
Navigation.registerComponent('my-link.PersonalVIP', () => PersonalVIP);



Navigation.registerComponent('my-link.EditMyProfile', () => MiPerfil);
Navigation.registerComponent('my-link.AddEditCategory', () => AddEditCategory);
Navigation.registerComponent('my-link.AddEditProduct', () => AddEditProduct);
Navigation.registerComponent('my-link.AddEditServices', () => AddEditServices);
Navigation.registerComponent('my-link.BusinessLinking', () => BusinessLinking);
Navigation.registerComponent('my-link.LinkNewBusiness', () => LinkNewBusiness);
Navigation.registerComponent('my-link.MailBoxMessage', () => MailBoxMessage);
Navigation.registerComponent('my-link.AddEditAward', () => AddEditAward);
Navigation.registerComponent('my-link.ReorganizarDirectorio',() => ReorganizarDirectorio);
Navigation.registerComponent('my-link.MisCupones', () => MisCupones);


Navigation.registerComponent(
  'my-link.ProfileDataSettings',
  () => ProfileDataSettings,
);

/* STORE */
Navigation.registerComponent('my-link.Store', () => Store);

Navigation.registerComponent('my-link.MyCards', () => MyCards);
Navigation.registerComponent('my-link.MyLinkBalance', () => MyLinkBalance);
Navigation.registerComponent('my-link.AddCard', () => AddCard);
Navigation.registerComponent(
  'my-link.AddMyLinkBalance',
  () => AddMyLinkBalance,
);

/* HELP */
Navigation.registerComponent('my-link.Help', () => Help);

/* PROFILES */
Navigation.registerComponent('my-link.BusinessProfile', () => BusinessProfile);
Navigation.registerComponent('my-link.PersonalProfile', () => PersonalProfile);
Navigation.registerComponent(
  'my-link.CelebrityProfile',
  () => CelebrityProfile,
);

Navigation.registerComponent(
  'my-link.profileCompliments',
  () => ProfileCompliments,
);

Navigation.registerComponent(
  'my-link.SelectCompliment',
  () => SelectCompliment,
);

Navigation.registerComponent('my-link.CommonCards', () => CommonCards);

Navigation.registerComponent(
  'my-link.ProfileRecommendations',
  () => ProfileRecommendations,
);

Navigation.registerComponent('my-link.Complaint', () => Complaint);

Navigation.registerComponent('my-link.Products', () => Products);

Navigation.registerComponent('my-link.Services', () => Services);

Navigation.registerComponent('my-link.Branches', () => Branches);

Navigation.registerComponent('my-link.NewsProfile', () => NewsProfile);

Navigation.registerComponent('my-link.StaffProfile', () => StaffProfile);

Navigation.registerComponent('my-link.SharedData', () => SharedData);

Navigation.registerComponent('my-link.ProductDetails', () => ProductDetails);

Navigation.registerComponent('my-link.Awards', () => Awards);

Navigation.setDefaultOptions({
  statusBar: {
    backgroundColor: 'dark',
  },
  topBar: {
    visible: false,
  },
});

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: 'my-link.Home',
            },
          },
        ],
      },
    },
  });
});
