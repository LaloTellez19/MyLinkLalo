/* UPDATE  USERINFO */
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