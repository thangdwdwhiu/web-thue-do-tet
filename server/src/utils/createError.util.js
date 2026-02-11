
const createError = (status, mess, code = null, data = null) => {

    const err = new Error(mess);

    err.status = status;
    err.code = code;
    if (data) {
      err.data = data;
    }

    return err;

}
module.exports = createError