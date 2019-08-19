jQuery.sap.declare('com.hcl.hclBOT.utils.Formatters');

com.hcl.hclBOT.utils.Formatters = (function () {
    "use strict";
    return {
        getImgLnk: function (imgName) {
        	var sRootPat = jQuery.sap.getModulePath("com.hcl.hclBOT");
            return sRootPat+"/images/"+imgName;
        }
    };
})();