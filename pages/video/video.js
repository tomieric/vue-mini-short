import { definePage, onReady, ref } from "@vue-mini/wechat";
import { useToast } from '~/hooks/index'
import { guid, createRange } from '~/utils/helpers'
import { pets, foods } from '~/config/resources'

function createMedia(length, type = 'pets') {
    const windowInfo = wx.getWindowInfo()
    const colWidth = (windowInfo.screenWidth - 5 * 4 - 8 * 2) / 2

    return Array.from({ length })
        .map(() => {
            const poster = type === 'pets'
                ? pets[createRange(pets.length - 1, 0, false)]
                : foods[createRange(foods.length - 1, 0, false)]
            const result = poster.match(/&w=(\d+)&h=(\d+)&/)
            const height = Math.floor(colWidth * (result[2] / result[1]))
        
            return {
                id: guid('media'),
                like: createRange(300, 1000, false),
                type: Math.random() > 0.5 ? 'video' : 'image',
                poster,
                width: colWidth,
                height
            }
        })
}

// pages/video/video.js
definePage((_query, context) => {
    const Toast = useToast(context)

    const homeId = guid('c')
    const categoryId = ref(homeId)
    const categories = ref([
        {
            id: homeId,
            text: '萌宠',
            symbol: '🐱'
        },
        {
            id: guid('c'),
            text: '服饰',
            symbol: '👔'
        },
        {
            id: guid('c'),
            text: '美食',
            symbol: '🍜' 
        },
        {
            id: guid('c'),
            text: '烧烤',
            symbol: '🍖' 
        },
        {
            id: guid('c'),
            text: '影视',
            symbol: '🎬' 
        },
        {
            id: guid('c'),
            text: '美妆',
            symbol: '💄' 
        }
    ])

    const shortMedia = ref(createMedia(20))

    const onNewPost = () => {
        wx.chooseMedia()
    }

    const refreshShortMedia = () => {
        shortMedia.value = createMedia(createRange(20, 20, false), categoryId.value === homeId ? 'pets' : 'foods')
    }
    const onChangeCategory = (e) => {
        const { dataset: { id } } = e.currentTarget
        categoryId.value = id
        refreshShortMedia(id)
    }

    const refreshTriggered = ref(false)
    const bindrefresherrefresh = () => {
        refreshTriggered.value = true
        setTimeout(()=> {
            refreshTriggered.value = false
            refreshShortMedia()
            Toast({
                message: '已经是最新～',
            });
            console.log(`bindrefresherrefresh`)
        }, 1000)
    }

    const onPreview = (e) => {
        const { dataset: { src } } = e.currentTarget
        console.log(src)
        // previewImages.value = [src]
        // previewVisible.value = true
        wx.previewImage({
          urls: [src],
        })
    }

    return {
        categoryId,
        categories,
        shortMedia,
        onNewPost,
        onChangeCategory,

        refreshTriggered,
        bindrefresherrefresh,
        onPreview
    }
})