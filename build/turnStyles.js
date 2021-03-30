!function(){var t,e,o=(t=function(t,e){t.exports={version:"5.0.2"}},function(o){return e||t(e={exports:{},parent:o},e.exports),e.exports});const n=function(){this.loadConfig(),this.loadThemes(),this.attachRoom()};(t=>{t.prototype.log=function(t){console.info("turnStyles :: "+t)},t.prototype.named=t=>this.room.userMap[t.id].attributes.name,t.prototype.scaleVol=t=>Math.log(t/100)/Math.LN2+4,t.prototype.holding={},t.prototype.suspend=function(t,e,o){this.holding[o]?delete this.holding[o]:t&&t(),this.holding[o]=setTimeout((()=>{delete this.holding[o]}).bind(this),1e3*e)},t.prototype.click=function(t){$(window).focus();let e={bubbles:!0,cancelable:!0,view:window},o=document.querySelectorAll(t)[0],n=new MouseEvent("click",e);return!o.dispatchEvent(n)}})(n),(t=>{t.prototype.default={theme:"dark",style:"",autobop:!0,nextdj:!1,pingdj:!1,has_vol:!1,ping_pm:!1,ping_song:!1,ping_chat:!1,chat_stat:!0,chat_snag:!0,chat_join:!0,chat_left:!0},t.prototype.options={theme:{dark:"Dark Mode",night:"Night Mode"},style:{pink:"Pink",blue:"Blue",teal:"Teal",green:"Green"}},t.prototype.loadConfig=function(){this.chrome=!!window.tsBase,this.__base=window.tsBase||"https://ts.pixelcrisis.co/build";let t=window.localStorage.getItem("tsdb"),e=t?JSON.parse(t):{};this.config={...this.default,...e},this.log("loaded config")},t.prototype.saveConfig=function(){this.config.theme=$("#ts_theme").val(),this.config.style=$("#ts_style").val(),this.config.autobop=$("#ts_autobop").is(":checked"),this.config.nextdj=$("#ts_nextdj").is(":checked"),this.config.pingdj=$("#ts_pingdj").is(":checked"),this.config.has_vol=$("#ts_has_vol").is(":checked"),this.config.ping_pm=$("#ts_ping_pm").is(":checked"),this.config.ping_chat=$("#ts_ping_chat").is(":checked"),this.config.ping_song=$("#ts_ping_song").is(":checked"),this.config.chat_stat=$("#ts_chat_stat").is(":checked"),this.config.chat_snag=$("#ts_chat_snag").is(":checked"),this.config.chat_join=$("#ts_chat_join").is(":checked"),this.config.chat_left=$("#ts_chat_left").is(":checked");let t=JSON.stringify(this.config);window.localStorage.setItem("tsdb",t),this.log("saved config"),this.onSave()}})(n),(t=>{t.prototype.handle=function(t){switch(t.command){case"pmmed":this.onPing(t);break;case"speak":this.onChat(t);break;case"add_dj":this.onJump(t);break;case"rem_dj":this.onDrop(t);break;case"newsong":this.onSong(t);break;case"snagged":this.onSnag(t);break;case"registered":this.onJoin(t);break;case"deregistered":this.onLeft(t);break;case"update_votes":this.onVote(t)}},t.prototype.onLoad=function(){this.buildPanel(),this.runAutobop(),this.onSave()},t.prototype.onSave=function(){this.loadThemes(),this.loadVolume(),this.checkDecks(),!0!==this.config.ping_chat&&!0!==this.config.ping_pm&&!0!==this.config.ping_song||this.checkNotificationsPerms()},t.prototype.onPing=function(t){this.config.ping_pm&&this.notifyUser({head:"New PM",text:t.text},"ping_pm")},t.prototype.onChat=function(t){let e="@"+this.core.user.attributes.name.toLowerCase();t.text.toLowerCase().indexOf(e)>-1&&(this.config.ping_chat&&this.notifyUser({head:`[${this.room.roomData.name}] @${t.name}`,text:t.text},"ping_chat"),this.holding.nextdj&&(this.log("nextdj: received ping"),this.tryJumping()))},t.prototype.onSong=function(t){this.runAutobop(),this.mute&&this.toggleMute(),this.now_playing?this.last_played={...this.now_playing}:this.last_played={},this.now_playing={love:0,hate:0,snag:0,...t.room.metadata.current_song.metadata};let e=!1,o=this.last_played;o.song&&(e=`[\ud83d\udd3a${o.love}\ud83d\udd3b${o.hate}\u2764\ufe0f${o.snag}]`),this.config.ping_song&&this.notifyUser({head:"Now Playing: "+this.now_playing.song,text:e||"By: "+this.now_playing.artist}),e&&this.config.chat_stat&&this.sendToChat(e,o.song)},t.prototype.onJump=function(t){this.user==t.user[0].userid&&this.config.nextdj&&this.isSpinning()},t.prototype.onDrop=function(){this.checkDecks()},t.prototype.onSnag=function(t){if(this.now_playing.snag+=1,this.config.chat_snag){let e=this.named(t.user),o="has snagged this track!";this.sendToChat(e,o,"snag")}},t.prototype.onVote=function(t){this.now_playing.love=t.room.metadata.upvotes,this.now_playing.hate=t.room.metadata.downvotes},t.prototype.onJoin=function(t){if(this.config.chat_join){let e=t.user[0].name;this.sendToChat(e,"joined.","join")}},t.prototype.onLeft=function(t){if(this.config.chat_left){let e=t.user[0].name;this.sendToChat(e,"left.","left")}}})(n),(t=>{t.prototype.loadThemes=function(){$("link.tS-core").length||this.createLink("turnStyles"),this.refreshURL(this.config.theme,"themes"),this.refreshURL(this.config.style,"styles"),this.hideUpload(),this.log("refreshed themes")},t.prototype.hideUpload=function(){let t=$("#ts_upload");this.config.theme&&!t.length?($("#upload-button").after('<div id="ts_upload"></div>'),$("#ts_upload").on("click",this.fakeUpload.bind(this))):!this.config.theme&&t.length&&t.remove()},t.prototype.fakeUpload=function(){$("#queue-header").removeClass("normal").addClass("edit");let t=this.core.playlist;t.isFiltering&&t.clearSearchBar(),t.queue.batchEditMode()},t.prototype.locatePath=function(t,e){return`${e?`${this.__base}/${e}`:""+this.__base}/${t}.css`},t.prototype.refreshURL=function(t,e){let o=$("link.tS-"+(e||"core"));if(!t)return!!o.length&&o.remove();o.length?o.attr("href",this.locatePath(t,e)):this.createLink(t,e)},t.prototype.createLink=function(t,e){let o=e||"core",n=document.createElement("link");n.classList.add("tS-"+o),n.rel="stylesheet",n.type="text/css",n.href=this.locatePath(t,e),document.head.append(n)}})(n),(t=>{t.prototype.attachRoom=function(){if(!window.turntable)return this.log("no room");let o=()=>setTimeout(t.prototype.attachRoom.bind(this),250);return this.core=window.turntable,this.user=this.core.user.id,this.view=this.core.topViewController,this.room=e(this.core,"roomId"),this.room?(this.ttfm=e(this.room,"roomData"),this.ttfm?(this.room.currentSong&&(this.now_playing={snag:0,hate:0,love:this.room.upvoters.length,...this.room.currentSong.metadata}),this.realVolume=window.turntablePlayer.realVolume,this.core.addEventListener("message",this.handle.bind(this)),this.log("loaded room: "+this.room.roomId),void this.onLoad()):o()):o()};const e=function(t,e){for(let o in t){let n=t[o];if(null!=n&&n[e])return n}}})(n),(t=>{let e=o({}).version;t.prototype.buildPanel=function(){$(".header-bar").append(n(this));let t=$("#ts_panel, #ts_window"),e=$("#ts_panel input, #ts_window input, #ts_window select");$(".ts_toggle").on("click",()=>t.toggleClass("active")),e.on("change",this.saveConfig.bind(this))};const n=t=>`\n    <div id="ts_panel">\n      <h3 class="ts_toggle">\u2630 tS</h3>\n      <label> ${s(t,"autobop")} Autobop </label>\n      <label> ${s(t,"nextdj")} Next DJ Spot </label>\n      <label> ${s(t,"pingdj")} Next DJ On Ping </label>\n      <button class="ts_toggle">...more</button>\n    </div>\n    <div id="ts_window">\n      <h3 class="ts_toggle">\u2630 turnStyles</h3>\n      <label> ${i(t,"theme")} </label>\n      <label> ${i(t,"style")} </label>\n      <div>\n        <h5>Options</h5>\n        <label> ${s(t,"autobop")} Autobop </label>\n        <label> ${s(t,"has_vol")} Control Volume </label>\n        <label> ${s(t,"nextdj")} Next DJ Spot </label>\n        <label> ${s(t,"pingdj")} Next DJ On Ping </label>\n      </div>\n      <div>\n        <h5>Post To Chat</h5>\n        <label>${s(t,"chat_stat")} Song Stats</label>\n        <label>${s(t,"chat_snag")} User Snags</label>\n        <label>${s(t,"chat_join")} User Joins</label>\n        <label>${s(t,"chat_left")} User Leaves</label>\n      </div>\n      <div>\n        <h5>Desktop Notifications</h5>\n        <label>${s(t,"ping_pm")} On DMs</label>\n        <label>${s(t,"ping_chat")} On Mentions</label>\n        <label>${s(t,"ping_song")} On New Songs</label>\n      </div>\n      <div class="ts_credits">\n        <button class="ts_toggle">\u2714\ufe0e Close</button>\n        <small>v${e}</small>\n        <small>\n          <a href="https://discord.gg/jnRs4WnPjM" target="_blank">Join me on the TT Discord</a>\n        </small>\n      </div>\n    </div>\n  `,i=(t,e)=>`\n    <select id="ts_${e}">\n      <option value="">No ${e[0].toUpperCase()+e.substring(1)}</option>\n      ${Object.keys(t.options[e]).map(o=>`\n        <option value="${o}" ${t.config[e]==o?"selected":""}>\n          ${t.options[e][o]}\n        </option>\n      `).join("")}\n    </select>\n  `,s=(t,e)=>`\n    <input id="ts_${e}" type="checkbox"\n      ${t.config[e]?"checked":""}>\n    </input>\n  `})(n),(t=>{t.prototype.loadVolume=function(){let t=$("body").hasClass("has-volume");if(this.config.has_vol&&!t){$("body").addClass("has-volume"),$(".header-content").append(this.htmlVolume());let t=$("#ts_mute"),e=$("#ts_slider");t.on("click",this.toggleMute.bind(this)),e.on("input",this.saveVolume.bind(this)),e.on("DOMMouseScroll mousewheel",this.onVolWheel.bind(this))}else!this.config.has_vol&&t&&($("#ts_volume").remove(),$("body").removeClass("has-volume"),window.turntablePlayer.realVolume=this.realVolume)},t.prototype.htmlVolume=function(){return`\n    <div id="ts_volume">\n      <span id="ts_mute"></span>\n      <input id="ts_slider" type="range" \n        min="0" max="100" value="${this.currVolume()}">\n      </input>\n      <em id="ts_muted">Muted For One Song</em>\n    </div>`},t.prototype.currVolume=function(t){let e=t||window.util.getSetting("volume");return 100*Math.pow(2,e-4)},t.prototype.saveVolume=function(t){let e=(t=t.target?t.target.value:t)>0?this.scaleVol(t):-3;window.turntablePlayer.realVolume=e>6?this.realVolume:this.currVolume,window.turntablePlayer.setVolume(e),window.util.setSetting("volume",e)},t.prototype.toggleMute=function(){this.mute=!this.mute,$("#ts_volume").toggleClass("muted",this.mute),window.turntablePlayer.setVolume(this.mute?-3:this.scaleVol(this.currVolume())),this.log("turned mute "+(this.mute?"on":"off"))},t.prototype.onVolWheel=function(t){const e=this.currVolume();let o=t.originalEvent.shiftKey?1:5,n=t.originalEvent.deltaY>0?e-o:e+o;return n=n<0?0:n>100?100:n,$("#ts_slider")[0].value=n,this.saveVolume(n),!1}})(n),(t=>{t.prototype.runAutobop=function(){if(this.autobop&&clearTimeout(this.autobop),!this.config.autobop)return;let t=7*Math.random()*100;this.autobop=setTimeout((()=>this.click(".awesome-button")).bind(this),t)}})(n),(t=>{t.prototype.checkDecks=function(){this.config.nextdj&&(this.config.pingdj?this.suspend(null,1,"nextdj"):this.tryJumping())},t.prototype.tryJumping=function(){if(!$(".become-dj").length)return this.log("nextdj: no spot");this.log("nextdj: taking spot"),this.room.becomeDj()},t.prototype.isSpinning=function(){$("#ts_pane").removeClass("active"),this.config.nextdj=!1,$("#ts_nextdj").prop("checked",!1),setTimeout(this.saveConfig.bind(this),5e3),this.notifyUser({head:"You've Hopped On Deck!",text:"NextDJ is now disabled."})}})(n),(t=>{t.prototype.checkNotificationsPerms=function(){return"Notification"in window&&"denied"!==Notification.permission&&("default"!==Notification.permission||(Notification.requestPermission(),!1))},t.prototype.notifyUser=function(t,e){if(!document.hasFocus()){if(this.chrome){let o={type:"tsNotify",notification:t},n=()=>{window.postMessage(o)};return e?this.suspend(n,10,e):n()}{if(!this.checkNotificationsPerms())return;const o="https://ts.pixelcrisis.co/build/images/icon128.png",n=()=>{const e=new Notification(t.head,{icon:o,body:t.text});e.onclick=()=>{window.focus(),e.close()}};return e?this.suspend(n,10,e):n()}}},t.prototype.sendToChat=function(t,o,n){$(".chat .messages").append(e(t,o,n)),this.view.updateChatScroll()};const e=(t,e,o)=>`\n    <div class="message ${o}">\n      <em>\n        <span class="subject">${t}</span>\n        <span class="text">${e}</span>\n      </em>\n    </div>\n  `})(n),window.$tS=new n}();