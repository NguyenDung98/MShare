import React from 'react';
import {TouchableOpacity, ColorPropType, ViewPropTypes} from "react-native";
import PropTypes from 'prop-types';

export default function Button({
    style,
    name,
    iconSize,
    color,
    IconType,
    ButtonType,
    onPress
}) {
    return (
        <ButtonType
            style={style}
            onPress={onPress}
        >
            <IconType
                name={name}
                size={iconSize}
                color={color}
            />
        </ButtonType>
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
