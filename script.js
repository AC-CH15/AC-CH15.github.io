/*=========================================================
    ABSOLUTE SOLVER CHAPTER SELECT
    script.js
    Part 1 - Boot Sequence
=========================================================*/

/*=========================================================
    ELEMENTS
=========================================================*/

const fade = document.getElementById("fade");

const intro = document.getElementById("intro");

const menu = document.getElementById("menu");

const bootText = document.getElementById("bootText");

const chapterNumbers =
document.querySelectorAll(".number");

const ambient =
document.getElementById("ambient");

const hoverSound =
document.getElementById("hoverSound");

const glitchSound =
document.getElementById("glitchSound");


/*=========================================================
    SETTINGS
=========================================================*/

const SETTINGS = {

    bootDelay:800,

    bootSpeed:130,

    numberSpeed:450,

    introPause:600,

    fadeSpeed:900

};


/*=========================================================
    WAIT
=========================================================*/

function wait(ms){

    return new Promise(resolve=>{

        setTimeout(resolve,ms);

    });

}


/*=========================================================
    FADE
=========================================================*/

function fadeScreenOut(){

    fade.style.transition=

        `opacity ${SETTINGS.fadeSpeed}ms`;

    fade.style.opacity=0;

}

function fadeScreenIn(){

    fade.style.transition=

        `opacity ${SETTINGS.fadeSpeed}ms`;

    fade.style.opacity=1;

}


/*=========================================================
    BOOT TEXT
=========================================================*/

async function typeBoot(message){

    bootText.innerHTML="";

    for(let i=0;i<message.length;i++){

        bootText.innerHTML+=message[i];

        await wait(SETTINGS.bootSpeed);

    }

}

async function bootGlitch(){

    bootText.innerHTML="SYSTEM BOOT";

    await wait(250);

    bootText.innerHTML="SYSTEM B00T";

    await wait(80);

    bootText.innerHTML="SYSTEM B0OT";

    await wait(80);

    bootText.innerHTML="SYSTEM BOOT";

    await wait(250);

}


/*=========================================================
    CHAPTER ANIMATION
=========================================================*/

async function animateNumbers(){

    for(let i=0;i<chapterNumbers.length;i++){

        const n=chapterNumbers[i];

        n.style.opacity="1";

        n.style.transform="scale(1.25)";

        n.style.transition=".4s";

        await wait(

            SETTINGS.numberSpeed

        );

        n.style.opacity=".15";

        n.style.transform="scale(.75)";

    }

}


/*=========================================================
    REVEAL MENU
=========================================================*/

async function revealMenu(){

    intro.classList.add("hideIntro");

    await wait(700);

    intro.style.display="none";

    menu.classList.add("showMenu");

}


/*=========================================================
    INTRO SEQUENCE
=========================================================*/

async function introSequence(){

    fadeScreenIn();

    await wait(SETTINGS.bootDelay);

    fadeScreenOut();

    await wait(1200);

    await bootGlitch();

    await typeBoot(

        "VERIFYING ARCHIVE"

    );

    await wait(600);

    await typeBoot(

        "CHECKING FILES"

    );

    await wait(600);

    await typeBoot(

        "ABSOLUTE SOLVER"

    );

    await wait(700);

    bootText.innerHTML="";

    await animateNumbers();

    await wait(

        SETTINGS.introPause

    );

    await revealMenu();

}


/*=========================================================
    AUDIO
=========================================================*/

function startAudio(){

    if(!ambient) return;

    ambient.volume=.25;

    ambient.play().catch(()=>{

        console.log(

            "Autoplay blocked."

        );

    });

}

document.addEventListener(

    "click",

    ()=>{

        startAudio();

    },

    {once:true}

);


/*=========================================================
    HOVER SOUND
=========================================================*/

document

.querySelectorAll(".available")

.forEach(chapter=>{

    chapter.addEventListener(

        "mouseenter",

        ()=>{

            if(!hoverSound) return;

            hoverSound.currentTime=0;

            hoverSound.volume=.35;

            hoverSound.play();

        }

    );

});


/*=========================================================
    PAGE LOAD
=========================================================*/

window.addEventListener(

    "load",

    ()=>{

        introSequence();

    }

);

/*=========================================================
    PART 2
    BACKGROUND ENGINE
    Binary • Particles • Cursor • Ambient
=========================================================*/

