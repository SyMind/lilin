import { useState, useCallback } from 'react';
import { View } from '@tarojs/components';
import { Cell, Popup } from '../../../../../../es';

const PopupPage = () => {
    const [basicVisible, setBasicVisible] = useState(false);
    const [topVisbile, setTopVisible] = useState(false);
    const [bottomVisbile, setBottomVisible] = useState(false);
    const [leftVisbile, setLeftVisible] = useState(false);

    const handleBasicClick = useCallback(() => {
        setBasicVisible(true);
    }, []);

    const handleBasicClose = useCallback(() => {
        setBasicVisible(false);
    }, []);

    const handleTopClick = useCallback(() => {
        setTopVisible(true);
    }, []);

    const handleTopClose = useCallback(() => {
        setTopVisible(false);
    }, []);

    const handleBottomClick = useCallback(() => {
        setBottomVisible(true);
    }, []);

    const handleBottomClose = useCallback(() => {
        setBottomVisible(false);
    }, []);

    const handleLeftClick = useCallback(() => {
        setLeftVisible(true);
    }, []);

    const handleLeftClose = useCallback(() => {
        setLeftVisible(false);
    }, []);

    return (
        <View className='demo'>
            <View className='h2'>基础用法</View>
            <Cell
                title='展示弹出层'
                is-link
                onClick={handleBasicClick}
            />
            <Popup
                bodyStyle={{ padding: '30px 50px' }}
                visible={basicVisible}
                zIndex={100}
                onClose={handleBasicClose}
            >
                正文
            </Popup>
            <View className='h2'>弹出位置</View>
            <Cell title='顶部弹出' onClick={handleTopClick} />
            <Popup
                position='top'
                bodyStyle={{ height: '20%' }}
                visible={topVisbile}
                onClose={handleTopClose}
            />
            <Cell
                title='底部弹出'
                onClick={handleBottomClick}
            />
            <Popup
                position='bottom'
                bodyStyle={{ height: '20%' }}
                visible={bottomVisbile}
                onClose={handleBottomClose}
            />
            <Cell
                title='左侧弹出'
                onClick={handleLeftClick}
            />
            <Popup
                position='left'
                bodyStyle={{ width: '20%', height: '100%' }}
                visible={leftVisbile}
                onClose={handleLeftClose}
            />
            {/* <nut-cell
            title='右侧弹出'
            is-link
            @click='state.showRight = true'
            ></nut-cell>
            <Popup
            position='right'
            :style='{ width: '20%', height: '100%' }'
            v-model:visible='state.showRight'
            ></Popup>
            <h2>关闭图标</h2>
            <nut-cell
            title='关闭图标'
            is-link
            @click='state.showIcon = true'
            ></nut-cell>
            <Popup
            position='bottom'
            closeable
            :style='{ height: '20%' }'
            v-model:visible='state.showIcon'
            ></Popup>
            <nut-cell
            title='图标位置'
            is-link
            @click='state.showIconPosition = true'
            ></nut-cell>
            <Popup
            position='bottom'
            closeable
            close-icon-position='top-left'
            :style='{ height: '20%' }'
            v-model:visible='state.showIconPosition'
            ></Popup>
            <nut-cell
            title='自定义图标'
            is-link
            @click='state.showCloseIcon = true'
            ></nut-cell>
            <Popup
            position='bottom'
            closeable
            close-icon-position='top-left'
            close-icon='heart'
            :style='{ height: '20%' }'
            v-model:visible='state.showCloseIcon'
            ></Popup>
            <h2>圆角弹框</h2>
            <nut-cell
            title='圆角弹框'
            is-link
            @click='state.showRound = true'
            ></nut-cell>
            <Popup
                position='bottom'
                closeable
                round
                :style='{ height: '30%' }'
                v-model:visible='state.showRound'
            /> */}
        </View>
    );
};

export default PopupPage;
