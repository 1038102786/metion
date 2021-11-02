<template>
  <div class="userlist">
    <!-- <slot name="from-item"/> -->
    <!-- <input/> -->
    <div :class="['list', {'choose':chooseIndex==index}]" v-for='(item,index) in filterList' :key='index' @click='changeUser(index)'>
      <img class='photo' :src="item.img"/>
      <span class='name'>{{item.name}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserList',
  props:['list','filterName'],
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
    }
  },
  mounted(){
    //document.addEventListener('keyup', this.keyboard);
    document.onkeyup = this.keyboard;
  },
  methods:{
    changeUser(index){
      this.chooseIndex = index
      this.$emit('aiterName',this.filterList[this.chooseIndex].name)
    },
    keyboard(e){
      let ecode = e || event || window.event || arguments.callee.caller.arguments[0]
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
  max-height:200px;
  width:180px;
  overflow:auto;
  box-shadow:0px 0px 7px 5px #aaa;
}
.list{
  display:flex;
  height:35px;
  .photo{
    // height:30px;
    // width:30px; 
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
