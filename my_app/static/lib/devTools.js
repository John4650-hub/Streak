const  el = document.createElement('div');
document.body.appendChild(el);
async function loadEruda(){
  await eruda.init({
    container:el,
    tools: ['console',"elements"],
    useShadowDom: true,
    autoScale: true,
    defaults:{
      displaySize: 100,
      transparency: 1,
      theme: 'Dracula'
    }
  });
}
loadEruda();

