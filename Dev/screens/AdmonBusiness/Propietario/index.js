import React from 'react';
import {View} from 'react-native';

import Text from '../../../components/Text';

import Roles from './Roles';
import Puestos from './Puestos';

/* DATA */
import {colaboradoresResponse} from '../../../testData/dataAdmon';

class Propietario extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rolsInfo: [],
      jobsInfo: [],
      loading: true,
      errorRolsInfo: null,
      errorJobsInfo: null,
    };

    this.deleteEmployee = this.deleteEmployee.bind(this);
    this.saveNewEmployee = this.saveNewEmployee.bind(this);
    this.selectEmployeeOfTheMonth = this.selectEmployeeOfTheMonth.bind(this);
    this.changeRol = this.changeRol.bind(this);
    this.deleteFromRols = this.deleteFromRols.bind(this);
  }

  getData = () => {
    const errorGettingData = {
      title: 'Data not found',
      message: 'Try to reload',
    };

    const response = colaboradoresResponse.data.colaboradores;

    if (response) {
      this.setState({
        rolsInfo: response,
        jobsInfo: response,
        loading: false,
      });
    } else {
      this.setState({
        errorJobsInfo: errorGettingData,
        errorRolsInfo: errorGettingData,
        loading: false,
      });
    }
  };

  componentDidMount() {
    this.getData();
  }

  deleteEmployee = (data, employee) => {
    const errorDeleteEmployee = {
      title: 'There was an error processing your data',
      message: 'Try to reload',
    };

    let updatedList = [];

    try {
      updatedList = data.filter(item => item.link !== employee.link);
      this.setState({jobsInfo: updatedList});
    } catch (error) {
      this.setState({errorJobsInfo: errorDeleteEmployee});
    }
  };

  saveNewEmployee = (data, employee) => {
    const errorSaveNewEmployee = {
      title: 'There as an error processing your data',
      message: 'Try to reload',
    };

    let updatedList = [];

    try {
      updatedList = [...data, employee];
      this.setState({jobsInfo: updatedList});
    } catch (error) {
      this.setState({errorJobsInfo: errorSaveNewEmployee});
    }
  };

  selectEmployeeOfTheMonth = (data, prevEmployee, nextEmployee) => {
    console.log(prevEmployee, nextEmployee);
    const errorEmployeeOfTheMonth = {
      title: 'There was an error processing your data',
      message: 'Try to reload',
    };

    let updatedList = [];

    try {
      /* REMOVE PREVIOUS EMPLOYEE OF THE MONTH */
      prevEmployee < data.length - 1
        ? (data[prevEmployee].monthEmployee = false)
        : null;

      /* SET NEW EMPLOYEE OF THE MONTH */
      data[nextEmployee].monthEmployee = true;

      updatedList = [...data];
      this.setState({jobsInfo: updatedList});
    } catch (error) {
      this.setState({errorJobsInfo: errorEmployeeOfTheMonth});
    }
  };

  changeRol(rolState, item) {
    const data = this.state.rolsInfo;

    const errorChangeRol = {
      title: 'There was an error processing your data',
      message: 'Try to reload',
    };

    try {
      let newRol = rolState ? 'Editor' : 'Administrador';
      data[item.index].rol = newRol;
      this.setState({rolsInfo: [...data]});
    } catch (err) {
      this.setState({errorRolsInfo: errorChangeRol});
    }
  }

  deleteFromRols = (data, item) => {
    const errorDeleteFromRols = {
      title: 'There was an error processing your data',
      message: 'Try to reload',
    };

    try {
      const updatedList = data.filter(rol => rol.link !== item.link);
      this.setState({rolsInfo: updatedList});
    } catch (err) {
      this.setState({errorRolsInfo: errorDeleteFromRols});
    }
  };

  render() {
    const {
      loading,
      rolsInfo,
      errorJobsInfo,
      errorRolsInfo,
      jobsInfo,
    } = this.state;
    const {seleccion, user, updateListInViewOffset} = this.props;

    return (
      <View style={{flex: 1}}>
        {loading && (
          <View>
            <Text style={{textAlign: 'center'}}>{'Loading...'}</Text>
          </View>
        )}

        {!loading && (
          <View style={{flex: 1}}>
            {/* ROLES */}
            {seleccion === 0 && (
              <Roles
                rolsInfo={rolsInfo}
                errorRolsInfo={errorRolsInfo}
                changeRol={this.changeRol}
                deleteFromRols={this.deleteFromRols}
                updateListInViewOffset={updateListInViewOffset}
              />
            )}

            {/* PUESTOS */}
            {seleccion === 1 && (
              <Puestos
                user={user}
                jobsInfo={jobsInfo}
                errorJobsInfo={errorJobsInfo}
                deleteEmployee={this.deleteEmployee}
                saveNewEmployee={this.saveNewEmployee}
                selectEmployeeOfTheMonth={this.selectEmployeeOfTheMonth}
                updateListInViewOffset={updateListInViewOffset}
              />
            )}
          </View>
        )}
      </View>
    );
  }
}

export default Propietario;
