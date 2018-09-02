<template>
  <div class="address-list" ref="addressList">
    <van-address-list
      v-model="chosenAddressId"
      :list="list"
      @add="onAdd"
      @edit="onEdit"
      @select="selected"
    />
  </div>
</template>

<script>
  export default {
    name: "address-list",
    props:['list','opreat','id'],
    mounted() {
      let winHeight = document.documentElement.clientHeight;
      let winWidth = document.documentElement.clientWidth;
      let node = this.$refs.addressList;
      node.style.height = winHeight+'px';
      node.style.width = winWidth+'px';
      // console.log(node)
    },
    data() {
      return {
        chosenAddressId: this.id,
      }
    },

    methods: {
      onAdd() {
        this.$router.push({name:'AddressEditor'})
      },
      onEdit(item, index) {
        if(this.opreat ==2) {
          // console.log(item, index)
          this.$router.push({name:'AddressEditor', query: {id:item.id}})
        }
      },
      selected(item,index){
        // console.log(item,index)
        this.$emit('onselect',item)
      }
    }
  }
</script>

<style scoped>
.address-list{
  padding-top: 46px;
  box-sizing: border-box;
}
</style>
