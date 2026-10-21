
/* ==========================
   DISQUS CONFIGURATION
========================== */

const DISQUS_SHORTNAME = "ac-15";

/* Identify the page's discussion thread. */
var disqus_config = function () {
    var canonical = document.querySelector(
        'link[rel="canonical"]'
    );

    this.page.url = canonical
        ? canonical.href
        : window.location.href.split("#")[0];

    this.page.identifier =
        window.location.pathname.replace(/\/+$/, "") || "/";

    this.page.title = document.title;
};

/* Load Disqus. */
(function () {
    var comments = document.getElementById("disqus_thread");

    if (!comments) {
        return;
    }

    if (!DISQUS_SHORTNAME) {
        comments.textContent =
            "Disqus shortname is missing.";
        return;
    }

    var script = document.createElement("script");

    script.src =
        "https://" + DISQUS_SHORTNAME + ".disqus.com/embed.js";

    script.setAttribute("data-timestamp", String(Date.now()));

    (document.head || document.body).appendChild(script);
})();
