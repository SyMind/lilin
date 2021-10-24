import { View } from '@tarojs/components';
import Row from '../../../../../../lib/cell';
import Col from  '../../../../../../lib/col';
import '../../../../../../lib/row/style';
import '../../../../../../lib/col/style';
import './index.scss';

const LayoutPage = () => (
    <View className="demo full">
        <View className='h2'>基础布局</View>
        <View className="box-item">
            <Row>
                <Col span={24}>
                    <View className="flex-content">span:24</View>
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <View className="flex-content">span:12</View>
                </Col>
                <Col span={12}>
                    <View className="flex-content flex-content-light">span:12</View>
                </Col>
            </Row>
            <Row>
                <Col span={8}>
                    <View className="flex-content">span:8</View>
                </Col>
                <Col span={8}>
                    <View className="flex-content flex-content-light">span:8</View>
                </Col>
                <Col span={8}>
                    <View className="flex-content">span:8</View>
                </Col>
            </Row>
            <Row>
                <Col span={6}>
                    <View className="flex-content">span:6</View>
                </Col>
                <Col span={6}>
                    <View className="flex-content flex-content-light">span:6</View>
                </Col>
                <Col span={6}>
                    <View className="flex-content">span:6</View>
                </Col>
                <Col span={6}>
                    <View className="flex-content">span:6</View>
                </Col>
            </Row>
        </View>
        <View className='h2'>分栏间隔</View>
        <View className="box-item">
            <Row gutter={10}>
                <Col span={8}>
                    <View className="flex-content">span:8</View>
                </Col>
                <Col span={8}>
                    <View className="flex-content flex-content-light">span:8</View>
                </Col>
                <Col span={8}>
                    <View className="flex-content">span:8</View>
                </Col>
            </Row>
        </View>
        <View className='h2'>Flex布局</View>
        <View className="box-item">
            <Row type="flex" wrap="nowrap">
                <Col span={6}>
                    <View className="flex-content">span:6</View>
                </Col>
                <Col span={6}>
                    <View className="flex-content flex-content-light">span:6</View>
                </Col>
                <Col span={6}>
                    <View className="flex-content">span:6</View>
                </Col>
            </Row>
            <Row type="flex" justify="center">
                <Col span={6}>
                    <View className="flex-content">span:6</View>
                </Col>
                <Col span={6}>
                    <View className="flex-content flex-content-light">span:6</View>
                </Col>
                <Col span={6}>
                    <View className="flex-content">span:6</View>
                </Col>
            </Row>
            <Row type="flex" justify="end">
                <Col span={6}>
                    <View className="flex-content">span:6</View>
                </Col>
                <Col span={6}>
                    <View className="flex-content flex-content-light">span:6</View>
                </Col>
                <Col span={6}>
                    <View className="flex-content">span:6</View>
                </Col>
            </Row>
            <Row type="flex" justify="space-between">
                <Col span={6}>
                    <View className="flex-content">span:6</View>
                </Col>
                <Col span={6}>
                    <View className="flex-content flex-content-light">span:6</View>
                </Col>
                <Col span={6}>
                    <View className="flex-content">span:6</View>
                </Col>
            </Row>
            <Row type="flex" justify="space-around">
                <Col span={6}>
                    <View className="flex-content">span:6</View>
                </Col>
                <Col span={6}>
                    <View className="flex-content flex-content-light">span:6</View>
                </Col>
                <Col span={6}>
                    <View className="flex-content">span:6</View>
                </Col>
            </Row>
        </View>
    </View>
);

export default LayoutPage;
