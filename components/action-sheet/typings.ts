import { CSSProperties, ReactNode } from 'react';

export type Key = string | number;

export interface OptionData {
    key?: Key;
    disabled?: boolean;
    value: Key;
    description?: string;
    className?: string;
    style?: CSSProperties;
    label?: ReactNode;
}
