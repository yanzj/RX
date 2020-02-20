/**
 * 建议：
 * @description 每一个二段板块的router单分一个js 不属于任何板块的写在这里
 * @description 此示例导入文件 <three> 不要使用 包括示例路由 没用注释掉
 */

import three from './three'

export default [
    ...three,
    {
        path: 'list',
        components: {
            right: () => import('../../MainPopup/list.vue')
        }
    },
    {
        path: 'hander',
        component: () => import('../../MainPopup/hander.vue')
    }
]
