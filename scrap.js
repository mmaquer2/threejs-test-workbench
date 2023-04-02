    //console.log(particles[1].uuid)
    /*
    
    
    
       // const temp = new THREE.Vector3(
   // Math.random() * 10 - 5, 
   // Math.random() * 10 - 5, 
   // Math.random() * 10 - 5
   // )
    
    
    
    // move a particle back and forth
    particles[1].position.x = Math.sin(elapsedTime) * 2;

    // setting a random blinking color
    //particles[1].material.color.setHSL(0.5 + 0.5 * Math.sin(2 * elapsedTime), 0.75, 0.5);
    let color = parameters[1][0];
    //console.log(color)
    let h = (360 * (color[0] + elapsedTime) % 360) / 360;
    particles[1].material.color.setHSL(h, color[1], color[2]);

    console.log(camera.position)
    //particles[1].material.opacity -= 0.001;
    //particles[1].material.size += 0.001;

    
    // removing a particle once opacity is 0
    if(particles[1].material.opacity <= 0.0){
        let tempID = particles[1].uuid;
        particles[1].geometry.dispose();
        particles[1].material.dispose();
        console.log("removed paritlces 1")
        scene.remove(scene.getObjectByProperty('uuid', tempID));
    }





    
let parameters = [
    [
        [1, 1, 0.5], 5
    ],
    [
        [0.95, 1, 0.5], 4
    ],
    [
        [0.90, 1, 0.5], 3
    ],
    [
        [0.85, 1, 0.5], 2
    ],
    [
        [0.80, 1, 0.5], 1
    ]
];

const parameterCount = parameters.length;
let color = [];

for(let i = 0; i < parameterCount; i++){
    color = parameters[i][0];
}







    */