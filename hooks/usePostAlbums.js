import { ref } from '@vue-mini/wechat'
import { useAavtar } from './useAvatar'

const character = [
    '这张照片太赛博朋克了，喜欢喜欢，真是大爱了。向楼主学习了，希望继续楼主多发一些这样的照片，多多益善，爱了爱了~~',
    '周末要不要一起去环球影视城打卡吗？北京哪个地方可以拍这类的照片吗？想去拍，太好看了，很有科幻感，一起去呀！'
]

function createUsers(arr, length = 2) {
    const users = arr.slice(0, length)
    return users.map((user, index) => {
        return {
            ...user,
            content: character[index % 2],
            createdAt: `2024-01-07 19:4${index}`,
            likeNum: Math.trunc(Math.random() * 100),
            commentNum: Math.trunc(Math.random() * 20),
        }
    })
}

export function usePostAlbums() {
    const { avatars } = useAavtar()
    const likeUsers = createUsers(avatars)
    const commentUsers = createUsers(avatars, 4)
    const favirateUsers = createUsers(avatars, 3)

    const albums = ref([
        {
            poster: 'https://images.pexels.com/photos/16794803/pexels-photo-16794803/free-photo-of-building-on-a-pier.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            like: {
                num: likeUsers.length,
                users: likeUsers
            },
            comment: {
                num: commentUsers.length,
                users: commentUsers
            },
            favorite: {
                num: favirateUsers.length,
                users: favirateUsers
            }
        },
        {
            poster: 'https://images.pexels.com/photos/18273081/pexels-photo-18273081/free-photo-of-scenic-cliff-at-stokksnes-on-iceland.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            like: {
                num: likeUsers.length,
                users: likeUsers
            },
            comment: {
                num: commentUsers.length,
                users: commentUsers
            },
            favorite: {
                num: favirateUsers.length,
                users: favirateUsers
            }
        },
        {
            poster: 'https://images.pexels.com/photos/14028086/pexels-photo-14028086.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            like: {
                num: likeUsers.length,
                users: likeUsers
            },
            comment: {
                num: commentUsers.length,
                users: commentUsers
            },
            favorite: {
                num: favirateUsers.length,
                users: favirateUsers
            }
        }
    ])

    return {
        albums
    }
}