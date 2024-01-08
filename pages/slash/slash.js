// pages/slash/slash.js
import { definePage, ref } from '@vue-mini/wechat'
import { useStore } from '~/hooks/useStore'

definePage({
    setup() {
        const { state, dispatch } = useStore()

        const current = ref(0)
        const slashList = ref([
            {
                value: '/assets/images/slash_1.png',
                ariaLabel: '分享生活'
            },
            {
                value: '/assets/images/slash_2.png',
                ariaLabel: '记录生活'
            },
            {
                value: '/assets/images/slash_3.png',
                ariaLabel: '享受生活'
            }
        ])

        function onDoneTap() {
            dispatch('setCanSlash', false)

            wx.navigateTo({
              url: '/pages/login/login',
            })
        }

        if (state.isLogged) {
            wx.reLaunch({
              url: '/pages/index/index',
            })
        } else if (!state.canSlash) {
            wx.reLaunch({
              url: '/pages/login/login',
            })
        }

        return {
            current,
            slashList,
            onDoneTap
        }
    }
})