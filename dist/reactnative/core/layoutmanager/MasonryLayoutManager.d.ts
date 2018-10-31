import { LayoutManager, Layout, Point } from "./LayoutManager";
import { LayoutProvider, Dimension } from "../dependencies/LayoutProvider";
export declare const ViewTypes: {
    HEADER: number;
    ITEM: number;
};
export declare class MasonryLayoutManager extends LayoutManager {
    _columnCount: number;
    private _layoutProvider;
    private _totalHeight;
    private _window;
    private _totalWidth;
    private _layouts;
    constructor(columnCount: number, layoutProvider: LayoutProvider, dimensions: Dimension, cachedLayouts?: Layout[]);
    getContentDimension(): Dimension;
    getLayouts(): Layout[];
    getOffsetForIndex(index: number): Point;
    overrideLayout(index: number, dim: Dimension): void;
    relayoutFromIndex(startIndex: number, itemCount: number): void;
    _locateFirstNeighbourIndex(startIndex: number): number;
    private setMaxBounds;
}
