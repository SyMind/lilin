import { Component } from 'react';
import { View } from '@tarojs/components';
import { Button } from 'lilin';
import styles from './index.module.scss';

export default class ButtonPage extends Component {
    render() {
        return (
            <View className='index'>
                <View>按钮类型</View>
                <View className={styles.row}>
                    <Button type="primary">主要按钮</Button>
                    <Button type="info">信息按钮</Button>
                    <Button type="default">默认按钮</Button>
                    <Button type="danger">危险按钮</Button>
                    <Button type="warning">警告按钮</Button>
                    <Button type="success">成功按钮</Button>
                </View>

                <View>朴素按钮</View>
                <View>
                    <Button plain type="primary">朴素按钮</Button>
                    <Button plain type="info">朴素按钮</Button>
                </View>

                <View>禁用状态</View>
                <View>
                    <Button disabled type="primary">禁用状态</Button>
                    <Button plain disabled type="info">禁用状态</Button>
                    <Button plain disabled type="primary">禁用状态</Button>
                </View>

                <View>按钮形状</View>
                <View>
                    <Button shape="square" type="primary">方形按钮</Button>
                    <Button type="info">圆形按钮</Button>
                </View>
            </View>
        );
    }
}
