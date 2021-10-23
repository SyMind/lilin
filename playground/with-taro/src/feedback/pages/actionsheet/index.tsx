import { useState } from 'react';
import { View } from '@tarojs/components';
import Cell from '../../../../../../lib/cell';
import ActionSheet from  '../../../../../../lib/action-sheet';
import '../../../../../../lib/cell/style';
import '../../../../../../lib/action-sheet/style';
import './index.scss';

const { Option } = ActionSheet;

const ActionSheetPage = () => {
    const [visible1, setVisible1] = useState(false);
    const [val1, setVal1] = useState('');

    const [visible2, setVisible2] = useState(false);
    const [val2, setVal2] = useState('');

    const [visible3, setVisible3] = useState(false);
    const [val3, setVal3] = useState('');

    const [visible4, setVisible4] = useState(false);
    const [val4, setVal4] = useState('');

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
                <View className='selected-option'>{val1}</View>
            </Cell>
            <Cell
                isLink
                onClick={() => setVisible2(true)}
            >
                <View className='span'>
                    <View className='label'>展示取消按钮</View>
                </View>
                <View className='selected-option'>{val2}</View>
            </Cell>
            <Cell isLink onClick={() => setVisible3(true)}>
                <View className='span'>
                    <View className='label'>展示描述信息</View>
                </View>
                <View className='selected-option'>{val3}</View>
            </Cell>
            <View className='h2'>选项状态</View>
            <Cell isLink onClick={() => setVisible3(true)}>
                <View className='span'>
                    <View className='label'>选项状态</View>
                </View>
            </Cell>

            <ActionSheet
                visible={visible1}
                onSelect={value => {
                    setVisible1(false);
                }}
                onCancel={() => {
                    setVisible1(false);
                }}
            >
                <Option value={1}>选项一</Option>
                <Option value={2}>选项二</Option>
                <Option value={3}>选项三</Option>
            </ActionSheet>

            {/* <ActionSheet
      v-model:visible='state.isVisible2'
      cancel-txt='取消'
      :menu-items='menuItemsOne'
      onSelect='chooseItemTwo'
    />

    <ActionSheet
      v-model:visible='state.isVisible3'
      :description='state.desc'
      :menu-items='menuItemsTwo'
      @choose='chooseItemThree'
      cancel-txt='取消'
    />

    <ActionSheet
      v-model:visible='state.isVisible4'
      cancel-txt='取消'
      :menu-items='menuItemsThree'
      :choose-tag-value='state.chooseTagValue'
    /> */}
        </View>
    );
};

export default ActionSheetPage;
