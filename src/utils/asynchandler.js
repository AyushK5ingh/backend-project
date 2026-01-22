const asyncHandler = (requestHandler) => async (req, res, next) => {
    return Promise.resolve(requestHandler(req, res, next)).catch((err)=>next(err))
};

export { asyncHandler };

//const asyncHandler = (fn) => {}
// const asyncHandler = (fn) => async() => {()=>{}}
// const asyncHandler = (fn) => async() => ()=>{}

// const asyncHandler = (fn) => async (req, res, next) => {
//   try {
//     await fn(req, res, next);
//   } catch (error) {
//     res.status(error.status || 500).json({
//       success: false,
//       message: error.message || "Internal Server Error",
//     });
//   }
// };
