import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Modal,
} from 'react-native';

import Colors from '../../../../../constants/Colors';
import Layout from '../../../../../constants/Layout';
import Text from '../../../../../components/Text';
import Icon from '../../../../../components/Icon';
import DeleteConfirmation from '../../../../../components/DeleteConfirmation';

const width = Layout.window.width;
const height = Layout.window.height;
const itemHeight = 65;

/* STYLES */
const styles = StyleSheet.create({
  /* DATA ELEMENT STYLES */
  dataElement: {
    width: width,
    height: itemHeight,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
  },
  dataElementDataEditable: {
    width: '100%',
    fontSize: 16,
    fontFamily: 'HelveticaNeueLt',
    color: Colors.defaultTextColor,
    padding: 0,
  },
  emailOptions: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
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

function Emails(props) {
  const {data, index: elementIndex, handleSaveChanges} = props;

  const emailBase = {
    id: undefined,
    email: '',
    verified: false,
  };

  const [allData, setAllData] = React.useState([...data]);
  const [fieldSelected, setFieldSelected] = React.useState({});
  const [newEmail, setNewEmail] = React.useState({...emailBase});
  const [deleteConfirmation, setDeleteConfirmation] = React.useState(false);

  /* HANDLE ITEM SELECTION */
  const handleItemSelection = (save = false, item, itemIndex) => {
    if (save) {
      handleSaveChanges(elementIndex, item, itemIndex);
      setFieldSelected({});
    } else {
      setFieldSelected({...item, index: itemIndex});
    }
  };

  /* HANLDE DATA CHANGES */
  const handleDataChanges = (value, adding) => {
    if (!adding) {
      allData[fieldSelected.index].email = value;
      setAllData([...allData]);
    } else {
      newEmail.email = value;
      setNewEmail({...newEmail});
    }
  };

  const addNewEmail = (save, item, index) => {
    if (save) {
      item.id = `a${index + 1}`;
      setAllData([...allData, item]);
      setNewEmail({...emailBase});
    }
  };

  const handleDeleteEmail = (item, index) => {
    if (!deleteConfirmation) {
      setDeleteConfirmation(true);
      setFieldSelected({...item, index});
    } else {
      allData.splice(fieldSelected.index, 1);
      setAllData([...allData]);
      setDeleteConfirmation(false);
    }
  };

  const getEmailDom = email => {
    const withoutAt = email.split('@');
    const withoutDot = withoutAt[1].split('.');
    return withoutDot[0];
  };

  return (
    <TouchableWithoutFeedback onPress={() => setFieldSelected({})}>
      <View>
        <Email
          item={newEmail}
          index={allData.length}
          fieldSelected={fieldSelected}
          handleDataChanges={handleDataChanges}
          handleItemSelection={addNewEmail}
          handleDeleteEmail={handleDeleteEmail}
          adding
        />

        <FlatList
          data={allData}
          renderItem={({item, index}) => (
            <Email
              item={item}
              index={index}
              emailDom={getEmailDom(item.email)}
              fieldSelected={fieldSelected}
              handleDataChanges={handleDataChanges}
              handleItemSelection={handleItemSelection}
              handleDeleteEmail={handleDeleteEmail}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
        />

        {/* DELETE CONFIRMATION MODAL */}
        <DeleteConfirmationModal
          modalVisible={deleteConfirmation}
          close={() => setDeleteConfirmation(false)}
          handleDeleteEmail={handleDeleteEmail}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

const Email = ({
  item,
  index,
  emailDom,
  fieldSelected,
  handleDataChanges,
  handleItemSelection,
  handleDeleteEmail,
  adding,
}) => {
  const capitalizeFirstLetter = email => {
    const capitalized = email.charAt(0).toUpperCase() + email.slice(1);
    return capitalized;
  };

  return (
    <View style={styles.dataElement}>
      <View style={styles.dataFieldIcon}>
        <Icon
          name={emailDom === 'my-link' ? 'my_link' : 'mail'}
          Borderless
          forceColor
          color={emailDom !== 'my-link' ? Colors.gray : null}
          Colorless={emailDom === 'my-link'}
        />
      </View>

      {/* DATA FIELD */}
      <View style={styles.dataFieldContainer}>
        <View style={styles.dataElementTextContainer}>
          <View style={styles.dataElementTypeContainer}>
            <Text style={styles.dataElementType}>
              {emailDom ? capitalizeFirstLetter(emailDom) : 'Email'}
            </Text>
          </View>
          <TextInput
            style={styles.dataElementDataEditable}
            value={item.email}
            placeholder={adding ? 'Agregar nuevo email' : null}
            onChangeText={text => handleDataChanges(text, adding)}
            onFocus={() => {
              !adding
                ? handleItemSelection(
                    fieldSelected.index === index,
                    item,
                    index,
                  )
                : null;
            }}
          />
        </View>

        {!adding && item.email !== '' && (
          <TouchableOpacity
            style={styles.emailOptions}
            onPress={() => {
              if (fieldSelected.index === index) {
                handleItemSelection(fieldSelected.index === index, item, index);
              } else {
                handleDeleteEmail(item, index);
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
        {adding && item.email !== '' && (
          <TouchableOpacity
            style={styles.emailOptions}
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

const DeleteConfirmationModal = ({modalVisible, close, handleDeleteEmail}) => {
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
            confirmation={() => handleDeleteEmail()}
            cancelar={() => close()}
          />
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default Emails;
