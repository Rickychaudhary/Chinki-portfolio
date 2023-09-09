function updatetime(){
  console.log("setting time");
    const now =  new Date().toLocaleTimeString('en-US', { 
        hour: "numeric", 
        minute: "numeric"});
     document.querySelector('#time').textContent = now +" EST";
}

setInterval(updatetime, 1000)



var percent = document.querySelector(".loader-percent");
var progress = document.querySelector("#progress-bar");
var loader = document.querySelector(".loader");

var per = 4;
var width = 4;


 window.addEventListener("load", function(){
    
    var interval = setInterval(function(){
        if(width >= 100 && per === 100)
        {
            /*loader.style.transform = `translate(0,-100%)`;*/
            gsap.to(".loader",{
                top: '-100vh'
            });
            clearInterval(interval);     
        }
        else{
          width += 2;
          per = per +2;
          progress.value = width;
          percent.textContent = per + "%"; 
        }
    },20)
 })


document.querySelector("#down-btn").addEventListener("click", function(){
    var element = document.querySelector("#bottom");
    element.scrollIntoView();
})
document.querySelector("#up-btn").addEventListener("click", function(){
    var element = document.querySelector("#main");
    element.scrollIntoView();
})

const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

function dissapparinganim(){
    var tl = gsap.timeline();

    tl.from ("#nav", {
        y: '-10',
        opacity: 0,
        duration: 5.5,
        ease: Expo.easeInOut
    })
    .to (".boundingelem", {
        y: 0,
        duration: 3,
        ease: Expo.easeInOut,
        delay: -3.5,
        stagger: .2
    })
    .from ("#herofooter", {
        y: '-10',
        opacity: 0,
        duration: 2.4,
        delay: -2.2,
        ease: Expo.easeInOut
    })

}

var timeout;

function scaling(){
    var xscale =1;
    var yscale =1;
    var xprev = 0;
    var yprev =0;

    window.addEventListener("mousemove", function(dets){
        clearTimeout(timeout);
        xscale = gsap.utils.clamp(.8, 1.2, dets.clientX - xprev);
        yscale = gsap.utils.clamp(.8, 1.2, dets.clientY - yprev);

        xprev = dets.clientX;
        yprev = dets.clientY;
        cursorfollower(xscale, yscale);

        timeout = setTimeout(function(){
            document.querySelector("#cursor").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1, 1)`;
        },100);
    });
}

function cursorfollower(xscale, yscale){
    window.addEventListener("mousemove", function (dets){
        document.querySelector("#cursor").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale}, ${yscale})`;
    })
}

document.querySelectorAll(".project").forEach(function (elem){
    var rotate=0;
    var diffrot=0;
    elem.addEventListener("mouseleave", function(dets){
        gsap.to(elem.querySelector("img"), {
            opacity: 0,
            ease: Power3,
            duration: 1
        });
    });

    elem.addEventListener("mousemove", function(dets){
        var diff = dets.clientY - elem.getBoundingClientRect().top;
           diffrot = dets.clientX - rotate;
           rotate = dets.clientX;
        gsap.to(elem.querySelector("img"), {
            opacity: 1,
            ease: Power3,
            top: diff,
            left: dets.clientX,
            rotate: gsap.utils.clamp(-20, 20, diffrot),
        });
    });
});

scaling();
cursorfollower();
dissapparinganim();


