/*
 * Check that this is being loaded on codemancer.com or from a dev
 * environment (i.e. it has a colon denoting a port other than 80
 */
if(document.URL.indexOf("codemancer") == -1 &&
   document.URL.indexOf(":") == -1){
  window.location = 'http://www.codemancer.com/';
}
