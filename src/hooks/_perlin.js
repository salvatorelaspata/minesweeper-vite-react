// // credit https://github.com/joeiddon/perlin

// type Gradient = {
//   x: number;
//   y: number;
// };

// type Gradients = {
//   [key: string]: Gradient;
// };

// interface Perlin {
//   rand_vect: () => {
//     x: number;
//     y: number;
//   };
//   dot_prod_grid: (x: number, y: number, vx: number, vy: number) => number;
//   smootherstep: (x: number) => number;
//   interp: (x: number, a: number, b: number) => number;
//   seed: () => void;
//   get: (x: number, y: number) => number;
//   gradients: Gradients;
//   memory: { [key: string]: number };
// }

// let perlin: Perlin = {
//   gradients: {},
//   memory: {},
//   rand_vect: function () {
//     let theta = Math.random() * 2 * Math.PI;
//     return { x: Math.cos(theta), y: Math.sin(theta) };
//   },
//   dot_prod_grid: function (x, y, vx, vy) {
//     let g_vect;
//     let d_vect = { x: x - vx, y: y - vy };
//     if (this.gradients[[vx, vy].join('---')]) {
//       g_vect = this.gradients[[vx, vy].join('---')];
//     } else {
//       g_vect = this.rand_vect();
//       this.gradients[[vx, vy].join('---')] = g_vect;
//     }
//     return d_vect.x * g_vect.x + d_vect.y * g_vect.y;
//   },
//   smootherstep: function (x) {
//     return 6 * x ** 5 - 15 * x ** 4 + 10 * x ** 3;
//   },
//   interp: function (x, a, b) {
//     return a + this.smootherstep(x) * (b - a);
//   },
//   seed: function () {
//     this.gradients = {};
//     this.memory = {};
//   },
//   get: function (x, y) {
//     if (this.memory.hasOwnProperty([x, y].join('---')))
//       return this.memory[[x, y].join('---')];
//     let xf = Math.floor(x);
//     let yf = Math.floor(y);
//     //interpolate
//     let tl = this.dot_prod_grid(x, y, xf, yf);
//     let tr = this.dot_prod_grid(x, y, xf + 1, yf);
//     let bl = this.dot_prod_grid(x, y, xf, yf + 1);
//     let br = this.dot_prod_grid(x, y, xf + 1, yf + 1);
//     let xt = this.interp(x - xf, tl, tr);
//     let xb = this.interp(x - xf, bl, br);
//     let v = this.interp(y - yf, xt, xb);
//     this.memory[[x, y].join('---')] = v;
//     return v;
//   }
// }
// perlin.seed();