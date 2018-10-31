"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var CustomError_1 = require("../exceptions/CustomError");
var LayoutManager_1 = require("./LayoutManager");
exports.ViewTypes = {
    HEADER: 0,
    ITEM: 1,
};
var MasonryLayoutManager = /** @class */ (function (_super) {
    __extends(MasonryLayoutManager, _super);
    function MasonryLayoutManager(columnCount, layoutProvider, dimensions, cachedLayouts) {
        var _this = _super.call(this) || this;
        _this._columnCount = columnCount;
        _this._layoutProvider = layoutProvider;
        _this._window = dimensions;
        _this._totalHeight = 0;
        _this._totalWidth = 0;
        _this._layouts = cachedLayouts ? cachedLayouts : [];
        return _this;
    }
    MasonryLayoutManager.prototype.getContentDimension = function () {
        return { height: this._totalHeight, width: this._totalWidth };
    };
    MasonryLayoutManager.prototype.getLayouts = function () {
        return this._layouts;
    };
    MasonryLayoutManager.prototype.getOffsetForIndex = function (index) {
        if (this._layouts.length > index) {
            return { x: this._layouts[index].x, y: this._layouts[index].y };
        }
        throw new CustomError_1.default({
            message: "No layout available for index: " + index,
            type: "LayoutUnavailableException",
        });
    };
    MasonryLayoutManager.prototype.overrideLayout = function (index, dim) {
        var layout = this._layouts[index];
        if (layout) {
            layout.isOverridden = true;
            layout.width = dim.width;
            layout.height = dim.height;
        }
    };
    MasonryLayoutManager.prototype.relayoutFromIndex = function (startIndex, itemCount) {
        startIndex = this._locateFirstNeighbourIndex(startIndex);
        var startX = 0;
        var startY = 0;
        var columnHeights = [];
        for (var idx = 0; idx < this._columnCount; idx++) {
            columnHeights[idx] = 0;
        }
        var shortestColumnIndex = function (cols) { return cols.reduce(function (acc, val, idx, arr) { return (val < arr[acc] ? idx : acc); }, 0); };
        var longestColumnIndex = function (cols) { return cols.reduce(function (acc, val, idx, arr) { return (val > arr[acc] ? idx : acc); }, 0); };
        var oldItemCount = this._layouts.length;
        var itemDim = { height: 0, width: 0 };
        var itemRect = null;
        var oldLayout = null;
        for (var i = 0; i < itemCount; i += 1) { // Figure out start index for smaller range updates
            oldLayout = this._layouts[i];
            var type = this._layoutProvider.getLayoutTypeForIndex(i);
            if (oldLayout && oldLayout.isOverridden) {
                itemDim.height = oldLayout.height;
                itemDim.width = oldLayout.width;
            }
            else {
                this._layoutProvider.setComputedLayout(type, itemDim, i);
            }
            this.setMaxBounds(itemDim);
            if (type === exports.ViewTypes.HEADER) {
                startX = 0;
                startY = 0;
            }
            else {
                var columnIndex = shortestColumnIndex(columnHeights);
                startX = itemDim.width * columnIndex;
                startY = columnHeights[shortestColumnIndex(columnHeights)];
            }
            if (i > oldItemCount - 1) {
                if (type === exports.ViewTypes.HEADER) {
                    for (var idx = 0; idx < this._columnCount; idx++) {
                        columnHeights[idx] += itemDim.height;
                    }
                }
                else {
                    columnHeights[shortestColumnIndex(columnHeights)] += itemDim.height;
                }
                // @ts-ignore
                this._layouts.push({ x: startX, y: startY, height: itemDim.height, width: itemDim.width });
            }
            else {
                itemRect = this._layouts[i];
                itemRect.x = startX;
                itemRect.y = startY;
                itemRect.width = itemDim.width;
                itemRect.height = itemDim.height;
                if (type === exports.ViewTypes.HEADER) {
                    for (var idx = 0; idx < this._columnCount; idx++) {
                        columnHeights[idx] += itemDim.height;
                    }
                }
                else {
                    columnHeights[startX / itemDim.width] += itemDim.height;
                }
            }
            this._totalHeight = columnHeights[longestColumnIndex(columnHeights)];
        }
        if (oldItemCount > itemCount) {
            this._layouts.splice(itemCount, oldItemCount - itemCount);
        }
    };
    MasonryLayoutManager.prototype._locateFirstNeighbourIndex = function (startIndex) {
        if (startIndex === 0) {
            return 0;
        }
        var i = startIndex - 1;
        for (; i >= 0; i--) {
            if (this._layouts[i].x === 0) {
                break;
            }
        }
        return i;
    };
    MasonryLayoutManager.prototype.setMaxBounds = function (itemDim) {
        itemDim.width = Math.min(this._window.width, itemDim.width);
    };
    return MasonryLayoutManager;
}(LayoutManager_1.LayoutManager));
exports.MasonryLayoutManager = MasonryLayoutManager;
//# sourceMappingURL=MasonryLayoutManager.js.map