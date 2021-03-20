import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
// import uuid from 'uuid/v4';
// import AccountTypes from '../../constants/AccountTypes';

const queryResult = {status: true, message: undefined, data: undefined};
const Collections = {
  USERS: 'usuarios',
  PUBLICATIONS: 'publicaciones',
  CHAT_ROOMS: 'sala-chat',
  ZONES: 'zonas',
  QR_TOKEN: 'token-qr',
  TICKETS: 'tickets',
  SCANNED_CARDS: 'tarjetas_escaneadas',
  STORIES: 'stories',
  NOTIFICATIONS: 'notifications',
  LINKS: 'links',
  IN_APP_NOTIFICATIONS: 'in-app-notifications',
  CALLING_HISTORY: 'call-history',
  BUSINESS_SETTINGS: 'business-settings',
};

const SubCollections = {
  PROFESSIONAL: 'profesional',
};

/**
 * Validates the given username format
 * @param {string} username
 */
const isUsernameLegal = async ({username}) => {
  const result = queryResult;
  username = username.trim();
  if (
    username.match(/([aA-zZ0-9_-]+)/)[0] === username &&
    username.length >= 3 &&
    username.length <= 15
  ) {
    result.data = true;
    return result;
  } else {
    result.data = false;
    return result;
  }
};

/**
 * Validates if the given username is available to use
 * @param {string} username
 */
const isUsernameAvailable = async ({username}) => {
  const result = queryResult;
  username = username.trim();
  if (isUsernameLegal({username})) {
    return firestore()
      .collection(Collections.USERS)
      .where('link', '==', username)
      .limit(1)
      .get()
      .then(querySnapshot => {
        result.data = querySnapshot.empty;
        return result;
      })
      .catch(error => {
        result.status = false;
        result.message = error;
        return result;
      });
  } else {
    return new Promise((resolve, reject) => {
      result.data = false;
      reject(result);
    });
  }
};

/**
 * Validates the given linkname format
 * @param {string} linkname 
 */
const isLinknameValid = ({linkname}) => {
  linkname = linkname.trim();
  return linkname.match(/([a-z_\-]+[0-9]{4}[A-Z]{2})/) === linkname;
};

/**
 * Validates if the given linkname is available to use.
 * @param {string} linkname 
 */
const isLinknameAvailable = async ({linkname}) => {
  linkname = linkname.trim();
  const result = queryResult;

  if (isLinknameValid({linkname})) {
    return firestore()
      .collection(Collections.USERS)
      .where('linkname', '==', linkname)
      .limit(1)
      .get()
      .then(querySnapshot => {
        result.data = querySnapshot.empty;
        return result;
      })
      .catch(error => {
        result.status = false;
        result.message = error;
        return result;
      });
  } else {
    return new Promise((resolve, reject) => {
      result.data = false;
      reject(result);
    });
  }
};

/**
 * Performs an user search by the UID (Personal accounts only)
 * @param {string} uid 
 */
const getUserDataFromUID = async ({uid}) => {
  const result = queryResult;
  return firestore()
    .collection(Collections.USERS)
    .doc(uid)
    .get()
    .then(documentSnapshot => {
      if (documentSnapshot.exists) {
        result.data = documentSnapshot.data();
        return result;
      } else {
        return result;
      }
    })
    .catch(error => {
      result.status = false;
      result.message = error;
      return result;
    });
};

/**
 * Performs an user search by their linkname (All accounts)
 * @param {string} linkname 
 */
const getUserDataFromLinkname = async ({linkname}) => {
  const result = queryResult;
  return firestore()
    .collection(Collections.USERS)
    .where('linkname', '==', linkname)
    .limit(1)
    .get()
    .then(querySnapshot => {
      if (querySnapshot.empty) {
        result.data = {};
        return result;
      } else {
        result.data = {
          ...querySnapshot.docs[0].data(),
          ref: querySnapshot.docs[0].id,
        };
        return result;
      }
    })
    .catch(error => {
      result.status = false;
      result.message = error;
      return result;
    });
};

/**
 * Generates an object containing the accounts related to certain linkname
 * It only works with Personal accounts.
 * @param {string} linkname 
 */
