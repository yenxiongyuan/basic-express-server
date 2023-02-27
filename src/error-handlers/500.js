'use strict';

// express take in  1     2    3    4
module.exports = (error, req, res, next) => {
  res.status(500).send({
    error: 500,
    route: req.path,
    query: req.query,
    body: req.body,
    message: typeof(error) === 'string' ? error : `SERVER ERROR: ${error.message}`,
  });
};
