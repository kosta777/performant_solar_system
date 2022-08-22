class Point{
  x:f64;
  y:f64;
  z:f64;

  constructor(x:f64, y:f64, z:f64){
    this.x = x;
    this.y = y;
    this.z = z;
  }
}
class Triangle{

  vertices:Point[];

  constructor(p1:Point, p2:Point, p3:Point){
    this.vertices = [p1, p2, p3];
  }
}

class SimpleModel{

  name:string;
  triangles:Triangle[];
  
  constructor(name:string){
    this.name = name;
  }
};

export function createPyramid():SimpleModel{
  let points:Point[] = [new Point(0.0, -0.25, -0.5), new Point(0, 0.25, 0), new Point(0.5, -0.25, 0.25), new Point(-0.5, -0.25, 0.25)];
  var pyramid = new SimpleModel("Pyramid");
  pyramid.triangles = [new Triangle(points[2], points[1], points[3]),
     new Triangle(points[3], points[1], points[0]),
     new Triangle(points[0], points[1], points[2]),
     new Triangle(points[0], points[2], points[3])]

     return pyramid;
}