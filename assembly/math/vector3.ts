export class Vector3{

    v:Float32Array;

    constructor(dx:number = 0, dy:number = 0, dz:number = 0) {
        this.v = new Float32Array(3);
        this.v[0] = dx;
        this.v[1] = dy;
        this.v[2] = dz;
    }

    length():number{
        return Math.sqrt(this.v[0] * this.v[0] + this.v[1]*this.v[1] + this.v[2]*this.v[2]);
    }

    normalize():void{
        let length:number, percent:number;

        length = this.length()
        percent = 1.0/length;
        this.v[0] = this.v[0] * percent;
        this.v[1] = this.v[1] * percent;
        this.v[2] = this.v[2] * percent;
    }

    add(vec:Vector3):void{
        this.v[0]  +=  vec.v[0];
        this.v[1] += vec.v[1];
        this.v[2] += vec.v[2];
    }

    subtract(vec:Vector3):void{
        this.v[0]  -=  vec.v[0];
        this.v[1] -= vec.v[1];
        this.v[2] -= vec.v[2];
    }
}