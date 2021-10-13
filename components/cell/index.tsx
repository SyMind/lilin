import { useMemo, useContext, useCallback, FC, CSSProperties } from 'react';
import classNames from 'classnames';
import { ConfigContext } from '../config-provider';
import Icon from '../icon';
import {isNumeric} from '../_util/strings';
import Group from './cell-group';

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
    children,
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
        borderRadius: isNumeric(roundRadius) ? `${roundRadius}px` : undefined
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

    const kids = useMemo(() => {
        if (children) {
            return children;
        }

        return (
            <>
                {!!(title || subTitle || icon) && (
                    <div
                        key='main'
                        className={classNames(`${prefixCls}--title`, {
                            [`${prefixCls}--icon`]: icon
                        })}
                    >
                        {!!icon && <Icon className={`${prefixCls}--title-icon`} name={icon} />}
                        {
                            subTitle
                                ? (
                                    <>
                                        <div className={`${prefixCls}--title`}>{title}</div>
                                        <div className={`${prefixCls}--title-desc`}>{subTitle}</div>
                                    </>
                                )
                                : title
                        }
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
            </>
        );
    }, [children, desc, descTextAlign, icon, isLink, prefixCls, subTitle, title, to]);

    return (
        <div
            className={classes}
            style={style}
            onClick={handleClick}
        >
            {kids}
        </div>
    );
};

Cell.Group = Group;

export default Cell;
