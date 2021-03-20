import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Modal,
} from 'react-native';

import Colors from '../../../../constants/Colors';
import Layout from '../../../../constants/Layout';
import Text from '../../../../components/Text';
import Icon from '../../../../components/Icon';
import UserImage from '../../../../components/UserImage';
import MenuContextual from '../../../../components/MenuContextual';
import ErrorOrNoData from '../../../../components/ErrorOrNoData';

import ConfirmacionEliminar from '../Puestos/ConfirmacionEliminar';

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
  rolList: {
    width: '100%',
    alignSelf: 'center',
    flex: 1,
    backgroundColor: 'white',
  },
  roltem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderColor: Colors.gray,
    width: width,
    height: itemHeight,
  },
  userImageContainer: {
    marginRight: 20,
    marginLeft: 5,
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderBottomColor: Colors.gray,
    paddingLeft: 0,
    width: width / 1.4,
  },
  userTextContainer: {
    width: 100,
    justifyContent: 'center',
    marginLeft: -5,
  },
  nombre: {
    fontSize: 14,
    color: Colors.defaultTextColor,
  },
  userrol: {
    fontSize: 12,
    color: Colors.defaultTextColor,
    marginTop: 2,
    marginBottom: 2,
  },
  link: {
    fontSize: 12,
    color: Colors.defaultTextColor,
  },
  deleteItemTrigger: {
    marginLeft: 0,
    justifyContent: 'center',
    paddingTop: 10,
    paddingBottom: 10,
  },
  /* SELECCION DE ROL */
  rolesSeleccion: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 0,
  },
  rolesNombre: {
    fontSize: 12,
    color: Colors.defaultTextColor,
    width: 90,
    marginRight: -15,
    marginLeft: -15,
    textAlign: 'center',
  },
  /* ROL SELECTOR STYLES */
  rolSelectorContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
    paddingTop: 10,
  },
  rolSelectorTitle: {
    fontSize: 16,
    color: Colors.defaultTextColor,
    marginTop: 5,
    marginBottom: 5,
  },
  userNameSelector: {
    width: '80%',
    marginBottom: 15,
    alignSelf: 'center',
  },
  userNameInput: {
    height: itemHeight,
    borderBottomWidth: 0.5,
    borderColor: Colors.gray,
    paddingBottom: 0,
  },
  userNameLabel: {
    fontSize: 12,
    color: Colors.defaultTextColor,
    textAlign: 'center',
  },
  rolSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 5,
  },
  rolName: {
    fontSize: 14,
    color: Colors.defaultTextColor,
    marginLeft: 5,
    marginRight: 5,
  },
  rolOptionalText: {
    fontSize: 12,
    color: Colors.defaultTextColor,
    marginTop: 10,
    marginBottom: 10,
  },
  rolDescription: {
    width: width / 1.2,
    height: height * 0.1,
    fontSize: 12,
    color: Colors.defaultTextColor,
    marginRight: 15,
    marginLeft: 15,
    marginTop: 5,
    marginBottom: 0,
    textAlign: 'justify',
  },
  /* SAVE BUTTON STYLES */
  saveButton: {
    width: width / 2.5,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    borderColor: Colors.gray,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: Colors.business,
  },
  saveButtonText: {
    fontSize: 14,
    color: 'white',
  },
  /* MODAL WORKER LIST STYLES */
  modalContainer: {
    width: width,
    height: height,
    opacity: 0.95,
    backgroundColor: Colors.grayBold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  workersList: {
    width: width / 1.1,
    height: '80%',
    alignSelf: 'center',
    backgroundColor: 'white',
    borderWidth: 0.5,
    borderColor: Colors.gray,
    borderRadius: 5,
    marginTop: 0,
    paddingBottom: 0,
    overflow: 'hidden',
  },
  workerImageContainer: {
    marginRight: 20,
    marginLeft: 10,
  },
  workerInfoContainer: {
    width: 150,
    justifyContent: 'center',
    marginLeft: 10,
  },
});

