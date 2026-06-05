/* ============================================================
   TANVI SHELKE — RESUME WEBSITE  |  script.js
   ============================================================ */

/* ── LOADER ── */
(function(){
  let p=0;
  const bar=document.getElementById('loaderProgress'), ldr=document.getElementById('loader');
  const t=setInterval(()=>{
    p+=Math.random()*12; if(p>=100){p=100;clearInterval(t);setTimeout(()=>ldr&&ldr.classList.add('hidden'),350);}
    if(bar) bar.style.width=p+'%';
  },100);
})();

/* ── CURSOR with card-hover boost ── */
const cur=document.getElementById('cursor'), ring=document.getElementById('cursorRing');
let mx=0,my=0,rx=0,ry=0;
if(cur&&ring){
  document.addEventListener('mousemove',e=>{
    mx=e.clientX; my=e.clientY;
    cur.style.left=mx-5+'px'; cur.style.top=my-5+'px';
  });
  (function loop(){
    rx+=(mx-rx-18)*.12; ry+=(my-ry-18)*.12;
    ring.style.left=rx+'px'; ring.style.top=ry+'px';
    requestAnimationFrame(loop);
  })();

  /* boosted highlight on cards */
  document.querySelectorAll('.skill-card,.project-card,.cert-card,.timeline-card,.pub-card,.contact-info-card').forEach(el=>{
    el.addEventListener('mouseenter',()=>{ cur.classList.add('on-card'); ring.classList.add('on-card'); });
    el.addEventListener('mouseleave',()=>{ cur.classList.remove('on-card'); ring.classList.remove('on-card'); });
  });
  document.querySelectorAll('a,button').forEach(el=>{
    el.addEventListener('mouseenter',()=>{ cur.style.transform='scale(1.6)'; ring.style.transform='scale(1.3)'; });
    el.addEventListener('mouseleave',()=>{ cur.style.transform=''; ring.style.transform=''; });
  });
}

/* ── CANVAS BG (slow, muted) ── */
const canvas=document.getElementById('bgCanvas');
if(canvas){
  const ctx=canvas.getContext('2d');
  const starC=['#00d4e8','#d4005a','#6a28c8','#04cc85','#d4a00a'];
  const orbC =['rgba(0,212,232,0.04)','rgba(212,0,90,0.03)','rgba(106,40,200,0.04)'];
  function resize(){canvas.width=window.innerWidth;canvas.height=window.innerHeight;}
  resize(); window.addEventListener('resize',resize);
  const stars=Array.from({length:160},()=>({x:Math.random()*canvas.width,y:Math.random()*canvas.height,r:Math.random()*1.2,speed:Math.random()*.1+.025,alpha:Math.random()*.45+.08}));
  const orbs=[{xF:.18,yF:.28,r:340,dx:.1,dy:.07},{xF:.78,yF:.62,r:380,dx:-.08,dy:.1},{xF:.52,yF:.82,r:300,dx:.06,dy:-.09}];
  orbs.forEach(o=>{o.x=canvas.width*o.xF;o.y=canvas.height*o.yF;});
  (function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    stars.forEach((s,i)=>{s.y-=s.speed;if(s.y<0){s.y=canvas.height;s.x=Math.random()*canvas.width;}ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);ctx.fillStyle=starC[i%starC.length];ctx.globalAlpha=s.alpha;ctx.fill();ctx.globalAlpha=1;});
    orbs.forEach((o,i)=>{o.x+=o.dx;o.y+=o.dy;if(o.x<-o.r||o.x>canvas.width+o.r)o.dx*=-1;if(o.y<-o.r||o.y>canvas.height+o.r)o.dy*=-1;const g=ctx.createRadialGradient(o.x,o.y,0,o.x,o.y,o.r);g.addColorStop(0,orbC[i]);g.addColorStop(1,'transparent');ctx.beginPath();ctx.arc(o.x,o.y,o.r,0,Math.PI*2);ctx.fillStyle=g;ctx.fill();});
    requestAnimationFrame(draw);
  })();
}

