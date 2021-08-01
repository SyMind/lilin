import { Component } from 'react';
import Taro from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { Icon } from 'lilin';
import { nav } from '../../../../config.json';
import styles from './index.module.scss';

export default class Index extends Component {
    handleClick = component => {
        Taro.navigateTo({
            url: `/pages/${component.name.toLowerCase()}/index`
        });
    }

    render() {
        return (
            <View className='container'>
                {nav.map(nav => (
                    <View key={nav.name}>
                        <View>{nav.name}</View>
                        <View className={styles.components}>
                            {nav.packages.map(component => (
                                <View
                                    key={component.name}
                                    className={styles.item}
                                    onClick={() => this.handleClick(component)}
                                >
                                    <View className={styles.name}>
                                        <Text>{component.name}</Text>
                                        <Text>{component.cName}</Text>
                                    </View>
                                    <Icon size="14px" color="#979797" name="right" />
                                </View>
                            ))}
                        </View>
                    </View>
                ))}
            </View>
        );
    }
}
