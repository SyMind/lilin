import { useCallback } from 'react';
import { View } from '@tarojs/components';
import Cell from  '../../../../../../lib/cell';
import '../../../../../../lib/cell/style';

const CellPage = () => {
    const testClick = useCallback(() => {
        console.log('点击事件');
    }, []);

    return (
        <View className='demo'>
            <View className='h2'>基本用法</View>
            <Cell title="我是标题" desc="描述文字" />
            <Cell
                title="我是标题"
                subTitle="副标题描述"
                desc="描述文字"
            />
            <Cell title="点击测试" onClick={testClick} />
            <Cell title="圆角设置 0" roundRadius={0} />

            <View className='h2'>直接使用插槽(slot)</View>

            <Cell title="我是标题" desc="描述文字">
                <View>自定义内容</View>
            </Cell>

            <Cell.Group title="自定义右侧箭头区域">
                <Cell title="Switch">
                    {/* <template v-slot:link>
                    <nut-switch v-model="switchChecked" />
                    </template> */}
                </Cell>
            </Cell.Group>

            <View className='h2'>展示图标</View>
            <Cell title="姓名" icon="my" desc="张三" isLink />

            <View className='h2'>只展示 desc ，可通过 desc-text-align 调整内容位置</View>
            <Cell desc-text-align="left" desc="张三" />
        </View>
    );
};

export default CellPage;
