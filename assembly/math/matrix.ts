import { Vector3 } from "./vector3";

export class Matrix{

    mat:Float32Array;
    
    constructor(n: i32, m: i32){
        this.mat = new Float32Array(n*m);
    }

    setIdentity(): void{
        this.mat[0] = 1;  this.mat[4] = 0;  this.mat[8] = 0;  this.mat[12] = 0;
        this.mat[1] = 0;  this.mat[5] = 1;  this.mat[9] = 0;  this.mat[13] = 0;
        this.mat[2] = 0;  this.mat[6] = 0;  this.mat[10] = 1; this.mat[14] = 0;
        this.mat[3] = 0;  this.mat[7] = 0;  this.mat[11] = 0; this.mat[15] = 1;
    }

    toRadians(angleInDegrees: number): number{
        return angleInDegrees * (Math.PI/180);
    }

    scale(sx: number, sy:number, sz:number) : void{
        this.mat[0] = sx;  this.mat[4] = 0;   this.mat[8] = 0;   this.mat[12] = 0;
        this.mat[1] = 0;   this.mat[5] = sy;  this.mat[9] = 0;   this.mat[13] = 0;
        this.mat[2] = 0;   this.mat[6] = 0;   this.mat[10] = sz; this.mat[14] = 0;
        this.mat[3] = 0;   this.mat[7] = 0;   this.mat[11] = 0;  this.mat[15] = 1;
    }

    translate (dx:number, dy:number, dz:number): void {
        this.mat[0] = 1;  this.mat[4] = 0;  this.mat[8]  = 0;  this.mat[12] = dx;
        this.mat[1] = 0;  this.mat[5] = 1;  this.mat[9]  = 0;  this.mat[13] = dy;
        this.mat[2] = 0;  this.mat[6] = 0;  this.mat[10] = 1;  this.mat[14] = dz;
        this.mat[3] = 0;  this.mat[7] = 0;  this.mat[11] = 0;  this.mat[15] = 1;
      };

    rotate(angle:number, x_axis:number, y_axis:number, z_axis:number): void {
        var s:number, c:number, c1:number, xy:number, yz:number, zx:number, xs:number, ys:number, zs:number, ux:number, uy:number, uz:number;

        angle = this.toRadians(angle);

        s = Math.sin(angle);
        c = Math.cos(angle);

        if (x_axis !== 0 && y_axis === 0 && z_axis === 0) {
            // Rotation around the X axis
            if (x_axis < 0) {
            s = -s;
            }

            this.mat[0] = 1;  this.mat[4] = 0;  this.mat[8]  = 0;  this.mat[12] = 0;
            this.mat[1] = 0;  this.mat[5] = c;  this.mat[9]  = -s; this.mat[13] = 0;
            this.mat[2] = 0;  this.mat[6] = s;  this.mat[10] = c;  this.mat[14] = 0;
            this.mat[3] = 0;  this.mat[7] = 0;  this.mat[11] = 0;  this.mat[15] = 1;

        } else if (x_axis === 0 && y_axis !== 0 && z_axis === 0) {
            // Rotation around Y axis
            if (y_axis < 0) {
            s = -s;
            }

            this.mat[0] = c;  this.mat[4] = 0;  this.mat[8]  = s;  this.mat[12] = 0;
            this.mat[1] = 0;  this.mat[5] = 1;  this.mat[9]  = 0;  this.mat[13] = 0;
            this.mat[2] = -s; this.mat[6] = 0;  this.mat[10] = c;  this.mat[14] = 0;
            this.mat[3] = 0;  this.mat[7] = 0;  this.mat[11] = 0;  this.mat[15] = 1;

        } else if (x_axis === 0 && y_axis === 0 && z_axis !== 0) {
            // Rotation around Z axis
            if (z_axis < 0) {
              s = -s;
            }
      
            this.mat[0] = c;  this.mat[4] = -s;  this.mat[8]  = 0;  this.mat[12] = 0;
            this.mat[1] = s;  this.mat[5] = c;   this.mat[9]  = 0;  this.mat[13] = 0;
            this.mat[2] = 0;  this.mat[6] = 0;   this.mat[10] = 1;  this.mat[14] = 0;
            this.mat[3] = 0;  this.mat[7] = 0;   this.mat[11] = 0;  this.mat[15] = 1;
      
          } else {
            // Rotation around any arbitrary axis
            let axis_of_rotation = new Vector3();
            axis_of_rotation.v[0] = x_axis;
            axis_of_rotation.v[1] = y_axis;
            axis_of_rotation.v[2] = z_axis;
            axis_of_rotation.normalize();
            ux = axis_of_rotation.v[0];
            uy = axis_of_rotation.v[1];
            uz = axis_of_rotation.v[2];
      
            c1 = 1 - c;
      
            this.mat[0] = c + ux * ux * c1;
            this.mat[1] = uy * ux * c1 + uz * s;
            this.mat[2] = uz * ux * c1 - uy * s;
            this.mat[3] = 0;
      
            this.mat[4] = ux * uy * c1 - uz * s;
            this.mat[5] = c + uy * uy * c1;
            this.mat[6] = uz * uy * c1 + ux * s;
            this.mat[7] = 0;
      
            this.mat[8] = ux * uz * c1 + uy * s;
            this.mat[9] = uy * uz * c1 - ux * s;
            this.mat[10] = c + uz * uz * c1;
            this.mat[11] = 0;
      
            this.mat[12] = 0;
            this.mat[13] = 0;
            this.mat[14] = 0;
            this.mat[15] = 1;
        }
    };

    
}