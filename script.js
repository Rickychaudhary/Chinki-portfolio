function updatetime(){
  
    const now =  new Date().toLocaleTimeString('en-US', { 
        hour: "numeric", 
        minute: "numeric"});
     document.querySelector('#time').textContent = now +" EST";
}

setInterval(updatetime, 1000)

var percent = document.querySelector(".loader-percent");
var progress = document.querySelector("#progress-bar");
var loader = document.querySelector(".loader");
var menu = document.querySelector("#menu");
var images = document.querySelectorAll(".project-img");


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

function menuclick(e) {
    
    e.preventDefault();
    console.log("clicked");
    var tl = gsap.timeline();

    tl.to("#menu", {
        y: -100,
        ease: Expo.easeInOut
    })

    tl.to(".navitems", {
        y: 0,
        opacity: 1,
        delay: -0.2,
    });
}

document.querySelector("#menu").addEventListener("click", function (e) {
    menuclick(e);
});

const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true,
});

scroll.on('scroll', () => {
    var tl = gsap.timeline();

        tl.to(".navitems", {
            opacity: 0,
            y: -100,
        });

        tl.to("#menu", {
            y: 0,
            delay: -0.5,
        });
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


var cursor = document.querySelector("#cursor");
var isOverProject = false;
var cursorText = document.querySelector("#cursorText");
var isOverHerofoooter = false;

function scaling() {
    var xscale = 1;
    var yscale = 1;
    var xprev = 0;
    var yprev = 0;

    window.addEventListener("mousemove", function (dets) {
        this.document.querySelectorAll(".project").forEach(function (elem) {
            elem.addEventListener("mouseover", function (dets) {
                isOverProject = true;
            });
            elem.addEventListener("mouseout", function (dets) {
                isOverProject = false;
            });
        });
        this.document.querySelectorAll("#herofooter a").forEach(function (elem) {
            elem.addEventListener("mouseover", function (dets) {
                  isOverHerofoooter = true;
            });
            elem.addEventListener("mouseout", function (dets) {
                isOverHerofoooter = false;
            });
        })

        if (isOverProject) {
            xscale = 6;
            yscale = 6;
            showCursorText("view",);
            cursorfollower(xscale, yscale, dets.clientX, dets.clientY);
          
        } else if (isOverHerofoooter) {
            xscale = 2;
            yscale = 2;
            cursorfollower(xscale, yscale, dets.clientX, dets.clientY);
        }
         else {
            xscale = gsap.utils.clamp(0.8, 1.2, dets.clientX - xprev);
            yscale = gsap.utils.clamp(0.8, 1.2, dets.clientY - yprev);
            cursorfollower(xscale, yscale, dets.clientX, dets.clientY);
            hideCursorText();
        }

        xprev = dets.clientX;
        yprev = dets.clientY;
    });
}
function cursorfollower(xscale, yscale, clientX, clientY) {
    // Check if the cursor is over any project
    if (isOverProject) {
        gsap.to(cursor, {
            x: clientX,
            y: clientY,
            scale: xscale,
            duration: 1.1,
            overwrite: "auto",
        });
    } else if (isOverHerofoooter) {
        gsap.to(cursor, {
            x: clientX,
            y: clientY,
            scale: xscale,
            duration: 1.2,
            overwrite: "auto",
        });
    } else {
        gsap.to(cursor, {
            x: clientX,
            y: clientY,
            scale: 1,
            duration: 0,
            overwrite: "auto",
            delay: -1
        });
    }
}

const urls = [
    "https://rickychaudhary.github.io/Apple-clone/",
    "https://chinki-hub.vercel.app/",
    "https://rickychaudhary.github.io/Chinki-portfolio/"
];

cursor.addEventListener("click",function(e) {
    console.log(e);
})



function showCursorText(text) {
    cursorText.textContent = text;
    cursorText.style.color =  'rgb(0 0 0/var(--tw-bg-opacity))';
    gsap.to(cursorText, {
         zIndex: 999999999,
         duration: 0.75,
         scale: 1,
         opacity: 1,
         });
}

function hideCursorText() {
    cursorText.textContent = "";
    gsap.to(cursorText, { 
        opacity: 0, 
        duration: 0,
        zIndex: -1,
        scale: 0,
         });
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