import { definePage, ref, watch, computed, onShow } from "@vue-mini/wechat";
import { useAavtar, useCreateMessages } from '~/hooks/index'
import { createRange, guid } from '~/utils/helpers'

const { createMessage } = useCreateMessages()

function createMsg(options) {
    return Object.assign({
        self: options.uid === 0,
        createdAt: `${createRange(24, 12)}:${createRange(59)}`
    }, options, { id: guid('message') })
}

function createMessages(user, users) {
    const me = users.find(u => u.id === 0)
    const usersOption = [me, user]

    return Array.from({ length: 10 })
        .fill('')
        .map((_, index) => {
            const currentUser = usersOption[index % 2]
            return createMsg({
                uid: currentUser.id,
                name: currentUser.name,
                avatar: currentUser.avatar,
                message: createMessage(index)
            })
        })
}

// pages/chat/chat.js
definePage((query) => {
    const { avatars } = useAavtar()
    const title = ref('Loading ...')
    const messages = ref([])
    const reverse = ref(false)
    const inputMessage = ref('')

    const user = computed(() => {
        return avatars.find(user => user.id === +query.uid)
    })

    const mine = computed(() => {
        return avatars.find(user => user.id === 0)
    })

    watch(user, (usr) => {
        if (usr) title.value = usr.name
        messages.value = createMessages(usr, avatars).reverse()
        wx.nextTick(() => {
            reverse.value = true
        })
    }, { immediate: true })

    const onChangeInputMessage = (e) => {
        const { value } = e.detail
        inputMessage.value = value
    }

    const onSendMessage = () => {
        if (inputMessage.value.trim() !== '') {
            const { id, ...userData } = mine.value
            const msg = createMsg({
                ...userData,
                uid: id,
                message: inputMessage.value
            })
            console.log(msg)
            messages.value.unshift(msg)
            inputMessage.value = ''
        }
    }

    const viewRect = ref({})
    onShow(() => {
        wx.createSelectorQuery()
                .select('#scrollView')
                .boundingClientRect(rect => {
                    viewRect.value = rect
                })
                .exec()
    })

    const isFetching = ref(false)
    const DISTANCE = 50
    const fetchHistoryMessage = () => {
        isFetching.value = true
        setTimeout(() => {
            const _messages = createMessages(user, avatars)
            messages.value.push(..._messages)
            setTimeout(() => {
                isFetching.value = false
            }, 200)
        }, 2000)
    }
    const bindscroll = (e) => {
        if (isFetching.value) return
        const { height } = viewRect.value
        const { scrollHeight, scrollTop, deltaY } = e.detail
        if (scrollHeight - height - Math.abs(scrollTop) - DISTANCE  < 0 && deltaY > 0) {
            fetchHistoryMessage()
        }
    }

    return {
        title,
        query,
        messages,
        reverse,
        inputMessage,
        onChangeInputMessage,
        onSendMessage,
        bindscroll,
        isFetching
    }
})