<template>
  <div class="userlist">
    <div id="activeBox" v-if="show">
      <div :class="['list', {'choose':chooseIndex==index}]" v-for='(item,index) in filterList' :key='index' @click='changeUser(index)'>
        <img class='photo' :src="item.img"/>
        <span class='name'>{{item.name}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserList',
  props:['list','filterName','showList','pos'],
  watch: {
    filterName: function (val) {
      console.log(val)
      this.chooseIndex = 0
      if(this.filterList.length === 0){
        this.show = false
        this.$emit('aiterName','')
      }
    },
    showList: function (val) {
      this.show = val
    },
  },
  computed:{
    filterList:function(){
      var self = this
      return self.list.filter(function (user) {
         return user.name.indexOf(self.filterName) !== -1
      })
    }
  },
  data () {
    return {
      chooseIndex:0,
      show:this.showList,
    }
  },
  //点击别处窗口消失
  created(){
      let body = document.querySelector('body')
      body.addEventListener('click',(e)=>{
      if(e.target.id === 'activeBox'){
          this.show = true
      }else {
          this.show = false
          this.$emit('aiterName','')
      }
      },true)
  },
  mounted(){
    document.onkeyup = this.keyboard;
  },
  methods:{
    changeUser(index){
      this.chooseIndex = index
      this.$emit('aiterName',this.filterList[this.chooseIndex].name)
    },
    keyboard(e){
      if(!this.show)return
      let edit = document.getElementById('activeBox')
      console.log(edit)
      edit.style.left = this.pos*24+'px'
      edit.style.top = 200-edit.clientHeight+'px'
      let ecode = e || window.event || arguments.callee.caller.arguments[0]
      if (ecode && ecode.keyCode == 38) {
        // 按下↑箭头
        if(this.chooseIndex-1>=0){
          this.chooseIndex--
        }
      } else if (ecode && ecode.keyCode == 40) {
        // 按下↓箭头
        if(this.chooseIndex+1<this.filterList.length){
          this.chooseIndex++
        }
      } else if(ecode && ecode.keyCode == 13){
        // 按下enter
        this.changeUser(this.chooseIndex)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
.userlist{
  position: absolute;

}
#activeBox{
  position: absolute;
  max-height:200px;
  width:180px;
  overflow:auto;
  box-shadow:0px 0px 7px 5px #aaa;
  background-color: #fff;
  left: 30px;
  top: 0px;
}
.list{
  display:flex;
  height:35px;
  .photo{
    margin:3px 8px; 
    border-radius:4px;
  }
  .name{
    line-height:35px;
    margin-left:8px;
  }
}
.choose{
  background-color:rgba(96,186,252);
  color:#fff
}
</style>
