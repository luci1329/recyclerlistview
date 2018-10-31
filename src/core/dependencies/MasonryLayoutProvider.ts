import { MasonryLayoutManager } from "../layoutmanager/MasonryLayoutManager";
import {Layout, LayoutManager } from "../layoutmanager/LayoutManager";
import {Dimension, LayoutProvider} from "./LayoutProvider";

export class MasonryLayoutProvider extends LayoutProvider {
    private numberOfColumns = 0;

    constructor( numberOfColumns: number, getLayoutTypeForIndex: ( index: number ) => string | number,
                 setLayoutForType: ( type: string | number, dim: Dimension, index: number ) => void ) {
        super(getLayoutTypeForIndex, setLayoutForType);
        this.numberOfColumns = numberOfColumns;
    }

    // @ts-ignore
    public newLayoutManager( renderWindowSize: Dimension, cachedLayouts?: Layout[] ): LayoutManager {
        // @ts-ignore
        this._lastLayoutManager = new MasonryLayoutManager( this.numberOfColumns, this, renderWindowSize, cachedLayouts );
        // @ts-ignore
        return this._lastLayoutManager;
    }
}
