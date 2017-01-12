var ColorHandler = (function () {

    function ColorHandler(name) {
        this.colorId = 'color-' + name.replace(/[^A-Za-z0-9\-_]/g, '-');
        this.colors = [];
        this.defaultColor = '#FF0';
        this.defaultOrientation = 90;
        this.orientation = this.defaultOrientation;
        this.gradient = null;
        this.svg = document.querySelector("#svg_colors");
        this.createGradient(this.svg, this.colorId);
    }

    ColorHandler.prototype.getColorId = function () {
        return this.colorId;
    };

    ColorHandler.prototype.setOrientation = function (orientation) {
        this.orientation = 360-(parseInt(orientation) + parseInt(this.defaultOrientation));
        console.log("ColorHandler: " + this.orientation)
        this.updateGradient();
    };

    ColorHandler.prototype.setColorArray = function (colors) {
        this.colors = colors;
        this.updateGradient();
    };

    ColorHandler.prototype.getColorByIndex = function (index) {
        var color = this.colors['' + index];
        if (color === undefined || color == null) {
            return this.defaultColor;
        }
        return this.colors['' + index]
    };

    ColorHandler.prototype.createGradient = function (svg, id) {

        if (this.gradient == null) {

            var gradient = document.getElementById(id);
            var gradientExists = gradient !== undefined && gradient != null;

            if (!gradientExists) {
                var svgNS = svg.namespaceURI;
                this.gradient = document.createElementNS(svgNS, 'linearGradient');

                this.gradient.setAttribute('id', id);
                this.gradient.setAttribute('spreadMethod', 'pad');

                var defs = svg.querySelector('defs') || svg.insertBefore(document.createElementNS(svgNS, 'defs'), svg.firstChild);
                defs.appendChild(this.gradient);
            }

        }

    };

    ColorHandler.prototype.updateGradient = function () {

        if (this.gradient != null) {

            var angle = this.orientation;
            var anglePI = (angle) * (Math.PI / 180);
            var angleCoords = {
                'x1': Math.round(50 + Math.sin(anglePI) * 50) + '%',
                'y1': Math.round(50 + Math.cos(anglePI) * 50) + '%',
                'x2': Math.round(50 + Math.sin(anglePI + Math.PI) * 50) + '%',
                'y2': Math.round(50 + Math.cos(anglePI + Math.PI) * 50) + '%'
            };

            this.gradient.setAttribute('x1', angleCoords.x1);
            this.gradient.setAttribute('y1', angleCoords.y1);
            this.gradient.setAttribute('x2', angleCoords.x2);
            this.gradient.setAttribute('y2', angleCoords.y2);

            this.gradient.innerHTML = '';

            var svgNS = this.svg.namespaceURI;
            var stops = this.getGeneratedColorStops();

            for (var i = 0; i < stops.length; i++) {
                var attrs = stops[i];
                var stop = document.createElementNS(svgNS, 'stop');
                for (var attr in attrs) {
                    if (attrs.hasOwnProperty(attr)) stop.setAttribute(attr, attrs[attr]);
                }
                this.gradient.appendChild(stop);
            }
        }

    };

    ColorHandler.prototype.getGeneratedColorStops = function () {

        var colorStops = [];
        var size = this.colors.length;
        var anteile = 100 / size;
        var prozent = 0;

        for (var i = 0; i < size; i++) {

            var isLastIndex = (i + 1) == size;

            colorStops.push({offset: prozent + '%', 'stop-color': '' + this.getColorByIndex(i)});

            prozent += anteile;
            if (isLastIndex) prozent = 100;

            colorStops.push({offset: prozent + '%', 'stop-color': '' + this.getColorByIndex(i)})
        }

        return colorStops;
    };

    return ColorHandler;

}());
