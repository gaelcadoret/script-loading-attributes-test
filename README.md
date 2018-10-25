# script-loading-attributes-test
shows the specificities between the different attributes :
* ASYNC 
* DEFER

of a JavaScript script and show how to use the performance API with following methods : 
* performance.mark, 
* performance.measure
* performance.getEntriesByType

## Installation of the optional dependency
`npm install`

## Start server (if you do not have one)
`npm start`

Server start at => `http://localhost:3040` and have a look inside the console devtool ;)

## Update script attribute
Inside "index.html" file, change the script tag as following :
#### No attribute
```html
<script src="js/main.js"></script>
```
Console result is the following
```
domRoot1 not ready   // Dom was not ready yet when script was executed (nothing was found) !
domRoot2 not ready   // Dom was not ready yet when script was executed (nothing was found) !
```

#### "async" attribute
```html
<script async src="js/main.js"></script>
```
Console result is the following
```
domRoot1 [object HTMLDivElement]    // one node has been found !
domRoot2 not ready                  // Dom was not ready yet (nothing was found) !
```

#### "defer" attribute
```html
<script defer src="js/main.js"></script>
```
Console result is the following
```
domRoot1 [object HTMLDivElement]    // one node has been found !
domRoot2 [object HTMLDivElement]    // one node has been found !
```

## Conclusion
* async => the navigator doesn't block DOM parsing during script loading **but it doesn't wait the end of DOM parsing** before script execution start
* defer => the navigator doesn't block DOM parsing and **wait the end of DOM parsing before script execution start**.  