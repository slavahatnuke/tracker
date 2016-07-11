var FileService = function (GridFS) {
  var _ = require('lodash');

  this.removeFilesByTask = function (task, next) {
    next = next || _.noop;
    GridFS.remove(task.files, next);
  };
  
  this.removeFile = function (file, next) {
    next = next || _.noop;
    GridFS.removeFile({_id: file}, next);
  };

  this.connectFiles = function (task, next) {
    next = next || _.noop;
    
    if (task && task.files && task.files.length) {
      GridFS.connect(task.files, next);
    } else {
      next();
    }
  };
};

module.exports = FileService;