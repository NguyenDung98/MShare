import React from 'react';
import {ColorPropType, ViewPropTypes} from "react-native";
import PropTypes from 'prop-types';

export default function Button({
    style,
    name,
    size,
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
                size={size}
                color={color}
            />
        </ButtonType>
    )
}

Button.propTypes = {
    style: ViewPropTypes.style,
    name: PropTypes.string,
    size: PropTypes.number,
    color: ColorPropType,
    IconType: PropTypes.any,
    ButtonType: PropTypes.any,
    onPress: PropTypes.func,
};