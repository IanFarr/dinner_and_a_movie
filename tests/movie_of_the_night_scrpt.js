import Language from "../class/Language.js";
import User from "./User.js";
import Show from "./Show.js";

const V = "v8"
const PAGE = "/static/" + V + "/scripts/page/";
const HEADER = "/static/" + V + "/scripts/component/Header.js";
const FOOTER = "/static/" + V + "/scripts/component/Footer.js";

let headerPromise = new Promise(resolve => {
  import(HEADER).then((component) => {
    resolve(component.default);
  })
});

let footerPromise = new Promise(resolve => {
  import(FOOTER).then((component) => {
    resolve(component.default);
  })
});

let App = {
  V: V,
  API: "/api/",
  name: "Movie of the Night",
  favicon: document.location.protocol + "//" + document.location.host + "/static/image/icon/rectangle.png",
  svgIcon: document.location.protocol + "//" + document.location.host + "/static/image/icon/icon.svg",
  getHeader: () => {
    return headerPromise.then(h => {
      return h.getPromise();
    });
  },
  getFooter: () => {
    return footerPromise.then(f => {
      return f.getPromise()
    });
  },
  getFullHost: () => {
    return document.location.protocol + "//" + document.location.host;
  },
  addToHash: (part) => {
    let hash = window.location.hash;
    if (hash.length < 2) {
      hash = "#" + part;
    } else {
      hash += "," + part;
    }
    history.pushState({}, "", window.location.pathname + window.location.search + hash);
  },
  getFirstHash: () => {
    return window.location.hash.substring(1).split(",")[0];
  },
  goTo: (path) => {
    history.pushState({}, "", path);
    navigate();
  },
  changeTo: (path) => {
    history.replaceState({}, "", path);
    navigate();
  },
  subscribeToMobileApp: subscribeToMobileApp,
  unsubscribeFromMobileApp: unsubscribeFromMobileApp,
  getTheme: () => {
    return theme;
  },
  subscribeToTheme: subscribeToTheme,
  unsubscribeFromTheme: unsubscribeFromTheme,
  subscribeToLogicalTheme: subscribeToLogicalTheme,
  unsubscribeFromLogicalTheme: unsubscribeFromLogicalTheme,
  setLogicalTheme: setLogicalTheme,
  handleLocalLinkClick: (e, href) => {
    if (control || e.metaKey) {
      return;
    }
    e.preventDefault();
    if (href === document.location.href) {
      window.scrollTo(0, 0);
      return;
    }
    history.pushState({}, "", href);
    navigate();
  },
  pushPathToApp: (p) => {
    path = p;
  },
  isMobileApp: isMobileApp,
  isAndroid: () => {
    return navigator.userAgent.toLowerCase().indexOf("android") > -1 && !App.isMobileApp();
  },
  passToMobileApp: (data) => {
    let target = window.ReactNativeWebView;
    if (target == null) {
      target = window['ReactABI33_0_0NativeWebView'];
    }
    target.postMessage(JSON.stringify(data));
  },
  ctrl: () => {
    return control;
  },
};

export default App;

let historyStack = {};
let control = false;
let path;

let content = document.getElementById("content");
let preload = document.getElementById("preload");
let loader = document.getElementById("loader");

let preventScroll = false;
let y = 0;

function start() {
  setLanguage();
  navigate();

  window.addEventListener("keydown", keydownHandler);
  window.addEventListener("keyup", keyupHandler);
  window.addEventListener('popstate', popstateHandler);

  subscribeToMobileApp((isMobileApp) => {
    if (isMobileApp) {
      document.addEventListener('fullscreenchange', onFullScreenChange)
      document.addEventListener('mozfullscreenchange', onFullScreenChange)
      document.addEventListener('msfullscreenchange', onFullScreenChange)
      document.addEventListener('webkitfullscreenchange', onFullScreenChange)
      window.addEventListener("scroll", () => {
        if (preventScroll) {
          window.scrollTo(0, y);
          setTimeout(() => {
            window.scrollTo(0, y);
          }, 1);
          return;
        }
        y = window.scrollY;
      });
    }
  });
  subscribeToTheme((theme) => {
    if (theme === "dark") {
      document.body.className = "dark-theme get-theme";
      document.body.style.backgroundColor = "rgb(32, 32, 32)";
      document.body.style.color = "white";
    } else {
      document.body.className = "default-theme get-theme";
      document.body.style.backgroundColor = "white";
      document.body.style.color = "black";
    }
  });
}

let fullScreenTimeout;

function onFullScreenChange() {
  preventScroll = true;
  if (fullScreenTimeout != null) {
    clearTimeout(fullScreenTimeout);
  }
  setTimeout(() => {
    window.scrollTo(0, y);
  }, 1);
  fullScreenTimeout = setTimeout(() => {
    preventScroll = false;
    fullScreenTimeout = null;
  }, 2);
}

