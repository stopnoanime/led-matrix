(()=>{"use strict";let e;addEventListener("message",t=>{"start"==t.data.action?e=setTimeout(()=>self.postMessage("tick"),t.data.time):clearTimeout(e)})})();