(function (execlib) {
  'use strict';
  var lib = execlib,
    execSuite = execlib.execSuite,
    lR = execSuite.libRegistry,
    envlib = lR.get('allex_environmentlib'),
    applib = lR.get('allex_applib'),
    templateslib = lR.get('allex_templateslitelib'),
    htmltemplateslib = lR.get('allex_htmltemplateslib')/*,
    globals = require('./globals')(execlib, applib, templateslib, htmltemplateslib)*/;

  //require('./modifiers')(execlib.lib, applib, templateslib, htmltemplateslib);
  require('./prepreprocessors')(execlib, applib, templateslib, htmltemplateslib);

})(ALLEX);
