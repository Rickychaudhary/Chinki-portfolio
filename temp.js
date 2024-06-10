function cursorfollower(xscale, yscale, clientX, clientY) {

    if(isOverProject) {
        gsap.to(cursor, {
            x: clientX,
            y: clientY,
            scale: xscale,
            duration: 1.1, 
            overwrite: "auto",
        });
       
    } else if(isOverHerofoooter) {
        gsap.to(cursor, {
            x: clientX,
            y: clientY,
            scale: xscale,
            duration: 1.2, 
            overwrite: "auto",
        });
    }
     else {
        gsap.to(cursor, {
            x: clientX,
            y: clientY,
            scale: 1,
            duration: 0, 
            overwrite: "auto",
            delay: -1
            
        });
    }
    return;
}