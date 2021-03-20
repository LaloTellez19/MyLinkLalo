import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Modal,
} from 'react-native';

import Colors from '../../../../../constants/Colors';
import Layout from '../../../../../constants/Layout';
import Text from '../../../../../components/Text';
import Icon from '../../../../../components/Icon';
import MenuContextual from '../../../../../components/MenuContextual';
import DeleteConfirmation from '../../../../../components/DeleteConfirmation';

const width = Layout.window.width;
const height = Layout.window.height;
const itemHeight = 65;

/* STYLES */
const styles = StyleSheet.create({
  /* PHONES LIST */
  phonesList: {},
  phonesListHeader: {
    // marginTop: 5,
    // marginBottom: 10,
  },
  /* DATA ELEMENT STYLES */
  dataElement: {
    width: width,
    height: itemHeight,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // marginTop: 5,
    // marginBottom: 5,
    // paddingTop: 5,
  },
  dataFieldIcon: {
    width: '15%',
    alignItems: 'center',
  },
  dataFieldContainer: {
    width: '85%',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderColor: Colors.gray,
    paddingBottom: 5,
  },
  dataElementTextContainer: {
    width: '70%',
    marginRight: 20,
    marginLeft: 25,
    alignItems: 'flex-start',
  },
  dataElementTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dataElementType: {
    width: '35%',
    fontSize: 15,
    color: Colors.grayBoald,
  },
  dataElementData: {
    fontSize: 16,
    color: Colors.defaultTextColor,
    textAlign: 'center',
    marginTop: 5,
  },
  dataElementDataEditable: {
    width: '100%',
    fontSize: 16,
    fontFamily: 'HelveticaNeueLt',
    color: Colors.defaultTextColor,
    padding: 0,
  },
  phoneOptions: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },
  /* PHONETYPESLIST STYLES */
  phoneTypesList: {
    width: width / 2,
    position: 'absolute',
    top: 0,
    right: 20,
    elevation: 2,
    backgroundColor: 'white',
    borderWidth: 0.5,
    borderColor: Colors.gray,
    borderRadius: 10,
  },
  phoneTypesItem: {
    width: width / 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  phoneTypesItemText: {
    fontSize: 15,
    color: Colors.grayBoald,
  },
  /* MODAL STYLES */
  modalContainer: {
    width: width,
    height: height,
    opacity: 0.95,
    backgroundColor: Colors.grayBold,
    alignItems: 'center',
    // justifyContent: 'center',
  },
  deleteConfirmationContainer: {
    marginTop: height / 4,
  },
});

class Phones extends React.Component {
  constructor(props) {
    super(props);
    this.phoneBase = {
      id: undefined,
      type: 0,
      number: '',
      verified: false,
    };

    this.state = {
      allData: [...this.props.data],
      fieldSelected: {},
      elementIndex: this.props.index,
      phoneBase: {...this.phoneBase},
      showPhoneTypesList: false,
      lastIndex: this.props.data.length - 1,
      contextMenuHeader: false,
      contextMenuList: false,
      contextMenuIn: false,
      deleteConfirmation: false,
    };

    this.types = [
      {
        icon: 'phone',
        type: 'Teléfono',
      },
      {
        icon: 'mobile',
        type: 'Celular',
      },
      {
        icon: 'message_send',
        type: 'Mensajes',
      },
    ];

    this.allMenuOptions = [
      {
        name: this.types[0].icon,
        text: this.types[0].type,
        onPress: () => this.contextMenuOptionSelected(0),
      },
      {
        name: this.types[1].icon,
        text: this.types[1].type,
        onPress: () => this.contextMenuOptionSelected(1),
      },
      {
        name: this.types[2].icon,
        text: this.types[2].type,
        onPress: () => this.contextMenuOptionSelected(2),
      },
    ];
  }

  /* HANDLE ITEM SELECTION */
  handleItemSelection = (save = false, item, itemIndex) => {
    if (save) {
      this.props.handleSaveChanges(this.state.elementIndex, item, itemIndex);
      this.setState({fieldSelected: {}});
    } else {
      this.setState({
        fieldSelected: {...item, index: itemIndex},
      });
    }
  };

  setContextMenuIn = (item, index, adding) => {
    console.log('setContextMenuIn: ', item, index, adding);
    if (adding) {
      this.setState({
        fieldSelected: {...item, index},
        contextMenuHeader: true,
        contextMenuList: false,
      });
    } else {
      this.setState({
        fieldSelected: {...item, index},
        contextMenuHeader: false,
        contextMenuList: true,
      });
    }
  };

  /* HANLDE DATA CHANGES */
  handleDataChanges = (value, adding, type) => {
    const {allData, fieldSelected, phoneBase} = this.state;
    const finalValue = value !== '' ? parseInt(value, 10) : '';
    const prop = type ? 'type' : 'number';

    if (!adding) {
      allData[fieldSelected.index][prop] = finalValue;
      this.setState({allData: [...allData]});
    } else {
      phoneBase[prop] = finalValue;
      this.setState({phoneBase: {...phoneBase}});
    }
  };

  addNewPhone = (save, item, index) => {
    const {allData} = this.state;
    if (save) {
      item.id = `a${index + 1}`;
      this.setState({
        allData: [...allData, item],
        phoneBase: this.phoneBase,
        lastIndex: index,
      });
    }
  };

  handleDeletePhone = (item, index) => {
    const {deleteConfirmation, fieldSelected} = this.state;

    if (!deleteConfirmation) {
      this.setState({
        deleteConfirmation: true,
        fieldSelected: {...item, index},
      });
    } else {
      const dataCopy = this.state.allData;
      dataCopy.splice(fieldSelected.index, 1);
      this.setState({
        allData: dataCopy,
        deleteConfirmation: false,
        lastIndex: dataCopy.length - 1,
      });
    }
  };

