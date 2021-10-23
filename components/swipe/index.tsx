import {
    useState,
    useRef,
    useMemo,
    useCallback,
    useContext,
    FC,
    CSSProperties,
    ReactNode
} from 'react';
import classNames from 'classnames';
import { ConfigContext } from '../config-provider';

export type SwipePositionType = 'left' | 'right';

export interface OverlayProps {
    prefixCls?: string;
    className?: string;
    disabled?: boolean;
    left?: ReactNode;
    right?: ReactNode;
    onOpen?: () => void;
    onClose?: () => void;
}

const Swipe: FC<OverlayProps> = ({
    prefixCls: customizePrefixCls,
    className,
    disabled = false,
    left,
    right,
    children,
    onOpen,
    onClose
}) => {
    const { getPrefixCls } = useContext(ConfigContext);
    const prefixCls = getPrefixCls('swipe', customizePrefixCls);

    const classes = classNames(prefixCls, className);

    const [duration, setDuration] = useState(300);
    const [translateX, setTranslateX] = useState(0);
    const startX = useRef(0);

    const rightEl = useRef<any>(null);
    const leftEl = useRef<any>(null);
    const position = useRef<SwipePositionType | null>(null);

    const style = useMemo<CSSProperties>(() => ({
        transform: `translate3d(${translateX}px, 0, 0)`,
        transition: `all ${duration}ms linear`
    }), [duration, translateX]);

    const handleStart = useCallback(event => {
        if (disabled) {
            return;
        }
        const touch = event.touches ? event.touches[0] : event;
        startX.current = touch.clientX;
    }, [disabled]);

    const handleMove = useCallback(event => {
        if (disabled) {
            return;
        }
        setDuration(0);
        const touch = event.touches ? event.touches[0] : event;
        const deltaX =touch.clientX - startX.current;
        position.current = deltaX > 0 ? 'right' : 'left';
        setTranslateX(deltaX);
    }, [disabled]);


    const handleEnd = useCallback(() => {
        setDuration(300);

        const rightClientWidth = rightEl.current.clientWidth;
        const leftClientWidth = leftEl.current.clientWidth;

        switch (position.current) {
        case 'left':
            if (Math.abs(translateX) <= rightClientWidth / 2) {
                onClose?.();
            } else {
                setTranslateX(-rightClientWidth);
                onOpen?.();
            }
            break;
        case 'right':
            if (Math.abs(translateX) <= leftClientWidth / 2) {
                onClose?.();
            } else {
                setTranslateX(leftClientWidth);
                onOpen?.();
            }
            break;
        }
    }, [onClose, onOpen, translateX]);

    return (
        <div
            className={classes}
            style={style}
            onTouchStart={handleStart}
            onMouseDown={handleStart}
            onTouchMove={handleMove}
            onMouseMove={handleMove}
            onTouchEnd={handleEnd}
            onMouseUp={handleEnd}
            onTouchCancel={handleEnd}
            onMouseLeave={handleEnd}
        >
            <div
                ref={leftEl}
                className={`${prefixCls}--left`}
            >
                {left}
            </div>
            <div className={`${prefixCls}--content`}>
                {children}
            </div>
            <div
                ref={rightEl}
                className={`${prefixCls}--right`}
            >
                {right}
            </div>
        </div>
    );
};

export default Swipe;
