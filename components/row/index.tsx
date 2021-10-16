import {useContext, FC} from 'react';
import classNames from 'classnames';
import { ConfigContext } from '../config-provider';

interface RowProps {
    prefixCls?: string;
    className?: string;
    gutter?: string;
    justify?: string;
    align?: string;
    wrap?: string;
}

const Row: FC<RowProps> = ({
    prefixCls: customizePrefixCls,
    className,
    // gutter,
    justify = 'start',
    align = 'flex-start',
    wrap = 'nowrap',
    children
}) => {
    const { getPrefixCls } = useContext(ConfigContext);
    const prefixCls = getPrefixCls('row', customizePrefixCls);

    const classes = classNames(prefixCls, {
        [`${prefixCls}-justify-${justify}`]: justify,
        [`${prefixCls}-align-${align}`]: align,
        [`${prefixCls}-wrap-${wrap}`]: wrap
    }, className);

    return (
        <div className={classes}>
            {children}
        </div>
    );
};

export default Row;
