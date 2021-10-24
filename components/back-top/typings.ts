export interface BackTopProps {
    prefixCls?: string;
    className?: string;
    duration?: number;
    target?: () => HTMLElement;
    visibilityHeight?: number;
    onClick?: (event: any) => void;
}
