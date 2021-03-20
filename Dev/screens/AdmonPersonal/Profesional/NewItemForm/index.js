import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import Text from '../../../../components/Text';
import Icon from '../../../../components/Icon';
import Colors from '../../../../constants/Colors';

/* STYLES */
const styles = StyleSheet.create({
  /* FORM CONTAINER STYLE */
  formContainer: {
    backgroundColor: 'white',
    width: 330,
    height: 460,
    borderRadius: 10,
    elevation: 5,
    borderWidth: 1,
    borderColor: Colors.gray,
  },
  /* FORM HEADER STYLES */
  formHeader: {
    width: 330,
    height: 50,
    marginBottom: -20,
  },
  formIcon: {
    position: 'absolute',
    top: 35,
    left: 0,
  },
  closeFormIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  /* FORM FIELD STYLES */
  formField: {
    width: 260,
    marginLeft: 40,
    marginBottom: 10,
  },
  textInput: {
    fontSize: 14,
    fontFamily: 'HelveticaNeueLt',
    color: Colors.defaultTextColor,
    paddingBottom: 0,
    borderBottomWidth: 0.5,
    borderColor: Colors.gray,
  },
  noTextView: {
    height: 30,
    marginBottom: 5,
    borderBottomWidth: 0.5,
    borderColor: Colors.gray,
    justifyContent: 'center',
  },
  noTextInput: {
    fontSize: 14,
    color: Colors.defaultTextColor,
  },
  label: {
    fontSize: 12,
    color: Colors.defaultTextColor,
  },
  /* STATUS SELECTOR STYLES */
  status: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 40,
  },
  statusIcon: {
    marginLeft: 25,
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 100,
    backgroundColor: 'white',
    elevation: 3,
  },
  /* DATE PICKER ICON */
  datePickerIcon: {
    position: 'absolute',
    bottom: 20,
    right: -5,
  },
  /* ADD NEW BUTTON STYLES */
  addButton: {
    marginTop: 30,
    width: 170,
    height: 35,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: Colors.personal,
  },
  addButtonText: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
  },
  /* FORM INFO ISN´T VALID NOTIFICATION */
  invalidFormInfoNotification: {
    position: 'absolute',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 75,
    elevation: 5,
    backgroundColor: 'white',
    width: 280,
    height: 45,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: Colors.gray,
  },
  invalidFormInfoNotificationText: {
    fontSize: 14,
    color: Colors.defaultTextColor,
  },
});

