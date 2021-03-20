import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  FlatList,
} from 'react-native';

import {Navigation} from 'react-native-navigation';

import Colors from '../../../constants/Colors';
import Layout from '../../../constants/Layout';
import firebase from '../../../components/firebase';
import Text from '../../../components/Text';
import Loading from '../../../components/Loading';
import Icon from '../../../components/Icon';
import Header from '../../../components/Header';
import MenuContextual from '../../../components/MenuContextual';
import ErrorOrNoData from '../../../components/ErrorOrNoData';

import ProductDetails from './ProductDetails';

const width = Layout.window.width;
const itemHeight = 80;

/* DEFAULT IMG */
const defaultImage = 'https://i.picsum.photos/id/179/200/200.jpg';

/* STYLES */
const styles = StyleSheet.create({
  mainContainer: {
    width: width,
    flex: 1,
    backgroundColor: 'white',
  },
  noProductsButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  noProductsButton: {
    marginRight: 8,
    marginLeft: 8,
  },
  /* CATEGORIES HEADER STYLES */
  categoriesHeader: {
    flex: 1,
    height: 40,
    width: '100%',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    // borderBottomWidth: 0.5,
    // borderColor: Colors.gray,
  },
  categoriesTitle: {
    paddingTop: 10,
    fontSize: 18,
    color: Colors.defaultTextColor,
    textAlign: 'center',
    marginBottom: 8,
  },
  /* CATEGORIES LIST STYLES */
  categoriesList: {
    width: '100%',
    alignSelf: 'center',
    flex: 1,
    backgroundColor: 'white',
  },
  categoriesItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.grayLight,
    marginTop: 5,
    marginBottom: 10,
    height: itemHeight,
    elevation: 5,
  },
  categoriesImageContainer: {
    width: itemHeight,
    height: itemHeight,
    marginLeft: 10,
    marginRight: 20,
    borderWidth: 0.5,
    borderColor: Colors.gray,
    backgroundColor: Colors.business,
  },
  categoriesImage: {
    width: itemHeight,
    height: itemHeight,
    resizeMode: 'cover',
  },
  categoriesItemText: {
    width: width / 2.1,
    fontSize: 18,
    color: Colors.defaultTextColor,
  },
  contextMenuTrigger: {
    // paddingTop: 10,
    // paddingBottom: 10,
  },
  /* PRODUCTS LIST STYLES */
  productsList: {
    marginTop: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  productsListItem: {
    alignItems: 'center',
    height: 210,
    marginTop: 10,
    marginBottom: 10,
    borderColor: Colors.gray,
    marginRight: 2,
    marginLeft: 2,
    overflow: 'hidden',
    borderRadius: 10,
  },
  productImage: {
    width: 170,
    height: 170,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: Colors.gray,
    resizeMode: 'cover',
  },
  productInfoContainer: {
    width: 170,
    paddingLeft: 2,
  },
  productName: {
    fontSize: 16,
    color: Colors.defaultTextColor,
  },
  productDescription: {
    fontSize: 12,
    color: Colors.defaultTextColor,
  },
  productPrice: {
    fontSize: 16,
    color: Colors.defaultTextColor,
  },
  /* PROMOTION LABEL STYLES */
  promotionLabel: {
    position: 'absolute',
    bottom: 160,
    right: -70,
    width: 110,
    height: 110,
    backgroundColor: Colors.business,
    borderWidth: 2,
    borderColor: 'white',
    elevation: 1,
    transform: [{rotate: '45deg'}],
  },
  promotionIcon: {
    position: 'absolute',
    top: 5,
    right: 5,
    elevation: 1,
  },
  /* ADD BUTTONS STYLES */
  addButtonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  addButton: {
    height: 40,
    width: 150,
    marginTop: 15,
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: Colors.business,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    fontSize: 14,
    color: 'white',
  },
});

