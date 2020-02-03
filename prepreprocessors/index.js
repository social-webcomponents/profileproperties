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
