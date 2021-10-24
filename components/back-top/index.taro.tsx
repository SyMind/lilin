import { useState, useCallback, useRef, useContext, useEffect, FC } from 'react';
import { usePageScroll, pageScrollTo } from '@tarojs/taro';
import { View } from '@tarojs/components';
import classNames from 'classnames';
import Icon from '../icon';
import { ConfigContext } from '../config-provider';
import { BackTopProps  } from './typings';

const BackTop: FC<BackTopProps> = ({
    prefixCls: customizePrefixCls,
    duration = 1000,
    visibilityHeight = 200,
    onClick
}) => {
    const { getPrefixCls } = useContext(ConfigContext);
    const prefixCls = getPrefixCls('back-top', customizePrefixCls);

    const [visible, setVisible] = useState(false);
    const visibilityHeightRef = useRef(visibilityHeight);

    const classes = classNames(prefixCls, {
        [`${prefixCls}-show`]: visible
    });

    const scrollToTop = useCallback(event => {
        pageScrollTo({
            scrollTop: 0,
            duration
        });
        onClick?.(event);
    }, [duration, onClick]);

    useEffect(() => {
        visibilityHeightRef.current = visibilityHeight;
    }, [visibilityHeight]);

    usePageScroll(({ scrollTop }) => {
        setVisible(scrollTop > visibilityHeightRef.current);
    });

    return (
        <View
            className={classes}
            onClick={scrollToTop}
        >
            <Icon size={19} name='top' />
        </View>
    );
};

export default BackTop;
