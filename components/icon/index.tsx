import { useMemo, useContext, FC } from 'react';
import classNames from 'classnames';
import { ConfigContext } from '../config-provider';

interface IconProps {
    prefixCls?: string;
    className?: string;
    name: string;
    size?: number;
    fontClassName?: string;
    color?: string;
    onClick?: () => void;
}

const Icon: FC<IconProps> = ({
    prefixCls: customizePrefixCls,
    className,
    name,
    size: rawSize,
    color,
    onClick
}) => {
    const { getPrefixCls } = useContext(ConfigContext);
    const prefixCls = getPrefixCls('icon', customizePrefixCls);

    const style = useMemo(() => {
        const size = typeof rawSize === 'number' ? `${rawSize}px` : undefined;
        return {
            color,
            fontSize: size,
            width: size,
            height: size
        };
    }, [color, rawSize]);

    if (name.includes('/')) {
        return (
            <img
                className={classNames(
                    'lilinicon',
                    'lilinicon--img',
                    prefixCls,
                    className
                )}
                style={style}
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
            style={style}
            onClick={onClick}
        />
    );
};

export default Icon;
