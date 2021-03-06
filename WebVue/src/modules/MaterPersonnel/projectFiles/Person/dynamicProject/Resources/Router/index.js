// 每一个二段板块的router单分一个js 不属于任何板块的写在这里
// !!! 此示例导入文件 <three> 不要使用 包括示例路由 没用注释掉
// import three from './three'
import result from './result'
import process from './process'
import administration from './administration'
import personnel from '../../../../Meeting/dynamicProject/Resources/Router/personnel'
import capital from './capital'
import integral from './integral'
import achievement from './achievement'

export default [
    // ...three,
    ...result,
    ...process,
    ...administration,
    ...personnel,
    ...capital,
    ...integral,
    ...achievement,
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
