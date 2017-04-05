import MyComponent from './components/myComponent.class.js'

var test = new MyComponent()

animate();

function animate() {
    requestAnimationFrame(animate);
}
