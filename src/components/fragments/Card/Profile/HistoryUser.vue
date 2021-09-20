<template>
  <div class="history-wrapper">
    <div class="history-item">
         <div style="width: 100px">Event</div>
         <div style="width: 100px">Nft</div>
         <div style="width: 150px">Nft Name</div>
         <div style="width: 250px">Nft Description</div>
         <div style="width: 100px">Price</div>
     </div>
     <div class="break-line" />
     <div class="history-item-item">
         <div style="width: 100px">Event</div>
         <div style="width: 100px">Nft</div>
         <div style="width: 150px">Nft Name</div>
         <div style="width: 250px">Nft Description</div>
         <div style="width: 100px">Price</div>
     </div>
  </div>
</template>

<script>
export default {
    name: 'HistoryUser'
}
</script>

<style lang="scss">
.break-line{
    display: flex;
    width: 100%;
    border-bottom: 1px solid whitesmoke;
}
.history-wrapper{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: white;
}
.history-item{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    color: white;
    padding: 6px 12px;
}
.history-item-item{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    color: white;
    padding: 6px 12px;
}
</style>