(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

},{"./prepreprocessors":2}],2:[function(require,module,exports){
function createPrePreprocessors (execlib, applib, templateslib, htmltemplateslib) {
  'use strict';

  var lib = execlib.lib,
    BasicProcessor = applib.BasicProcessor;

  function ProfilePropertiesAppInitProcessor () {
    BasicProcessor.call(this);
  }
  lib.inherit(ProfilePropertiesAppInitProcessor, BasicProcessor);
  ProfilePropertiesAppInitProcessor.prototype.process = function (desc) {
    var _environmentname = this.config.environment;
    desc.preprocessors = desc.preprocessors || {};
    desc.preprocessors.Command = desc.preprocessors.Command || [];
    desc.preprocessors.Command.push({
      environment: _environmentname,
      entity: {
        name: 'getUserProfile',
        options: {
          sink: '.',
          name: 'getUserProfile'
        }
      }
    });
    desc.preprocessors.DataSource = desc.preprocessors.DataSource || [];
    desc.preprocessors.DataSource.push({
      environment: _environmentname,
      entity: {
        name: 'lastSocialProfileUpdate',
        type: 'allexstate',
        options: {
          sink: '.',
          path: 'lastSocialProfileUpdate'
        }
      }
    });
    desc.logic = desc.logic || [];
    desc.logic.push({
      triggers: 'datasource.lastSocialProfileUpdate:data',
      references: 'environment.'+_environmentname+'>onLastSocialProfileUpdate',
      handler: function (envupdfunc, lspudata) {
        envupdfunc(lspudata);
      }
    });
  };


  applib.registerPrePreprocessor('SocialProfilePropertiesInit', ProfilePropertiesAppInitProcessor);
}

module.exports = createPrePreprocessors;

},{}]},{},[1]);