function Roles(props) {
  const {
    rolsInfo,
    errorRolsInfo,
    changeRol,
    deleteFromRols,
    updateListInViewOffset,
  } = props;

  const menu = [
    'Verificar colaborador',
    'Cambiar puesto',
    'Empleado del mes',
    'Eliminar colaborador',
  ];

  const lastIndex = rolsInfo ? rolsInfo.length - 1 : 0;
  const [showContextMenu, setShowContextMenu] = React.useState(false);
  const [itemSelected, setItemSelected] = React.useState({});
  const [contentOffsetY, setContentOffsetY] = React.useState(0);
  const [showDeleteView, setShowDeleteView] = React.useState(false);
  const [currentRol, setCurrentRol] = React.useState(0);
  const [userName, setUserName] = React.useState('');
  const [selectWorker, setSelectWorker] = React.useState(false);
  const [workerSelected, setWorkerSelected] = React.useState(false);

  const allRols = [
    {
      rol: 'Administrador',
      desc:
        'Tendra la facultad de hacer publicaciones, promociones, responder comentarios y eliminarlos, ver el apartado de recomendaciones, ranking y elaborar cupones.',
    },
    {
      rol: 'Editor',
      desc:
        'Tendra la facultad de ver el apartado de recomendaciones, ranking y elaborar cupones.',
    },
  ];

  const lastRolIndex = allRols.length - 1;

  /* OPCIONES MENU  */
  const opciones = [
    {
      text: menu[3],
      onPress: () => {
        setShowDeleteView(true);
        setShowContextMenu(false);
      },
    },
  ];

  /* HANDLE ROL CHANGE */
  const handleRolChange = (rolState, item) => {
    changeRol(rolState, item);
  };

  /* HANDLE CONTEXT MENU */
  const handleShowDeleteItemView = (item, state) => {
    setItemSelected(item);
    setShowDeleteView(state);
  };

  /* HANDLE DELETE ITEM */
  const handleDeleteItem = () => {
    setShowDeleteView(false);
    deleteFromRols(rolsInfo, itemSelected);
  };

  /* HANDLE ROL CHANGE */
  const setNewRol = next => {
    let currentRolIndex = currentRol;
    !next ? (currentRolIndex -= 1) : (currentRolIndex += 1);
    const newRolIndex = Math.min(Math.max(currentRolIndex, 0), lastRolIndex);
    setCurrentRol(newRolIndex);
  };

  /* SAVE NEW WORKER ADDED */
  const saveNewWorkerAdded = () => {
    console.log('SAVE NEW WORKER ADDED');
  };

  /* CONTROL WORKERS LIST */
  const constrolWorkersList = worker => {
    if (selectWorker) {
      setWorkerSelected(worker);
      setSelectWorker(false);
    } else {
      setSelectWorker(true);
    }
  };

  return (
    <View style={styles.mainContainer}>
      {errorRolsInfo && (
        <ErrorOrNoData
          title={errorRolsInfo.title}
          message={errorRolsInfo.message}
        />
      )}

      {!errorRolsInfo && (
        <View style={styles.rolList}>
          {/* LISTA DE COLABORADORES */}
          <FlatList
            nestedScrollEnabled={true}
            data={rolsInfo}
            onTouchStart={() => {
              setShowContextMenu(false);
              setSelectWorker(false);
            }}
            onScroll={event => {
              setContentOffsetY(event.nativeEvent.contentOffset.y);
            }}
            renderItem={({item, index}) => (
              <UserRol
                item={{...item, index}}
                handleRolChange={handleRolChange}
                handleShowDeleteItemView={handleShowDeleteItemView}
              />
            )}
            ListFooterComponent={
              <View style={styles.rolSelectorContainer}>
                <Text style={styles.rolSelectorTitle}>{'Asignar un rol'}</Text>

                {/* NEW WORKER USERNAME */}
                <TouchableOpacity
                  style={styles.userNameSelector}
                  onPress={() => setSelectWorker(true)}>
                  <View style={styles.userNameInput}>
                    {workerSelected && (
                      <Worker
                        item={workerSelected}
                        constrolWorkersList={constrolWorkersList}
                      />
                    )}
                  </View>
                  <Text style={styles.userNameLabel}>
                    {'Escribe un nombre de usuario'}
                  </Text>
                </TouchableOpacity>

                {/* ROL SELECTOR FOR NEW ITEM / WORKER  */}
                <View style={styles.rolSelector}>
                  <Icon
                    name="arrow_left"
                    factor={0.7}
                    Borderless
                    forceColor
                    color={Colors.gray}
                    onPress={() => setNewRol(false)}
                  />
                  <Text style={styles.rolName}>{allRols[currentRol].rol}</Text>
                  <Icon
                    name="arrow_right"
                    factor={0.7}
                    Borderless
                    forceColor
                    color={Colors.gray}
                    onPress={() => setNewRol(true)}
                  />
                </View>
                <Text style={styles.rolDescription}>
                  {allRols[currentRol].desc}
                </Text>

                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={() => saveNewWorkerAdded()}>
                  <Text style={styles.saveButtonText}>{'Guardar'}</Text>
                </TouchableOpacity>
              </View>
            }
            keyExtractor={(item, index) => index.toString()}
            onMomentumScrollEnd={event => {
              const offsetY = event.nativeEvent.contentOffset.y;
              updateListInViewOffset(offsetY);
            }}
          />

          {/* CONTEXT MENU */}
          {showContextMenu && (
            <MenuContextual
              opciones={opciones}
              index={itemSelected.index}
              itemHeight={itemHeight}
              lastIndex={lastIndex}
              contentOffsetY={contentOffsetY}
              initialValue={55}
            />
          )}

          {/* CONFIRMACION ELIMINAR COLABORADOR */}
          {showDeleteView && (
            <ConfirmacionEliminar
              colaborador={itemSelected}
              cancelar={() => setShowDeleteView(false)}
              confirmarEliminacionColaborador={handleDeleteItem}
              rols
            />
          )}
        </View>
      )}

      <WorkersListModal
        modalVisible={selectWorker}
        close={setSelectWorker}
        rolsInfo={rolsInfo}
        constrolWorkersList={constrolWorkersList}
      />
    </View>
  );
}

