// index.js
import { definePage, ref, computed, watch } from '@vue-mini/wechat'
import { useAavtar, usePostAlbums, useStore, useRequest } from '~/hooks/index'

definePage(() => {
    const { dispatch } = useStore()
    const { avatars, props: avatarProps } = useAavtar()
    const bloggers = ref([...avatars])
    const { albums } = usePostAlbums()

    function toMessagePage(e) {
        const { dataset: { user } } = e.currentTarget
        dispatch('setMessageUser', user.name)
        wx.switchTab({
          url: '/pages/video/video',
        })
    }

    const { data } = useRequest({
        url: 'https://mock.apifox.com/m1/3877951-0-default/v1/search'
    })

    watch(data, (result) => {
        console.log(`result: ${result}`)
    })

    const visibleData = ref({})
    function onAlbumAction(e) {
        const { type, data } = e.detail
        visibleType.value = type === 'comment' || type === 'poster'
            ? 'comment'
            : type

        if (data[visibleType.value]) {
            visibleData.value = data[visibleType.value]
        }

        visible.value = true
    }

    const visible = ref(false)
    const visibleType = ref('comment')
    const visibleTitle = computed(() => {
        return ({
            'comment': '评论',
            'like': '喜欢',
            'favorite': '收藏'
        })[visibleType.value]
    })
    function onVisibleChange() {
        visible.value = false
    }

    function onNewPost() {
        wx.chooseMedia({
            count: 1,
            success: () => {}
        })
    }

    return {
        bloggers,
        albums,
        imageProps: avatarProps,

        toMessagePage,
        onAlbumAction,

        visible,
        visibleType,
        visibleTitle,
        visibleData,
        onVisibleChange,

        onNewPost
    }
})