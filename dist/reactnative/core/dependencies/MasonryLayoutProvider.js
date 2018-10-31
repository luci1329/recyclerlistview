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
var MasonryLayoutManager_1 = require("../layoutmanager/MasonryLayoutManager");
var LayoutProvider_1 = require("./LayoutProvider");
var MasonryLayoutProvider = /** @class */ (function (_super) {
    __extends(MasonryLayoutProvider, _super);
    function MasonryLayoutProvider(numberOfColumns, getLayoutTypeForIndex, setLayoutForType) {
        var _this = _super.call(this, getLayoutTypeForIndex, setLayoutForType) || this;
        _this.numberOfColumns = 0;
        _this.numberOfColumns = numberOfColumns;
        return _this;
    }
    // @ts-ignore
    MasonryLayoutProvider.prototype.newLayoutManager = function (renderWindowSize, cachedLayouts) {
        // @ts-ignore
        this._lastLayoutManager = new MasonryLayoutManager_1.MasonryLayoutManager(this.numberOfColumns, this, renderWindowSize, cachedLayouts);
        // @ts-ignore
        return this._lastLayoutManager;
    };
    return MasonryLayoutProvider;
}(LayoutProvider_1.LayoutProvider));
exports.MasonryLayoutProvider = MasonryLayoutProvider;
//# sourceMappingURL=MasonryLayoutProvider.js.map