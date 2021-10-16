import { useMemo, useContext, useCallback, FC, CSSProperties } from 'react';
import classNames from 'classnames';
import { ConfigContext } from '../config-provider';

interface OverlayProps {
    prefixCls?: string;
    className?: string;
    style?: CSSProperties;
    visible?: boolean;
    zIndex?: number;
    duration?: number;
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
    duration = .3,
    lockScroll = true,
    closeOnClickOverlay = true,
    onClose,
    children
}) => {
    const { getPrefixCls } = useContext(ConfigContext);
    const prefixCls = getPrefixCls('icon', customizePrefixCls);

    const style = useMemo(() => ({
        animationDuration: `${duration}s`,
        zIndex,
        ...customizeStyle
    }), [customizeStyle, duration, zIndex]);

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
