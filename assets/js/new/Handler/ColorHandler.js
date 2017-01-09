var ColorHandler = (function () {

    function ColorHandler(name) {
        this.name = 'color-' + name.replace(/[^A-Za-z0-9\-_]/g, '-');
        this.colorContainer = null;
        this.colors = [];
        this.defaultColor = '#FF0';
        this.size = 0;
        this.orientation = 0;
        this.createSvgContainer();
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
        var svgNS = svg.namespaceURI;
        var grad = document.createElementNS(svgNS, 'linearGradient');

        var degrees = 135;
        var angleInRadians = degrees * Math.PI / 180;
        var length = 100;

        var endX = Math.cos(angleInRadians) * length;
        var endY = Math.sin(angleInRadians) * length;

        grad.setAttribute('id', id);
        grad.setAttribute('x1', 0 + '%');
        grad.setAttribute('y1', 0 + '%');
        grad.setAttribute('x2', 100 + '%');
        grad.setAttribute('y2', 100 + '%');

        grad.setAttribute('gradientTransform', 'rotate(45)');

        for (var i = 0; i < stops.length; i++) {
            var attrs = stops[i];
            var stop = document.createElementNS(svgNS, 'stop');
            for (var attr in attrs) {
                if (attrs.hasOwnProperty(attr)) stop.setAttribute(attr, attrs[attr]);
            }
            grad.appendChild(stop);
        }

        var defs = svg.querySelector('defs') || svg.insertBefore(document.createElementNS(svgNS, 'defs'), svg.firstChild);
        return defs.appendChild(grad);
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

        createGradient(this.colorContainer, this.name, [
            {offset: '0%', 'stop-color': '#ff0'},
            {offset: '33.33%', 'stop-color': '#ff0'},

            {offset: '33.33%', 'stop-color': '#f00'},
            {offset: '66.66%', 'stop-color': '#f00'},

            {offset: '66.66%', 'stop-color': '#0f0'},
            {offset: '100%', 'stop-color': '#0f0'}
        ]);
    };

    ColorHandler.prototype.getColorId = function () {
        return this.name;
    };

    return ColorHandler;

}());
