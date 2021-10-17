import { FC } from 'react';
import { PortalProps } from './typings';

export { PortalProps } from './typings';

const Portal: FC<PortalProps> = ({children}) => {
    return <>{children}</>;
};

export default Portal;
