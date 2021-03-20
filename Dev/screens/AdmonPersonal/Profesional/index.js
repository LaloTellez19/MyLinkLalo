import React from 'react';
import {View, StyleSheet, TouchableOpacity, Modal} from 'react-native';

import Colors from '../../../constants/Colors';
import Layout from '../../../constants/Layout';
import Icon from '../../../components/Icon';
import Text from '../../../components/Text';
import ProfilePicture from '../../../components/ProfilePicture';
import Loading from '../../../components/Loading';
import ErrorOrNoData from '../../../components/ErrorOrNoData';
import ListWithContextMenu from '../../../components/ListWithContextMenu';

import NewItemForm from './NewItemForm';
import {userHelper} from '../../../helpers/API';

const width = Layout.window.width;
const height = Layout.window.height;
const itemHeight = 50;

/* STYLES */
const styles = StyleSheet.create({
  mainContainer: {
    width: width,
    flex: 1,
    marginTop: 5,
  },
  /* HEADER STYLES */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 15,
    marginLeft: 25,
  },
  headerText: {
    fontSize: 18,
    color: Colors.defaultTextColor,
  },
  /* FORM CONTAINER STYLE */
  formContainer: {
    position: 'absolute',
    top: 40,
    alignSelf: 'center',
    alignItems: 'center',
  },
  /* EDUCATION OR WORK ITEM STYLES */
  edOrWorkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
    marginLeft: 10,
    backgroundColor: Colors.grayLight,
    height: itemHeight,
    marginTop: 30,
    marginBottom: 5,
    borderRadius: 10,
  },
  edOrWorkItemImage: {
    marginBottom: 35,
    marginLeft: 10,
    marginRight: 5,
  },
  edOrWorkItemIcon: {
    marginLeft: 0,
  },
  edOrWorkItemTextContainer: {
    width: width / 2.2,
    marginLeft: 10,
  },
  edOrWorkItemJobOrGrade: {
    fontSize: 12,
    color: Colors.defaultTextColor,
  },
  edOrWorkItemPlace: {
    fontSize: 10,
    color: Colors.defaultTextColor,
  },
  verifiedIcon: {
    position: 'absolute',
    right: 25,
  },
  itemOptions: {
    position: 'absolute',
    right: -5,
  },
  /* ADD BUTTON STYLES */
  addNew: {
    height: 35,
    borderRadius: 10,
    marginTop: 15,
    marginBottom: 20,
    marginRight: 90,
    marginLeft: 90,
    alignItems: 'center',
    backgroundColor: Colors.personal,
  },
  addNewText: {
    fontSize: 14,
    color: 'white',
    paddingTop: 7,
  },
  /* MODAL STYLES */
  modalContainer: {
    width: width,
    height: height,
    opacity: 0.95,
    backgroundColor: Colors.grayBold,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

class Profesional extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selection: this.props.seleccion,
      educationInfo: [],
      workInfo: [],
      list: [],
      loading: true,
      error: null,
      lastIndex: 0,
      optionSelected: false,
      editing: false,
      displayForm: false,
      itemSelected: {},
    };

    this.contextMenu = ['Editar', 'Eliminar'];

    this.allMenuOptions = [
      {
        text: this.contextMenu[0],
        onPress: () => {
          this.setState({
            editing: true,
            displayForm: true,
            optionSelected: true,
          });
        },
      },
      {
        text: this.contextMenu[1],
        onPress: () => {
          this.setState({
            optionSelected: true,
          });
          this.handleDeleteItem();
        },
      },
    ];

    this.handleSaveEditData = this.handleSaveEditData.bind(this);
    this.getInitialDataForm = this.getInitialDataForm.bind(this);
    this.selectItem = this.selectItem.bind(this);
  }

  /* FETCH DATA */
  fetchData = uid => {
    userHelper
      .getProfessionalData({uid: uid})
      .then(response => {
        this.setState({
          educationInfo: response.data.educationInfo,
          workInfo: response.data.workInfo,
          lastIndex: response.data.educationInfo.length - 1,
          loading: false,
        });
      })
      .catch(err => {
        this.setState({
          educationInfo: null,
          workInfo: null,
          error: err,
          loading: false,
        });
      });
  };

  componentDidMount() {
    this.fetchData(this.props.uid);
  }

  componentDidUpdate() {
    if (this.props.seleccion !== this.state.selection) {
      if (this.props.seleccion === 0) {
        this.setState({
          lastIndex: this.state.educationInfo.length - 1,
          selection: this.props.seleccion,
          optionSelected: true,
        });
      } else if (this.props.seleccion === 1) {
        this.setState({
          lastIndex: this.state.workInfo.length - 1,
          selection: this.props.seleccion,
          optionSelected: true,
        });
      }
    }
  }

  /* HANDLE SAVE NEW DATA */
  handleSaveEditData = formInfo => {
    const {editing, educationInfo, itemSelected, workInfo} = this.state;
    const list = this.props.seleccion === 0 ? educationInfo : workInfo;
    if (!editing) {
      /* SAVE NEW ITEM */
      userHelper
        .saveProfessionalData({uid: this.props.uid, formInfo: formInfo})
        .then(response => {
          list.push({...formInfo, id: response.data.id});
          if (this.props.seleccion === 0) {
            this.setState({
              educationInfo: [...list],
              lastIndex: list.length - 1,
            });
          } else {
            this.setState({workInfo: [...list]});
          }
        })
        .catch(() => {});
    } else {
      /* EDIT ITEM */
      userHelper
        .editProfessionalData({
          uid: this.props.uid,
          ref: itemSelected.id,
          formInfo: formInfo,
        })
        .then(() => {
          list[itemSelected.index] = formInfo;
          if (this.props.seleccion === 0) {
            this.setState({educationInfo: [...list]});
          } else {
            this.setState({workInfo: [...list]});
          }
        })
        .catch(() => {});
    }

    this.setState({
      displayForm: false,
      editing: false,
    });
  };

  /* HANDLE DELETE ITEM */
  handleDeleteItem = () => {
    const {itemSelected, educationInfo, workInfo} = this.state;
    const list = this.props.seleccion === 0 ? educationInfo : workInfo;
    userHelper
      .deleteProfessionalData({
        uid: this.props.uid,
        ref: itemSelected.id,
      })
      .then(() => {
        list.splice(itemSelected.index, 1);

        if (this.props.seleccion === 0) {
          this.setState({educationInfo: [...list]});
        } else {
          this.setState({workInfo: [...list]});
        }
      })
      .catch(() => {});
  };

  /* GET INITIAL DATA FORM */
  getInitialDataForm = () => {
    const {editing, itemSelected} = this.state;
    let initialData = {};

    if (editing) {
      initialData = itemSelected;
    } else {
      initialData = {
        company: {
          linkname: undefined,
          name: '',
        },
        isWork: this.props.seleccion === 0 ? false : true,
        position: '',
        time: {
          current: false,
          finish: {},
          start: {},
          validated: false,
        },
      };
    }

    return initialData;
  };

  /* GET FORM FIELDS */
  getFormFields = () => {
    const formFields = [
      {
        field: 'company',
        nestedField: 'name',
        label:
          this.props.seleccion === 0
            ? 'Nombre de la escuela'
            : 'Nombre del lugar de trabajo',
        input: true,
      },
      {
        field: 'position',
        label: this.props.seleccion === 0 ? 'Grado obtenido' : 'Cargo / Puesto',
        input: true,
      },
      {
        status: true,
        field: 'time',
        nestedField: 'current',
        label:
          this.props.seleccion === 0
            ? 'Estudios Finalizados'
            : 'Actualmente trabajo aquí',
      },
      {
        field: 'time',
        nestedField: 'start',
        nestedField_1: 'seconds',
        label: 'Fecha de inicio',
        dateTrigger: true,
      },
      {
        field: 'time',
        nestedField: 'finish',
        nestedField_1: 'seconds',
        label: 'Fecha de finalización',
        dateTrigger: true,
      },
    ];
    return formFields;
  };

  /* OPEN / CLOSE FORM */
  openCloseForm = (open = false) => {
    if (open) {
      this.setState({displayForm: true});
    } else {
      this.setState({
        displayForm: false,
        editing: false,
      });
    }
  };

  /* SELECT ITEM */
  selectItem = (item, optionSelected) => {
    this.setState({
      itemSelected: item,
      optionSelected: optionSelected,
    });
  };

  render() {
    const {
      educationInfo,
      workInfo,
      loading,
      error,
      lastIndex,
      itemSelected,
      optionSelected,
      displayForm,
      editing,
    } = this.state;
    const {seleccion, updateListInViewOffset} = this.props;

    return (
      <View style={styles.mainContainer}>
        {loading && <Loading />}

        {error && <ErrorOrNoData title={error.title} message={error.message} />}

        {/* NO ITEMS IN LIST */}
        {/* {!list && !loading && (
          <ErrorOrNoData title={'Data not found'} message={'Try to reload'} />
        )} */}

        {/* JOBS / EDUCATION LIST */}
        {!error && !loading && (
          <ListWithContextMenu
            data={seleccion === 0 ? educationInfo : workInfo}
            idExtractor
            ListItem={(item, setShowContextMenu) => (
              <EdOrWorkItem
                item={item}
                work={seleccion === 0 ? false : true}
                setShowContextMenu={setShowContextMenu}
                selectItem={this.selectItem}
              />
            )}
            ListFooterComponent={
              <View>
                {/* ADD BUTTON */}
                <TouchableOpacity
                  style={styles.addNew}
                  onPress={() => this.openCloseForm(true)}>
                  <Text style={styles.addNewText}>{'Agregar'}</Text>
                </TouchableOpacity>
              </View>
            }
            lastIndex={lastIndex}
            allMenuOptions={this.allMenuOptions}
            itemSelected={itemSelected}
            itemHeight={itemHeight + 35}
            initialValue={itemHeight}
            optionSelected={optionSelected}
            underlayColor={Colors.personal}
            updateListInViewOffset={updateListInViewOffset}
          />
        )}

        {/* FORM TO ADD NEW */}
        {/* {displayForm && (
          <View style={styles.formContainer}>
            <NewItemForm
              initialData={this.getInitialDataForm()}
              formFields={this.getFormFields()}
              saveNewData={this.handleSaveEditData}
              close={() => this.openCloseForm()}
              work={seleccion === 0 ? false : true}
              editing={editing}
            />
          </View>
        )} */}

        <NewItemFormModal
          modalVisible={displayForm}
          close={this.openCloseForm}
          initialData={this.getInitialDataForm()}
          formFields={this.getFormFields()}
          saveNewData={this.handleSaveEditData}
          work={seleccion === 0 ? false : true}
          editing={editing}
        />
      </View>
    );
  }
}

