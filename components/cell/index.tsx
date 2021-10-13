import { useMemo, useContext, useCallback, FC, CSSProperties } from 'react';
import classNames from 'classnames';
import { ConfigContext } from '../config-provider';
import Icon from '../icon';
import Group from './cell-group';

const pxCheck = (value?: string | number): string | undefined => {
    if (value == null) {
        return value;
    }
    isNaN(Number(value)) ? String(value) : `${value}px`;
};

interface CellProps {
    prefixCls?: string;
    className?: string;
    title?: string;
    subTitle?: string;
    desc?: string;
    descTextAlign?: CSSProperties['textAlign'];
    isLink?: boolean;
    to?: string;
    replace?: boolean;
    roundRadius?: string | number;
    url?: string;
    icon?: string;
    onClick?: (event: any) => void;
}

interface CompoundedComponent extends FC<CellProps> {
    Group: typeof Group;
  }

const Cell: CompoundedComponent = ({
    prefixCls: customizePrefixCls,
    className,
    title,
    subTitle,
    desc,
    descTextAlign = 'right',
    isLink = false,
    to,
    // replace = false,
    roundRadius,
    // url,
    icon,
    onClick
}) => {
    const {getPrefixCls} = useContext(ConfigContext);
    const prefixCls = getPrefixCls('cell', customizePrefixCls);

    const classes = classNames(
        prefixCls,
        {
            [`${prefixCls}--clickable`]: isLink || to
        },
        className
    );

    const style = useMemo(() => ({
        borderRadius: pxCheck(roundRadius)
    }), [roundRadius]);

    const handleClick = useCallback(event => {
        onClick?.(event);

        // if (to) {
        //     router[replace ? 'replace' : 'push'](to);
        // } else if (props.url) {
        //     props.replace
        //         ? location.replace(props.url)
        //         : (location.href = props.url);
        // }
    }, [onClick]);

    return (
        <div
            className={classes}
            style={style}
            onClick={handleClick}
        >
            {!!(title || subTitle || icon) && (
                <div
                    className={classNames(`${prefixCls}--title`, {
                        [`${prefixCls}--icon`]: icon
                    })}
                >
                    {icon ? <Icon className="icon" name={icon} /> : null}
                    {subTitle ? (
                        <>
                            <div className="title">{{ title }}</div>
                            <div className={`${prefixCls}--title-desc`}>{{ subTitle }}</div>
                        </>
                    ) : title}
                </div>
            )}
            {!!desc && (
                <div
                    className={`${prefixCls}--desc`}
                    style={{ textAlign: descTextAlign }}
                >
                    {desc}
                </div>
            )}
            {!!(isLink || to) && (
                <Icon
                    className={`${prefixCls}--link`}
                    name="right"
                />
            )}
        </div>
    );
};

Cell.Group = Group;

export default Cell;
