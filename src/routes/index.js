import { adminUserRouter } from "./admin.user.routes.js";
import { categoryRouter } from "./category.routes.js";
import { postRouter } from "./post.routes.js";

const initRoutes = (app) => {
  // category routes
  app.use("/category", categoryRouter);

  // post routes
  app.use("/post", postRouter);

  // admin user routes - signup, signin
  app.use("/adminuser", adminUserRouter);

  // Global Error Handling Middleware
  app.use((err, req, res, next) => {
    console.error(err.stack); // Log the error stack trace for debugging

    const statusCode = err.statusCode || 500; // Use status code from error or default to 500
    const message = err.message || "Internal Server Error"; // Use message from error or default

    // Send error response
    res.status(statusCode).json({
      status: "error",
      statusCode,
      message,
    });
  });
};

export { initRoutes };
