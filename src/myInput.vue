<template>
  <div id="main">
    <UserList :showList='showList' :list='list' @aiterName='saveName' :filterName='includeName' :pos='insertPos'>
      <textarea class="inputdom" slot="from-item" @input='checkvalue' v-model='inputText'/>
    </UserList>
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
  created() {
    document.addEventListener('mousedown', this.onMouseDown);
  },
  methods: {
    onMouseDown(event){
        let x = event.clientX + document.body.scrollLeft - document.body.clientLeft
        let y = event.clientY + document.body.scrollTop  - document.body.clientTop
        console.log(x,y)
    },
    checkvalue (event) {
      // console.log(event)
      if (event.data === '@') {
        this.showList = true
        this.insertPos = event.target.selectionEnd
        // let span = document.createElement('span')
        // span.innerHTML = this.inputText.slice(0,this.insertPos)
        // let width =span.width
        // console.log(span)
        // console.log(width)

      }
      if(this.showList === true){
        this.getInclude()
      }
    },
    getTextWidth() {
      // re-use canvas object for better performance
      // const canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
      // const context = canvas.getContext("2d");
      // context.font = font;
      // const metrics = context.measureText(text);
      // return metrics.width;
    },
    //或者输入条件来筛选
    getInclude(){
        let str = this.inputText.slice(this.insertPos)
        let next = str.indexOf('@');//this.inputText.slice(pos+1).indexOf('@')
        if(next === -1){
          this.includeName = this.inputText.slice(this.inputText.lastIndexOf('@')+1)
        }else{
          this.includeName = this.inputText.slice(this.insertPos+1,next)
        }
    },
    //结束输入
    saveName(name){
      this.showList = false
      this.includeName = ''
      if(name){
        this.inputText = this.inputText.slice(0,this.insertPos)+name+this.inputText.slice(this.insertPos)
      }
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
  .inputdom{
    width: 80%;
    min-height: 80%;
    outline-style: none ;
    border: 1px solid #ccc; 
    border-radius: 3px;
    padding: 14px 14px;
    font-size: 24px;
    margin: 30px 40px;
  }
}
</style>
