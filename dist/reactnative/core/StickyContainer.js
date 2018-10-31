"use strict";
/**
 * Created by ananya.chandra on 14/09/18.
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
var PropTypes = require("prop-types");
var react_native_1 = require("react-native");
var StickyHeader_1 = require("./sticky/StickyHeader");
var StickyFooter_1 = require("./sticky/StickyFooter");
var CustomError_1 = require("./exceptions/CustomError");
var RecyclerListViewExceptions_1 = require("./exceptions/RecyclerListViewExceptions");
var StickyContainer = /** @class */ (function (_super) {
    __extends(StickyContainer, _super);
    function StickyContainer(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this._recyclerRef = null;
        _this._stickyHeaderRef = null;
        _this._stickyFooterRef = null;
        _this._getRecyclerRef = function (recycler) {
            _this._recyclerRef = recycler;
            if (_this.props.children.ref) {
                if (typeof _this.props.children.ref === "function") {
                    (_this.props.children).ref(recycler);
                }
                else {
                    throw new CustomError_1.default(RecyclerListViewExceptions_1.default.refNotAsFunctionException);
                }
            }
        };
        _this._onVisibleIndicesChanged = _this._onVisibleIndicesChanged.bind(_this);
        _this._onScroll = _this._onScroll.bind(_this);
        _this.state = {
            topVisible: false,
        };
        return _this;
    }
    StickyContainer.prototype.render = function () {
        var _this = this;
        this._assertChildType();
        var recycler = React.cloneElement(this.props.children, {
            ref: this._getRecyclerRef,
            onVisibleIndicesChanged: this._onVisibleIndicesChanged,
            onScroll: this._onScroll,
        });
        return (React.createElement(react_native_1.View, { style: { flex: 1 } },
            recycler,
            this.props.stickyHeaderIndices ? (React.createElement(StickyHeader_1.default, { ref: function (stickyHeaderRef) {
                    _this._stickyHeaderRef = stickyHeaderRef;
                }, stickyIndices: this.props.stickyHeaderIndices })) : null,
            this.props.stickyFooterIndices ? (React.createElement(StickyFooter_1.default, { ref: function (stickyFooterRef) {
                    _this._stickyFooterRef = stickyFooterRef;
                }, stickyIndices: this.props.stickyFooterIndices })) : null));
    };
    StickyContainer.prototype._onVisibleIndicesChanged = function (all, now, notNow) {
        if (this.props.children && this.props.children.props && this.props.children.props.onVisibleIndicesChanged) {
            this.props.children.props.onVisibleIndicesChanged(all, now, notNow);
        }
        if (this._stickyHeaderRef) {
            this._stickyHeaderRef.onVisibleIndicesChanged(all, now, notNow, this._recyclerRef);
        }
        if (this._stickyFooterRef) {
            this._stickyFooterRef.onVisibleIndicesChanged(all, now, notNow, this._recyclerRef);
        }
    };
    StickyContainer.prototype._onScroll = function (rawEvent, offsetX, offsetY) {
        if (this.props.children && this.props.children.props.onScroll) {
            this.props.children.props.onScroll(rawEvent, offsetX, offsetY);
        }
        if (this._stickyHeaderRef) {
            this._stickyHeaderRef.onScroll(offsetY);
        }
        if (this._stickyFooterRef) {
            this._stickyFooterRef.onScroll(offsetY);
        }
    };
    StickyContainer.prototype._assertChildType = function () {
        if (React.Children.count(this.props.children) !== 1 || !this._isChildRecyclerInstance()) {
            throw new CustomError_1.default(RecyclerListViewExceptions_1.default.wrongStickyChildTypeException);
        }
    };
    StickyContainer.prototype._isChildRecyclerInstance = function () {
        return (this.props.children.props.dataProvider
            && this.props.children.props.rowRenderer
            && this.props.children.props.layoutProvider);
    };
    StickyContainer.propTypes = {};
    return StickyContainer;
}(React.Component));
exports.default = StickyContainer;
StickyContainer.propTypes = {
    // Mandatory to pass a single child of RecyclerListView or any of its children classes. Exception will be thrown otherwise.
    children: PropTypes.element.isRequired,
    // Provide an array of indices whose corresponding items need to be stuck to the top of the recyclerView once the items scroll off the top.
    // Every subsequent sticky index view will push the previous sticky view off the top to take its place.
    // Note: Array indices need to be in ascending sort order.
    stickyHeaderIndices: PropTypes.arrayOf(PropTypes.number),
    // Works same as sticky headers, but for views to be stuck at the bottom of the recyclerView.
    // Note: Array indices need to be in ascending sort order.
    stickyFooterIndices: PropTypes.arrayOf(PropTypes.number),
};
//# sourceMappingURL=StickyContainer.js.map