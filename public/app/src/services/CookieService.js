export class CookieService {
	constructor() {

	}
	get(cookieName) {
		 var name = cookieName + "=";
		var allCookies = document.cookie;
		console.log( "all cookies", allCookies);
		var cookies = allCookies.split(";");
		for(var i=0; i<cookies.length; i++) {
        	var c = cookies[i];
        	while (c.charAt(0)==' ') c = c.substring(1);
        	if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    	}
    	return "";
	}

}