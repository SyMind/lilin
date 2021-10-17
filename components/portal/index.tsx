import { useRef, FC } from 'react';
import ReactDOM from 'react-dom';
import { canUseDom } from '../_util/dom';
import { PortalProps } from './typings';

export { PortalProps } from './typings';

const Portal: FC<PortalProps> = ({
    getContainer = () => null,
    children
}) => {
    const containerRef = useRef<HTMLElement | null>();

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