function setLanguage() {
  let subdomain = document.location.hostname.split(".")[0];
  let language;
  if (subdomain === "www") {
    language = "en";
  } else if (Language.includes(subdomain)) {
    language = subdomain;
  } else {
    language = "en";
  }
  Language.set(language);
  Language.direction().then((direction) => {
    document.body.style.direction = direction;
  });
}

function hidePreload() {
  preload.style.display = "none";
}

function insertHeader() {
  headerPromise.then(c => {
    document.body.insertBefore(new c(), content);
  });
}

function appendFooter() {
  footerPromise.then(c => {
    document.body.appendChild(new c());
  });
}

function displayReadyCallback(page) {
  if (firstContent) {
    hidePreload();
    insertHeader();
  } else {
    removeContent();
  }

  content.appendChild(page);

  if (firstContent) {
    appendFooter();
    firstContent = false;
    subscribeToMobileApp((isMobileApp => {
      if (isMobileApp) {
        App.passToMobileApp({ action: "ready" });
      }
    }));
  } else {
    window.scrollTo(0, 0);
  }

  setTimeout(() => {
    loader.style.display = "";
  }, 1);
}

let firstContent = true;

function navigateTo(module, useModuleForStacking, parameters) {
  setTimeout(() => {
    if (useModuleForStacking && historyStack[module] != null) {
      removeContent();
      content.appendChild(historyStack[module]);
      if (historyStack[module].lastScrollPosition != null) {
        window.scrollTo(0, historyStack[module].lastScrollPosition);
      } else {
        window.scrollTo(0, 0);
      }
      setTimeout(() => {
        loader.style.display = "";
      }, 1);
    } else if (!useModuleForStacking && historyStack[path] != null) {
      removeContent();
      content.appendChild(historyStack[path]);
      if (historyStack[path].lastScrollPosition != null) {
        window.scrollTo(0, historyStack[path].lastScrollPosition);
      } else {
        window.scrollTo(0, 0);
      }
      setTimeout(() => {
        loader.style.display = "";
      }, 1);
    } else {
      let page;
      import(PAGE + module + ".js").then(function (component) {
        page = new component.default(() => {
          displayReadyCallback(page)
        }, parameters);
        if (useModuleForStacking) {
          historyStack[module] = page;
        } else {
          historyStack[path] = page;
        }
      });
    }
  }, 1);
}

function navigate() {
  if (!firstContent) {
    loader.style.display = "block";
  }
  path = document.location.pathname;
  let normalizedPath = path + "/";
  if (path === "/") {
    navigateTo("Home", true);
  } else if (normalizedPath.substring(0, "/movie/".length) === "/movie/") {
    let arr = path.split("/");
    let id = arr.pop();
    if (id === "") {
      id = arr.pop()
    }
    id = "movie" + id;
    Show.getShow(id).then(show => {
      if (show == null) {
        navigateTo("NotFound", true);
      } else {
        navigateTo("Title", false, { show: show });
      }
    });
  } else if (normalizedPath.substring(0, "/series/".length) === "/series/") {
    let arr = path.split("/");
    let id = arr.pop();
    if (id === "") {
      id = arr.pop()
    }
    id = "series" + id;
    Show.getShow(id).then(show => {
      if (show == null) {
        navigateTo("NotFound", true);
      } else {
        navigateTo("Title", false, { show: show });
      }
    });
  } else if (normalizedPath.substring(0, "/signin/".length) === "/signin/") {
    navigateTo("SignIn", true);
  } else if (normalizedPath.substring(0, "/signup/".length) === "/signup/") {
    navigateTo("SignUp", true);
  } else if (normalizedPath.substring(0, "/action/".length) === "/action/") {
    navigateTo("Action", false);
  } else if (normalizedPath.substring(0, "/about/api".length) === "/about/api") {
    navigateTo("AboutAPI", true);
  } else if (normalizedPath.substring(0, "/about/".length) === "/about/") {
    navigateTo("About", true);
  } else if (normalizedPath.substring(0, "/menu/".length) === "/menu/") {
    navigateTo("Menu", true);
  } else if (normalizedPath.substring(0, "/reset/".length) === "/reset/") {
    navigateTo("Reset", false);
  } else if (normalizedPath.substring(0, "/termsofservice/".length) === "/termsofservice/") {
    navigateTo("TermsOfService", true);
  } else if (normalizedPath.substring(0, "/privacypolicy/".length) === "/privacypolicy/") {
    navigateTo("PrivacyPolicy", true);
  } else if (normalizedPath.substring(0, "/profile/".length) === "/profile/") {
    navigateTo("Profile", true);
  } else if (normalizedPath.substring(0, "/compareservices/".length) === "/compareservices/") {
    navigateTo("CompareServices", true);
  } else if (normalizedPath.substring(0, "/catalog/".length) === "/catalog/") {
    navigateTo("Catalog", true);
  } else if (normalizedPath.substring(0, "/search/".length) === "/search/") {
    navigateTo("Search", true);
  } else if (normalizedPath.substring(0, "/feed/".length) === "/feed/") {
    navigateTo("Feed", true);
  } else {
    navigateTo("NotFound", true);
  }
}

