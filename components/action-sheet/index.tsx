import { useMemo, useCallback, useContext, FC } from 'react';
import classNames from 'classnames';
import { ConfigContext } from '../config-provider';
import Popup, { PopupProps } from '../popup';
import { convertChildrenToData } from './util';
import { Key } from './typings';

interface ActionSheetProps extends PopupProps {
    prefixCls?: string;
    className?: string;
    title?: string;
    description?: string;
    cancelText?: string;
    value?: string;
    selectedColor?: string;
    onChange?: (value?: Key) => void;
    onSelect?: (value: Key) => void,
    onCancel?: () => void;
}

const InternalActionSheet: FC<ActionSheetProps> = ({
    prefixCls: customizePrefixCls,
    bodyClassName,
    cancelText = null,
    visible = false,
    title,
    description,
    value,
    selectedColor,
    onChange,
    onSelect,
    onCancel,
    children
}) => {
    const {getPrefixCls} = useContext(ConfigContext);
    const prefixCls = getPrefixCls('action-sheet', customizePrefixCls);

    const options = useMemo(() => convertChildrenToData(children), [children]);

    const handleClose = useCallback(() => {
        onCancel?.();
    }, [onCancel]);

    return (
        <Popup
            round
            bodyClassName={bodyClassName}
            visible={visible}
            position='bottom'
            onClose={handleClose}
        >
            <div className={`${prefixCls}-panel`}>
                {!!title && <div className={`${prefixCls}-title`}>{title}</div>}
                {!!description && <div className={`${prefixCls}-desc`}>{description}</div>}
                {!!options.length && (
                    <div className={`${prefixCls}-menu`}>
                        {options.map(option => (
                            <div
                                key={option.value}
                                className={classNames(`${prefixCls}-menu-item`, {
                                    [`${prefixCls}-menu-item-disabled`]: option.disabled
                                })}
                                style={{
                                    color: value !== undefined && value === option.value
                                        ? selectedColor
                                        : undefined
                                }}
                                onClick={() => {
                                    onSelect?.(option.value);
                                    onChange?.(option.value);
                                }}
                            >
                                {option.label}
                                {!!option.description && (
                                    <div className={`${prefixCls}-menu-item-desc`}>
                                        {option.description}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
                {!!cancelText && (
                    <div
                        className={`${prefixCls}-menu-item-cancel`}
                        onClick={handleClose}
                    >
                        {cancelText}
                    </div>
                )}
            </div>
        </Popup>
    );
};

type ActionSheetType = typeof InternalActionSheet & { Option: typeof Option };

const ActionSheet = InternalActionSheet as ActionSheetType;
ActionSheet.Option = Option;

export default ActionSheet;
