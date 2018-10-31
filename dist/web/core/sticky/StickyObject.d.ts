/**
 * Created by ananya.chandra on 20/09/18.
 */
import * as React from "react";
import { StyleProp, ViewStyle } from "react-native";
import RecyclerListView, { RecyclerListViewProps, RecyclerListViewState } from "../RecyclerListView";
export declare enum StickyType {
    HEADER = 0,
    FOOTER = 1
}
export interface StickyObjectProps {
    stickyIndices: number[];
}
export interface StickyObjectState {
    visible: boolean;
}
export interface VisibleIndices {
    [key: number]: boolean;
}
export default abstract class StickyObject<P extends StickyObjectProps, S extends StickyObjectState> extends React.Component<P, S> {
    protected stickyType: StickyType;
    protected stickyTypeMultiplier: number;
    protected initialVisibility: boolean;
    protected containerPosition: StyleProp<ViewStyle>;
    protected currentIndex: number;
    protected currentStickyIndex: number;
    private _previousLayout;
    private _previousHeight;
    private _nextLayout;
    private _nextY;
    private _nextHeight;
    private _currentLayout;
    private _currentY;
    private _currentHeight;
    private _nextYd;
    private _currentYd;
    private _scrollableHeight;
    private _scrollableWidth;
    private _stickyViewOffset;
    private _stickyData;
    private _previousStickyIndex;
    private _nextStickyIndex;
    private _firstCompute;
    private _visibleIndices;
    private _smallestVisibleIndexOnLoad;
    private _largestVisibleIndexOnLoad;
    private _recyclerRef;
    private _rowRenderer;
    constructor(props: P, context?: any);
    render(): JSX.Element | null;
    onVisibleIndicesChanged(all: number[], now: number[], notNow: number[], recyclerRef: RecyclerListView<RecyclerListViewProps, RecyclerListViewState> | null): void;
    onScroll(offsetY: number): void;
    protected abstract initStickyParams(): void;
    protected abstract isInitiallyVisible(visibleIndices: VisibleIndices, stickyIndices: number[], currentIndice: number, smallestVisibleIndex: number, largestVisibleIndex: number): void;
    protected abstract getNextYd(_nextY: number, nextHeight: number): number;
    protected abstract getCurrentYd(currentY: number, currentHeight: number): number;
    protected abstract getScrollY(offsetY: number, scrollableHeight: number | null): number | null;
    private _stickyViewVisible;
    private _initParams;
    private _computeLayouts;
    private _setVisibleIndices;
    private _setSmallestAndLargestVisibleIndices;
}
