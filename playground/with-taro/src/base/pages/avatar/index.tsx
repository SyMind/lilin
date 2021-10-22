import {useCallback} from 'react';
import { View } from '@tarojs/components';
import Cell from '../../../../../../lib/cell';
import Avatar from  '../../../../../../lib/avatar';
import '../../../../../../lib/cell/style';
import '../../../../../../lib/avatar/style';
import './index.scss';

const AvatarPage = () => {
    const handleClick = useCallback(() => {
        console.log('触发点击头像');
    }, []);

    return (
        <View className='demo full'>
            <View className='h2'>默认用法 (内置&quot;small&quot;,&quot;normal&quot;,&quot;large&quot;三种尺寸规格)</View>
            <Cell>
                <Avatar
                    size="large"
                    icon="https://img12.360buyimg.com/imagetools/jfs/t1/143702/31/16654/116794/5fc6f541Edebf8a57/4138097748889987.png"
                />
                <Avatar
                    size="normal"
                    icon="https://img12.360buyimg.com/imagetools/jfs/t1/143702/31/16654/116794/5fc6f541Edebf8a57/4138097748889987.png"
                />
                <Avatar
                    size="small"
                    icon="https://img12.360buyimg.com/imagetools/jfs/t1/143702/31/16654/116794/5fc6f541Edebf8a57/4138097748889987.png"
                />
            </Cell>
            <View className='h2'>修改形状</View>
            <Cell>
                <Avatar icon="my" shape="square" />
                <Avatar icon="my" shape="round" />
            </Cell>
            <View className='h2'>修改背景色</View>
            <Cell>
                <Avatar className="demo-avatar" icon="my" bgColor="#FA2C19" />
            </Cell>
            <View className='h2'>修改背景图片</View>
            <Cell>
                <Avatar icon="https://img12.360buyimg.com/imagetools/jfs/t1/196430/38/8105/14329/60c806a4Ed506298a/e6de9fb7b8490f38.png" />
            </Cell>
            <View className='h2'>可以修改头像的内容</View>
            <Cell>
                <Avatar>N</Avatar>
            </Cell>
            <View className='h2'>点击头像触发事件</View>
            <Cell>
                <Avatar icon="my" onClick={handleClick} />
            </Cell>
        </View>
    );
};

export default AvatarPage;
