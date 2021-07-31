import { useMemo, useContext, FC, CSSProperties } from 'react';
import classNames from 'classnames';
import { ConfigContext } from '../config-provider';

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
    color?: string;
    shape?: ButtonShape;
    plain?: boolean;
    loading?: boolean;
    disabled?: boolean;
    type?: ButtonType;
    size?: ButtonSize;
    block?: boolean;
    onClick?: () => void;
}

const Button: FC<ButtonProps> = ({
    prefixCls: customizePrefixCls,
    className,
    color,
    shape = 'round',
    plain = false,
    loading = false,
    disabled = false,
    type = 'default',
    size = 'normal',
    block = false,
    children,
    onClick
}) => {
    const {getPrefixCls} = useContext(ConfigContext);
    const prefixCls = getPrefixCls('btn', customizePrefixCls);

    const style = useMemo(() => {
        if (!color) {
            return undefined;
        }

        const style: CSSProperties = {};
        if (plain) {
            style.color = color;
            style.background = '#fff';
            if (!color.includes('gradient')) {
                style.borderColor = color;
            }
        } else {
            style.color = '#fff';
            style.background = color;
        }

        return style;
    }, [color, plain]);

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

    return (
        <button
            className={classes}
            style={style}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default Button;
