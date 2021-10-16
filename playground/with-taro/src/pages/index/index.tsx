import { Component } from 'react';
import Taro from '@tarojs/taro';
import { View, Image, Text } from '@tarojs/components';
import { Icon } from '../../../../../es';
import { nav } from '../../../config.json';
import './index.scss';

export default class Index extends Component {
    handleClick = (nav, component) => {
        Taro.navigateTo({
            url: `/${nav.enName}/pages/${component.name}/index`
        });
    }

    render() {
        return (
            <View className='index'>
                <View className='index-header'>
                    <Image
                        className='img'
                        src="https://img14.360buyimg.com/imagetools/jfs/t1/167902/2/8762/791358/603742d7E9b4275e3/e09d8f9a8bf4c0ef.png"
                    />
                    <View className='info'>
                        <View className='h1'>LiLin</View>
                        <View className='p'>京东风格的轻量级小程序组件库 NutUI 的 React 实现</View>
                    </View>
                </View>

                <View className='index-components'>
                    {nav.map(nav => (
                        <View key={nav.name} className='ol'>
                            <View className='li'>{nav.name}</View>
                            <View className='ul'>
                                {nav.packages.map(component => {
                                    if (!component.show) {
                                        return null;
                                    }

                                    return (
                                        <View
                                            key={component.name}
                                            className='li'
                                        >
                                            <Text
                                                className='a'
                                                onClick={() => this.handleClick(nav, component)}
                                            >
                                                {component.name}&nbsp;&nbsp;{component.cName}
                                            </Text>
                                            <Icon size="14px" color="#979797" name="right" />
                                        </View>
                                    );
                                })}
                            </View>
                        </View>
                    ))}
                </View>
            </View>
        );
    }
}
