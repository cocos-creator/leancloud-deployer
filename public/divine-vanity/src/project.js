require=function t(e,i,n){function s(o,c){if(!i[o]){if(!e[o]){var r="function"==typeof require&&require;if(!c&&r)return r(o,!0);if(a)return a(o,!0);var l=new Error("Cannot find module '"+o+"'");throw l.code="MODULE_NOT_FOUND",l}var u=i[o]={exports:{}};e[o][0].call(u.exports,function(t){var i=e[o][1][t];return s(i?i:t)},u,u.exports,t,e,i,n)}return i[o].exports}for(var a="function"==typeof require&&require,o=0;o<n.length;o++)s(n[o]);return s}({AssetMng:[function(t,e,i){"use strict";cc._RFpush(e,"b181bc2SmNOeJf9tXPf0Dt7","AssetMng"),cc.Class({"extends":cc.Component,properties:{},init:function(t){this.wishesDB={};var e=cc.url.raw("data/wishes.json");cc.loader.loadJson(e,function(e,i){for(var n=0;n<i.length&&""!==i[n].id;++n)this.wishesDB[i[n].id]=i[n];t&&t()}.bind(this))},getWishInfo:function(t){return this.wishesDB[t]}}),cc._RFpop()},{}],AudioMng:[function(t,e,i){"use strict";cc._RFpush(e,"e266aPgsu1L1LkzuRdVBhos","AudioMng");var n=cc.Class({"extends":cc.Component,properties:{bgm:{"default":null,url:cc.AudioClip},ritual:{"default":null,url:cc.AudioClip},baby:{"default":null,url:cc.AudioClip},wishSFX:{"default":[],url:cc.AudioClip}},statics:{instance:null},playBGM:function(){cc.audioEngine.playMusic(this.bgm,!0)},playRitual:function(){cc.audioEngine.playEffect(this.ritual,!1)},playBaby:function(){cc.audioEngine.playEffect(this.baby,!1)},playWishSFX:function(t){t<this.wishSFX.length&&cc.audioEngine.playEffect(this.wishSFX[t],!1)},onLoad:function(){n.instance=this}});cc._RFpop()},{}],BattlePanel:[function(t,e,i){"use strict";cc._RFpush(e,"9692anGBoVDu6ZC8ZqgzCSt","BattlePanel");var n=t("PowerBar"),s=t("EffectMng"),a=t("AudioMng"),o=t("Rituals"),c=t("Credits"),r=cc.Class({"extends":cc.Component,properties:{people:{"default":null,type:cc.Label},power:{"default":null,type:n},skillList:{"default":null,type:cc.Node},rituals:{"default":null,type:o},btnRituals:cc.Node,creditPanel:c},statics:{instance:null},onLoad:function(){r.instance=this,this.skills=[],this.allUnlocked=!1,this.creditPanel.node.active=!1},start:function(){this.instantiate(),this.unlockBtn(0),this.state=0;var t=this;cc.eventManager.addListener({event:cc.EventListener.KEYBOARD,onKeyPressed:function(e,i){switch(e){case cc.KEY.b:t.state++,t.state>2&&(t.state=0),t.unlockBtn(t.state)}}},this.node)},useSkill:function(e,i){this.node.emit("skill-fired",{skillID:e});var n=t("Resources");n.instance.spendPower(i),this.chackBtnState(n),s.instance.play(e),a.instance.playWishSFX(e)},chackBtnState:function(t){for(var e=0,i=this.skills.length;i>e;++e){var n=this.skills[e];n.button.interactable=n.cost<=t.instance.curPower}},unlockBtn:function(t){if(!this.allUnlocked){t>3&&(this.allUnlocked=!0);var e,i,n,s=200-100*t,a=0;for(e=0,i=this.skills.length;i>e&&(n=this.skills[e],n.node.active);++e)a=e,n.node.x=s+100*e;var o=[];for(e=a+1;t>=e&&e<this.skills.length;e++)n=this.skills[e],n.node.x=s+100*e,n.node.active=!0,o.push(e);return o}},showCredit:function(){this.creditPanel.node.active||(this.creditPanel.node.active=!0)},showRituals:function(){this.rituals.node.active||(this.rituals.node.active=!0)},instantiate:function(){for(var e=(t("Resources"),this.skillList.getChildren()),i=0,n=e.length;n>i;++i){var s={id:i,cost:10*(i+1)},a=e[i].getComponent("Skill");a.updateSkill(s,this.useSkill,this),this.skills.push(a)}}});cc._RFpop()},{AudioMng:"AudioMng",Credits:"Credits",EffectMng:"EffectMng",PowerBar:"PowerBar",Resources:"Resources",Rituals:"Rituals"}],ButtonScaler:[function(t,e,i){"use strict";cc._RFpush(e,"108b2nVDh9IeZC26KkMkuCF","ButtonScaler"),cc.Class({"extends":cc.Component,properties:{pressedScale:1,transDuration:0},onLoad:function(){function t(t){this.stopAllActions(),this.runAction(i.scaleDownAction)}function e(t){this.stopAllActions(),this.runAction(i.scaleUpAction)}var i=this;i.initScale=this.node.scale,i.button=i.getComponent(cc.Button),i.scaleDownAction=cc.scaleTo(i.transDuration,i.pressedScale),i.scaleUpAction=cc.scaleTo(i.transDuration,i.initScale),this.node.on("touchstart",t,this.node),this.node.on("touchend",e,this.node),this.node.on("touchcancel",e,this.node)}}),cc._RFpop()},{}],Camera:[function(t,e,i){"use strict";cc._RFpush(e,"22060AdHZBObYbbs2Iygq7v","Camera"),cc.Class({"extends":cc.Component,editor:{executeInEditMode:!1,playOnFocus:!0},properties:{previewOnFocus:{"default":!0,notify:function(){this.enabled=this.previewOnFocus},tooltip:"Enable to preview in editor when you select the camera",editorOnly:!0},world:{"default":null,type:cc.Node,tooltip:"The root object which contains all the object rendering in camera."}},onFocusInEditor:function(){this.previewOnFocus&&(this.enabled=!0)},onLostFocusInEditor:function(){this.enabled=!1},onDisable:function(){this.world.position=cc.Vec2.ZERO,this.world.scale=cc.Vec2.ONE,this.world.rotation=0},lateUpdate:function(t){var e=this.node,i=this.world;if(i){var n;cc.Canvas.instance&&(n=cc.Canvas.instance.node.position);var s=n.sub(e.position),a=e.scaleX,o=s.subSelf(n);o.mulSelf(a),s=n.add(o);var c=-e.rotation;0!==c&&(s=n.add(o.rotate(-c*cc.RAD))),i.position=s,i.rotation=c,i.scale=a}}}),cc._RFpop()},{}],Credits:[function(t,e,i){"use strict";cc._RFpush(e,"fed9fSD5vpCTYgFzRSPmDsB","Credits"),cc.Class({"extends":cc.Component,properties:{scrollView:cc.ScrollView},startScroll:function(){},onEnable:function(){this.isInit=!0,this.scheduleOnce(this.scrollDown,2)},scrollDown:function(){this.scrollView.scrollToBottom(10,!1)},hide:function(){this.node.active=!1,this.unschedule(this.scrollDown),this.isInit=!0},update:function(t){this.isInit&&(this.scrollView.scrollToTop(),this.isInit=!1)}}),cc._RFpop()},{}],EffectMng:[function(t,e,i){"use strict";cc._RFpush(e,"3fd87b15V9E2qme/w2pc7n5","EffectMng");var n=cc.Class({"extends":cc.Component,properties:{fxRain:{"default":null,type:cc.ParticleSystem},fxMeta:{"default":null,type:cc.ParticleSystem},fxFire:{"default":null,type:cc.Animation},fxSun:{"default":null,type:cc.Animation},fxWheat:{"default":null,type:cc.Animation}},statics:{instance:null},onLoad:function(){n.instance=this},play:function(t){switch(t){case 0:this.fxRain.enabled=!0,this.fxRain.resetSystem();break;case 1:this.fxFire.play("fx_lightning");break;case 2:this.fxMeta.enabled=!0,this.fxMeta.resetSystem();break;case 3:this.fxSun.play("fx_sun");break;case 4:this.fxFire.play("fx_wheat")}},update:function(t){}});cc._RFpop()},{}],FXRitual:[function(t,e,i){"use strict";cc._RFpush(e,"0af8dguiAxB0as1d79lEyxj","FXRitual"),cc.Class({"extends":cc.Component,properties:{particle:cc.ParticleSystem,anim:cc.Animation,sign:cc.Node},onLoad:function(){this.sign=this.sign.getComponent("FXSign"),this.signID=-1},playAnim:function(t){this.signID=t,this.anim.play("play_ritual");var e=cc.find("Camera"),i=cc.find("Camera").getComponent("LookAt");i.target=this.node;var n=cc.sequence([cc.scaleTo(.5,1.5,1.5),cc.delayTime(2),cc.scaleTo(.5,1,1)]);e.runAction(n)},playParticle:function(){this.particle.resetSystem(),this.sign.show(this.signID)}}),cc._RFpop()},{}],FXSign:[function(t,e,i){"use strict";cc._RFpush(e,"1490347bspGKKclhTzReMQy","FXSign"),cc.Class({"extends":cc.Component,properties:{sprite:cc.Sprite,sfSigns:[cc.SpriteFrame]},onLoad:function(){this.sprite.enabled=!1},show:function(t){this.sprite.enabled=!0,this.sprite.spriteFrame=this.sfSigns[t],this.node.scale=3,this.node.opacity=0,this.sprite._sgNode.opacity=255;var e=cc.fadeIn(.3),i=cc.scaleTo(.5,1),n=cc.callFunc(this.wait,this);this.node.runAction(cc.sequence(e,i,n))},wait:function(){this.scheduleOnce(function(){var t=cc.fadeOut(.5);this.node.runAction(t)},1.5)}}),cc._RFpop()},{}],FXWonder:[function(t,e,i){"use strict";cc._RFpush(e,"6b42fw35dNH+7eMDuukZfc0","FXWonder"),cc.Class({"extends":cc.Component,properties:{particle:cc.ParticleSystem,anim:cc.Animation},playAnim:function(t){switch(t){case 0:this.anim.play("pop"),this.node.y-=80*cc.random0To1(),this.node.scale*=.3*cc.random0To1()+1;break;case 1:this.anim.play("empty"),this.node.y+=100*cc.random0To1();break;case 2:this.anim.play("pop_maya"),this.node.y+=60*cc.random0To1(),this.node.scale*=.3*cc.random0To1()+1;break;case 3:this.anim.play("pop_egypt"),this.node.y+=80*cc.random0To1();break;case 4:this.anim.play("pop")}this.particle.resetSystem()}}),cc._RFpop()},{}],GameOverPanel:[function(t,e,i){"use strict";cc._RFpush(e,"630b5AQpM9A9bBwXOhRrRZD","GameOverPanel"),cc.Class({"extends":cc.Component,properties:{society:{"default":null,type:cc.Node},eyesAnimCtrl:{"default":null,type:cc.Animation}},onLoad:function(){this.hasDown=!1,this.node.active=!1,this.node.on("touchstart",function(t){t.stopPropagation()})},onEnable:function(){this.eyesAnimCtrl.play("hideEyes")},goToMainPanelClick:function(){this.hasDown||(this.hasDown=!0,cc.director.loadScene("game"))}}),cc._RFpop()},{}],God:[function(t,e,i){"use strict";cc._RFpush(e,"8d8488GNe5KUoYdFG5att29","God");var n=(t("BattlePanel"),t("Resources"));cc.Class({"extends":cc.Component,properties:{battlePanel:{"default":null,type:cc.Node},resources:{"default":null,type:n},wonderPrefab:{"default":null,type:cc.Prefab},wonderLayer:cc.Node},onLoad:function(){this.skills=this.node.getComponent("Skills"),this.society=this.node.getComponent("Society"),this.battlePanel.on("skill-fired",this.skillFired,this)},tribute:function(t){this.resources.addPower(t)},skillFired:function(t){this.society.skillFired(t.detail.skillID)},showWonder:function(t){var e=cc.instantiate(this.wonderPrefab);this.wonderLayer.addChild(e),e.x=350*cc.randomMinus1To1(),e.getComponent("FXWonder").playAnim(t)}}),cc._RFpop()},{BattlePanel:"BattlePanel",Resources:"Resources"}],Group:[function(t,e,i){"use strict";function n(t,e){var i=[];for(var n in t)i.push(t[n]);for(var s=[],a=0;e>a&&i.length>0;a++){var o=Math.floor(Math.random()*i.length);s[a]=i[o],i.splice(o,1)}return s}cc._RFpush(e,"244bdNcVplFa7OuEr2uSOgH","Group"),t("../../ykl/global");var s=function(t){this.people=[],this.unuse(),this.reuse(t)};cc.js.mixin(s.prototype,{unuse:function(){this.society=null,this.people.length=0,this.state=States.DEFAULT,this.wish=null,this.poses=null,this.praying=!1,this.prayRitual=null,this.countdown=0,this.active=!1,this.learning=!1},reuse:function(t){this.society=t,this.active=!0},addMember:function(t){this.state===States.DEFAULT&&this.people.push(t)},canLearn:function(t){return this.state===States.DEFAULT&&this.people.length>=t.ritualNeed},isLearning:function(){return this.learning===!0},isPraying:function(){return this.praying===!0},split:function(t,e){if(this.canLearn(t)){var i=t.ritualNeed+Math.ceil(2*Math.random()),n=this.people.length-i;0>n&&(n=0);for(var s=this.people.length-1;s>=n;--s){var a=this.people.splice(s,1);e.addMember(a[0])}return!0}return!1},toState:function(t,e){var i=this;if(t!==this.state)switch(this.state=t,t){case States.PRAYING:var s=this.society.rituals[this.wish.id];this.people.forEach(function(t,e){var n=t.getComponent("HumanBehavior");n.currentState=States.PRAYING,n.currentWish=i.wish,n.currentPose=s.pose,n.pray.getComponent(cc.Sprite).enabled=!0,n.pray.play("pray")}),this.countdown=this.wish.poseDuration,this.prayRitual=s.pose,this.praying=!0;break;case States.LEARNING:this.poses=n(UnusedPoses,this.wish.poseCount),this.people.forEach(function(t,e){var n=t.getComponent("HumanBehavior");n.currentState=States.LEARNING,n.currentWish=i.wish,n.currentPose=i.poses[e%i.poses.length]});for(var a=this.people.sort(function(t,e){return t.x>e.x?1:-1}),o=null,c=0,r=a.length;r>c;c++)if(0!==c){var l=a[c].x;50>l-o?(a[c].runAction(cc.moveTo(.3,o+50,a[c].y)),o+=50):o=l}else o=a[c].x;this.countdown=this.wish.poseDuration,this.learning=!0;break;case States.WORSHIPING:this.poses&&(this.poses.length=0);var u=this.wish,a=this.people,h=this.society,p=this.praying,d=this;this.society.scheduleOnce(function(){var t=0,i=[];a.forEach(function(n,s){var a=n.getComponent("HumanBehavior");if(p||e===a.currentPose)a.tribute=u.tributePerP,a.currentState=States.WORSHIPING,i.push(n);else if(Math.random()<h.lostCoef){var a=n.getComponent("HumanBehavior");a.currentState=States.LOST,t++}else a.currentState=States.DEFAULT,i.push(n)}),d.people=i,t>0&&h.lost(t)},0),this.wish=null,this.countdown=this.isLearning?4.5:2}},punish:function(){var t=this.people,e=this.society,i=this;this.society.scheduleOnce(function(){var n=0,s=[];t.forEach(function(t,i){if(Math.random()<e.lostCoef){n++;var a=t.getComponent("HumanBehavior");a.currentState=States.LOST}else s.push(t),t.getComponent("HumanBehavior").currentState=States.DEFAULT}),i.people=s,n>0&&e.lost(n),e.rejointDefault(i)},0),this.active=!1,this.state=States.DEFAULT},update:function(t){var e=this;if(this.countdown>0)this.countdown-=t;else switch(this.countdown=0,this.state){case States.LEARNING:this.people.forEach(function(t){var i=t.getComponent("HumanBehavior");if(!i.checked){var n,s=e.poses.indexOf(i.currentPose);do n=Math.floor(Math.random()*e.poses.length);while(n===s&&e.poses.length>1);i.currentPose=e.poses[n]}}),this.countdown=this.wish.poseDuration;break;case States.PRAYING:var i=this.people,n=this.society,s=this;this.society.scheduleOnce(function(){var t=0,e=[];i.forEach(function(i,s){if(Math.random()<n.prayCoef){t++;var a=i.getComponent("HumanBehavior");a.currentState=States.LOST}else e.push(i),i.getComponent("HumanBehavior").currentState=States.DEFAULT}),s.people=e,t>0&&n.lost(t),n.rejointDefault(s)},0),this.active=!1,this.state=States.DEFAULT;break;case States.WORSHIPING:var a=[];this.people.forEach(function(t){var e=t.getComponent("HumanBehavior");a.push(e)}),this.society.scheduleOnce(function(){for(var t=0;t<a.length;++t)a[t].currentState=States.DEFAULT},0),this.state=States.DEFAULT,this.society.rejointDefault(this)}}}),e.exports=s,cc._RFpop()},{"../../ykl/global":"global"}],HumanBehavior:[function(t,e,i){"use strict";cc._RFpush(e,"fd410vTg3VKQbu9IoKPzDA9","HumanBehavior");var n=!1,s=!1;cc.Class({"extends":cc.Component,properties:{anim:{"default":null,type:cc.Animation},currentPose:{visible:!1,"default":"",displayName:"当前姿势",notify:function(){this.anim.stop(),this.anim.play(this.currentPose)}},currentWish:{visible:!1,"default":"",displayName:"当前愿望",notify:function(){WishType[this.currentWish.id];this.wishIcon.getComponent(cc.Sprite).spriteFrame=this.sfWishIcons[this.currentWish.id],this.wishIconAnim.play("show")}},currentState:{visible:!1,"default":window.States.DEFAULT,notify:function(t){this._updateState(t)}},wishIcon:{"default":null,type:cc.Node},wishIconAnim:{"default":null,type:cc.Animation},sfWishIcons:[cc.SpriteFrame],pray:cc.Animation,moveSpeed:300,idleMoveSpeed:50,idleChangeDirectionTimeRange:cc.v2(2,4)},onLoad:function(){this.checked=!1,this.canvas=cc.find("Canvas"),this._idleTime=this._idleChangeDirectionTime=3,this._updateState()},_updateState:function(t){var e=this.currentState;if(t===window.States.PRAYING&&(this.pray.getComponent(cc.Sprite).enabled=!1),e===window.States.DEFAULT)this.hideWish(),this.anim.play("idle"),this.checked=!1;else if(e===window.States.LEARNING)t!==window.States.DOUBTING&&(this.showWish(),this.wishIcon.getChildByName("skill_confirm").opacity=0),this.wishIcon.getComponent(cc.Button).interactable=!0;else if(e===window.States.DOUBTING)s===!1&&(s=!0,cc.find("Canvas/world/narrative").getComponent("Narrative").playLine(4)),this.wishIconAnim.play("doubt");else if(e===window.States.CONFIRMING)this.hideWish();else if(e===window.States.WORSHIPING){this.hideWish();var i=this.node.getChildByName("tribute"),n="+"+this.tribute;i.active=!0,i.getComponent(cc.Label).string=n,i.runAction(cc.sequence(cc.moveTo(1,0,120),cc.callFunc(function(){i.y=80,i.active=!1})).easing(cc.easeOut(2)))}else e===window.States.LOST&&(this.anim.play("die"),this.node.runAction(cc.sequence(cc.fadeOut(2.5),cc.callFunc(function(){this.node.removeFromParent()},this))))},onChecked:function(){var t=this;this.currentState===window.States.LEARNING&&(n===!1&&!function(){n=!0;var e=cc.find("Canvas/world/narrative").getComponent("Narrative");t.scheduleOnce(function(){e.playLine(3)},1)}(),this.checked=!0,this.wishIcon.getComponent(cc.Button).interactable=!1,this.wishIconAnim.play("confirm"),this.canvas.emit("wish-clicked",this))},showWish:function(){this.wishIcon.stopAllActions(),this.wishIcon.active=!0,this.wishIcon.runAction(cc.moveTo(.2,0,120))},hideWish:function(){this.wishIcon.x=this.wishIcon.y=0,this.wishIcon.active=!1},update:function(t){this.currentState===window.States.DEFAULT&&this.handleDefaultState(t)},handleDefaultState:function(t){if(this._idleTime+=t,this._idleTime>this._idleChangeDirectionTime){this._idleTime=0;var e=this.idleChangeDirectionTimeRange;this._idleChangeDirectionTime=e.x+Math.random()*(e.y-e.x);var i=Math.floor(2*Math.random());this.idleMoveSpeed*=0===i?-1:1}var n=this.idleMoveSpeed*t,s=this.node.x+n,a=this.canvas.width;(0>=s||s>=a)&&(this.idleMoveSpeed*=-1,s=this.node.x-n),this.idleMoveSpeed<0&&"idle-left"!==this.anim.currentClip.name?this.anim.play("idle-left"):this.idleMoveSpeed>0&&"idle"!==this.anim.currentClip.name&&this.anim.play("idle"),this.node.x=s}}),cc._RFpop()},{}],HumanManager:[function(t,e,i){"use strict";cc._RFpush(e,"88808PpqTxP1LWq3PyX3Lux","HumanManager");t("HumanBehavior");cc.Class({"extends":cc.Component,properties:{},onLoad:function(){this.checkedHumans=[];var t=cc.find("Canvas");t.on("wish-clicked",this.onHumanIconClicked,this)},"break":function(){this.checkedHumans.forEach(function(t){!function(t){t.checked=!1,t.currentState=window.States.DOUBTING,setTimeout(function(){t.currentState=window.States.LEARNING},500)}(t)}),this.checkedHumans=[]},update:function(t){this.updateHumanState(),this.updateHumanPosition(t)},updateHumanState:function(){for(var t=this.checkedHumans,e=t.length-1;e>=0;e--){var i=t[e];i.checked||t.splice(e,1)}},updateHumanPosition:function(t){var e=this.checkedHumans,i=e.length;if(!(2>i))for(var n=50,s=e[0].moveSpeed*t,a=0;i>a;a++){for(var o,c=e[a],r=c.node.x,l=!1,u=0,h=0,p=0;i>p;p++){var d=e[p];if(d!==c){if(o=r-d.node.x,Math.abs(o)<n){l=!0;break}o>0?u++:h++}}l||(c.node.x+=u>h?-s:s)}},addCheckedHuman:function(t){var e=this.checkedHumans;-1===e.indexOf(t)&&(e.push(t),e.length>1&&(t.currentWish!==e[0].currentWish||t.currentPose!==e[0].currentPose)&&(t.checked=!1,this["break"]()))},onHumanIconClicked:function(t){this.addCheckedHuman(t.detail)}}),cc._RFpop()},{HumanBehavior:"HumanBehavior"}],LookAt:[function(t,e,i){"use strict";cc._RFpush(e,"39182EXa1tHJpBfpeWWiLtq","LookAt"),cc.Class({"extends":cc.Component,editor:{executeInEditMode:!0,requireComponent:t("Camera")},properties:{target:{"default":null,type:cc.Node,tooltip:"The target object to look at"},offset:{"default":cc.Vec2.ZERO},speed:{"default":100,tooltip:"The max moving speed in world units per second"}},onLoad:function(){this.camera=this.getComponent("Camera")},_getWorldPosition:function(t){var e=t.convertToWorldSpaceAR(cc.Vec2.ZERO),i=cc.director.getRunningScene();return i?i.convertToNodeSpaceAR(e):e},_setWorldPosition:function(t,e){var i=cc.director.getRunningScene();i&&(e=cc.v2(i.convertToWorldSpaceAR(e))),t.position=t.parent?t.parent.convertToNodeSpaceAR(e):e},lateUpdate:function(t){if(this.target&&this.camera){var e=this._getWorldPosition(this.node),i=this.target.convertToWorldSpaceAR(cc.Vec2.ZERO);i=this.camera.world.convertToNodeSpace(i),i.addSelf(this.offset);var n,s=i.sub(e),a=s.magSqr(),o=this.speed*t;if(o*o>=a)n=i;else{var c=s.divSelf(Math.sqrt(a));n=e.addSelf(c.mulSelf(o))}this._setWorldPosition(this.node,n)}}}),cc._RFpop()},{Camera:"Camera"}],MainPanel:[function(t,e,i){"use strict";cc._RFpush(e,"80017cfF89LOofh4s3wykhT","MainPanel");{var n=t("Society"),s=t("AudioMng"),a=t("Narrative");cc.Class({"extends":cc.Component,properties:{society:{"default":null,type:n},animCtrl:{"default":null,type:cc.Animation},eyesNode:{"default":null,type:cc.Node},startGameBtn:{"default":null,type:cc.Animation},battlePanelAnim:{"default":null,type:cc.Animation},narrative:a},onLoad:function(){this.hasMoveScene=!1;var t=cc.director.getScene();t.y=-1450,this.narrative.playLine(0)},hideMainPanelAnimEnd:function(){this.society.resume(),this.battlePanelAnim.play("showBattlePanel")},runMoveScene:function(){var t=this.startGameBtn.getAnimationState("fadeInStartBtn");t.wrapMode=cc.WrapMode.Reverse,s.instance.playBGM(),this.society.narrative.playLine(1),this.startGameBtn.play("fadeInStartBtn"),this.hasMoveScene=!0},update:function(t){if(this.hasMoveScene){var e=cc.director.getScene();if(e.y>=0)return;e.y+=300*t,this.eyesNode.y-=300*t,e.y>0&&(e.y=0,this.hasMoveScene=!1,this.animCtrl.play("hideMainPanel"))}}})}cc._RFpop()},{AudioMng:"AudioMng",Narrative:"Narrative",Society:"Society"}],Narrative:[function(t,e,i){"use strict";cc._RFpush(e,"0c78c7VGApJq6AlYoc9hlfy","Narrative"),cc.Class({"extends":cc.Component,properties:{label:cc.Label,durationPerLine:0,textContents:{"default":[],type:"String",multiline:!0},fadeDuration:0},onLoad:function(){this.currentTextId=0,this.node.opacity=0},playLine:function(t){this.currentTextId=t;var e=cc.fadeOut(this.fadeDuration),i=cc.fadeIn(this.fadeDuration),n=cc.callFunc(this.switchText,this),s=cc.sequence(e,n,i);this.node.runAction(s),(4===t||3===t)&&this.scheduleOnce(function(){this.hideLine()},3)},hideLine:function(){this.node.runAction(cc.fadeOut(2))},switchText:function(){this.label.string=this.textContents[this.currentTextId]}}),cc._RFpop()},{}],PowerBar:[function(t,e,i){"use strict";cc._RFpush(e,"63e23/x1P1DHajbaVkXJyIp","PowerBar");cc.Class({"extends":cc.Component,properties:{content:{"default":null,type:cc.Label}},onLoad:function(){this.power=this.getComponent("cc.ProgressBar"),this.changePower=!1,this.newPowerValue=0,this.newPowerBarValue=0,this.addPower=0,this.curValue=100*this.power.progress,this.curProgressValue=0},updateValue:function(t,e,i){this.changePower=!0,this.newPowerValue=t,this.newPowerBarValue=e,this.curProgressValue=parseFloat(this.power.progress.toFixed(2)),this.addPower=this.newPowerBarValue>=this.curProgressValue?1:-1},animaBar:function(){this.changePower&&(this.curProgressValue=parseFloat(this.power.progress.toFixed(2)),this.curProgressValue!==this.newPowerBarValue&&(this.power.progress+=.01*this.addPower),this.curValue!==this.newPowerValue&&(this.curValue+=1*this.addPower,this.content.string=this.curValue),this.curProgressValue==this.newPowerBarValue&&this.curValue===this.newPowerValue&&(this.changePower=!1))},update:function(t){this.animaBar()}});cc._RFpop()},{}],Resources:[function(t,e,i){"use strict";cc._RFpush(e,"52a728YXuFIjIT4uiKYa6dO","Resources");var n=t("BattlePanel"),s=t("GameOverPanel"),a={0:"雨|5",1:"火|10",2:"肉|15",3:"健康|20",4:"阳光|25",5:"谷物|30",6:"矿藏|35",7:"武器|40",8:"燃料|45",9:"绿色植物|50"},o=20,c=0,r=100,l=cc.Class({"extends":cc.Component,properties:{curPower:{"default":0,type:cc.Integer,visible:!1},gameOver:{"default":null,type:s}},statics:{instance:null},onLoad:function(){l.instance=this},start:function(){this.curPower=0,this.addPower(o)},addPower:function(t){this.curPower+=t,this.curPower=this.curPower>=r?r:this.curPower,n.instance.power.updateValue(this.curPower,this.curPower/l.MAX_POWER)},spendPower:function(t){this.curPower-=t,this.curPower=this.curPower<=c?c:this.curPower,n.instance.power.updateValue(this.curPower,this.curPower/l.MAX_POWER),this.scheduleOnce(function(){this.curPower<10&&(this.gameOver.node.active=!0)},5)}});l.MIN_POWER=c,l.MAX_POWER=r,l.Skills=a,cc._RFpop()},{BattlePanel:"BattlePanel",GameOverPanel:"GameOverPanel"}],Rituals:[function(t,e,i){"use strict";cc._RFpush(e,"ab5e3D8U49Blq3u+WTsfUi+","Rituals");var n=(t("Ritual"),t("FXSign"));cc.Class({"extends":cc.Component,properties:{rituals:{type:[cc.Node],"default":[]},sign:n},activateRitual:function(t,e){var i=this.rituals[t],n=i.getChildByName("pose").getComponent(cc.Sprite);n.spriteFrame=this.sign.sfSigns[e]},close:function(){this.node.active=!1}}),cc._RFpop()},{FXSign:"FXSign",Ritual:"Ritual"}],Ritual:[function(t,e,i){"use strict";cc._RFpush(e,"81663uJAYFCO5ALYANOjbKq","Ritual"),cc.Class({"extends":cc.Component,properties:{pose:cc.Sprite}}),cc._RFpop()},{}],SkillMng:[function(t,e,i){"use strict";cc._RFpush(e,"ea87fcJKItLaqsfUPzHz3Xx","SkillMng"),cc.Class({"extends":cc.Component,properties:{},onLoad:function(){}}),cc._RFpop()},{}],Skill:[function(t,e,i){"use strict";cc._RFpush(e,"b874brCF5xOxoY39iXDY0fK","Skill"),cc.Class({"extends":cc.Component,properties:{label:cc.Label,sprite:cc.Sprite,sfIcons:[cc.SpriteFrame],skillID:{"default":0,type:cc.Integer,visible:!1},cost:{"default":0,type:cc.Integer,visible:!1},button:cc.Button,cooldown:0},userSkill:function(){this.callback&&(this.callback.call(this.target,this.skillID,this.cost),this.button.interactable=!1,this.scheduleOnce(this.onButtonCooldown.bind(this),this.cooldown))},onButtonCooldown:function(){var e=t("Resources");this.cost>e.instance.curPower||(this.button.interactable=!0)},updateSkill:function(t,e,i){this.skillID=t.id,this.cost=t.cost,this.label.string=this.cost,this.sprite.spriteFrame=this.sfIcons[this.skillID],this.callback=e,this.target=i}}),cc._RFpop()},{Resources:"Resources"}],Society:[function(t,e,i){"use strict";function n(t,e){return{id:e,pose:t,count:0,level:0}}cc._RFpush(e,"07354aU81JPS5ESw2HLIjGo","Society"),t("../../ykl/global");for(var s=t("Group"),a=t("../Wish"),o=t("BattlePanel"),c=t("FXRitual"),r=t("GameOverPanel"),l=t("AssetMng"),u=t("AudioMng"),h=t("Narrative"),p=cc.Enum.getList(WishType),d={},f=[3,8,20,35,50],m={},g=0;g<p.length;++g){var v=p[g].value;d[v]=new a,d[v].id=v,m[f[g]]=v}var w=cc.Class({"extends":cc.Component,properties:{wishes:{"default":[],type:[a]},host:{"default":null,type:cc.Node},battlePanel:{"default":null,type:o},fxRitual:{"default":null,type:c},gameOver:{"default":null,type:r},assetMng:{"default":null,type:l},narrative:h,prayDelay:20,lostCoef:1,prayCoef:.3,rollWishCoef:1.3,learnDelay:10,population:0},pause:function(){this._pause=!0,this.node.emit("pause")},resume:function(){this._pause=!1,this.node.emit("resume")},onLoad:function(){this.rituals={},this.ritualCount=0,this.lastRitualID=0,this.firstWishPop=!1,this._pause=!0,this._nextWish=null,this.god=this.getComponent("God"),this.defaultGroup=new s(this),this.learningGroup=new s(this),this.runningGroups=[],this.prayTimeout=this.prayDelay,this.learnTimeout=this.learnDelay,this.assetMng.init(function(){for(var t=0;t<p.length;++t){var e=p[t].value,i=this.assetMng.wishesDB[e];d[e].poseCount=parseInt(i.poseCount),d[e].poseDuration=parseInt(i.poseDuration),d[e].moveSpeed=parseInt(i.moveSpeed),d[e].ritualNeed=parseInt(i.ritualNeed),d[e].tributePerP=parseInt(i.tributePerP),d[e].divineConsume=parseInt(i.divineConsume),d[e].wishConsume=parseInt(i.wishConsume),d[e].levelBonus=parseInt(i.levelBonus),d[e].attraction=parseInt(i.attraction)}}.bind(this))},wishCheck:function(t,e){if(t.isLearning()&&t.wish&&t.wish.id===e){var i,n,s,a,o=t.people,c={},r=1;for(i=0;i<o.length;++i)n=o[i].getComponent("HumanBehavior"),n.checked&&(s=n.currentPose,c[s]?(c[s]++,c[s]>r&&(r=c[s],a=s)):c[s]=1);var l=t.wish;a&&r>=l.ritualNeed&&(this.scheduleOnce(function(){var t=Poses.indexOf(a);this.fxRitual.playAnim(t)},2.5),u.instance.playRitual(),this.ritualLearnt(l,a),this.tribute(r*l.wishConsume,l),t.toState(States.WORSHIPING,a))}else t.isPraying()&&t.prayRitual===this.rituals[e].pose?(this.tribute(t.people.length*d[e].wishConsume,d[e]),t.toState(States.WORSHIPING)):t.wish&&t.punish()},skillFired:function(t){this.wishCheck(this.learningGroup,t);for(var e=0;e<this.runningGroups.length;++e){var i=this.runningGroups[e];this.wishCheck(i,t)}},tribute:function(t,e){this.god.tribute(t);var i=Math.round(e.attraction+2*Math.random()-1);this.getComponent("generator").generate(i),u.instance.playBaby();var n=this.rituals[e.id];n.count++;var s=n.level;n.level=Math.floor(n.count/3),n.level>s&&this.god.showWonder(n.id)},updatePopulation:function(){this.battlePanel.people.string=this.population;for(var t,e,i=0;i<f.length;++i)if(e=f[i],this.population>=e&&m[e])t=e,v=m[e];else if(this.population<e)break;if(t){var n=this.battlePanel.unlockBtn(m[t]);n&&this.newSkillsAvailable(n)}},newSkillsAvailable:function(t){for(var e=0;e<t.length;++e){var i=t[e];d[i]&&this.wishes.push(d[i])}},startLearning:function(){this.learningGroup.isLearning()&&this.learningGroup.toState(States.LEARNING)},learn:function(){this.firstWishPop===!1&&(this.firstWishPop=!0,this.scheduleOnce(function(){this.narrative.playLine(2)},1));for(var t=0;t<this.wishes.length;++t){var e=this.wishes[t];this.learningGroup.reuse(this);var i=2+2*Math.random(),n=this.defaultGroup.split(e,this.learningGroup);if(n){this.learningGroup.wish=e,this.learningGroup.learning=!0,this.scheduleOnce(this.startLearning,i);break}}},ritualLearnt:function(t,e){this.rituals[t.id]=n(e,this.lastRitualID),this.lastRitualID++,this.ritualCount=Object.keys(this.rituals).length,this.prayTimeout=this.prayDelay;var i=this.wishes.indexOf(t);-1!==i&&this.wishes.splice(i,1),i=UnusedPoses.indexOf(e),i>-1&&UnusedPoses.splice(i,1);var s=this.battlePanel.btnRituals;s.active||(s.active=!0,s.runAction(cc.fadeIn(1))),this.battlePanel.rituals.activateRitual(t.id,Poses.indexOf(e))},rejointDefault:function(t){var e=this.defaultGroup;if(t.people.forEach(function(t){e.addMember(t)}),t===this.learningGroup)t.unuse();else{var i=this.runningGroups.indexOf(t);i>=0&&this.runningGroups.splice(i,1),cc.pool.putInPool(t)}},lost:function(t){this.population-=t,this.updatePopulation(),this.population<3&&(this.gameOver.node.active=!0)},update:function(t){if(!this._pause){this.wishes.length>0&&!this.learningGroup.learning&&((this.learnTimeout<=0||0===this.ritualCount)&&(this.learnTimeout=this.learnDelay,this.learn()),this.learnTimeout-=t),this.learningGroup.active&&this.learningGroup.update(t);var e;if(this.ritualCount>0){if(this.prayTimeout<=0){if(this.prayTimeout=this.prayDelay,null===this._nextWish){for(var i=Object.keys(this.rituals),n=i.length,a=Math.random()*this.rollWishCoef,o=a/n,c=(this.rollWishCoef-1)/(n*(n-1)/2),r=0,l=0,u=0;u<i.length;++u)if(r+=o+c*u,r>a){l=u;break}var h=i[l];this._nextWish=d[h]}e=cc.pool.hasObject(s)?cc.pool.getFromPool(s):new s(this);var p=this.defaultGroup.split(this._nextWish,e);p&&(e.wish=this._nextWish,e.praying=!0,this.runningGroups.push(e),e.toState(States.PRAYING),this._nextWish=null)}this.prayTimeout-=t}for(var f=0;f<this.runningGroups.length;++f)e=this.runningGroups[f],e.active&&e.update(t)}}});w.Wishes=d,cc._RFpop()},{"../../ykl/global":"global","../Wish":"Wish",AssetMng:"AssetMng",AudioMng:"AudioMng",BattlePanel:"BattlePanel",FXRitual:"FXRitual",GameOverPanel:"GameOverPanel",Group:"Group",Narrative:"Narrative"}],TouchStart:[function(t,e,i){"use strict";cc._RFpush(e,"6dc38qFSeRN4ZJQf+mnMO8Q","TouchStart"),cc.Class({"extends":cc.Component,properties:{mask:cc.Node},onLoad:function(){this.node.runAction(cc.repeatForever(cc.sequence(cc.fadeOut(1),cc.fadeIn(1)))),cc.eventManager.addListener({event:cc.EventListener.TOUCH_ONE_BY_ONE,onTouchBegan:function(t,e){return!0},onTouchEnded:function(t,e){this.mask.runAction(cc.fadeIn(1)),cc.director.loadScene("game")}.bind(this)},this)}}),cc._RFpop()},{}],TriggerAnimEvent:[function(t,e,i){"use strict";cc._RFpush(e,"d6b5bKEME1LdZrQDXO704qZ","TriggerAnimEvent"),cc.Class({"extends":cc.Component,properties:{startBtnAnim:{"default":null,type:cc.Animation},startBtn:cc.Node},eyesAnimEnd:function(){this.startBtn.active=!0,this.startBtnAnim.play("fadeInStartBtn")}}),cc._RFpop()},{}],Wish:[function(t,e,i){"use strict";cc._RFpush(e,"cd80bMwggpJGrAca2Y6vLoB","Wish");var n=cc.Class({name:"Wish",properties:{id:0,poseCount:2,poseDuration:3,moveSpeed:50,ritualNeed:3,tributePerP:2,divineConsume:1,wishConsume:3,levelBonus:.1,attraction:1}});e.exports=n,cc._RFpop()},{}],generator:[function(t,e,i){"use strict";cc._RFpush(e,"7d32f/FDHZEMY1WZNTt3Lps","generator"),cc.Class({"extends":cc.Component,properties:{population:3,y:{type:[cc.Integer],"default":[]},person:{"default":null,type:cc.Prefab}},start:function(){this.society=this.getComponent("Society"),this.society._pause?this.society.node.on("resume",function(){this.generate(this.population)},this):this.generate(this.population)},generate:function(t){var e=this.society;if(e.host){for(var i=0;t>i;++i){var n=cc.instantiate(this.person),s=cc.winSize.width;n.x=.2*s+Math.floor(Math.random()*s*.6)-96,n.y=this.y.length>0?this.y[i%this.y.length]:100,
this.y.length>0&&(n.scale=1.1-i%this.y.length/this.y.length*.25),n.scale+=.05*(Math.random()-.5);var a=cc.winSize.height-n.y;n.opacity=0,n.runAction(cc.fadeIn(1)),e.host.addChild(n,a),e.defaultGroup.addMember(n)}e.population+=t,e.updatePopulation()}}}),cc._RFpop()},{}],global:[function(t,e,i){"use strict";cc._RFpush(e,"796dclFGDdGeoH9i6fiyI+J","global");var n=cc.Enum({DEFAULT:0,LEARNING:1,DOUBTING:2,CONFIRMING:3,WORSHIPING:4,PRAYING:5,LOST:6}),s=cc.Enum({Rain:-1,Fire:-1,Meat:-1,Sun:-1,Wheet:-1}),a=["p_act01","p_act02","p_act03","p_act04","p_act05","p_act06","p_act07","p_act08"],o=["p_act01","p_act02","p_act03","p_act04","p_act05","p_act06","p_act07","p_act08"];window.States=n,window.Poses=a,window.UnusedPoses=o,window.WishType=s,cc._RFpop()},{}]},{},["Society","FXRitual","Narrative","ButtonScaler","FXSign","Camera","Group","LookAt","EffectMng","Resources","GameOverPanel","PowerBar","FXWonder","TouchStart","global","generator","MainPanel","Ritual","HumanManager","God","BattlePanel","Rituals","AssetMng","Skill","Wish","TriggerAnimEvent","AudioMng","SkillMng","HumanBehavior","Credits"]);
//# sourceMappingURL=project.js.map