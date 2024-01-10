import { compareVersion } from '~/utils/util'
import { useStore } from '~/hooks/index'
import { SDKVersion } from '~/config/index'

export function useAppUpdate() {
    const { dispatch } = useStore()
    const sysInfo = wx.getSystemInfoSync()

    if (compareVersion(sysInfo.SDKVersion, SDKVersion) < 0) {
        wx.showModal({
            title: '温馨提示',
            content: '当前微信版本过低,请尽快升级您的微信版本',
            showCancel: false,
            cancelColor: '#000000',
            confirmText: '确定'
        })
    } else if (wx.canIUse('getUpdateManager')) {
        const updateManager = wx.getUpdateManager();
        updateManager.onCheckForUpdate(res => {
            if (res.hasUpdate) {
                updateManager.onUpdateReady(() => {
                    wx.showModal({
                        title: '更新提示',
                        content: '新版本已经准备好，是否重启应用？',
                        showCancel: false,
                        success: result => {
                            if (result.confirm) {
                                // 清除登录信息
                                dispatch('logout')
                                updateManager.applyUpdate();
                            }
                        }
                    })
                });
                updateManager.onUpdateFailed(() => {
                    wx.showModal({
                        title: '已经有新版本了哟~',
                        content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~',
                    })
                });
            }
        })
    } else {
        wx.showModal({
          title: '提示',
          content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
        })
    }
}