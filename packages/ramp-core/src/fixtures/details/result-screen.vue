<template>
    <panel-screen :panel="panel">
        <template #header>
            {{ $t('details.title') }}
        </template>
        <template #controls>
            <minimize @click="panel.minimize()"></minimize>
            <back @click="panel.show('details-screen-layers')"></back>
            <close @click="panel.close()"></close>
        </template>
        <template #content>
            <div v-if="identifyResult.items.length > 0">
                <div
                    class="flex px-10 py-10 text-md hover:bg-gray-200 cursor-pointer"
                    v-for="(item, idx) in identifyResult.items"
                    :key="idx"
                    @click="openResult(idx)"
                    v-focus-item
                    v-truncate
                >
                    <span v-html="icon[idx]" class="flex-none symbologyIcon">
                        {{ itemIcon(item.data, idx) }}
                    </span>
                    <span class="flex-initial py-5 px-10" v-truncate>
                        {{
                            item.data[nameField] ||
                                'Identify Result ' + (idx + 1)
                        }}
                    </span>
                </div>
            </div>
            <div v-else>{{ $t('details.results.empty') }}</div>
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
export default class DetailsResultScreenV extends Vue {
    @Prop() panel!: PanelInstance;
    @Prop() resultIndex!: number;

    @Get(DetailsStore.payload) payload!: IdentifyResult[];
    @Get('layer/getLayerByUid') getLayerByUid!: (
        uid: string
    ) => LayerInstance | undefined;

    icon: string[] = [];

    /**
     * Switches the panel screen to display the data for a given result. Provides the currently selected layer index and the currently selected feature index as props.
     */
    openResult(itemIndex: number) {
        this.panel.show({
            screen: 'details-screen-item',
            props: { resultIndex: this.resultIndex, itemIndex: itemIndex }
        });
    }

    /**
     * Updates the value of icon[idx] with the svg string of the item.
     *
     * @param {any} data data of item in identifyResult.items
     * @param {number} idx index of item in identifyResult.items
     */
    itemIcon(data: any, idx: number) {
        const uid = this.identifyResult.uid;
        const layer: LayerInstance | undefined = this.getLayerByUid(uid);
        if (layer === undefined) {
            console.warn(
                `could not find layer for uid ${uid} during icon lookup`
            );
            return;
        }
        const oidField = layer.getOidField(uid);
        layer.getIcon(data[oidField], uid).then(value => {
            if (this.icon[idx] !== value) this.$set(this.icon, idx, value);
        });
    }

    /**
     * Returns the identify information for the layer specified by resultIndex.
     */
    get identifyResult() {
        return this.payload[this.resultIndex];
    }

    /**
     * Returns the name field for the layer specified by resultIndex.
     */
    get nameField() {
        const layerInfo = this.payload[this.resultIndex];
        const uid = layerInfo?.uid;
        const layer: LayerInstance | undefined = this.getLayerByUid(uid);
        return layer?.getNameField(uid);
    }
}
</script>

<style lang="scss"></style>
