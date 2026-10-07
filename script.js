const nav=document.getElementById('nav'),btn=document.querySelector('.menu');
btn.addEventListener('click',()=>{const o=nav.classList.toggle('open');btn.setAttribute('aria-expanded',o)});
nav.addEventListener('click',e=>{if(e.target.tagName==='A'){nav.classList.remove('open');btn.setAttribute('aria-expanded',false)}});
const links=[...nav.querySelectorAll('a')];
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){links.forEach(l=>l.classList.toggle('on',l.getAttribute('href')==='#'+e.target.id))}}),{rootMargin:'-45% 0px -50% 0px'});
document.querySelectorAll('section[id]').forEach(s=>io.observe(s));
const tb=document.getElementById('top-btn');
addEventListener('scroll',()=>tb.classList.toggle('show',scrollY>400),{passive:true});
tb.addEventListener('click',()=>scrollTo({top:0,behavior:'smooth'}));
