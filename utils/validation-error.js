
// interface ValidationErrorParam {
//   details: {
//     message: string;
//   }[];

// }
// export const parseValidationError = (
//     validationError: ValidationErrorParam,
//   ): string[] => validationError.details.map(({ message }) => message);

const ValidationErrorParam = {
  details: {
    message: String
  }
}
const parseValidationError = (ValidationErrorParam)=>{
    console.log(error)
    return ValidationErrorParam.details.map(({ message }) => message);
}
console.log(typeof parseValidationError)
exports.parseValidationError = parseValidationError
  // module.exports = {
  //   parseValidationError: (error)=>{
  //       console.log(error)
  //       return error.details.map(({ message }) => message);
  //   }

    // parseValidationError: async (error)=>{
     
    //    const message = error.details.map(({ message }) => message) 
    //    console.log
    //    console.log(message[0].message)
    //    return message[0].message
    // }
  