// const getUserLinkedAccounts = async () => {
//   const result = queryResult;
//   const linkname = global.linkname;
//   const uid = global.user.uid;
//   return firestore()
//     .collection(Collections.USERS)
//     .where('parent', '==', linkname)
//     .get()
//     .then(async querySnapshot => {
//       const accounts = {
//         personal: [],
//         business: [],
//         pet: [],
//         health: [],
//         school: [],
//         privateMode: [], // DEPRECATED
//       };
//       try {
//         const user_data = await getUserDataFromUID({uid: uid});
//         if (!querySnapshot.empty) {
//           const unordered_accounts = [];
//           querySnapshot.forEach(account => {
//             const data = account.data();
//             account;
//             unordered_accounts.push({...data, ref: account.id});
//           });
//           accounts.personal = [{...user_data.data, ref: uid}];
//           unordered_accounts.forEach(account_1 => {
//             switch (account_1.tipo) {
//               case AccountTypes.Business:
//                 accounts.business.push(account_1);
//                 break;
//               case AccountTypes.Pet:
//                 accounts.personal.pet(account_1);
//                 break;
//               case AccountTypes.Health:
//                 accounts.personal.health(account_1);
//                 break;
//               case AccountTypes.School:
//                 accounts.personal.school(account_1);
//                 break;
//               default:
//                 accounts.personal.push(account_1);
//                 break;
//             }
//           });
//           result.data = accounts;
//           return result;
//         } else {
//           result.data = accounts;
//           return result;
//         }
//       } catch (error) {
//         result.status = false;
//         result.message = error;
//         return result;
//       }
//     })
//     .catch(error => {
//       result.status = false;
//       result.message = error;
//       return result;
//     });
// };

/* UPDATE  USERINFO */
/**
 * Update user`s data.
 * @param {string} ref
 * @param {object} updatedData
 */
const updateUserInfo = async ({ref, updatedData}) => {
  const result = queryResult;
  return firestore()
    .collection(Collections.USERS)
    .doc(ref)
    .update(updatedData)
    .then(() => result)
    .catch(error => {
      result.status = false;
      result.message = error;
      return result;
    });
};

/* GET PROFESSIONAL DATA */
/**
 * Get professional data.
 * @param {string} uid
 */
const getProfessionalData = async ({uid}) => {
  const result = queryResult;
  return firestore()
    .collection(Collections.USERS)
    .doc(uid)
    .collection(SubCollections.PROFESSIONAL)
    .get()
    .then(querySnapshot => {
      const work = [];
      const education = [];
      querySnapshot.docs.map((doc, index) => {
        let item = {...doc.data(), id: doc.id};
        if (item.isWork) {
          work.push(item);
        } else {
          education.push(item);
        }
      });
      result.data = {
        educationInfo: education,
        workInfo: work,
      };
      return result;
    })
    .catch(error => {
      result.status = false;
      result.message = error;
      return result;
    });
};

/* SAVE PROFESSIONAL DATA */
/**
 * Save user´s new professional data.
 * @param {string} uid
 * @param {object} formInfo
 */
const saveProfessionalData = async ({uid, formInfo}) => {
  const result = queryResult;
  return firestore()
    .collection(Collections.USERS)
    .doc(uid)
    .collection(SubCollections.PROFESSIONAL)
    .add(formInfo)
    .then(response => {
      result.data = response;
      return result;
    })
    .catch(error => {
      result.status = false;
      result.error = error;
      return result;
    });
};

/* EDIT PROFESSIONAL DATA */
/**
 * Edit professional data.
 * @param {string} uid
 * @param {string} ref
 * @param {object} formInfo
 */
const editProfessionalData = async ({uid, ref, formInfo}) => {
  const result = queryResult;
  return firestore()
    .collection(Collections.USERS)
    .doc(uid)
    .collection(SubCollections.PROFESSIONAL)
    .doc(ref)
    .set(formInfo)
    .then(() => {
      return result;
    })
    .catch(error => {
      result.status = false;
      result.error = error;
      return result;
    });
};

/* DELETE PROFESSIONAL DATA */
/**
 * Delete professional data.
 * @param {string} uid
 * @param {string} ref
 */
const deleteProfessionalData = async ({uid, ref}) => {
  const result = queryResult;
  return firestore()
    .collection(Collections.USERS)
    .doc(uid)
    .collection(SubCollections.PROFESSIONAL)
    .doc(ref)
    .delete()
    .then(() => {
      return result;
    })
    .catch(error => {
      result.status = false;
      result.error = error;
      return result;
    });
};

/**
 * Gets provided user's posts IDs
 * @param {string} linkname
 * @param {FirebaseFirestoreTypes.QueryDocumentSnapshot} lastItem
 */
const getUserPosts = async ({linkname, lastItem}) => {
  const result = queryResult;
  const pagingEnabled = lastItem;
  const onFetch = querySnapshot => {
    const postIDs = [];
    if (!querySnapshot.empty) {
      querySnapshot.forEach(item => {
        // postIDs.push({id: item.id, linkname: linkname});
        postIDs.push(item.data());
      });
      result.data = {
        posts: postIDs,
        lastItem: querySnapshot.docs[querySnapshot.docs.length - 1],
      };
    } else {
      result.data = {posts: [], lastItem: lastItem};
    }
    return result;
  };
  const onError = error => {
    result.status = false;
    result.message = error;
    return result;
  };
  return getUserDataFromLinkname({linkname})
    .then(async result => {
      const documentID = result.data.ref || undefined;
      if (documentID) {
        const collectionReference = firestore()
          .collection(Collections.USERS)
          .doc(documentID)
          .collection('publication');
        if (pagingEnabled) {
          return collectionReference
            .limit(20)
            .orderBy('date', 'desc')
            .startAfter(lastItem)
            .get()
            .then(onFetch)
            .catch(onError);
        } else {
          return collectionReference
            .limit(20)
            .orderBy('date', 'desc')
            .get()
            .then(onFetch)
            .catch(onError);
        }
      } else {
        return new Promise((resolve, reject) => {
          result.status = false;
          result.message = 'User does not exists?';
          reject(result);
        });
      }
    })
    .catch(onError);
};

