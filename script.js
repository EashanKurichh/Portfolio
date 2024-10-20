function revealToSpan(){
    document.querySelectorAll(".reveal")
    .forEach(function(elem) {
       // create spans
       let spanParent=document.createElement("span");
       let spanChild=document.createElement("span");
       
       // parent and child sets their respective classes
       spanParent.classList.add("parent");
       spanChild.classList.add("child");

       // span parent gets child and child gets elem details
       spanChild.innerHTML=elem.innerHTML;
       spanParent.appendChild(spanChild);
       
       // elem replaces its value with parent span
       elem.innerHTML="";
       elem.appendChild(spanParent);

    });
}
function valueSetters(){
    gsap.set("#nav a",{y:"-100%",opacity:0})
    gsap.set("#home .parent .child",{y:"100%"})
    gsap.set("#home .row img",{opacity:0})
    // visual ke andar g
    document.querySelectorAll("#Visual>g>g>path,#Visual>g>g>polyline").forEach(function(e){
        var character=e;
        character.style.strokeDasharray=character.getTotalLength() + 'px';
        character.style.strokeDashoffset=character.getTotalLength() + 'px';
    })

}  
function loaderAnimation(){
    var tl=gsap.timeline();
    tl
    .from("#loader .child span",{
    x:100,
    duration:1.4,
    stagger:.2,
    ease:Power3.easeInOut
    }) 
    .to("#loader .parent .child",{
    y:"-100%",
    duration:1,
    ease:Circ.easeInOut
    }) 
    .to("#loader",{
    height:0,
    duration:1,
    ease:Circ.easeInOut
    })
    .to("#green",{
    height:"100%",
    top: 0,
    duration:1,
    delay:-.7,
    ease:Circ.easeInOut
    }) 
    .to("#green",{
    height:"0%",
    duration:1,
    delay:-.3,
    ease:Circ.easeInOut,
    onComplete: function(){
        // on completetion start animate homepage
        animateHomepage();
        }
    }) 
}
function animateHomepage(){
    var tl=gsap.timeline();
    tl
    .to("#nav a",{
        y:0,
        opacity:1,
        stagger: .05, 
        ease: Expo.easeInOut
    })
    .to("#home .parent .child",{
        y:0,
        stagger: .1,
        duration:1.5, 
        ease: Expo.easeInOut
    })
    .to("#home .row img",{
        opacity:1,
        delay:-.5,
        ease: Expo.easeInOut,
        onComplete:function(){
            animateSvg();
        }
    })
}
function animateSvg(){
    
    gsap.to("#Visual>g>g>path,#Visual>g>g>polyline",{
        strokeDashoffset: 0,
        duration:2,
        ease:Expo.easeInOut,
        
    })
}

function locoInitialzie(){
    const scroll = new LocomotiveScroll({
        el: document.querySelector("#home"),
        smooth: true
    });

}
function cardShow(){
    document.querySelectorAll(".cnt")
    .forEach(function(cnt){
        var showingImage;
        cnt.addEventListener("mousemove",function(dets){
            document.querySelector("#work").style.backgroundColor = dets.target.dataset.color ? `#${dets.target.dataset.color}` : "#F2F2F2";
            document.querySelector("#cursor").children[dets.target.dataset.index].style.opacity =1;
            showingImage=dets.target;
            document.querySelector("#cursor").children[dets.target.dataset.index].style.transform =`translate(${dets.clientX}px, ${dets.clientY}px)`;
            showingImage.style.filter="grayscale(1)";
            // document.querySelector("#work").style.backgroundColor="#" + dets.target.dataset.color;
        })
        cnt.addEventListener("mouseleave",function(dets){
            document.querySelector("#cursor").children[showingImage.dataset.index].style.opacity =0;
            showingImage.style.filter="grayscale(0)";
            document.querySelector("#work").style.backgroundColor="#F2F2F2";

        })
    })
}
function cardShow1() {
    document.querySelectorAll(".cnt").forEach(function(cnt) {
        var showingImage;
        cnt.addEventListener("mousemove", function(dets) {
            // Update cursor visuals
            document.querySelector("#cursor").children[dets.target.dataset.index].style.opacity = 1;
            showingImage = dets.target;
            document.querySelector("#cursor").children[dets.target.dataset.index].style.transform = `translate(${dets.clientX}px, ${dets.clientY}px)`;
            showingImage.style.filter = "grayscale(1)";
            
            // Set background color for the entire #work div
            var color = dets.target.dataset.color;
            document.querySelector("#workrow").style.backgroundColor = "#" + color;
            document.querySelector("#work").style.backgroundColor = "#" + color;
            document.querySelector("#purse").style.backgroundColor = "#" + color;
        });
        
        cnt.addEventListener("mouseleave", function() {
            // Reset cursor and image grayscale on mouse leave
            document.querySelector("#cursor").children[showingImage.dataset.index].style.opacity = 0;
            showingImage.style.filter = "grayscale(0)";
            
            // Reset background color
            document.querySelector("#workrow").style.backgroundColor = "#F2F2F2";
            document.querySelector("#work").style.backgroundColor = "#F2F2F2";
            document.querySelector("#purse").style.backgroundColor = "#F2F2F2";

        });
    });
} 



// first converting to spans
revealToSpan();
// nav ke a tags uper move kar rahe ha
// child niche move kar rhe ha
// row ki img ki opacity 0 ho ja rhi ha
// visual absent ho ja rha ha
valueSetters();

loaderAnimation();

locoInitialzie();
cardShow1();

