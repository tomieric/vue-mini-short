import { defineComponent, ref } from '@vue-mini/wechat'

defineComponent({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表
   */
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
    loading: {
      type: Boolean,
      value: false
    },
    homeButton: {
      type: Boolean,
      value: false,
    },
    animated: {
      // 显示隐藏的时候opacity动画效果
      type: Boolean,
      value: true
    },
    show: {
      // 显示隐藏导航，隐藏的时候navigation-bar的高度占位还在
      type: Boolean,
      value: true,
      observer: '_showChange'
    },
    // back为true的时候，返回的页面深度
    delta: {
      type: Number,
      value: 1
    },
  },

  setup(props, { triggerEvent }) {
    const displayStyle = ref('')
    const ios = ref('')
    const innerPaddingRight = ref('')
    const leftWidth = ref('')
    const safeAreaTop = ref('')

    const rect = wx.getMenuButtonBoundingClientRect()
    wx.getSystemInfo({
        success: (res) => {
            const isAndroid = res.platform === 'android'
            const isDevtools = res.platform === 'devtools'
            ios.value = !isAndroid
            // innerPaddingRight.value = `padding-right: ${res.windowWidth - rect.left - rect.right}px`
            // leftWidth.value = `width: ${res.windowWidth - rect.left }px`
            safeAreaTop.value = `padding-top: ${res.safeArea.top +  rect.height + (props.back ? 10 : 20)}px`
        }
    })

    function _showChange(show) {
        const animated = props.animated
        if (animated) {
            displayStyle.value = `opacity: ${
            show ? '1' : '0'
            };transition:opacity 0.5s;`
        } else {
            displayStyle.value = `display: ${show ? '' : 'none'}`
        }
    }

    function back() {
        if (props.delta) {
            wx.navigateBack({
                delta: props.delta
            })
        }
        triggerEvent('back', { delta: props.delta }, {})
    }

    return {
        ios,
        innerPaddingRight,
        leftWidth,
        safeAreaTop,
        displayStyle,
        _showChange,
        back
    }
  }
})
