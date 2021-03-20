import React from 'react';
import {View} from 'react-native';

import Text from '../../Text';
import Search from '../../Search';
import MenuTabs from '../../MenuTabs';
import ErrorOrNoData from '../../ErrorOrNoData';

import SentCupons from './SentCupons';
import MyCupons from './MyCupons';

/* DATA */
import {
  cuponesEnviadosResponse,
  cuponeraResponse,
} from '../../../testData/dataAdmon';

class Logic {
  constructor() {
    this.data = null;
    this.loading = true;
    this.error = null;
  }

  checkData(data) {
    if (!data.message) {
      this.data = data;
      this.loading = false;
      this.error = false;
    } else {
      this.loading = false;
      this.error = data;
    }
  }

  getData() {
    const dataPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        this.loading = true;
        let response = [];

        try {
          response = cuponesEnviadosResponse.data.cupones;
        } catch (error) {
          response = this.data;
        }

        if (response) {
          resolve(response);
          this.checkData(response);
        } else {
          const error = {
            title: 'Data not found',
            message: 'Try to reload',
          };
          reject(error);
          this.checkData(error);
        }
      }, 300);
    });

    return dataPromise;
  }

  getMyCupons() {
    const dataPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        this.loading = true;
        let response = [];

        try {
          response = cuponeraResponse.data.cupones;
        } catch (error) {
          response = null;
        }

        if (response) {
          resolve(response);
          this.checkData(response);
        } else {
          const error = {
            title: 'Data not found',
            message: 'Try to reload',
          };
          reject(error);
          this.checkData(error);
        }
      }, 300);
    });

    return dataPromise;
  }

  filterData(filter, allItems) {
    const filteredData = new Promise((resolve, reject) => {
      this.loading = true;
      let searchResults = this.data;

      if (filter !== '') {
        searchResults = allItems.filter(
          item =>
            item.nombre.toLowerCase().includes(filter.toLowerCase()) ||
            item.apellido_paterno.toLowerCase().includes(filter.toLowerCase()),
        );
      } else {
        searchResults = allItems;
      }

      if (searchResults) {
        resolve(searchResults);
        this.checkData(searchResults);
      } else {
        const error = Error('There was an error loading the data.');
        reject(error);
        this.checkData(error);
      }
    });

    return filteredData;
  }
}

function Cupones(props) {
  const menu = ['Enviados', 'Mi cuponera'];
  const {personal} = props;
  const ComponentLogic = new Logic();

  const [seleccionMenuTabs, setSeleccionMenuTabs] = React.useState(menu[0]);

  const [allMySentCoupons, setAllMySentCoupons] = React.useState([]);
  const [mySentCupouns, setMySentCupouns] = React.useState([]);
  const [myCupouns, setMyCupouns] = React.useState([]);

  const [loading, setLoading] = React.useState(true);
  const [errorSentCupouns, setErrorSentCupouns] = React.useState(null);
  const [errorMyCupouns, setErrorMyCupouns] = React.useState(null);

  /* COMPONENTDIDMOUNT */
  React.useEffect(() => {
    ComponentLogic.getData()
      .then(items => {
        setLoading(false);
        setAllMySentCoupons(items);
        setMySentCupouns(items);
        ComponentLogic.getMyCupons()
          .then(cupouns => setMyCupouns(cupouns))
          .catch(err => setErrorMyCupouns(err));
      })
      .catch(err => {
        setErrorSentCupouns(err);
        setLoading(false);
        ComponentLogic.getMyCupons()
          .then(cupouns => setMyCupouns(cupouns))
          .catch(error => setErrorMyCupouns(error));
      });
  }, []);

  /* HANDLE SEARCH */
  const handleSearch = filter => {
    /* SEARCH */
    ComponentLogic.filterData(filter, allMySentCoupons)
      .then(items => {
        setLoading(false);
        setMySentCupouns(items);
      })
      .catch(err => {
        setErrorSentCupouns(err);
        setLoading(false);
      });
  };

  return (
    <View>
      {/* MenuTabs */}
      <MenuTabs
        opciones={menu}
        seleccion={seleccionMenuTabs}
        seleccionar={setSeleccionMenuTabs}
        personal={personal}
      />

      {loading && (
        <View>
          <Text style={{textAlign: 'center'}}>{'Loading...'}</Text>
        </View>
      )}

      {/* SENT CUPOUNS */}
      {seleccionMenuTabs === menu[0] && (
        <View>
          {errorSentCupouns && (
            <ErrorOrNoData
              title={errorSentCupouns.title}
              message={errorSentCupouns.message}
            />
          )}

          {!loading && !errorSentCupouns && (
            <View>
              {/* SEARCH BAR */}
              <Search obtenerValorBusqueda={handleSearch} />
              <SentCupons cupounsList={mySentCupouns} personal={personal} />
            </View>
          )}
        </View>
      )}

      {/* MY CUPOUNS */}
      {seleccionMenuTabs === menu[1] && (
        <View>
          {errorMyCupouns && (
            <ErrorOrNoData
              title={errorMyCupouns.title}
              message={errorMyCupouns.message}
            />
          )}

          {!loading && !errorMyCupouns && (
            <View>
              <MyCupons cupounsList={myCupouns} />
            </View>
          )}
        </View>
      )}
    </View>
  );
}

export default Cupones;
