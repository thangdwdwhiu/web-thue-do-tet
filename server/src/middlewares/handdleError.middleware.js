
const handleCatchError = (err, req, res, next) => {
    const isCustom = err.status ? true : false;
    const status = isCustom ? err.status : 500;
    const error = isCustom ? err.message : "Lỗi server";
    const code = isCustom ? err.code : "SERVER_ERROR";

    if(!isCustom){
        console.log(err);
        
    }
    
    return res.status(status).json({
        success: false,
        error,
        code
    })

}
module.exports = handleCatchError;