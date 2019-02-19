import Vue from 'vue';

Vue.directive('transform', {

  bind(el, binding, vnode) {
    let current = 0;
    el.addEventListener('dblclick', function () {
      let increment = 90;
      let animate = false;

      if (binding.value) {
        increment = binding.value.increment
        animate = binding.value.animate

      }

      current += increment;
      this.style.transform = `rotate(${current}deg)`;
      if (animate) this.style.transition = "transform 0.7s";

    });
  }


});
