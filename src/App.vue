<template>
  <div id="app">
   <h1>{{ titulo }}</h1>

    <ul>
      <li v-for="foto of fotos">
        <img :src="foto.url" :alt="foto.titulo">
      </li>
    </ul>

  </div>
</template>

<script>
export default {

  data () {
    return {
      titulo: 'Pic',
      fotos: [
        {
          url: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTwV4kVzT5McBdGSgqlVeRzubrNH_mOrrkKseDOGFURq20HmsrelEfMU7It',
          titulo: 'Cachorro'
        },
        {
          url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOhmlmzV4-Sifx5BIc2SXeA-1CtZJf8jb8V_vPZyKbXIQJKU-rkxGO6OM',
          titulo: 'Gato'
        }
      ]
    }
  }
}
</script>

<style>

</style>