/* ── PARTICLES ── */
const pc=document.getElementById('particles');
if(pc){
  for(let i=0;i<18;i++){
    const p=document.createElement('div'); p.className='particle';
    p.style.cssText=`left:${Math.random()*100}vw;width:${Math.random()*3+1}px;height:${Math.random()*3+1}px;background:${['#00d4e8','#d4005a','#6a28c8','#04cc85','#d4a00a'][Math.floor(Math.random()*5)]};animation-duration:${Math.random()*22+14}s;animation-delay:${Math.random()*14}s;`;
    pc.appendChild(p);
  }
}

/* ── MOBILE MENU ── */
const hbg=document.getElementById('hamburger'), mm=document.getElementById('mobileMenu'), mo=document.getElementById('menuOverlay');
if(hbg){
  const open=()=>{hbg.classList.add('open');mm.classList.add('show');mo.classList.add('show');document.body.style.overflow='hidden';};
  const close=()=>{hbg.classList.remove('open');mm.classList.remove('show');mo.classList.remove('show');document.body.style.overflow='';};
  hbg.addEventListener('click',()=>mm.classList.contains('show')?close():open());
  mo.addEventListener('click',close);
  mm.querySelectorAll('a').forEach(a=>a.addEventListener('click',close));
}

/* ── ACTIVE NAV HIGHLIGHT (single-page scroll) ── */
const sections=document.querySelectorAll('section[id]');
const navLinks=document.querySelectorAll('.nav-links a[href^="#"]');
if(navLinks.length){
  const spy=new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        navLinks.forEach(a=>a.classList.remove('active'));
        const active=document.querySelector(`.nav-links a[href="#${e.target.id}"]`);
        if(active) active.classList.add('active');
      }
    });
  },{threshold:.35});
  sections.forEach(s=>spy.observe(s));
}

/* ── TYPEWRITER ── */
const phrases=['🚀 Deploying AI bots...','🧠 Training neural networks...','📊 Crafting powerful dashboards...','🤖 Building ML models...','💡 Extracting actionable insights...'];
let pi=0,ci=0,del=false;
const tw=document.getElementById('typewriter');
if(tw){
  function type(){
    const w=phrases[pi];
    tw.textContent=w.slice(0,del?--ci:++ci);
    if(!del&&ci===w.length){del=true;setTimeout(type,2400);return;}
    if(del&&ci===0){del=false;pi=(pi+1)%phrases.length;}
    setTimeout(type,del?42:75);
  }
  type();
}

/* ── SCROLL REVEAL ── */
const ro=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible');}),{threshold:.08});
document.querySelectorAll('.reveal').forEach(el=>ro.observe(el));

/* ── STATS COUNT ANIMATION ── */
function animCount(el,target,suffix,dur=1800){
  if(target==='∞'){el.textContent='∞';return;}
  const num=parseFloat(target); let start=null;
  (function step(ts){if(!start)start=ts;const pr=Math.min((ts-start)/dur,1),ease=1-Math.pow(1-pr,3);el.textContent=Math.floor(ease*num)+suffix;if(pr<1)requestAnimationFrame(step);else el.textContent=num+suffix;})(performance.now());
}
const statsObs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(!e.isIntersecting)return; statsObs.unobserve(e.target);
    e.target.querySelectorAll('.stat-number[data-count]').forEach(el=>animCount(el,el.dataset.count,el.dataset.suffix||''));
  });
},{threshold:.3});
document.querySelectorAll('.stats-section').forEach(s=>statsObs.observe(s));

/* ── CONTACT FORM (mailto fallback) ── */
const form=document.getElementById('contactForm');
if(form){
  form.addEventListener('submit',e=>{
    e.preventDefault();
    const name=form.querySelector('[name=name]').value;
    const subj=form.querySelector('[name=subject]').value;
    const msg =form.querySelector('[name=message]').value;
    window.location.href=`mailto:tanvishelke2112@gmail.com?subject=${encodeURIComponent(subj||'Portfolio Inquiry')}&body=${encodeURIComponent('Hi Tanvi,\n\n'+msg+'\n\n— '+name)}`;
  });
}
