import {useContext, FC} from 'react';
import classNames from 'classnames';
import { ConfigContext } from '../config-provider';

interface ColProps {
    prefixCls?: string;
    className?: string;
    span?: number;
    offset?: number;
}

const Col: FC<ColProps> = ({
    prefixCls: customizePrefixCls,
    className,
    span = 24,
    offset = 0,
    children
}) => {
    const { getPrefixCls } = useContext(ConfigContext);
    const prefixCls = getPrefixCls('col', customizePrefixCls);

    const classes = classNames(
        prefixCls,
        // [`${prefixCls}-gutter`]: gutter,
        [`${prefixCls}-${span}`],
        [`${prefixCls}-offset-${offset}`],
        className
    );

    return (
        <div className={classes}>
            {children}
        </div>
    );
};

export default Col;
