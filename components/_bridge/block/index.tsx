import { forwardRef, ForwardRefRenderFunction } from 'react';
import { View } from '@tarojs/components';

const BridgeBlock: ForwardRefRenderFunction<any, any> = (props, ref) => {
    return <View ref={ref} {...props} />;
};

export default forwardRef(BridgeBlock);
