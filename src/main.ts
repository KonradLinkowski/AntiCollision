import { Ball } from "./ball";
import { getRange, getUnder } from "./random";
import { Vector2, Vector3 } from "./vector";

const $canvas = document.querySelector("canvas");
const ctx = $canvas.getContext("2d");

$canvas.width = window.innerWidth;
$canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
  $canvas.width = window.innerWidth;
  $canvas.height = window.innerHeight;
  
})

const stable_color = new Vector3(0, 255, 0);
const unstable_color = new Vector3(255, 0, 0);

let speedDownFactor = 1;
let speedDownCounter = 1;
let waitingSpeedFactor = 1;
let speedDownFactorGoal = 1;


const nBalls = 20;
const maxSize = 5;
const minSize = 70;

let iterations = 0

const spawn_range_factor = 0.5;
const balls: Ball[] = [];
for (let i = 0; i < nBalls; i++) {
  const angle = getUnder(2 * Math.PI);
  const radius = 350.0;

  const start_x = radius * Math.cos(angle);
  const start_y = radius * Math.sin(angle);

  balls.push(
    new Ball(
      start_x + $canvas.width * 0.5,
      start_y + $canvas.height * 0.5,
      getRange(minSize, maxSize)
    )
  );
}

addKeyListener("Space", () => {
  speedDownFactorGoal = speedDownFactor == 1 ? 10.0 : 1.0;
});

let ok_count = 0;

const mousePos = { x: 0, y: 0 };
window.addEventListener("mousemove", (event) => {
  mousePos.x = event.x;
  mousePos.y = event.y;
});

requestAnimationFrame(animate);

function animate(delta) {
  if (waitingSpeedFactor != speedDownFactorGoal) {
    waitingSpeedFactor += speedDownFactorGoal - waitingSpeedFactor;
  }

  let stable = true;
  if (!speedDownCounter) {
    for (const ball of balls) {
      ball.stable = true;
      ball.save();
    }

    stable = update(balls, 1);
    if (!stable && ok_count < 200) {
      ok_count = 0;
    }

    if (stable) {
      ++ok_count;
    }

    if (waitingSpeedFactor) {
      speedDownFactor = waitingSpeedFactor;
    }
    speedDownCounter = speedDownFactor;
  }

  updatePos(balls, speedDownFactor);

  let center_of_mass = new Vector2(0, 0);
  
  for (const b of balls) {
    const stable_ratio =
      ok_count > 199 ? 1.0 : Math.min(1.0, b.stableCount / 255.0);
    const color = stable_color
      .mul(stable_ratio)
      .add(unstable_color.mul(1.0 - stable_ratio));
  
    let r = b.r;

    if (speedDownFactor > 1) r = b.r;

    center_of_mass = center_of_mass.add(b.position);

    b.color = color
  }
  center_of_mass = center_of_mass.div(balls.length);

  ctx.clearRect(0, 0, $canvas.width, $canvas.height);
  ctx.save()
  ctx.translate(-center_of_mass.x + $canvas.width / 2, -center_of_mass.y + $canvas.height / 2)

  balls.forEach(b => b.draw(ctx))
  ctx.fillStyle = 'purple'
  ctx.beginPath()
  ctx.arc(center_of_mass.x, center_of_mass.y, 10, 0, Math.PI * 2)
  ctx.fill()
  ctx.closePath()
  ctx.restore()
  
  iterations++;

  requestAnimationFrame(animate);
}

function update(balls: Ball[], speed: number) {
  let stable = true;

  const nBalls = balls.length;
  const attraction_force_bug = 0.01;
  const center_position = new Vector2($canvas.width * 0.5, $canvas.width * 0.5);

  for (let i = 0; i < nBalls; i++) {
    const current_ball = balls[i];
    // Attraction to center
    const to_center = center_position.sub(current_ball.position);
    current_ball.velocity = current_ball.velocity.add(
      to_center.mul(attraction_force_bug)
    );

    for (let k = i + 1; k < nBalls; k++) {
      const collider = balls[k];
      const collide_vec = current_ball.position.sub(collider.position);
      const dist = Math.sqrt(
        collide_vec.x * collide_vec.x + collide_vec.y * collide_vec.y
      );

      const minDist = current_ball.r + collider.r;

      if (dist < minDist) {
        stable = false;

        current_ball.stable = false;
        collider.stable = false;

        const collide_axe = collide_vec.div(dist);

        current_ball.position = current_ball.position.add(
          collide_axe.mul(0.5 * (minDist - dist))
        );
        collider.position = collider.position.sub(
          collide_axe.mul(0.5 * (minDist - dist))
        );
      }
    }
  }

  for (let i = 0; i < nBalls; i++) {
    if (balls[i].stable) balls[i].stableCount++;
    else balls[i].stableCount = 0;
  }

  return stable;
}

function getBallAt(position: Vector2, balls: Ball[]) {
  for (const ball of balls) {
    const v = position.sub(ball.position);
    const dist = Math.sqrt(v.x * v.x + v.y * v.y);
    if (dist < ball.r) {
      return ball;
    }
  }

  return null;
}

function updatePos(
  balls: Ball[],
  speedDownFactor: number,
) {
  const dt = 0.016;
  for (const currentBall of balls) {
    currentBall.position = currentBall.position.add(
      currentBall.velocity.mul(dt / speedDownFactor)
    );
  }

  speedDownCounter--;
}

function dot(v1: Vector2, v2: Vector2) {
  return v1.x * v2.x + v1.y * v2.y;
}

function length(v: Vector2) {
  return Math.sqrt(v.x * v.x + v.y * v.y);
}

function normalize(v: Vector2) {
  return v.div(length(v));
}

function addKeyListener(key: string, callback: () => void) {
  window.addEventListener("keyup", (event) => {
    if (event.code == key) callback();
  });
}
