// 每一个二段板块的router单分一个js 不属于任何板块的写在这里
// !!! 此示例导入文件 <three> 不要使用 包括示例路由 没用注释掉
// import three from './three'
import ceremony from './ceremony'
import data from './data'
import dandle from './dandle'
import disclose from './disclose'
import protect from './protect'
import camera from './camera'
import image from './image'
import temporary from './temporary'
import laying from './laying'
import safe from './safe'
import environmental from './environmental'
import imageorder from './imageorder'
import inspection from './inspection'
import negotiation from './negotiation'
import delay from './delay'
import complaint from './complaint'
import fine from './fine'
import general from './general'
import materialconfirm from './materialconfirm'
export default [
    // ...three,
    ...ceremony,
    ...data,
    ...dandle,
    ...disclose,
    ...protect,
    ...camera,
    ...image,
    ...temporary,
    ...laying,
    ...safe,
    ...environmental,
    ...imageorder,
    ...inspection,
    ...negotiation,
    ...delay,
    ...complaint,
    ...fine,
    ...general,
    ...materialconfirm,
    {
        path: 'list',
        components: {
            right: () => import('../../MainPopup/list.vue')
        }
    },
    {
        path: 'hander',
        component: () => import('../../MainPopup/hander.vue')
    },
    {
        path: 'material1',
        component: () => import('../../MainPopup/material/material1.vue')
    },
    {
        path: 'material2',
        component: () => import('../../MainPopup/material/material2.vue')
    },
    {
        path: 'material3',
        component: () => import('../../MainPopup/material/material3.vue')
    },
    {
        path: 'material4',
        component: () => import('../../MainPopup/material/material4.vue')
    }
]
