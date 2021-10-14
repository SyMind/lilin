import { useContext, FC } from 'react';
import classNames from 'classnames';
import { ConfigContext } from '../config-provider';
import { isURI } from '../_util/strings';

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
    const { getPrefixCls } = useContext(ConfigContext);
    const prefixCls = getPrefixCls('icon', customizePrefixCls);

    if (isURI(name)) {
        return (
            <img
                className={classNames(
                    'lilinicon',
                    'lilinicon--img',
                    prefixCls,
                    className
                )}
                style={{
                    color,
                    fontSize: size,
                    width: size,
                    height: size
                }}
                src={name}
                onClick={onClick}
            />
        );
    }

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
