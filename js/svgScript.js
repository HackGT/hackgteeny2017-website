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
	console.log("!!")
	var applyGroup = applyPage.select("#applyGroup");
	var applyRectangle = applyGroup.select("#applyRect");
	
	

	var rectangleAnimating;

	applyGroup.node.onmouseenter = function() {
		console.log("A")
		if(!rectangleAnimating) {
			rectangleAnimating = true;

			applyGroup.animate({transform:"t0,5"}, 100, function(){
				applyGroup.animate({transform:"t0,0"}, 100, function(){
					rectangleAnimating = false;
				})
			})
		}
	}

}