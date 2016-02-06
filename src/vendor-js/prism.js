/* http://prismjs.com/download.html?themes=prism-okaidia&languages=markup+css+clike+javascript+aspnet+bash+c+csharp+css-extras+diff+git+jade+java+json+latex+less+markdown+objectivec+jsx+sql+typescript&plugins=line-highlight+line-numbers+autolinker+file-highlight+remove-initial-line-feed+previewer-base+previewer-color+previewer-gradient+previewer-easing+previewer-time+previewer-angle */
var _self = "undefined" != typeof window ? window : "undefined" != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope ? self : {}, Prism = function () {
    var e = /\blang(?:uage)?-(\w+)\b/i, t = 0, n = _self.Prism = {
        util: {
            encode: function (e) {
                return e instanceof a ? new a(e.type, n.util.encode(e.content), e.alias) : "Array" === n.util.type(e) ? e.map(n.util.encode) : e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\u00a0/g, " ")
            }, type: function (e) {
                return Object.prototype.toString.call(e).match(/\[object (\w+)\]/)[1]
            }, objId: function (e) {
                return e.__id || Object.defineProperty(e, "__id", { value: ++t }), e.__id
            }, clone: function (e) {
                var t = n.util.type(e);
                switch (t) {
                    case"Object":
                        var a = {};
                        for (var r in e)e.hasOwnProperty(r) && (a[r] = n.util.clone(e[r]));
                        return a;
                    case"Array":
                        return e.map && e.map(function (e) {
                                return n.util.clone(e)
                            })
                }
                return e
            }
        }, languages: {
            extend: function (e, t) {
                var a = n.util.clone(n.languages[e]);
                for (var r in t)a[r] = t[r];
                return a
            }, insertBefore: function (e, t, a, r) {
                r = r || n.languages;
                var i = r[e];
                if (2 == arguments.length) {
                    a = arguments[1];
                    for (var l in a)a.hasOwnProperty(l) && (i[l] = a[l]);
                    return i
                }
                var o = {};
                for (var s in i)if (i.hasOwnProperty(s)) {
                    if (s == t)for (var l in a)a.hasOwnProperty(l) && (o[l] = a[l]);
                    o[s] = i[s]
                }
                return n.languages.DFS(n.languages, function (t, n) {
                    n === r[e] && t != e && (this[t] = o)
                }), r[e] = o
            }, DFS: function (e, t, a, r) {
                r = r || {};
                for (var i in e)e.hasOwnProperty(i) && (t.call(e, i, e[i], a || i), "Object" !== n.util.type(e[i]) || r[n.util.objId(e[i])] ? "Array" !== n.util.type(e[i]) || r[n.util.objId(e[i])] || (r[n.util.objId(e[i])] = !0, n.languages.DFS(e[i], t, i, r)) : (r[n.util.objId(e[i])] = !0, n.languages.DFS(e[i], t, null, r)))
            }
        }, plugins: {}, highlightAll: function (e, t) {
            for (var a, r = document.querySelectorAll('code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'), i = 0; a = r[i++];)n.highlightElement(a, e === !0, t)
        }, highlightElement: function (t, a, r) {
            for (var i, l, o = t; o && !e.test(o.className);)o = o.parentNode;
            o && (i = (o.className.match(e) || [, ""])[1], l = n.languages[i]), t.className = t.className.replace(e, "").replace(/\s+/g, " ") + " language-" + i, o = t.parentNode, /pre/i.test(o.nodeName) && (o.className = o.className.replace(e, "").replace(/\s+/g, " ") + " language-" + i);
            var s = t.textContent, u = { element: t, language: i, grammar: l, code: s };
            if (!s || !l)return n.hooks.run("complete", u), void 0;
            if (n.hooks.run("before-highlight", u), a && _self.Worker) {
                var c = new Worker(n.filename);
                c.onmessage = function (e) {
                    u.highlightedCode = e.data, n.hooks.run("before-insert", u), u.element.innerHTML = u.highlightedCode, r && r.call(u.element), n.hooks.run("after-highlight", u), n.hooks.run("complete", u)
                }, c.postMessage(JSON.stringify({ language: u.language, code: u.code, immediateClose: !0 }))
            } else u.highlightedCode = n.highlight(u.code, u.grammar, u.language), n.hooks.run("before-insert", u), u.element.innerHTML = u.highlightedCode, r && r.call(t), n.hooks.run("after-highlight", u), n.hooks.run("complete", u)
        }, highlight: function (e, t, r) {
            var i = n.tokenize(e, t);
            return a.stringify(n.util.encode(i), r)
        }, tokenize: function (e, t) {
            var a = n.Token, r = [e], i = t.rest;
            if (i) {
                for (var l in i)t[l] = i[l];
                delete t.rest
            }
            e:for (var l in t)if (t.hasOwnProperty(l) && t[l]) {
                var o = t[l];
                o = "Array" === n.util.type(o) ? o : [o];
                for (var s = 0; s < o.length; ++s) {
                    var u = o[s], c = u.inside, g = !!u.lookbehind, f = 0, h = u.alias;
                    u = u.pattern || u;
                    for (var p = 0; p < r.length; p++) {
                        var d = r[p];
                        if (r.length > e.length)break e;
                        if (!(d instanceof a)) {
                            u.lastIndex = 0;
                            var m = u.exec(d);
                            if (m) {
                                g && (f = m[1].length);
                                var y = m.index - 1 + f, m = m[0].slice(f), v = m.length, b = y + v, k = d.slice(0, y + 1), w = d.slice(b + 1), _ = [p, 1];
                                k && _.push(k);
                                var P = new a(l, c ? n.tokenize(m, c) : m, h);
                                _.push(P), w && _.push(w), Array.prototype.splice.apply(r, _)
                            }
                        }
                    }
                }
            }
            return r
        }, hooks: {
            all: {}, add: function (e, t) {
                var a = n.hooks.all;
                a[e] = a[e] || [], a[e].push(t)
            }, run: function (e, t) {
                var a = n.hooks.all[e];
                if (a && a.length)for (var r, i = 0; r = a[i++];)r(t)
            }
        }
    }, a = n.Token = function (e, t, n) {
        this.type = e, this.content = t, this.alias = n
    };
    if (a.stringify = function (e, t, r) {
            if ("string" == typeof e)return e;
            if ("Array" === n.util.type(e))return e.map(function (n) {
                return a.stringify(n, t, e)
            }).join("");
            var i = {
                type: e.type,
                content: a.stringify(e.content, t, r),
                tag: "span",
                classes: ["token", e.type],
                attributes: {},
                language: t,
                parent: r
            };
            if ("comment" == i.type && (i.attributes.spellcheck = "true"), e.alias) {
                var l = "Array" === n.util.type(e.alias) ? e.alias : [e.alias];
                Array.prototype.push.apply(i.classes, l)
            }
            n.hooks.run("wrap", i);
            var o = "";
            for (var s in i.attributes)o += (o ? " " : "") + s + '="' + (i.attributes[s] || "") + '"';
            return "<" + i.tag + ' class="' + i.classes.join(" ") + '" ' + o + ">" + i.content + "</" + i.tag + ">"
        }, !_self.document)return _self.addEventListener ? (_self.addEventListener("message", function (e) {
        var t = JSON.parse(e.data), a = t.language, r = t.code, i = t.immediateClose;
        _self.postMessage(n.highlight(r, n.languages[a], a)), i && _self.close()
    }, !1), _self.Prism) : _self.Prism;
    var r = document.currentScript || [].slice.call(document.getElementsByTagName("script")).pop();
    return r && (n.filename = r.src, document.addEventListener && !r.hasAttribute("data-manual") && document.addEventListener("DOMContentLoaded", n.highlightAll)), _self.Prism
}();
"undefined" != typeof module && module.exports && (module.exports = Prism), "undefined" != typeof global && (global.Prism = Prism);
Prism.languages.markup = {
    comment: /<!--[\w\W]*?-->/,
    prolog: /<\?[\w\W]+?\?>/,
    doctype: /<!DOCTYPE[\w\W]+?>/,
    cdata: /<!\[CDATA\[[\w\W]*?]]>/i,
    tag: {
        pattern: /<\/?(?!\d)[^\s>\/=.$<]+(?:\s+[^\s>\/=]+(?:=(?:("|')(?:\\\1|\\?(?!\1)[\w\W])*\1|[^\s'">=]+))?)*\s*\/?>/i,
        inside: {
            tag: { pattern: /^<\/?[^\s>\/]+/i, inside: { punctuation: /^<\/?/, namespace: /^[^\s>\/:]+:/ } },
            "attr-value": { pattern: /=(?:('|")[\w\W]*?(\1)|[^\s>]+)/i, inside: { punctuation: /[=>"']/ } },
            punctuation: /\/?>/,
            "attr-name": { pattern: /[^\s>\/]+/, inside: { namespace: /^[^\s>\/:]+:/ } }
        }
    },
    entity: /&#?[\da-z]{1,8};/i
}, Prism.hooks.add("wrap", function (a) {
    "entity" === a.type && (a.attributes.title = a.content.replace(/&amp;/, "&"))
}), Prism.languages.xml = Prism.languages.markup, Prism.languages.html = Prism.languages.markup, Prism.languages.mathml = Prism.languages.markup, Prism.languages.svg = Prism.languages.markup;
Prism.languages.css = {
    comment: /\/\*[\w\W]*?\*\//,
    atrule: { pattern: /@[\w-]+?.*?(;|(?=\s*\{))/i, inside: { rule: /@[\w-]+/ } },
    url: /url\((?:(["'])(\\(?:\r\n|[\w\W])|(?!\1)[^\\\r\n])*\1|.*?)\)/i,
    selector: /[^\{\}\s][^\{\};]*?(?=\s*\{)/,
    string: /("|')(\\(?:\r\n|[\w\W])|(?!\1)[^\\\r\n])*\1/,
    property: /(\b|\B)[\w-]+(?=\s*:)/i,
    important: /\B!important\b/i,
    "function": /[-a-z0-9]+(?=\()/i,
    punctuation: /[(){};:]/
}, Prism.languages.css.atrule.inside.rest = Prism.util.clone(Prism.languages.css), Prism.languages.markup && (Prism.languages.insertBefore("markup", "tag", {
    style: {
        pattern: /(<style[\w\W]*?>)[\w\W]*?(?=<\/style>)/i,
        lookbehind: !0,
        inside: Prism.languages.css,
        alias: "language-css"
    }
}), Prism.languages.insertBefore("inside", "attr-value", {
    "style-attr": {
        pattern: /\s*style=("|').*?\1/i,
        inside: {
            "attr-name": { pattern: /^\s*style/i, inside: Prism.languages.markup.tag.inside },
            punctuation: /^\s*=\s*['"]|['"]\s*$/,
            "attr-value": { pattern: /.+/i, inside: Prism.languages.css }
        },
        alias: "language-css"
    }
}, Prism.languages.markup.tag));
Prism.languages.clike = {
    comment: [{
        pattern: /(^|[^\\])\/\*[\w\W]*?\*\//,
        lookbehind: !0
    }, { pattern: /(^|[^\\:])\/\/.*/, lookbehind: !0 }],
    string: /(["'])(\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
    "class-name": {
        pattern: /((?:\b(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[a-z0-9_\.\\]+/i,
        lookbehind: !0,
        inside: { punctuation: /(\.|\\)/ }
    },
    keyword: /\b(if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,
    "boolean": /\b(true|false)\b/,
    "function": /[a-z0-9_]+(?=\()/i,
    number: /\b-?(?:0x[\da-f]+|\d*\.?\d+(?:e[+-]?\d+)?)\b/i,
    operator: /--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*|\/|~|\^|%/,
    punctuation: /[{}[\];(),.:]/
};
Prism.languages.javascript = Prism.languages.extend("clike", {
    keyword: /\b(as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|var|void|while|with|yield)\b/,
    number: /\b-?(0x[\dA-Fa-f]+|0b[01]+|0o[0-7]+|\d*\.?\d+([Ee][+-]?\d+)?|NaN|Infinity)\b/,
    "function": /[_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*(?=\()/i
}), Prism.languages.insertBefore("javascript", "keyword", {
    regex: {
        pattern: /(^|[^\/])\/(?!\/)(\[.+?]|\\.|[^\/\\\r\n])+\/[gimyu]{0,5}(?=\s*($|[\r\n,.;})]))/,
        lookbehind: !0
    }
}), Prism.languages.insertBefore("javascript", "class-name", {
    "template-string": {
        pattern: /`(?:\\`|\\?[^`])*`/,
        inside: {
            interpolation: {
                pattern: /\$\{[^}]+\}/,
                inside: {
                    "interpolation-punctuation": { pattern: /^\$\{|\}$/, alias: "punctuation" },
                    rest: Prism.languages.javascript
                }
            }, string: /[\s\S]+/
        }
    }
}), Prism.languages.markup && Prism.languages.insertBefore("markup", "tag", {
    script: {
        pattern: /(<script[\w\W]*?>)[\w\W]*?(?=<\/script>)/i,
        lookbehind: !0,
        inside: Prism.languages.javascript,
        alias: "language-javascript"
    }
}), Prism.languages.js = Prism.languages.javascript;
Prism.languages.aspnet = Prism.languages.extend("markup", {
    "page-directive tag": {
        pattern: /<%\s*@.*%>/i,
        inside: {
            "page-directive tag": /<%\s*@\s*(?:Assembly|Control|Implements|Import|Master(?:Type)?|OutputCache|Page|PreviousPageType|Reference|Register)?|%>/i,
            rest: Prism.languages.markup.tag.inside
        }
    },
    "directive tag": {
        pattern: /<%.*%>/i,
        inside: { "directive tag": /<%\s*?[$=%#:]{0,2}|%>/i, rest: Prism.languages.csharp }
    }
}), Prism.languages.aspnet.tag.pattern = /<(?!%)\/?[^\s>\/]+(?:\s+[^\s>\/=]+(?:=(?:("|')(?:\\\1|\\?(?!\1)[\w\W])*\1|[^\s'">=]+))?)*\s*\/?>/i, Prism.languages.insertBefore("inside", "punctuation", { "directive tag": Prism.languages.aspnet["directive tag"] }, Prism.languages.aspnet.tag.inside["attr-value"]), Prism.languages.insertBefore("aspnet", "comment", { "asp comment": /<%--[\w\W]*?--%>/ }), Prism.languages.insertBefore("aspnet", Prism.languages.javascript ? "script" : "tag", {
    "asp script": {
        pattern: /(<script(?=.*runat=['"]?server['"]?)[\w\W]*?>)[\w\W]*?(?=<\/script>)/i,
        lookbehind: !0,
        inside: Prism.languages.csharp || {}
    }
});
!function (e) {
    var t = {
        variable: [{
            pattern: /\$?\(\([\w\W]+?\)\)/,
            inside: {
                variable: [{ pattern: /(^\$\(\([\w\W]+)\)\)/, lookbehind: !0 }, /^\$\(\(/],
                number: /\b-?(?:0x[\dA-Fa-f]+|\d*\.?\d+(?:[Ee]-?\d+)?)\b/,
                operator: /--?|-=|\+\+?|\+=|!=?|~|\*\*?|\*=|\/=?|%=?|<<=?|>>=?|<=?|>=?|==?|&&?|&=|\^=?|\|\|?|\|=|\?|:/,
                punctuation: /\(\(?|\)\)?|,|;/
            }
        }, {
            pattern: /\$\([^)]+\)|`[^`]+`/,
            inside: { variable: /^\$\(|^`|\)$|`$/ }
        }, /\$(?:[a-z0-9_#\?\*!@]+|\{[^}]+\})/i]
    };
    e.languages.bash = {
        shebang: { pattern: /^#!\s*\/bin\/bash|^#!\s*\/bin\/sh/, alias: "important" },
        comment: { pattern: /(^|[^"{\\])#.*/, lookbehind: !0 },
        string: [{
            pattern: /((?:^|[^<])<<\s*)(?:"|')?(\w+?)(?:"|')?\s*\r?\n(?:[\s\S])*?\r?\n\2/g,
            lookbehind: !0,
            inside: t
        }, { pattern: /("|')(?:\\?[\s\S])*?\1/g, inside: t }],
        variable: t.variable,
        "function": {
            pattern: /(^|\s|;|\||&)(?:alias|apropos|apt-get|aptitude|aspell|awk|basename|bash|bc|bg|builtin|bzip2|cal|cat|cd|cfdisk|chgrp|chmod|chown|chroot|chkconfig|cksum|clear|cmp|comm|command|cp|cron|crontab|csplit|cut|date|dc|dd|ddrescue|df|diff|diff3|dig|dir|dircolors|dirname|dirs|dmesg|du|egrep|eject|enable|env|ethtool|eval|exec|expand|expect|export|expr|fdformat|fdisk|fg|fgrep|file|find|fmt|fold|format|free|fsck|ftp|fuser|gawk|getopts|git|grep|groupadd|groupdel|groupmod|groups|gzip|hash|head|help|hg|history|hostname|htop|iconv|id|ifconfig|ifdown|ifup|import|install|jobs|join|kill|killall|less|link|ln|locate|logname|logout|look|lpc|lpr|lprint|lprintd|lprintq|lprm|ls|lsof|make|man|mkdir|mkfifo|mkisofs|mknod|more|most|mount|mtools|mtr|mv|mmv|nano|netstat|nice|nl|nohup|notify-send|nslookup|open|op|passwd|paste|pathchk|ping|pkill|popd|pr|printcap|printenv|printf|ps|pushd|pv|pwd|quota|quotacheck|quotactl|ram|rar|rcp|read|readarray|readonly|reboot|rename|renice|remsync|rev|rm|rmdir|rsync|screen|scp|sdiff|sed|seq|service|sftp|shift|shopt|shutdown|sleep|slocate|sort|source|split|ssh|stat|strace|su|sudo|sum|suspend|sync|tail|tar|tee|test|time|timeout|times|touch|top|traceroute|trap|tr|tsort|tty|type|ulimit|umask|umount|unalias|uname|unexpand|uniq|units|unrar|unshar|uptime|useradd|userdel|usermod|users|uuencode|uudecode|v|vdir|vi|vmstat|wait|watch|wc|wget|whereis|which|who|whoami|write|xargs|xdg-open|yes|zip)(?=$|\s|;|\||&)/,
            lookbehind: !0
        },
        keyword: {
            pattern: /(^|\s|;|\||&)(?:let|:|\.|if|then|else|elif|fi|for|break|continue|while|in|case|function|select|do|done|until|echo|exit|return|set|declare)(?=$|\s|;|\||&)/,
            lookbehind: !0
        },
        "boolean": { pattern: /(^|\s|;|\||&)(?:true|false)(?=$|\s|;|\||&)/, lookbehind: !0 },
        operator: /&&?|\|\|?|==?|!=?|<<<?|>>|<=?|>=?|=~/,
        punctuation: /\$?\(\(?|\)\)?|\.\.|[{}[\];]/
    };
    var a = t.variable[1].inside;
    a["function"] = e.languages.bash["function"], a.keyword = e.languages.bash.keyword, a.boolean = e.languages.bash.boolean, a.operator = e.languages.bash.operator, a.punctuation = e.languages.bash.punctuation
}(Prism);
Prism.languages.c = Prism.languages.extend("clike", {
    keyword: /\b(asm|typeof|inline|auto|break|case|char|const|continue|default|do|double|else|enum|extern|float|for|goto|if|int|long|register|return|short|signed|sizeof|static|struct|switch|typedef|union|unsigned|void|volatile|while)\b/,
    operator: /\-[>-]?|\+\+?|!=?|<<?=?|>>?=?|==?|&&?|\|?\||[~^%?*\/]/,
    number: /\b-?(?:0x[\da-f]+|\d*\.?\d+(?:e[+-]?\d+)?)[ful]*\b/i
}), Prism.languages.insertBefore("c", "string", {
    macro: {
        pattern: /(^\s*)#\s*[a-z]+([^\r\n\\]|\\.|\\(?:\r\n?|\n))*/im,
        lookbehind: !0,
        alias: "property",
        inside: {
            string: { pattern: /(#\s*include\s*)(<.+?>|("|')(\\?.)+?\3)/, lookbehind: !0 },
            directive: {
                pattern: /(#\s*)\b(define|elif|else|endif|error|ifdef|ifndef|if|import|include|line|pragma|undef|using)\b/,
                lookbehind: !0,
                alias: "keyword"
            }
        }
    }, constant: /\b(__FILE__|__LINE__|__DATE__|__TIME__|__TIMESTAMP__|__func__|EOF|NULL|stdin|stdout|stderr)\b/
}), delete Prism.languages.c["class-name"], delete Prism.languages.c["boolean"];
Prism.languages.csharp = Prism.languages.extend("clike", {
    keyword: /\b(abstract|as|async|await|base|bool|break|byte|case|catch|char|checked|class|const|continue|decimal|default|delegate|do|double|else|enum|event|explicit|extern|false|finally|fixed|float|for|foreach|goto|if|implicit|in|int|interface|internal|is|lock|long|namespace|new|null|object|operator|out|override|params|private|protected|public|readonly|ref|return|sbyte|sealed|short|sizeof|stackalloc|static|string|struct|switch|this|throw|true|try|typeof|uint|ulong|unchecked|unsafe|ushort|using|virtual|void|volatile|while|add|alias|ascending|async|await|descending|dynamic|from|get|global|group|into|join|let|orderby|partial|remove|select|set|value|var|where|yield)\b/,
    string: [/@("|')(\1\1|\\\1|\\?(?!\1)[\s\S])*\1/, /("|')(\\?.)*?\1/],
    number: /\b-?(0x[\da-f]+|\d*\.?\d+f?)\b/i
}), Prism.languages.insertBefore("csharp", "keyword", {
    preprocessor: {
        pattern: /(^\s*)#.*/m,
        lookbehind: !0,
        alias: "property",
        inside: {
            directive: {
                pattern: /(\s*#)\b(define|elif|else|endif|endregion|error|if|line|pragma|region|undef|warning)\b/,
                lookbehind: !0,
                alias: "keyword"
            }
        }
    }
});
Prism.languages.css.selector = {
    pattern: /[^\{\}\s][^\{\}]*(?=\s*\{)/,
    inside: {
        "pseudo-element": /:(?:after|before|first-letter|first-line|selection)|::[-\w]+/,
        "pseudo-class": /:[-\w]+(?:\(.*\))?/,
        "class": /\.[-:\.\w]+/,
        id: /#[-:\.\w]+/
    }
}, Prism.languages.insertBefore("css", "function", {
    hexcode: /#[\da-f]{3,6}/i,
    entity: /\\[\da-f]{1,8}/i,
    number: /[\d%\.]+/
});
Prism.languages.diff = {
    coord: [/^(?:\*{3}|-{3}|\+{3}).*$/m, /^@@.*@@$/m, /^\d+.*$/m],
    deleted: /^[-<].+$/m,
    inserted: /^[+>].+$/m,
    diff: { pattern: /^!(?!!).+$/m, alias: "important" }
};
Prism.languages.git = {
    comment: /^#.*/m,
    deleted: /^[-–].*/m,
    inserted: /^\+.*/m,
    string: /("|')(\\?.)*?\1/m,
    command: { pattern: /^.*\$ git .*$/m, inside: { parameter: /\s(--|-)\w+/m } },
    coord: /^@@.*@@$/m,
    commit_sha1: /^commit \w{40}$/m
};
!function (e) {
    e.languages.jade = {
        comment: { pattern: /(^([\t ]*))\/\/.*((?:\r?\n|\r)\2[\t ]+.+)*/m, lookbehind: !0 },
        "multiline-script": {
            pattern: /(^([\t ]*)script\b.*\.[\t ]*)((?:\r?\n|\r(?!\n))(?:\2[\t ]+.+|\s*?(?=\r?\n|\r)))+/m,
            lookbehind: !0,
            inside: { rest: e.languages.javascript }
        },
        filter: {
            pattern: /(^([\t ]*)):.+((?:\r?\n|\r(?!\n))(?:\2[\t ]+.+|\s*?(?=\r?\n|\r)))+/m,
            lookbehind: !0,
            inside: { "filter-name": { pattern: /^:[\w-]+/, alias: "variable" } }
        },
        "multiline-plain-text": {
            pattern: /(^([\t ]*)[\w\-#.]+\.[\t ]*)((?:\r?\n|\r(?!\n))(?:\2[\t ]+.+|\s*?(?=\r?\n|\r)))+/m,
            lookbehind: !0
        },
        markup: { pattern: /(^[\t ]*)<.+/m, lookbehind: !0, inside: { rest: e.languages.markup } },
        doctype: { pattern: /((?:^|\n)[\t ]*)doctype(?: .+)?/, lookbehind: !0 },
        "flow-control": {
            pattern: /(^[\t ]*)(?:if|unless|else|case|when|default|each|while)\b(?: .+)?/m,
            lookbehind: !0,
            inside: {
                each: { pattern: /^each .+? in\b/, inside: { keyword: /\b(?:each|in)\b/, punctuation: /,/ } },
                branch: { pattern: /^(?:if|unless|else|case|when|default|while)\b/, alias: "keyword" },
                rest: e.languages.javascript
            }
        },
        keyword: { pattern: /(^[\t ]*)(?:block|extends|include|append|prepend)\b.+/m, lookbehind: !0 },
        mixin: [{
            pattern: /(^[\t ]*)mixin .+/m,
            lookbehind: !0,
            inside: { keyword: /^mixin/, "function": /\w+(?=\s*\(|\s*$)/, punctuation: /[(),.]/ }
        }, {
            pattern: /(^[\t ]*)\+.+/m,
            lookbehind: !0,
            inside: { name: { pattern: /^\+\w+/, alias: "function" }, rest: e.languages.javascript }
        }],
        script: {
            pattern: /(^[\t ]*script(?:(?:&[^(]+)?\([^)]+\))*[\t ]+).+/m,
            lookbehind: !0,
            inside: { rest: e.languages.javascript }
        },
        "plain-text": { pattern: /(^[\t ]*(?!-)[\w\-#.]*[\w\-](?:(?:&[^(]+)?\([^)]+\))*\/?[\t ]+).+/m, lookbehind: !0 },
        tag: {
            pattern: /(^[\t ]*)(?!-)[\w\-#.]*[\w\-](?:(?:&[^(]+)?\([^)]+\))*\/?:?/m,
            lookbehind: !0,
            inside: {
                attributes: [{
                    pattern: /&[^(]+\([^)]+\)/,
                    inside: { rest: e.languages.javascript }
                }, {
                    pattern: /\([^)]+\)/,
                    inside: {
                        "attr-value": {
                            pattern: /(=\s*)(?:\{[^}]*\}|[^,)\r\n]+)/,
                            lookbehind: !0,
                            inside: { rest: e.languages.javascript }
                        }, "attr-name": /[\w-]+(?=\s*!?=|\s*[,)])/, punctuation: /[!=(),]+/
                    }
                }], punctuation: /:/
            }
        },
        code: [{ pattern: /(^[\t ]*(?:-|!?=)).+/m, lookbehind: !0, inside: { rest: e.languages.javascript } }],
        punctuation: /[.\-!=|]+/
    };
    for (var t = "(^([\\t ]*)):{{filter_name}}((?:\\r?\\n|\\r(?!\\n))(?:\\2[\\t ]+.+|\\s*?(?=\\r?\\n|\\r)))+", n = [{
        filter: "atpl",
        language: "twig"
    }, {
        filter: "coffee",
        language: "coffeescript"
    }, "ejs", "handlebars", "hogan", "less", "livescript", "markdown", "mustache", "plates", {
        filter: "sass",
        language: "scss"
    }, "stylus", "swig"], a = {}, i = 0, r = n.length; r > i; i++) {
        var s = n[i];
        s = "string" == typeof s ? {
            filter: s,
            language: s
        } : s, e.languages[s.language] && (a["filter-" + s.filter] = {
            pattern: RegExp(t.replace("{{filter_name}}", s.filter), "m"),
            lookbehind: !0,
            inside: { "filter-name": { pattern: /^:[\w-]+/, alias: "variable" }, rest: e.languages[s.language] }
        })
    }
    e.languages.insertBefore("jade", "filter", a)
}(Prism);
Prism.languages.java = Prism.languages.extend("clike", {
    keyword: /\b(abstract|continue|for|new|switch|assert|default|goto|package|synchronized|boolean|do|if|private|this|break|double|implements|protected|throw|byte|else|import|public|throws|case|enum|instanceof|return|transient|catch|extends|int|short|try|char|final|interface|static|void|class|finally|long|strictfp|volatile|const|float|native|super|while)\b/,
    number: /\b0b[01]+\b|\b0x[\da-f]*\.?[\da-fp\-]+\b|\b\d*\.?\d+(?:e[+-]?\d+)?[df]?\b/i,
    operator: {
        pattern: /(^|[^.])(?:\+[+=]?|-[-=]?|!=?|<<?=?|>>?>?=?|==?|&[&=]?|\|[|=]?|\*=?|\/=?|%=?|\^=?|[?:~])/m,
        lookbehind: !0
    }
});
Prism.languages.json = {
    property: /".*?"(?=\s*:)/gi,
    string: /"(?!:)(\\?[^"])*?"(?!:)/g,
    number: /\b-?(0x[\dA-Fa-f]+|\d*\.?\d+([Ee]-?\d+)?)\b/g,
    punctuation: /[{}[\]);,]/g,
    operator: /:/g,
    "boolean": /\b(true|false)\b/gi,
    "null": /\bnull\b/gi
}, Prism.languages.jsonp = Prism.languages.json;
!function (a) {
    var e = /\\([^a-z()[\]]|[a-z\*]+)/i, n = { "equation-command": { pattern: e, alias: "regex" } };
    a.languages.latex = {
        comment: /%.*/m,
        cdata: { pattern: /(\\begin\{((?:verbatim|lstlisting)\*?)\})([\w\W]*?)(?=\\end\{\2\})/, lookbehind: !0 },
        equation: [{
            pattern: /\$(?:\\?[\w\W])*?\$|\\\((?:\\?[\w\W])*?\\\)|\\\[(?:\\?[\w\W])*?\\\]/,
            inside: n,
            alias: "string"
        }, {
            pattern: /(\\begin\{((?:equation|math|eqnarray|align|multline|gather)\*?)\})([\w\W]*?)(?=\\end\{\2\})/,
            lookbehind: !0,
            inside: n,
            alias: "string"
        }],
        keyword: {
            pattern: /(\\(?:begin|end|ref|cite|label|usepackage|documentclass)(?:\[[^\]]+\])?\{)[^}]+(?=\})/,
            lookbehind: !0
        },
        url: { pattern: /(\\url\{)[^}]+(?=\})/, lookbehind: !0 },
        headline: {
            pattern: /(\\(?:part|chapter|section|subsection|frametitle|subsubsection|paragraph|subparagraph|subsubparagraph|subsubsubparagraph)\*?(?:\[[^\]]+\])?\{)[^}]+(?=\}(?:\[[^\]]+\])?)/,
            lookbehind: !0,
            alias: "class-name"
        },
        "function": { pattern: e, alias: "selector" },
        punctuation: /[[\]{}&]/
    }
}(Prism);
Prism.languages.less = Prism.languages.extend("css", {
    comment: [/\/\*[\w\W]*?\*\//, {
        pattern: /(^|[^\\])\/\/.*/,
        lookbehind: !0
    }],
    atrule: { pattern: /@[\w-]+?(?:\([^{}]+\)|[^(){};])*?(?=\s*\{)/i, inside: { punctuation: /[:()]/ } },
    selector: {
        pattern: /(?:@\{[\w-]+\}|[^{};\s@])(?:@\{[\w-]+\}|\([^{}]*\)|[^{};@])*?(?=\s*\{)/,
        inside: { variable: /@+[\w-]+/ }
    },
    property: /(?:@\{[\w-]+\}|[\w-])+(?:\+_?)?(?=\s*:)/i,
    punctuation: /[{}();:,]/,
    operator: /[+\-*\/]/
}), Prism.languages.insertBefore("less", "punctuation", { "function": Prism.languages.less.function }), Prism.languages.insertBefore("less", "property", {
    variable: [{
        pattern: /@[\w-]+\s*:/,
        inside: { punctuation: /:/ }
    }, /@@?[\w-]+/],
    "mixin-usage": { pattern: /([{;]\s*)[.#](?!\d)[\w-]+.*?(?=[(;])/, lookbehind: !0, alias: "function" }
});
Prism.languages.markdown = Prism.languages.extend("markup", {}), Prism.languages.insertBefore("markdown", "prolog", {
    blockquote: {
        pattern: /^>(?:[\t ]*>)*/m,
        alias: "punctuation"
    },
    code: [{ pattern: /^(?: {4}|\t).+/m, alias: "keyword" }, { pattern: /``.+?``|`[^`\n]+`/, alias: "keyword" }],
    title: [{
        pattern: /\w+.*(?:\r?\n|\r)(?:==+|--+)/,
        alias: "important",
        inside: { punctuation: /==+$|--+$/ }
    }, { pattern: /(^\s*)#+.+/m, lookbehind: !0, alias: "important", inside: { punctuation: /^#+|#+$/ } }],
    hr: { pattern: /(^\s*)([*-])([\t ]*\2){2,}(?=\s*$)/m, lookbehind: !0, alias: "punctuation" },
    list: { pattern: /(^\s*)(?:[*+-]|\d+\.)(?=[\t ].)/m, lookbehind: !0, alias: "punctuation" },
    "url-reference": {
        pattern: /!?\[[^\]]+\]:[\t ]+(?:\S+|<(?:\\.|[^>\\])+>)(?:[\t ]+(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\)))?/,
        inside: {
            variable: { pattern: /^(!?\[)[^\]]+/, lookbehind: !0 },
            string: /(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\))$/,
            punctuation: /^[\[\]!:]|[<>]/
        },
        alias: "url"
    },
    bold: {
        pattern: /(^|[^\\])(\*\*|__)(?:(?:\r?\n|\r)(?!\r?\n|\r)|.)+?\2/,
        lookbehind: !0,
        inside: { punctuation: /^\*\*|^__|\*\*$|__$/ }
    },
    italic: {
        pattern: /(^|[^\\])([*_])(?:(?:\r?\n|\r)(?!\r?\n|\r)|.)+?\2/,
        lookbehind: !0,
        inside: { punctuation: /^[*_]|[*_]$/ }
    },
    url: {
        pattern: /!?\[[^\]]+\](?:\([^\s)]+(?:[\t ]+"(?:\\.|[^"\\])*")?\)| ?\[[^\]\n]*\])/,
        inside: {
            variable: { pattern: /(!?\[)[^\]]+(?=\]$)/, lookbehind: !0 },
            string: { pattern: /"(?:\\.|[^"\\])*"(?=\)$)/ }
        }
    }
}), Prism.languages.markdown.bold.inside.url = Prism.util.clone(Prism.languages.markdown.url), Prism.languages.markdown.italic.inside.url = Prism.util.clone(Prism.languages.markdown.url), Prism.languages.markdown.bold.inside.italic = Prism.util.clone(Prism.languages.markdown.italic), Prism.languages.markdown.italic.inside.bold = Prism.util.clone(Prism.languages.markdown.bold);
Prism.languages.objectivec = Prism.languages.extend("c", {
    keyword: /\b(asm|typeof|inline|auto|break|case|char|const|continue|default|do|double|else|enum|extern|float|for|goto|if|int|long|register|return|short|signed|sizeof|static|struct|switch|typedef|union|unsigned|void|volatile|while|in|self|super)\b|(@interface|@end|@implementation|@protocol|@class|@public|@protected|@private|@property|@try|@catch|@finally|@throw|@synthesize|@dynamic|@selector)\b/,
    string: /("|')(\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1|@"(\\(?:\r\n|[\s\S])|[^"\\\r\n])*"/,
    operator: /-[->]?|\+\+?|!=?|<<?=?|>>?=?|==?|&&?|\|\|?|[~^%?*\/@]/
});
!function (a) {
    var e = a.util.clone(a.languages.javascript);
    a.languages.jsx = a.languages.extend("markup", e), a.languages.jsx.tag.pattern = /<\/?[\w\.:-]+\s*(?:\s+[\w\.:-]+(?:=(?:("|')(\\?[\w\W])*?\1|[^\s'">=]+|(\{[\w\W]*?\})))?\s*)*\/?>/i, a.languages.jsx.tag.inside["attr-value"].pattern = /=[^\{](?:('|")[\w\W]*?(\1)|[^\s>]+)/i;
    var s = a.util.clone(a.languages.jsx);
    delete s.punctuation, s = a.languages.insertBefore("jsx", "operator", { punctuation: /=(?={)|[{}[\];(),.:]/ }, { jsx: s }), a.languages.insertBefore("inside", "attr-value", {
        script: {
            pattern: /=(\{(?:\{[^}]*\}|[^}])+\})/i,
            inside: s,
            alias: "language-javascript"
        }
    }, a.languages.jsx.tag)
}(Prism);
Prism.languages.sql = {
    comment: { pattern: /(^|[^\\])(?:\/\*[\w\W]*?\*\/|(?:--|\/\/|#).*)/, lookbehind: !0 },
    string: { pattern: /(^|[^@\\])("|')(?:\\?[\s\S])*?\2/, lookbehind: !0 },
    variable: /@[\w.$]+|@("|'|`)(?:\\?[\s\S])+?\1/,
    "function": /\b(?:COUNT|SUM|AVG|MIN|MAX|FIRST|LAST|UCASE|LCASE|MID|LEN|ROUND|NOW|FORMAT)(?=\s*\()/i,
    keyword: /\b(?:ACTION|ADD|AFTER|ALGORITHM|ALL|ALTER|ANALYZE|ANY|APPLY|AS|ASC|AUTHORIZATION|BACKUP|BDB|BEGIN|BERKELEYDB|BIGINT|BINARY|BIT|BLOB|BOOL|BOOLEAN|BREAK|BROWSE|BTREE|BULK|BY|CALL|CASCADED?|CASE|CHAIN|CHAR VARYING|CHARACTER (?:SET|VARYING)|CHARSET|CHECK|CHECKPOINT|CLOSE|CLUSTERED|COALESCE|COLLATE|COLUMN|COLUMNS|COMMENT|COMMIT|COMMITTED|COMPUTE|CONNECT|CONSISTENT|CONSTRAINT|CONTAINS|CONTAINSTABLE|CONTINUE|CONVERT|CREATE|CROSS|CURRENT(?:_DATE|_TIME|_TIMESTAMP|_USER)?|CURSOR|DATA(?:BASES?)?|DATETIME|DBCC|DEALLOCATE|DEC|DECIMAL|DECLARE|DEFAULT|DEFINER|DELAYED|DELETE|DENY|DESC|DESCRIBE|DETERMINISTIC|DISABLE|DISCARD|DISK|DISTINCT|DISTINCTROW|DISTRIBUTED|DO|DOUBLE(?: PRECISION)?|DROP|DUMMY|DUMP(?:FILE)?|DUPLICATE KEY|ELSE|ENABLE|ENCLOSED BY|END|ENGINE|ENUM|ERRLVL|ERRORS|ESCAPE(?:D BY)?|EXCEPT|EXEC(?:UTE)?|EXISTS|EXIT|EXPLAIN|EXTENDED|FETCH|FIELDS|FILE|FILLFACTOR|FIRST|FIXED|FLOAT|FOLLOWING|FOR(?: EACH ROW)?|FORCE|FOREIGN|FREETEXT(?:TABLE)?|FROM|FULL|FUNCTION|GEOMETRY(?:COLLECTION)?|GLOBAL|GOTO|GRANT|GROUP|HANDLER|HASH|HAVING|HOLDLOCK|IDENTITY(?:_INSERT|COL)?|IF|IGNORE|IMPORT|INDEX|INFILE|INNER|INNODB|INOUT|INSERT|INT|INTEGER|INTERSECT|INTO|INVOKER|ISOLATION LEVEL|JOIN|KEYS?|KILL|LANGUAGE SQL|LAST|LEFT|LIMIT|LINENO|LINES|LINESTRING|LOAD|LOCAL|LOCK|LONG(?:BLOB|TEXT)|MATCH(?:ED)?|MEDIUM(?:BLOB|INT|TEXT)|MERGE|MIDDLEINT|MODIFIES SQL DATA|MODIFY|MULTI(?:LINESTRING|POINT|POLYGON)|NATIONAL(?: CHAR VARYING| CHARACTER(?: VARYING)?| VARCHAR)?|NATURAL|NCHAR(?: VARCHAR)?|NEXT|NO(?: SQL|CHECK|CYCLE)?|NONCLUSTERED|NULLIF|NUMERIC|OFF?|OFFSETS?|ON|OPEN(?:DATASOURCE|QUERY|ROWSET)?|OPTIMIZE|OPTION(?:ALLY)?|ORDER|OUT(?:ER|FILE)?|OVER|PARTIAL|PARTITION|PERCENT|PIVOT|PLAN|POINT|POLYGON|PRECEDING|PRECISION|PREV|PRIMARY|PRINT|PRIVILEGES|PROC(?:EDURE)?|PUBLIC|PURGE|QUICK|RAISERROR|READ(?:S SQL DATA|TEXT)?|REAL|RECONFIGURE|REFERENCES|RELEASE|RENAME|REPEATABLE|REPLICATION|REQUIRE|RESTORE|RESTRICT|RETURNS?|REVOKE|RIGHT|ROLLBACK|ROUTINE|ROW(?:COUNT|GUIDCOL|S)?|RTREE|RULE|SAVE(?:POINT)?|SCHEMA|SELECT|SERIAL(?:IZABLE)?|SESSION(?:_USER)?|SET(?:USER)?|SHARE MODE|SHOW|SHUTDOWN|SIMPLE|SMALLINT|SNAPSHOT|SOME|SONAME|START(?:ING BY)?|STATISTICS|STATUS|STRIPED|SYSTEM_USER|TABLES?|TABLESPACE|TEMP(?:ORARY|TABLE)?|TERMINATED BY|TEXT(?:SIZE)?|THEN|TIMESTAMP|TINY(?:BLOB|INT|TEXT)|TOP?|TRAN(?:SACTIONS?)?|TRIGGER|TRUNCATE|TSEQUAL|TYPES?|UNBOUNDED|UNCOMMITTED|UNDEFINED|UNION|UNIQUE|UNPIVOT|UPDATE(?:TEXT)?|USAGE|USE|USER|USING|VALUES?|VAR(?:BINARY|CHAR|CHARACTER|YING)|VIEW|WAITFOR|WARNINGS|WHEN|WHERE|WHILE|WITH(?: ROLLUP|IN)?|WORK|WRITE(?:TEXT)?)\b/i,
    "boolean": /\b(?:TRUE|FALSE|NULL)\b/i,
    number: /\b-?(?:0x)?\d*\.?[\da-f]+\b/,
    operator: /[-+*\/=%^~]|&&?|\|?\||!=?|<(?:=>?|<|>)?|>[>=]?|\b(?:AND|BETWEEN|IN|LIKE|NOT|OR|IS|DIV|REGEXP|RLIKE|SOUNDS LIKE|XOR)\b/i,
    punctuation: /[;[\]()`,.]/
};
Prism.languages.typescript = Prism.languages.extend("javascript", { keyword: /\b(break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|false|finally|for|function|get|if|implements|import|in|instanceof|interface|let|new|null|package|private|protected|public|return|set|static|super|switch|this|throw|true|try|typeof|var|void|while|with|yield|module|declare|constructor|string|Function|any|number|boolean|Array|enum)\b/ });
!function () {
    function e(e, t) {
        return Array.prototype.slice.call((t || document).querySelectorAll(e))
    }

    function t(e, t) {
        return t = " " + t + " ", (" " + e.className + " ").replace(/[\n\t]/g, " ").indexOf(t) > -1
    }

    function n(e, n, i) {
        for (var o, a = n.replace(/\s+/g, "").split(","), l = +e.getAttribute("data-line-offset") || 0, d = r() ? parseInt : parseFloat, c = d(getComputedStyle(e).lineHeight), s = 0; o = a[s++];) {
            o = o.split("-");
            var u = +o[0], m = +o[1] || u, h = document.createElement("div");
            h.textContent = Array(m - u + 2).join(" \n"), h.className = (i || "") + " line-highlight", t(e, "line-numbers") || (h.setAttribute("data-start", u), m > u && h.setAttribute("data-end", m)), h.style.top = (u - l - 1) * c + "px", t(e, "line-numbers") ? e.appendChild(h) : (e.querySelector("code") || e).appendChild(h)
        }
    }

    function i() {
        var t = location.hash.slice(1);
        e(".temporary.line-highlight").forEach(function (e) {
            e.parentNode.removeChild(e)
        });
        var i = (t.match(/\.([\d,-]+)$/) || [, ""])[1];
        if (i && !document.getElementById(t)) {
            var r = t.slice(0, t.lastIndexOf(".")), o = document.getElementById(r);
            o && (o.hasAttribute("data-line") || o.setAttribute("data-line", ""), n(o, i, "temporary "), document.querySelector(".temporary.line-highlight").scrollIntoView())
        }
    }

    if ("undefined" != typeof self && self.Prism && self.document && document.querySelector) {
        var r = function () {
            var e;
            return function () {
                if ("undefined" == typeof e) {
                    var t = document.createElement("div");
                    t.style.fontSize = "13px", t.style.lineHeight = "1.5", t.style.padding = 0, t.style.border = 0, t.innerHTML = "&nbsp;<br />&nbsp;", document.body.appendChild(t), e = 38 === t.offsetHeight, document.body.removeChild(t)
                }
                return e
            }
        }(), o = 0;
        Prism.hooks.add("complete", function (t) {
            var r = t.element.parentNode, a = r && r.getAttribute("data-line");
            r && a && /pre/i.test(r.nodeName) && (clearTimeout(o), e(".line-highlight", r).forEach(function (e) {
                e.parentNode.removeChild(e)
            }), n(r, a), o = setTimeout(i, 1))
        }), window.addEventListener && window.addEventListener("hashchange", i)
    }
}();
!function () {
    "undefined" != typeof self && self.Prism && self.document && Prism.hooks.add("complete", function (e) {
        if (e.code) {
            var t = e.element.parentNode, s = /\s*\bline-numbers\b\s*/;
            if (t && /pre/i.test(t.nodeName) && (s.test(t.className) || s.test(e.element.className)) && !e.element.querySelector(".line-numbers-rows")) {
                s.test(e.element.className) && (e.element.className = e.element.className.replace(s, "")), s.test(t.className) || (t.className += " line-numbers");
                var n, a = e.code.match(/\n(?!$)/g), l = a ? a.length + 1 : 1, m = new Array(l + 1);
                m = m.join("<span></span>"), n = document.createElement("span"), n.className = "line-numbers-rows", n.innerHTML = m, t.hasAttribute("data-start") && (t.style.counterReset = "linenumber " + (parseInt(t.getAttribute("data-start"), 10) - 1)), e.element.appendChild(n)
            }
        }
    })
}();
!function () {
    if (("undefined" == typeof self || self.Prism) && ("undefined" == typeof global || global.Prism)) {
        var i = /\b([a-z]{3,7}:\/\/|tel:)[\w\-+%~\/.:#=?&amp;]+/, n = /\b\S+@[\w.]+[a-z]{2}/, e = /\[([^\]]+)]\(([^)]+)\)/, t = ["comment", "url", "attr-value", "string"];
        Prism.hooks.add("before-highlight", function (a) {
            a.grammar && !a.grammar["url-link"] && (Prism.languages.DFS(a.grammar, function (a, r, l) {
                t.indexOf(l) > -1 && "Array" !== Prism.util.type(r) && (r.pattern || (r = this[a] = { pattern: r }), r.inside = r.inside || {}, "comment" == l && (r.inside["md-link"] = e), "attr-value" == l ? Prism.languages.insertBefore("inside", "punctuation", { "url-link": i }, r) : r.inside["url-link"] = i, r.inside["email-link"] = n)
            }), a.grammar["url-link"] = i, a.grammar["email-link"] = n)
        }), Prism.hooks.add("wrap", function (i) {
            if (/-link$/.test(i.type)) {
                i.tag = "a";
                var n = i.content;
                if ("email-link" == i.type && 0 != n.indexOf("mailto:"))n = "mailto:" + n; else if ("md-link" == i.type) {
                    var t = i.content.match(e);
                    n = t[2], i.content = t[1]
                }
                i.attributes.href = n
            }
        })
    }
}();
!function () {
    "undefined" != typeof self && self.Prism && self.document && document.querySelector && (self.Prism.fileHighlight = function () {
        var e = {
            js: "javascript",
            html: "markup",
            svg: "markup",
            xml: "markup",
            py: "python",
            rb: "ruby",
            ps1: "powershell",
            psm1: "powershell"
        };
        Array.prototype.forEach && Array.prototype.slice.call(document.querySelectorAll("pre[data-src]")).forEach(function (t) {
            for (var r, a = t.getAttribute("data-src"), n = t, s = /\blang(?:uage)?-(?!\*)(\w+)\b/i; n && !s.test(n.className);)n = n.parentNode;
            if (n && (r = (t.className.match(s) || [, ""])[1]), !r) {
                var o = (a.match(/\.(\w+)$/) || [, ""])[1];
                r = e[o] || o
            }
            var l = document.createElement("code");
            l.className = "language-" + r, t.textContent = "", l.textContent = "Loading…", t.appendChild(l);
            var i = new XMLHttpRequest;
            i.open("GET", a, !0), i.onreadystatechange = function () {
                4 == i.readyState && (i.status < 400 && i.responseText ? (l.textContent = i.responseText, Prism.highlightElement(l)) : l.textContent = i.status >= 400 ? "✖ Error " + i.status + " while fetching file: " + i.statusText : "✖ Error: File does not exist or is empty")
            }, i.send(null)
        })
    }, document.addEventListener("DOMContentLoaded", self.Prism.fileHighlight))
}();
!function () {
    "undefined" != typeof self && self.Prism && self.document && Prism.hooks.add("before-highlight", function (e) {
        if (e.code) {
            var s = e.element.parentNode, n = /\s*\bkeep-initial-line-feed\b\s*/;
            !s || "pre" !== s.nodeName.toLowerCase() || n.test(s.className) || n.test(e.element.className) || (e.code = e.code.replace(/^(?:\r?\n|\r)/, ""))
        }
    })
}();
!function () {
    if ("undefined" != typeof self && self.Prism && self.document && Function.prototype.bind) {
        var t = function (t) {
            var e = 0, s = 0, i = t;
            if (i.parentNode) {
                do e += i.offsetLeft, s += i.offsetTop; while ((i = i.offsetParent) && i.nodeType < 9);
                i = t;
                do e -= i.scrollLeft, s -= i.scrollTop; while ((i = i.parentNode) && !/body/i.test(i.nodeName))
            }
            return { top: s, right: innerWidth - e - t.offsetWidth, bottom: innerHeight - s - t.offsetHeight, left: e }
        }, e = /(?:^|\s)token(?=$|\s)/, s = /(?:^|\s)active(?=$|\s)/g, i = /(?:^|\s)flipped(?=$|\s)/g, o = function (t, e, s, i) {
            this._elt = null, this._type = t, this._clsRegexp = RegExp("(?:^|\\s)" + t + "(?=$|\\s)"), this._token = null, this.updater = e, this._mouseout = this.mouseout.bind(this), this.initializer = i;
            var n = this;
            s || (s = ["*"]), "Array" !== Prism.util.type(s) && (s = [s]), s.forEach(function (t) {
                "string" != typeof t && (t = t.lang), o.byLanguages[t] || (o.byLanguages[t] = []), o.byLanguages[t].indexOf(n) < 0 && o.byLanguages[t].push(n)
            }), o.byType[t] = this
        };
        o.prototype.init = function () {
            this._elt || (this._elt = document.createElement("div"), this._elt.className = "prism-previewer prism-previewer-" + this._type, document.body.appendChild(this._elt), this.initializer && this.initializer())
        }, o.prototype.check = function (t) {
            do if (e.test(t.className) && this._clsRegexp.test(t.className))break; while (t = t.parentNode);
            t && t !== this._token && (this._token = t, this.show())
        }, o.prototype.mouseout = function () {
            this._token.removeEventListener("mouseout", this._mouseout, !1), this._token = null, this.hide()
        }, o.prototype.show = function () {
            if (this._elt || this.init(), this._token)if (this.updater.call(this._elt, this._token.textContent)) {
                this._token.addEventListener("mouseout", this._mouseout, !1);
                var e = t(this._token);
                this._elt.className += " active", e.top - this._elt.offsetHeight > 0 ? (this._elt.className = this._elt.className.replace(i, ""), this._elt.style.top = e.top + "px", this._elt.style.bottom = "") : (this._elt.className += " flipped", this._elt.style.bottom = e.bottom + "px", this._elt.style.top = ""), this._elt.style.left = e.left + Math.min(200, this._token.offsetWidth / 2) + "px"
            } else this.hide()
        }, o.prototype.hide = function () {
            this._elt.className = this._elt.className.replace(s, "")
        }, o.byLanguages = {}, o.byType = {}, o.initEvents = function (t, e) {
            var s = [];
            o.byLanguages[e] && (s = s.concat(o.byLanguages[e])), o.byLanguages["*"] && (s = s.concat(o.byLanguages["*"])), t.addEventListener("mouseover", function (t) {
                var e = t.target;
                s.forEach(function (t) {
                    t.check(e)
                })
            }, !1)
        }, Prism.plugins.Previewer = o, Prism.hooks.add("after-highlight", function (t) {
            (o.byLanguages["*"] || o.byLanguages[t.language]) && o.initEvents(t.element, t.language)
        })
    }
}();
!function () {
    if (("undefined" == typeof self || self.Prism) && ("undefined" == typeof global || global.Prism)) {
        var e = {
            css: !0,
            less: !0,
            markup: {
                lang: "markup",
                before: "punctuation",
                inside: "inside",
                root: Prism.languages.markup && Prism.languages.markup.tag.inside["attr-value"]
            },
            sass: [{
                lang: "sass",
                before: "punctuation",
                inside: "inside",
                root: Prism.languages.sass && Prism.languages.sass["variable-line"]
            }, { lang: "sass", inside: "inside", root: Prism.languages.sass && Prism.languages.sass["property-line"] }],
            scss: !0,
            stylus: [{
                lang: "stylus",
                before: "hexcode",
                inside: "rest",
                root: Prism.languages.stylus && Prism.languages.stylus["property-declaration"].inside
            }, {
                lang: "stylus",
                before: "hexcode",
                inside: "rest",
                root: Prism.languages.stylus && Prism.languages.stylus["variable-declaration"].inside
            }]
        };
        Prism.hooks.add("before-highlight", function (a) {
            if (a.language && e[a.language] && !e[a.language].initialized) {
                var i = e[a.language];
                "Array" !== Prism.util.type(i) && (i = [i]), i.forEach(function (i) {
                    var r, l, n, s;
                    i === !0 ? (r = "important", l = a.language, i = a.language) : (r = i.before || "important", l = i.inside || i.lang, n = i.root || Prism.languages, s = i.skip, i = a.language), !s && Prism.languages[i] && (Prism.languages.insertBefore(l, r, { color: /\B#(?:[0-9a-f]{3}){1,2}\b|\b(?:rgb|hsl)\(\s*\d{1,3}\s*,\s*\d{1,3}%?\s*,\s*\d{1,3}%?\s*\)\B|\b(?:rgb|hsl)a\(\s*\d{1,3}\s*,\s*\d{1,3}%?\s*,\s*\d{1,3}%?\s*,\s*(?:0|0?\.\d+|1)\s*\)\B|\b(?:AliceBlue|AntiqueWhite|Aqua|Aquamarine|Azure|Beige|Bisque|Black|BlanchedAlmond|Blue|BlueViolet|Brown|BurlyWood|CadetBlue|Chartreuse|Chocolate|Coral|CornflowerBlue|Cornsilk|Crimson|Cyan|DarkBlue|DarkCyan|DarkGoldenRod|DarkGray|DarkGreen|DarkKhaki|DarkMagenta|DarkOliveGreen|DarkOrange|DarkOrchid|DarkRed|DarkSalmon|DarkSeaGreen|DarkSlateBlue|DarkSlateGray|DarkTurquoise|DarkViolet|DeepPink|DeepSkyBlue|DimGray|DodgerBlue|FireBrick|FloralWhite|ForestGreen|Fuchsia|Gainsboro|GhostWhite|Gold|GoldenRod|Gray|Green|GreenYellow|HoneyDew|HotPink|IndianRed|Indigo|Ivory|Khaki|Lavender|LavenderBlush|LawnGreen|LemonChiffon|LightBlue|LightCoral|LightCyan|LightGoldenRodYellow|LightGray|LightGreen|LightPink|LightSalmon|LightSeaGreen|LightSkyBlue|LightSlateGray|LightSteelBlue|LightYellow|Lime|LimeGreen|Linen|Magenta|Maroon|MediumAquaMarine|MediumBlue|MediumOrchid|MediumPurple|MediumSeaGreen|MediumSlateBlue|MediumSpringGreen|MediumTurquoise|MediumVioletRed|MidnightBlue|MintCream|MistyRose|Moccasin|NavajoWhite|Navy|OldLace|Olive|OliveDrab|Orange|OrangeRed|Orchid|PaleGoldenRod|PaleGreen|PaleTurquoise|PaleVioletRed|PapayaWhip|PeachPuff|Peru|Pink|Plum|PowderBlue|Purple|Red|RosyBrown|RoyalBlue|SaddleBrown|Salmon|SandyBrown|SeaGreen|SeaShell|Sienna|Silver|SkyBlue|SlateBlue|SlateGray|Snow|SpringGreen|SteelBlue|Tan|Teal|Thistle|Tomato|Turquoise|Violet|Wheat|White|WhiteSmoke|Yellow|YellowGreen)\b/i }, n), a.grammar = Prism.languages[i], e[a.language] = { initialized: !0 })
                })
            }
        }), Prism.plugins.Previewer && new Prism.plugins.Previewer("color", function (e) {
            return this.style.backgroundColor = "", this.style.backgroundColor = e, !!this.style.backgroundColor
        })
    }
}();
!function () {
    if (("undefined" == typeof self || self.Prism) && ("undefined" == typeof global || global.Prism)) {
        var e = {
            css: !0,
            less: !0,
            sass: [{
                lang: "sass",
                before: "punctuation",
                inside: "inside",
                root: Prism.languages.sass && Prism.languages.sass["variable-line"]
            }, {
                lang: "sass",
                before: "punctuation",
                inside: "inside",
                root: Prism.languages.sass && Prism.languages.sass["property-line"]
            }],
            scss: !0,
            stylus: [{
                lang: "stylus",
                before: "func",
                inside: "rest",
                root: Prism.languages.stylus && Prism.languages.stylus["property-declaration"].inside
            }, {
                lang: "stylus",
                before: "func",
                inside: "rest",
                root: Prism.languages.stylus && Prism.languages.stylus["variable-declaration"].inside
            }]
        };
        Prism.hooks.add("before-highlight", function (i) {
            if (i.language && e[i.language] && !e[i.language].initialized) {
                var t = e[i.language];
                "Array" !== Prism.util.type(t) && (t = [t]), t.forEach(function (t) {
                    var r, s, a, n;
                    t === !0 ? (r = Prism.plugins.Previewer && Prism.plugins.Previewer.byType.color ? "color" : "important", s = i.language, t = i.language) : (r = t.before || "important", s = t.inside || t.lang, a = t.root || Prism.languages, n = t.skip, t = i.language), !n && Prism.languages[t] && (Prism.languages.insertBefore(s, r, {
                        gradient: {
                            pattern: /(?:\b|\B-[a-z]{1,10}-)(?:repeating-)?(?:linear|radial)-gradient\((?:(?:rgb|hsl)a?\(.+?\)|[^\)])+\)/gi,
                            inside: { "function": /[\w-]+(?=\()/, punctuation: /[(),]/ }
                        }
                    }, a), i.grammar = Prism.languages[t], e[i.language] = { initialized: !0 })
                })
            }
        });
        var i = {}, t = function (e, i, t) {
            var r = "180deg";
            return /^(?:-?\d*\.?\d+(?:deg|rad)|to\b|top|right|bottom|left)/.test(t[0]) && (r = t.shift(), r.indexOf("to ") < 0 && (r.indexOf("top") >= 0 ? r = r.indexOf("left") >= 0 ? "to bottom right" : r.indexOf("right") >= 0 ? "to bottom left" : "to bottom" : r.indexOf("bottom") >= 0 ? r = r.indexOf("left") >= 0 ? "to top right" : r.indexOf("right") >= 0 ? "to top left" : "to top" : r.indexOf("left") >= 0 ? r = "to right" : r.indexOf("right") >= 0 ? r = "to left" : e && (r.indexOf("deg") >= 0 ? r = 90 - parseFloat(r) + "deg" : r.indexOf("rad") >= 0 && (r = Math.PI / 2 - parseFloat(r) + "rad")))), i + "(" + r + "," + t.join(",") + ")"
        }, r = function (e, i, t) {
            if (t[0].indexOf("at") < 0) {
                var r = "center", s = "ellipse", a = "farthest-corner";
                if (/\bcenter|top|right|bottom|left\b|^\d+/.test(t[0]) && (r = t.shift().replace(/\s*-?\d+(?:rad|deg)\s*/, "")), /\bcircle|ellipse|closest|farthest|contain|cover\b/.test(t[0])) {
                    var n = t.shift().split(/\s+/);
                    !n[0] || "circle" !== n[0] && "ellipse" !== n[0] || (s = n.shift()), n[0] && (a = n.shift()), "cover" === a ? a = "farthest-corner" : "contain" === a && (a = "clothest-side")
                }
                return i + "(" + s + " " + a + " at " + r + "," + t.join(",") + ")"
            }
            return i + "(" + t.join(",") + ")"
        }, s = function (e) {
            if (i[e])return i[e];
            var s = e.match(/^(\b|\B-[a-z]{1,10}-)((?:repeating-)?(?:linear|radial)-gradient)/), a = s && s[1], n = s && s[2], l = e.replace(/^(?:\b|\B-[a-z]{1,10}-)(?:repeating-)?(?:linear|radial)-gradient\(|\)$/g, "").split(/\s*,\s*/);
            return i[e] = n.indexOf("linear") >= 0 ? t(a, n, l) : n.indexOf("radial") >= 0 ? r(a, n, l) : n + "(" + l.join(",") + ")"
        };
        Prism.plugins.Previewer && new Prism.plugins.Previewer("gradient", function (e) {
            return this.firstChild.style.backgroundImage = "", this.firstChild.style.backgroundImage = s(e), !!this.firstChild.style.backgroundImage
        }, "*", function () {
            this._elt.innerHTML = "<div></div>"
        })
    }
}();
!function () {
    if (("undefined" == typeof self || self.Prism) && ("undefined" == typeof global || global.Prism)) {
        var e = {
            css: !0,
            less: !0,
            sass: [{
                lang: "sass",
                inside: "inside",
                before: "punctuation",
                root: Prism.languages.sass && Prism.languages.sass["variable-line"]
            }, { lang: "sass", inside: "inside", root: Prism.languages.sass && Prism.languages.sass["property-line"] }],
            scss: !0,
            stylus: [{
                lang: "stylus",
                before: "hexcode",
                inside: "rest",
                root: Prism.languages.stylus && Prism.languages.stylus["property-declaration"].inside
            }, {
                lang: "stylus",
                before: "hexcode",
                inside: "rest",
                root: Prism.languages.stylus && Prism.languages.stylus["variable-declaration"].inside
            }]
        };
        Prism.hooks.add("before-highlight", function (r) {
            if (r.language && e[r.language] && !e[r.language].initialized) {
                var s = e[r.language];
                "Array" !== Prism.util.type(s) && (s = [s]), s.forEach(function (s) {
                    var i, a, n, t;
                    s === !0 ? (i = "important", a = r.language, s = r.language) : (i = s.before || "important", a = s.inside || s.lang, n = s.root || Prism.languages, t = s.skip, s = r.language), !t && Prism.languages[s] && (Prism.languages.insertBefore(a, i, { easing: /\bcubic-bezier\((?:-?\d*\.?\d+,\s*){3}-?\d*\.?\d+\)\B|\b(?:linear|ease(?:-in)?(?:-out)?)(?=\s|[;}]|$)/i }, n), r.grammar = Prism.languages[s], e[r.language] = { initialized: !0 })
                })
            }
        }), Prism.plugins.Previewer && new Prism.plugins.Previewer("easing", function (e) {
            e = {
                    linear: "0,0,1,1",
                    ease: ".25,.1,.25,1",
                    "ease-in": ".42,0,1,1",
                    "ease-out": "0,0,.58,1",
                    "ease-in-out": ".42,0,.58,1"
                }[e] || e;
            var r = e.match(/-?\d*\.?\d+/g);
            if (4 === r.length) {
                r = r.map(function (e, r) {
                    return 100 * (r % 2 ? 1 - e : e)
                }), this.querySelector("path").setAttribute("d", "M0,100 C" + r[0] + "," + r[1] + ", " + r[2] + "," + r[3] + ", 100,0");
                var s = this.querySelectorAll("line");
                return s[0].setAttribute("x2", r[0]), s[0].setAttribute("y2", r[1]), s[1].setAttribute("x2", r[2]), s[1].setAttribute("y2", r[3]), !0
            }
            return !1
        }, "*", function () {
            this._elt.innerHTML = '<svg viewBox="-20 -20 140 140" width="100" height="100"><defs><marker id="prism-previewer-easing-marker" viewBox="0 0 4 4" refX="2" refY="2" markerUnits="strokeWidth"><circle cx="2" cy="2" r="1.5" /></marker></defs><path d="M0,100 C20,50, 40,30, 100,0" /><line x1="0" y1="100" x2="20" y2="50" marker-start="url(' + location.href + '#prism-previewer-easing-marker)" marker-end="url(' + location.href + '#prism-previewer-easing-marker)" /><line x1="100" y1="0" x2="40" y2="30" marker-start="url(' + location.href + '#prism-previewer-easing-marker)" marker-end="url(' + location.href + '#prism-previewer-easing-marker)" /></svg>'
        })
    }
}();
!function () {
    if (("undefined" == typeof self || self.Prism) && ("undefined" == typeof global || global.Prism)) {
        var s = {
            css: !0,
            less: !0,
            markup: {
                lang: "markup",
                before: "punctuation",
                inside: "inside",
                root: Prism.languages.markup && Prism.languages.markup.tag.inside["attr-value"]
            },
            sass: [{
                lang: "sass",
                inside: "inside",
                root: Prism.languages.sass && Prism.languages.sass["property-line"]
            }, {
                lang: "sass",
                before: "operator",
                inside: "inside",
                root: Prism.languages.sass && Prism.languages.sass["variable-line"]
            }],
            scss: !0,
            stylus: [{
                lang: "stylus",
                before: "hexcode",
                inside: "rest",
                root: Prism.languages.stylus && Prism.languages.stylus["property-declaration"].inside
            }, {
                lang: "stylus",
                before: "hexcode",
                inside: "rest",
                root: Prism.languages.stylus && Prism.languages.stylus["variable-declaration"].inside
            }]
        };
        Prism.hooks.add("before-highlight", function (e) {
            if (e.language && s[e.language] && !s[e.language].initialized) {
                var a = s[e.language];
                "Array" !== Prism.util.type(a) && (a = [a]), a.forEach(function (a) {
                    var i, r, n, l;
                    a === !0 ? (i = "important", r = e.language, a = e.language) : (i = a.before || "important", r = a.inside || a.lang, n = a.root || Prism.languages, l = a.skip, a = e.language), !l && Prism.languages[a] && (Prism.languages.insertBefore(r, i, { time: /(?:\b|\B-|(?=\B\.))\d*\.?\d+m?s\b/i }, n), e.grammar = Prism.languages[a], s[e.language] = { initialized: !0 })
                })
            }
        }), Prism.plugins.Previewer && new Prism.plugins.Previewer("time", function (s) {
            var e = parseFloat(s), a = s.match(/[a-z]+$/i);
            return e && a ? (a = a[0], this.querySelector("circle").style.animationDuration = 2 * e + a, !0) : !1
        }, "*", function () {
            this._elt.innerHTML = '<svg viewBox="0 0 64 64"><circle r="16" cy="32" cx="32"></circle></svg>'
        })
    }
}();
!function () {
    if (("undefined" == typeof self || self.Prism) && ("undefined" == typeof global || global.Prism)) {
        var a = {
            css: !0,
            less: !0,
            markup: {
                lang: "markup",
                before: "punctuation",
                inside: "inside",
                root: Prism.languages.markup && Prism.languages.markup.tag.inside["attr-value"]
            },
            sass: [{
                lang: "sass",
                inside: "inside",
                root: Prism.languages.sass && Prism.languages.sass["property-line"]
            }, {
                lang: "sass",
                before: "operator",
                inside: "inside",
                root: Prism.languages.sass && Prism.languages.sass["variable-line"]
            }],
            scss: !0,
            stylus: [{
                lang: "stylus",
                before: "func",
                inside: "rest",
                root: Prism.languages.stylus && Prism.languages.stylus["property-declaration"].inside
            }, {
                lang: "stylus",
                before: "func",
                inside: "rest",
                root: Prism.languages.stylus && Prism.languages.stylus["variable-declaration"].inside
            }]
        };
        Prism.hooks.add("before-highlight", function (s) {
            if (s.language && a[s.language] && !a[s.language].initialized) {
                var e = a[s.language];
                "Array" !== Prism.util.type(e) && (e = [e]), e.forEach(function (e) {
                    var i, r, n, g;
                    e === !0 ? (i = "important", r = s.language, e = s.language) : (i = e.before || "important", r = e.inside || e.lang, n = e.root || Prism.languages, g = e.skip, e = s.language), !g && Prism.languages[e] && (Prism.languages.insertBefore(r, i, { angle: /(?:\b|\B-|(?=\B\.))\d*\.?\d+(?:deg|g?rad|turn)\b/i }, n), s.grammar = Prism.languages[e], a[s.language] = { initialized: !0 })
                })
            }
        }), Prism.plugins.Previewer && new Prism.plugins.Previewer("angle", function (a) {
            var s, e, i = parseFloat(a), r = a.match(/[a-z]+$/i);
            if (!i || !r)return !1;
            switch (r = r[0]) {
                case"deg":
                    s = 360;
                    break;
                case"grad":
                    s = 400;
                    break;
                case"rad":
                    s = 2 * Math.PI;
                    break;
                case"turn":
                    s = 1
            }
            return e = 100 * i / s, e %= 100, this[(0 > i ? "set" : "remove") + "Attribute"]("data-negative", ""), this.querySelector("circle").style.strokeDasharray = Math.abs(e) + ",500", !0
        }, "*", function () {
            this._elt.innerHTML = '<svg viewBox="0 0 64 64"><circle r="16" cy="32" cx="32"></circle></svg>'
        })
    }
}();
