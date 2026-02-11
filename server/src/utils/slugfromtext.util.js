function slugify(text) {
  return text
    .toString()
    .normalize("NFD")                 // tách dấu
    .replace(/[\u0300-\u036f]/g, "")  // xóa dấu
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")             // space -> -
    .replace(/[^\w\-]+/g, "")         // xóa ký tự đặc biệt
    .replace(/\-\-+/g, "-");          // -- -> -
}
module.exports = slugify;
