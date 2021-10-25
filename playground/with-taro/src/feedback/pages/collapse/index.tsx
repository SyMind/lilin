import { useState } from 'react';
import { View } from '@tarojs/components';
import Collapse from '../../../../../../lib/collapse';
import '../../../../../../lib/collapse/style';

const { Panel } = Collapse;

const CollapsePage = () => {
    const [activeKey1, setActiveKey1] = useState<string[]>([]);

    return (
        <View className="demo full">
            <View className='h2'>基本用法</View>
            <Collapse
                activeKey={activeKey1}
                onChange={activeKey => {
                    setActiveKey1(activeKey as string[]);
                }}
            >
                <Panel title="标题1" key="1">
                    京东“厂直优品计划”首推“政府优品馆” 3年覆盖80%镇级政府
                </Panel>
                <Panel title="标题2" key="2">
                    京东到家：教师节期间 创意花束销量增长53倍
                </Panel>
                <Panel title="标题3" key="3" disabled />
            </Collapse>
            {/* <View className='h2'>无icon样式</View>
    <Collapse v-model:active="active4" :accordion="true">
      <Panel :title="title1" :name="1">
        2020年中国数字游戏市场规模超2786亿元
      </Panel>
      <Panel :title="title2" :name="2">
        基于区块链技术的取证APP在浙江省杭州市发布
      </Panel>
    </Collapse>
    <h2>手风琴</h2>
    <Collapse v-model:active="active2" :accordion="true" icon="down-arrow">
      <Panel :title="title1" :name="1">
        华为终端操作系统EMUI 11发布，9月11日正式开启
      </Panel>
      <Panel :title="title2" :name="2" :sub-title="subTitle">
        中国服务机器人市场已占全球市场超1/4
      </Panel>
      <Panel :title="title3" :name="3">
        QuestMobile：90后互联网用户规模超越80后达3.62亿
      </Panel>
    </Collapse>
    <h2>自定义折叠图标</h2>
    <Collapse
      v-model:active="active3"
      :accordion="true"
      icon="arrow-right2"
      rotate="90"
    >
      <Panel :title="title1" :name="1">
        京东数科IPO将引入“绿鞋机制”
      </Panel>
      <Panel :title="title2" :name="2" sub-title="文本内容">
        世界制造业大会开幕，阿里巴巴与安徽合作再升级
      </Panel>
    </Collapse>
    <h2>自定义标题图标</h2>
    <Collapse
      v-model:active="active5"
      title-icon="issue"
      title-icon-color="red"
      title-icon-size="20px"
      title-icon-position="left"
      icon="down-arrow"
      :accordion="true"
    >
      <Panel :title="title1" :name="1">
        “森亿智能”获4亿元D轮融资
      </Panel>
      <Panel :title="title2" :name="2" sub-title="文本内容">
        快看漫画与全球潮玩集合店X11达成战略合作
      </Panel>
    </Collapse>
  */}
        </View>
    );
};

export default CollapsePage;
