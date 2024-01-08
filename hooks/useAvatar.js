export function useAavtar() {
    const props = {
        lazy: true,
        shape: 'circle',
        mode: 'aspectFill'
    }

    const avatars = [
        {
            id: 0,
            name: '我',
            avatar: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2'
        },
        {
            id: 2,
            name: '黄华',
            avatar: 'https://images.pexels.com/photos/2169434/pexels-photo-2169434.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=1'
        },
        { 
            id: 4, 
            name: '谢东东', 
            avatar: 'https://images.pexels.com/photos/732425/pexels-photo-732425.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2'
        },
        { 
            id: 8, 
            name: '陈浩平', 
            avatar: 'https://images.pexels.com/photos/1458332/pexels-photo-1458332.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2' 
        },
        { 
            id: 10, 
            name: '周琦', 
            avatar: 'https://images.pexels.com/photos/842980/pexels-photo-842980.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2' 
        }
    ]

    return {
        avatars,
        props
    }
}