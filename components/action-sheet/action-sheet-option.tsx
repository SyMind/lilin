import { FC, ReactNode } from 'react';
import type { OptionData } from './typings';

export interface ActionSheetOptionProps extends Omit<OptionData, 'label'> {
    children: ReactNode;
}

/** This is a placeholder, not real render in dom */
const ActionSheetOption: FC<ActionSheetOptionProps> = () => null;

export default ActionSheetOption;
