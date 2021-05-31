// convenience file. applies our custom class naming (so we know we have Esri classes, avoids collisions with similarly named Ramp classes)
// and saves us from having to type out the esri library path in every file

// as a general rule, only files in the api/geo subfolder should import from this module. If anything outside needs ESRI classes directly,
// we should consider an alternate approach (some exceptions might arise).

// sorted by library path
import EsriBasemap from '@arcgis/core/Basemap';
import EsriColour from '@arcgis/core/Color';
import EsriExtent from '@arcgis/core/geometry/Extent';
import EsriMultipoint from '@arcgis/core/geometry/Multipoint';
import EsriPoint from '@arcgis/core/geometry/Point';
import EsriPolygon from '@arcgis/core/geometry/Polygon';
import EsriPolyline from '@arcgis/core/geometry/Polyline';
import EsriSpatialReference from '@arcgis/core/geometry/SpatialReference';
import * as EsriGeometryJsonUtils from '@arcgis/core/geometry/support/jsonUtils';
import EsriGraphic from '@arcgis/core/Graphic';
import EsriFeatureLayer from '@arcgis/core/layers/FeatureLayer';
import EsriGraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import EsriImageryLayer from '@arcgis/core/layers/ImageryLayer';
import EsriMapImageLayer from '@arcgis/core/layers/MapImageLayer';
import EsriTileLayer from '@arcgis/core/layers/TileLayer';
import EsriWMSLayer from '@arcgis/core/layers/WMSLayer';
import EsriField from '@arcgis/core/layers/support/Field';
import EsriImageParameters from '@arcgis/core/layers/support/ImageParameters';
import EsriLOD from '@arcgis/core/layers/support/LOD';
import EsriSublayer from '@arcgis/core/layers/support/Sublayer';
import EsriWMSSublayer from '@arcgis/core/layers/support/WMSSublayer';
import EsriMap from '@arcgis/core/Map';
import EsriClassBreaksRenderer from '@arcgis/core/renderers/ClassBreaksRenderer';
import EsriRenderer from '@arcgis/core/renderers/Renderer';
import EsriSimpleRenderer from '@arcgis/core/renderers/SimpleRenderer';
import EsriUniqueValueRenderer from '@arcgis/core/renderers/UniqueValueRenderer';
import EsriClassBreakInfo from '@arcgis/core/renderers/support/ClassBreakInfo';
import * as EsriRendererUtils from '@arcgis/core/renderers/support/jsonUtils';
import EsriUniqueValueInfo from '@arcgis/core/renderers/support/UniqueValueInfo';
import EsriRequest from '@arcgis/core/request';
import EsriPictureMarkerSymbol from '@arcgis/core/symbols/PictureMarkerSymbol';
import EsriSimpleFillSymbol from '@arcgis/core/symbols/SimpleFillSymbol';
import EsriSimpleLineSymbol from '@arcgis/core/symbols/SimpleLineSymbol';
import EsriSimpleMarkerSymbol from '@arcgis/core/symbols/SimpleMarkerSymbol';
import EsriSymbol from '@arcgis/core/symbols/Symbol';
import * as EsriSymbolJsonUtils from '@arcgis/core/symbols/support/jsonUtils';
import EsriGeometryService from '@arcgis/core/tasks/GeometryService';
import EsriIdentifyTask from '@arcgis/core/tasks/IdentifyTask';
import EsriPrintTask from '@arcgis/core/tasks/PrintTask';
import EsriQueryTask from '@arcgis/core/tasks/QueryTask';
import EsriIdentifyParameters from '@arcgis/core/tasks/support/IdentifyParameters';
import EsriPrintParameters from '@arcgis/core/tasks/support/PrintParameters';
import EsriPrintTemplate from '@arcgis/core/tasks/support/PrintTemplate';
import EsriProjectParameters from '@arcgis/core/tasks/support/ProjectParameters';
import EsriQuery from '@arcgis/core/tasks/support/Query';
import EsriFeatureFilter from '@arcgis/core/views/layers/support/FeatureFilter';
import EsriMapView from '@arcgis/core/views/MapView';
import EsriLayerView from '@arcgis/core/views/View';
import EsriFeatureLayerProperties from '@arcgis/core/layers/FeatureLayer';
import EsriBasemapGallery from '@arcgis/core/widgets/BasemapGallery';
import EsriScaleBar from '@arcgis/core/widgets/ScaleBar';

// sorted by name
export {
    EsriBasemap,
    EsriBasemapGallery,
    EsriClassBreakInfo,
    EsriClassBreaksRenderer,
    EsriColour,
    EsriExtent,
    EsriFeatureFilter,
    EsriFeatureLayer,
    EsriField,
    EsriGeometryJsonUtils,
    EsriGeometryService,
    EsriGraphic,
    EsriGraphicsLayer,
    EsriIdentifyParameters,
    EsriIdentifyTask,
    EsriImageParameters,
    EsriImageryLayer,
    EsriLOD,
    EsriMap,
    EsriMapImageLayer,
    EsriMapView,
    EsriLayerView,
    EsriFeatureLayerProperties,
    EsriMultipoint,
    EsriPictureMarkerSymbol,
    EsriPrintParameters,
    EsriPrintTask,
    EsriPrintTemplate,
    EsriProjectParameters,
    EsriPoint,
    EsriPolygon,
    EsriPolyline,
    EsriQuery,
    EsriQueryTask,
    EsriRenderer,
    EsriRendererUtils,
    EsriRequest,
    EsriScaleBar,
    EsriSimpleFillSymbol,
    EsriSimpleLineSymbol,
    EsriSimpleMarkerSymbol,
    EsriSimpleRenderer,
    EsriSpatialReference,
    EsriSymbol,
    EsriSublayer,
    EsriSymbolJsonUtils,
    EsriTileLayer,
    EsriUniqueValueInfo,
    EsriUniqueValueRenderer,
    EsriWMSLayer,
    EsriWMSSublayer
};
