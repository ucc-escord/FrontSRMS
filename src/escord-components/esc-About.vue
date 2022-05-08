<template>
  <div class="wrapper">
    <div class="section page-header header-filter" :style="headerStyle">
      <div class="container">
        <div
        class="">
            <h3 class="title">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi voluptate dolor odit ratione repellat illum iste dolorum cupiditate, alias rerum exercitationem cumque debitis laboriosam magni pariatur deserunt nam aut consequatur.</h3>
        </div>
      </div>
    </div>
    <vue-headful title="About | ESCORD"/>
  </div>
</template>

<script>

export default {
  bodyClass: "escord-about-page",
  data() {
    return {
        
    };
  }
};
</script>

<style lang="scss" scoped>

h3.title {
    margin-bottom: 0.5rem !important;
    color: #2d2d2d !important;
}

.__card-buttons {
    margin-top: 1.5rem !important;
}

.md-card-header {
    background-color: transparent !important;
    box-shadow: none !important;
    -webkit-box-shadow: none;
    height: 5rem !important;
    margin-bottom: 2rem !important;
}

.md-icon {
    color: #90a4ae !important;
}
</style>
