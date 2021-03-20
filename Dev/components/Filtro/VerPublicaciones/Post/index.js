import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';

import Layout from '../../../../constants/Layout';
import Colors from '../../../../constants/Colors';
import firebase from '../../../firebase';
import Text from '../../../Text';
import Icon from '../../../Icon';
import LugarHoraFecha from '../../../LugarHoraFecha';
import TaggedFriend from '../../../TaggedFriend';

const width = Layout.window.width;
const itemHeight = 90;

/* STYLES */
const styles = StyleSheet.create({
  itemPublicacionesContainer: {
    width: width,
    borderBottomWidth: 0.5,
    borderColor: Colors.gray,
    paddingBottom: 5,
  },
  itemPublicaciones: {
    flexDirection: 'row',
    alignItems: 'center',
    width: width,
    height: itemHeight,
    paddingLeft: 10,
    paddingRight: 5,
  },
  publicacionImgContainer: {
    width: 70,
    height: 70,
    borderWidth: 0.5,
    borderColor: Colors.gray,
    borderRadius: 10,
    marginTop: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  publicacionImagen: {
    width: 70,
    height: 70,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  noImageContainer: {
    width: 70,
    height: 70,
    borderWidth: 0.5,
    borderColor: Colors.gray,
    borderRadius: 10,
    marginTop: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.grayLight,
  },
  publicacionTextContainer: {
    width: width / 1.6,
    marginLeft: 20,
    marginRight: 0,
  },
  publicacionTitulo: {
    fontSize: 16,
    color: Colors.defaultTextColor,
    paddingTop: 5,
  },
  publicacionReacciones: {
    flexDirection: 'row',
    marginTop: 5,
  },
  publicacionReaccion: {
    fontSize: 14,
    color: Colors.defaultTextColor,
    paddingRight: 15,
  },
  publicationDetails: {
    marginTop: -5,
  },
});

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      post: {},
      img: false,
      ready: false,
    };
  }

  componentDidMount() {
    this.getPostData(this.props.item.id, this.props.item.index);
  }

  getPostData = (id, index) => {
    firebase
      .firestore()
      .collection('publicaciones')
      .doc(id)
      .get()
      .then(doc => {
        if (doc._exists) {
          this.setState(
            {
              post: {...doc.data(), id: doc.id, index},
              ready: true,
            },
            () => {
              if (this.state.post.media[0]) {
                this.getMedia(this.state.post.media[0]);
              }
            },
          );
        }
      })
      .catch(() => {});
  };

  getMedia = ref => {
    firebase
      .storage()
      .ref(ref)
      .getDownloadURL()
      .then(media => {
        this.setState({
          img: media,
        });
      })
      .catch(() => {});
  };

  render() {
    const {post, img, ready} = this.state;
    const {
      taggedFriendsOn,
      handleItemSelection,
      handleContextMenuDisplay,
    } = this.props;

    if (ready) {
      return (
        <View style={styles.itemPublicacionesContainer}>
          <TouchableOpacity
            onPress={() => {
              handleItemSelection(post);
            }}
            activeOpacity={0.5}>
            <View style={styles.itemPublicaciones}>
              {img && (
                <View style={styles.publicacionImgContainer}>
                  <Image style={styles.publicacionImagen} source={{uri: img}} />
                </View>
              )}
              {!img && <View style={styles.noImageContainer} />}

              <View style={styles.publicacionTextContainer}>
                {/* PUBLICATION TITLE */}
                <Text style={styles.publicacionTitulo}>{post.title}</Text>

                {/* PUBLICATION REACTIONS */}
                <View style={styles.publicacionReacciones}>
                  <Text style={styles.publicacionReaccion}>
                    {`${post.reproductions || 0} reproducciones`}
                  </Text>
                  <Text style={styles.publicacionReaccion}>
                    {`${post.comments || 0} comentarios`}
                  </Text>
                </View>

                {/* PUBLICATION DETAILS */}
                <View style={styles.publicationDetails}>
                  {post.date._seconds && (
                    <LugarHoraFecha
                      locationString={post.location.location}
                      timeStamp={parseInt(`${post.date._seconds}000`, 10)}
                    />
                  )}
                </View>
              </View>

              {/* PUBLICATION OPTIONS */}
              <TouchableOpacity
                style={{elevation: 1}}
                onPress={event => {
                  handleContextMenuDisplay(post);
                }}>
                <Icon
                  name="options"
                  factor={0.7}
                  Borderless
                  forceColor
                  color={Colors.gray}
                />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>

          {/* TAGGED FRIENDS */}
          {taggedFriendsOn && (
            <View>
              {post.etiquetados && (
                <FlatList
                  horizontal
                  nestedScrollEnabled={true}
                  showsHorizontalScrollIndicator={false}
                  data={post.etiquetados}
                  renderItem={({item: etiquetado}) => (
                    <TaggedFriend item={etiquetado} />
                  )}
                  keyExtractor={(_, index) => index.toString()}
                />
              )}
              {!post.etiquetados && <View style={{height: 65}} />}
            </View>
          )}
        </View>
      );
    } else {
      return (
        <View style={styles.itemPublicacionesContainer}>
          <View style={styles.itemPublicaciones} />
        </View>
      );
    }
  }
}

export default Post;