function Producto(props) {
  const {updateListInViewOffset, showOverlay, data} = props;
  const contextMenu = ['Editar Categoría', 'Eliminar Categoría'];
  const menuForAddEditCategory = [
    {
      id: 'img',
      name: 'gallery',
      text: 'Foto',
    },
    {
      id: 'category',
      name: 'name',
      text: 'Nombre',
    },
    {
      id: 'description',
      name: 'details',
      text: 'Descripción',
    },
  ];
  const menuForAddEditProduct = [
    {
      id: 'img',
      name: 'gallery',
      text: 'Foto',
    },
    {
      id: 'category',
      name: 'boxes',
      text: 'Categoría',
    },
    {
      id: 'name',
      name: 'name',
      text: 'Nombre',
    },
    {
      id: 'description',
      name: 'details',
      text: 'Descripción',
    },
    {
      id: 'price',
      name: 'dollar',
      text: 'Precio',
    },
  ];
  const contextMenuProducts = [
    'Editar',
    'Eliminar',
    'Crear Promoción',
    'Volver',
    'Quitar Promoción',
  ];

  const [categories, setCategories] = React.useState([]);
  const [productSelected, setProductSelected] = React.useState({});
  const [showProdcutDetails, setShowProdcutDetails] = React.useState(false);
  const [categorySelected, setCategorySelected] = React.useState({});
  const [contextMenuIn, setContextMenuIn] = React.useState('');
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [productViewActive, setProductViewActive] = React.useState(false);
  const [editingProduct, setEditingProduct] = React.useState(false);

  /* CONTEXT MENU OPTIONS */
  const contextMenuOptions = [
    {
      text: contextMenu[0],
      onPress: () => {
        goToAddEditCategory(false);
        setContextMenuIn('');
      },
    },
    {
      text: contextMenu[1],
      onPress: () => handleDeleteItem(categorySelected),
    },
  ];

  const getData = linkname => {
    const errorGettingData = {
      title: 'Data not found',
      message: 'Try to reload',
    };

    firebase
      .firestore()
      .collection('business')
      .doc(linkname)
      .collection('products')
      .get()
      .then(response => {
        const allCategories = response.docs.map((item, index) => {
          const category = item.data();
          return {...category, id: item.id};
        });

        setCategories(allCategories);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setError(errorGettingData);
      });
  };

  /* COMPONENTDIDMOUNT */
  React.useEffect(() => {
    getData('B-Clic');
  }, []);

  React.useEffect(() => {
    if (productViewActive) {
      updateCategoriesProp(categories);
    }
  }, [categories]);

  /* ADD OR EDIT CATEGORY */
  const handleAddOrEditCategory = (category, edit = false) => {
    if (!edit) {
      /* SAVE NEW CATEGORY */
      firebase
        .firestore()
        .collection('business')
        .doc('B-Clic')
        .collection('products')
        .add({...category, index: categories.length})
        .then(document => {
          console.log('idddd: ', document.id);
          setCategories([
            ...categories,
            {...category, id: document.id, index: categories.length},
          ]);
        })
        .catch(err => setError(err));
    } else {
      /* EDIT CATEGORY */
      firebase
        .firestore()
        .collection('business')
        .doc('B-Clic')
        .collection('products')
        .doc(category.id)
        .set(category)
        .then(() => {
          categories[category.index] = category;
          setCategories([...categories]);
        })
        .catch(err => setError(err));
    }
  };

  const updateProductsData = (id, newData) => {
    return firebase
      .firestore()
      .collection('business')
      .doc('B-Clic')
      .collection('products')
      .doc(id)
      .update({products: newData});
  };

  /* ADD OR EDIT PRODUCT */
  const handleAddOrEditProduct = (product, edit = false) => {
    setProductViewActive(false);
    if (!edit) {
      const categoryIndex = categories.findIndex(
        prod => prod.category === product.category,
      );
      const category = categories[categoryIndex];
      const newID = `${product.name}-${Object.keys(category.products).length}`;
      const newProduct = {...product, id: newID};
      console.log('new PRODUCT: ', newID);
      const newProductsMap = {...category.products, [`${newID}`]: newProduct};
      /* SAVE NEW PRODUCT */
      updateProductsData(category.id, newProductsMap)
        .then(() => {
          category.products = newProductsMap;
          setCategories([...categories]);
        })
        .catch(err => setError(err));
    } else {
      /* EDIT PRODUCT */
      const categoryChanged = productSelected.category !== product.category;
      const productCategoryIndex = categories.findIndex(
        item => item.category === product.category,
      );

      if (categoryChanged) {
        /* PRODUCT CATEGORY CHANGED */
        const oldCategoryIndex = categories.findIndex(
          item => item.category === productSelected.category,
        );
        const newProductsMap = {
          ...categories[productCategoryIndex].products,
          [`${product.id}`]: product,
        };
        /* ADD TO NEW CATEGORY */
        updateProductsData(categories[productCategoryIndex].id, newProductsMap)
          .then(() => {
            categories[productCategoryIndex].products = newProductsMap;
            /* REMOVE FROM OLD CATEGORY */
            delete categories[oldCategoryIndex].products[productSelected.id];
            updateProductsData(
              categories[oldCategoryIndex].id,
              categories[oldCategoryIndex].products,
            )
              .then(() => setCategories([...categories]))
              .catch(() => {});
          })
          .catch(err => setError(err));
      } else {
        /* CATEGORY DIDN'T CHANGE JUST UPDATE PRODUCT */
        const newProductsMap = categories[productCategoryIndex].products;
        newProductsMap[product.id] = product;
        updateProductsData(categories[productCategoryIndex].id, newProductsMap)
          .then(() => {
            categories[productCategoryIndex].products = newProductsMap;
            setCategories([...categories]);
          })
          .catch(err => {
            setError(err);
            console.log('Here´s the fucking error.');
          });
      }
      setProductSelected(product);
    }
  };

  /* HANDLE SHOW PRODUCT DETAILS */
  const handleShowProductDetails = product => {
    if (showOverlay) {
      goToProductDetails(product);
    } else {
      setProductSelected(product);
      setShowProdcutDetails(true);
    }
  };

  /* HANDLE PROMOTIONS */
  const handlePromotions = (remove = false) => {
    if (remove) {
      /* REMOVE PROMOTION */
      console.log(`REMOVE PROMOTION ON ${productSelected.name}`);
    } else {
      /* DELETE PROMOTION */
      console.log(`ADD PROMOTION ON ${productSelected.name}`);
    }
    setShowProdcutDetails(false);
  };

  /* HANDLE DELETE CATEGORY OR PRODUCT */
  const handleDeleteItem = (item, product = false) => {
    setContextMenuIn('');
    setShowProdcutDetails(false);

    if (product) {
      /* DELETE PRODUCT */
      const categoryIndex = categories.findIndex(
        prod => prod.category === item.category,
      );

      const category = categories[categoryIndex];
      delete category.products[item.id];

      firebase
        .firestore()
        .collection('business')
        .doc('B-Clic')
        .collection('products')
        .doc(categories[categoryIndex].id)
        .set(category)
        .then(() => {
          setCategories([...categories]);
        })
        .catch(err => setError(err));
    } else {
      /* DELETE CATEGORY */
      firebase
        .firestore()
        .collection('business')
        .doc('B-Clic')
        .collection('products')
        .doc(item.id)
        .delete()
        .then(() => {
          categories.splice(item.index, 1);
          setCategories([...categories]);
        })
        .catch(err => setError(err));
    }
  };

  /* GO TO ADD EDIT CATEGORY */
  const goToAddEditCategory = (add = true) => {
    Navigation.push(props.componentId, {
      component: {
        name: 'my-link.AddEditCategory',
        passProps: {
          menu: menuForAddEditCategory,
          handleAddOrEditCategory: handleAddOrEditCategory,
          categorySelected: add ? null : categorySelected,
          componentId: props.componentId,
        },
      },
    });
  };

  /* GO TO PRODUCT DETAILS */
  const goToProductDetails = product => {
    Navigation.showOverlay({
      component: {
        name: 'my-link.ProductDetails',
        passProps: {
          linkname: '',
          showOverlay: true,
          product: product,
          data: data,
        },
      },
    });
  };

  /* UPDATE CATEGORIES LIST */
  const updateCategoriesProp = allCategories => {
    Navigation.updateProps('ADDEDIT_PRODUCT_ID', {
      menu: menuForAddEditProduct,
      productSelected: editingProduct ? productSelected : null,
      handleAddOrEditProduct: handleAddOrEditProduct,
      categories: allCategories,
      active: 1,
      addCategory: goToAddEditCategory,
      componentId: props.componentId,
    });
  };

  /* GO TO ADD EDIT PRODUCT */
  const goToAddEditProduct = (add = false) => {
    setEditingProduct(!add);
    Navigation.push(props.componentId, {
      component: {
        name: 'my-link.AddEditProduct',
        id: 'ADDEDIT_PRODUCT_ID',
        passProps: {
          menu: menuForAddEditProduct,
          productSelected: add ? null : productSelected,
          handleAddOrEditProduct: handleAddOrEditProduct,
          categories: categories,
          active: 0,
          addCategory: goToAddEditCategory,
          componentId: props.componentId,
        },
      },
    });
  };

  const goBack = () => {
    Navigation.dismissOverlay(props.componentId);
  };

  const vip = data ? data.vip === 1 : false;
  const vipDark = data ? data.vip === 2 : false;
  console.log('vipDark: ', vipDark);
  const backgroundColor = vipDark
    ? {backgroundColor: 'black'}
    : {backgroundColor: 'white'};

  const backgroundColor_2 = vipDark
    ? {backgroundColor: Colors.jet}
    : {backgroundColor: 'white'};

  const textColor = vipDark
    ? {color: Colors.grayLight}
    : {color: Colors.defaultTextColor};

  const textColor_2 = vipDark
    ? {color: Colors.silverMetallic}
    : {color: Colors.defaultTextColor};

  const textColor_3 = vipDark
    ? {color: 'white'}
    : {color: Colors.defaultTextColor};

  return (
    <View style={[styles.mainContainer, backgroundColor]}>
      {showOverlay && (
        <Header goBack={() => goBack()} color={vipDark ? 'black' : 'white'} />
      )}

      {loading && <Loading />}

      {error && <ErrorOrNoData title={error.title} message={error.message} />}

      {/* CONTENT */}
      {!loading && !error && (
        <View style={{flex: 1}}>
          {categories.length === 0 && (
            <ErrorOrNoData
              ilustration={false}
              title={'Aún no tienes productos'}
              message={'¡Selecciona el ícono "Agregar" y agrega tus products!'}>
              {!showOverlay && (
                <View style={styles.noProductsButtons}>
                  <View style={styles.noProductsButton}>
                    {/* ADD NEW CATEGORY */}
                    <AddButton
                      onPress={() => goToAddEditCategory()}
                      text={'Agregar categoría'}
                    />
                  </View>
                  <View style={styles.noProductsButton}>
                    {/* ADD NEW PRODUCT */}
                    <AddButton
                      onPress={() => {
                        goToAddEditProduct(true);
                        setProductViewActive(true);
                      }}
                      text={'Agregar producto'}
                    />
                  </View>
                </View>
              )}
            </ErrorOrNoData>
          )}

          {categories.length > 0 && (
            <View style={[styles.categoriesList, backgroundColor_2]}>
              {/* CATEGORIES AND PRODUCTS */}
              <FlatList
                nestedScrollEnabled={true}
                onScroll={() => {
                  setContextMenuIn('');
                }}
                data={categories}
                ListHeaderComponent={
                  <View style={[styles.categoriesHeader, backgroundColor_2]}>
                    <Text style={[styles.categoriesTitle, textColor]}>
                      {'Listado de Productos'}
                    </Text>
                  </View>
                }
                renderItem={({item, index}) => (
                  <Category
                    item={{...item, index}}
                    setCategorySelected={setCategorySelected}
                    contextMenuOptions={contextMenuOptions}
                    contextMenuIn={contextMenuIn}
                    setContextMenuIn={setContextMenuIn}
                    handleShowProductDetails={handleShowProductDetails}
                    backgroundColor={backgroundColor}
                    textColors={[textColor, textColor_2, textColor_3]}
                    vipDark={vipDark}
                    showOverlay={showOverlay}
                  />
                )}
                ListFooterComponent={
                  <View>
                    {!showOverlay && (
                      <View style={styles.addButtonsContainer}>
                        {/* ADD NEW CATEGORY */}
                        <AddButton
                          onPress={() => goToAddEditCategory()}
                          text={'Agregar categoría'}
                        />

                        {/* ADD NEW PRODUCT*/}
                        <AddButton
                          onPress={() => {
                            goToAddEditProduct(true);
                            setProductViewActive(true);
                          }}
                          text={'Agregar producto'}
                        />
                      </View>
                    )}
                  </View>
                }
                keyExtractor={(item, index) => index.toString()}
                stickyHeaderIndices={[0]}
                onMomentumScrollEnd={event => {
                  const offsetY = event.nativeEvent.contentOffset.y;
                  if (updateListInViewOffset) {
                    updateListInViewOffset(offsetY);
                  }
                }}
              />
            </View>
          )}
        </View>
      )}

      {/* SHOW PRODUCT DETAILS */}
      {showProdcutDetails && (
        <ProductDetails
          product={productSelected}
          contextMenu={contextMenuProducts}
          goBack={() => setShowProdcutDetails(false)}
          handlePromotions={handlePromotions}
          editProduct={() => {
            goToAddEditProduct();
            setProductViewActive(true);
          }}
          handleDeleteItem={handleDeleteItem}
        />
      )}
    </View>
  );
}

