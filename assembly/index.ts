// The entry file of your WebAssembly module.
import { Matrix } from "./math/matrix";

export function add(a: i32, b: i32): i32 {
  return a + b;
}

export function matrix_identity():bool{
  let m = new Matrix(4, 4);
  m.setIdentity();
  return m.mat[0] == 1 && m.mat[5] == 1 && m.mat[10] == 1 && m.mat[15] == 1;
}
