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

  Handlebars.registerHelper('eachTill', function(ary, max, options) {
    if (!ary || ary.length == 0) {
      return options.inverse(this);
    }

    var result = [ ];
    for (var i = 0; i < max && i < ary.length; ++i) {
      result.push(options.fn(ary[i]));
    }

    return result.join('');
  });

  Handlebars.registerHelper('compare', function(lvalue, rvalue, options) {
    if (arguments.length < 3) {
      throw new Error("Handlerbars Helper 'compare' needs 2 parameters");
    }

    if (typeof lvalue == 'array' || typeof lvalue == 'object') {
      lvalue = lvalue.length;
    }

    var operator = options.hash.operator || "==";

    var operators = {
      '==':       function(l,r) { return l == r; },
      '===':      function(l,r) { return l === r; },
      '!=':       function(l,r) { return l != r; },
      '<':        function(l,r) { return l < r; },
      '>':        function(l,r) { return l > r; },
      '<=':       function(l,r) { return l <= r; },
      '>=':       function(l,r) { return l >= r; },
      'typeof':   function(l,r) { return typeof l == r; }
    }

    if (!operators[operator]) {
      throw new Error("Handlerbars Helper 'compare' doesn't know the operator "+operator);
    }

    var result = operators[operator](lvalue,rvalue);

    if( result ) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  });

  Handlebars.registerHelper('slugify', function (component, options) {
    var slug = component.replace(/[^\w\s]+/gi, '').replace(/ +/gi, '-');

    return slug.toLowerCase();
  });
};
