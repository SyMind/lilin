import { useMemo, useContext, useCallback, FC, CSSProperties } from 'react';
import classNames from 'classnames';
import { ConfigContext } from '../config-provider';
import Portal from '../portal';
import Overlay, { OverlayProps } from '../overlay';
import Icon from '../icon';

type PositionType = 'top' | 'bottom' | 'left' | 'right' | 'center';

type CloseIconPositionType = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

export interface PopupProps extends OverlayProps {
    prefixCls?: string;
    position?: PositionType;
    transition?: string;
    overlayClassName?: string;
    overlayStyle?: CSSProperties;
    bodyClassName?: string;
    bodyStyle?: CSSProperties;
    closeable?: boolean;
    closeIconPosition?: CloseIconPositionType;
    closeIcon?: string;
    destroyOnClose?: boolean;
    getContainer?: () => HTMLElement;
    overlay?: boolean;
    round?: boolean;
}

const Popup: FC<PopupProps> = ({
    prefixCls: customizePrefixCls,
    position = 'center',
    overlayClassName,
    overlayStyle,
    bodyClassName,
    bodyStyle: customizeBodyStyle = {},
    closeable = false,
    closeIconPosition = 'top-right',
    closeIcon = 'close',
    destroyOnClose = true,
    getContainer = () => document.body,
    visible = false,
    overlay = true,
    round = false,
    zIndex = 2000,
    lockScroll = true,
    closeOnClickOverlay,
    onClose,
    children
}) => {
    const {getPrefixCls} = useContext(ConfigContext);
    const prefixCls = getPrefixCls('popup', customizePrefixCls);

    const bodyStyle = useMemo(() => ({
        zIndex,
        ...customizeBodyStyle
    }), [zIndex, customizeBodyStyle]);

    const bodyClasses = classNames(
        prefixCls,
        `${prefixCls}-${position}`,
        {
            [`${prefixCls}-round`]: round,
            [`${prefixCls}-${position}-open`]: visible
        },
        bodyClassName
    );

    const closeIconClasses = classNames(
        `${prefixCls}-close-icon`,
        `${prefixCls}-close-icon-${closeIconPosition}`
    );

    const handleClose = useCallback(event => {
        onClose?.(event);
    }, [onClose]);

    return (
        <Portal getContainer={getContainer}>
            {overlay && (
                <Overlay
                    visible={visible}
                    closeOnClickOverlay={closeOnClickOverlay}
                    className={overlayClassName}
                    style={overlayStyle}
                    zIndex={zIndex}
                    lockScroll={lockScroll}
                    onClose={handleClose}
                />
            )}
            <div
                className={bodyClasses}
                style={bodyStyle}
            >
                {visible || !destroyOnClose ? children : null}
                {closeable && (
                    <div
                        className={closeIconClasses}
                        onClick={handleClose}
                    >
                        <Icon name={closeIcon} size={12} />
                    </div>
                )}
            </div>
        </Portal>
    );
};

export default Popup;
