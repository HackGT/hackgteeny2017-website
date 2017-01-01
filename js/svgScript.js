		// get a DOM element to create our svg in
var applyPage = Snap("#applyPage");


// define the url to load the svg from
var url = "assets/hackgteeny-fixed.svg";

Snap.load(url, function(fragment) {
	var svgElement = fragment.select("svg");
	console.log(svgElement)
	svgElement.attr({
		id: "applyPage_svg"
	});

	window.onresize = function() {
		//this way when we change the screen size the SVG changes size too
		svgElement.attr({
			//height: window.innerHeight,
		});
	}

	applyPage.append(svgElement);
	prepareApplyPage()
})

function prepareApplyPage(){
	var bounceGroup = applyPage.selectAll(".bounceGroup");

	bounceGroup.forEach(function(el){
		el.rectangleAnimating = false;

		el.node.onmouseenter = function(e) {
			console.log("A")
			if(!el.rectangleAnimating) {
				el.rectangleAnimating = true;

				el.animate({transform:"t0,5"}, 100, function(){
					el.animate({transform:"t0,0"}, 100, function(){
						el.rectangleAnimating = false;
					})
				})
			}
		}
	})

	var path = applyPage.select("#beePath")
	var bee = applyPage.select("#bee")

	console.log(path, bee)

	function moveBee(beeEl) {
		beeEl.drawAtPath( path, 14000, {
			callback: moveBee.bind(null, beeEl)
		})
	}
	
	moveBee(bee)
	
	function svgElToMidpoint(el){
		var boundingBox = el.node.getBoundingClientRect()
		return {x: boundingBox.left + boundingBox.width / 2, y: boundingBox.top + boundingBox.height / 2}
	}

	function add(a, b){
		return {x: b.x + a.x, y: b.y + a.y}
	}

	function difference(a, b){
		return {x: b.x - a.x, y: b.y - a.y}
	}

	function toUnit(v){
		var mag = Math.sqrt(v.x * v.x + v.y * v.y)
		return {x: v.x/mag, y: v.y / mag}
	}

	function multiplyByScalar(v, c){
		return {x: v.x * c, y: v.y * c}
	}

	function toRelativeTransformationNotation(v, precision){
		precision = precision || 1000
		return "t" + Math.round(v.x*precision)/precision + "," + Math.round(v.y*precision)/precision
	}

	//pupils are st61 & st62

	var leftEye = applyPage.select('.st62')
	var rightEye = applyPage.select('.st61')

	var eyes = [leftEye, rightEye]


	function updateEyePosition(amplitude){
		var computer = applyPage.select('.st35')
		for(var i = 0; i < eyes.length; i++){
			var eye = eyes[i]
			var beeDelta = toUnit(difference(svgElToMidpoint(eye), svgElToMidpoint(bee)))
			var computerDelta = toUnit(difference(svgElToMidpoint(eye), svgElToMidpoint(computer)))
			var delta = add(multiplyByScalar(beeDelta, amplitude), multiplyByScalar(computerDelta, 1 - amplitude))

			eye.transform(toRelativeTransformationNotation(delta), 1000)

		}
		
	}
	var startTime = new Date()
	var period = 13131
	setInterval(function(){
		// var elapsed = (new Date() - startTime) % period

		// updateEyePosition((Math.cos(elapsed / period * Math.PI * 2) + 1) / 2)


		updateEyePosition(1)

	}, 10)
	

}
