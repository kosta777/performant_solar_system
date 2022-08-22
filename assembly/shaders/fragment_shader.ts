import { Shader } from './shader';

export class FragmentShader extends Shader {

  constructor (context: WebGLRenderingContext, source: string) {
    super(context, context.FRAGMENT_SHADER, source);
  }

}