'use strict';

var server = require('server');


server.get('Show', function (req, res, next) {

    //define a variable named PageMgr that requires the dw.experience.PageMgr API
    var PageMgr = require('dw/experience/PageMgr');
    //get the page with the specific, hard-coded id
    var page = PageMgr.getPage('salepage');

   
    //Hint: Use hasVisibilityRules() and isVisible() checks.
  
 
    if (page.hasVisibilityRules()) {  //  there are customer groups or schedule or campaign....
        if (page.isVisible()) {   //  conditions for page to display are fine.  
            // There are multiple versions of this page, so no caching.
            res.page(page.ID, {});
        }
        else {
            //page is not visible....
            res.print('you cannot access this page');
        }
    }
    else {  
        // We could cache this page because it is not targeted.
        res.cachePeriod = 168;
        res.cachePeriodUnit = 'hours';
        res.page(page.ID, {});
    }
    next();
});


module.exports = server.exports();
