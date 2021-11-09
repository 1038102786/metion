<template>
  <div id="main" >
      <UserList id='list' v-show="showList" :showList="showList" :list='list' @select='onSelect' :filterName='includeName'/>
      <div id="editer" contenteditable="true" @input='onInput' ref="edit"></div>
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
      rangeText:'',
      showList:false,
      includeName:'',
      startPos:0,
      endPos:0,
      selection:null,
      range:null,
      selectionAnchor: null,
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
    document.documentElement.addEventListener('click', () => {
      this.showList = false;
      console.log("yin cang ")
    });
  },
  methods: {
    onInput(event) {
      this.rangeText =  this.$refs.edit.innerText
      this.selectionAnchor = window.getSelection().anchorNode;
      if (event.data === '@') {
        this.initListData()
      }
      if(this.showList === true){
        this.getIncludeName()
      }
    },
    getIncludeName(){
      this.updateListPos()
      let selection= window.getSelection();
      let range= selection.getRangeAt(0);

      this.endPos = range.endOffset
      this.rangeText = String(this.selectionAnchor.wholeText)
      if(this.rangeText.length>this.endPos){
        this.includeName = this.rangeText.slice(this.startPos,this.endPos)
      }else{
        this.includeName = this.rangeText.slice(this.startPos)
      }
    },
    initListData(){
      this.selection = window.getSelection();
      this.range= this.selection.getRangeAt(0);
      let end  = this.range.endOffset
      let start = this.range.startOffset
      if(!this.expEmail(start,end)){
        this.includeName = ''
        this.startPos = end
        this.endPos = end
        this.showList = true
        this.updateListPos()
      }
    },
    //结束输入
    onSelect(name){
      this.showList = false;
      let str=`<span contenteditable="false" class="insertNode">@${name}</span>`
      console.log(str)
      this.deleteRange(this.startPos-1,this.endPos)
      this.addText(str)
      this.startPos = 0
    },
    updateListPos(){
      let pos = this.range.getBoundingClientRect()
      let dom = document.getElementById('list')
      let par = document.getElementById('main')
      dom.style.left = pos.x-par.offsetLeft+'px'
      dom.style.top =  pos.y-par.offsetTop+30+'px'
    },
    expEmail(start,end){
      console.log(end)
       if(end === 1 ){
         return false
       }
       let ascII = this.rangeText[end-2].charCodeAt(0)
       console.log('ascII',this.rangeText[end-2],ascII)
       //所有字符+数字+字符的ascII在0~128
        if (0<=ascII && ascII<=128) {
            return true;
        }
        return false
    },
    deleteRange(start,end){
      this.$nextTick(() => {
        let range = document.createRange();
        range.setStart(this.selectionAnchor, start)
        range.setEnd(this.selectionAnchor, end)
        range.deleteContents();
      })
    },
    addText(str){
      this.$nextTick(() => {
        var dom = this.range.createContextualFragment(str);
        //丢失光标解决
        let last = dom.lastChild;
        this.range.collapse(false);
        this.range.insertNode(dom);
        this.range.setEndAfter(last);
        this.range.setStartAfter(last);
        this.selection.addRange(this.range);
      })
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
  &/deep/ .insertNode{
    color: blue;
    font-weight: bold;
  }
}
</style>