/*=========================================================
    ELEMENTS
=========================================================*/

const binaryContainer =
document.getElementById("binaryContainer");

const particleContainer =
document.getElementById("particleContainer");

const cursorGlow =
document.getElementById("cursorGlow");

const solverOrb =
document.getElementById("solverOrb");

/*=========================================================
    MOUSE
=========================================================*/

let mouseX=window.innerWidth/2;
let mouseY=window.innerHeight/2;

document.addEventListener("mousemove",e=>{

    mouseX=e.clientX;
    mouseY=e.clientY;

    cursorGlow.style.left=mouseX+"px";
    cursorGlow.style.top=mouseY+"px";

    createTrail(mouseX,mouseY);

});

/*=========================================================
    CURSOR TRAIL
=========================================================*/

function createTrail(x,y){

    const trail=document.createElement("div");

    trail.className="trail";

    trail.style.left=x+"px";

    trail.style.top=y+"px";

    document.body.appendChild(trail);

    setTimeout(()=>{

        trail.remove();

    },700);

}

/*=========================================================
    FLOATING BINARY
=========================================================*/

function createBinary(){

    const digit=document.createElement("span");

    digit.className="binary";

    digit.textContent=Math.random()>0.5 ? "1":"0";

    digit.style.left=Math.random()*100+"vw";

    digit.style.top="110vh";

    digit.style.fontSize=

        (12+Math.random()*24)+"px";

    digit.style.animationDuration=

        (10+Math.random()*12)+"s";

    digit.style.opacity=

        .08+Math.random()*.18;

    digit.style.transform=

        `rotate(${Math.random()*360}deg)`;

    binaryContainer.appendChild(digit);

    digit.addEventListener(

        "animationend",

        ()=>{

            digit.remove();

        }

    );

}

/*=========================================================
    START BINARY
=========================================================*/

setInterval(

    createBinary,

    180

);

/*=========================================================
    SOLVER PARTICLE
=========================================================*/

function createParticle(){

    const p=document.createElement("div");

    p.className="solverParticle";

    particleContainer.appendChild(p);

    const rect=

    solverOrb.getBoundingClientRect();

    const cx=

    rect.left+rect.width/2;

    const cy=

    rect.top+rect.height/2;

    const angle=

    Math.random()*Math.PI*2;

    const radius=

    40+Math.random()*100;

    const size=

    2+Math.random()*5;

    p.style.width=size+"px";

    p.style.height=size+"px";

    p.style.left=

    cx+"px";

    p.style.top=

    cy+"px";

    let orbit=angle;

    const speed=

    .01+Math.random()*.02;

    let frame=0;

    function animate(){

        frame++;

        orbit+=speed;

        p.style.transform=

        `translate(

        ${Math.cos(orbit)*radius}px,

        ${Math.sin(orbit)*radius}px)

        scale(${1-frame/320})`;

        if(frame<320){

            requestAnimationFrame(

                animate

            );

        }else{

            p.remove();

        }

    }

    animate();

}

/*=========================================================
    START PARTICLES
=========================================================*/

setInterval(

    createParticle,

    90

);

/*=========================================================
    AMBIENT SOLVER PULSE
=========================================================*/

function pulseSolver(){

    solverOrb.animate([

        {

            transform:

            "translateY(-50%) scale(1)"

        },

        {

            transform:

            "translateY(-50%) scale(1.08)"

        },

        {

            transform:

            "translateY(-50%) scale(1)"

        }

    ],{

        duration:1800,

        easing:"ease-in-out"

    });

}

setInterval(

    pulseSolver,

    6500

);

/*=========================================================
    CURSOR FLICKER
=========================================================*/

setInterval(()=>{

    cursorGlow.style.opacity=

    .5+Math.random()*.5;

},200);

/*=========================================================
    AMBIENT BRIGHTNESS
=========================================================*/

setInterval(()=>{

    document.body.animate([

        {

            filter:"brightness(1)"

        },

        {

            filter:"brightness(1.03)"

        },

        {

            filter:"brightness(1)"

        }

    ],{

        duration:4000,

        easing:"ease-in-out"

    });

},6000);

/*=========================================================
    RANDOM PARTICLE BURST
=========================================================*/

function particleBurst(){

    for(let i=0;i<30;i++){

        setTimeout(

            createParticle,

            i*25

        );

    }

}

