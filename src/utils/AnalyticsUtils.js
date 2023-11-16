export const getOperatingSystemType = () => {
    var userAgent = window.navigator.userAgent,
        platform = window.navigator.platform,
        macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
        windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
        iosPlatforms = ['iPhone', 'iPad', 'iPod'],
        os = null;

    if (macosPlatforms.indexOf(platform) !== -1) {
        os = 'Mac OS';
    } else if (iosPlatforms.indexOf(platform) !== -1) {
        os = 'iOS';
    } else if (windowsPlatforms.indexOf(platform) !== -1) {
        os = 'Windows';
    } else if (/Android/.test(userAgent)) {
        os = 'Android';
    } else if (!os && /Linux/.test(platform)) {
        os = 'Linux';
    }
    return os;
};


export const getBrowserType = () => {
    let browser = null;
    if ((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) != -1) {
        browser = "Opera"
    } else if (navigator.userAgent.indexOf("Edg") != -1) {
        browser = "Edge"
    } else if (navigator.userAgent.indexOf("Chrome") != -1) {
        browser = "Chrome"
    } else if (navigator.userAgent.indexOf("Safari") != -1) {
        browser = "Safari"
    } else if (navigator.userAgent.indexOf("Firefox") != -1) {
        browser = "Firefox"
    } else if ((navigator.userAgent.indexOf("MSIE") != -1) || (!!document.documentMode == true)) //IF IE > 10
    {
        browser = "IE"
    } else {
        browser = "unknown"
    }
    return browser;
}
export const getDeviceType = () => {
    let device = null;
    let ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
        device = "tablet";
    }
    if (
        /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
            ua
        )
    ) {
        device = "mobile";

    }
    device = "desktop";
    return device;
};
