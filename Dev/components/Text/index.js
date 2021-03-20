import React from 'react';
import {Text} from 'react-native';

const Regular = 'HelveticaNeueLt'; //"HelveticaNeueMed";
const Thin = 'HelveticaNeueLt';
const Condensed = '';
const Bold = '';
const PublicationTitle = 'HelveticaNeueLTPro-HvCn'; //HelveticaNeueLTPro-BdOu
const PublicationTitleColor = 'HelveticaNeueLTPro-BdOu';

export default class _Text extends React.Component {
  constructor(props) {
    super(props);
  }
	
  render() {
    var fontFamily = Regular;
    fontFamily = this.props.Regular ? Regular : fontFamily;
    fontFamily = this.props.PublicationTitle ? PublicationTitle : fontFamily;
    fontFamily = this.props.PublicationTitleColor
      ? PublicationTitleColor
      : fontFamily;
    //fontFamily
    return (
      <Text
        {...this.props}
        allowFontScaling={false}
        style={[{fontFamily: fontFamily}, this.props.style]}
      />
    );
  }
}