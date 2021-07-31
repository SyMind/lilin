import { createElement as h, useContext, FC } from 'react';
import classNames from 'classnames';
import { ConfigContext } from '../config-provider';

interface IconProps {
    prefixCls?: string;
    className?: string;
    name: string;
    size?: string | number;
    fontClassName?: string;
    color?: string;
    tag?: string;
    onClick?: () => void;
}

const Icon: FC<IconProps> = ({
    prefixCls: customizePrefixCls,
    className,
    name,
    size,
    children,
    color,
    tag = 'i',
    onClick
}) => {
    const {getPrefixCls} = useContext(ConfigContext);
    const prefixCls = getPrefixCls('icon', customizePrefixCls);

    const isImage = name ? name.indexOf('/') !== -1 : false;

    return h(
        isImage ? 'img' : tag,
        {
            className: isImage
                ? `${prefixCls}__img`
                : classNames(
                    'lilin-iconfont',
                    prefixCls,
                    `${prefixCls}-${name}`,
                    className
                ),
            style: {
                color,
                fontSize: size,
                width: size,
                height: size
            },
            onClick,
            src: isImage ? name : undefined
        },
        children
    );
};

export default Icon;
