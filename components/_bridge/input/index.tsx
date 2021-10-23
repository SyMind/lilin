import { forwardRef, ForwardRefRenderFunction } from 'react';
import { Input } from '@tarojs/components';

const BridgeInput: ForwardRefRenderFunction<any, any> = ({
    onChange,
    ...rest
}, ref) => {
    return (
        <Input
            {...rest}
            ref={ref}
            onInput={onChange}
        />
    );
};

export default forwardRef(BridgeInput);
