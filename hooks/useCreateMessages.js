export function useCreateMessages() {
    const messages = [
        '周末要不要一起去环球影视城打卡吗？',
        '马上要中秋节了，这次月饼想吃什么口味的？选...',
        '这周的周报写完了吗？晚上下班之前要记得提交...',
        '终于等到你~欢迎你参加本次的活动，感谢您在百...'
    ]

    function createMessage(index) {
        return messages[index % 4]
    }

    return {
        createMessage
    }
}