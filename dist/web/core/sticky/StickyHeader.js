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
var StickyObject_1 = require("./StickyObject");
var StickyHeader = /** @class */ (function (_super) {
    __extends(StickyHeader, _super);
    function StickyHeader(props, context) {
        return _super.call(this, props, context) || this;
    }
    StickyHeader.prototype.initStickyParams = function () {
        this.stickyType = StickyObject_1.StickyType.HEADER;
        this.stickyTypeMultiplier = 1;
        this.containerPosition = { top: 0 };
    };
    StickyHeader.prototype.isInitiallyVisible = function (visibleIndices, stickyIndices, currentIndice, smallestVisibleIndex, largestVisibleIndex) {
        if (smallestVisibleIndex < stickyIndices[0]) {
            this.initialVisibility = false;
        }
        else {
            this.initialVisibility = true;
            var i = 0;
            var resolved = false;
            var lastIndex = -1;
            for (var _i = 0, stickyIndices_1 = stickyIndices; _i < stickyIndices_1.length; _i++) {
                var index = stickyIndices_1[_i];
                if (smallestVisibleIndex < index) {
                    this.currentIndex = i - 1;
                    this.currentStickyIndex = lastIndex;
                    resolved = true;
                    break;
                }
                i++;
                lastIndex = index;
            }
            if (!resolved) {
                this.currentIndex = i - 1;
                this.currentStickyIndex = lastIndex;
            }
        }
    };
    StickyHeader.prototype.getNextYd = function (nextY, nextHeight) {
        return nextY;
    };
    StickyHeader.prototype.getCurrentYd = function (currentY, currentHeight) {
        return currentY;
    };
    StickyHeader.prototype.getScrollY = function (offsetY, scrollableHeight) {
        return offsetY;
    };
    return StickyHeader;
}(StickyObject_1.default));
exports.default = StickyHeader;
//# sourceMappingURL=StickyHeader.js.map