export class Shader {

    public webGLShader: WebGLShader;
  
    constructor(context: WebGLRenderingContext, public shaderType: number, source: string) {
      // creates a shader of the given type, uploads the source and
      // compiles it.
      this.webGLShader = context.createShader(shaderType)!;
  
      // Send the source to the shader object
  
      context.shaderSource(this.webGLShader, source);
  
      // Compile the shader program
  
      context.compileShader(this.webGLShader);
  
      // See if it compiled successfully
  
      if (!context.getShaderParameter(this.webGLShader, context.COMPILE_STATUS)) {
        throw new Error('An error occurred compiling the shaders: ' + context.getShaderInfoLog(this.webGLShader));
      }
    }
  
  }
  