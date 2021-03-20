import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Switch,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import Colors from '../../../../../constants/Colors';
import Layout from '../../../../../constants/Layout';
import Text from '../../../../../components/Text';
import Icon from '../../../../../components/Icon';

const width = Layout.window.width;
const height = Layout.window.height;

/* STYLES */
const styles = StyleSheet.create({
  /* FORM CONTAINER STYLES */
  mainContainer: {
    // position: 'absolute',
    // top: 10,
    // elevation: 10,
    alignItems: 'center',
    alignSelf: 'center',
  },
  formContainer: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'white',
    width: 330,
    height: height * 0.77,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: Colors.gray,
  },
  /* FORM HEADER STYLES */
  formHeader: {
    width: 330,
    height: 35,
  },
  formTitle: {
    fontSize: 20,
    color: Colors.defaultTextColor,
    marginTop: 10,
    marginLeft: 10,
  },
  formCloseIcon: {
    position: 'absolute',
    top: 10,
    right: 5,
  },
  /* FORM FIELDS CONTAINER STYLES */
  formFieldsContainer: {
    paddingTop: 5,
    marginBottom: 10,
    paddingBottom: 5,
  },
  /* FORM INPUT STYLES */
  inputField: {
    marginTop: 5,
    marginBottom: 5,
  },
  textInput: {
    width: 300,
    fontSize: 14,
    fontFamily: 'HelveticaNeueLt',
    paddingBottom: 0,
    borderBottomWidth: 0.5,
    borderColor: Colors.gray,
    color: Colors.defaultTextColor,
  },
  label: {
    fontSize: 12,
    color: Colors.defaultTextColor,
  },
  /* SWITCH FIELD STYLES */
  switchField: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: -75,
    marginTop: 10,
    marginBottom: 10,
  },
  switchFieldText: {
    width: 200,
    fontSize: 14,
    color: Colors.defaultTextColor,
    marginLeft: 20,
  },
  switchFieldSwitch: {
    marginLeft: 75,
  },
  /* ROL SELECTOR STYLES */
  rolSelectorContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
    borderTopWidth: 0.5,
    borderColor: Colors.gray,
  },
  rolSelectorTitle: {
    fontSize: 16,
    color: Colors.defaultTextColor,
    marginTop: 5,
    marginBottom: 10,
  },
  rolSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
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
  /* SAVE Employee BUTTON STYLES */
  saveButton: {
    width: 180,
    height: 40,
    backgroundColor: Colors.business,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    borderRadius: 10,
  },
  saveButtonText: {
    fontSize: 16,
    color: 'white',
  },
  /* INVALID FORM MESSAGE STYLES */
  invalidFormMessage: {
    width: 300,
    height: 50,
    position: 'absolute',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 100,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: Colors.gray,
    backgroundColor: 'white',
    elevation: 1,
  },
  invalidFormMessageText: {
    fontSize: 14,
    color: Colors.defaultTextColor,
  },
});

