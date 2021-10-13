import { View } from '@tarojs/components';
import { Icon } from 'lilin';

const IconPage = () => (
    <View className='index'>
        <View>基础用法</View>
        <View>
            <Icon name="dongdong" />
            <Icon name="JD" />
        </View>

        <View>图标颜色</View>
        <View>
            <Icon name="dongdong" color="#fa2c19" />
            <Icon name="dongdong" color="#64b578" />
            <Icon name="JD" color="#fa2c19" />
        </View>
    </View>
);

export default IconPage;
