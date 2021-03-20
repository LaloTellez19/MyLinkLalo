import React from 'react';
import {View, Modal, TouchableOpacity, StyleSheet} from 'react-native';

import Layout from '../../constants/Layout';
import Colors from '../../constants/Colors';

const width = Layout.window.width;
const height = Layout.window.height;

const styles = StyleSheet.create({
  modalContainer: {
    width: width,
    height: height,
    opacity: 0.95,
    backgroundColor: Colors.grayBold,
    alignItems: 'center',
  },
  justifyModal: {
    justifyContent: 'center',
  },
});

function ModalDarkBackground(props) {
  const {
    animationType,
    transparent,
    modalVisible,
    close,
    children,
    notJustify,
  } = props;

  return (
    <Modal
      animationType={animationType}
      transparent={transparent}
      visible={modalVisible}
      onRequestClose={() => {
        close();
      }}>
      <TouchableOpacity
        style={[
          styles.modalContainer,
          !notJustify ? styles.justifyModal : null,
        ]}
        onPress={() => close()}>
        {children}
      </TouchableOpacity>
    </Modal>
  );
};

export default ModalDarkBackground;
