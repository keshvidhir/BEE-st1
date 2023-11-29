// Pagination middleware
function paginateResults(model) {
  return async (req, res, next) => {
      const page = parseInt(req.query.page);
      const pageSize = parseInt(req.query.pageSize);

      const startIndex = (page - 1) * pageSize;
      const endIndex = page * pageSize;

      const results = {};

      if (endIndex < (await model.countDocuments().exec())) {
          results.next = {
              page: page + 1,
              pageSize: pageSize
          };
      }

      if (startIndex > 0) {
          results.previous = {
              page: page - 1,
              pageSize: pageSize
          };
      }

      try {
          results.results = await model.find().limit(pageSize).skip(startIndex).exec();
          res.paginatedResults = results;
          next();
      } catch (err) {
          res.status(500).json({ message: err.message });
      }
  };
}
