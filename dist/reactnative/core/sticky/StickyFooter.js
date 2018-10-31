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
var StickyFooter = /** @class */ (function (_super) {
    __extends(StickyFooter, _super);
    function StickyFooter(props, context) {
        return _super.call(this, props, context) || this;
    }
    StickyFooter.prototype.initStickyParams = function () {
        this.stickyType = StickyObject_1.StickyType.FOOTER;
        this.stickyTypeMultiplier = -1;
        this.containerPosition = { bottom: 0 };
    };
    StickyFooter.prototype.isInitiallyVisible = function (visibleIndices, stickyIndices, currentIndice, smallestVisibleIndex, largestVisibleIndex) {
        if (largestVisibleIndex > stickyIndices[stickyIndices.length - 1]) {
            this.initialVisibility = false;
        }
        else {
            this.initialVisibility = true;
            var resolved = false;
            var i = stickyIndices.length - 1;
            var lastIndex = -1;
            for (i; i >= 0; i--) {
                var index = stickyIndices[i];
                if (largestVisibleIndex > index) {
                    this.currentIndex = i + 1;
                    this.currentStickyIndex = lastIndex;
                    resolved = true;
                    break;
                }
                lastIndex = index;
            }
            if (!resolved) {
                this.currentIndex = i + 1;
                this.currentStickyIndex = lastIndex;
            }
        }
    };
    StickyFooter.prototype.getNextYd = function (nextY, nextHeight) {
        return -1 * (nextY + nextHeight);
    };
    StickyFooter.prototype.getCurrentYd = function (currentY, currentHeight) {
        return -1 * (currentY + currentHeight);
    };
    StickyFooter.prototype.getScrollY = function (offsetY, scrollableHeight) {
        return scrollableHeight ? -1 * (offsetY + scrollableHeight) : null;
    };
    return StickyFooter;
}(StickyObject_1.default));
exports.default = StickyFooter;
//# sourceMappingURL=StickyFooter.js.map