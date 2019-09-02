sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"com/hcl/hclBOT/utils/Formatters"
], function (Controller, Formatters) {
	"use strict";

	return Controller.extend("com.hcl.hclBOT.controller.chatBOT", {
		customformatter: Formatters,
		onInit: function () {
			var msgModel = new sap.ui.model.json.JSONModel({
				"items": {
					"audio": true
				}
			});
			this.getView().setModel(msgModel, "oModel");
		},
		onChatPress: function (oEvent) {
			if (!this._oPopover) {
				this._oPopover = sap.ui.xmlfragment("com.hcl.hclBOT.fragments.Popover", this);
				this.getView().addDependent(this._oPopover);
			}
			if (!this._oPopover.isOpen()) {
				/*this._oEvent = oEvent.getSource();*/
				this._oPopover.openBy(oEvent.getSource());
			}

		},
		handleCloseButton: function (oEvent) {
			sap.ui.getCore().byId("welcomeContainer").setVisible(true);
	        sap.ui.getCore().byId("chatWindowContainer").setVisible(false);
	        sap.ui.getCore().byId("settingWindowContainer").setVisible(false);
	        
	        
	        sap.ui.getCore().byId("idHeaderLvl").setVisible(true);
	        sap.ui.getCore().byId("idHeaderIco").setVisible(false);
	        sap.ui.getCore().byId("idScrollBox").setVisible(false);
	        sap.ui.getCore().byId("idMsgSnd").setVisible(true);
	        
			this._oPopover.close();
		},
		handleSettingsButton: function (oEvent) {
			var tooltip = sap.ui.getCore().byId("settingbutton")._getTooltip();
			if(tooltip==='Settings')
			{ //alert(tooltip);
				sap.ui.getCore().byId("welcomeContainer").setVisible(false);
		        sap.ui.getCore().byId("chatWindowContainer").setVisible(false);
		        sap.ui.getCore().byId("settingWindowContainer").setVisible(true);
		        
		        //sap.ui.getCore().byId("idCmnBtn").setVisible(false);
		        //sap.ui.getCore().byId("idSetBtn").setVisible(true);
		        
		        sap.ui.getCore().byId("idHeaderLvl").setVisible(false);
		        sap.ui.getCore().byId("idHeaderIco").setVisible(true);
		        sap.ui.getCore().byId("idScrollBox").setVisible(false);
		        sap.ui.getCore().byId("idMsgSnd").setVisible(false);
		        
		        
		        sap.ui.getCore().byId("switchid").setVisible(true);
		        //sap.ui.getCore().byId("setback").setVisible(true);
		        sap.ui.getCore().byId("settingbutton").setTooltip("back");
		        sap.ui.getCore().byId("settingbutton").setIcon('sap-icon://nav-back');
			}
			else
			{ //alert(tooltip);
				sap.ui.getCore().byId("welcomeContainer").setVisible(true);
		        sap.ui.getCore().byId("chatWindowContainer").setVisible(true);
		        //sap.ui.getCore().byId("settingWindowContainer").setVisible(false);
		        
		        //sap.ui.getCore().byId("idCmnBtn").setVisible(false);
		        //sap.ui.getCore().byId("idSetBtn").setVisible(true);
		        
		        sap.ui.getCore().byId("idHeaderLvl").setVisible(true);
		        sap.ui.getCore().byId("idHeaderIco").setVisible(false);
		        sap.ui.getCore().byId("idScrollBox").setVisible(true);
		        sap.ui.getCore().byId("idMsgSnd").setVisible(true);
		        sap.ui.getCore().byId("switchid").setVisible(false);

		        sap.ui.getCore().byId("settingbutton").setTooltip("Settings");
		        sap.ui.getCore().byId("settingbutton").setIcon('sap-icon://action-settings');
	
			}
			
	        
		},
		parseText: function (oEvent) {
			
			sap.ui.getCore().byId("welcomeContainer").setVisible(false);
	        sap.ui.getCore().byId("chatWindowContainer").setVisible(true);
	        sap.ui.getCore().byId("settingWindowContainer").setVisible(false);
	        
	        sap.ui.getCore().byId("idHeaderLvl").setVisible(false);
	        sap.ui.getCore().byId("idHeaderIco").setVisible(true);
	        sap.ui.getCore().byId("idScrollBox").setVisible(true);
	        sap.ui.getCore().byId("idMsgSnd").setVisible(true);
			
			var messageINP = oEvent.getSource().getValue();
			messageINP = messageINP.replace(/^\s+|\s+$/g,'');
			if(messageINP == "") return;
			
			this.createMsgObj(messageINP, "UserReq");
			
		/*	var oModel = this.getView().getModel("oModel");
			var oData = oModel.getData();
			oData.items.unshift({
				"Msg": oEvent.getSource().getValue(),
				"MsgType": "UserReq"
			});
			oModel.setData(oData);*/

		},
		
		createMsgObj: function (msg, msgType) {
			var oList = sap.ui.getCore().byId("list1");
			
			var CustomListItemTemplate = new sap.m.CustomListItem();
			var rspHboxox = new sap.m.VBox({
			});
			
			if(msgType == 'BotReq')
			{
				rspHboxox.addStyleClass("BOTContent");
				var rsptxt = new sap.m.Text({
					text: msg
				});
				rsptxt.addStyleClass("BOTTxtContent");
				rspHboxox.addItem(rsptxt);
			}
			else
			{
				rspHboxox.addStyleClass("userContent");
				var rsptxt = new sap.m.Text({
					text: msg
				});
				rsptxt.addStyleClass("userTxtContent");
				rspHboxox.addItem(rsptxt);
			}
			
			var time = new Date();
			var timeTxt = time.toLocaleString("en-US", { hour: "numeric", minute: "numeric", hour12: true });
			var tmtxt = new sap.m.Label({
				text: timeTxt
			});
			rspHboxox.addItem(tmtxt);
			
			CustomListItemTemplate.addContent(rspHboxox);
			
			oList.addItem(CustomListItemTemplate);
			var oModel = this.getView().getModel("oModel");
			var oData = oModel.getData();
			oModel.setData(oData);
			
			var sound = "sound/399191_5549581-lq.mp3";
			var playAudio = this.getView().getModel("oModel").getData().items.audio;
			if(playAudio)
			{
				new Audio(sound).play();
			}
			
			if(msgType == "UserReq") this.checkChat(msg);
			
			/*var lastItem = oList.getItems()[oList.getItems().length-1]; 
			var oScrollContainer = sap.ui.getCore().byId("scrollBOT");
			oScrollContainer.scrollToElement(lastItem);
			oList.setSelectedItem(lastItem,true);*/
		},
		
		checkChat: function(msg) {
			var that = this;
			setTimeout(function(){
		    	that.answer(msg);
			}, 1000);
		},
		
		answer: function(msg) {
			
			//var lastMeMessage = sap.ui.getCore().byId("chat").getValue();
			var lastMeMessage = msg;
			console.log("Last Message from Me: " + lastMeMessage);
			
			var regTopic = new RegExp(lastMeMessage, "gmi");
			var topicSel = null;
			
			// <brain>
			// THIS IS A BRAIN OF BOT
			var topicJSON = [{ask:"hi", ans:["Hello :) Nice to meet you"]},
			                 {ask:"hello", ans:["Hello there! How are you doing today?"]},
			                 {ask:"how are you?", ans:["Good, and you?"]},
			                 {ask:"fine", ans:["Good to hear that."]},
			                 {ask:"bye", ans:["Bye, see you :)"]}
			                ];
			// </brain>
			
			for(var i=0; i<topicJSON.length; i++)
			{
			    if( regTopic.test( topicJSON[i].ask ) ) {
			      console.log(topicJSON[i].ask + ' is the same like ' + lastMeMessage);
			      topicSel = i;
			      break;
			    }
			    else{
			      console.log(topicJSON[i].ask + ' is NOT the same like ' + lastMeMessage);
			    }
		    }
			
			console.log("Founded matching topic ask: ");
			console.log(topicSel);
			
			//Find answer in selected JSON
			if(topicSel != null)
			{
		    	var selectedAnswers = topicJSON[ topicSel ]['ans'];
		    	//var finAnswer = selectedAnswers[ this.getRandomInt(0, selectedAnswers.length-1) ];
		    	var finAnswer = selectedAnswers[0];
		    
		    	this.createMsgObj(finAnswer ,"BotReq");
			}
			else
			{
		    	this.createMsgObj("I don't know what you want!!" ,"BotReq");
			}
			
			sap.ui.getCore().byId("chat").setValue("");
			sap.ui.getCore().byId("chat").setPlaceholder("Your message...");
			
			var scrollingElement = document.querySelector(".chatWindowContainer");
			$(scrollingElement).animate({
			   scrollTop: scrollingElement.scrollHeight
			}, 500);
		},
		
		getRandomInt: function(min, max) {
		    min = Math.ceil(min);
		    max = Math.floor(max);
		    return Math.floor(Math.random() * (max - min + 1)) + min;
		},
		
		parseOptText: function (oEvent) {
			
			var messageINP = oEvent.getSource().getText();
			messageINP = messageINP.replace(/^\s+|\s+$/g,'');
			if(messageINP == "") return;
			
			this.createMsgObj(messageINP, "UserReq");

		},
		
		saveSettings: function() {
			
			var hasAudio = sap.ui.getCore().byId("hasAudio").getState();
			this.getView().getModel("oModel").setProperty("/items/audio",hasAudio);
			
			sap.ui.getCore().byId("welcomeContainer").setVisible(false);
	        sap.ui.getCore().byId("chatWindowContainer").setVisible(true);
	        sap.ui.getCore().byId("settingWindowContainer").setVisible(false);
	        
	        sap.ui.getCore().byId("idHeaderLvl").setVisible(false);
	        sap.ui.getCore().byId("idHeaderIco").setVisible(true);
	        sap.ui.getCore().byId("idScrollBox").setVisible(true);
	        sap.ui.getCore().byId("idMsgSnd").setVisible(true);
		},
		cancelSettings: function (oEvent) {
			sap.ui.getCore().byId("welcomeContainer").setVisible(false);
	        sap.ui.getCore().byId("chatWindowContainer").setVisible(true);
	        sap.ui.getCore().byId("settingWindowContainer").setVisible(false);
	        
	        sap.ui.getCore().byId("idHeaderLvl").setVisible(false);
	        sap.ui.getCore().byId("idHeaderIco").setVisible(true);
	        sap.ui.getCore().byId("idScrollBox").setVisible(true);
	        sap.ui.getCore().byId("idMsgSnd").setVisible(true);
	        
		},
		handleColorSelect: function (oEvent) {
			sap.m.MessageToast.show("Color Selected: value - " + oEvent.getParameter("value") +
				", \n defaultAction - " + oEvent.getParameter("defaultAction"));
		}
	});
});