setInterval(()=>{

    if(Math.random()<0.12){

        particleBurst();

    }

},12000);

/*=========================================================
    MENU PARALLAX
=========================================================*/

document.addEventListener(

    "mousemove",

    e=>{

        const x=

        (e.clientX/window.innerWidth-.5)*10;

        const y=

        (e.clientY/window.innerHeight-.5)*10;

        menu.style.transform=

        `translate(${x}px,${y}px)`;

    }

);

/*=========================================================
    BACKGROUND DRIFT
=========================================================*/

let drift=0;

function driftBackground(){

    drift+=0.08;

    binaryContainer.style.transform=

    `translateY(${Math.sin(drift)*4}px)`;

    particleContainer.style.transform=

    `translateY(${Math.cos(drift)*3}px)`;

    requestAnimationFrame(

        driftBackground

    );

}

driftBackground();

/*=========================================================
    WINDOW RESIZE
=========================================================*/

window.addEventListener(

    "resize",

    ()=>{

        mouseX=window.innerWidth/2;

        mouseY=window.innerHeight/2;

    }

);

/*=========================================================
    PART 3
    GLITCH ENGINE
=========================================================*/

/*=========================================================
    ELEMENTS
=========================================================*/

const glitchFlash =
document.getElementById("glitchFlash");

const ghostContainer =
document.getElementById("ghostMessages");

const corruption =
document.getElementById("corruption");

/*=========================================================
    GHOST TEXT
=========================================================*/

const ghostLines=[

"ABSOLUTE SOLVER",

"HOST DETECTED",

"YOU CANNOT ESCAPE",

"WE ARE HERE",

"NULL",

"LOOK BEHIND YOU",

"MEMORY CORRUPTED",

"ARCHIVE DAMAGED",

"ACCESS DENIED",

"THEY ARE WATCHING"

];

/*=========================================================
    RANDOM FLASH
=========================================================*/

function glitchFlashEffect(){

    glitchFlash.classList.add("flash");

    glitchFlash.style.opacity=.4;

    setTimeout(()=>{

        glitchFlash.style.opacity=0;

        glitchFlash.classList.remove("flash");

    },180);

}

/*=========================================================
    SCREEN SHAKE
=========================================================*/

function shakeScreen(){

    document.body.classList.add(

        "screenShake"

    );

    setTimeout(()=>{

        document.body.classList.remove(

            "screenShake"

        );

    },250);

}

/*=========================================================
    GLITCH BAR
=========================================================*/

function createGlitchBar(){

    const bar=

    document.createElement("div");

    bar.className="glitchBar";

    bar.style.top=

    Math.random()*window.innerHeight+"px";

    document.body.appendChild(bar);

    setTimeout(()=>{

        bar.remove();

    },250);

}

/*=========================================================
    RANDOM GHOST MESSAGE
=========================================================*/

function showGhostMessage(){

    const messages=

    ghostContainer.querySelectorAll("span");

    if(messages.length===0) return;

    const msg=

    messages[

        Math.floor(

            Math.random()*messages.length

        )

    ];

    msg.style.left=

    Math.random()*80+10+"%";

    msg.style.top=

    Math.random()*80+10+"%";

    msg.animate([

        {

            opacity:0,

            transform:"translate(-50%,-50%) scale(.8)"

        },

        {

            opacity:1,

            transform:"translate(-50%,-50%) scale(1)"

        },

        {

            opacity:0,

            transform:"translate(-50%,-50%) scale(1.3)"

        }

    ],{

        duration:2200,

        easing:"ease-out"

    });

}

/*=========================================================
    WHISPER TEXT
=========================================================*/

function createWhisper(){

    const whisper=

    document.createElement("div");

    whisper.className="whisper";

    whisper.textContent=

    ghostLines[

        Math.floor(

            Math.random()*ghostLines.length

        )

    ];

    whisper.style.left=

    Math.random()*100+"vw";

    whisper.style.top=

    Math.random()*100+"vh";

    document.body.appendChild(

        whisper

    );

    setTimeout(()=>{

        whisper.remove();

    },2000);

}

/*=========================================================
    CORRUPTION VEINS
=========================================================*/

