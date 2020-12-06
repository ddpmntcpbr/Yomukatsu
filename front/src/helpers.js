export const _sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const isNonEmptyArray = (obj) => {
  if(typeof obj === 'undefined'){
    return false
  } else if(obj.length === 0) {
    return false
  } else {
    return true
  }
}