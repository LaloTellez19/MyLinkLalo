import React from 'react';
import {View, StyleSheet, TouchableOpacity, FlatList} from 'react-native';

import {Navigation} from 'react-native-navigation';

import Colors from '../../../constants/Colors';
import Layout from '../../../constants/Layout';
import Text from '../../Text';
import Icon from '../../Icon';
import UserImage from '../../UserImage';

const width = Layout.window.width;

/* STYLES */
const styles = StyleSheet.create({
  /* MAIN CONTAINER STYLES */
  mainContainer: {
    elevation: 2,
    backgroundColor: 'white',
    marginBottom: 5,
  },
  /* BLOCK NAME STYLES */
  blockName: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  blockNameText: {
    width: width / 1.3,
    fontSize: 16,
    color: Colors.defaultTextColor,
    marginLeft: 10,
    marginRight: 10,
  },
  seeAll: {
    fontSize: 14,
    color: Colors.personal,
  },
  /* STAFF LIST */
  staffList: {
    marginTop: 5,
    marginBottom: 10,
    paddingBottom: 5,
  },
  staffItem: {
    width: width / 3,
    marginTop: 32,
    marginBottom: 10,
    alignItems: 'center',
  },
  staffRol: {
    fontSize: 14,
    color: Colors.defaultTextColor,
    marginTop: 10,
    marginBottom: 5,
  },
  staffName: {
    fontSize: 12,
    color: Colors.grayBold,
  },
  stafflinkname: {
    fontSize: 12,
    color: Colors.defaultTextColor,
  },
  /* EMPLOYEE OF THE MONTH STYLES */
  employeeOfTheMonth: {
    width: '80%',
    height: 65,
    backgroundColor: Colors.grayLight,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: Colors.gray,
    position: 'absolute',
    elevation: 1,
    alignSelf: 'center',
    alignItems: 'center',
  },
  employeeOfTheMonthIcon: {
    position: 'absolute',
    top: 50,
    left: 5,
    elevation: 10,
  },
  employeeOfTheMontText: {
    fontSize: 12,
    color: Colors.eerieBlack,
    textAlign: 'center',
    paddingTop: 2,
  },
});

class StaffBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      staff: this.props.data.staff,
      employeesList: [],
      listReady: false,
    };
  }

  componentDidMount() {
    this.getEmployeesToShow();
  }

  getEmployeesToShow = () => {
    const staff = [...this.state.staff];
    let employeesList = [];
    let employeeIndex = 0;

    staff.map((item, index) => {
      if (item.monthEmployee) {
        employeesList = [item];
        employeeIndex = index;
      }
    });

    staff.splice(employeeIndex, 1);
    employeesList = [...employeesList, ...staff.slice(0, 2)];

    this.setState({
      employeesList: employeesList,
      listReady: true,
    });
  };

  handleSeeAll = () => {
    Navigation.showOverlay({
      component: {
        name: 'my-link.StaffProfile',
        passProps: {
          data: this.props.data,
          jobsInfo: this.state.employeesList,
          showOverlay: true,
        },
      },
    });
  };

  render() {
    const {employeesList, listReady} = this.state;
    const {data} = this.props;
    const vip = data.vip === 1;
    const vipDark = data.vip === 2;

    const backgroundColor = vipDark
      ? {backgroundColor: Colors.jet}
      : {backgroundColor: 'white'};

    const textColor = vipDark
      ? {color: Colors.silverChalice}
      : {color: Colors.defaultTextColor};

    const textColor_2 = vipDark
      ? {color: Colors.golden}
      : vip
      ? {color: 'black'}
      : {color: Colors.personal};

    const textColor_3 = vipDark
      ? {color: 'white'}
      : {color: Colors.defaultTextColor};

    const textColor_4 = vipDark
      ? {color: Colors.silverChalice}
      : {color: Colors.defaultTextColor};

    return (
      <View style={[styles.mainContainer, backgroundColor]}>
        {/* BLOCK NAME */}
        <View style={styles.blockName}>
          <Text style={[styles.blockNameText, textColor]}>
            {'Atención y Personal'}
          </Text>
          <TouchableOpacity onPress={() => this.handleSeeAll()}>
            <Text style={[styles.seeAll, textColor_2]}>{'Ver todo'}</Text>
          </TouchableOpacity>
        </View>

        {/* STAFF LIST */}
        {listReady && (
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={employeesList}
            renderItem={({item}) => (
              <TouchableOpacity onPress={() => this.handleSeeAll()}>
                <StaffItem
                  item={item}
                  textColors={[textColor_3, textColor_4]}
                />
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()}
            style={styles.staffList}
          />
        )}
      </View>
    );
  }
}

const StaffItem = ({item, textColors}) => {
  return (
    <View>
      {item.monthEmployee && (
        <View style={styles.employeeOfTheMonth}>
          <Text style={styles.employeeOfTheMontText}>{'Empleado del mes'}</Text>
        </View>
      )}
      {item.monthEmployee && (
        <View style={styles.employeeOfTheMonthIcon}>
          <Icon name="color_ribbon" factor={0.9} Borderless Colorless />
        </View>
      )}
      <View style={styles.staffItem}>
        <UserImage link={item.link} userSize={65} />
        <Text style={[styles.staffRol, textColors[0]]}>{item.rol}</Text>
        <Text style={[styles.staffName, textColors[1]]}>{`${item.nombre} ${
          item.apellido_paterno
        }`}</Text>
        <Text style={[styles.stafflinkname, textColors[0]]}>{item.link}</Text>
      </View>
    </View>
  );
};

export default StaffBlock;
