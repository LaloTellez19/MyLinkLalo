import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import ViewPager from '@react-native-community/viewpager';

import Layout from '../../../constants/Layout';
import Colors from '../../../constants/Colors';
import MenuTabs from '../../../components/MenuTabs';

const width = Layout.window.width;
const height = Layout.window.height;

const MyPager = () => {
  const menu = ['First page', 'Second page', 'Third page'];
  const [currentView, setCurrentView] = React.useState(0);
  const viewPager = React.useRef(null);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.topContainer}>
        <Text>{'MyPager'}</Text>
        <MenuTabs
          opciones={menu}
          seleccion={currentView}
          seleccionar={page => {
            setCurrentView(page);
            viewPager.current.setPage(page);
          }}
          personal
          fontSize={14}
        />
      </View>
      <ViewPager
        ref={viewPager}
        style={styles.viewPager}
        initialPage={0}
        onPageSelected={PageSelectedEvent => {
          console.log('viewPager', Object.keys(viewPager.current));
          setCurrentView(PageSelectedEvent.nativeEvent.position);
        }}>
        <View key="1" style={styles.viewPager1}>
          <Text>First page</Text>
        </View>
        <View key="2" style={styles.viewPager2}>
          <Text>Second page</Text>
        </View>
        <View key="3" style={styles.viewPager3}>
          <Text>Third page</Text>
        </View>
      </ViewPager>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: width,
    height: height,
  },
  topContainer: {
    height: 58,
  },
  viewPager: {
    width: width,
    height: height - 58,
  },
  viewPager1: {
    backgroundColor: Colors.personal,
    borderTopWidth: 0.5,
    borderColor: Colors.gray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewPager2: {
    backgroundColor: Colors.business,
    borderTopWidth: 0.5,
    borderColor: Colors.gray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewPager3: {
    backgroundColor: Colors.pet,
    borderTopWidth: 0.5,
    borderColor: Colors.gray,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default MyPager;
