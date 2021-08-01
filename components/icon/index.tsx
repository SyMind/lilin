import { useContext, FC } from 'react';
import classNames from 'classnames';
import { ConfigContext } from '../config-provider';

interface IconProps {
    prefixCls?: string;
    className?: string;
    name: string;
    size?: string | number;
    fontClassName?: string;
    color?: string;
    onClick?: () => void;
}

const Icon: FC<IconProps> = ({
    prefixCls: customizePrefixCls,
    className,
    name,
    size,
    color,
    onClick
}) => {
    const {getPrefixCls} = useContext(ConfigContext);
    const prefixCls = getPrefixCls('icon', customizePrefixCls);

    return (
        <i
            className={classNames(
                'lilinicon',
                `lilinicon-${name}`,
                prefixCls,
                className
            )}
            style={{
                color,
                fontSize: size,
                width: size,
                height: size
            }}
            onClick={onClick}
        />
    );
};

export default Icon;
