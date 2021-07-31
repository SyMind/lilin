import { FC } from 'react';
import { Button } from '@tarojs/components';

interface BridgeButtonProps {
    type: 'submit' | 'reset' | 'button'
}

const BridgeButton: FC<BridgeButtonProps> = ({type, ...reset}) => {
    const formType = (['submit', 'reset'].includes(type) ? type : undefined) as 'submit' | 'reset';

    return (
        <Button
            formType={formType}
            {...reset}
        />
    );
};

export default BridgeButton;
