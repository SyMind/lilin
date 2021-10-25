import { useCallback, useContext, FC } from 'react';
import classNames from 'classnames';
import { ConfigContext } from '../config-provider';
import Icon from '../icon';

interface CollapsePanelProps {
    prefixCls?: string;
    className?: string;
    panelKey: string | number;
    title?: string | React.ReactNode;
    subTitle?: string | React.ReactNode;
    disabled?: boolean;
    showArrow?: boolean;
    isActive?: boolean;
    onClick?: (panelKey: string | number) => void;
}

const CollapsePanel: FC<CollapsePanelProps> = ({
    prefixCls: customizePrefixCls,
    className,
    panelKey,
    title,
    subTitle,
    isActive,
    disabled,
    children,
    onClick
}) => {
    const {getPrefixCls} = useContext(ConfigContext);
    const prefixCls = getPrefixCls('collapse', customizePrefixCls);

    const handleClick = useCallback(() => {
        onClick?.(panelKey);
    }, [onClick, panelKey]);

    return (
        <div className={classNames(prefixCls, className)}>
            <div
                className={classNames('collapse-item', {
                    'item-expanded': isActive,
                    [`${prefixCls}-item-disabled`]: disabled
                })}
                onClick={handleClick}
            >
                <div className='collapse-title'>
                    <div className='collapse-title-value'>{title}</div>
                    {!!subTitle && <view className='subTitle'>{subTitle}</view>}
                    <Icon
                        name="down-arrow"
                        className={classNames('collapse-icon', {
                            'col-expanded': isActive,
                            'collapse-icon-disabled': disabled
                        })}
                    />
                </div>
            </div>
            <div
                className={classNames('collapse-wrapper', isActive ? 'open-style' : 'close-style')}
                style={{
                    height: isActive ? '100px' : 0
                }}
            >
                <div className='collapse-content'>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default CollapsePanel;
