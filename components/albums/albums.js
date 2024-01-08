import { defineComponent } from "@vue-mini/wechat";

// components/albums/albums.js
defineComponent({
    properties: {
        data: {
            type: Object,
            value: {}
        }
    },

    setup(props, { triggerEvent }) {
        function onActionTap(e) {
            const { dataset: { type } } = e.currentTarget
            triggerEvent('action', { type, event: e, data: props.data }, {})
        }

        return {
            onActionTap
        }
    }
})