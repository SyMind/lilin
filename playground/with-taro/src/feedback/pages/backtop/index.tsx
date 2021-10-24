import { useCallback } from 'react';
import { View } from '@tarojs/components';
import BackTop from '../../../../../../lib/back-top';
import '../../../../../../lib/back-top/style';
import './index.scss';

const BackTopPage = () => {
    const handleClick = useCallback(() => {
        console.log('clicked!');
    }, []);

    return (
        <View className='demo'>
            <View className='text-data'>我是测试数据1</View>
            <View className='text-data'>我是测试数据2</View>
            <View className='text-data'>我是测试数据3</View>
            <View className='text-data'>我是测试数据4</View>
            <View className='text-data'>我是测试数据5</View>
            <View className='text-data'>我是测试数据6</View>
            <View className='text-data'>我是测试数据7</View>
            <View className='text-data'>我是测试数据8</View>
            <View className='text-data'>我是测试数据9</View>
            <View className='text-data'>我是测试数据10</View>
            <View className='text-data'>我是测试数据11</View>
            <View className='text-data'>我是测试数据12</View>
            <View className='text-data'>我是测试数据13</View>
            <View className='text-data'>我是测试数据14</View>
            <View className='text-data'>我是测试数据15</View>
            <View className='text-data'>我是测试数据16</View>
            <View className='text-data'>我是测试数据17</View>
            <View className='text-data'>我是测试数据18</View>
            <View className='text-data'>我是测试数据19</View>
            <View className='text-data'>我是测试数据20</View>
            <View className='text-data'>我是测试数据21</View>
            <View className='text-data'>我是测试数据22</View>
            <View className='text-data'>我是测试数据23</View>
            <View className='text-data'>我是测试数据24</View>
            <BackTop onClick={handleClick} />
        </View>
    );
};

export default BackTopPage;
