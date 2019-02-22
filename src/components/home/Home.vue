<template>
  <div>
    <h1 class="centralizado">{{ titulo }}</h1>
    <p class="centralizado">{{ mensagem }}</p>

    <input
      type="search"
      class="filtro"
      @input="filtro = $event.target.value"
      placeholder="filtre por parte do título"
    >

    <ul class="lista-fotos">
      <li class="lista-fotos-item" v-for="foto of fotosComFiltro" :key="foto._id">
        <meu-painel :titulo="foto.titulo">
          <imagem-responsiva :url="foto.url" :titulo="foto.titulo" v-transform:rotate.animate="30"/>
          <router-link :to="{ name: 'altera', params: { id : foto._id }}">
            <meu-botao rotulo="Alterar" tipo="button"/>
          </router-link>

          <meu-botao
            rotulo="remover"
            tipo="button"
            @botaoAtivado="remove(foto)"
            :confirmacao="true"
            estilo="perigo"
          />
        </meu-painel>
      </li>
    </ul>
  </div>
</template>

<script>
import Painel from "../shared/painel/Painel.vue";
import ImagemResponsiva from "../shared/imagem-responsiva/ImagemResponsiva.vue";
import Botao from "../shared/botao/Botao";
export default {
  components: {
    "meu-painel": Painel,
    "imagem-responsiva": ImagemResponsiva,
    "meu-botao": Botao
  },

  data() {
    return {
      titulo: "Alurapic",
      fotos: [],
      filtro: "",
      mensagem: ""
    };
  },

  computed: {
    fotosComFiltro() {
      if (this.filtro) {
        let exp = new RegExp(this.filtro.trim(), "i");
        return this.fotos.filter(foto => exp.test(foto.titulo));
      } else {
        return this.fotos;
      }
    }
  },

  created() {
    this.$http
      .get("v1/fotos")
      .then(res => res.json())
      .then(fotos => (this.fotos = fotos), err => console.log(err));
  },
  methods: {
    remove(foto) {
      this.$http.delete(`v1/fotos/${foto._id}`).then(
        () => {
          let indice = this.fotos.indexOf(foto);
          this.fotos.splice(indice, 1);
          this.mensagem = "Foto removida com sucesso";
        },
        err => {
          this.mensagem = "Não foi possível remover a foto";
          console.log(err);
        }
      );
    }
  }
};
</script>

<style>
.centralizado {
  text-align: center;
}

.lista-fotos {
  list-style: none;
}

.lista-fotos .lista-fotos-item {
  display: inline-block;
}

.filtro {
  display: block;
  width: 100%;
}
</style>
