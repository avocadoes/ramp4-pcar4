<template>
    <div class="ramp-app animation-enabled" :lang="$i18n.locale">
        <shell></shell>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

import Shell from '@/components/shell.vue';

import ro from '@/scripts/resize-observer.js';

import { FocusList, FocusItem } from '@/directives/focus-list';
Vue.directive('focus-list', FocusList);
Vue.directive('focus-item', FocusItem);

import { Truncate } from '@/directives/truncate/truncate';
Vue.directive('truncate', Truncate);

//FORMS
import VueFormulate from '@braid/vue-formulate';
Vue.use(VueFormulate);

//TOOLTIPS
//@ts-ignore
import VueTippy, { TippyComponent } from 'vue-tippy';
Vue.use(VueTippy, {
    aria: 'labelledby',
    a11y: false,
    theme: 'ramp',
    trigger: 'mouseenter manual focus'
});
Vue.component('tippy', TippyComponent);

@Component({
    components: {
        Shell
    }
})
export default class App extends Vue {
    mounted() {
        // let ResizeObserver observe the app div
        // it applies 'xs' 'sm' 'md' and 'lg' classes to the div depending on the size
        ro.observe(this.$el);
    }
}
</script>

<style lang="scss">
@use 'directives/focus-list/focus-list';
.ramp-app {
    @include focus-list.default-focused-styling;
    height: 100vh;
}
.symbologyIcon {
    @apply bg-white inline-flex justify-center items-center overflow-hidden;
    box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
        0px 1px 1px 0px rgba(0, 0, 0, 0.14),
        0px 2px 1px -1px rgba(0, 0, 0, 0.12);
}
</style>
