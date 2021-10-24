import {useEffect, useState} from 'react';
import { View } from '@tarojs/components';
import Price from  '../../../../../../lib/price';
import Cell from  '../../../../../../lib/cell';
import '../../../../../../lib/price/style';
import '../../../../../../lib/cell/style';

const PricePage = () => {
    const [price, setPrice] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setPrice( Math.random() * 10000000);
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <View className='demo'>
            <View className='h2'>基本用法</View>
            <Cell>
                <Price price={1010} needSymbol={false} thousands />
            </Cell>
            <View className='h2'>有人民币符号，无千位分隔</View>
            <Cell>
                <Price price={10010.01} needSymbol thousands={false} />
            </Cell>
            <View className='h2'>带人民币符号，有千位分隔，保留小数点后三位</View>
            <Cell>
                <Price
                    price={10010.01}
                    decimalDigits={3}
                    needSymbol
                    thousands
                />
            </Cell>
            <View className='h2'>异步随机变更</View>
            <Cell>
                <Price
                    price={price}
                    decimalDigits={3}
                    needSymbol={false}
                    thousands
                />
            </Cell>
        </View>
    );
};

export default PricePage;
