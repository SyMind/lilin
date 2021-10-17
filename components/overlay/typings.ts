import { CSSProperties } from 'react';

export interface OverlayProps {
    prefixCls?: string;
    className?: string;
    style?: CSSProperties;
    visible?: boolean;
    zIndex?: number;
    duration?: number; // todo
    lockScroll?: boolean;
    closeOnClickOverlay?: boolean;
    onClose?: (event: any) => void,
}
