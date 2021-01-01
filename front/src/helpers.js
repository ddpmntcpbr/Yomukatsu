export const _sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const isNonEmptyArray = (obj) => {
  if(typeof obj === 'undefined'){
    return false
  } else if(obj.length === 0) {
    return false
  } else if(0 === Object.keys(obj).length){
    return false
  } else {
    return true
  }
}

export const getDateString = () => {
  const nowDate = new Date();
  const dateString =  ("" + nowDate.getFullYear()).slice(-2)  +
                      ("00" + (nowDate.getMonth() + 1)).slice(-2)  +
                      ("00" + (nowDate.getDate())).slice(-2) +
                      ("00" + (nowDate.getHours())).slice(-2) +
                      ("00" + (nowDate.getMinutes())).slice(-2) +
                      ("00" + (nowDate.getSeconds())).slice(-2);
  return dateString
}