import { useState, useCallback, useEffect, useContext, useRef, FC, UIEvent, MouseEvent } from 'react';
import classNames from 'classnames';
import Icon from '../icon';
import { ConfigContext } from '../config-provider';
import { getScroll, scrollTo } from '../_util/dom';
import { BackTopProps  } from './typings';

const BackTop: FC<BackTopProps> = ({
    prefixCls: customizePrefixCls,
    duration = 1000,
    target,
    visibilityHeight = 200,
    onClick
}) => {
    const { getPrefixCls } = useContext(ConfigContext);
    const prefixCls = getPrefixCls('backtop', customizePrefixCls);

    const [visible, setVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    const classes = classNames(prefixCls, {
        [`${prefixCls}-show`]: visible
    });

    const getDefaultTarget = () => ref.current && ref.current.ownerDocument
        ? ref.current.ownerDocument
        : window;

    useEffect(() => {
        function handleScroll(event: UIEvent<HTMLElement> | { target: any }) {
            const scrollTop = getScroll(event.target, true);
            setVisible(scrollTop > visibilityHeight!);
        }

        const getTarget = target || getDefaultTarget;
        const container = getTarget();
        container.addEventListener('scroll', handleScroll);
        handleScroll({
            target: container
        });

        return () => {
            container.addEventListener('scroll', handleScroll);
        };
    }, [target, visibilityHeight]);

    const scrollToTop = useCallback((event: MouseEvent<HTMLDivElement>) => {
        scrollTo(0, {
            getContainer: target || getDefaultTarget,
            duration
        });
        onClick?.(event);
    }, [duration, onClick, target]);

    return (
        <div
            ref={ref}
            className={classes}
            onClick={scrollToTop}
        >
            <Icon size={19} name='top' />
        </div>
    );
};

export default BackTop;
