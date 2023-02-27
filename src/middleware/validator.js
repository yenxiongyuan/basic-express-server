'use strict';

const validator = (req, res, next) => {
  if (!req.query.personName) {
    throw new Error('Name must enter');
  } else {
    next();
  }
};

module.exports = validator;