const UserRol = ({item, handleRolChange, handleShowDeleteItemView}) => {
  return (
    <View style={styles.roltem}>
      {/* USER IMAGE*/}
      <View style={styles.userImageContainer}>
        <UserImage link={item.link} />
      </View>

      {/* USER INFO */}
      <View style={styles.userInfoContainer}>
        <View style={styles.userTextContainer}>
          <Text style={styles.nombre}>{`${item.nombre} ${
            item.apellido_paterno
          }`}</Text>
          <Text style={styles.link}>{item.link}</Text>
        </View>

        {/* USER ROL */}
        <View style={styles.rolesSeleccion}>
          <Icon
            name="arrow_left"
            factor={0.6}
            Borderless
            forceColor
            color={item.index !== 0 ? Colors.gray : 'transparent'}
            onPress={() =>
              item.index !== 0 ? handleRolChange(false, item) : null
            }
          />
          <Text style={styles.rolesNombre}>{item.rol}</Text>
          <Icon
            name="arrow_right"
            factor={0.6}
            Borderless
            forceColor
            color={item.index !== 0 ? Colors.gray : 'transparent'}
            onPress={() =>
              item.index !== 0 ? handleRolChange(true, item) : null
            }
          />
        </View>

        {/* TRIGGER PARA DESPLEGAR MENU DE OPCIONES DE COLABORADOR */}
        <TouchableOpacity
          style={styles.deleteItemTrigger}
          onPress={() => {
            handleShowDeleteItemView(item, true);
          }}>
          <Icon
            name="times"
            factor={0.5}
            Borderless
            forceColor
            color={Colors.grayBold}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Worker = ({item, constrolWorkersList, size}) => {
  return (
    <TouchableOpacity
      style={[styles.roltem, {width: size ? size : '100%'}]}
      onPress={() => constrolWorkersList(item)}>
      {/* USER IMAGE*/}
      <View style={styles.workerImageContainer}>
        <UserImage link={item.link} />
      </View>

      {/* USER INFO */}
      <View style={styles.workerInfoContainer}>
        <Text style={styles.nombre}>{`${item.nombre} ${
          item.apellido_paterno
        }`}</Text>
        <Text style={styles.link}>{item.link}</Text>
      </View>
    </TouchableOpacity>
  );
};

const WorkersList = ({rolsInfo, top, constrolWorkersList}) => {
  return (
    <View style={styles.workersList}>
      <FlatList
        nestedScrollEnabled={true}
        data={rolsInfo}
        renderItem={({item}) => (
          <Worker item={item} constrolWorkersList={constrolWorkersList} />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const WorkersListModal = ({
  modalVisible,
  close,
  rolsInfo,
  constrolWorkersList,
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
        <WorkersList
          rolsInfo={rolsInfo}
          constrolWorkersList={constrolWorkersList}
        />
      </TouchableOpacity>
    </Modal>
  );
};

export default Roles;
