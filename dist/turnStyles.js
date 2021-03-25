!function(){const t=function(){this.loadConfig(),this.loadThemes(),this.attachRoom()};(t=>{t.prototype.log=function(t){console.info("turnStyles :: "+t)},t.prototype.named=t=>this.room.userMap[t.id].attributes.name,t.prototype.holding={},t.prototype.suspend=function(t,e,o){t&&!this.holding[o]&&(t.bind(this),t()),this.holding[o]&&clearTimeout(this.holding[o]),this.holding[o]=setTimeout((()=>{delete this.holding[o]}).bind(this),1e3*e)},t.prototype.click=function(t){$(window).focus();let e={bubbles:!0,cancelable:!0,view:window},o=document.querySelectorAll(t)[0],n=new MouseEvent("click",e);return!o.dispatchEvent(n)}})(t),(t=>{t.prototype.default={theme:"dark",style:"",autobop:!0,nextdj:!1,pingdj:!1,has_vol:!1,ping_pm:!1,ping_song:!1,ping_chat:!1,chat_stat:!0,chat_snag:!0,chat_join:!0,chat_left:!0},t.prototype.options={theme:{dark:"Dark Mode",night:"Night Mode"},style:{pink:"Pink",blue:"Blue",teal:"Teal",green:"Green"}},t.prototype.loadConfig=function(){let t=window.localStorage.getItem("tsdb"),e=t?JSON.parse(t):{};this.config={...this.default,...e},this.log("loaded config")},t.prototype.saveConfig=function(){this.config.theme=$("#ts_theme").val(),this.config.style=$("#ts_style").val(),this.config.autobop=$("#ts_autobop").is(":checked"),this.config.nextdj=$("#ts_nextdj").is(":checked"),this.config.pingdj=$("#ts_pingdj").is(":checked"),this.config.has_vol=$("#ts_has_vol").is(":checked"),this.config.ping_pm=$("#ts_ping_pm").is(":checked"),this.config.ping_chat=$("#ts_ping_chat").is(":checked"),this.config.ping_song=$("#ts_ping_song").is(":checked"),this.config.chat_stat=$("#ts_chat_stat").is(":checked"),this.config.chat_snag=$("#ts_chat_snag").is(":checked"),this.config.chat_join=$("#ts_chat_join").is(":checked"),this.config.chat_left=$("#ts_chat_left").is(":checked");let t=JSON.stringify(this.config);window.localStorage.setItem("tsdb",t),this.log("saved config")}})(t),(t=>{t.prototype.handle=function(t){switch(t.command){case"pmmed":this.onPing(t);break;case"speak":this.onChat(t);break;case"add_dj":this.onJump(t);break;case"rem_dj":this.onDrop(t);break;case"newsong":this.onSong(t);break;case"snagged":this.onSnag(t);break;case"registered":this.onJoin(t);break;case"deregistered":this.onLeft(t);break;case"update_votes":this.onVote(t)}},t.prototype.onLoad=function(){this.buildPanel(),this.loadVolume(),this.runAutobop(),this.checkDecks()},t.prototype.onPing=function(t){this.config.ping_pm&&this.notifyUser({head:"New PM",text:t.text},"ping_pm")},t.prototype.onChat=function(t){let e="@"+this.core.user.attributes.name.toLowerCase();t.text.toLowerCase().indexOf(e)>-1&&(this.config.ping_chat&&this.notifyUser({head:`[${this.room.roomData.name}] @${t.name}`,text:t.text},"ping_chat"),this.holding.nextdj&&(this.log("nextdj: received ping"),this.tryJumping()))},t.prototype.onSong=function(t){this.runAutobop(),this.mute&&this.toggleMute(),this.now_playing?this.last_played={...this.now_playing}:this.last_played={},this.now_playing={love:0,hate:0,snag:0,...t.room.metadata.current_song.metadata};let e=!1,o=this.last_played;o.song&&(e=`Last: [${o.love}\ud83d\udd3a${o.hate}\ud83d\udd3b${o.snag}\u2764\ufe0f]`),this.config.ping_song&&this.notifyUser({head:"Now Playing: "+this.now_playing.song,text:e||"By: "+this.now_playing.artist}),e&&this.config.chat_stat&&this.sendToChat(e,o.song)},t.prototype.onJump=function(t){this.user==t.user[0].userid&&this.config.nextdj&&this.isSpinning()},t.prototype.onDrop=function(){this.checkDecks()},t.prototype.onSnag=function(t){if(this.now_playing.snag+=1,this.config.chat_snag){let e=this.named(t.user),o="has snagged this track!";this.sendToChat(e,o,"snag")}},t.prototype.onVote=function(t){this.now_playing.love=t.room.metadata.upvotes,this.now_playing.hate=t.room.metadata.downvotes},t.prototype.onJoin=function(t){if(this.config.chat_join){let e=t.user[0].name;this.sendToChat(e,"joined.","join")}},t.prototype.onLeft=function(t){if(this.config.chat_left){let e=t.user[0].name;this.sendToChat(e,"left.","join")}}})(t),(t=>{t.prototype.loadThemes=function(){$("link.tS-core").length||n("turnStyles"),o(this.config.theme,"themes"),o(this.config.style,"styles"),this.log("refreshed themes")};const e=function(t,e){let o=window.tsBase||"https://ts.pixelcrisis.co/dist";return`${e?`${o}/${e}`:""+o}/${t}.css`},o=function(t,o){let i=$("link.tS-"+(o||"core"));if(!t)return!!i.length&&i.remove();i.length?i.attr("href",e(t,o)):n(t,o)},n=function(t,o){let n=o||"core",i=document.createElement("link");i.classList.add("tS-"+n),i.rel="stylesheet",i.type="text/css",i.href=e(t,o),document.head.append(i)}})(t),(t=>{t.prototype.attachRoom=function(){if(!window.turntable)return this.log("no room");let o=()=>setTimeout(t.prototype.attachRoom.bind(this),250);return this.core=window.turntable,this.user=this.core.user.id,this.view=this.core.topViewController,this.room=e(this.core,"roomId"),this.room?(this.ttfm=e(this.room,"roomData"),this.ttfm?(this.room.currentSong&&(this.now_playing={snag:0,hate:0,love:this.room.upvoters.length,...this.room.currentSong.metadata}),this.realVolume=window.turntablePlayer.realVolume,this.core.addEventListener("message",this.handle.bind(this)),this.log("loaded room: "+this.room.roomId),void this.onLoad()):o()):o()};const e=function(t,e){for(let o in t){let n=t[o];if(null!=n&&n[e])return n}}})(t),(t=>{t.prototype.buildPanel=function(){$("body").append(e(this)),$("#layout-option").before(o());let t=$("#ts_open"),n=$("#ts_close"),i=$(".ts_more h3"),s=$("#ts_pane input, #ts_pane select");t.on("click",()=>$("#ts_pane").toggleClass("active")),n.on("click",()=>$("#ts_pane, .ts_more").removeClass("active")),i.on("click",t=>$(t.target).parent().toggleClass("active")),s.on("change",this.saveConfig.bind(this))};const e=t=>`\n    <div id="ts_pane">\n      <h2>turnStyles options</h2>\n\n      <div class="half">\n        <label>Theme</label> ${n(t,"theme")}\n      </div>\n      <div class="half">\n        <label>Style</label> ${n(t,"style")}\n      </div>\n      <div class="half">\n        <label>${i(t,"autobop")} Autobop</label>\n        <label>${i(t,"has_vol")} Control Volume</label>\n      </div>\n      <div class="half">\n        <label>${i(t,"nextdj")} Next DJ Spot</label>\n        <label>${i(t,"pingdj")} Wait For Ping</label>\n      </div>\n      <div class="ts_more">\n        <h3>Notifications</h3>\n        <div class="half">\n          <h3>In Chat</h3>\n          <label>${i(t,"chat_stat")} Song Stats</label>\n          <label>${i(t,"chat_snag")} User Snags</label>\n          <label>${i(t,"chat_join")} User Joins</label>\n          <label>${i(t,"chat_gone")} User Leaves</label>\n        </div>\n        <div class="half">\n          <h3>Desktop</h3>\n          <label>${i(t,"ping_pm")} On DMs</label>\n          <label>${i(t,"ping_chat")} On Mentions</label>\n          <label>${i(t,"ping_song")} On New Songs</label>\n        </div>\n      </div>\n\n      <button id="ts_close">Close</button>\n    </div>\n  `,o=()=>'\n    <li class="ts link option">\n      <a id="ts_open" href="#">turnStyles</a>\n    </li>\n  ',n=(t,e)=>`\n    <select id="ts_${e}">\n      <option value="">None</option>\n      ${Object.keys(t.options[e]).map(o=>`\n        <option value="${o}" ${t.config[e]==o?"selected":""}>\n          ${t.options[e][o]}\n        </option>\n      `).join("")}\n    </select>\n  `,i=(t,e)=>`\n    <input id="ts_${e}" type="checkbox"\n      ${t.config[e]?"checked":""}>\n    </input>\n  `})(t),(t=>{t.prototype.loadVolume=function(){let t=$("body").hasClass("has-volume");if(this.config.has_vol&&!t){$("body").addClass("has-volume"),$(".header-content").append(this.htmlVolume());let t=$("#ts_mute"),e=$("#ts_slider");t.on("click",this.toggleMute.bind(this)),e.on("input",this.saveVolume.bind(this)),e.on("DOMMouseScroll mousewheel",this.onVolWheel.bind(this))}else!this.config.has_vol&&t&&($("#ts_volume").remove(),$("body").removeClass("has-volume"),window.turntablePlayer.realVolume=this.realVolume)},t.prototype.htmlVolume=function(){return`\n    <div id="ts_volume">\n      <span id="ts_mute"></span>\n      <input id="ts_slider" type="range" \n        min="0" max="100" value="${this.currVolume()}">\n      </input>\n      <em id="ts_muted">Muted For One Song</em>\n    </div>`},t.prototype.currVolume=function(t){let e=t||window.util.getSetting("volume");return 100*Math.pow(2,e-4)},t.prototype.saveVolume=function(t){let e=(t=t.target?t.target.value:t)>0?(o=t,Math.log(o/100)/Math.LN2+4):-3;var o;window.turntablePlayer.realVolume=e>6?this.realVolume:this.currVolume,window.turntablePlayer.setVolume(e),this.suspend(()=>{window.util.setSetting("volume",e)},1,"volume")},t.prototype.toggleMute=function(){this.mute=!this.mute,$("#ts_volume").toggleClass("muted",this.mute),window.turntablePlayer.setVolume(this.mute?0:this.currVolume()),this.log("turned mute "+(this.mute?"on":"off"))},t.prototype.onVolWheel=function(t){let e=window.youtube.futureVolume;e<0&&(e=this.currVolume());let o=t.originalEvent.shiftKey?1:5,n=t.originalEvent.deltaY>0?e-o:e+o;return n=n<0?0:n,$("#ts_slider")[0].value=n,this.saveVolume(n),!1}})(t),(t=>{t.prototype.runAutobop=function(){if(this.autobop&&clearTimeout(this.autobop),!this.config.autobop)return;let t=7*Math.random()*100;this.autobop=setTimeout((()=>this.click(".awesome-button")).bind(this),t)}})(t),(t=>{t.prototype.checkDecks=function(){this.config.nextdj&&(this.config.pingdj?this.suspend(null,1,"nextdj"):this.tryJumping())},t.prototype.tryJumping=function(){if(!$(".become-dj").length)return this.log("nextdj: no spot");this.log("nextdj: taking spot"),this.room.becomeDj()},t.prototype.isSpinning=function(){$("#ts_pane").removeClass("active"),this.config.nextdj=!1,$("#ts_nextdj").prop("checked",!1),setTimeout(this.saveConfig.bind(this),5e3),this.notifyUser({head:"You've Hopped On Deck!",text:"NextDJ is now disabled."})}})(t),(t=>{t.prototype.notifyUser=function(t,e){let o={type:"tsNotify",notification:t},n=()=>{window.postMessage(o)};return e?this.suspend(n,10,e):n()},t.prototype.sendToChat=function(t,o,n){$(".chat .messages").append(e(t,o,n)),this.view.updateChatScroll()};const e=(t,e,o)=>`\n    <div class="message ${o}">\n      <em>\n        <span class="subject">${t}</span>\n        <span class="text">${e}</span>\n      </em>\n    </div>\n  `})(t),window.$ts=new t}();