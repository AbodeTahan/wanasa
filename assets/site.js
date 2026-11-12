/* وَنّاسة · تفاعل الموقع */
(function(){
  var RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
  var top=document.querySelector('.topbar');
  function onScroll(){if(top)top.classList.toggle('scrolled',scrollY>12)}
  addEventListener('scroll',onScroll,{passive:true});onScroll();

  var b=document.getElementById('burger'),m=document.getElementById('menu');
  if(b&&m){b.addEventListener('click',function(){var o=m.classList.toggle('open');b.setAttribute('aria-expanded',o)});
    m.addEventListener('click',function(e){if(e.target.tagName==='A'){m.classList.remove('open');b.setAttribute('aria-expanded','false')}})}

  function ar(n){return Number(n).toLocaleString('ar-EG')}
  function count(el){var to=+el.dataset.count;if(RM||!to){el.textContent=ar(to);return}var t0=performance.now(),d=1400;
    (function f(t){var k=Math.min((t-t0)/d,1);el.textContent=ar(Math.round(to*(1-Math.pow(1-k,3))));if(k<1)requestAnimationFrame(f)})(t0)}
  var io='IntersectionObserver' in window?new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;
    e.target.classList.add('in');e.target.querySelectorAll('[data-count]').forEach(count);io.unobserve(e.target)})},{threshold:.12,rootMargin:'0px 0px -40px 0px'}):null;
  document.querySelectorAll('.reveal').forEach(function(el,i){if(io)io.observe(el);else el.classList.add('in')});

  document.addEventListener('pointermove',function(e){var c=e.target.closest&&e.target.closest('.card');if(!c)return;var r=c.getBoundingClientRect();
    c.style.setProperty('--mx',(e.clientX-r.left)+'px');c.style.setProperty('--my',(e.clientY-r.top)+'px')},{passive:true});
  document.addEventListener('pointerdown',function(e){var t=e.target.closest&&e.target.closest('.btn');if(!t||RM)return;var r=t.getBoundingClientRect(),d=Math.max(r.width,r.height)*2.2,s=document.createElement('span');
    s.className='ripple';s.style.cssText='width:'+d+'px;height:'+d+'px;left:'+(e.clientX-r.left-d/2)+'px;top:'+(e.clientY-r.top-d/2)+'px';t.appendChild(s);setTimeout(function(){s.remove()},650)});

  var art=document.querySelector('.hero-art');
  if(art&&!RM&&matchMedia('(hover:hover)').matches){var hero=art.closest('.hero');
    hero.addEventListener('pointermove',function(e){var r=art.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
      art.querySelectorAll('.mock').forEach(function(el,i){var k=(i+1)*6;el.style.transform='translate3d('+(x*k)+'px,'+(y*k)+'px,0) rotate('+(i===1?3:i===2?-3:-4)+'deg)'})});
    hero.addEventListener('pointerleave',function(){art.querySelectorAll('.mock').forEach(function(el){el.style.transform=''})})}

  var toc=document.querySelectorAll('.toc a');
  if(toc.length&&io){var so=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting)toc.forEach(function(a){a.classList.toggle('on',a.getAttribute('href')==='#'+e.target.id)})})},{rootMargin:'-40% 0px -55% 0px'});
    document.querySelectorAll('.legal section[id]').forEach(function(s){so.observe(s)})}

  if('serviceWorker' in navigator)addEventListener('load',function(){navigator.serviceWorker.register('sw.js').catch(function(){})});
})();
