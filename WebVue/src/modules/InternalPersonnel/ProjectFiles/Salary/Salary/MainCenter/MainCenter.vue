<template>
    <div class="tc-center fl">
        <ul class="clearfix uiTab9 j_uiTab9">
            <li :class="{'uiTab9-active':subIndex == index}" @click="subSwitch(index)" v-for="(item, index) of title" :key="index">{{item}}</li>
        </ul>
        <div id="j-tc-center-content">
            <!-- 状态 state -->
            <div class="uiTab9Con" v-if="subIndex == 0">
                <rx-state></rx-state>
            </div>
            <!-- 结果 result -->
            <div class="uiTab9Con" v-if="subIndex == 1">
                <rx-result></rx-result>
            </div>
            <!-- 过程 process -->
            <div class="uiTab9Con" v-if="subIndex == 2">
                <rx-process></rx-process>
            </div>
            <!-- 管理 management -->
            <div class="uiTab9Con" v-if="subIndex == 3">
                <rx-management></rx-management>
            </div>
            <!-- 薪酬 salary -->
            <div class="uiTab9Con" v-if="subIndex == 4">
                <rx-salary></rx-salary>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
// 注: 所有的大组件已 rx-xxx 命名, 不要使用此示例文件命名，可保留作为参考
import rxState from './state'
import rxResult from './result'
import rxProcess from './process'
import rxManagement from './management'
import rxSalary from './salary'

export default {
    components: {
        rxState,
        rxResult,
        rxProcess,
        rxManagement,
        rxSalary
    },
    data () {
        return {
            title: ['状态', '结果', '过程', '管理', '薪酬'],
            subIndex: 0
        }
    },
    computed: {
        ...mapGetters(['leftInfo'])
    },
    methods: {
        subSwitch (index) {
            this.subIndex = index
            // 关闭弹窗
            this.$router.push(this.$route.matched[1].path)
        }
    }
}
</script>
