# vue-mini-short

基于 `vue-mini` 的原生小程序 Demo

[preview](./shortcuts)

涉及：

- [x] vue-mini
- [x] tdesign

## 问题记录

<!-- ### 1. 配置小程序路径别名 -->
<details>
    <summary>1. 配置小程序路径别名</summary>

    ```json
    // app.json
    {
        "resolveAlias": {
            "~/*": "/*"
        }
    }
    ```
    
    在页面中使用

    ```js
    import util from '~/utils/util'
    ```
</details>

<!-- ### 2. 使用 `tdesign` 组件样式错乱 -->
<details>
    <summary>2. 使用 `tdesign` 组件样式错乱 </summary>

    移除 `app.json` 中的 `"style": "v2"`
</details>