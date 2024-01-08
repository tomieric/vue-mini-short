// app.js
import { createApp } from '@vue-mini/wechat'
import { useStore } from '~/hooks/index'

createApp(() => {
    const { state: globalData } = useStore()

    return {
        globalData
    }
})