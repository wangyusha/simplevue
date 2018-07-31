<template>
    <div>
      <div class="navbar-div">
        <van-nav-bar   title="购物车" />
      </div>
    </div>
</template>

<script>
    export default {
        name: "Cart",
        data() {
          return {
            cartInfo: [],
            isEmpty: false
          }
        },
        created() {
            this.getCartInfo();
        },
        methods: {
          //购物车信息
           getCartInfo() {
             if(localStorage.cartInfo) {
               this.cartInfo = JSON.parse(localStorage.cartInfo)
             }
             console.log(`cartInfo:${JSON.stringify(this.cartInfo)}`);
             this.isEmpty = this.cartInfo.length > 0 ? true:false;
           }
        }

    }
</script>

<style scoped>

</style>
