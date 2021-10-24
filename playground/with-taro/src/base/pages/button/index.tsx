import { useState, useCallback } from 'react';
import { View } from '@tarojs/components';
import Button from  '../../../../../../lib/button';
import '../../../../../../lib/button/style';
import './index.scss';

const ButtonPage = () => {
    const [loading, setLoading] = useState(false);

    const changeLoading = useCallback(() => {
        setLoading(!loading);
    }, [loading]);

    return (
        <View className='demo'>
            <View className='h2'>按钮类型</View>
            <View className="demo-button-row">
                <Button type="primary">主要按钮</Button>
                <Button type="info">信息按钮</Button>
                <Button type="default">默认按钮</Button>
            </View>
            <View className="demo-button-row2">
                <Button type="danger">危险按钮</Button>
                <Button type="warning">警告按钮</Button>
                <Button type="success">成功按钮</Button>
            </View>
            <View className='h2'>朴素按钮</View>
            <View className="demo-button-row2">
                <Button plain type="primary">朴素按钮</Button>
                <Button plain type="info">朴素按钮</Button>
            </View>
            <View className='h2'>禁用状态</View>
            <View className="demo-button-row2">
                <Button disabled type="primary">禁用状态</Button>
                <Button plain disabled type="info">禁用状态</Button>
                <Button plain disabled type="primary">禁用状态</Button>
            </View>
            <View className='h2'>按钮形状</View>
            <View className="demo-button-row2">
                <Button shape="square" type="primary">方形按钮</Button>
                <Button type="info">圆形按钮</Button>
            </View>
            <View className='h2'>加载状态</View>
            <View className="demo-button-row2">
                <Button loading type="info"></Button>
                <Button loading type="warning">加载中...</Button>
                <Button loading={loading} type="success" onClick={changeLoading}>Click me!</Button>
            </View>
            <View className='h2'>图标按钮</View>
            <View className="demo-button-row2">
                <Button
                    shape="square"
                    plain
                    type="primary"
                    icon="star-fill"
                />
                <Button shape="square" type="primary" icon="star">收藏</Button>
            </View>
            <View className='h2'>按钮尺寸</View>
            <View className="demo-button-row2">
                <Button size="large" type="primary" style={{marginBottom: '10px'}}>大号按钮</Button>
                <Button type="primary">普通按钮</Button>
                <Button size="small" type="primary">小型按钮</Button>
            </View>
            <View className='h2'>块级元素</View>
            <View className="demo-button-row2">
                <Button block type="primary">块级元素</Button>
            </View>
            <View className='h2'>自定义颜色</View>
            <View className="demo-button-row2">
                <Button color="#7232dd">单色按钮</Button>
                <Button color="#7232dd" plain>单色按钮</Button>
                <Button color="linear-gradient(to right, #ff6034, #ee0a24)">
                    渐变按钮
                </Button>
            </View>
        </View>
    );
};

export default ButtonPage;
