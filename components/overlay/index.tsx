import { useMemo, useContext, useCallback, FC } from 'react';
import classNames from 'classnames';
import { ConfigContext } from '../config-provider';
import { OverlayProps } from './typings';

export { OverlayProps } from './typings';

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
    const prefixCls = getPrefixCls('icon', customizePrefixCls);

    const style = useMemo(() => ({
        zIndex,
        ...customizeStyle
    }), [customizeStyle, zIndex]);

    const classes = classNames(prefixCls, {
        [`${prefixCls}-open`]: visible
    }, className);

    const handleTouchMove = useCallback(event => {
        if (lockScroll) {
            event.preventDefault();
        }
    }, [lockScroll]);

    const handleClick = useCallback(event => {
        if (closeOnClickOverlay) {
            onClose?.(event);
        }
    }, [closeOnClickOverlay, onClose]);

    return (
        <div
            style={style}
            className={classes}
            onTouchMove={handleTouchMove}
            onClick={handleClick}
        >
            {children}
        </div>
    );
};

export default Overlay;