function NewItemField(props) {
  const {initialData, formFields, close, saveNewData, work, editing} = props;

  const [formInfo, setFormInfo] = React.useState(initialData);
  const [invalidFormInfo, setInvalidFormInfo] = React.useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);
  const [dateField, setDateField] = React.useState([]);

  /* HANDLE PROP CHANGE */
  const handlePropChange = (field, value, nestedField) => {
    if (nestedField) {
      formInfo[field][nestedField] = value;
    } else {
      formInfo[field] = value;
    }

    setFormInfo({
      ...formInfo,
    });
  };

  /* SHOW DATE PICKER */
  const showDatePicker = fieldInfo => {
    if (fieldInfo) {
      console.log(fieldInfo);
      setDateField(fieldInfo);
    }

    if (isDatePickerVisible) {
      setDatePickerVisibility(false);
    } else {
      setDatePickerVisibility(true);
    }
  };

  const handleConfirm = date => {
    handlePropChange(dateField[0], date, dateField[1]);
    showDatePicker();
  };

  /* ADD INFO */
  const addInfo = () => {
    /* CHECK IF FORM INFO IS VALID */
    const isFormInfoValid =
      formInfo.company.name !== '' && formInfo.position !== '';
    if (isFormInfoValid) {
      /* SAVE NEW INFO */
      saveNewData(formInfo);
      setInvalidFormInfo(false);

      /* RESET FORM FIELDS */
      setFormInfo(initialData);
    } else {
      setInvalidFormInfo(true);
    }
  };

  return (
    <View>
      <TouchableWithoutFeedback
        onPress={() => {
          setInvalidFormInfo(false);
          Keyboard.dismiss();
        }}>
        <View style={styles.formContainer}>
          {/* FORM HEADER */}
          <FormHeader close={close} work={work} />

          {/* FORM FIELDS */}
          <View>
            {formFields.map((item, index) => {
              if (!item.status) {
                return (
                  <FormInput
                    key={index}
                    formInfo={formInfo}
                    field={item.field}
                    nestedField={item.nestedField}
                    nestedField_1={item.nestedField_1}
                    label={item.label}
                    input={item.input}
                    handlePropChange={handlePropChange}
                    showDatePicker={showDatePicker}
                    dateTrigger={item.dateTrigger}
                    setInvalidFormInfo={setInvalidFormInfo}
                  />
                );
              } else {
                return (
                  <StatusSelector
                    key={index}
                    field={item.field}
                    nestedField={item.nestedField}
                    label={item.label}
                    initialStatus={formInfo[item.field][item.nestedField]}
                    handlePropChange={handlePropChange}
                  />
                );
              }
            })}
          </View>

          {/* ADD NEW BUTTON */}
          <TouchableOpacity style={styles.addButton} onPress={() => addInfo()}>
            <Text style={styles.addButtonText}>
              {editing ? 'Guardar' : 'Agregar'}
            </Text>
          </TouchableOpacity>

          {/* INVALID FORM INFO */}
          {invalidFormInfo && (
            <View style={styles.invalidFormInfoNotification}>
              <Text style={styles.invalidFormInfoNotificationText}>
                {formInfo.company.name === ''
                  ? `Escribe el ${formFields[0].label}`
                  : `Escribe el ${formFields[1].label}`}
              </Text>
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>

      {/* DATE PICKER */}
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={showDatePicker}
      />
    </View>
  );
}

const FormHeader = ({close, work}) => {
  return (
    <View style={styles.formHeader}>
      {/* HEADER ICON */}
      <View style={styles.formIcon}>
        <Icon
          name={work ? 'business' : 'school'}
          size={40}
          factor={0.8}
          Borderless
          forceColor
          color={Colors.gray}
        />
      </View>

      {/* CLOSE ICON */}
      <TouchableOpacity style={styles.closeFormIcon} onPress={() => close()}>
        <Icon
          name="times"
          size={25}
          factor={0.9}
          Borderless
          forceColor
          color={Colors.grayBold}
          background={Colors.grayLight}
        />
      </TouchableOpacity>
    </View>
  );
};

function FormInput({
  formInfo,
  field,
  nestedField,
  nestedField_1,
  label,
  input,
  handlePropChange,
  dateTrigger,
  showDatePicker,
  setInvalidFormInfo,
}) {
  const months = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ];

  /* GET DATE */
  const getDate = () => {
    let displayedDate = '';
    try {
      let timeStamp = {};

      if ('seconds' in formInfo[field][nestedField]) {
        timeStamp = new Date(
          parseInt(`${formInfo[field][nestedField][nestedField_1]}000`, 10),
        );
      } else {
        timeStamp = formInfo[field][nestedField];
      }

      displayedDate = (
        <View style={styles.noTextView}>
          <Text style={styles.noTextInput}>{`${timeStamp.getDate()} de ${
            months[timeStamp.getMonth()]
          } de ${timeStamp.getFullYear()}`}</Text>
        </View>
      );
    } catch (error) {
      displayedDate = <View style={styles.noTextView} />;
    }

    return displayedDate;
  };

  return (
    <View style={styles.formField}>
      {input && (
        <TextInput
          style={styles.textInput}
          onFocus={() => setInvalidFormInfo(false)}
          onChangeText={text => handlePropChange(field, text, nestedField)}
          value={nestedField ? formInfo[field][nestedField] : formInfo[field]}
        />
      )}
      {!input && getDate()}
      <Text style={styles.label}>{label}</Text>
      {dateTrigger && (
        <DatePickerTrigger
          showDatePicker={showDatePicker}
          fieldInfo={[field, nestedField]}
        />
      )}
    </View>
  );
}

const DatePickerTrigger = ({showDatePicker, fieldInfo}) => {
  return (
    <View style={styles.datePickerIcon}>
      <Icon
        name="arrow_right"
        size={30}
        factor={0.7}
        Borderless
        forceColor
        color={Colors.gray}
        onPress={() => showDatePicker(fieldInfo)}
      />
    </View>
  );
};

const StatusSelector = ({
  field,
  nestedField,
  label,
  initialStatus,
  handlePropChange,
}) => {
  const [status, setStatus] = React.useState(initialStatus);

  return (
    <View style={styles.status}>
      <Text style={styles.label}>{label}</Text>
      <View
        style={[
          styles.statusIcon,
          !status ? {borderColor: Colors.personal} : null,
        ]}>
        <Icon
          name="seen_arrow"
          size={25}
          Borderless
          forceColor
          color={status ? 'white' : Colors.personal}
          background={status ? Colors.personal : 'white'}
          onPress={() => {
            setStatus(!status);
            handlePropChange(field, !status, nestedField);
          }}
        />
      </View>
    </View>
  );
};

export default NewItemField;
