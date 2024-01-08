import { definePage, ref } from "@vue-mini/wechat";
import { useStore } from '~/hooks/useStore'

// pages/profile/profile.js
definePage(() => {
    const { dispatch } = useStore()
    const style = ref('')
    const opacity = ref(0)
    const bindScroll = (e) => {
        const { scrollTop } = e.detail
        opacity.value = Math.max(0, Math.min(scrollTop / 120, 1))
        style.value = `--td-navbar-bg-color: rgba(255, 255, 255, ${opacity.value})`
    }

    const onUserLogout = () => {
        dispatch('logout')
        wx.reLaunch({
          url: '/pages/login/login',
        })
    }

    return {
        opacity,
        style,
        bindScroll,
        onUserLogout
    }
})