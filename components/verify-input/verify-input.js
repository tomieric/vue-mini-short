import { defineComponent, ref } from "@vue-mini/wechat";

// components/verify-input/verify-input.js
defineComponent({
    properties: {
        codeLength: {
            type: Number,
            value: 4
        }
    },

    setup(props, { triggerEvent }) {
        const focusIndex = ref(0)
        const codes = ref(Array.from({ length: props.codeLength }).fill(''))

        function onInputNumber(e) {
            const { dataset } = e.currentTarget
            const { value } = e.detail
            codes.value[dataset.index] = value
            if (value !== '' && dataset.index < codes.value.length - 1) {
                focusIndex.value = 1 + dataset.index
            } else if (codes.value.every(v => v !== '')) {
                triggerEvent('done', codes.value)
            }
        }

        return {
            codes,
            focusIndex,
            onInputNumber
        }
    }
})