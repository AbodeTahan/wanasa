/* وَنّاسة — حركة صفحات الموقع وتسجيل التطبيق */
(function(){
  var root=document.documentElement;root.classList.add('js');
  var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  var ar=function(n){return Number(n).toLocaleString('ar-EG')};

  // ظهور العناصر عند التمرير (العناصر الظاهرة أصلًا تبقى كما هي)
  if(!reduce&&'IntersectionObserver' in window){
    var els=[].slice.call(document.querySelectorAll('.reveal'));
    var io=new IntersectionObserver(function(entries){
      entries.forEach(function(e){if(e.isIntersecting){e.target.classList.remove('pending');io.unobserve(e.target)}});
    },{rootMargin:'0px 0px -8% 0px'});
    els.forEach(function(el,i){
      var r=el.getBoundingClientRect();
      if(r.top>innerHeight){el.classList.add('pending');el.style.transitionDelay=((i%4)*70)+'ms';io.observe(el)}
    });
  }

  // عدّاد الأرقام
  [].forEach.call(document.querySelectorAll('[data-count]'),function(el){
    var to=+el.getAttribute('data-count');if(reduce){el.textContent=ar(to);return}
    var t0=performance.now(),d=1300;
    (function f(t){var k=Math.min((t-t0)/d,1);el.textContent=ar(Math.round(to*(1-Math.pow(1-k,3))));if(k<1)requestAnimationFrame(f)})(t0);
  });

  // نسخ النصوص
  [].forEach.call(document.querySelectorAll('[data-copy]'),function(btn){
    btn.addEventListener('click',function(){
      var txt=btn.getAttribute('data-copy'),old=btn.textContent;
      var done=function(){btn.textContent='تم النسخ';setTimeout(function(){btn.textContent=old},1500)};
      try{navigator.clipboard.writeText(txt).then(done,function(){})}catch(e){}
    });
  });

  // تثبيت كتطبيق على الجوال
  if('serviceWorker' in navigator&&location.protocol==='https:'){
    try{navigator.serviceWorker.register('sw.js').catch(function(){})}catch(e){}
  }
})();
