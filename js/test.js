//general scene variables

console.log((Math.random()*20).toFixed(0));

var scene,
	camera,
	light1,
	light2,
	renderer,
	cube;

var mesh1,
	mesh2,
	mesh3,
	mesh4;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

var rotationSpeed = 0.001;

//variables for movable light

var mouseX = 0, mouseY = 0;

var pts = [];
var closedSpline;

var container = document.getElementById( 'three-container' );

init();
animate();

function init() {
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera( 50, window.innerWidth/ window.innerHeight, 1, 1000 );
	camera.position.z = 125;

	var ambient = new THREE.AmbientLight( 0xffffff );
	scene.add( ambient );

	var sphere = new THREE.SphereGeometry( 0.4, 16, 8 );


	//orange
	// var light1 = new THREE.PointLight( 0xf4bd82, 0, 10000 );
	// light1.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0xf4bd82 } ) ) );

	// light1.position.set( 0, 20, 40 );
	// scene.add( light1 );

	// adding main shapes

	// texture

	var manager = new THREE.LoadingManager();
	manager.onProgress = function ( item, loaded, total ) {

		console.log( item, loaded, total );

	};

	var texture = new THREE.Texture();

	var onProgress = function ( xhr ) {
		if ( xhr.lengthComputable ) {
			var percentComplete = xhr.loaded / xhr.total * 100;
			console.log( Math.round(percentComplete, 2) + '% downloaded' );
		}
	};

	var onError = function ( xhr ) {
	};

	var material = new THREE.MeshLambertMaterial( { map:THREE.ImageUtils.loadTexture('img/1.jpg') , side: THREE.DoubleSide } );

	var material2 = new THREE.MeshLambertMaterial( { color:0xFF0000} );

	// model

	var loader = new THREE.OBJLoader( manager );
	loader.load( 'obj/test5.obj', function ( object ) {

		object.traverse( function ( child ) {

			if ( child instanceof THREE.Mesh ) {

				child.material = material;

			}

		} );

		object.position.x = 30;
		object.position.y = 30;
		object.position.z = 0;
		object.rotation.x = 0.7;
		object.scale.set(0.1,0.1,0.1);
		scene.add( object );

	}, onProgress, onError );

	var loader2 = new THREE.OBJLoader( manager );
	loader.load( 'obj/test.obj', function ( object ) {

		object.traverse( function ( child ) {

			if ( child instanceof THREE.Mesh ) {

				child.material = material2;

			}

		} );

		object.position.x = -40;
		object.position.y = 0;
		object.position.z = 0;
		object.scale.set(0.1,0.1,0.1);
		scene.add( object );

	}, onProgress, onError );

	renderer = new THREE.WebGLRenderer({alpha:true});
	renderer.setSize( window.innerWidth, window.innerHeight );
	container.appendChild( renderer.domElement );

	var cameraControls;


	cameraControls = new THREE.OrbitControls(camera, renderer.domElement);
	cameraControls.target.set( 0, 0, 0);
	cameraControls.maxDistance = 400;
	cameraControls.minDistance = 30;
	cameraControls.update();

	document.addEventListener( 'mousemove', onDocumentMouseMove, false );

	window.addEventListener( 'resize', onWindowResize, false );

}

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

}

function onDocumentMouseMove( event ) {

	mouseX = ( event.clientX - windowHalfX );
	mouseY = ( event.clientY - windowHalfY );

}

function animate() {

	requestAnimationFrame( animate );
	render();

}	

function render() {

	renderer.render(scene, camera);
};
