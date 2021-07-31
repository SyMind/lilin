import {createContext} from 'react';

export interface ConfigConsumerProps {
    getPrefixCls: (suffixCls?: string, customizePrefixCls?: string) => string;
}

const defaultGetPrefixCls = (suffixCls?: string, customizePrefixCls?: string): string => {
    if (customizePrefixCls) return customizePrefixCls;

    return suffixCls ? `lilin-${suffixCls}` : 'lilin';
};

export const ConfigContext = createContext<ConfigConsumerProps>({
    getPrefixCls: defaultGetPrefixCls
});
