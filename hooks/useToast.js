import Toast from 'tdesign-miniprogram/toast/index';

export function useToast(context) {
    return (options = {}) => {
        Toast({
            context,
            selector: '#t-toast',
            ...options
        })
    }
}