
//slide up for size 300x250

const txt1Height = document.querySelector('#txt_1').offsetHeight;
const txt2Height = document.querySelector('#txt_2').offsetHeight;
const ctaHeight = document.querySelector('#cta').offsetHeight;

gsap.set('#txt_1', {opacity: 1,  backgroundPosition: `center ${txt1Height}px`});
gsap.set('#txt_2', {opacity: 1,  backgroundPosition: `center ${txt2Height}px`});
gsap.set('#cta', {opacity: 1,  backgroundPosition: `center -${ctaHeight}px`});

gsap.to('#txt_1', { duration: 0.8, backgroundPosition: 'center 0px', ease: Power1.easeInOut }); 
gsap.to('#txt_2', { duration: 0.8, backgroundPosition: 'center 0px', ease: Power1.easeInOut, delay: 1}); 
gsap.to('#cta', { duration: 0.8, backgroundPosition: 'center 0px', ease: Power1.easeInOut, delay: 2}); 


//slide up for 930x600 - TEST

// const txt1_url = window.getComputedStyle(document.getElementById("txt_1")).getPropertyValue('background-image').replace(/url\((['"])?(.*?)\1\)/gi, '$2');
// const txt2_url = window.getComputedStyle(document.getElementById("txt_2")).getPropertyValue('background-image').replace(/url\((['"])?(.*?)\1\)/gi, '$2');
// const cta_url = window.getComputedStyle(document.getElementById("cta")).getPropertyValue('background-image').replace(/url\((['"])?(.*?)\1\)/gi, '$2');

// const txt1_img = new Image();
// txt1_img.src = txt1_url;
// const txt1_img_height = txt1_img.height;
// console.log(txt1_img_height);

// const txt2_img = new Image();
// txt2_img.src = txt2_url;
// const txt2_img_height = txt2_img.height;
// console.log(txt2_img_height);

// const cta_img = new Image();
// cta_img.src = cta_url;
// const cta_img_height = cta_img.height;
// console.log(cta_img_height);

// gsap.set('#txt_1', { opacity: 1, height: `${txt1_img_height}px` });
// gsap.set('#txt_2', { opacity: 1, height: `${txt2_img_height}px` });
// gsap.set('#cta', { opacity: 1, height: `${cta_img_height}px` });

// gsap.to('#txt_1', { duration: 0.8, backgroundPosition: `center 0px`, ease: Power1.easeInOut });
// gsap.to('#txt_2', { duration: 0.8, backgroundPosition: `center 0px`, ease: Power1.easeInOut, delay: 1 });
// gsap.to('#cta', { duration: 0.8, backgroundPosition: `center 0px`, ease: Power1.easeInOut, delay: 2 }); 
