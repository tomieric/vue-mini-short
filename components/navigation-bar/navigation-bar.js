import { defineComponent, onDetach, ref } from "@vue-mini/wechat";

// components/navigation-bar/navigation-bar.js
defineComponent({
    options: {
        multipleSlots: true
    },

    properties: {
        extClass: {
            type: String,
            value: ''
        },
        title: {
            type: String,
            value: ''
        },
        background: {
            type: String,
            value: ''
        },
        color: {
            type: String,
            value: ''
        },
        back: {
            type: Boolean,
            value: true
        },
        homeButton: {
            type: Boolean,
            value: false
        },
        loading: {
            type: Boolean,
            value: false
        },
        animated: {
            type: Boolean,
            value: true
        },
        show: {
            type: Boolean,
            value: true,
            observer: 'showChange'
        },
        delta: {
            type: Number,
            value: 1
        },
        showLeft: {
            type: Boolean,
            value: true
        }
    },

    setup(props, { triggerEvent }) {
        const displayStyle = ref('')
        const ios = ref(false)
        const leftWidth = ref('')
        const innerPaddingRight = ref('')
        const isAndriod = ref(false)
        const safeAreaTop = ref('')

        const rect = wx.getMenuButtonBoundingClientRect()

        wx.getSystemInfo({
            success: (res) => {
                const isDevtools = res.platform === 'devtools'
                isAndriod.value = res.platform === 'android'

                ios.value = !isAndriod.value
                innerPaddingRight.value = `padding-right: ${res.windowWidth - rect.left}px`
                safeAreaTop.value = isDevtools || isAndroid ? `height: calc(var(--height) + ${res.safeArea.top}px); padding-top: ${res.safeArea.top}px` : ``
                if (props.showLeft) {
                    leftWidth.value = `width: ${res.windowWidth - rect.left }px`
                }
            }
        })

        function showChange(show) {
            if (props.animated) {
                displayStyle.value = `opacity: ${
                    show ? '1' : '0'
                };-webkit-transition: opacity 0.5s;transition: opacity 0.5s;`
            } else {
                displayStyle.value = `display: ${show ? '' : 'none'}`
            }
        }

        function back() {
            if (props.delta) {
                wx.navigateBack({ delta: props.delta })
            }

            triggerEvent('back', { delta: props.delta }, {})
        }

        return {
            displayStyle,
            ios,
            isAndriod,
            innerPaddingRight,
            leftWidth,
            safeAreaTop,

            back,
            showChange
        }
    }
})