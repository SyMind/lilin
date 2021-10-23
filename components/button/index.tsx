import { useMemo, useContext, FC, CSSProperties } from 'react';
import classNames from 'classnames';
import { ConfigContext } from '../config-provider';
import Icon from '../icon';

export type ButtonShape = 'square' | 'round';

export type ButtonType =
  | 'default'
  | 'primary'
  | 'info'
  | 'success'
  | 'warning'
  | 'danger';

export type ButtonSize = 'large' | 'normal' | 'small';

interface ButtonProps {
    prefixCls?: string;
    className?: string;
    style?: CSSProperties;
    color?: string;
    shape?: ButtonShape;
    plain?: boolean;
    loading?: boolean;
    disabled?: boolean;
    type?: ButtonType;
    size?: ButtonSize;
    block?: boolean;
    icon?: string;
    onClick?: () => void;
}

const Button: FC<ButtonProps> = ({
    prefixCls: customizePrefixCls,
    className,
    style: customStyle,
    color,
    shape = 'round',
    plain = false,
    loading = false,
    disabled = false,
    type = 'default',
    size = 'normal',
    block = false,
    icon: customIcon,
    children,
    onClick
}) => {
    const {getPrefixCls} = useContext(ConfigContext);
    const prefixCls = getPrefixCls('btn', customizePrefixCls);

    const style = useMemo(() => {
        const result: CSSProperties = {};
        if (plain) {
            result.color = color;
            result.background = '#fff';
            if (!color?.includes('gradient')) {
                result.borderColor = color;
            }
        } else {
            result.color = '#fff';
            result.background = color;
        }

        if (customStyle) {
            return {
                ...result,
                ...customStyle
            };
        }

        return result;
    }, [color, customStyle, plain]);
    console.log('style', style);

    const classes = classNames(
        prefixCls,
        {
            [`${prefixCls}--${type}`]: type,
            [`${prefixCls}--${size}`]: size,
            [`${prefixCls}--${shape}`]: shape,
            [`${prefixCls}--plain`]: plain,
            [`${prefixCls}--block`]: block,
            [`${prefixCls}--disabled`]: disabled,
            [`${prefixCls}--loading`]: loading
        },
        className
    );

    const icon = useMemo(() => {
        if (loading) {
            return <Icon className={`${prefixCls}--loading-icon`} name='loading' />;
        }
        if (customIcon) {
            return <Icon className='icon' name={customIcon} />;
        }
        return null;
    }, [customIcon, loading, prefixCls]);

    return (
        <button
            className={classes}
            style={style}
            onClick={onClick}
        >
            {icon}
            {children}
        </button>
    );
};

export default Button;
