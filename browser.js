/**
 * @author: alexander@majorov.su
 * Date: 25.09.13
 * Time: 15:22
 */
(function(window, navigator){
	var Client = function(){
		var that = this;
		this.browser = {
			name: this.ss([
				{
					string: navigator.userAgent,
					subString: "Chrome",
					identity: "Chrome"
				},
				{
					string: navigator.vendor,
					subString: "Apple",
					identity: "Safari",
					vs: "Version"
				},
				{
					prop: window.opera,
					identity: "Opera",
					vs: "Version"
				},
				{
					string: navigator.userAgent,
					subString: "Firefox",
					identity: "Firefox"
				},
				{
					string: navigator.userAgent,
					subString: "MSIE",
					identity: "Explorer",
					vs: "MSIE"
				}
			]) || "unknown",

			ver : this.sv(navigator.userAgent) || this.sv(navigator.appVersion) || "0",

			os  : this.ss([
				{
					string: navigator.platform,
					subString: "Win",
					identity: "Windows"
				},
				{
					string: navigator.platform,
					subString: "Mac",
					identity: "Mac"
				},
				{
					string: navigator.userAgent,
					subString: "iPhone",
					identity: "iPhone/iPod"
				},
				{
					string: navigator.platform,
					subString: "Linux",
					identity: "Linux"
				}
			]) || "unknown",

			toString: function() {
				return [that.browser.name, that.browser.ver, that.browser.os].join(' ')
			}
		}
	};

	Client._ = Client.prototype;

	Client._.ss = function (data){
		var ds, dp;
		for (var i=0;i<data.length;i++){

			ds = data[i].string;
			dp = data[i].prop;

			this._v = data[i].vs || data[i].identity;

			if (ds) {
				if (ds.indexOf(data[i].subString) != -1)
					return data[i].identity;
			}
			else if (dp)
				return data[i].identity;
		}
	};

	Client._.sv = function (ds){
		var index = ds.indexOf(this._v);
		if (index == -1) return;
		return parseFloat(ds.substring(index+this._v.length+1));
	};

	window.browser = (new Client).browser;
})(window, navigator);