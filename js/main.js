performance.mark('start_all');

(function() {

    console.log('main.js')

    const Main = function() {};

    Main.prototype = {
        init: function () {
            performance.mark('start_module');
            console.log('[Main] init');
            this.parseDom();
        },
        parseDom: function () {
            performance.mark('start_dom_access');
            const root1 = document.querySelector('.root1');
            performance.mark('end_dom_access');

            performance.mark('start_dom_access_multiple');
            const multipleElements = document.querySelectorAll('.link');
            this.updateDom(multipleElements);
            performance.mark('end_dom_access_multiple');

            const root2 = document.querySelector('.root2');

            if (root1) {
                console.log('domRoot1 %c' + root1, "background-color:#00cc00;color:white;");
                console.log('domRoot1 element #1', root1)
            } else {
                console.log('domRoot1 %c' + (root1 ? root1 : ' not ready '), "background-color:#cc0000;color:white;");
            }

            if (root2) {
                console.log('domRoot2 %c' + root2, "background-color:#00cc00;color:white;");
                console.log('domRoot2 element #2', root2)
            } else {
                console.log('domRoot2 %c not ready ', "background-color:#cc0000;color:white;");
            }

            console.log('nb multipleElements [.link selector]', multipleElements.length);
        },
        updateDom: function (elements) {
            elements.forEach(function (elem, idx) {
                elem.setAttribute('href', 'http://www.ingin.fr?script-defer?p='+idx)
            })
        }
    }

    const app = new Main();
    app.init();

    performance.mark('end_all');

    performance.measure('module-loading-duration', 'start_module', 'end_all');
    performance.measure('script-loading-duration', 'start_all', 'end_all');
    performance.measure('simple-dom-access-duration', 'start_dom_access', 'end_dom_access');
    performance.measure('multiple-dom-access-duration', 'start_dom_access_multiple', 'end_dom_access_multiple');

    var measureDatas = performance.getEntriesByType("measure");

    var allMeasure = {};
    measureDatas.forEach(function (measure) {
        allMeasure[measure.name] = measure.duration;

    });
    console.table({allMeasure});

    // Clean up the stored markers.
    performance.clearMarks();
    performance.clearMeasures();
})();
