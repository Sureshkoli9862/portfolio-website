const nav=document.getElementById('nav'),btn=document.querySelector('.menu');
btn.addEventListener('click',()=>{const o=nav.classList.toggle('open');btn.setAttribute('aria-expanded',o)});
nav.addEventListener('click',e=>{if(e.target.tagName==='A'){nav.classList.remove('open');btn.setAttribute('aria-expanded',false)}});
const links=[...nav.querySelectorAll('a')];
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){links.forEach(l=>l.classList.toggle('on',l.getAttribute('href')==='#'+e.target.id))}}),{rootMargin:'-45% 0px -50% 0px'});
document.querySelectorAll('section[id]').forEach(s=>io.observe(s));
const tb=document.getElementById('top-btn');
addEventListener('scroll',()=>tb.classList.toggle('show',scrollY>400),{passive:true});
tb.addEventListener('click',()=>scrollTo({top:0,behavior:'smooth'}));
const tf=document.getElementById('tform');
if(tf){
 const $=id=>document.getElementById(id);
 const msg=tf.elements.message,wc=$('wc'),dlg=$('msgdlg'),sb=tf.querySelector('[type=submit]');
 const OK='<svg viewBox="0 0 52 52"><path class="ck" d="M14 27l8 8 16-17"/></svg>';
 const BAD='<svg viewBox="0 0 52 52"><path d="M26 14v16M26 38v.5"/></svg>';
 let hideT;
 const count=s=>s.trim()?s.trim().split(/\s+/).length:0;
 const show=(ok,title,text,rows,mail)=>{
  dlg.className='msgdlg '+(ok?'ok':'err');
  $('mdi').innerHTML=ok?OK:BAD;$('mdt').textContent=title;$('mdp').textContent=text;
  const dl=$('mdl');dl.textContent='';dl.hidden=!rows||!rows.length;
  (rows||[]).forEach(([k,v])=>{const r=document.createElement('div'),a=document.createElement('dt'),b=document.createElement('dd');a.textContent=k;b.textContent=v;r.append(a,b);dl.append(r)});
  const m=$('mdmail');m.hidden=ok;if(!ok)m.href=mail;
  $('mdok').textContent=ok?'Done':'Close';
  document.querySelector('#msgdlg .mda').hidden=ok;
  clearTimeout(hideT);
  if(typeof dlg.showModal==='function'){if(!dlg.open)dlg.showModal()}else alert(title+'\n'+text);
  if(ok)hideT=setTimeout(()=>{if(dlg.open)dlg.close()},4000);
 };
 msg.addEventListener('input',()=>{wc.textContent=count(msg.value)+' words'});
 ['mdok','mdx'].forEach(id=>$(id).addEventListener('click',()=>dlg.close()));
 dlg.addEventListener('click',e=>{if(e.target===dlg)dlg.close()});
 tf.addEventListener('submit',async e=>{
  e.preventDefault();
  if(sb.disabled)return;
  const d=Object.fromEntries(new FormData(tf));
  const mail='mailto:sureshkoli9862@gmail.com?subject='+encodeURIComponent(d.subject)+'&body='+encodeURIComponent(['Name: '+d.name,'Email: '+d.email,'Phone: '+(d.phone||'-'),'Address: '+(d.address||'-'),'',d.message].join('\n'));
  const payload={name:d.name,email:d.email,phone:d.phone||'-',address:d.address||'-',subject:d.subject,message:d.message,_subject:'New portfolio message: '+d.subject,_replyto:d.email,_template:'table',_captcha:'false'};
  sb.disabled=true;sb.textContent='Submitting…';
  await new Promise(r=>setTimeout(r,2000));
  const ctrl=new AbortController(),timer=setTimeout(()=>ctrl.abort(),20000);
  try{
   const r=await fetch('https://formsubmit.co/ajax/sureshkoli9862@gmail.com',{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify(payload),signal:ctrl.signal});
   const j=await r.json().catch(()=>({}));
   if(!r.ok||String(j.success)!=='true')throw new Error(j.message||'failed');
   show(true,'Message submitted','Your message has been submitted successfully. Thank you, '+d.name+'!',null);
   tf.reset();wc.textContent='0 words';
  }catch(err){
   const act=/activat/i.test(err.message||'');
   show(false,'Message not sent',act?'This form needs a one-time activation. Open the email from FormSubmit in sureshkoli9862@gmail.com, click the activation link, then send again.':'Something went wrong while sending. Check your connection and try again, or send it from your email app.',null,mail);
  }finally{clearTimeout(timer);sb.disabled=false;sb.textContent='Submit'}
 });
}

const ph=document.querySelector('.left .photo'),hp=document.querySelector('.hept');
if(ph&&hp&&!matchMedia('(prefers-reduced-motion:reduce)').matches){
 ph.addEventListener('pointermove',e=>{
  const r=hp.getBoundingClientRect(),x=Math.min(1,Math.max(0,(e.clientX-r.left)/r.width)),y=Math.min(1,Math.max(0,(e.clientY-r.top)/r.height));
  ph.classList.add('live');
  hp.style.setProperty('--ry',((x-.5)*18)+'deg');hp.style.setProperty('--rx',((.5-y)*16)+'deg');
  hp.style.setProperty('--gx',(x*100)+'%');hp.style.setProperty('--gy',(y*100)+'%');
 });
 ph.addEventListener('pointerleave',()=>{ph.classList.remove('live');['--rx','--ry','--gx','--gy'].forEach(k=>hp.style.removeProperty(k))});
}

/* CV popup: opens the CV image with a download option */
(()=>{
 const cvBtn=document.querySelector('.hero-cta .cv'),dlg=document.getElementById('cvdlg');
 if(!cvBtn||!dlg||typeof dlg.showModal!=='function')return;
 cvBtn.removeAttribute('target');
 cvBtn.addEventListener('click',e=>{e.preventDefault();dlg.showModal()});
 dlg.querySelectorAll('[data-close]').forEach(b=>b.addEventListener('click',()=>dlg.close()));
 dlg.addEventListener('click',e=>{if(e.target===dlg)dlg.close()});
})();

(function(){
 document.querySelectorAll('.cert-up img').forEach(function(img){
  img.addEventListener('click',function(){
   var o=document.createElement('div');o.className='up-lb';o.innerHTML='<img alt="">';o.firstChild.src=img.src;
   function close(){o.remove();document.removeEventListener('keydown',k)}
   function k(e){if(e.key==='Escape')close()}
   o.addEventListener('click',close);document.addEventListener('keydown',k);document.body.appendChild(o);
  });
 });
})();

(function(){
 var cards=document.querySelectorAll('.offer,#skills .skill');
 if(!('IntersectionObserver' in window)||!cards.length)return;
 document.documentElement.classList.add('anim');
 var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.25});
 cards.forEach(function(c,i){c.style.transitionDelay='';c.querySelector('p').style.transitionDelay=(i%5)*0.12+0.2+'s';io.observe(c)});
})();
