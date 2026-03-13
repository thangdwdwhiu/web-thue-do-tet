function slugify(text) {
  const baseSlug = text
    .toString()
    .normalize("NFD")                 
    .replace(/[\u0300-\u036f]/g, "")  
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")             
    .replace(/[^\w\-]+/g, "")         
    .replace(/\-\-+/g, "-");          

  const random = Math.random().toString(36).substring(2, 6); 
  const timestamp = Date.now().toString(36);

  return `${baseSlug}-${timestamp}-${random}`;
}

module.exports = slugify;