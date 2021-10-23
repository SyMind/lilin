import { FC, ReactNode } from 'react';
import type { OptionData } from './typings';

export interface OptionProps extends Omit<OptionData, 'label'> {
    children: ReactNode;
}

/** This is a placeholder, not real render in dom */
const Option: FC<OptionProps> = () => null;

export default Option;
