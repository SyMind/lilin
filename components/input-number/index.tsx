import { useCallback, useMemo, useContext, FC } from 'react';
import classNames from 'classnames';
import useMergedState from '../_util/hooks/useMergedState';
import { ConfigContext } from '../config-provider';
import Icon from '../icon';

interface InputNumberProps {
    prefixCls?: string;
    className?: string;
    inputWidth?: number;
    buttonSize?: number;
    min?: number;
    max?: number;
    step?: number;
    precision?: number;
    disabled?: boolean;
    value?: number;
    onChange?: (value: number) => void;
}

const InputNumber: FC<InputNumberProps> = ({
    prefixCls: customizePrefixCls,
    className,
    inputWidth,
    buttonSize,
    min = 0,
    max = 9999,
    step = 1,
    precision = 0,
    disabled = false,
    value = 0,
    onChange
}) => {
    const { getPrefixCls } = useContext(ConfigContext);
    const prefixCls = getPrefixCls('input-number', customizePrefixCls);

    const classes = classNames(
        prefixCls,
        { [`${prefixCls}--disabled`]: disabled },
        className
    );

    const [mergedValue, setMergedValue] = useMergedState<number>(value, {
        value,
        onChange
    });

    const setFixedDecimalValue = useCallback((decimal: number) => {
        setMergedValue(Number(decimal.toFixed(precision)));
    }, [precision, setMergedValue]);

    const style = useMemo(() => ({
        height: buttonSize != null ? `${buttonSize}px` : undefined
    }), [buttonSize]);

    const inputStyle = useMemo(() => ({
        width: inputWidth
    }), [inputWidth]);

    const reduceDisabled = value <= min || disabled;
    const addDisabled = value >= max || disabled;

    const reduce = useCallback(() => {
        if (!reduceDisabled) {
            setFixedDecimalValue(value - step);
        }
    }, [reduceDisabled, setFixedDecimalValue, step, value]);

    const add = useCallback(() => {
        if (!addDisabled) {
            setFixedDecimalValue(value + step);
        }
    }, [addDisabled, setFixedDecimalValue, step, value]);

    const handleChange = useCallback(event => {
        setFixedDecimalValue(event.target.value);
    }, [setFixedDecimalValue]);

    const handleBlur = useCallback(event => {
        if (disabled) return;
        let value = event.target.value;
        if (value < min) {
            value = min;
        } else if (value > max) {
            value = max;
        }
        setFixedDecimalValue(value);
    }, [disabled, max, min, setFixedDecimalValue]);

    return (
        <div
            className={classes}
            style={style}
        >
            <Icon
                name='minus'
                className={classNames(`${prefixCls}--icon`, {
                    [`${prefixCls}--disabled`]: reduceDisabled
                })}
                size={buttonSize}
                onClick={reduce}
            />
            <input
                className={`${prefixCls}--input`}
                type='number'
                min={min}
                max={max}
                style={inputStyle}
                disabled={disabled}
                value={mergedValue}
                onChange={handleChange}
                onBlur={handleBlur}
            />
            <Icon
                name='plus'
                className={classNames(`${prefixCls}--icon`, {
                    [`${prefixCls}--disabled`]: addDisabled
                })}
                size={buttonSize}
                onClick={add}
            />
        </div>
    );
};

export default InputNumber;
