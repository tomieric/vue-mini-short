// app.js
import { createApp } from '@vue-mini/wechat'
import { useStore, useAppUpdate } from '~/hooks/index'

createApp(() => {
    const { state: globalData } = useStore()

    useAppUpdate()

    return {
        globalData
    }
})