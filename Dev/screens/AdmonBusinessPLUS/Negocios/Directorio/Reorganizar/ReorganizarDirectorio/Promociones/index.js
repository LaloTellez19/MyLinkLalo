import React from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Animated,
    Image,
    FlatList,
} from 'react-native';

import Text from '../../../../../../../components/Text';
import Icon from '../../../../../../../components/Icon';
import UserImage  from '../../../../../../../components/UserImage';

import Colors from '../../../../../../../constants/Colors';
import Layout from '../../../../../../../constants/Layout';

const width = Layout.window.width;
const promotionsSize = 300;
const promotionSize = 200;


const styles = StyleSheet.create({
    titleContainer:{
        width:'100%',
        height:100,
        flexDirection:'row',
        alignItems:'center',
        borderWidth:0.5,
    },
    /**PROMOTION LIST STYLES */
    promotions: {
        width: width,
        height: promotionsSize,
        marginTop: 0,
        marginBottom: 5,
    },
    promotion: {
        width: promotionSize,
        height: promotionSize,
        backgroundColor: 'white',
        elevation: 5,
        borderWidth: 0.5,
        borderColor: Colors.defaultTextColor,
        borderRadius: 10,
        marginTop: 5,
        marginRight: 10,
        marginLeft: 10,
    },
    promotionTextContainer: {
        height: promotionSize / 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    promotionTitle: {
        fontSize: 14,
        color: Colors.defaultTextColor,
    },
    promotionImg: {
        width: promotionSize - 5,
        height: promotionSize / 2,
        alignSelf: 'center',
    },
    promotionValid: {
        fontSize: 14,
        color: Colors.defaultTextColor,
    },
    userImage: {
        position: 'absolute',
        right: -45,
        top: 65,
    },
    contentContainerStyle: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconContainer:{
        marginTop:-30,
        alignItems:'center',
    },
    buttonContainer:{
        width:'100%',
        height:100,
        alignItems:'center',
        justifyContent:'center',
    },
    button:{
        width:'50%',
        height:'50%',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:20,
        backgroundColor: Colors.business,
    }
});

class  Promociones extends React.Component{
    constructor(props){
        super(props);
        this.state={
            data: this.props.data,
            activePromotion: 0,
            offValue: width / 1.7,
            linkname:this.props.linkname,
        }
    }

    setActivePromotion = active => {
        this.setState({
          activePromotion: active,
        });
    };


    render() {
        const{
            activePromotion,
            offValue,
            
        } = this.state;

        return(
            <View style={{flex:1}}>
                <View style={styles.titleContainer}>
                    <Icon
                        name='brand'
                        Borderless
                        factor={1}
                        size={50}
                    />

                    <Text 
                        style={{fontSize:20, 
                        color: Colors.defaultTextColor}}>
                            {'Promociones'}
                    </Text>
                </View>

                <View style={[styles.titleContainer, {justifyContent:'center'}]}>
                    <Text>{'Selecciona una promoción para recomendar en tu\nperfil Business Plus'}</Text>
                </View>

                <View style={styles.promotions}>
                    <FlatList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={this.props.data}
                        renderItem={({item, index}) => (
                            <Promotion
                                item={item}
                                active={index === activePromotion}
                                linkname={this.props.linkname}
                                firstIndex={index === 0}
                                lastIndex={index === this.props.data.length - 1}
                            />
                        )}
                        keyExtractor={(item, index) => index.toString()}
                        contentContainerStyle={styles.contentContainerStyle}
                        onScroll={event => {
                        const offsetX = event.nativeEvent.contentOffset.x;
                        const index = offsetX / offValue;
                        console.log('diff: ', offsetX / offValue);
                        if (index >= activePromotion + 0.9) {
                            console.log('index + : ', offsetX / offValue);
                            this.setActivePromotion(activePromotion + 1);
                        } else if (index <= activePromotion - 0.95) {
                            console.log('index - : ', offsetX / offValue);
                            this.setActivePromotion(activePromotion - 1);
                        }
                        }}
                    />
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity 
                        style={styles.button}
                        onPress={this.props.onSavePromotion}>
                        <Text style={{fontSize:18, color:'white'}}>
                            {'Guardar'}
                        </Text>
                    </TouchableOpacity>
                </View>

            </View>
        );
    }
}

const Promotion = ({item, active, linkname, firstIndex, lastIndex}) => {
    const activeSize = promotionSize + 35;
    const margin = width / 2 - 100;
    const activeStyles = StyleSheet.create({
      size: {
        width: active ? activeSize : promotionSize,
        height: active ? activeSize : promotionSize,
        // marginTop: !active ? 23.5 : 5,
        marginRight: lastIndex ? margin : 25,
        marginLeft: firstIndex ? margin : 25,
      },
      textContainer: {
        height: active ? activeSize / 4 : promotionSize / 4,
      },
      promotionImg: {
        width: active ? activeSize - 5 : promotionSize - 5,
        height: active ? activeSize / 2 : promotionSize / 2,
      },
      fontSize: {
        fontSize: active ? 16 : 14,
      },
    });
  
    return (
      <TouchableOpacity style={[styles.promotion, activeStyles.size]}>
            <View style={styles.iconContainer}>
                <Icon
                    name='brand'
                    background='white'
                    factor={1}/>
            </View>

            <View style={[styles.promotionTextContainer, activeStyles.textContainer]}>
                <Text style={[styles.promotionTitle, activeStyles.fontSize]}>
                    {item.title}
                </Text>
            </View>

            <Image
                style={[styles.promotionImg, activeStyles.promotionImg]}
                source={{uri: item.img}}
            />
            <View style={styles.promotionTextContainer}>
                <Text style={[styles.promotionValid, activeStyles.fontSize]}>
                    {item.valid}
                </Text>
            </View>
        </TouchableOpacity>
    );
};


export default Promociones;