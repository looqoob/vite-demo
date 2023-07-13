export const getDate = () => {
  let time = new Date();
  var year = time.getFullYear();
	var month = time.getMonth() + 1;
	var day = time.getDate();
  let h = time.getHours() < 10 ? "0" + time.getHours() : time.getHours();
  let m = time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes();
  let s = time.getSeconds() < 10 ? "0" + time.getSeconds() : time.getSeconds();
  return year + "-" + month + "-" + day + " " + h + ":" + m + ":" + s;
};
