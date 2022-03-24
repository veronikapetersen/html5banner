
var tl = new TimelineMax({repeat:-1}),
loop = 0;
loopMax = 4;

tl
.from("#txt_1", .8, {y: -50, opacity:0, ease: Power3.easeOut})
.from("#txt_2", .8, {y: 50, opacity:0, ease: Power3.easeOut}, "-=.4")
.call(loopCheck)
.to(".frame1_text", .6, {y: 20, opacity:0, ease: Power3.easeOut}, "+=5");

function loopCheck() {
     loop++;
     if (loop < loopMax) {
        tl.play();
     } else{
       tl.pause();
     }
}

var cta_tl = new TimelineMax({repeat:4})

cta_tl
.to("#cta", .1, {scale: 0.9}, "+=2.5")
.to("#cta", .2, {scale: 1.2})
.to("#cta", .2, {scale: 1})
.to("#cta", .1, {scale: 0.9}, "+=4")
.to("#cta", .2, {scale: 1.2})
.to("#cta", .2, {scale: 1});
