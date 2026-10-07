
(function(){
  const $=(s,r=document)=>r.querySelector(s);
  const $$=(s,r=document)=>Array.from(r.querySelectorAll(s));

  // Mobile navigation for the static export.
  const header=$('.site-header');
  const trigger=$('.corm-mobile-trigger');
  if(header && trigger){
    trigger.addEventListener('click',()=>{
      const open=header.classList.toggle('mobile-open');
      trigger.setAttribute('aria-expanded',String(open));
      trigger.setAttribute('aria-label',open?'Close menu':'Open menu');
    });
    $$('.corm-mobile-nav a').forEach(a=>a.addEventListener('click',()=>header.classList.remove('mobile-open')));
  }

  // Static-hosting friendly contact/partnership forms. They open the visitor's email client
  // rather than depending on Base44's backend. No visitor data is sent to this site.
  function mailto(form, subject, body){
    const email='collegeofrelationship@gmail.com';
    const url='mailto:'+email+'?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body);
    window.location.href=url;
    let note=$('.form-success',form);
    if(!note){ note=document.createElement('p'); note.className='form-success'; form.appendChild(note); }
    note.textContent='Your email application should now open with your message prepared for CORM. If it does not, please email collegeofrelationship@gmail.com directly.';
  }

  $$('.inquiry-form').forEach(form=>{
    form.addEventListener('submit',e=>{
      e.preventDefault();
      const inputs=$$('input, textarea',form);
      const values=inputs.map(i=>({label:(i.closest('label')?.querySelector('span')?.textContent||i.placeholder||'Field').trim(),value:i.value.trim()})).filter(x=>x.value);
      const isPartner=location.pathname.toLowerCase().includes('partnership');
      const subject=isPartner?'CORM Partnership Enquiry':'CORM Website Enquiry';
      const body=values.map(x=>x.label+': '+x.value).join('\n\n');
      mailto(form,subject,body);
    });
  });

  // Consultation request currently exported by Base44 as a single-name first step.
  // Preserve that content while making the step useful on a static host.
  $$('.step-form').forEach(form=>{
    form.addEventListener('submit',e=>{
      e.preventDefault();
      const input=$('#step-input',form);
      if(!input || !input.value.trim()) return;
      const subject='CORM Consultation Request';
      const body='Full name: '+input.value.trim()+'\n\nI would like to begin a consultation request with CORM. Please contact me using the details I provide in your reply.';
      mailto(form,subject,body);
    });
  });
})();
