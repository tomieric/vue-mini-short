import { reactive } from '@vue-mini/wechat'

export function createStore() {
    const localData = wx.getStorageSync('state') || {}

    const INIT_STATE = Object.assign({
        messageUser: '',
        canSlash: true,
        isLogged: false,
        userInfo: {
            mobile: ''
        }
    }, localData)

    const state = reactive({ ...INIT_STATE })
    const setStore = (key, value) => {
        if (typeof key === 'object') {
            Object.keys(key)
                .forEach(k => {
                    state[k] = key[k]
                })
        } else {
            state[key] = value
        }

        wx.setStorageSync('state', state)
    }

    const actions = {
        setMessageUser: (data, payload) => {
            setStore('messageUser', payload)
        },
        setUserInfo: (data, payload = {}) => {
            setStore({
                isLogged: true,
                userInfo: Object.assign({}, data.userInfo, payload)
            })
        },
        setCanSlash: (data, payload) => {
            setStore('canSlash', payload)
        },
        logout: (data, payload) => {
            setStore({ ...INIT_STATE, canSlash: data.canSlash })
        }
    }

    function dispatch(action, payload) {
        if (actions[action]) {
            actions[action](state, payload)
        }
    }

    return {
        state,
        dispatch
    }
}

const store = createStore()

export function useStore() {
    return store
}