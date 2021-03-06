// 每一个二段板块的router单分一个js 不属于任何板块的写在这里
// !!! 此示例导入文件 <three> 不要使用 包括示例路由 没用注释掉
// import three from './three'
import twoTab2 from './twoTab2'
import twoTab3 from './twoTab3'
import twoTab4 from './twoTab4'
import twoTab5 from './twoTab5'
import twoTab6 from './twoTab6'

export default [
    // ...three,
    ...twoTab2,
    ...twoTab3,
    ...twoTab4,
    ...twoTab5,
    ...twoTab6,
    {
        path: 'addPage',
        components: {
            center: () => import('../../MainPopup/layout.vue')
        }
    },
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
