// test feature class
import { LayerState, LayerBase, TreeNode, ScaleSet, LegendSymbology, IdentifyParameters, IdentifyResultSet, LayerType, RampLayerConfig, DefPromise} from '../../../ramp-core/src/geo/api'
import { EsriFeatureLayer, EsriLayerView, EsriFeatureLayerProperties } from '../../../ramp-core/src/geo/esri'
import { InstanceAPI, GlobalEvents } from '../../../ramp-core/src/api';
import { Point } from '../../../ramp-core/src/geo/api';

class TestFeatureLayer implements LayerBase{    
    
    id: string;
    uid: string;
    name: string;
    point: Point;
    
    esriLayer: EsriFeatureLayer | undefined;
    //@ts-ignore
    esriView: EsriLayerView | undefined;

    supportsIdentify: boolean;
    state: LayerState;
    isFile: boolean;

    origRampConfig: RampLayerConfig;
    _layerType: string;
    $iApi: InstanceAPI;
    loadPromise: DefPromise;

    layerTree: TreeNode | undefined;

    constructor (rampConfig: RampLayerConfig, $iApi: InstanceAPI, point: Point) {
        this.$iApi = $iApi;
        this.id = rampConfig.id || '';
        this.uid = this.$iApi.geo.utils.shared.generateUUID();
        this.name = rampConfig.name || '';
        
        this.point = point;
        this.supportsIdentify = true;
        this._layerType = 'testFeature';
        this.origRampConfig = rampConfig;
        
        this.isFile = false;
        this.loadPromise = new DefPromise();
        this.state = LayerState.LOADING;
    }

    // LayerBase methods
    
    async initiate(): Promise<void> {
        this.esriLayer = new EsriFeatureLayer(
            // todo
            this.makeEsriLayerConfig(this.origRampConfig)
        );
        // await super.intiate();
        this.esriLayer.watch('visible', (newval: boolean) => {
            this.$iApi.event.emit(GlobalEvents.LAYER_VISIBILITYCHANGE, {
                visibility: newval,
                uid: this.uid
            });
        });

        this.esriLayer.watch('opacity', (newval: number) => {
            this.$iApi.event.emit(GlobalEvents.LAYER_OPACITYCHANGE, {
                opacity: newval,
                uid: this.uid
            });
        });

        this.esriLayer.watch('loadStatus', (newval: string) => {
            const statemap: any = {
                'not-loaded' : LayerState.LOADED,
                loading: LayerState.LOADING,
                loaded: LayerState.LOADED,
                failed: LayerState.ERROR
            };

            if (newval == 'loaded') {
                this.onLoad() //todo
            }
        })

        return Promise.resolve();
    }
    
    async terminate(): Promise<void> {
        return Promise.resolve();
    }

    makeEsriLayerConfig(
        rampLayerConfig: RampLayerConfig
    ): EsriFeatureLayerProperties {
        //@ts-ignore
        const esriConfig: EsriFeatureLayerProperties = {
            id: rampLayerConfig.id,
            url: rampLayerConfig.url,
            opacity: rampLayerConfig?.state?.opacity,
            visible: rampLayerConfig?.state?.visibility
        }
        if (typeof rampLayerConfig.refreshInterval !== 'undefined') {
            esriConfig.refreshInterval = rampLayerConfig.refreshInterval;
        }
        return esriConfig;
    }

    onLoad(): void {
        const loadPromises: Array<Promise<void>> = this.onLoadActions(); //todo
    }

    onLoadActions(): Array<Promise<void>> {
        if (!this.name) {
            this.name = this.esriLayer?.title || '';
        }

        this.layerTree = new TreeNode(-1, this.uid, this.name, false);

        const lookupPromise = this.$iApi.geo.utils.proj
            .checkProj((<any>this.esriLayer).spatialReference)
            .then((goodSR: boolean) => {
                if (goodSR) {
                    return Promise.resolve();
                } else {
                    this.updateState(LayerState.ERROR);
                    return Promise.reject();
                }
            });

        return [lookupPromise];
    }

    updateState(newState: LayerState): void {
        this.state = newState;
        this.$iApi.event.emit(GlobalEvents.LAYER_STATECHANGE, {
            state: newState,
            uid: this.uid
        });
    }
    
    isLayerLoaded(): Promise<void> {
        return this.loadPromise.getPromise();
    }
    
    isValidState(): boolean {
        return (
            this.state === LayerState.LOADED ||
            this.state === LayerState.REFRESH
        );
    }

    get layerType(): string {
        return this._layerType;
    }
    
    supportsFeatures(layerIdx: number | string | undefined): boolean {
        return true;
    }

    noLayerErr(): void {
        console.error(
            'Attempted to manipulate the layer before .intiate() finished'
        );
        console.trace();
    }

    getLayerTree(): TreeNode {
        if(this.layerTree) {
            return this.layerTree;
        } else {
            this.noLayerErr();
            return new TreeNode(
                0,
                'YOU DID AN ERROR',
                'Error, check your console pls'
            );
        }
    }
    
    getName(layerIdx: number | string | undefined): string {
        return this.name || '';
    }

    getVisibility(layerIdx: number | string | undefined): boolean {
        return true;
    }

    setVisibility(value: boolean, layerIdx: number | string | undefined): void {
        return;
    }

    getOpacity(layerIdx: number | string | undefined): number {
        return 0;
    }

    setOpacity(value: number, layerIdx: number | string | undefined): void {
        return;
    }

    async zoomToVisibleScale(layerIdx: number | string | undefined): Promise<void> {
        return Promise.resolve();
    }

    getScaleSet(layerIdx: number | string | undefined): ScaleSet {
        return;
    }

    isOffscale(layerIdx: number | string | undefined, testScale: number | undefined): boolean {
        return true;
    }

    getLegend(layerIdx: number | string | undefined): Array<LegendSymbology> {
        return;
    }

    identify(options: IdentifyParameters): IdentifyResultSet {
        return;
    }

    // TODO: attribute layer props, layer idx param (feature class?)
}

export default TestFeatureLayer;