function createVein(){

    const vein=

    document.createElement("div");

    vein.className="vein";

    vein.style.left=

    Math.random()*100+"vw";

    vein.style.top=

    Math.random()*100+"vh";

    vein.style.transform=

    `rotate(${Math.random()*360}deg)`;

    corruption.appendChild(vein);

    setTimeout(()=>{

        vein.remove();

    },4500);

}

/*=========================================================
    RANDOM GLITCH EVENT
=========================================================*/

function randomGlitch(){

    const roll=Math.random();

    if(roll<0.20){

        glitchFlashEffect();

    }

    else if(roll<0.40){

        shakeScreen();

    }

    else if(roll<0.60){

        createGlitchBar();

    }

    else if(roll<0.80){

        showGhostMessage();

    }

    else{

        createWhisper();

    }

}

/*=========================================================
    MAJOR CORRUPTION EVENT
=========================================================*/

function corruptionBurst(){

    glitchFlashEffect();

    shakeScreen();

    for(let i=0;i<8;i++){

        setTimeout(()=>{

            createGlitchBar();

        },i*60);

    }

    for(let i=0;i<10;i++){

        setTimeout(()=>{

            createVein();

        },i*120);

    }

    for(let i=0;i<3;i++){

        setTimeout(()=>{

            showGhostMessage();

        },i*400);

    }

}

/*=========================================================
    GLITCH LOOP
=========================================================*/

setInterval(()=>{

    if(Math.random()<0.35){

        randomGlitch();

    }

},1800);

/*=========================================================
    VEIN LOOP
=========================================================*/

setInterval(()=>{

    if(Math.random()<0.45){

        createVein();

    }

},3000);

/*=========================================================
    BIG EVENT
=========================================================*/

setInterval(()=>{

    if(Math.random()<0.18){

        corruptionBurst();

    }

},18000);

/*=========================================================
    TITLE GLITCH
=========================================================*/

const titles=[

"ABSOLUTE SOLVER",

"ABS0LUTE SOLVER",

"ABSOLUTE S0LVER",

"[NULL]",

"ARCHIVE ERROR",

"ABSOLUTE SOLVER"

];

setInterval(()=>{

    document.title=

    titles[

        Math.floor(

            Math.random()*titles.length

        )

    ];

},5000);

/*=========================================================
    RANDOM RGB SPLIT
=========================================================*/

setInterval(()=>{

    if(Math.random()<0.12){

        document.body.style.filter=

        "contrast(115%) saturate(115%)";

        setTimeout(()=>{

            document.body.style.filter="";

        },150);

    }

},4500);

/*=========================================================
    STARTUP GLITCH
=========================================================*/

setTimeout(()=>{

    corruptionBurst();

},1200);

/*=========================================================
    PART 4
    ORB ENGINE
    Solver Orb • NULL Orb • Orbit System
=========================================================*/

/*=========================================================
    ELEMENTS
=========================================================*/

const nullOrb =
document.getElementById("nullOrb");

const solverCore =
document.querySelector("#solverOrb .core");

const solverGlow =
document.querySelector("#solverOrb .glow");

const nullCore =
document.querySelector("#nullOrb .blackHole");

/*=========================================================
    SOLVER HEARTBEAT
=========================================================*/

function solverHeartbeat(){

    solverCore.animate([

        {
            transform:
            "translate(-50%,-50%) scale(1)"
        },

        {
            transform:
            "translate(-50%,-50%) scale(1.18)"
        },

        {
            transform:
            "translate(-50%,-50%) scale(1)"
        }

    ],{

        duration:1400,

        easing:"ease-in-out"

    });

}

setInterval(

    solverHeartbeat,

    3000

);

/*=========================================================
    SOLVER GLOW FLICKER
=========================================================*/

function flickerGlow(){

    solverGlow.style.opacity=

        .5+Math.random()*.5;

}

setInterval(

    flickerGlow,

    120

);

/*=========================================================
    RANDOM SOLVER PULSE
=========================================================*/

function massivePulse(){

    solverOrb.animate([

        {

            transform:

            "translateY(-50%) scale(1)"

        },

        {

            transform:

            "translateY(-50%) scale(1.25)"

        },

        {

            transform:

            "translateY(-50%) scale(1)"

        }

    ],{

        duration:900,

        easing:"ease-out"

    });

}

setInterval(()=>{

    if(Math.random()<0.18){

        massivePulse();

    }

},7000);

/*=========================================================
    NULL BREATHING
=========================================================*/

