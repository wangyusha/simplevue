<template>
  <div class="address-list" ref="addressList">
    <van-address-list
      v-model="chosenAddressId"
      :list="list"
      @add="onAdd"
      @edit="onEdit"
      @select="selected"
    />
    <div class="empty-address" v-if="list.length ==0">
      <div class="empty-icon"><van-icon name="logistics" /></div>
      <div>暂无收货地址！</div>
    </div>
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
  position: relative;
}
  .empty-address {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    text-align: center;
  }
.empty-address .empty-icon{
  font-size: 3rem;
  color: #5c5c5c;
}
</style>
