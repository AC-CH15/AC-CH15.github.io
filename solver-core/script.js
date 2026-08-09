/*=========================================================
    SOLVER CORE
    PART 3A
=========================================================*/

const solver = document.getElementById("solver-container");
const particles = document.getElementById("particles");

const statuses = document.querySelectorAll(".status");

const hiddenMessage = document.getElementById("hidden-message");

const flash = document.getElementById("flash");

/*=========================================================
    BOOT SEQUENCE
=========================================================*/

let currentStatus = 0;

function bootSequence(){

    statuses.forEach(s=>{

        s.classList.remove("active");

    });

    statuses[currentStatus].classList.add("active");

    currentStatus++;

    if(currentStatus >= statuses.length){

        clearInterval(bootLoop);

    }

}

const bootLoop = setInterval(bootSequence,2000);

/*=========================================================
    MOUSE FOLLOW
=========================================================*/

let mouseX = window.innerWidth/2;
let mouseY = window.innerHeight/2;

let currentX = mouseX;
let currentY = mouseY;

document.addEventListener("mousemove",(e)=>{

    mouseX = e.clientX;
    mouseY = e.clientY;

});

function followMouse(){

    const targetX =
        mouseX-window.innerWidth/2;

    const targetY =
        mouseY-window.innerHeight/2;

    currentX += (targetX-currentX)*0.03;
    currentY += (targetY-currentY)*0.03;

    solver.style.transform=
        `translate(calc(-50% + ${currentX*0.06}px),
                   calc(-50% + ${currentY*0.06}px))`;

    requestAnimationFrame(followMouse);

}

followMouse();

/*=========================================================
    FLOATING PARTICLES
=========================================================*/

for(let i=0;i<160;i++){

    const p=document.createElement("div");

    p.className="particle";

    const size=Math.random()*3+1;

    p.style.position="absolute";

    p.style.width=size+"px";
    p.style.height=size+"px";

    p.style.borderRadius="50%";

    p.style.background=
        Math.random()>.5?
        "#FFD500":
        "#FFF8CC";

    p.style.boxShadow=
        "0 0 8px #FFD500";

    p.style.left=
        Math.random()*100+"vw";

    p.style.top=
        Math.random()*100+"vh";

    p.dataset.x=parseFloat(p.style.left);
    p.dataset.y=parseFloat(p.style.top);

    p.dataset.speed=
        Math.random()*0.5+0.2;

    particles.appendChild(p);

}

/*=========================================================
    PARTICLE LOOP
=========================================================*/

function updateParticles(){

    document
    .querySelectorAll(".particle")
    .forEach(p=>{

        let y=
            parseFloat(p.dataset.y);

        y-=parseFloat(p.dataset.speed);

        if(y<-5){

            y=105;

            p.dataset.x=
                Math.random()*100;

        }

        p.dataset.y=y;

        p.style.left=
            p.dataset.x+"vw";

        p.style.top=
            y+"vh";

    });

    requestAnimationFrame(updateParticles);

}

updateParticles();

/*=========================================================
    ORBITING GLYPHS
=========================================================*/

const glyphs=
document.querySelectorAll(".glyph");

glyphs.forEach((g,index)=>{

    g.dataset.angle=index*60;

});

function orbitGlyphs(){

    glyphs.forEach((g,index)=>{

        let angle=
        Number(g.dataset.angle);

        angle+=0.4+(index*0.02);

        g.dataset.angle=angle;

        const radius=
        180+(index%2)*25;

        const rad=
        angle*Math.PI/180;

        const x=
        Math.cos(rad)*radius;

        const y=
        Math.sin(rad)*radius;

        g.style.left=
        `calc(50% + ${x}px)`;

        g.style.top=
        `calc(50% + ${y}px)`;

        g.style.opacity=
        .45+
        Math.sin(rad*3)*.3;

        g.style.transform=
        `translate(-50%,-50%)
        rotate(${angle}deg)`;

    });

    requestAnimationFrame(orbitGlyphs);

}

orbitGlyphs();

/*=========================================================
    RANDOM FLICKER
=========================================================*/

setInterval(()=>{

    const brightness=
    0.95+
    Math.random()*0.2;

    document.body.style.filter=
    `brightness(${brightness})`;

},300);

/*=========================================================
    CLICK FLASH
=========================================================*/

document.addEventListener("click",()=>{

    flash.style.opacity=".8";

    setTimeout(()=>{

        flash.style.opacity="0";

    },120);

});

/*=========================================================
    BOOT COMPLETE MESSAGE
=========================================================*/

setTimeout(()=>{

    hiddenMessage.style.transition=
    "opacity 2s";

    hiddenMessage.style.opacity=".12";

},12000);

/*=========================================================
    SOLVER CORE
    PART 3B
=========================================================*/

const core = document.getElementById("core");
const slices = document.querySelectorAll(".glitch-slice");
const tendrils = document.querySelectorAll("#tendrils span");
const hum = document.getElementById("hum");
const staticSound = document.getElementById("static");

/*=========================================================
    START HUM (if browser allows)
=========================================================*/

