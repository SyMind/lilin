import { ReactNode } from 'react';

export interface PortalProps {
    getContainer?: () => HTMLElement;
    children?: ReactNode;
}
