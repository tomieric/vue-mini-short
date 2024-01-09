import { ref } from '@vue-mini/wechat'
import { Authorization } from '~/config/index'

/**
 * 网络请求 hooks
 * @param {*} options 
 * @example {
 *  url
 *  method
 *  data
 *  manual
 *  debounceWait
 *  throttleWait
 *  onBefore()
 *  onSuccess()
 *  onError()
 *  onFianlly()
 * }
 */
export function useRequest(options = {}) {
    const loading = ref(false)
    const data = ref(null)
    const error = ref(null)

    let debounceWaitTimer = null
    let throttleWait = false

    const mutate = (result) => {
        data.value = result
    }

    function run(config = {}, resolve, reject) {
        if (options.throttleWait && throttleWait) {
            return
        } else if (options.debounceWait) {
            debounceWait = true
        }

        // cache
        if ((data.value && !!config.cache) || !config.url) {
            return
        }

        if (options.onBefore) {
            options.onBefore(options)
        }

        loading.value = true

        function request() {
            wx.request({
                url: config.url || options.url,
                method: config.method || options.method || 'GET',
                data: config.data || {},
                header: {
                    Authorization,
                },
                success: (res) => {
                    data.value = res
                    resolve?.(res)
    
                    options?.onSuccess?.(res, options)
                },
                fail: (error) => {
                    error.value = error
                    reject?.(error)
    
                    options?.onError?.(error, options)
                },
                complete: (result) => {
                    options?.onFinally?.(result, options)

                    loading.value = false

                    clearTimeout(debounceWaitTimer)
                    throttleWait = false
                }
            })
        }

        if (options.throttleWait) {
            setTimeout(request, options.throttleWait)
        } else if (options.debounceWait) {
            clearTimeout(debounceWaitTimer)
            debounceWaitTimer = setTimeout(request, options.debounceWait)
        } else {
            request()
        }
    }

    function runAsync(config) {
        return new Promise((resolve, reject) => {
            run(config, resolve, reject)
        })
    }

    if (!options.manual) {
        run()
    }


    return {
        loading,
        error,
        data,
        mutate,
        run,
        runAsync
    }
}