
const createError = (status, mess, code = null) => {

    const err = new Error(mess);

    err.status = status;
    err.code = code;

    return err;

}


export default createError