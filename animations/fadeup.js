const txt1_top_org = document.styleSheets[0].cssRules[3].style.getPropertyValue('top');
const txt1_top_new = parseFloat(txt1_top_org.match(/\d+/g)) + parseFloat(10);

const txt2_top_org = document.styleSheets[0].cssRules[4].style.getPropertyValue('top');
const txt2_top_new = parseFloat(txt2_top_org.match(/\d+/g)) + parseFloat(10);

gsap.set('#txt_1', {opacity: 0, top: `${txt1_top_new}%`});
gsap.set('#txt_2', {opacity: 0, top: `${txt2_top_new}%`});
gsap.set('#cta', {opacity: 0});

gsap.to('#txt_1', { duration: 0.7, opacity: 1, top: `${txt1_top_org}`, ease: Power1.easeInOut });
gsap.to('#txt_2', { duration: 0.7, opacity: 1, top: `${txt2_top_org}`, ease: Power1.easeInOut, delay: 0.7 });
gsap.to('#cta', { duration: 0.7, opacity: 1, ease: Power1.easeInOut, delay: 1.4 });