  contextMenuOptionSelected = type => {
    const adding = this.state.fieldSelected.id === undefined;
    this.setState(
      {
        contextMenuHeader: false,
        contextMenuList: false,
      },
      () => this.handleDataChanges(type, adding, true),
    );
  };

  hideContextMenu = onFocus => {
    this.setState({
      fieldSelected: onFocus ? this.state.fieldSelected : {},
      contextMenuHeader: false,
      contextMenuList: false,
    });
  };

  render() {
    const {
      allData,
      fieldSelected,
      phoneBase,
      lastIndex,
      contextMenuHeader,
      contextMenuList,
      deleteConfirmation,
    } = this.state;
    return (
      <TouchableWithoutFeedback onPress={() => this.hideContextMenu()}>
        <View>
          <View style={styles.phonesListHeader}>
            <Phone
              item={phoneBase}
              index={allData.length}
              types={this.types}
              handleDataChanges={this.handleDataChanges}
              handleItemSelection={this.addNewPhone}
              handleDeletePhone={this.handleDeletePhone}
              setContextMenuIn={this.setContextMenuIn}
              hideContextMenu={this.hideContextMenu}
              adding
            />
          </View>

          <FlatList
            data={allData}
            renderItem={({item, index}) => (
              <Phone
                item={item}
                index={index}
                types={this.types}
                fieldSelected={fieldSelected}
                handleDataChanges={this.handleDataChanges}
                handleItemSelection={this.handleItemSelection}
                handleDeletePhone={this.handleDeletePhone}
                setContextMenuIn={this.setContextMenuIn}
                hideContextMenu={this.hideContextMenu}
              />
            )}
            keyExtractor={(item, index) => item.id}
          />

          {contextMenuHeader && (
            <MenuContextual
              opciones={this.allMenuOptions}
              position={5}
              icons
              right={60}
              underlayColor={Colors.personal}
            />
          )}

          {contextMenuList && (
            <MenuContextual
              opciones={this.allMenuOptions}
              index={fieldSelected.index}
              itemHeight={
                fieldSelected.index === lastIndex ? itemHeight + 8 : itemHeight
              }
              lastIndex={lastIndex}
              contentOffsetY={0}
              initialValue={itemHeight - 75}
              underlayColor={Colors.personal}
              icons
              right={60}
            />
          )}

          {/* DELETE CONFIRMATION MODAL */}
          <DeleteConfirmationModal
            modalVisible={deleteConfirmation}
            close={() => this.setState({deleteConfirmation: false})}
            handleDeletePhone={this.handleDeletePhone}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const Phone = ({
  item,
  index,
  types,
  fieldSelected,
  handleDataChanges,
  handleItemSelection,
  handleDeletePhone,
  setContextMenuIn,
  hideContextMenu,
  adding,
}) => {
  const inputValue = item.number.toString();
  const arrowRef = React.createRef(null);

  return (
    <View style={styles.dataElement}>
      <View style={styles.dataFieldIcon}>
        <Icon
          name={types[item.type].icon}
          Borderless
          forceColor
          color={Colors.gray}
        />
      </View>

      {/* DATA FIELD */}
      <View style={styles.dataFieldContainer}>
        <View style={styles.dataElementTextContainer}>
          <View style={styles.dataElementTypeContainer}>
            <Text style={styles.dataElementType}>{types[item.type].type}</Text>
            <Icon
              ref={arrowRef}
              name="arrow_down"
              size={30}
              factor={0.8}
              Borderless
              onPress={() => {
                setContextMenuIn(item, index, adding);
              }}
            />
          </View>
          <TextInput
            style={styles.dataElementDataEditable}
            value={inputValue}
            placeholder={adding ? 'Agregar número de teléfono' : null}
            onChangeText={text => handleDataChanges(text, adding)}
            onFocus={() => {
              !adding
                ? handleItemSelection(
                    fieldSelected.index === index,
                    item,
                    index,
                  )
                : null;

              hideContextMenu(true);
            }}
            keyboardType={'numeric'}
          />
        </View>

        {/* EDIT / CONFIRM CHANGES */}
        {!adding && inputValue !== '' && (
          <TouchableOpacity
            style={styles.phoneOptions}
            onPress={() => {
              if (fieldSelected.index === index) {
                handleItemSelection(fieldSelected.index === index, item, index);
              } else {
                handleDeletePhone(item, index);
              }
            }}>
            <Icon
              name={fieldSelected.index === index ? 'check_mark' : 'times'}
              size={25}
              factor={0.8}
              background={Colors.grayLight}
              // Borderless
              forceColor
              color={Colors.grayBold}
            />
          </TouchableOpacity>
        )}
        {adding && inputValue !== '' && (
          <TouchableOpacity
            style={styles.phoneOptions}
            onPress={() => handleItemSelection(true, item, index)}>
            <Icon
              name="check_mark"
              size={25}
              factor={0.8}
              background={Colors.grayLight}
              // Borderless
              forceColor
              color={Colors.grayBold}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const DeleteConfirmationModal = ({modalVisible, close, handleDeletePhone}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        close();
      }}>
      <TouchableOpacity style={styles.modalContainer} onPress={() => close()}>
        <View style={styles.deleteConfirmationContainer}>
          <DeleteConfirmation
            text={'Vas a eliminar este elemento, ¿Estás seguro?'}
            personal={true}
            confirmation={() => handleDeletePhone()}
            cancelar={() => close()}
          />
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default Phones;
