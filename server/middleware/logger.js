const logger = (req, res, next) => {
  const originalEnd = res.end.bind(res);
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  };

  console.log("Timestamp:", new Date().toLocaleString("en-us", options));
  console.log("Method:   ", req.method);
  console.log("Path:     ", req.path);
  console.log("Body:     ", req.body);

  res.end = (encoding) => {
    console.log("Status:   ", res.statusCode);
    console.log("---");

    originalEnd.call(this, encoding);
  };

  next();
};

export default logger;
