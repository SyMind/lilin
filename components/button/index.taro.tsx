import { FC } from 'react';
import { Button as BaseButton } from '@tarojs/components';

const Button: FC = ({ children }) => (
    <BaseButton>{children}</BaseButton>
);

export default Button;
