import { useContext, FC, ReactNode } from 'react';
import classNames from 'classnames';
import { ConfigContext } from '../config-provider';

interface ButtonProps {
    prefixCls?: string;
    className?: string;
    children: ReactNode;
}

const Button: FC<ButtonProps> = ({
    prefixCls: customizePrefixCls,
    className,
    children
}) => {
    const {getPrefixCls} = useContext(ConfigContext);
    const prefixCls = getPrefixCls('btn', customizePrefixCls);

    const classes = classNames(
        prefixCls,
        className
    );

    return <button className={classes}>{children}</button>;
};

export default Button;
