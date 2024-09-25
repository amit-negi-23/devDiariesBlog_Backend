export const apiResponseErr = (data, success, responseCode, errMessage) => {
    return {
      data: data,
      success: success,
      responseCode: responseCode,
      errMessage: errMessage ?? 'Something went wrong',
    };
  };
  export const apiResponseSuccess = (data, success, responseCode, resMessage) => {
    return {
      data: data,
      success: success,
      responseCode: responseCode,
      resMessage: resMessage
    };
  };
  
export const apiResponsePagination = (
  data,
  success,
  responseCode,
  resMessage,
  { page, totalPages, totalItems },
  res
) => {
  return res.status(responseCode).send({
      data: data,
      success: success,
      responseCode: responseCode,
      resMessage: resMessage,
      pagination: {
          page: page,
          totalPages: totalPages,
          totalItems: totalItems,
      },
  })
}