function removeContent() {
  if (content.children.length > 0) {
    content.children[0].lastScrollPosition = window.scrollY;
    content.children[0].remove();
  }
}

function popstateHandler() {
  if (document.location.pathname === path) {
    content.children[0].notifyInsideNavigation();
    return;
  }
  navigate();
}

function keydownHandler(e) {
  if (e.key === "Control") {
    control = true;
  }
}

function keyupHandler(e) {
  if (e.key === "Control") {
    control = false;
  }
}

let mobileAppDetected = window.isMobileApp && (window.ReactNativeWebView != null || window['ReactABI33_0_0NativeWebView'] != null);

function isMobileApp() {
  return mobileAppDetected;
}

let everReceivedThemeFromApp = false;

let mobileAppCallbacks = [];

let deviceTheme = "default";
if (window.motnDeviceTheme != null) {
  deviceTheme = window.motnDeviceTheme;
  everReceivedThemeFromApp = true;
  setTimeout(() => {
    localStorage.setItem("latestKnownAppTheme", window.motnDeviceTheme);
  }, 10);
} else if (window.matchMedia) {
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    deviceTheme = "dark";
  }
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!isMobileApp()) {
      setDeviceTheme(e.matches ? "dark" : "default");
    }
  });
}

function setDeviceTheme(t) {
  deviceTheme = t;
  if (logicalTheme === "device" && deviceTheme !== theme) {
    setTheme(deviceTheme);
  }
}

let theme;
let themeCallbacks = [];

let logicalTheme = localStorage.getItem("theme");
if (logicalTheme == null) {
  logicalTheme = "dark";
}
if (logicalTheme === "device") {
  theme = deviceTheme;
} else {
  theme = logicalTheme;
}
let logicalThemeCallbacks = [];


if (!mobileAppDetected) {
  let calledOnMobileApp = false;

  window.onMobileApp = () => {
    if (window.ReactNativeWebView == null && window['ReactABI33_0_0NativeWebView'] == null) {
      return;
    }
    if (calledOnMobileApp) {
      return;
    }
    calledOnMobileApp = true;
    mobileAppCallbacks.forEach((callback) => {
      callback(true);
    });
    mobileAppCallbacks = [];
    if (window.motnDeviceTheme != null) {
      everReceivedThemeFromApp = true;
      setDeviceTheme(window.motnDeviceTheme);
      setTimeout(() => {
        localStorage.setItem("latestKnownAppTheme", window.motnDeviceTheme);
      }, 10);
    }
  };
}

window.passDeviceTheme = (t) => {
  everReceivedThemeFromApp = true;
  setDeviceTheme(t);
  setTimeout(() => {
    localStorage.setItem("latestKnownAppTheme", t);
  }, 10);
}

function subscribeToMobileApp(callback) {
  callback(isMobileApp());
  if (!isMobileApp()) {
    mobileAppCallbacks.push(callback);
  }
}

function unsubscribeFromMobileApp(callback) {
  let index = mobileAppCallbacks.indexOf(callback);
  if (index !== -1) mobileAppCallbacks.splice(index, 1);
}

function subscribeToTheme(callback) {
  callback(theme);
  themeCallbacks.push(callback);
}

function unsubscribeFromTheme(callback) {
  let index = themeCallbacks.indexOf(callback);
  if (index !== -1) themeCallbacks.splice(index, 1);
}

function subscribeToLogicalTheme(callback) {
  callback(logicalTheme);
  logicalThemeCallbacks.push(callback);
}

function unsubscribeFromLogicalTheme(callback) {
  let index = logicalThemeCallbacks.indexOf(callback);
  if (index !== -1) logicalThemeCallbacks.splice(index, 1);
}

function setLogicalTheme(t) {
  logicalTheme = t;
  logicalThemeCallbacks.forEach(callback => {
    callback(t);
  });
  let actualTheme;
  if (t === "device") {
    actualTheme = deviceTheme
  } else {
    actualTheme = t;
  }
  if (actualTheme !== theme) {
    setTheme(actualTheme);
  }
  setTimeout(() => {
    localStorage.setItem("theme", t);
  }, 10);
}

function setTheme(t) {
  theme = t
  themeCallbacks.forEach(callback => {
    callback(t);
  })
}

subscribeToMobileApp((isMobileApp) => {
  if (isMobileApp) {
    if (!everReceivedThemeFromApp) {
      App.passToMobileApp({ action: "fetchTheme" });
      let t = localStorage.getItem("latestKnownAppTheme");
      if (t != null) {
        setDeviceTheme(t);
      } else {
        setDeviceTheme("dark");
      }
    }
    subscribeToTheme((theme) => {
      App.passToMobileApp({ action: "theme", theme: theme });
    });
  }
});

start();

User.init();

/*
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  if(isMobileApp()) {
    return;
  }
  setTimeout(() => {
    document.addEventListener("click", () => {e.prompt();}, {once: true});
  }, 60 * 1000);
});
 */

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service.js');
}

