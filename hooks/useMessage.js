import Message from 'tdesign-miniprogram/message/index'

export function useMessage() {
    return (options) => {
        return new Promise(resolve => {
            Message[options.type](options)
            setTimeout(resolve, options.duration ?? 0)
        })
    }
}