import { useState, useMemo } from 'react';
import { View } from '@tarojs/components';
import Cell from '../../../../../../lib/cell';
import ActionSheet from  '../../../../../../lib/action-sheet';
import '../../../../../../lib/cell/style';
import '../../../../../../lib/action-sheet/style';
import './index.scss';

const { Option } = ActionSheet;

const ActionSheetPage = () => {
    const [visible1, setVisible1] = useState(false);
    const [key1, setKey1] = useState('');

    const [visible2, setVisible2] = useState(false);
    const [key2, setKey2] = useState('');

    const [visible3, setVisible3] = useState(false);
    const [key3, setKey3] = useState('');

    const [visible4, setVisible4] = useState(false);
    const [key4, setKey4] = useState('');

    const options = useMemo(() => (
        <>
            <Option key='选项一'>选项一</Option>
            <Option key='选项二'>选项二</Option>
            <Option key='选项三'>选项三</Option>
        </>
    ), []);

    return (
        <View className='demo'>
            <View className='h2'>基本用法</View>
            <Cell
                isLink
                onClick={() => setVisible1(true)}
            >
                <View className='span'>
                    <View className='label'>基础用法</View>
                </View>
                <View className='selected-option'>{key1}</View>
            </Cell>
            <Cell
                isLink
                onClick={() => setVisible2(true)}
            >
                <View className='span'>
                    <View className='label'>展示取消按钮</View>
                </View>
                <View className='selected-option'>{key2}</View>
            </Cell>
            <Cell isLink onClick={() => setVisible3(true)}>
                <View className='span'>
                    <View className='label'>展示描述信息</View>
                </View>
                <View className='selected-option'>{key3}</View>
            </Cell>
            <View className='h2'>选项状态</View>
            <Cell isLink onClick={() => setVisible4(true)}>
                <View className='span'>
                    <View className='label'>选项状态</View>
                </View>
                <View className='selected-option'>{key4}</View>
            </Cell>

            <ActionSheet
                visible={visible1}
                onSelect={key => {
                    setKey1(key as string);
                    setVisible1(false);
                }}
                onCancel={() => {
                    setVisible1(false);
                }}
            >
                {options}
            </ActionSheet>

            <ActionSheet
                visible={visible2}
                cancelText='取消'
                onSelect={key => {
                    setKey2(key as string);
                    setVisible2(false);
                }}
                onCancel={() => {
                    setVisible2(false);
                }}
            >
                {options}
            </ActionSheet>

            <ActionSheet
                visible={visible2}
                cancelText='取消'
                onSelect={key => {
                    setKey2(key as string);
                    setVisible2(false);
                }}
                onCancel={() => {
                    setVisible2(false);
                }}
            >
                {options}
            </ActionSheet>

            <ActionSheet
                visible={visible3}
                description='这是一段描述信息'
                cancelText='取消'
                onSelect={key => {
                    setKey3(key as string);
                    setVisible3(false);
                }}
                onCancel={() => {
                    setVisible3(false);
                }}
            >
                <Option key='选项一'>选项一</Option>
                <Option key='选项二'>选项二</Option>
                <Option key='选项三' description='描述信息'>选项三</Option>
            </ActionSheet>

            <ActionSheet
                selectedKey={key4}
                visible={visible4}
                cancelText='取消'
                selectedColor='rgb(238, 10, 36)'
                onSelect={key => {
                    setKey4(key as string);
                    setVisible4(false);
                }}
                onCancel={() => {
                    setVisible4(false);
                }}
            >
                <Option key='选项一'>选项一</Option>
                <Option key='选项二'>选项二</Option>
                <Option key='禁用选项'disabled>禁用选项</Option>
            </ActionSheet>
        </View>
    );
};

export default ActionSheetPage;
