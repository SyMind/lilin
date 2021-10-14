import { useContext, useCallback, FC } from 'react';
import classNames from 'classnames';
import { ConfigContext } from '../config-provider';

const checkPoint = (price: string | number) => String(price).indexOf('.') > 0;

interface PriceProps {
    prefixCls?: string;
    className?: string;
    price?: string | string;
    needSymbol?: boolean;
    symbol?: string;
    decimalDigits?: number;
    thousands?: boolean;
}

const Price: FC<PriceProps> = ({
    prefixCls: customizePrefixCls,
    className,
    price = 0,
    needSymbol = true,
    symbol = '¥',
    decimalDigits = 2,
    thousands = false
}) => {
    const {getPrefixCls} = useContext(ConfigContext);
    const prefixCls = getPrefixCls('price', customizePrefixCls);

    const classes = classNames(prefixCls, className);

    const formatThousands = useCallback((num: any) => {
        if (Number(num) == 0) {
            num = 0;
        }
        if (checkPoint(num)) {
            num = Number(num).toFixed(decimalDigits);
            num = typeof num.split('.') === 'string'
                ? num.split('.')
                : num.split('.')[0];
        } else {
            num = num.toString();
        }
        if (thousands) {
            return (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
        } else {
            return num;
        }
    }, [decimalDigits, thousands]);

    const formatDecimal = useCallback((decimalNum: any) => {
        if (Number(decimalNum) == 0) {
            decimalNum = 0;
        }
        if (checkPoint(decimalNum)) {
            decimalNum = Number(decimalNum).toFixed(decimalDigits);
            decimalNum =
                typeof decimalNum.split('.') === 'string'
                    ? 0
                    : decimalNum.split('.')[1];
        } else {
            decimalNum = decimalNum.toString();
        }
        const result = '0.' + decimalNum;
        const resultFixed = Number(result).toFixed(decimalDigits);
        return String(resultFixed).substring(2, resultFixed.length);
    }, [decimalDigits]);

    return (
        <div className={classes}>
            {needSymbol && <div className={`${prefixCls}--symbol`}>{symbol}</div>}
            <div className={`${prefixCls}--big`}>
                {formatThousands(price)}
            </div>
            <div className={`${prefixCls}--point`}>.</div>
            <div className={`${prefixCls}--small`}>
                {formatDecimal(price)}
            </div>
        </div>
    );
};

export default Price;
