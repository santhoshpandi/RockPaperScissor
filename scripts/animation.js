import confetti from "https://cdn.skypack.dev/canvas-confetti";


export function fun(){
  confetti({
    particleCount: 100,
    spread: 120,
    origin: { y: 0.6 }
  });
}


