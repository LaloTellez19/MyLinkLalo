/**
 * Copyright (c) 2019-present, My-Link Corporation S.A de C.V.
 * All rights reserved.
 * 
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Eduardo Dorantes <eduardo-dorantes@my-link.com>
 */

'use strict';

import React from 'react';
import { View, Image } from 'react-native';
import TextInput from '../../components/TextInput';
import ProfilePicture from '../../components/ProfilePicture';
import Colors from '../../constants/Colors';


const ValePor		= require('../../assets/images/ticket/vale_por.png');
const Notch			= require('../../assets/images/ticket/notch.png');
const Shadow		= require('../../assets/images/ticket/shadow.png');

export default class Ticket extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			title: 		this.props.title ? this.props.title : "",
			comment: 	this.props.comment ? this.props.comment : "",
			color: 		this.props.color ? this.props.color : ""
		}
		this.onTitleChange		= this.onTitleChange.bind(this);
		this.onCommentChange	= this.onCommentChange.bind(this);
		this.setData			= this.setData.bind(this);
		this.dots				= [];
	}
	
	onTitleChange = (text) => {
		this.setState({title: text});
	}

	onCommentChange = (text) => {
		this.setState({comment: text});
	}
	
	setData = (data) => {
		this.setState({
			title: data.title,
			comment: data.comment,
			color: data.color
		})
	}
	
	componentDidMount(){
		
	}
	
	render(){
		const linkname			=	this.props.linkname ? this.props.linkname : '';
		const vip				=	this.props.vip		? this.props.vip : false;
		const size				=	this.props.size		? this.props.size : 300;
		const width				= 	size;
		const height			= 	size * 0.55;
		const color				=	this.state.color ? this.state.color : '#F0EA84';
		const backgroundColor	=	vip ? 'black' : 'white';
		const borderColor		=	vip ? 'black' : 'white';
		const textColor			=	vip ? 'white' : Colors.defaultGrayBold;

		const title				=	this.state.title;
		const comment			=	this.state.comment;

		const num				=	Math.floor(height/(0.026 * size)) - 3;
		const dots				=	[];
		for(var i = 0; i < num; i++){
			dots.push(
				<View key={i} style={{width: (0.026*size), height: (0.026*size), backgroundColor: 'white', borderRadius: 360, borderWidth: (0.0015 * size), borderColor: Colors.defaultGrayLight}}></View>
			);
		}
		return(
			<View>
				<View style={{width: width, height: height/4, backgroundColor: 'rgba(83,83,98,0.05)', borderBottomWidth: ((1/300)*size), borderBottomColor: 'rgba(83,83,98,0.025)', position: 'absolute', bottom: -((4/300)*size)}}></View>
				<View style={{
					width: width,
					height: height,
					flexDirection: 'row'
				}}>
					<View style={{ width: (size/8), height: (height)}}>
						<View style={{
							width: (size/8)/2 + (0.01*size),
							height: (height/2) - (height/8),
							backgroundColor: color
						}}></View>
						<Image source={Notch} style={{
							resizeMode: 'contain',
							width: (size/8),
							height: height/4,
							right: (size/8)/5,
							tintColor: color
						}}/>
						<View style={{
							width: (size/8)/2 + (0.01*size),
							height: (height/2) - (height/8),
							backgroundColor: color
						}}></View>
					</View>
					<View style={{
						width: width - (size/4) - (size/14.5),
						height: height,
						backgroundColor: backgroundColor,
						position: 'absolute',
						left: (size/4)
					}}></View>
					<View style={{ width: (size/8), height: (height), position: 'absolute', right: 0, alignItems: 'flex-end'}}>
						<View style={{
							width: size/14,
							height: (height/2) - (height/8),
							backgroundColor: backgroundColor
						}}></View>
						<Image source={Notch} style={{
							resizeMode: 'contain',
							width: (size/8),
							height: height/4,
							tintColor: backgroundColor,
							left: ((size/8)/5),
							transform: [{'rotateY': '180deg'}]
						}}/>
						<View style={{
							width: size/14,
							height: (height/2) - (height/8),
							backgroundColor: backgroundColor
						}}></View>
					</View>
					<View style={{
						width: ((size/4)/4)*3,
						height: height,
						backgroundColor: color,
						borderRightWidth: (0.003 * size),
						borderRightColor: Colors.defaultGrayLight,
						left: -(size/16) + (0.01*size)
					}}>
						<View style={{position: 'absolute', right: -((0.026*size)/2), justifyContent: 'space-around', height: height}}>
							{dots}
						</View>
					</View>
					<View style={{alignItems: 'center', width: ((size/6)*5)}}>
						{vip &&
							<Image source={ValePor} style={{width: (size/3)*1.2, marginLeft: (0.05*size), height: (0.18*size), resizeMode: 'contain', marginTop: (0.03*size), left: -((size/20)*2)}}/>
						}
						{!vip &&
							<Image source={ValePor} style={{width: (size/3)*1.2, marginLeft: (0.05*size), height: (0.18*size), resizeMode: 'contain', tintColor: Colors.defaultGrayBold, marginTop: (0.03*size), left: -((size/20)*2)}}/>
						}
					</View>
					<View>
						<View style={{
							position: 'absolute',
							width: width/11,
							height: ((height/5)*1.5),
							backgroundColor: color,
							position: 'absolute',
							right: ((width/11)*2),
							top: -2,
							alignItems: 'center'
						}}>
							<View style={{
								position: 'absolute',
								bottom: -1,
								width: 0,
								height: 0,
								backgroundColor: 'transparent',
								borderStyle: 'solid',
								borderLeftWidth: (width/11)*0.6,
								borderRightWidth: (width/11)*0.6,
								borderBottomWidth: (width/11)*0.6,
								borderLeftColor: 'transparent',
								borderRightColor: 'transparent',
								borderBottomColor: backgroundColor
							}}></View>
						</View>
					</View>
					<View style={{
						position: 'absolute',
						top: height/4,
						left: (size/8)
					}}>
						<View style={{
							width: (size/3.75),
							height: (size/3.75),
							backgroundColor: borderColor,
							alignItems: 'center',
							justifyContent: 'center',
							borderRadius: 360
						}}>
							<View style={{
								width: (0.106*size) + (0.02*size),
								height: (0.106*size) + (0.02*size),
								backgroundColor: borderColor,
								borderRadius: 360,
								position: 'absolute',
								right: -(0.01*size),
								top: -(0.01*size)
							}}></View>
							<ProfilePicture linkname={linkname} size={size/4.28} spacing={2}/>
						</View>
					</View>
					<View style={{width: '100%', height: '100%', backgroundColor: 'transparent', position: 'absolute'}}>
						<View style={{
							width: ((size/4)*3) - (0.2*size),
							height: height/2 * 1.125,
							bottom: (0.09*size),
							left: (size/4) + (0.13*size),
							position: 'absolute'
						}}>
						{!this.props.ReadOnly &&
							<TextInput
								placeholder="Aquí va tu texto"
								multiline={true}
								numberOfLines={3}
								style={{
									fontSize: (0.0575*size),
									textAlign: 'center',
									fontFamily: 'Helvetica-Neue',
									color: textColor
								}}
								value={title}
								onChangeText ={(e) => this.onTitleChange(e)}
							/>
						}
						{this.props.ReadOnly &&
							<TextInput
								placeholder="Aquí va tu texto"
								multiline={true}
								numberOfLines={3}
								style={{
									fontSize: (0.0575*size),
									textAlign: 'center',
									fontFamily: 'Helvetica-Neue',
									color: textColor
								}}
								editable={false}
								value={title}
							/>
						}
						</View>
						<View style={{
							width: ((size/4)*3),
							height: (0.09*size),
							bottom: 0,
							left: (size/4),
							position: 'absolute',
						}}>
						{!this.props.ReadOnly &&
							<TextInput
								placeholder = "condiciones"
								style={{padding: 0, margin: 0, textAlign: 'center', fontSize: (0.046*size), fontFamily: 'Helvetica-Neue', color: textColor}}
								value={comment}
								onChangeText ={(e) => this.onCommentChange(e)}
							/>
						}
						{this.props.ReadOnly &&
							<TextInput
								placeholder = "condiciones"
								style={{padding: 0, margin: 0, textAlign: 'center', fontSize: (0.046*size), fontFamily: 'Helvetica-Neue', color: textColor}}
								value={comment}
								editable={false}
							/>
						}
						</View>
					</View>
				</View>
			</View>
		);
	}
}