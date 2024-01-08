import { defineComponent } from "@vue-mini/wechat";

// components/message-item/message-item.js
defineComponent({
    properties: {
        data: {
            type: Object,
            value: {}
        },
        avatar: {
            type: String,
            value: 'avatar'
        },
        name: {
            type: String,
            value: 'name'
        },
        message: {
            type: String,
            value: 'message'
        },
        time: {
            type: String,
            value: 'time'
        },
        self: {
            type: String,
            value: 'self'
        }
    },

    setup (props) {}
})