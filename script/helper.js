function isValidUSZip(sZip) {
  console.log("function start: isValidUSZip()");
  var return_var = /^\d{5}(-\d{4})?$/.test(sZip)
  console.log("return_var: " + return_var);
  return return_var;
}
