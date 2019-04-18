import React from 'react';
import {View, TouchableOpacity, ColorPropType, ViewPropTypes} from "react-native";
import PropTypes from 'prop-types';

export default function Button({
    style,
    name,
    iconSize,
    color,
    IconType,
    ButtonType,
    onPress,
	buttonProps,
}) {
    return ButtonType === TouchableOpacity ? (
        <ButtonType
	        onPress={onPress}
	        style={style}
        >
	        <IconType
		        name={name}
		        size={iconSize}
		        color={color}
	        />
        </ButtonType>
    ) : (
	    <View style={style}>
		    <ButtonType onPress={onPress} {...buttonProps}>
			    <View style={style}>
				    <IconType
					    name={name}
					    size={iconSize}
					    color={color}
				    />
			    </View>
		    </ButtonType>
	    </View>
    )
}

Button.propTypes = {
    style: ViewPropTypes.style,
    name: PropTypes.string,
    iconSize: PropTypes.number,
    color: ColorPropType,
    IconType: PropTypes.any,
    ButtonType: PropTypes.any,
    onPress: PropTypes.func,
};

Button.defaultProps = {
    ButtonType: TouchableOpacity,
    onPress: () => {},
};