const EdOrWorkItem = ({
  item,
  setShowContextMenu,
  selectItem,
  noMenu,
  vipDark,
}) => {
  const {company, isWork, position, time} = item;

  const backgroundColor = vipDark
    ? {backgroundColor: Colors.dimGray}
    : {backgroundColor: Colors.grayLight};

  const textColor = vipDark
    ? {color: Colors.grayLight}
    : {color: Colors.defaultTextColor};

  const textColor_2 = vipDark
    ? {color: Colors.silverChalice}
    : {color: Colors.defaultTextColor};

  const isWorkIcon =
    time.current && !vipDark
      ? Colors.personal
      : time.current && vipDark
      ? 'white'
      : Colors.gray;

  return (
    <View style={[styles.edOrWorkItem, backgroundColor]}>
      {/* ED / WORK PLACE IMAGE */}
      <View style={styles.edOrWorkItemImage}>
        <ProfilePicture linkname={company.linkname} size={60} Business />
      </View>

      {/* ED / WORK PLACE ICON */}
      <View style={styles.edOrWorkItemIcon}>
        <Icon
          name={isWork ? 'business' : 'school'}
          size={30}
          factor={0.7}
          Borderless
          forceColor
          color={isWorkIcon}
        />
      </View>

      {/* PLACE NAME AND POSITION / GRADE */}
      <View style={styles.edOrWorkItemTextContainer}>
        <Text style={[styles.edOrWorkItemJobOrGrade, textColor]}>
          {position}
        </Text>
        <Text style={[styles.edOrWorkItemPlace, textColor_2]}>
          {company.name}
        </Text>
      </View>

      {/* VERIFIED ICON */}
      {isWork && time.validated && (
        <View style={styles.verifiedIcon}>
          <Icon
            name={'my_link_social'}
            size={20}
            factor={0.7}
            Borderless
            background={'black'}
            // forceColor
            // color={item.completed || item.working ? Colors.personal : Colors.gray}
          />
        </View>
      )}

      {/* CONTEXT MENU TRIGGER */}
      {!noMenu && (
        <TouchableOpacity
          style={styles.itemOptions}
          onPress={() => {
            setShowContextMenu();
            selectItem(item, false);
          }}>
          <Icon
            name="options"
            factor={0.7}
            forceColor
            color={Colors.gray}
            Borderless
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const NewItemFormModal = ({
  modalVisible,
  close,
  initialData,
  formFields,
  saveNewData,
  work,
  editing,
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
        <NewItemForm
          initialData={initialData}
          formFields={formFields}
          saveNewData={saveNewData}
          close={() => close(false)}
          work={work}
          editing={editing}
        />
      </TouchableOpacity>
    </Modal>
  );
};

export {EdOrWorkItem};

export default Profesional;
