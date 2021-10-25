import { useCallback, useContext, cloneElement, FC, Key, ReactElement } from 'react';
import classNames from 'classnames';
import { ConfigContext } from '../config-provider';
import { toArray } from '../_util/rc';
import useMergedState from '../_util/hooks/useMergedState';
import Panel from './collapse-panel';

function getActiveKeysArray(activeKey: React.Key | React.Key[]): string[] {
    let currentActiveKey = activeKey;
    if (!Array.isArray(currentActiveKey)) {
        const activeKeyType = typeof currentActiveKey;
        currentActiveKey = activeKeyType === 'number' || activeKeyType === 'string'
            ? [currentActiveKey]
            : [];
    }
    return currentActiveKey.map((key) => String(key));
}

interface CollapseProps {
    prefixCls?: string;
    className?: string;
    accordion?: boolean;
    defaultActiveKey?: Key | Key[];
    activeKey?: Key | Key[];
    onChange?: (key: Key | Key[]) => void;
}

const InternalCollapse: FC<CollapseProps> = ({
    prefixCls: customizePrefixCls,
    className,
    accordion = false,
    defaultActiveKey,
    activeKey,
    children,
    onChange
}) => {
    const {getPrefixCls} = useContext(ConfigContext);
    const prefixCls = getPrefixCls('collapse', customizePrefixCls);

    const [mergedActiveKey, setMergedActiveKey] = useMergedState<Key[]>([], {
        value: activeKey ? getActiveKeysArray(activeKey) : undefined,
        defaultValue: defaultActiveKey ? getActiveKeysArray(defaultActiveKey) : [],
        onChange(newActiveKey) {
            onChange?.(accordion ? newActiveKey![0] : newActiveKey!);
        }
    });

    const handleItemClick = useCallback((key: Key) => {
        let nextActiveKey = [...mergedActiveKey];
        if (accordion) {
            nextActiveKey = mergedActiveKey[0] === key ? [] : [key];
        } else {
            const index = mergedActiveKey.indexOf(key);
            const isActive = index > -1;
            if (isActive) {
                nextActiveKey.splice(index, 1);
            } else {
                nextActiveKey.push(key);
            }
        }
        setMergedActiveKey(nextActiveKey);
    }, [accordion, mergedActiveKey, setMergedActiveKey]);

    const forMap = useCallback((child: ReactElement) => {
        if (!child) return null;

        if (typeof child.type === 'string') {
            return child;
        }

        const key = child.key;
        let isActive = false;
        if (accordion) {
            isActive = mergedActiveKey[0] === key;
        } else {
            isActive = key !== null && mergedActiveKey.includes(key);
        }

        return cloneElement(child, {
            key,
            panelKey: key,
            isActive,
            onClick: handleItemClick
        });
    }, [accordion, handleItemClick, mergedActiveKey]);

    return (
        <div className={classNames(prefixCls, className)}>
            {toArray(children).map(forMap)}
        </div>
    );
};

type CollapseType = typeof InternalCollapse & { Panel: typeof Panel };

const Collapse = InternalCollapse as CollapseType;
Collapse.Panel = Panel;

export default Collapse;
