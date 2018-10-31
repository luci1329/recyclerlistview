/**
 * Created by ananya.chandra on 20/09/18.
 */
import StickyObject, { StickyObjectProps, StickyObjectState, VisibleIndices } from "./StickyObject";
export default class StickyHeader<P extends StickyObjectProps, S extends StickyObjectState> extends StickyObject<P, S> {
    constructor(props: P, context?: any);
    protected initStickyParams(): void;
    protected isInitiallyVisible(visibleIndices: VisibleIndices, stickyIndices: number[], currentIndice: number, smallestVisibleIndex: number, largestVisibleIndex: number): void;
    protected getNextYd(nextY: number, nextHeight: number): number;
    protected getCurrentYd(currentY: number, currentHeight: number): number;
    protected getScrollY(offsetY: number, scrollableHeight: number): number | null;
}
