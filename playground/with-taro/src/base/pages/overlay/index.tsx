import {useState} from 'react';
import { View } from '@tarojs/components';
import { Cell, Button, Overlay } from '../../../../../../es';
import './index.scss';

const OverlayPage = () => {
    const [visible1, setVisible1] = useState(false);
    const [visible2, setVisible2] = useState(false);

    return (
        <View className="demo">
            <View className='h2'>基础用法</View>
            <Cell>
                <Button
                    type='primary'
                    onClick={() => setVisible1(true)}
                >
                    显示遮罩层
                </Button>
                <Overlay
                    visible={visible1}
                    zIndex={2000}
                    onClose={() => setVisible1(false)}
                />
            </Cell>
            <View className='h2'>嵌套内容</View>
            <Cell>
                <Button
                    type="success"
                    onClick={() => setVisible2(true)}
                >
                    嵌套内容
                </Button>
                <Overlay
                    visible={visible2}
                    zIndex={2000}
                    onClose={() => setVisible2(false)}
                >
                    <View className="wrapper">
                        <View className="content">这里是正文</View>
                    </View>
                </Overlay>
            </Cell>
        </View>
    );
};

export default OverlayPage;
