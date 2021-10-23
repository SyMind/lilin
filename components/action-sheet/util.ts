import { isValidElement, ReactNode, ReactElement } from 'react';
import { toArray } from '../_util/rc';
import { OptionData } from './typings';

function convertNodeToOption(node: ReactElement): OptionData {
    const {
        key,
        props: { children, value, ...restProps }
    } = node as ReactElement;

    return {
        key,
        value: value !== undefined ? value : key,
        label: children,
        ...restProps
    };
}

export function convertChildrenToData(nodes: ReactNode): OptionData[] {
    return toArray(nodes)
        .map((node: ReactElement): OptionData | null => {
            if (!isValidElement(node) || !node.type) {
                return null;
            }

            return convertNodeToOption(node);
        })
        .filter((data) => data) as OptionData[];
}
