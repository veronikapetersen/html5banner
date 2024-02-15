const txt1Height = document.querySelector('#txt_1').offsetHeight;
const txt2Height = document.querySelector('#txt_2').offsetHeight;
const ctaHeight = document.querySelector('#cta').offsetHeight;

gsap.set('#txt_1', {opacity: 1,  backgroundPosition: `center ${txt1Height}px`});
gsap.set('#txt_2', {opacity: 1,  backgroundPosition: `center ${txt2Height}px`});
gsap.set('#cta', {opacity: 1,  backgroundPosition: `center -${ctaHeight}px`});

gsap.to('#txt_1', { duration: 0.8, backgroundPosition: 'center 0px', ease: Power1.easeInOut }); 
gsap.to('#txt_2', { duration: 0.8, backgroundPosition: 'center 0px', ease: Power1.easeInOut, delay: 1}); 
gsap.to('#cta', { duration: 0.8, backgroundPosition: 'center 0px', ease: Power1.easeInOut, delay: 2}); 