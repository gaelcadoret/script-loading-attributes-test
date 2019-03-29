performance.mark('start_all');

(function() {

    console.log('localStorage.js');

    const Metrics = function() {};

    Metrics.prototype = {

        init: function () {
            performance.mark('start_module');
            console.log('[localStorage] init');

            this.arrayNOccurences = this.initArrayOfNItems(5000);

            // Inertion metrics tests
            this.insertLocalStorageSingleData();
            this.insertMultipleLocalStorageDatas();

            // Access metrics tests
            this.readLocalStorageSingleData();
            this.readLocalStorageMultipleDatas();
            // this.insertLocalStorageDatas();
        },

        initArrayOfNItems: function(nbOccurences) {
            return Array.apply(null, {length: nbOccurences}).map(Number.call, Number);
        },

        insertLocalStorageSingleData: function() {
            console.log('[localStorage] insertLocalStorageDatas');

            const singleData  = this.arrayNOccurences.map((el) => {
                return {
                    [`key-${el}`]: 'NEW_FLASH'
                }
            });

            performance.mark('start_localstorage_insert_single_entry');
            localStorage.setItem('fig-flashes-infos', JSON.stringify(singleData));
            performance.mark('end_localstorage_insert_single_entry');
        },

        insertMultipleLocalStorageDatas: function() {
            console.log('[localStorage] insertLocalStorageDatas');

            performance.mark('start_localstorage_insert_multiple_entries');
            this.arrayNOccurences.forEach((el) => localStorage.setItem(`key-${el}`, 'NEW_FLASH'));
            performance.mark('end_localstorage_insert_multiple_entries');
        },

        readLocalStorageSingleData: function () {
            performance.mark('start_localstorage_read_single_entry');
            localStorage.getItem('fig-flashes-infos');
            performance.mark('end_localstorage_read_single_entry');
        },

        readLocalStorageMultipleDatas: function () {
            performance.mark('start_localstorage_read_multiple_entry');
            this.arrayNOccurences.forEach((el) => localStorage.getItem(`key-${el}`, 'NEW_FLASH'));
            performance.mark('end_localstorage_read_multiple_entry');
        }

    }

    const app = new Metrics();
    app.init();

    performance.mark('end_all');

    // performance.measure('module-loading-duration (ms)', 'start_module', 'end_all');
    // performance.measure('script-loading-duration (ms)', 'start_all', 'end_all');

    performance.measure('ls-insert-single-entry-duration (ms)', 'start_localstorage_insert_single_entry', 'end_localstorage_insert_single_entry');
    performance.measure('ls-insert-multiple-entries-duration (ms)', 'start_localstorage_insert_multiple_entries', 'end_localstorage_insert_multiple_entries');

    performance.measure('ls-read-single-entries-duration (ms)', 'start_localstorage_read_single_entry', 'end_localstorage_read_single_entry');
    performance.measure('ls-read-multiple-entries-duration (ms)', 'start_localstorage_read_multiple_entry', 'end_localstorage_read_multiple_entry');


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
