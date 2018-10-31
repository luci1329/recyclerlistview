import CustomError from "../exceptions/CustomError";
import {LayoutManager, Layout, Point} from "./LayoutManager";
import {LayoutProvider, Dimension} from "../dependencies/LayoutProvider";

export const ViewTypes = {
    HEADER: 0,
    ITEM: 1,
};

export class MasonryLayoutManager extends LayoutManager {
    public _columnCount: number;
    private _layoutProvider: LayoutProvider;
    private _totalHeight: number;
    private _window: Dimension;
    private _totalWidth: number;
    private _layouts: Layout[];

    constructor(
        columnCount: number,
        layoutProvider: LayoutProvider,
        dimensions: Dimension,
        cachedLayouts?: Layout[],
    ) {
        super();
        this._columnCount = columnCount;
        this._layoutProvider = layoutProvider;
        this._window = dimensions;
        this._totalHeight = 0;
        this._totalWidth = 0;
        this._layouts = cachedLayouts ? cachedLayouts : [];
    }

    public getContentDimension(): Dimension {
        return {height: this._totalHeight, width: this._totalWidth};
    }

    public getLayouts(): Layout[] {
        return this._layouts;
    }

    public getOffsetForIndex(index: number): Point {
        if (this._layouts.length > index) {
            return {x: this._layouts[index].x, y: this._layouts[index].y};
        }
        throw new CustomError({
            message: `No layout available for index: ${ index }`,
            type: "LayoutUnavailableException",
        });
    }

    public overrideLayout(index: number, dim: Dimension): void {
        const layout = this._layouts[index];
        if (layout) {
            layout.isOverridden = true;
            layout.width = dim.width;
            layout.height = dim.height;
        }
    }

    public relayoutFromIndex(startIndex: number, itemCount: number): void {
        startIndex = this._locateFirstNeighbourIndex(startIndex);
        let startX = 0;
        let startY = 0;

        const columnHeights: number[] = [];

        for (let idx = 0; idx < this._columnCount; idx++) {
            columnHeights[idx] = 0;
        }

        const shortestColumnIndex = (cols: number[]) => cols.reduce((acc, val, idx, arr) => (val < arr[acc] ? idx : acc), 0);
        const longestColumnIndex = (cols: number[]) => cols.reduce((acc, val, idx, arr) => (val > arr[acc] ? idx : acc), 0);

        const oldItemCount = this._layouts.length;

        const itemDim = {height: 0, width: 0};
        let itemRect = null;

        let oldLayout = null;

        for (let i = 0; i < itemCount; i += 1) { // Figure out start index for smaller range updates
            oldLayout = this._layouts[i];

            const type = this._layoutProvider.getLayoutTypeForIndex(i);

            if (oldLayout && oldLayout.isOverridden) {
                itemDim.height = oldLayout.height;
                itemDim.width = oldLayout.width;
            } else {
                this._layoutProvider.setComputedLayout(type, itemDim, i);
            }

            this.setMaxBounds(itemDim);

            if (type === ViewTypes.HEADER) {
                startX = 0;
                startY = 0;
            } else {
                const columnIndex = shortestColumnIndex(columnHeights);
                startX = itemDim.width * columnIndex;
                startY = columnHeights[shortestColumnIndex(columnHeights)];
            }

            if (i > oldItemCount - 1) {
                if (type === ViewTypes.HEADER) {
                    for (let idx = 0; idx < this._columnCount; idx++) {
                        columnHeights[idx] += itemDim.height;
                    }
                } else {
                    columnHeights[shortestColumnIndex(columnHeights)] += itemDim.height;
                }

                // @ts-ignore
                this._layouts.push({x: startX, y: startY, height: itemDim.height, width: itemDim.width});
            } else {
                itemRect = this._layouts[i];
                itemRect.x = startX;
                itemRect.y = startY;
                itemRect.width = itemDim.width;
                itemRect.height = itemDim.height;

                if (type === ViewTypes.HEADER) {
                    for (let idx = 0; idx < this._columnCount; idx++) {
                        columnHeights[idx] += itemDim.height;
                    }
                } else {
                    columnHeights[startX / itemDim.width] += itemDim.height;
                }
            }

            this._totalHeight = columnHeights[longestColumnIndex(columnHeights)];
        }

        if (oldItemCount > itemCount) {
            this._layouts.splice(itemCount, oldItemCount - itemCount);
        }
    }

    public _locateFirstNeighbourIndex(startIndex: number): number {
        if (startIndex === 0) {
            return 0;
        }
        let i = startIndex - 1;
        for (; i >= 0; i--) {
            if (this._layouts[i].x === 0) {
                break;
            }
        }
        return i;
    }

    private setMaxBounds(itemDim: Dimension): void {
        itemDim.width = Math.min(this._window.width, itemDim.width);
    }
}
