const header=document.querySelector('.site-header');
const toggle=document.querySelector('.menu-toggle');
const nav=document.querySelector('.site-nav');
if(header) window.addEventListener('scroll',()=>header.classList.toggle('scrolled',window.scrollY>10),{passive:true});
if(toggle&&nav){
 const scrim=document.createElement('div');scrim.className='nav-scrim';scrim.setAttribute('aria-hidden','true');header.after(scrim);
 const indicator=document.createElement('span');indicator.className='nav-indicator';indicator.setAttribute('aria-hidden','true');nav.prepend(indicator);
 const active=nav.querySelector('[aria-current="page"]');
 const moveIndicator=link=>{if(!link)return;indicator.style.transform='translateY('+(link.offsetTop+12)+'px)';indicator.style.height=Math.max(12,link.offsetHeight-24)+'px';};
 nav.classList.add('has-indicator');
 nav.addEventListener('pointerover',e=>{const link=e.target.closest('a');if(link&&e.pointerType!=='touch')moveIndicator(link);});
 nav.addEventListener('pointerleave',()=>moveIndicator(active));
 nav.addEventListener('focusin',e=>{if(e.target.matches('a'))moveIndicator(e.target);});
 nav.addEventListener('focusout',e=>{if(!nav.contains(e.relatedTarget))moveIndicator(active);});
 window.addEventListener('resize',()=>moveIndicator(active));

 const setOpen=(open,restore=false)=>{nav.classList.toggle('open',open);nav.inert=!open;scrim.classList.toggle('is-visible',open);if(open)moveIndicator(active);toggle.setAttribute('aria-expanded',String(open));toggle.querySelector('.sr-only').textContent=open?'Close navigation':'Open navigation';if(restore)toggle.focus();};
 setOpen(false);document.documentElement.classList.add('js-nav');
 toggle.addEventListener('click',()=>setOpen(!nav.classList.contains('open')));
 document.addEventListener('pointerdown',e=>{if(nav.classList.contains('open')&&!nav.contains(e.target)&&!toggle.contains(e.target))setOpen(false,nav.contains(document.activeElement));});
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav.classList.contains('open'))setOpen(false,true);});
 nav.addEventListener('focusout',e=>{if(e.relatedTarget&&!nav.contains(e.relatedTarget)&&e.relatedTarget!==toggle)setOpen(false);});
 window.addEventListener('pageshow',()=>setOpen(false));
}
const year=document.getElementById('year');if(year)year.textContent=new Date().getFullYear();
const form=document.getElementById('demo-form');if(form)form.addEventListener('submit',e=>e.preventDefault());