window.addEventListener("click", () => {

    if(hum){

        hum.volume = 0.15;

        hum.play().catch(()=>{});

    }

},{once:true});

/*=========================================================
    CORE HEARTBEAT
=========================================================*/

function heartbeat(){

    core.animate([

        {
            transform:"translate(-50%,-50%) scale(1)"
        },

        {
            transform:"translate(-50%,-50%) scale(1.08)"
        },

        {
            transform:"translate(-50%,-50%) scale(.98)"
        },

        {
            transform:"translate(-50%,-50%) scale(1)"
        }

    ],{

        duration:900,

        easing:"ease-out"

    });

}

setInterval(heartbeat,4500);

/*=========================================================
    RANDOM GLITCH SLICES
=========================================================*/

function glitch(){

    slices.forEach(slice=>{

        slice.style.opacity=Math.random()*0.7;

        slice.style.transform=
            `translateX(${Math.random()*60-30}px)`;

    });

    document.body.style.filter=
        `brightness(${1.2+Math.random()*0.5})`;

    solver.animate([

        {transform:solver.style.transform},

        {
            transform:
            solver.style.transform+
            " translate(8px,-3px)"
        },

        {
            transform:
            solver.style.transform+
            " translate(-6px,2px)"
        },

        {transform:solver.style.transform}

    ],{

        duration:120

    });

    if(staticSound){

        staticSound.currentTime=0;

        staticSound.volume=.15;

        staticSound.play().catch(()=>{});

    }

    setTimeout(()=>{

        slices.forEach(s=>{

            s.style.opacity=0;

            s.style.transform="translateX(0px)";

        });

        document.body.style.filter="";

    },120);

}

setInterval(glitch,3500+Math.random()*3000);

/*=========================================================
    TENDRILS
=========================================================*/

tendrils.forEach((t,index)=>{

    t.style.left="50%";

    t.style.top="50%";

    t.style.transformOrigin="left center";

    t.style.rotate=(index*90)+"deg";

});

function animateTendrils(){

    tendrils.forEach((t,index)=>{

        let len=
        120+
        Math.sin(Date.now()/500+index)*80;

        t.style.width=len+"px";

        t.style.opacity=
        .15+
        Math.random()*.35;

    });

    requestAnimationFrame(animateTendrils);

}

animateTendrils();

/*=========================================================
    IDLE EVENT
=========================================================*/

let idleTimer;

function resetIdle(){

    clearTimeout(idleTimer);

    hiddenMessage.style.opacity=".12";

    idleTimer=setTimeout(()=>{

        hiddenMessage.textContent=
        "I THOUGHT YOU FORGOT ME.";

        hiddenMessage.style.opacity="1";

        heartbeat();

        setTimeout(()=>{

            hiddenMessage.textContent=
            "YOU ARE OBSERVED.";

            hiddenMessage.style.opacity=".12";

        },4000);

    },120000);

}

["mousemove","keydown","click"].forEach(event=>{

    document.addEventListener(event,resetIdle);

});

resetIdle();

/*=========================================================
    AWAKENING
=========================================================*/

core.addEventListener("click",()=>{

    flash.style.transition="opacity .08s";

    flash.style.opacity="1";

    heartbeat();

    solver.animate([

        {transform:solver.style.transform},

        {
            transform:
            solver.style.transform+
            " scale(1.12)"
        },

        {transform:solver.style.transform}

    ],{

        duration:450,

        easing:"ease-out"

    });

    hiddenMessage.textContent="HELLO.";

    hiddenMessage.style.opacity="1";

    setTimeout(()=>{

        hiddenMessage.style.opacity=".12";

        hiddenMessage.textContent="YOU ARE OBSERVED.";

        flash.style.opacity="0";

    },2500);

});

/*=========================================================
    OCCASIONAL SCREEN SHAKE
=========================================================*/

function shake(){

    document.body.animate([

        {transform:"translate(0,0)"},

        {transform:"translate(2px,-2px)"},

        {transform:"translate(-2px,2px)"},

        {transform:"translate(0,0)"}

    ],{

        duration:100

    });

}

setInterval(()=>{

    if(Math.random()<0.35){

        shake();

    }

},5000);

/*=========================================================
    GLYPH FLICKER
=========================================================*/

setInterval(()=>{

    glyphs.forEach(g=>{

        g.style.opacity=
            .3+
            Math.random()*.7;

    });

},300);

/*=========================================================
    RANDOM MESSAGES
=========================================================*/

const whispers=[

"ACCESS GRANTED",

"HOST ACCEPTED",

"SEARCHING...",

"NO ESCAPE",

"ARCHIVE FOUND",

"WHO ARE YOU?",

"DO NOT LOOK AWAY",

"REMEMBER"

];

setInterval(()=>{

    if(Math.random()<0.25){

        hiddenMessage.textContent=

        whispers[
            Math.floor(Math.random()*whispers.length)
        ];

        hiddenMessage.style.opacity=".6";

        setTimeout(()=>{

            hiddenMessage.style.opacity=".12";

            hiddenMessage.textContent="YOU ARE OBSERVED.";

        },2000);

    }

},15000);