import { useContext, useCallback, FC, CSSProperties } from 'react';
import classNames from 'classnames';
import { View } from '@tarojs/components';
import { ConfigContext } from '../config-provider';

interface OverlayProps {
    prefixCls?: string;
    className?: string;
    style?: CSSProperties;
    visible?: boolean;
    zIndex?: number;
    duration?: number; // todo
    lockScroll?: boolean;
    closeOnClickOverlay?: boolean;
    onClose?: (event: any) => void,
}

const Overlay: FC<OverlayProps> = ({
    prefixCls: customizePrefixCls,
    className,
    style: customizeStyle = {},
    visible = false,
    zIndex = 2000,
    lockScroll = true,
    closeOnClickOverlay = true,
    onClose,
    children
}) => {
    const { getPrefixCls } = useContext(ConfigContext);
    const prefixCls = getPrefixCls('overlay', customizePrefixCls);

    const classes = classNames(prefixCls, {
        [`${prefixCls}-open`]: visible
    }, className);

    const handleClick = useCallback(event => {
        if (closeOnClickOverlay) {
            onClose?.(event);
        }
    }, [closeOnClickOverlay, onClose]);

    return (
        <View
            catchMove={lockScroll}
            style={{
                zIndex,
                ...customizeStyle
            }}
            className={classes}
            onClick={handleClick}
        >
            {children}
        </View>
    );
};

export default Overlay;
