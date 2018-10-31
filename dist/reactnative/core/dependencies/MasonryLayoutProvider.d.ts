import { Layout, LayoutManager } from "../layoutmanager/LayoutManager";
import { Dimension, LayoutProvider } from "./LayoutProvider";
export declare class MasonryLayoutProvider extends LayoutProvider {
    private numberOfColumns;
    constructor(numberOfColumns: number, getLayoutTypeForIndex: (index: number) => string | number, setLayoutForType: (type: string | number, dim: Dimension, index: number) => void);
    newLayoutManager(renderWindowSize: Dimension, cachedLayouts?: Layout[]): LayoutManager;
}