const Category = ({
  item,
  setCategorySelected,
  contextMenuOptions,
  contextMenuIn,
  setContextMenuIn,
  handleShowProductDetails,
  backgroundColor,
  textColors,
  vipDark,
  showOverlay,
}) => {
  const [seeProducts, setSeeProducts] = React.useState(false);
  return (
    <TouchableWithoutFeedback onPress={() => setContextMenuIn('')}>
      <View>
        {/* CATEGORY */}
        <View style={[styles.categoriesItem, backgroundColor]}>
          <View
            style={[
              styles.categoriesImageContainer,
              {backgroundColor: vipDark ? Colors.grayLight : Colors.business},
            ]}>
            <Image style={styles.categoriesImage} source={{uri: item.img}} />
          </View>
          <Text
            style={[
              styles.categoriesItemText,
              textColors[0],
              {width: showOverlay ? width / 1.9 : width / 2.1},
            ]}>
            {item.category}
          </Text>
          <View style={{marginRight: 0}}>
            <Icon
              name={seeProducts ? 'arrow_up' : 'arrow_down'}
              factor={0.9}
              Borderless
              forceColor
              color={Colors.gray}
              onPress={() => {
                setSeeProducts(!seeProducts);
              }}
            />
          </View>

          {/* CONTEXT MENU TRIGGER */}
          {!showOverlay && (
            <TouchableOpacity
              style={styles.contextMenuTrigger}
              onPress={() => {
                setCategorySelected(item);
                setContextMenuIn(item.index);
              }}>
              <Icon
                name="options"
                factor={0.7}
                Borderless
                forceColor
                color={Colors.gray}
              />
            </TouchableOpacity>
          )}
        </View>

        {/* PRODUCTS LIST */}
        {seeProducts && (
          <ProductsList
            products={item.products}
            productsKeys={Object.keys(item.products)}
            category={item.category}
            handleShowProductDetails={handleShowProductDetails}
            textColors={textColors}
          />
        )}

        {/* CONTEXT MENU */}
        {item.index === contextMenuIn && (
          <MenuContextual opciones={contextMenuOptions} position={8} />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const ProductsList = ({
  products,
  productsKeys,
  category,
  handleShowProductDetails,
  updateListInViewOffset,
  textColors,
}) => {
  return (
    <View style={styles.productsList}>
      <FlatList
        nestedScrollEnabled={true}
        data={productsKeys}
        numColumns={2}
        renderItem={({item, index}) => (
          <View>
            {item !== undefined && (
              <TouchableOpacity
                style={styles.productsListItem}
                key={index}
                onPress={() => {
                  const product = {
                    ...products[item],
                    id: item,
                    category: category,
                    index,
                  };
                  handleShowProductDetails(product);
                  console.log('item selected: ', product.id);
                }}
                activeOpacity={0.7}>
                {/* PRODUCT INFO */}
                <Image
                  style={styles.productImage}
                  source={{
                    uri:
                      products[item].img !== ''
                        ? products[item].img
                        : defaultImage,
                  }}
                />
                <View style={styles.productInfoContainer}>
                  <Text style={[styles.productName, textColors[2]]}>
                    {products[item].name}
                  </Text>
                  {/* <Text style={styles.productDescription}>
                                {item.description}
                              </Text> */}
                  <Text style={[styles.productPrice, textColors[1]]}>{`$ ${
                    products[item].price
                  }`}</Text>
                </View>

                {/* PROMOTION LABEL */}
                {products[item].hasPromotion && (
                  <View style={styles.promotionLabel} />
                )}

                {/* PROMOTION ICON */}
                {products[item].hasPromotion && (
                  <View style={styles.promotionIcon}>
                    <Icon
                      name="brand"
                      size={24}
                      factor={0.8}
                      Borderless
                      forceColor
                      color={Colors.business}
                      background={'white'}
                    />
                  </View>
                )}
              </TouchableOpacity>
            )}
          </View>
        )}
        keyExtractor={(item, index) => item}
        onMomentumScrollEnd={event => {
          const offsetY = event.nativeEvent.contentOffset.y;
          if (updateListInViewOffset) {
            updateListInViewOffset(offsetY);
          }
        }}
      />
    </View>
  );
};

const AddButton = ({onPress, text}) => {
  return (
    <TouchableOpacity style={styles.addButton} onPress={onPress}>
      <Text style={styles.addButtonText}>{text}</Text>
    </TouchableOpacity>
  );
};

export default Producto;
