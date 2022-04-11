
// gsap.to('#txt_1', { duration: 0.7, opacity: 1, ease: Power1.easeInOut, top: -20});
// gsap.to('#txt_2', { duration: 0.7, opacity: 1, ease: Power1.easeInOut, top: -20, delay: 0.8 });
// gsap.to('#cta', { duration: 0.7, opacity: 1, delay: 2.02 });

// const txt1Height = document.querySelector('#txt_1').offsetHeight;
// const txt2Height = document.querySelector('#txt_2').offsetHeight;
// const ctaHeight = document.querySelector('#cta').offsetHeight;

// gsap.set('#txt_1', { backgroundPosition: `center ${txt1Height}px` });
// gsap.set('#txt_2', { backgroundPosition: `center ${txt2Height}px` });
// gsap.set('#cta', { backgroundPosition: `center -${ctaHeight}px` });

gsap.to('#txt_1', { duration: 0.8, opacity: 1, top: 0, ease: Power1.easeInOut });
gsap.to('#txt_2', { duration: 0.8, opacity: 1, top: 0, ease: Power1.easeInOut, delay: 1 });
gsap.to('#cta', { duration: 0.8, opacity: 1, top: 0, ease: Power1.easeInOut, delay: 2 });

