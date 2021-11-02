<template>
  <div id="app">
    <input @input='checkvalue' v-model='inputText' />
    <UserList id='activeBox' v-if='showList' :list='list' @aiterName='saveName' :filterName='includeName'/>
  </div>
</template>

<script>
import UserList from './components/UserList.vue'
export default {
  name: 'App',
  components:{
    UserList,
  },
  data(){
    return {
      inputText:'',
      showList:false,
      includeName:'',
      list:[{
        img:'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
        name:'王小一'
      },{
        img:'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
        name:'王小二'
      },{
        img:'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
        name:'宋小二'
      },{
        img:'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
        name:'赵大大'
      },{
        img:'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
        name:'王大二'
      },{
        img:'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
        name:'李大二'
      },]
    }
  },
  /**
   * 实现点击别处收起
   */
  created() {
      let body = document.querySelector('body')
      body.addEventListener('click',(e)=>{
      if(e.target.id === 'activeBox'){
              this.showList = true
      }else {
          this.showList = false
      }
      },false)
  },
  methods: {
    checkvalue (event) {
      console.log(event)
      if (event.data === '@') {
        this.showList = true
        // this.getCursorSite()
      }
      if(this.showList === true){
        //或者输入条件来筛选
        //todo:需要判断是否是最后一个@     @李一一@？@张二二
        this.includeName = this.inputText.slice(this.inputText.lastIndexOf('@')+1)
      }
    },
    //结束输入
    saveName(name){
      this.showList = false
      this.inputText = this.inputText.slice(0,this.inputText.lastIndexOf('@')+1)+name
    },
    getCursorSite(){
      let selection = window.getSelection()
      console.log(selection)
      let range = selection.getRangeAt(0)
      console.log(range)
      let dom = range.endContiner;
      console.log(dom)
      let offset = range.endOffset;
      console.log(offset)

    }
  }
}
</script>

<style>

</style>
