<template>
  <div id="app">
    <UserList :showList='showList' :list='list' @aiterName='saveName' :filterName='includeName' :pos='insertPos'>
      <input slot="from-item" @input='checkvalue' v-model='inputText'/>
    </UserList>
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
      insertPos:-1,
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

  },
  methods: {
    checkvalue (event) {
      if (event.data === '@') {
        this.showList = true
      }
      if(this.showList === true){
        //或者输入条件来筛选
        this.insertPos = event.target.selectionEnd
        let str = this.inputText.slice(this.insertPos)
        let next = str.indexOf('@');//this.inputText.slice(pos+1).indexOf('@')
        if(next === -1){
          this.includeName = this.inputText.slice(this.inputText.lastIndexOf('@')+1)
        }else{
          this.includeName = this.inputText.slice(this.insertPos+1,next)
        }
      }
    },
    //结束输入
    saveName(name){
      this.showList = false
      this.includeName = ''
      if(name){
        this.inputText = this.inputText.slice(0,this.insertPos)+name+this.inputText.slice(this.insertPos)
      }
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
