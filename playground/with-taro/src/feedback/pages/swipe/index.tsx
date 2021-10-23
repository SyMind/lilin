import { View } from '@tarojs/components';
import Cell from '../../../../../../lib/cell';
import Button from  '../../../../../../lib/button';
import Swipe from  '../../../../../../lib/swipe';
import InputNumber from '../../../../../../lib/input-number';
import '../../../../../../lib/cell/style';
import '../../../../../../lib/button/style';
import '../../../../../../lib/swipe/style';
import '../../../../../../lib/input-number/style';

const SwipePage = () => {

    return (
        <View className='demo full'>
            <View className='h2'>基础用法</View>
            <Swipe
                right={
                    <Button
                        shape='square'
                        style={{ height: '100%' }}
                        type='danger'
                    >
                        删除
                    </Button>
                }
            >
                <Cell roundRadius={0} desc='左滑删除' />
            </Swipe>
            <View className='h2'>禁止滑动</View>
            <Swipe
                disabled
                right={
                    <Button
                        shape='square'
                        style={{ height: '100%' }}
                        type='danger'
                    >
                        删除
                    </Button>
                }
            >
                <Cell roundRadius={0} desc='禁止滑动' />
            </Swipe>
            <View className='h2'>左右滑动</View>
            <Swipe
                left={
                    <Button
                        shape='square'
                        style={{ height: '100%' }}
                        type='success'
                    >
                        选择
                    </Button>
                }
                right={
                    <Button
                        shape='square'
                        style={{ height: '100%' }}
                        type='info'
                    >
                        收藏
                    </Button>
                }
            >
            </Swipe>
            {/* <View className='h2'>异步控制</View>
    <Swipe ref='refSwipe' @open='open' @close='close'>
      <nut-cell title='异步打开关闭'>
        <template v-slot:link>
          <nut-switch
            v-model='checked'
            @change='changSwitch'
            active-text='开'
            inactive-text='关'
          />
        </template>
      </nut-cell>
      <template #right>
        <nut-button shape='square' style='height: 100%' type='danger'
          >删除</nut-button
        >
      </template>
    </Swipe> */}
            <View className='h2'>自定义</View>
            <Swipe
                left={
                    <Button
                        shape='square'
                        style={{ height: '100%' }}
                        type='success'
                    >
                        选择
                    </Button>
                }
                right={
                    <>
                        <Button
                            shape='square'
                            style={{ height: '100%' }}
                            type='danger'
                        >
                            删除
                        </Button>
                        <Button
                            shape='square'
                            style={{ height: '100%' }}
                            type='info'
                        >
                            收藏
                        </Button>
                    </>
                }
            >
                <Cell title="商品描述">
                    <InputNumber />
                </Cell>
            </Swipe>
        </View>
    );
};

export default SwipePage;
