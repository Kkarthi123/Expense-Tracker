function getCookie(name) {
    const cookieArr = document.cookie.split(';'); // Split into individual cookies
    for (let cookie of cookieArr) {
      cookie = cookie.trim(); // Remove extra spaces
      if (cookie.startsWith(`${name}=`)) {
        return cookie.substring(name.length + 1); // Return the cookie's value
      }
    }
    return null; // Cookie not found
}

function deleteCookie(name) {
  // Set the cookie's expiration date to a past date
  document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
}


function setCookie(name,value,days, secure) {
  var expires = "";
  if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days*24*60*60*1000));
      expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/; Secure; SameSite=None";
}




  
  export { getCookie, deleteCookie, setCookie};