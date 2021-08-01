import { Component } from 'react';
import { View } from '@tarojs/components';
import { Icon } from 'lilin';
import styles from './index.module.scss';

export default class IconPage extends Component {
    render() {
        return (
            <View className='index'>
                <View>基础用法</View>
                <View className={styles.row}>
                    <Icon name="dongdong" />
                    <Icon name="JD" />
                </View>

                <View>图标颜色</View>
                <View className={styles.row}>
                    <Icon name="dongdong" color="#fa2c19" />
                    <Icon name="dongdong" color="#64b578" />
                    <Icon name="JD" color="#fa2c19" />
                </View>
            </View>
        );
    }
}
