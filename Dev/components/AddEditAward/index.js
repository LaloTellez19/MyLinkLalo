import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';

import {Navigation} from 'react-native-navigation';

import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';
import Header from '../Header';
import Text from '../Text';
import Icon from '../Icon';
import CameraRollPicker from '../CameraRollPicker';
import EditTextField from '../EditTextField';

const width = Layout.window.width;
const height = Layout.window.height;
const imgHeight = width / 4;

/* STYLES */
const styles = StyleSheet.create({
  mainContainer: {
    width: width,
    height: height,
    backgroundColor: 'white',
  },
  topContainer: {
    backgroundColor: 'white',
  },
  /* AWARD INFO STYLES */
  awardInfo: {
    marginTop: 10,
    alignItems: 'center',
  },
  awardImgContainer: {
    width: 150,
    height: 150,
    borderRadius: 10,
    backgroundColor: Colors.business,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  awardImg: {
    width: 150,
    height: 150,
    resizeMode: 'cover',
  },
  awardName: {
    fontSize: 16,
    color: Colors.defaultTextColor,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 5,
  },
  /* MENU STYLES */
  menu: {
    width: width,
    height: 75,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: 'white',
    elevation: 5,
    marginTop: 10,
  },
  menuItem: {
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 5,
  },
  /* CAMERA ROLL PICKER STYLES */
  cameraRollPicker: {
    borderTopWidth: 0.5,
    borderColor: Colors.gray,
    elevation: 0,
    backgroundColor: 'white',
    marginTop: 0,
  },
  /* BUTTON STYLES */
  button: {
    width: 150,
    height: 40,
    position: 'absolute',
    top: imgHeight * 2 + imgHeight * 0.7,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    marginRight: 10,
    marginLeft: 10,
    borderWidth: 0.5,
    borderColor: Colors.gray,
  },
  buttonText: {
    fontSize: 16,
    color: Colors.grayLight,
  },
});

function AddEditAward(props) {
  const {adding, awardSelected, accountColor, handleAddEditAward} = props;
  const awardBase = {
    img: awardSelected ? awardSelected.img : '',
    title: awardSelected ? awardSelected.title : '',
  };

  const [award, setAward] = React.useState({...awardBase});
  const [optionSelected, setOptionSelected] = React.useState(0);
  const [editingViewMargin, setEditingViewMargin] = React.useState(0);

  const keyBoard = Keyboard;

  const menu = [
    {
      id: 'img',
      icon: 'gallery',
      text: 'Imagen',
    },
    {
      id: 'title',
      icon: 'abc',
      text: 'Título',
    },
  ];

  React.useEffect(() => {
    keyBoard.addListener('keyboardDidShow', () => {
      setEditingViewMargin(-260);
    });
		
    keyBoard.addListener('keyboardDidHide', () => {
      setEditingViewMargin(0);
    });
		
    return () => {
      keyBoard.removeAllListeners('keyboardDidShow');
      keyBoard.removeAllListeners('keyboardDidShow');
      console.log('listeners removed');
    };
  }, []);

  const goBack = () => {
    Navigation.pop(props.componentId, {
      component: {
        name: 'my-link.AddEditAward',
      },
    });
  };

  /* CHANGE VIEW */
  const goToProp = () => {
    const goToIndex = optionSelected === 0 ? 1 : 0;
    if (editingViewMargin === 0) {
      setOptionSelected(goToIndex);
    } else {
      Keyboard.dismiss();
    }
  };

  /* CHANGE AWARD PROP */
  const handlePropChange = (prop, value) => {
    award[prop] = value;
    setAward({...award});
  };

  /* SAVE CHANGES */
  const saveChanges = () => {
    handleAddEditAward(award, adding);
    goBack();
  };

  const selectImage = response => {
    const selected = response[0];
    const noImgSelected = awardSelected ? awardSelected.img : '';
    handlePropChange('img', selected ? selected : noImgSelected);
  };

  return (
    <View style={styles.mainContainer}>
      {/* TOP CONTAINER */}
      <View style={styles.topContainer}>
        <Header goBack={() => goBack()} />
        {/* AWARD INFO */}
        <View style={styles.awardInfo}>
          <View
            style={[styles.awardImgContainer, {backgroundColor: accountColor}]}>
            {award.img === '' && (
              <Icon
                name="card_out"
                size={45}
                factor={0.8}
                background={'white'}
              />
            )}
            {award.img !== '' && (
              <Image style={styles.awardImg} source={{uri: award.img}} />
            )}
          </View>
          <Text style={styles.awardName}>{award.title}</Text>
        </View>
      </View>

      <KeyboardAvoidingView style={{marginTop: editingViewMargin}}>
        {/* MENU */}
        <View style={styles.menu}>
          {menu.map((item, index) => (
            <TouchableOpacity key={index} style={styles.menuItem}>
              <Icon
                name={item.name}
                size={45}
                background={
                  index === optionSelected ? accountColor : 'transparent'
                }
                forceColor
                color={index === optionSelected ? 'white' : Colors.gray}
              />
              <Text
                style={[
                  styles.menuItemText,
                  {
                    color:
                      index === optionSelected
                        ? accountColor
                        : Colors.defaultTextColor,
                  },
                ]}>
                {item.text}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* EDITING VIEWS */}
        <View>
          {optionSelected === 0 && (
            <View style={styles.cameraRollPicker}>
              <CameraRollPicker
                onChange={selectImage}
                cameraEnabled
                topbarEnabled={false}
              />
              {award.img !== '' && (
                <TouchableOpacity
                  style={[styles.button, {backgroundColor: accountColor}]}
                  onPress={() => goToProp()}>
                  <Text style={styles.buttonText}>{'Siguiente'}</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
          {optionSelected === 1 && (
            <EditTextField
              handlePropChange={handlePropChange}
              property={'title'}
              label={'Nombre'}
              goToProp={goToProp}
              value={award.title}
              save={saveChanges}
              placeholder={adding ? 'Agrega un nuevo galardón' : null}
              personal
            />
          )}
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

export default AddEditAward;
