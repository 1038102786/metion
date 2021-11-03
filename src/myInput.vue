<template>
  <div id="main" >
      <UserList id='list' v-show="showList" :showList="showList" :list='list' @aiterName='saveName' :filterName='includeName'/>
      <div id="editer" contenteditable="true" @input='checkvalue' ref="edit"></div>
  </div>
</template>

<script>
import UserList from './components/UserList.vue'
export default {
  name: 'myInput',
  components:{
    UserList,
  },
  data(){
    return {
      inputText:'',
      showList:false,
      includeName:'',
      insertPos:0,
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
  mounted() {
    document.addEventListener('mousedown', this.onMouseDown);
  },
  methods: {
    checkvalue (event) {
      // console.log(event)
      this.inputText = this.$refs.edit.innerHTML
      if (event.data === '@') {
        this.includeName = ''
        this.insertPos = 0
        this.getPos()
        this.showList = true
      }
      if(this.showList === true){
        this.getPos()
        this.includeName = event.data
      }
    },
    //结束输入
    saveName(name){
      if(name){
        if(this.includeName !== '@'&& this.includeName !== null){
          this.inputText = this.inputText.slice(0,this.insertPos)+name+this.inputText.slice(this.insertPos+this.includeName.length)
        }else{
          this.inputText = this.inputText.slice(0,this.insertPos)+name+this.inputText.slice(this.insertPos)
        }
        this.$refs.edit.innerHTML = this.inputText
      }
      this.showList = false
    },
    getPos(){
      let selection= window.getSelection();
      let range= selection.getRangeAt(0);
      let pos = range.getBoundingClientRect()
      if(this.insertPos == 0){
        this.insertPos = range.endOffset
      }
      let edit = document.getElementById('editer')
      let dom = document.getElementById('list')
      dom.style.left = pos.x-edit.offsetHeight-50+'px'
      dom.style.top =  pos.y+(200-dom.clientHeight)-edit.offsetWidth+80+'px'
    }
  }
}
</script>

<style lang='less' scoped>
#main{
  width: 600px;
  height: 400px;
  position: absolute;
  margin:auto;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  border: 2px solid rgba(96,186,252);
  border-radius: 6px;
  #editer{
    width: 80%;
    min-height: 40%;
    outline-style: none ;
    border: 1px solid #ccc; 
    border-radius: 3px;
    margin-left: 100px;
    padding: 14px 14px;
    font-size: 24px;
    margin: 130px 40px;
  }
}
</style>
