import React, { useRef, useEffect } from 'react';

export default function SpaceBackground(){ 
  const ref = useRef(null);

  useEffect(()=>{
    const canvas = ref.current;
    const ctx = canvas.getContext('2d');
    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;
    let stars = [];
    const STAR_COUNT = Math.floor((w*h)/8000);

    function initStars(){
      stars = [];
      for(let i=0;i<STAR_COUNT;i++){
        stars.push({
          x: Math.random()*w,
          y: Math.random()*h,
          r: Math.random()*1.2+0.2,
          vx: (Math.random()-0.5)*0.05,
          vy: (Math.random()-0.5)*0.05,
          twinkle: Math.random()*0.05+0.02
        });
      }
    }
    initStars();

    function resize(){
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      initStars();
    }
    window.addEventListener('resize', resize);

    let t = 0;
    function draw(){
      t += 0.01;
      ctx.clearRect(0,0,w,h);
      const g = ctx.createLinearGradient(0,0,0,h);
      g.addColorStop(0,'#050712');
      g.addColorStop(1,'#07102a');
      ctx.fillStyle = g;
      ctx.fillRect(0,0,w,h);

      for(let s of stars){
        s.x += s.vx;
        s.y += s.vy;
        s.r += Math.sin(t + s.x*0.001)*s.twinkle*0.02;
        if(s.x<0) s.x = w;
        if(s.x>w) s.x = 0;
        if(s.y<0) s.y = h;
        if(s.y>h) s.y = 0;
        ctx.beginPath();
        ctx.fillStyle = 'rgba(255,255,255,'+(0.6*Math.random()+0.4)+')';
        ctx.arc(s.x,s.y,Math.abs(s.r),0,Math.PI*2);
        ctx.fill();
      }

      if(Math.random() < 0.01){
        const sx = Math.random()*w;
        const sy = Math.random()*h*0.6;
        for(let i=0;i<30;i++){
          ctx.fillStyle = 'rgba(255,255,255,'+(1 - i*0.03)+')';
          ctx.fillRect(sx + i*8, sy + i*2, 3,1);
        }
      }

      requestAnimationFrame(draw);
    }
    draw();

    return ()=>{
      window.removeEventListener('resize', resize);
    }
  },[]);

  return <canvas ref={ref} className="space-canvas" />
}
