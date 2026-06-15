// lowearthorbit.cc — shared interactions
(function(){
  // year
  var y=document.getElementById('year'); if(y) y.textContent=new Date().getFullYear();

  // liquid-glass cursor glare: feed pointer position into CSS vars
  document.querySelectorAll('.glass').forEach(function(el){
    el.addEventListener('pointermove',function(e){
      var r=el.getBoundingClientRect();
      el.style.setProperty('--mx',((e.clientX-r.left)/r.width*100)+'%');
      el.style.setProperty('--my',((e.clientY-r.top)/r.height*100)+'%');
    });
  });

  // scroll reveal
  var io=new IntersectionObserver(function(es){
    es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
  },{threshold:.14});
  document.querySelectorAll('.reveal').forEach(function(el,i){
    el.style.transitionDelay=((i%3)*70)+'ms'; io.observe(el);
  });

  // subtle parallax on ambient orbs
  var orbs=document.querySelectorAll('.bg-orb');
  if(matchMedia('(pointer:fine)').matches){
    window.addEventListener('pointermove',function(e){
      var dx=(e.clientX/innerWidth-.5), dy=(e.clientY/innerHeight-.5);
      orbs.forEach(function(o,i){ var f=(i+1)*8; o.style.translate=(dx*f)+'px '+(dy*f)+'px'; });
    });
  }
})();
