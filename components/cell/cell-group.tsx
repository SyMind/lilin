import { useContext, FC } from 'react';
import classNames from 'classnames';
import { ConfigContext } from '../config-provider';

interface CellGroupProps {
    prefixCls?: string;
    className?: string;
    title?: string;
}

const CellGroup: FC<CellGroupProps> = ({
    prefixCls: customizePrefixCls,
    className,
    title,
    children
}) => {
    const {getPrefixCls} = useContext(ConfigContext);
    const prefixCls = getPrefixCls('cell-group', customizePrefixCls);

    const classes = classNames(
        prefixCls,
        className
    );

    return (
        <div className={classes}>
            {!!title && <div className={`${prefixCls}-title`}>{title}</div>}
            <view className={`${prefixCls}-wrap`}>
                {children}
            </view>
        </div>
    );
};

export default CellGroup;
