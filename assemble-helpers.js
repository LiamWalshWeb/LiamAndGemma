'use strict';

module.exports.register = function (Handlebars, options, params)  {
  Handlebars.registerHelper('files', function (glob)  {
    var files = params.grunt.file.expand({
      filter: 'isFile',
      cwd: '.tmp'
    }, [glob]);

    for (var i = 0, fl = files.length; i < fl; i++) {
      var file = files[i].match(/\/([^/]*)$/)[1];
      var fileName = file.substr(0, file.lastIndexOf('.')) || file;
      
      files[i] = {
        src: files[i],
        name: fileName
      };
    }

    return files;
  });
};
