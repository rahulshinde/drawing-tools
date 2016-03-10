//general scene variables

console.log((Math.random()*20).toFixed(0));

var scene,
	camera,
	renderer

var width = window.innerWidth;
var height = window.innerHeight;

var lineGroup,
	objectGroup;

var obj1;

var rotationSpeed = 0.001;

var random1,
	random2;
//variables for movable light

var mouseX = 0, mouseY = 0;

var container = document.getElementById( 'three-container2' );

init();
animate();

function init() {
	scene = new THREE.Scene();

	camera = new THREE.PerspectiveCamera( 60, window.innerWidth/ window.innerHeight, 1, 1000 );
	camera.position.z = 600;

	renderer = new THREE.WebGLRenderer({alpha:true});
	renderer.setSize( window.innerWidth, window.innerHeight );
	container.appendChild( renderer.domElement );

	var cameraControls;


	cameraControls = new THREE.OrbitControls(camera, renderer.domElement);
	cameraControls.target.set( 0, 0, 0);
	cameraControls.maxDistance = 600;
	cameraControls.minDistance = 600;
	cameraControls.update();



	var material = new THREE.LineBasicMaterial({color: 0xffffff});

	var geometry = new THREE.Geometry();
	geometry.vertices.push(
		new THREE.Vector3( -width/2,height/2,0 ),
		new THREE.Vector3( 0, 0, 0 )
	);

	lineGroup = new THREE.Group();
	scene.add(lineGroup);
	// // lineGroup.rotation.x = 0.3;
	// lineGroup.rotation.y = -0.3;
	// lineGroup.rotation.z = -0.3;
	lineGroup.position.x = 0;
	lineGroup.position.y = 0;
	lineGroup.position.z = 0;

	lineGroup.scale.set(1,1,1);


	document.addEventListener( 'mousemove', onDocumentMouseMove, false );

	window.addEventListener( 'resize', onWindowResize, false );

}

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

}

function onDocumentMouseMove( event ) {

	var objLeft = $("#three-container2").offset().left;
    var objTop = $("#three-container2").offset().top;

    var objCenterX = objLeft + $("#three-container2").width() / 2;
    var objCenterY = objTop + $("#three-container2").height() / 2;
    mouseX = event.pageX - objCenterX;
	mouseY = -event.pageY + objCenterY;

	random1 = Math.floor(Math.random() * 400) - 400; 
	random2 = Math.floor(Math.random() * 400) - 400;

    console.log(mouseX);

	

	var material = new THREE.LineBasicMaterial({color: 0xffffff});

	var geometry = new THREE.Geometry();
	geometry.vertices.push(
		new THREE.Vector3( 0, 0, -200 ),
		new THREE.Vector3( mouseX, mouseY, 200 )
	);

	var line = new THREE.Line( geometry, material );
	lineGroup.add( line );

}

function animate() {

	requestAnimationFrame( animate );
	render();

}	

function render() {
	// camera.rotation.y += 0.0005;
	renderer.render(scene, camera);
};
