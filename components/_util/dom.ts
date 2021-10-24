import { easeInOutCubic } from './easings';
import raf from './raf';

export function canUseDom() {
    return typeof window !== 'undefined';
}

export function isWindow(obj: any) {
    return obj !== null && obj !== undefined && obj === obj.window;
}

export function getScroll(
    target: HTMLElement | Window | Document | null,
    top: boolean
): number {
    if (typeof window === 'undefined') {
        return 0;
    }
    const method = top ? 'scrollTop' : 'scrollLeft';
    let result = 0;
    if (isWindow(target)) {
        result = (target as Window)[top ? 'pageYOffset' : 'pageXOffset'];
    } else if (target instanceof Document) {
        result = target.documentElement[method];
    } else if (target) {
        result = (target as HTMLElement)[method];
    }
    if (target && !isWindow(target) && typeof result !== 'number') {
        result = ((target as HTMLElement).ownerDocument || (target as Document)).documentElement?.[
            method
        ];
    }
    return result;
}

interface ScrollToOptions {
    /** Scroll container, default as window */
    getContainer?: () => HTMLElement | Window | Document;
    /** Scroll end callback */
    callback?: () => any;
    /** Animation duration, default as 450 */
    duration?: number;
}

export function scrollTo(y: number, options: ScrollToOptions = {}) {
    const { getContainer = () => window, callback, duration = 450 } = options;
    const container = getContainer();
    const scrollTop = getScroll(container, true);
    const startTime = Date.now();

    const frameFunc = () => {
        const timestamp = Date.now();
        const time = timestamp - startTime;
        const nextScrollTop = easeInOutCubic(time > duration ? duration : time, scrollTop, y, duration);
        if (isWindow(container)) {
            (container as Window).scrollTo(window.pageXOffset, nextScrollTop);
        } else if (container instanceof HTMLDocument || container.constructor.name === 'HTMLDocument') {
            (container as HTMLDocument).documentElement.scrollTop = nextScrollTop;
        } else {
            (container as HTMLElement).scrollTop = nextScrollTop;
        }
        if (time < duration) {
            raf(frameFunc);
        } else if (typeof callback === 'function') {
            callback();
        }
    };
    raf(frameFunc);
}