/**
 * Delete user´s posts
 * @param {ref} string
 */
const deleteUserPosts = async ({ref}) => {
  const result = queryResult;
  return firestore()
    .collection(Collections.PUBLICATIONS)
    .doc(ref)
    .delete()
    .then(response => {
      result.data = response;
      return result;
    })
    .catch(error => {
      result.status = false;
      result.message = error;
      return result;
    });
};

/**
 * Returns the bounding box of given coordinates
 * @param {LatLng} coords
 * @param {number} km 
 */
const getBoundingBox = ({coords, km}) => {
  km = km || 1;
  const lngRatio = 1.0 / Math.cos(coords.lat * (Math.PI / 180));
  const adjust = 0.008983112;
  const north = coords.lat + km * adjust;
  const south = coords.lat - km * adjust;
  const east = coords.lng + km * adjust * lngRatio;
  const west = coords.lng - km * adjust * lngRatio;
  const boundingBox = {
    northWest: {lng: west, lat: north},
    southEast: {lng: east, lat: south},
  };
  return boundingBox;
};

/**
 * Returns all Zones and Spaces in a bounding box
 * @param {LatLng} coords
 * @param {number} zoomLevel
 */
const getDataInRange = async ({bounds, zoomLevel}) => {
  if (zoomLevel < 10) {
    this.setState({zonesData: []});
    return;
  }
  const latitude = await firestore()
    .collection(Collections.ZONES)
    .where('coords.latitude', '<=', bounds.northWest.lat)
    .where('coords.latitude', '>=', bounds.southEast.lat)
    .get()
    .then(querySnapshot => {
      const data = [];
      querySnapshot.forEach(item => {
        data.push(item.data());
      });
      return data;
    })
    .catch(() => {});

  const longitude = await firestore()
    .collection(Collections.ZONES)
    .where('coords.longitude', '<=', bounds.southEast.lng)
    .where('coords.longitude', '>=', bounds.northWest.lng)
    .get()
    .then(querySnapshot => {
      const data = [];
      querySnapshot.forEach(item => {
        data.push(item.data());
      });
      return data;
    })
    .catch(() => {});

  return Promise.all([latitude, longitude])
    .then(results => {
      const latitudeArray = results[0];
      const longitudeArray = results[1];
      const data = [];
      latitudeArray.forEach(item => {
        longitudeArray.forEach(item2 => {
          if (item.id == item2.id) {
            data.push(item);
          }
        });
      });

      return data;
    })
    .catch(() => {
      return [];
    });
};

/**
 * 
 * @param {LatLng} position
 * @param {Array} data
 */
const checkZoneInRange = ({position, data}) => {
  var collidesWith = [];
  data.forEach(point => {
    const collisionDistance = (1 / 1000) * point.radius;
    var distance = distanceBetweenPoints(
      {latitude: position.lat, longitude: position.lng},
      point.coords,
    );
    //if(distance <= collisionDistance){
    collidesWith.push({
      ...point,
      distance: {center: distance, bounding: distance - collisionDistance},
    });
    //}
  });
  return collidesWith;
};

/**
 * Returns the distance in km between two points
 * @param {LatLng} p1 
 * @param {LatLng} p2 
 */
const distanceBetweenPoints = (p1, p2) => {
  if (!p1 || !p2) {
    return 0;
  }

  var R = 6371; // Radius of the Earth in km
  var dLat = ((p2.latitude - p1.latitude) * Math.PI) / 180;
  var dLon = ((p2.longitude - p1.longitude) * Math.PI) / 180;
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((p1.latitude * Math.PI) / 180) *
      Math.cos((p2.latitude * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d;
};

const authHelper = {
  isUsernameLegal,
  isUsernameAvailable,
  isLinknameValid,
  isLinknameAvailable,
};

const userHelper = {
  getUserDataFromUID,
  getUserDataFromLinkname,
  // getUserLinkedAccounts,
  getUserPosts,
  deleteUserPosts,
  updateUserInfo,
  getProfessionalData,
  saveProfessionalData,
  editProfessionalData,
  deleteProfessionalData,
};

const mapsHelper = {
  getBoundingBox,
  getDataInRange,
  checkZoneInRange,
  distanceBetweenPoints,
};

export {authHelper, userHelper, mapsHelper};
