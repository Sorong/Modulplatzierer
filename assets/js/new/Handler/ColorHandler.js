var ColorHandler = (function () {

    function ColorHandler(name) {
        this.name = 'color-' + name.replace(/[^A-Za-z0-9\-_]/g, '-');
        this.colorContainer = null;
        this.colors = [];
        this.defaultColor = '#FF0';
        this.size = 3;
        this.orientation = 0;
        this.createSvgContainer();
		this.linearGradient = null;
    }

    ColorHandler.prototype.setSize = function (size) {
        this.size = size;
        this.render();
    };

    ColorHandler.prototype.setColor = function (index, color) {
        this.colors['' + index] = color;
    };

    ColorHandler.prototype.getColor = function (index) {
        var color = this.colors['' + index];
        if (color === undefined || color == null) {
            return this.defaultColor;
        }
        return this.colors['' + index]
    };

    ColorHandler.prototype.removeColor = function (index) {
        this.colors['' + index].remove();
    };

    function createGradient(svg, id, stops) {
		if(this.linearGradient == null){
			var svgNS = svg.namespaceURI;
			this.linearGradient = document.createElementNS(svgNS, 'linearGradient');

			this.linearGradient.setAttribute('id', id);
			this.linearGradient.setAttribute('spreadMethod', 'pad');
			
			var angle = 135;
			var anglePI = (angle) * (Math.PI / 180);
			var angleCoords = {
				'x1': Math.round(50 + Math.sin(anglePI) * 50) + '%',
				'y1': Math.round(50 + Math.cos(anglePI) * 50) + '%',
				'x2': Math.round(50 + Math.sin(anglePI + Math.PI) * 50) + '%',
				'y2': Math.round(50 + Math.cos(anglePI + Math.PI) * 50) + '%',
			}
		
			this.linearGradient.setAttribute('x1', angleCoords.x1);
			this.linearGradient.setAttribute('y1', angleCoords.y1);
			this.linearGradient.setAttribute('x2', angleCoords.x2);
			this.linearGradient.setAttribute('y2', angleCoords.y2);

			for (var i = 0; i < stops.length; i++) {
				var attrs = stops[i];
				var stop = document.createElementNS(svgNS, 'stop');
				for (var attr in attrs) {
					if (attrs.hasOwnProperty(attr)) stop.setAttribute(attr, attrs[attr]);
				}
				this.linearGradient.appendChild(stop);
			}

			var defs = svg.querySelector('defs') || svg.insertBefore(document.createElementNS(svgNS, 'defs'), svg.firstChild);
			return defs.appendChild(this.linearGradient);
		}
    }

    ColorHandler.prototype.createSvgContainer = function () {
        this.colorContainer = document.querySelector("#svg_colors");
        this.render();
    };

    ColorHandler.prototype.render = function () {

        var colors = [];
        var anteile = 100 / this.size;
        var prozent = 0;

        var green = '#0f0';
        var yellow = '#ff0';
        var red = '#f00';


        var first = true;
        var currentIndex = 0;
        for (var i = 0; i < this.size; i++) {

            if (first) {
                prozent = 0;
                first = false
            }
            colors.push({offset: prozent + '%', 'stop-color': '' + this.getColor(i)});

            prozent += anteile;
            if ((i + 1) == this.size) {
                prozent = 100;
            }
            colors.push({offset: prozent + '%', 'stop-color': '' + this.getColor(i)})
        }

		createGradient(this.colorContainer, this.name, colors);
		
        /*createGradient(this.colorContainer, this.name, [
            {offset: '0%', 'stop-color': '#ff0'},
            {offset: '33.33%', 'stop-color': '#ff0'},

            {offset: '33.33%', 'stop-color': '#f00'},
            {offset: '66.66%', 'stop-color': '#f00'},

            {offset: '66.66%', 'stop-color': '#0f0'},
            {offset: '100%', 'stop-color': '#0f0'}
        ]); */
    };

    ColorHandler.prototype.getColorId = function () {
        return this.name;
    };

    return ColorHandler;

}());
