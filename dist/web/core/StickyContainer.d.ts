/**
 * Created by ananya.chandra on 14/09/18.
 */
import * as React from "react";
import { RecyclerListViewProps } from "./RecyclerListView";
export interface StickyContainerProps {
    children: RecyclerChild;
    stickyHeaderIndices: number[];
    stickyFooterIndices: number[];
}
export interface StickyContainerState {
    topVisible: boolean;
}
export interface RecyclerChild extends React.ReactElement<RecyclerListViewProps> {
    ref: (recyclerRef: any) => {};
    props: RecyclerListViewProps;
}
export default class StickyContainer<P extends StickyContainerProps, S extends StickyContainerState> extends React.Component<P, S> {
    static propTypes: {};
    private _recyclerRef;
    private _stickyHeaderRef;
    private _stickyFooterRef;
    constructor(props: P, context?: any);
    render(): JSX.Element;
    private _getRecyclerRef;
    private _onVisibleIndicesChanged;
    private _onScroll;
    private _assertChildType;
    private _isChildRecyclerInstance;
}
