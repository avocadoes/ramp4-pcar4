<template>
    <panel-screen>
        <template #header>
            {{ $t('details.title') }}
        </template>
        <template #controls>
            <minimize @click="panel.minimize()"></minimize>
            <close @click="panel.close()"></close>
        </template>
        <template #content>
            <div class="p-5">
                {{
                    $t('details.layers.found', {
                        numResults: payloadResults,
                        numLayers: payload.length
                    })
                }}
            </div>
            <div
                class="px-20 py-10 text-md flex hover:bg-gray-200 cursor-pointer"
                v-for="(item, idx) in payload"
                :key="idx"
                @click="openResult(idx)"
            >
                <div v-truncate>
                    {{ layerInfo(idx) || $t('details.layers.loading') }}
                </div>
                <div class="flex-auto"></div>
                <div class="px-5">{{ item.items.length }}</div>
            </div>
        </template>
    </panel-screen>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Get } from 'vuex-pathify';
import { DetailsStore } from './store';

import { LayerInstance, PanelInstance } from '@/api';
import { IdentifyResult } from '@/geo/api';

@Component({})
export default class DetailsLayersScreenV extends Vue {
    @Prop() panel!: PanelInstance;
    @Get(DetailsStore.payload) payload!: IdentifyResult[];
    @Get('layer/getLayerByUid') getLayerByUid!: (
        uid: string
    ) => LayerInstance | undefined;
    @Get('layer/layers') layers!: LayerInstance[];

    /**
     * Switches the panel screen to display the data for a given result.
     */
    openResult(index: number) {
        if (
            this.getLayerByUid(this.payload[index].uid)!.layerType === 'ogcWms'
        ) {
            // skip results screen for wms layers
            this.panel.show({
                screen: 'details-screen-item',
                props: { resultIndex: index, layerType: 'ogcWms', itemIndex: 0 }
            });
        } else {
            this.panel.show({
                screen: 'details-screen-result',
                props: { resultIndex: index }
            });
        }
    }

    layerInfo(idx: number) {
        const layerInfo = this.payload[idx];

        // Check to see if there is a custom template defined for the selected layer.
        let item: LayerInstance | undefined = this.layers
            .map(layer => {
                let layerNode = layer.getLayerTree();

                if (!layerNode) return;

                // Determine if the selected UID is a child of this layer.
                if (layerNode.findChildByUid(layerInfo.uid) !== undefined) {
                    return layer;
                }
            })
            .filter(node => node !== undefined)[0];

        if (!item) return;

        return item.getName(layerInfo.uid);
    }

    /**
     * Calculates the total number of results received by identify.
     */
    get payloadResults(): number {
        return this.payload.map(r => r.items.length).reduce((a, b) => a + b, 0);
    }
}
</script>

<style lang="scss"></style>
