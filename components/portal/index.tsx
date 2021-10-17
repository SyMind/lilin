import { useRef, FC, ReactNode } from 'react';
import ReactDOM from 'react-dom';
import { canUseDom } from '../_util/dom';

export interface PortalProps {
    getContainer: () => HTMLElement;
    children?: ReactNode;
}

const Portal: FC<PortalProps> = ({getContainer, children}) => {
    const containerRef = useRef<HTMLElement>();

    const initRef = useRef(false);
    if (!initRef.current && canUseDom()) {
        containerRef.current = getContainer();
        initRef.current = true;
    }

    return containerRef.current
        ? ReactDOM.createPortal(children, containerRef.current)
        : null;
};

export default Portal;
