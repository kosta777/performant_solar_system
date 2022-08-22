"use strict"

window.SimpleModelRenderer = function(gl, program, model, model_color){

    var self = this;
    var triangles_vertex_buffer_id = null;

    var a_Vertex_location = null;
    var u_Color_location = null;
    var u_Transform_location = null;

    var edge_color = new Float32Array( [0.0, 0.0, 0.0, 1.0]); // BLACK

    function createBufferObject(gl, data){
        var buffer_id;

        buffer_id = gl.createBuffer();
        if(!buffer_id){
            console.log("Error creating a buffer.");
        }

        gl.bindBuffer(gl.ARRAY_BUFFER, buffer_id);
        gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);

        return buffer_id;
    }

    function buildBufferFromModel(model){
        if(model.triangles.length > 0){
            var num_triangles = model.triangles.length;
            var num_vertices = num_triangles*3;

            var vertices3 = new Float32Array(num_vertices*3);

            var nv = 0;
            for(var i=0;i<num_triangles;i+=1){
                for(var j=0;j<3;j+=1){
                    var vertex = model.triangles[i].vertices[j];

                    for(var k=0;k<3;k+=1)
                    {
                        vertices3[nv] = vertex[k];
                        nv +=1;
                    }
                }
            }

            return vertices3;
        }

    }

    function _getLocationOfShaderVariables() {
    // Get the location of the shader variables
        u_Color_location     = gl.getUniformLocation(program, 'u_Color');
        u_Transform_location = gl.getUniformLocation(program, 'u_Transform');
        a_Vertex_location    = gl.getAttribLocation(program,  'a_Vertex');
    }

    var model_data = buildBufferFromModel(model);
    console.log(model_data);
    triangles_vertex_buffer_id = createBufferObject(gl, model_data);
    model_data = null;

    _getLocationOfShaderVariables();

    self.delete = function(gl){
        if(model.triangles.length > 0){
            gl.deleteBuffer(triangles_vertex_buffer_id);
        }
    }

    self.render = function(gl, transform){
        var j, start;

        gl.uniformMatrix4fv(u_Transform_location, false, transform);
        gl.uniform4fv(u_Color_location, model_color);
        console.log(triangles_vertex_buffer_id);
        gl.bindBuffer(gl.ARRAY_BUFFER, triangles_vertex_buffer_id);
        gl.vertexAttribPointer(a_Vertex_location, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(a_Vertex_location);

        // Draw all of the triangles
        gl.drawArrays(gl.TRIANGLES, 0, model.triangles.length * 3);

        // 2. Render the edges around each triangle:

        // Set the color for all of the edges
        gl.uniform4fv(u_Color_location, edge_color);

        // Draw a line_loop around each of the triangles
        for(j = 0;j<model.triangles.length;j+=1)
            gl.drawArrays(gl.LINE_LOOP, j*3, 3);
        //for (j = 0, start = 0; j < model.triangles.length; j += 1, start += 3) {
        //    gl.drawArrays(gl.LINE_LOOP, start, 3);
        //}

    }

    
};