function nullBreath(){

    nullCore.animate([

        {

            transform:"scale(1)"

        },

        {

            transform:"scale(.95)"

        },

        {

            transform:"scale(1)"

        }

    ],{

        duration:4500,

        easing:"ease-in-out"

    });

}

setInterval(

    nullBreath,

    4500

);

/*=========================================================
    NULL DISTORTION
=========================================================*/

function distortNull(){

    nullCore.style.filter=

    "blur(1px) contrast(130%)";

    setTimeout(()=>{

        nullCore.style.filter="";

    },180);

}

setInterval(()=>{

    if(Math.random()<0.12){

        distortNull();

    }

},2500);

/*=========================================================
    ORBITING SPARK
=========================================================*/

function orbitSpark(){

    const spark=

    document.createElement("div");

    spark.style.position="absolute";

    spark.style.width="4px";

    spark.style.height="4px";

    spark.style.borderRadius="50%";

    spark.style.background="#FFD400";

    spark.style.boxShadow=

    "0 0 10px #FFD400";

    solverOrb.appendChild(spark);

    let angle=

    Math.random()*Math.PI*2;

    let radius=95;

    let frame=0;

    function animate(){

        frame++;

        angle+=0.05;

        spark.style.left=

        130+

        Math.cos(angle)*radius+

        "px";

        spark.style.top=

        130+

        Math.sin(angle)*radius+

        "px";

        spark.style.opacity=

        1-frame/180;

        if(frame<180){

            requestAnimationFrame(

                animate

            );

        }else{

            spark.remove();

        }

    }

    animate();

}

setInterval(

    orbitSpark,

    500

);

/*=========================================================
    NULL ABSORPTION
=========================================================*/

function absorbBinary(){

    const binaries=

    document.querySelectorAll(".binary");

    if(binaries.length===0) return;

    binaries.forEach(bin=>{

        const rect=

        nullOrb.getBoundingClientRect();

        bin.animate([

            {

                transform:

                "translate(0,0) scale(1)",

                opacity:1

            },

            {

                transform:

                `translate(

                ${rect.left-window.innerWidth/2}px,

                ${rect.top-window.innerHeight/2}px)

                scale(.2)`,

                opacity:0

            }

        ],{

            duration:1000,

            easing:"ease-in"

        });

    });

}

setInterval(()=>{

    if(Math.random()<0.08){

        absorbBinary();

    }

},9000);

/*=========================================================
    ORB ENERGY LINK
=========================================================*/

function orbConnection(){

    const line=

    document.createElement("div");

    line.style.position="fixed";

    line.style.left="50%";

    line.style.top="50%";

    line.style.width="55vw";

    line.style.height="2px";

    line.style.background=

    "linear-gradient(to right,#000,#FFD400,#000)";

    line.style.opacity=".5";

    line.style.transform=

    "translate(-50%,-50%)";

    line.style.pointerEvents="none";

    line.style.zIndex="25";

    document.body.appendChild(line);

    line.animate([

        {

            opacity:0

        },

        {

            opacity:.6

        },

        {

            opacity:0

        }

    ],{

        duration:800

    });

    setTimeout(()=>{

        line.remove();

    },800);

}

setInterval(()=>{

    if(Math.random()<0.05){

        orbConnection();

    }

},15000);

/*=========================================================
    ORB HOVER REACTION
=========================================================*/

document.addEventListener(

    "mousemove",

    e=>{

        const s=

        solverOrb.getBoundingClientRect();

        const dx=

        e.clientX-(s.left+s.width/2);

        const dy=

        e.clientY-(s.top+s.height/2);

        const dist=

        Math.sqrt(dx*dx+dy*dy);

        if(dist<180){

            solverGlow.style.opacity="1";

        }else{

            solverGlow.style.opacity=".6";

        }

    }

);

/*=========================================================
    RANDOM ENERGY SURGE
=========================================================*/

setInterval(()=>{

    if(Math.random()<0.1){

        solverHeartbeat();

        massivePulse();

        flickerGlow();

    }

},10000);

/*=========================================================
    PART 5
    FINAL SYSTEM
    Menu • Chapters • Easter Eggs • Startup
=========================================================*/

/*=========================================================
    CHAPTER BUTTONS
=========================================================*/

const availableChapters =
document.querySelectorAll(".chapter.available");

