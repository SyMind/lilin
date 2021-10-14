import { useMemo, useContext, FC } from 'react';
import classNames from 'classnames';
import { ConfigContext } from '../config-provider';
import Icon from '../icon';

type SizeType = 'large' | 'small' | 'normal';

type ShapeType = 'round' | 'square';

interface AvatarProps {
    prefixCls?: string;
    className?: string;
    size?: SizeType;
    shape?: ShapeType;
    bgColor?: string;
    icon?: string;
    onClick?: (event: any) => void;
}

const Avatar: FC<AvatarProps> = ({
    prefixCls: customizePrefixCls,
    className,
    size = 'normal',
    shape = 'round',
    bgColor = '#eee',
    icon,
    children,
    onClick
}) => {
    const {getPrefixCls} = useContext(ConfigContext);
    const prefixCls = getPrefixCls('avatar', customizePrefixCls);

    const style = useMemo(() => ({
        backgroundColor: `${bgColor}`
    }), [bgColor]);

    const classes = classNames(
        prefixCls,
        `${prefixCls}--${size}`,
        `${prefixCls}--${shape}`,
        className
    );

    return (
        <div
            style={style}
            className={classes}
            onClick={onClick}
        >
            {!!icon && <Icon name={icon} />}
            {!!children && (
                <div className={`${prefixCls}---text`}>
                    {children}
                </div>
            )}
        </div>
    );
};

export default Avatar;
