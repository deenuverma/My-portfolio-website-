/* Original vanilla-JS portfolio template. No build tools or dependencies. */
(() => {
  'use strict';
  const c=window.PORTFOLIO;if(!c)return;
  const $=id=>document.getElementById(id),make=(tag,text,cls)=>{const el=document.createElement(tag);if(text!==undefined)el.textContent=text;if(cls)el.className=cls;return el};
  const safeUrl=(value,images=false)=>{if(!value||typeof value!=='string')return '';if(images&&/^data:image\/(png|jpe?g|webp);base64,/i.test(value))return value;try{const u=new URL(value,location.href);return ['http:','https:','mailto:','file:'].includes(u.protocol)?value:''}catch{return ''}};
  const link=(text,href,cls='button glass')=>{const a=make('a',text,cls);a.href=safeUrl(href)||'#';if(/^https?:/.test(a.href)){a.target='_blank';a.rel='noopener noreferrer'}return a};
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches,fine=matchMedia('(pointer: fine)').matches;
  if(/^#[0-9a-f]{6}$/i.test(c.accent||''))document.documentElement.style.setProperty('--accent',c.accent);
  document.title=c.name+' | Portfolio';document.querySelector('meta[name="description"]').content=c.intro||'';
  const alternate=new URLSearchParams(location.search).get('portrait')==='2';const portrait=safeUrl(alternate?c.alternatePortrait:c.portrait,true)||'assets/portrait.svg';
  ['hero-photo','about-photo'].forEach(id=>{$(id).src=portrait;$(id).alt='Portrait of '+c.name});
  document.querySelector('#opening img').src=portrait;document.querySelector('#opening img').alt='Portrait of '+c.name;
  document.querySelector('.opening-title h1').textContent=c.firstName||c.name;
  $('hero-name').textContent=c.firstName||c.name;$('hero-role').textContent=c.role;$('floating-role').textContent=c.role;$('hero-location').textContent=c.location;$('hero-intro').textContent=c.intro;$('about-copy').textContent=c.about;$('contact-name').textContent=c.name+' · '+c.role;
  $('portrait-switch').href='?portrait='+(alternate?'1':'2');$('portrait-switch').hidden=true;
  $('copyright').textContent='© '+new Date().getFullYear()+' '+c.name;
  if(safeUrl(c.resume)){$('resume-link').hidden=false;$('resume-link').href=c.resume;$('resume-link').target='_blank';$('resume-link').rel='noopener noreferrer'}
  const skillDescriptions={
    'HTML':'Arey wah, HTML! Yeh web development ki pyari si neenv hai, jisse khoobsurat web pages bante hain!',
    'HTML5 & CSS3':'HTML5 aur CSS3! Modern web development aur pyaari styling ka super combo!',
    'CSS':'CSS! Isse websites me khoobsurat colors, elegant designs aur stylish layouts aate hain!',
    'JavaScript':'JavaScript! Web pages me jaan daalti hai, interactive buttons aur dynamic magic banati hai!',
    'React':'React JS! Deenu Verma ka favourite framework, super fast aur modern apps banane ke liye!',
    'Node.js':'Node.js! Powerful, fast aur scalable backend systems ke liye!',
    'Express.js':'Express.js! Lightweight aur super smooth backend web framework!',
    'Tailwind CSS':'Tailwind CSS! Modern utility classes aur clean aesthetic styling ke liye Deenu ka best tool!',
    'Python':'Python! Coding, problem solving aur Artificial Intelligence ki bohot hi pyari aur smart language!',
    'Java':'Java! Strong object-oriented programming aur high performance logic!',
    'Data Structures & Algorithms':'DSA! Computer science ke strong fundamentals aur sharp problem solving skills!',
    'Reels Editing':'Reels Editing! Viral, creative aur super engaging short-form videos ka kamaal!',
    'Podcast Editing':'Podcast Editing! Studio quality crisp audio aur seamless visual storytelling!',
    'CapCut':'CapCut! Trending transitions, aesthetic effects aur fast video editing toolkit!',
    'VN':'VN Video Editor! High performance mobile video editing aur cinematic cuts!',
    'Filmora':'Filmora! Creative visual effects, smooth transitions aur visual magic!',
    'Graphic Design':'Graphic Design! Clean branding, stylish posters aur aesthetic digital visuals!',
    'AI Graphic Design':'AI Graphic Design: Generative AI, Canva aur Photoshop!',
    'Canva':'Canva! Quick creative designs, presentations aur social media marketing graphics!',
    'Photoshop':'Photoshop! Professional photo manipulation aur studio grade visuals!',
    'ChatGPT':'ChatGPT! Creative prompt engineering aur smart AI workflows!',
    'Gemini':'Google Gemini! Multimodal AI solutions aur intelligent research!',
    'Claude':'Claude AI! Deep reasoning aur advanced code analysis!'
  };
  function getSkillSpeech(s){return skillDescriptions[s]||(`Arey wah, ${s}! Deenu Verma ka bohot hi shandaar technical skill!`);}

  let voiceEnabled=true;
  function playClick(){try{const C=window.AudioContext||window.webkitAudioContext;if(!C)return;const c=new C(),o=c.createOscillator(),g=c.createGain();o.type='sine';o.frequency.setValueAtTime(800,c.currentTime);o.frequency.exponentialRampToValueAtTime(380,c.currentTime+0.05);g.gain.setValueAtTime(0.1,c.currentTime);g.gain.exponentialRampToValueAtTime(0.001,c.currentTime+0.05);o.connect(g);g.connect(c.destination);o.start();o.stop(c.currentTime+0.05)}catch(e){}}

  function pickVoice(vs){
    if(!vs||!vs.length)return null;
    const mm=vs.find(v=>{const n=v.name.toLowerCase();return n.includes('maple')||n.includes('milly')||n.includes('millie')});
    if(mm)return mm;
    const ind=vs.find(v=>{const n=v.name.toLowerCase();return (v.lang==='hi-IN'||v.lang==='en-IN'||v.lang.startsWith('hi'))&&(n.includes('swara')||n.includes('neerja')||n.includes('heera')||n.includes('veena')||n.includes('kavya')||n.includes('female'))});
    if(ind)return ind;
    const fem=vs.find(v=>{const n=v.name.toLowerCase();return n.includes('google हिन्दी')||n.includes('jenny')||n.includes('aria')||n.includes('samantha')||n.includes('lekha')||n.includes('female')});
    if(fem)return fem;
    return vs.find(v=>v.lang==='hi-IN'||v.lang==='en-IN')||vs[0];
  }

  function speak(t){
    playClick();
    if(!voiceEnabled||!('speechSynthesis'in window))return;
    try{
      window.speechSynthesis.cancel();
      const u=new SpeechSynthesisUtterance(t);
      const vs=window.speechSynthesis.getVoices();
      const p=pickVoice(vs);
      if(p)u.voice=p;
      u.pitch=1.15;
      u.rate=0.92;
      u.volume=1.0;
      window.speechSynthesis.speak(u);
    }catch(e){}
  }

  (c.skills||[]).forEach(s=>{
    const sp=make('span',s);
    sp.style.cursor='pointer';
    sp.onclick=()=>speak(getSkillSpeech(s));
    $('skills').append(sp);
  });
  (c.services||[]).forEach((s,i)=>{const a=make('article',undefined,'service-card tilt');a.append(make('span',String(i+1).padStart(2,'0'),'number'),make('h3',s.title),make('p',s.detail));a.style.cursor='pointer';a.onclick=()=>speak(s.title+': '+s.detail);$('service-grid').append(a)});

  $('resume-name').textContent=c.name;
  (c.education||[]).forEach(e=>{const article=make('article');article.append(make('h5',e.school),make('p',[e.degree,e.period].filter(Boolean).join(' · ')));$('education-list').append(article)});
  if(!(c.education||[]).length)$('education-list').append(make('p','Add your school, college or university in the customizer.'));
  (c.projects||[]).forEach(p=>{const article=make('article');article.append(make('h5',p.title),make('p',(p.stack||[]).join(', ')));$('resume-projects').append(article)});
  (c.skills||[]).forEach(skill=>{const chip=make('span',skill);chip.style.cursor='pointer';chip.onclick=()=>speak(getSkillSpeech(skill));$('resume-skills').append(chip);const card=make('article',undefined,'service-card tilt');card.style.cursor='pointer';card.onclick=()=>speak(getSkillSpeech(skill));card.append(make('span','TECHNICAL TOOLKIT','eyebrow'),make('h3',skill));$('toolkit-grid').append(card)});

  const pd=$('project-dialog');
  function openProject(p){speak('Project: '+p.title);$('project-category').textContent=p.category;$('project-title').textContent=p.title;$('project-description').textContent=p.description;['project-stack','project-features','project-links'].forEach(id=>$(id).replaceChildren());(p.stack||[]).forEach(s=>$('project-stack').append(make('span',s)));(p.features||[]).forEach(f=>$('project-features').append(make('li',f)));if(safeUrl(p.demo))$('project-links').append(link('Launch Demo ↗',p.demo,'button primary'));if(safeUrl(p.github))$('project-links').append(link('Source ↗',p.github));pd.showModal()}
  (c.projects||[]).forEach(p=>{const b=make('button',undefined,'project-card tilt');b.type='button';b.setAttribute('aria-label','Open '+p.title);b.style.setProperty('--card-accent',/^#[0-9a-f]{6}$/i.test(p.accent)?p.accent:'#ed2444');b.append(make('span',p.category),make('h3',p.title),make('p',p.description),make('small','▶ Explore project'));b.onclick=()=>openProject(p);$('project-rail').append(b)});
  document.querySelectorAll('[data-rail]').forEach(b=>b.onclick=()=>$('project-rail').scrollBy({left:Number(b.dataset.rail)*$('project-rail').clientWidth*.75,behavior:reduced?'instant':'smooth'}));
  function season(i){const s=c.journey[i];if(!s)return;document.querySelectorAll('#journey-tabs button').forEach((b,n)=>{b.setAttribute('aria-selected',String(i===n));b.tabIndex=i===n?0:-1});$('journey-panel').replaceChildren(make('span',s.period,'eyebrow'),make('h3',s.title),make('p',s.detail));$('journey-panel').setAttribute('aria-labelledby','season-'+i)}
  (c.journey||[]).forEach((s,i)=>{const b=make('button','S'+String(i+1).padStart(2,'0')+' · '+s.title);b.id='season-'+i;b.type='button';b.setAttribute('role','tab');b.setAttribute('aria-controls','journey-panel');b.onclick=()=>{speak('Approach: '+s.title);season(i);};b.onkeydown=e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();const next=(i+(e.key==='ArrowRight'?1:-1)+c.journey.length)%c.journey.length;season(next);$('season-'+next).focus()}};$('journey-tabs').append(b)});season(0);
  (c.milestones||[]).forEach(m=>{const a=make('article',undefined,'service-card');a.append(make('span',m.organization,'eyebrow'),make('h3',m.title),make('p',m.detail));a.onclick=()=>speak(m.title+': '+m.detail);$('milestone-grid').append(a)});
  (c.credentials||[]).forEach(m=>{if(safeUrl(m.url))$('credential-list').append(link(m.title+' ↗',m.url,''))});
  if(!(c.milestones||[]).length&&!(c.credentials||[]).length)$('moments').hidden=true;
  const contacts=[
    ['WhatsApp',c.links?.whatsapp,'Aap Deenu se contact karna chahte ho? WhatsApp par pyara sa message bhej dijiye!'],
    ['Email',c.email?'mailto:'+c.email:'','Aap Deenu se contact karna chahte ho? Unhe direct email bhejiye — deenuverma238@gmail.com par, woh zaroor reply karenge!'],
    ['YouTube',c.links?.youtube,'Aap Deenu se judna chahte ho? Unke Deenu Ki Awaaz YouTube channel par 13 lakh se zyada logo ka pyaar mila hai! Subscribe zaroor kijiye!'],
    ['Instagram',c.links?.instagram,'Aap Deenu se contact karna chahte ho? Instagram par unhe follow karke pyara sa DM bhej dijiye!'],
    ['LinkedIn',c.links?.linkedin,'Aap Deenu Verma se connect karna chahte ho? LinkedIn par unka professional network join kijiye!'],
    ['GitHub',c.links?.github,'Deenu Verma ke GitHub open source projects explore kijiye!']
  ];
  contacts.forEach(([name,url,msg])=>{if(safeUrl(url)){const l=link(name+' ↗',url);l.onclick=()=>speak(msg);$('contact-links').append(l)}});
  if($('contact'))$('contact').querySelector('h2').onclick=()=>speak('Aap Deenu se contact karna chahte ho? Bohot accha laga! Niche diye gaye email ya social links par connect kijiye!');
  const chapters=[['about','The Pilot','About Deenu Verma'],['services','Services','Deenu Verma ki services: Full Stack, Video Editing aur AI Design'],['work','Projects','Deenu Verma ke projects: Nova AI, Deenu Ki Awaaz aur 3D Portfolio'],['journey','How I Work','Deenu Verma ka development workflow'],['moments','Community','1.3 million views community milestone'],['contact','Connect','Contact karna chahte ho? Email ya social links par connect kijiye!']];
  chapters.filter(([id])=>!$(id).hidden).forEach(([id,name,narrate],i)=>{const a=make('a');a.href='#'+id;a.dataset.section=id;a.append(make('span','EPISODE '+String(i+1).padStart(2,'0')),make('b',name));a.onclick=()=>speak(narrate);$('chapter-links').append(a)});
  const open=$('opening'),profiles=$('profiles');let opener;
  function stage(which){document.querySelectorAll('header,main,footer').forEach(el=>el.inert=which!=='home');open.hidden=which!=='opening';profiles.hidden=which!=='profiles';document.body.style.overflow=which==='home'?'':'hidden';if(which==='profiles')profiles.querySelector('button').focus()}
  const vt=$('voice-toggle');
  if(vt){vt.onclick=()=>{voiceEnabled=!voiceEnabled;vt.textContent=voiceEnabled?'🔊 Awaaz: ON':'🔇 Awaaz: OFF';if(!voiceEnabled&&'speechSynthesis'in window)window.speechSynthesis.cancel();playClick();}}
  document.querySelector('.skip-intro').onclick=()=>{playClick();stage('profiles')};
  document.querySelector('.play-start').onclick=()=>{playClick();stage('profiles')};
  $('replay').onclick=()=>{opener=document.activeElement;stage('opening');open.querySelector('.skip-intro').focus()};
  const orders={main:['about','services','work','journey','moments'],recruiter:['work','about','journey','services','moments'],developer:['work','services','about','journey','moments'],creative:['journey','work','about','moments','services']};
  document.querySelectorAll('[data-profile]').forEach(b=>b.onclick=()=>{stage('home');const target={main:'top',developer:'work',creative:'services',recruiter:'profile'}[b.dataset.profile];document.getElementById(target).scrollIntoView({behavior:reduced?'instant':'smooth'});$('play-intro').focus({preventScroll:true})});stage('opening');
  document.addEventListener('keydown',e=>{if(!open.hidden&&(e.key==='Enter'||e.key==='Escape')){e.preventDefault();stage('profiles')}else if(!profiles.hidden&&e.key==='Escape'){stage('home');$('play-intro').focus()}});
  $('menu-toggle').onclick=()=>{const n=document.querySelector('nav');const expanded=n.classList.toggle('open');$('menu-toggle').setAttribute('aria-expanded',String(expanded))};document.querySelectorAll('nav a').forEach(a=>a.onclick=()=>{document.querySelector('nav').classList.remove('open');$('menu-toggle').setAttribute('aria-expanded','false')});
  document.querySelectorAll('dialog').forEach(d=>{d.querySelector('.close').onclick=()=>d.close();d.addEventListener('click',e=>{if(e.target!==d)return;const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close()})});
  const slides=[{title:c.name,text:c.intro},...(c.projects||[]).map(p=>({title:p.title,text:p.category+' · '+p.description})),{title:'Let’s connect',text:c.role+' · '+c.location}];let slide=0,paused=false,timer;
  function showSlide(){const s=slides[slide];$('slide-count').textContent=String(slide+1).padStart(2,'0')+' / '+String(slides.length).padStart(2,'0');$('slide-title').textContent=s.title;$('slide-text').textContent=s.text}
  function startTimer(){clearInterval(timer);if(!reduced&&!paused)timer=setInterval(()=>{slide=(slide+1)%slides.length;showSlide()},5000)}
  $('play-intro').onclick=()=>{slide=0;paused=reduced;$('slide-pause').textContent=paused?'Play':'Pause';showSlide();$('intro-dialog').showModal();startTimer()};$('intro-dialog').addEventListener('close',()=>clearInterval(timer));
  $('slide-next').onclick=()=>{slide=(slide+1)%slides.length;showSlide();startTimer()};$('slide-prev').onclick=()=>{slide=(slide-1+slides.length)%slides.length;showSlide();startTimer()};$('slide-pause').onclick=()=>{paused=!paused;$('slide-pause').textContent=paused?'Play':'Pause';startTimer()};$('intro-dialog').onkeydown=e=>{if(e.key==='ArrowRight'){$('slide-next').click();e.preventDefault()}if(e.key==='ArrowLeft'){$('slide-prev').click();e.preventDefault()}if(e.code==='Space'&&e.target.tagName!=='BUTTON'){$('slide-pause').click();e.preventDefault()}};
  if('IntersectionObserver'in window){const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');const a=document.querySelector(`[data-section="${e.target.id}"]`);a?.classList.add('seen')}}),{threshold:.12});document.querySelectorAll('.chapter').forEach(e=>{if(!reduced)e.classList.add('reveal-ready');io.observe(e)})}
  if(fine&&!reduced){const cursor=$('cursor');document.addEventListener('pointermove',e=>{cursor.style.left=e.clientX+'px';cursor.style.top=e.clientY+'px';cursor.classList.toggle('active',Boolean(e.target.closest('button,a')))});document.querySelector('.hero').addEventListener('pointermove',e=>{const x=e.clientX/innerWidth-.5,y=e.clientY/innerHeight-.5;$('hero-photo').style.transform=`perspective(1200px) rotateY(${x*6}deg) rotateX(${-y*4}deg) translateX(${x*12}px)`});document.querySelectorAll('.tilt').forEach(el=>{el.addEventListener('pointermove',e=>{const r=el.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;el.style.transform=`perspective(1200px) rotateY(${x*9}deg) rotateX(${-y*9}deg)`});el.addEventListener('pointerleave',()=>el.style.transform='')})}
})();