const lockedChapters =
document.querySelectorAll(".chapter.locked");

/*=========================================================
    LOCKED CHAPTERS
=========================================================*/

lockedChapters.forEach(chapter=>{

    chapter.addEventListener("click",()=>{

        shakeScreen();

        glitchFlashEffect();

        createGlitchBar();

        createWhisper();

        if(glitchSound){

            glitchSound.currentTime=0;
            glitchSound.volume=.4;
            glitchSound.play().catch(()=>{});

        }

        const label=
        chapter.querySelector(".right");

        const old=label.textContent;

        label.textContent="ACCESS DENIED";

        setTimeout(()=>{

            label.textContent=old;

        },1200);

    });

});

/*=========================================================
    AVAILABLE CHAPTERS
=========================================================*/

availableChapters.forEach(chapter=>{

    chapter.addEventListener("click",e=>{

        e.preventDefault();

        fadeScreenIn();

        solverHeartbeat();

        massivePulse();

        if(glitchSound){

            glitchSound.currentTime=0;

            glitchSound.volume=.35;

            glitchSound.play().catch(()=>{});

        }

        setTimeout(()=>{

            window.location=

            chapter.href;

        },900);

    });

});

/*=========================================================
    KONAMI CODE
=========================================================*/

const konami=[];

const secret=[

"ArrowUp",
"ArrowUp",
"ArrowDown",
"ArrowDown",
"ArrowLeft",
"ArrowRight",
"ArrowLeft",
"ArrowRight",
"b",
"a"

];

document.addEventListener("keydown",e=>{

    konami.push(e.key);

    if(konami.length>

        secret.length){

        konami.shift();

    }

    if(

        konami.join()===

        secret.join()

    ){

        activateSolverMode();

    }

});

/*=========================================================
    SECRET MODE
=========================================================*/

function activateSolverMode(){

    glitchFlashEffect();

    shakeScreen();

    document.body.animate([

        {

            filter:"hue-rotate(0deg)"

        },

        {

            filter:"hue-rotate(25deg) saturate(160%)"

        },

        {

            filter:"hue-rotate(0deg)"

        }

    ],{

        duration:3000

    });

    bootText.innerHTML=

    "HOST ACCEPTED";

    bootText.style.display="block";

    intro.style.display="flex";

    intro.style.opacity="1";

    setTimeout(()=>{

        intro.style.display="none";

    },2500);

}

/*=========================================================
    RANDOM SOLVER EVENT
=========================================================*/

function solverEvent(){

    massivePulse();

    solverHeartbeat();

    particleBurst();

    if(Math.random()<0.5){

        orbConnection();

    }

    if(Math.random()<0.4){

        corruptionBurst();

    }

}

/*=========================================================
    SYSTEM STATUS
=========================================================*/

const statusMessages=[

"Solver Linked",

"Archive Stable",

"Scanning...",

"Memory Loaded",

"Corruption Rising",

"Worker Drone Found",

"Host Located",

"NULL Watching"

];

setInterval(()=>{

    console.clear();

    console.log(

        "%cABSOLUTE SOLVER",

        "color:#FFD400;font-size:18px;font-weight:bold;"

    );

    console.log(

        statusMessages[

        Math.floor(

        Math.random()*

        statusMessages.length

        )]

    );

},7000);

/*=========================================================
    PERFORMANCE CLEANUP
=========================================================*/

setInterval(()=>{

    document

    .querySelectorAll(

    ".trail,.binary,.solverParticle,.whisper,.vein"

    )

    .forEach(node=>{

        if(

            !node.isConnected

        ){

            node.remove();

        }

    });

},10000);

/*=========================================================
    PERIODIC EVENTS
=========================================================*/

setInterval(()=>{

    if(Math.random()<0.18){

        solverEvent();

    }

},25000);

/*=========================================================
    INITIAL STARTUP
=========================================================*/

window.addEventListener("load",()=>{

    console.clear();

    console.log(

        "%cABSOLUTE SOLVER TERMINAL",

        "color:#FFD400;font-size:24px;font-weight:bold;"

    );

    console.log(

        "%cStatus: ONLINE",

        "color:#ffffff;font-size:14px;"

    );

    console.log(

        "%cWarning: Unauthorized access detected.",

        "color:#ff5555;font-size:13px;"

    );

});

/*=========================================================
    END
=========================================================*/