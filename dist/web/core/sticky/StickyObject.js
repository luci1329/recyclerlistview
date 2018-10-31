"use strict";
/**
 * Created by ananya.chandra on 20/09/18.
 */
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
var React = require("react");
var react_native_1 = require("react-native");
var StickyType;
(function (StickyType) {
    StickyType[StickyType["HEADER"] = 0] = "HEADER";
    StickyType[StickyType["FOOTER"] = 1] = "FOOTER";
})(StickyType = exports.StickyType || (exports.StickyType = {}));
var StickyObject = /** @class */ (function (_super) {
    __extends(StickyObject, _super);
    function StickyObject(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.stickyType = StickyType.HEADER;
        _this.stickyTypeMultiplier = 1;
        _this.initialVisibility = false;
        _this.currentIndex = 0;
        _this.currentStickyIndex = 0;
        _this._scrollableHeight = null;
        _this._scrollableWidth = null;
        _this._stickyViewOffset = new react_native_1.Animated.Value(0);
        _this._stickyData = null;
        _this._previousStickyIndex = 0;
        _this._nextStickyIndex = 0;
        _this._firstCompute = true;
        _this._visibleIndices = {};
        _this._smallestVisibleIndexOnLoad = 0;
        _this._largestVisibleIndexOnLoad = 0;
        _this._recyclerRef = null;
        _this._rowRenderer = null;
        _this.state = {
            visible: _this.initialVisibility,
        };
        return _this;
    }
    StickyObject.prototype.render = function () {
        return (React.createElement(react_native_1.Animated.View, { style: [
                { position: "absolute", width: this._scrollableWidth, transform: [{ translateY: this._stickyViewOffset }] },
                this.containerPosition,
            ] }, this.state.visible && this._rowRenderer ?
            this._rowRenderer("", this._stickyData, this.currentStickyIndex)
            : null));
    };
    StickyObject.prototype.onVisibleIndicesChanged = function (all, now, notNow, recyclerRef) {
        if (this._firstCompute) {
            this._setVisibleIndices(all, true);
            this._setSmallestAndLargestVisibleIndices(all);
            this.initStickyParams();
            this.isInitiallyVisible(this._visibleIndices, this.props.stickyIndices, this.currentStickyIndex, this._smallestVisibleIndexOnLoad, this._largestVisibleIndexOnLoad);
            this._initParams(recyclerRef);
            if (this.initialVisibility) {
                this._stickyViewVisible(true);
            }
            this._firstCompute = false;
        }
        else {
            this._setVisibleIndices(now, true);
            this._setVisibleIndices(notNow, false);
            if (this._visibleIndices[this.currentStickyIndex]) {
                this._stickyViewVisible(!this._visibleIndices[this.currentStickyIndex - this.stickyTypeMultiplier]);
            }
        }
    };
    StickyObject.prototype.onScroll = function (offsetY) {
        if (this._recyclerRef) {
            this._computeLayouts(this._recyclerRef);
            if (this._previousStickyIndex) {
                var scrollY_1 = this.getScrollY(offsetY, this._scrollableHeight);
                if (this._previousHeight && this._currentYd && scrollY_1 && scrollY_1 < this._currentYd) {
                    if (scrollY_1 > this._currentYd - this._previousHeight) {
                        this.currentIndex -= this.stickyTypeMultiplier;
                        var translate = (scrollY_1 - this._currentYd + this._previousHeight) * (-1 * this.stickyTypeMultiplier);
                        this._stickyViewOffset.setValue(translate);
                        this._computeLayouts(this._recyclerRef);
                        this._stickyViewVisible(true);
                    }
                }
            }
            if (this._nextStickyIndex) {
                var scrollY_2 = this.getScrollY(offsetY, this._scrollableHeight);
                if (this._currentHeight && this._nextYd && scrollY_2 && scrollY_2 + this._currentHeight > this._nextYd) {
                    if (scrollY_2 <= this._nextYd) {
                        var translate = (scrollY_2 - this._nextYd + this._currentHeight) * (-1 * this.stickyTypeMultiplier);
                        this._stickyViewOffset.setValue(translate);
                    }
                    else if (scrollY_2 > this._nextYd) {
                        this.currentIndex += this.stickyTypeMultiplier;
                        this._stickyViewOffset.setValue(0);
                        this._computeLayouts(this._recyclerRef);
                        this._stickyViewVisible(true);
                    }
                }
                else {
                    this._stickyViewOffset.setValue(0);
                }
            }
        }
    };
    StickyObject.prototype._stickyViewVisible = function (_visible) {
        this.setState({
            visible: _visible,
        });
    };
    StickyObject.prototype._initParams = function (recyclerRef) {
        if (recyclerRef) {
            this._recyclerRef = recyclerRef;
            this._rowRenderer = recyclerRef.props.rowRenderer;
            var dimension = recyclerRef ? recyclerRef.getRenderedSize() : null;
            if (dimension) {
                this._scrollableHeight = dimension.height;
                this._scrollableWidth = dimension.width;
            }
            this._computeLayouts(recyclerRef);
        }
    };
    StickyObject.prototype._computeLayouts = function (recyclerRef) {
        if (recyclerRef) {
            this.currentStickyIndex = this.props.stickyIndices[this.currentIndex];
            this._stickyData = recyclerRef && recyclerRef.props.dataProvider ?
                recyclerRef.props.dataProvider.getDataForIndex(this.currentStickyIndex)
                : null;
            this._previousStickyIndex = this.props.stickyIndices[this.currentIndex - this.stickyTypeMultiplier];
            this._nextStickyIndex = this.props.stickyIndices[this.currentIndex + this.stickyTypeMultiplier];
            if (this.currentStickyIndex) {
                this._currentLayout = recyclerRef.getLayout(this.currentStickyIndex);
                this._currentY = this._currentLayout ? this._currentLayout.y : undefined;
                this._currentHeight = this._currentLayout ? this._currentLayout.height : undefined;
                this._currentYd = this._currentY && this._currentHeight ? this.getCurrentYd(this._currentY, this._currentHeight) : undefined;
            }
            if (this._previousStickyIndex) {
                this._previousLayout = recyclerRef.getLayout(this._previousStickyIndex);
                this._previousHeight = this._previousLayout ? this._previousLayout.height : undefined;
            }
            if (this._nextStickyIndex) {
                this._nextLayout = recyclerRef.getLayout(this._nextStickyIndex);
                this._nextY = this._nextLayout ? this._nextLayout.y : undefined;
                this._nextHeight = this._nextLayout ? this._nextLayout.height : undefined;
                this._nextYd = this._nextY && this._nextHeight ? this.getNextYd(this._nextY, this._nextHeight) : undefined;
            }
        }
    };
    StickyObject.prototype._setVisibleIndices = function (indicesArray, setValue) {
        for (var _i = 0, indicesArray_1 = indicesArray; _i < indicesArray_1.length; _i++) {
            var index = indicesArray_1[_i];
            this._visibleIndices[index] = setValue;
        }
    };
    StickyObject.prototype._setSmallestAndLargestVisibleIndices = function (indicesArray) {
        var tempLargestIndex = indicesArray[0];
        var tempSmallestIndex = indicesArray[0];
        for (var _i = 0, indicesArray_2 = indicesArray; _i < indicesArray_2.length; _i++) {
            var index = indicesArray_2[_i];
            if (index < tempSmallestIndex) {
                tempSmallestIndex = index;
            }
            if (index > tempLargestIndex) {
                tempLargestIndex = index;
            }
        }
        this._smallestVisibleIndexOnLoad = tempSmallestIndex;
        this._largestVisibleIndexOnLoad = tempLargestIndex;
    };
    return StickyObject;
}(React.Component));
exports.default = StickyObject;
//# sourceMappingURL=StickyObject.js.map