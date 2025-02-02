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



  
  export { getCookie, deleteCookie};