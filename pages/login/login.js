import { definePage, reactive, ref, computed, toRaw } from "@vue-mini/wechat";
import { useMessage, useStore } from '~/hooks/index'

// pages/login/login.js
definePage({
    setup(_, context) {
        const Message = useMessage()
        const { dispatch } = useStore()

        const mode = ref('login')
        const isSendedMsg = ref(false)

        const loginForm = reactive({
            mobile: '',
            password: ''
        })

        const loginBtnDisabled = computed(() => {
            return loginForm.mobile === '' ||
                loginForm.password === '';
        })

        function onChangeLoginType(e) {
            const { dataset } = e.currentTarget
            if (dataset.mode === 'toggle') {
                mode.value = mode.value === 'login'
                    ? 'sso'
                    : 'login'
            } else {
                mode.value = dataset.mode
            }
        }

        function onGetVerifyCode() {
            wx.login({
                success: res => {
                    console.log(res)
                    isSendedMsg.value = true
                }
            })
        }

        async function onDoneTap() {
            await Message({
                type: 'success',
                context,
                offset: [50, 32],
                duration: 1000,
                content: '登录成功'
            })

            dispatch('setUserInfo', toRaw(loginForm))

            wx.switchTab({
                url: '/pages/index/index',
            })
        }

        function onBack() {
            wx.navigateTo({
              url: '/pages/slash/slash',
            })
        }

        function onInputMobile(e) {
            loginForm.mobile = e.detail.value
        }

        function onInputPwd(e) {
            loginForm.password = e.detail.value
        }

        function onLoginTap() {
            if (loginForm.mobile && loginForm.password) {
                dispatch('setUserInfo', toRaw(loginForm))
                onDoneTap()
            }
        }

        return {
            mode,
            isSendedMsg,
            loginBtnDisabled,
            loginForm,
            onLoginTap,

            onChangeLoginType,
            onGetVerifyCode,
            onDoneTap,
            onBack,
            onInputMobile,
            onInputPwd
        }
    }
})