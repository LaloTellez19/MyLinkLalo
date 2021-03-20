import React from 'react';
import {View, StyleSheet, Switch, ScrollView} from 'react-native';

import Layout from '../../../../constants/Layout';
import Colors from '../../../../constants/Colors';
import Text from '../../../../components/Text';
import ErrorOrNoData from '../../../../components/ErrorOrNoData';

const width = Layout.window.width;

/* STYLES */
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  /* HEADER STYLES */
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 30,
    paddingBottom: 10,
    borderBottomWidth: 0.5,
    borderColor: Colors.gray,
  },
  headerText: {
    fontSize: 16,
    color: Colors.defaultTextColor,
  },
  /* ACCOUNT OPTIONS STYLES */
  accountOption: {
    width: width,
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 10,
  },
  accountOptionControl: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  accountOptionTitle: {
    fontSize: 16,
    color: Colors.defaultTextColor,
    width: 200,
  },
  accountOptionSwitch: {
    width: 100,
  },
  accountOptionDescription: {
    fontSize: 14,
    color: Colors.defaultTextColor,
    width: 295,
    marginTop: 10,
    textAlign: 'justify',
    lineHeight: 20,
  },
});

function Visibilidad(props) {
  const {publicAccount, setPublicAccount, updateListInViewOffset} = props;

  const [accountState, setAccountState] = React.useState(publicAccount);
  const [error, setError] = React.useState(null);

  /* HANDLE UPDATE VISIBILITY STATE */
  const handleUpdateVisiilityState = () => {
    const errorUpdating = {
      title: 'There was a problem processing the data',
      message: 'Try to reload',
    };

    try {
      setPublicAccount('publicAccount', !accountState);
      setAccountState(!accountState);
      setError(null);
    } catch (err) {
      setError('errorPublicAccount', errorUpdating);
    }
  };

  return (
    <ScrollView
      style={styles.mainContainer}
      nestedScrollEnabled={true}
      onMomentumScrollEnd={event => {
        const offsetY = event.nativeEvent.contentOffset.y;
        updateListInViewOffset(offsetY);
      }}>
      {error && <ErrorOrNoData title={error.title} message={error.message} />}

      {!error && (
        <View>
          {/* HEADER */}
          <View style={styles.header}>
            <Text style={styles.headerText}>{'Visibilidad de la cuenta'}</Text>
          </View>

          <View>
            {/* PUBLIC ACCOUNT */}
            <View style={styles.accountOption}>
              <View style={styles.accountOptionControl}>
                <Text style={styles.accountOptionTitle}>
                  {'Cuenta Pública'}
                </Text>
                <View style={styles.accountOptionSwitch}>
                  <Switch
                    trackColor={{
                      true: Colors.grayLight,
                      false: Colors.grayLight,
                    }}
                    thumbColor={accountState ? Colors.personal : Colors.gray}
                    onValueChange={() => handleUpdateVisiilityState()}
                    value={accountState}
                  />
                </View>
              </View>
              <Text style={styles.accountOptionDescription}>
                {
                  'Con una cuenta pública, todos los usuarios podrán seguir y ver tus publicaciones'
                }
              </Text>
            </View>

            {/* PRIVATE ACCOUNT */}
            <View style={styles.accountOption}>
              <View style={styles.accountOptionControl}>
                <Text style={styles.accountOptionTitle}>
                  {'Cuenta Privada'}
                </Text>
                <View style={styles.accountOptionSwitch}>
                  <Switch
                    trackColor={{
                      true: Colors.grayLight,
                      false: Colors.grayLight,
                    }}
                    thumbColor={!accountState ? Colors.personal : Colors.gray}
                    onValueChange={() => handleUpdateVisiilityState()}
                    value={!accountState}
                  />
                </View>
              </View>
              <Text style={styles.accountOptionDescription}>
                {
                  'Con una cuenta privada, solo los usuarios que apruebes podrán seguir y ver tus publicaciones.Esto no afectará a tus seguidores actuales.'
                }
              </Text>
            </View>
          </View>
        </View>
      )}
    </ScrollView>
  );
}

export default Visibilidad;
