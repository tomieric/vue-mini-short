import { definePage } from "@vue-mini/wechat";
import { useStore, useAavtar, useCreateMessages } from '~/hooks/index'
import { createRange } from '~/utils/helpers'

const { createMessage } = useCreateMessages()

function createUser(users) {
    return users.map((user, index) => {
        return {
            ...user,
            message: createMessage(index),
            createdAt: `${createRange(24, 12)}:${createRange(59)}`,
            unread: createRange(10, 1, false)
        }
    })
}

function createTopUser (users) {
    return users.map(user => {
        return {
            ...user,
            online: Math.random() > 0.5
        }
    })
}

definePage(() => {
    const { state, dispatch } = useStore()
    const user = state.messageUser

    dispatch('setMessageUser', '')
    
    const { avatars, props: imageProps } = useAavtar()

    const topUsers = createTopUser(avatars)
    const messages = createUser(avatars)

    const toMessagePage = (e) => {
        const { dataset: { user } } = e.currentTarget
        wx.navigateTo({
          url: `/pages/chat/chat?uid=${user.id}`,
        })
    }

    const onNewPost = () => {
        wx.scanCode()
    }

    return {
        topUsers,
        messages,
        imageProps,
        toMessagePage,
        onNewPost
    }
})