function AgregarColaborador(props) {
  const {cancelar, guardarColaborador} = props;
  const formFields = [
    {
      field: 'nombre',
      label: 'Nombre de usuario o Linkname',
    },
    {
      field: 'job',
      label: 'Puesto que desempeñara',
    },
    {
      field: 'distinctive',
      label: 'Agregar distintivo jerárquico',
      switch: true,
    },
    {
      field: 'showInProfile',
      label: 'Mostrar en perfil Business',
      switch: true,
    },
  ];
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

  const initialData = {
    link: false,
    nombre: '',
    apellido_paterno: '',
    job: '',
    distinctive: false,
    showInProfile: false,
    rol: '',
  };

  const [newEmployee, setNewEmployee] = React.useState({...initialData});
  const [currentRol, setCurrentRol] = React.useState(0);
  const [invalidForm, setInvalidForm] = React.useState(false);

  /* HANDLE Employee PROP CHANGE */
  const handleEmployeePropChange = (field, value) => {
    newEmployee[field] = value;
    setNewEmployee({...newEmployee});
  };

  /* HANDLE ROL CHANGE */
  const handleRolChange = next => {
    let currentRolIndex = currentRol;
    !next ? (currentRolIndex -= 1) : (currentRolIndex += 1);
    const newRolIndex = Math.min(Math.max(currentRolIndex, 0), lastRolIndex);
    setCurrentRol(newRolIndex);
    handleEmployeePropChange('rol', allRols[newRolIndex].rol);
  };

  /* SAVE NEW Employee */
  const saveNewEmployee = () => {
    const validCheck = newEmployee.nombre !== '' && newEmployee.job !== '';
    validCheck ? guardarColaborador(newEmployee) : setInvalidForm(true);
  };

  return (
    <KeyboardAvoidingView style={styles.mainContainer}>
      <TouchableOpacity
        style={styles.formContainer}
        activeOpacity={1}
        onPress={() => setInvalidForm(false)}>
        {/* FORM  HEADER */}
        <View style={styles.formHeader}>
          <Text style={styles.formTitle}>{'Agregar colaborador'}</Text>
          <View style={styles.formCloseIcon}>
            <Icon
              name="times"
              size={25}
              factor={0.9}
              Borderless
              forceColor
              color={Colors.grayBold}
              background={Colors.grayLight}
              onPress={() => cancelar()}
            />
          </View>
        </View>

        {/* NEW Employee INFO */}
        <View style={styles.formFieldsContainer}>
          {formFields.map((item, index) => {
            if (!item.switch) {
              return (
                <InputField
                  key={index}
                  info={newEmployee}
                  field={item.field}
                  label={item.label}
                  handleEmployeePropChange={handleEmployeePropChange}
                  setInvalidForm={setInvalidForm}
                />
              );
            } else {
              return (
                <SwitchField
                  key={index}
                  info={newEmployee}
                  field={item.field}
                  label={item.label}
                  handleEmployeePropChange={handleEmployeePropChange}
                />
              );
            }
          })}
        </View>

        {/* Employee ROL */}
        <View style={styles.rolSelectorContainer}>
          <Text style={styles.rolSelectorTitle}>{'Asignar un rol'}</Text>
          <View style={styles.rolSelector}>
            <Icon
              name="arrow_left"
              factor={0.7}
              Borderless
              forceColor
              color={Colors.gray}
              onPress={() => handleRolChange(false)}
            />
            <Text style={styles.rolName}>
              {newEmployee.rol || allRols[currentRol].rol}
            </Text>
            <Icon
              name="arrow_right"
              factor={0.7}
              Borderless
              forceColor
              color={Colors.gray}
              onPress={() => handleRolChange(true)}
            />
          </View>
          <Text style={styles.rolOptionalText}>{'(Opcional)'}</Text>
          <Text style={styles.rolDescription}>{allRols[currentRol].desc}</Text>
        </View>

        {/* SAVE NEW Employee */}
        <TouchableOpacity
          style={styles.saveButton}
          onPress={() => saveNewEmployee()}>
          <Text style={styles.saveButtonText}>{'Guardar'}</Text>
        </TouchableOpacity>

        {/* INVALID FORM MESSAGE */}
        {invalidForm && (
          <View style={styles.invalidFormMessage}>
            <Text style={styles.invalidFormMessageText}>
              {newEmployee.nombre === ''
                ? 'Escribe el nombre de tu colaborador'
                : 'Escribe el puesto de tu colaborador'}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const InputField = ({
  info,
  field,
  label,
  handleEmployeePropChange,
  setInvalidForm,
}) => {
  return (
    <View style={styles.inputField}>
      <TextInput
        style={styles.textInput}
        onFocus={() => setInvalidForm(false)}
        onChangeText={text => handleEmployeePropChange(field, text)}
        value={info[field]}
      />
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

const SwitchField = ({info, field, label, handleEmployeePropChange}) => {
  return (
    <View style={styles.switchField}>
      <View style={styles.switchFieldSwitch}>
        <Switch
          trackColor={{
            true: Colors.grayLight,
            false: Colors.grayLight,
          }}
          thumbColor={info[field] ? Colors.business : Colors.gray}
          onValueChange={() => handleEmployeePropChange(field, !info[field])}
          value={info[field]}
        />
      </View>
      <Text style={styles.switchFieldText}>{label}</Text>
    </View>
  );
};

export default AgregarColaborador;
