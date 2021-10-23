import { useState } from 'react';
import { View } from '@tarojs/components';
import Cell from '../../../../../../lib/cell';
import InputNumber from  '../../../../../../lib/input-number';
import '../../../../../../lib/cell/style';
import '../../../../../../lib/input-number/style';

const InputNumberPage = () => {
    const [val1, setVal1] = useState(0);
    const [val2, setVal2] = useState(0);

    return (
        <View className='demo'>
            <View className='h2'>基本用法</View>
            <Cell>
                <InputNumber />
            </Cell>
            <View className='h2'>步长设置</View>
            <Cell>
                <InputNumber step={5} />
            </Cell>
            <View className='h2'>限制输入范围</View>
            <Cell>
                <InputNumber
                    min={10}
                    max={20}
                    value={val2}
                    onChange={setVal2}
                />
            </Cell>
            <View className='h2'>禁用操作</View>
            <Cell>
                <InputNumber disabled />
            </Cell>
            <View className='h2'>支持小数</View>
            <Cell>
                <InputNumber
                    step={0.1}
                    precision={1}
                />
            </Cell>
            <View className='h2'>支持受控</View>
            <Cell>
                <InputNumber value={val1} onChange={setVal1} />
            </Cell>
            <View className='h2'>自定义按钮大小</View>
            <Cell>
                <InputNumber buttonSize={30} inputWidth={50} />
            </Cell>
        </View>
    );
};

export default InputNumberPage;
