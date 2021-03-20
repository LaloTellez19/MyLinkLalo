import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
} from 'react-native';

import {Navigation} from 'react-native-navigation';

import Colors from '../../../../constants/Colors';
import Layout from '../../../../constants/Layout';
import Text from '../../../../components/Text';
import Icon from '../../../../components/Icon';
import Header from '../../../../components/Header';
import UserImage from '../../../../components/UserImage';
import MenuContextual from '../../../../components/MenuContextual';
import Invitation from '../../../../components/Invitation';
import ErrorOrNoData from '../../../../components/ErrorOrNoData';

import ConfirmacionEliminar from './ConfirmacionEliminar';
import AgregarColaborador from './AgregarColaborador';

const width = Layout.window.width;
const height = Layout.window.height;
const itemHeight = 80;

/* STYLES */
const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    flex: 1,
  },
  /* LISTA DE PUESTOS */
  jobsList: {
    width: '100%',
    alignSelf: 'center',
    flex: 1,
    backgroundColor: 'white',
  },
  jobItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: width,
    height: itemHeight,
  },
  userImageContainer: {
    marginRight: 15,
    marginLeft: 15,
    padding: 5,
    borderWidth: 0.5,
    borderColor: 'transparent',
  },
  EmployeeOfTheMonth: {
    backgroundColor: Colors.grayLight,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: Colors.gray,
  },
  EmployeeOfTheMonthIcon: {
    position: 'absolute',
    bottom: -9,
    left: -3,
    elevation: 10,
  },
  userInfoContainer: {
    flexDirection: 'row',
    borderBottomColor: Colors.gray,
    paddingLeft: 5,
  },
  userTextContainer: {
    width: width / 1.8,
  },
  nombre: {
    fontSize: 14,
    color: Colors.defaultTextColor,
  },
  userjob: {
    fontSize: 12,
    color: Colors.defaultTextColor,
    marginTop: 2,
    marginBottom: 2,
  },
  link: {
    fontSize: 12,
    color: Colors.defaultTextColor,
  },
  menuPuestoTrigger: {
    marginRight: 5,
    justifyContent: 'center',
  },
  /* BOTON AGREGAR COLABORADOR */
  botonAgregarColaborador: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 70,
    marginRight: 70,
    borderRadius: 10,
    backgroundColor: Colors.business,
  },
  botonAgregarColaboradorText: {
    fontSize: 14,
    color: 'white',
  },
  topContainer: {
    width: width,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topContainerTitle: {
    fontSize: 20,
    color: Colors.defaultTextColor,
  },
  /* MODAL STYLES */
  modalContainer: {
    width: width,
    height: height,
    opacity: 0.95,
    backgroundColor: Colors.grayBold,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

function Puestos(props) {
  const {
    user,
    jobsInfo,
    errorJobsInfo,
    deleteEmployee,
    saveNewEmployee,
    selectEmployeeOfTheMonth,
    updateListInViewOffset,
    showOverlay,
    data,
  } = props;

  const menu = [
    'Verificar colaborador',
    'Cambiar puesto',
    'Empleado del mes',
    'Eliminar colaborador',
  ];

  const lastIndex = jobsInfo ? jobsInfo.length - 1 : 0;
  const [showDeleteView, setShowDeleteView] = React.useState(false);
  const [addEmployee, setAddEmployee] = React.useState(false);
  const [itemSelected, setItemSelected] = React.useState({});

  const [showContextMenu, setShowContextMenu] = React.useState(false);
  const [contentOffsetY, setContentOffsetY] = React.useState(0);
  const [indexEmployeeOfTheMonth, setIndexEmployeeOfTheMonth] = React.useState(
    false,
  );

  const [showVerifyEmployeeeView, setShowVerifyEmployeeeView] = React.useState(
    false,
  );

  /* OPCIONES MENU  */
  const opciones = [
    {
      text: menu[0],
      onPress: () => {
        console.log('itemSelected: ', itemSelected);
        setShowVerifyEmployeeeView(true);
        setShowContextMenu(false);
      },
    },
    {
      text: menu[1],
      onPress: () => cambiarPuesto(),
    },
    {
      text: menu[2],
      onPress: () => handleEmployeeOfTheMonth(),
    },
    {
      text: menu[3],
      onPress: () => {
        setShowDeleteView(true);
        setShowContextMenu(false);
      },
    },
  ];

  React.useEffect(() => {
    jobsInfo.map((item, index) => {
      !indexEmployeeOfTheMonth && item.monthEmployee
        ? setIndexEmployeeOfTheMonth(index)
        : null;
    });
  }, []);

  /* HANDLE CONTEXT MENU */
  const handleContextMenu = (item, state) => {
    setItemSelected(item);
    setShowContextMenu(state);
  };

  /* CONFIRMAR ELIMINACION DE COLABOLADOR */
  const handleDeleteEmployee = () => {
    setShowDeleteView(false);
    /* UPDATE EMPLOYEE OF THE MONTH INDEX WHEN A EMPLOYEE BEFORE THIS ONE HAS BEEN DELETED */
    const prevUserRemoved = itemSelected.index < indexEmployeeOfTheMonth;
    prevUserRemoved
      ? setIndexEmployeeOfTheMonth(indexEmployeeOfTheMonth - 1)
      : null;

    /* DELETE EMPLOYEE AND UPDATE EMPLOYEES LIST */
    deleteEmployee(jobsInfo, itemSelected);
  };

  /* HANDLE SAVE NEW EMPLOYEE */
  const handleSaveNewEmployee = employee => {
    setAddEmployee(false);

    saveNewEmployee(jobsInfo, employee);
  };

  /* SELECCIONAR COLABOLADOR DEL MES */
  const handleEmployeeOfTheMonth = () => {
    setShowContextMenu(false);
    selectEmployeeOfTheMonth(
      jobsInfo,
      indexEmployeeOfTheMonth,
      itemSelected.index,
    );
    setIndexEmployeeOfTheMonth(itemSelected.index);
  };

  /* VERIFICAR COLABOLADOR */
  const handleVerifyEmployeee = () => {
    console.log(`Verificar colaborador ${itemSelected.link}`);
    setShowVerifyEmployeeeView(false);
  };

  /* CAMBIAR PUESTO DEL COLABOLADOR */
  const cambiarPuesto = () => {
    console.log(`Cambiar a ${itemSelected.link} de job`);
  };

  /* GET ITEMHEIGHT */
  const getItemHeight = () => {
    let realHeight = 0;
    if (itemSelected.index === lastIndex) {
      realHeight = 82;
    } else if (itemSelected.index === lastIndex - 1) {
      realHeight = 70;
    } else {
      realHeight = itemHeight;
    }
    return realHeight;
  };

  const goBack = () => {
    Navigation.dismissOverlay(props.componentId);
  };
  
  const vip = data ? data.vip === 1 : false;
  const vipDark = data ? data.vip === 2 : false;

  const backgroundColor = vipDark
    ? {backgroundColor: 'black'}
    : {backgroundColor: 'white'};

  const backgroundColor_2 = vipDark
    ? {backgroundColor: Colors.jet}
    : {backgroundColor: 'white'};

  const textColor = vipDark
    ? {color: Colors.grayLight}
    : {color: Colors.defaultTextColor};

  const textColor_2 = vipDark
    ? {color: Colors.silverMetallic}
    : {color: Colors.defaultTextColor};

  const textColor_3 = vipDark
    ? {color: 'white'}
    : {color: Colors.defaultTextColor};

  return (
    <View style={styles.mainContainer}>
      {showOverlay && (
        <Header goBack={() => goBack()} color={vipDark ? 'black' : 'white'} />
      )}

      {errorJobsInfo && (
        <ErrorOrNoData
          title={errorJobsInfo.title}
          message={errorJobsInfo.message}
        />
      )}

      {!errorJobsInfo && (
        <View style={{flex: 1}}>
          {/* LISTA DE COLABORADORES */}
          <View style={[styles.jobsList, backgroundColor_2]}>
            <FlatList
              nestedScrollEnabled={true}
              data={jobsInfo}
              onScroll={event => {
                setContentOffsetY(event.nativeEvent.contentOffset.y);
              }}
              onTouchStart={() => setShowContextMenu(false)}
              ListHeaderComponent={
                <View>
                  {!showOverlay && (
                    <TouchableOpacity
                      style={styles.botonAgregarColaborador}
                      onPress={() => {
                        setAddEmployee(true);
                        setShowContextMenu(false);
                      }}>
                      <Icon
                        name="business"
                        factor={0.6}
                        Borderless
                        forceColor
                        color={'white'}
                      />
                      <Text style={styles.botonAgregarColaboradorText}>
                        {'Agregar'}
                      </Text>
                    </TouchableOpacity>
                  )}
                  {showOverlay && (
                    <View style={[styles.topContainer, backgroundColor]}>
                      <Text style={[styles.topContainerTitle, textColor]}>
                        {'Atención y Personal'}
                      </Text>
                    </View>
                  )}
                </View>
              }
              renderItem={({item, index}) => (
                <Puesto
                  item={{...item, index}}
                  handleContextMenu={handleContextMenu}
                  indexEmployeeOfTheMonth={indexEmployeeOfTheMonth}
                  setIndexEmployeeOfTheMonth={setIndexEmployeeOfTheMonth}
                  showOverlay={showOverlay}
                  textColors={[textColor, textColor_2, textColor_3]}
                />
              )}
              keyExtractor={(item, index) => index.toString()}
              onMomentumScrollEnd={event => {
                const offsetY = event.nativeEvent.contentOffset.y;
                updateListInViewOffset(offsetY);
              }}
            />

            {/* MENU DE OPCIONES DE COLABORADOR */}
            {showContextMenu && (
              <MenuContextual
                opciones={opciones}
                index={itemSelected.index}
                itemHeight={getItemHeight()}
                lastIndex={lastIndex}
                contentOffsetY={contentOffsetY}
                initialValue={-40}
              />
            )}
          </View>

          {/* CONFIRMACION showDeleteView COLABORADOR */}
          <DeleteConfirmationModal
            modalVisible={showDeleteView}
            close={setShowDeleteView}
            worker={itemSelected}
            handleDeleteEmployee={handleDeleteEmployee}
          />

          {/* FORMA AGREGAR COLABORADOR */}
          <AddWorkerModal
            modalVisible={addEmployee}
            close={setAddEmployee}
            handleSaveNewEmployee={handleSaveNewEmployee}
          />

          {/* VERIFY EmployeeE */}
          {showVerifyEmployeeeView && (
            <Invitation
              fromUser={user}
              fromBusiness={true}
              toUser={itemSelected}
              toPersonal={true}
              invitationText={`Invita a ${
                itemSelected.nombre
              } a verificar su puesto de trabajo`}
              buttonText={'Enviar invitación'}
              buttonAction={handleVerifyEmployeee}
              cancelInvitation={() => setShowVerifyEmployeeeView(false)}
            />
          )}
        </View>
      )}
    </View>
  );
}

const Puesto = ({
  item,
  handleContextMenu,
  indexEmployeeOfTheMonth,
  setIndexEmployeeOfTheMonth,
  showOverlay,
  textColors,
}) => {
  return (
    <View style={styles.jobItem}>
      {/* IMAGEN COLABORADOR */}
      <View
        style={[
          styles.userImageContainer,
          item.monthEmployee ? styles.EmployeeOfTheMonth : null,
        ]}>
        <UserImage link={item.link || 'defaultUser'} />
        {item.monthEmployee && (
          <View style={styles.EmployeeOfTheMonthIcon}>
            <Icon name="color_ribbon" factor={0.65} Borderless Colorless />
          </View>
        )}
      </View>

      {/* INFO COLABORADOR */}
      <View style={styles.userInfoContainer}>
        <View style={styles.userTextContainer}>
          <Text style={[styles.nombre, textColors[0]]}>{`${item.nombre} ${
            item.apellido_paterno
          }`}</Text>
          <Text style={[styles.link, textColors[1]]}>{item.link}</Text>
          <Text style={[styles.userjob, textColors[2]]}>{item.job}</Text>
        </View>

        {/* TRIGGER PARA DESPLEGAR MENU DE OPCIONES DE COLABORADO */}
        {!showOverlay && (
          <TouchableOpacity
            style={styles.menuPuestoTrigger}
            onPress={() => {
              handleContextMenu(item, true);
            }}>
            <Icon
              name="options"
              factor={0.7}
              Borderless
              forceColor
              color={Colors.gray}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const AddWorkerModal = ({modalVisible, close, handleSaveNewEmployee}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        close(false);
      }}>
      <TouchableOpacity
        style={styles.modalContainer}
        onPress={() => close(false)}>
        <AgregarColaborador
          cancelar={() => close(false)}
          guardarColaborador={handleSaveNewEmployee}
        />
      </TouchableOpacity>
    </Modal>
  );
};

const DeleteConfirmationModal = ({
  modalVisible,
  close,
  worker,
  handleDeleteEmployee,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        close(false);
      }}>
      <TouchableOpacity
        style={styles.modalContainer}
        onPress={() => close(false)}>
        <ConfirmacionEliminar
          colaborador={worker}
          cancelar={() => close(false)}
          confirmarEliminacionColaborador={handleDeleteEmployee}
        />
      </TouchableOpacity>
    </Modal>
  );
};

export default Puestos;
