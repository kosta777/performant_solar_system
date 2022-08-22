import { Shader } from './shader';

export class VertexShader extends Shader {

  constructor (context: WebGLRenderingContext, source: string) {
    super(context, context.VERTEX_SHADER, source);
  }

}
