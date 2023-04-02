import * as THREE from 'three';

class Particle {

    constructor(x, y, z, radius, color, velocity, lifespan) {
        this.x = x;
        this.y = y;

        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
        this.lifespan = lifespan;
        const positions = new Float32Array( [
            -1.0, 1.0,  1.0,
              // x , y , z
          ] );

          const particleGeometry = new THREE.BufferGeometry();
          const particleMaterial = new THREE.PointsMaterial( { color: 0x00AC9F, size: 0.05 } );
          particleGeometry.setAttribute( 'position', new THREE.Float32BufferAttribute( positions, 3 ) );
          const particle = new THREE.Points( particleGeometry, particleMaterial );
          particleGeometry.attributes.position.array[0] = Math.random() * 2 - 1;
          particleGeometry.attributes.position.array[1] = Math.random() * 2 - 1;
        

    }

    draw() {

        
        
    }

    update() {
        
    }





}