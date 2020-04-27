export const clickOutside= {
  bind(el, binding, vnode) {
    el.fisrtClick = true
    el.clickOutsideEvent = function(event) {
      if(el.fisrtClick === true) {
        el.fisrtClick = false;
        return false;
      }

      if(!(el === event.target || el.contains(event.target))) {
        el.fisrtClick = false;
        vnode.context[binding.expression](event);
      }
    }

    document.body.addEventListener('click', el.clickOutsideEvent)
  },
  unbind(el) {
    document.body.removeEventListener('click', el.clickOutsideEvent)
  }
};
