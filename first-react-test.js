'use strict';

var React = require('react/addons');
var _ = require('underscore');

// CSS
require('../../styles/normalize.css');
require('../../styles/main.css');

React.initializeTouchEvents(true);


var data = [
	{
			"url" : "Agency-v2-Eurocucina-sales-pitch-2014-draft-31-03-2014_Page_001.jpg",
			"order" : 1,
			"media" : [{
					"x" : 100,
					"y" : 300,
					"width" : 100,
					"height" : 100,
					"thumburl" : "",
					"url" : "HMEEHO123A111001.mp4"
				}
			]
			
		}, 
		{
			"url" : "Agency-v2-Eurocucina-sales-pitch-2014-draft-31-03-2014_Page_002.jpg",
			"order" : 2,
			"media" : null		
		},
		{
			"url" : "Agency-v2-Eurocucina-sales-pitch-2014-draft-31-03-2014_Page_003.jpg",
			"order" : 3,
			"media" : null		
		},
		{
			"url" : "Agency-v2-Eurocucina-sales-pitch-2014-draft-31-03-2014_Page_004.jpg",
			"order" : 4,
			"media" : null		
		},
		{
			"url" : "Agency-v2-Eurocucina-sales-pitch-2014-draft-31-03-2014_Page_005.jpg",
			"order" : 5,
			"media" : null		
		},
		{
			"url" : "Agency-v2-Eurocucina-sales-pitch-2014-draft-31-03-2014_Page_006.jpg",
			"order" : 6,
			"media" : null		
		},
		{
			"url" : "Agency-v2-Eurocucina-sales-pitch-2014-draft-31-03-2014_Page_007.jpg",
			"order" : 7,
			"media" : null		
		},
		{
			"url" : "Agency-v2-Eurocucina-sales-pitch-2014-draft-31-03-2014_Page_008.jpg",
			"order" : 8,
			"media" : null		
		},
		{
			"url" : "Agency-v2-Eurocucina-sales-pitch-2014-draft-31-03-2014_Page_009.jpg",
			"order" : 9,
			"media" : null		
		}
	}
];

var activeSlides = function (slideId) {
	var slideToShow = [];
	if (slideId > 1) {
		slideToShow.push(_.find(data, { "order": slideId -1 }));
	}

	slideToShow.push(_.find(data, { "order": slideId }));
	
	if (slideId < data.length -1 ) {
		slideToShow.push(_.find(data, { "order": slideId + 1 }));
	}
	
	return slideToShow;
};

var Slide = React.createClass({
	render: function () {
		var style= {
			float: "left",
			width: "1024px",
			"-webkit-transform": "translateX(" + this.props.translate + ")",
			transition: "-webkit-transform " + this.props.transition + " ease-in-out"
		};
		return (
			<div id={"slide-" + this.props.order} style={style}>
				<img src={this.props.imgBg} />
			</div>
		);
	}
});

var coord = {};

var SlideList = React.createClass({
	initialCoord: function (e) {
		coord.startX = e.changedTouches[0].pageX; 
	},
	onMove: function (e) {
		coord.endX = e.changedTouches[0].pageX; 
		coord.delta = coord.endX - coord.startX;
		this.setState({
				//count: this.state.count + 1,
				translate: coord.delta + "px",
				transition: 0
			});
	},
	incrementCount: function (e) {
		coord.endX = e.changedTouches[0].pageX;
		
            var direction;
            if (coord.endX > coord.startX) {
                direction = 'right';
            } else {
                direction = 'left';
            }

            var translateLeft = coord.endX - coord.startX;
            if (Math.abs(translateLeft) < 150) {
                translateLeft = 0;
                
            } else {
                if (direction === 'left') {                  
                    translateLeft = '-1024px';
                } else {                    
                    translateLeft = '1024px';
                }
            }   
		var self = this;
		if (self.state.count < data.length - 1) {
			self.setState({
				//count: this.state.count + 1,
				translate: translateLeft,
				transition: 0.3
			});
			if (translateLeft){
				setTimeout(function () {
					if (direction === 'left') {                  
					    self.setState({
    						count: self.state.count + 1,
    						translate: 0,
    						transition: 0
    					});
					} else {                    
					    self.setState({
    						count: self.state.count -1,
    						translate: 0,
    						transition: 0
    					});
					}
				}, 300); 
			} else {
				setTimeout(function () {
					self.setState({
						transition: 0
					});
				}, 300); 
			}
		}
	},
	getInitialState: function () {
		return {
			count: 1,
			translate: 0,
			transition: 0.3
		};
	},
	
	render: function () {
		var transform,
			transition;
		if (this.state.count === 1) {
			transform = 0;
		} else {
			transform = "-1024px";
		}

		var slidesToShow = activeSlides(this.state.count);
		var slideWrapperWidth = slidesToShow.length;
		var style = {
			width: 1024 * slideWrapperWidth + "px",
			height: "768px",
			webkitTransform: "translateX(" + transform + ")"
		};

		return (
			<div id="slide-wrapper" style={style} onTouchStart={this.initialCoord} onTouchMove={this.onMove} onTouchEnd={this.incrementCount}>{ slidesToShow.map(function (s) {

				return <Slide imgBg={'data/slides/' + s.url} order={s.order} translate={this.state.translate} transition={this.state.transition + "s"} />;
			}, this)}</div>
		);
	}
});

React.render(
	<SlideList />, 
	document.getElementById('content')
); // jshint ignore:line

module.exports = SlideList;
