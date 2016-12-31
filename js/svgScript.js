		// get a DOM element to create our svg in
var applyPage = Snap("#applyPage");


// define the url to load the svg from
var url = "assets/hackgteeny-fixed.svg";

Snap.load(url, function(fragment) {
	var svgElement = fragment.select("svg");
	console.log(svgElement)
	svgElement.attr({
		height: window.innerHeight,
		id: "applyPage"
	})

	window.onresize = function() {
		//this way when we change the screen size the SVG changes size too
		svgElement.attr({
			height: window.innerHeight,
		})
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

}
