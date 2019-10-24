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
			
			var chatModel = new sap.ui.model.json.JSONModel({
				"items": {
					"audio": true
				}
			});
			sap.ui.getCore().setModel(chatModel, "chatBotModel");
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
			if(tooltip === "Settings")
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
		        sap.ui.getCore().byId("cancelbutton").setVisible(false);
		        sap.ui.getCore().byId("settingbutton").setTooltip("back");
		        sap.ui.getCore().byId("settingbutton").setIcon("sap-icon://nav-back");
			}
			else
			{ //alert(tooltip);
			
				sap.ui.getCore().byId("welcomeContainer").setVisible(false);
		        sap.ui.getCore().byId("chatWindowContainer").setVisible(true);
		        sap.ui.getCore().byId("settingWindowContainer").setVisible(false);
		        
		        //sap.ui.getCore().byId("idCmnBtn").setVisible(false);
		        //sap.ui.getCore().byId("idSetBtn").setVisible(true);
		        
		        sap.ui.getCore().byId("statimg").setVisible(false);
		        sap.ui.getCore().byId("stattext").setVisible(false);
		        
		        sap.ui.getCore().byId("idHeaderLvl").setVisible(false);
		        sap.ui.getCore().byId("idHeaderIco").setVisible(true);
		        
		        sap.ui.getCore().byId("idScrollBox").setVisible(true);
		        sap.ui.getCore().byId("idMsgSnd").setVisible(true);
		        
		        sap.ui.getCore().byId("switchid").setVisible(false);
				sap.ui.getCore().byId("cancelbutton").setVisible(true);
				
		        sap.ui.getCore().byId("settingbutton").setTooltip("Settings");
		        sap.ui.getCore().byId("settingbutton").setIcon("sap-icon://action-settings");
		        
		        //var scrollingElement = document.querySelector(".chatWindowContainer");
				$(this.scrollingElement).animate({
					scrollTop: this.scrollHeight
				}, 500);
	
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
			messageINP = messageINP.replace(/^\s+|\s+$/g,"");
			if(messageINP == "") {return;}
			
			this.createMsgObj(messageINP, "UserReq");
			
		/*	var oModel = this.getView().getModel("oModel");
			var oData = oModel.getData();
			oData.items.unshift({
				"Msg": oEvent.getSource().getValue(),
				"MsgType": "UserReq"
			});
			oModel.setData(oData);*/

		},
		
		createMsgObj: function (msg, msgType,caiType) {
			var oList = sap.ui.getCore().byId("list1");
			
			var CustomListItemTemplate = new sap.m.CustomListItem();
			var rspHboxox = new sap.m.VBox({
			});
			
			if(msgType == "BotReq")
			{
				/*rspHboxox.addStyleClass("BOTContent");
				var rsptxt = new sap.m.Text({
					text: msg
				});
				rsptxt.addStyleClass("BOTTxtContent");
				rspHboxox.addItem(rsptxt);*/
				if(caiType==='text')
				{
						var chatData = {"txtMsg": msg};
					var msgInFragment = new sap.ui.model.json.JSONModel(chatData);
					var chatTextItem = sap.ui.xmlfragment("com.hcl.hclBOT.fragments.Text", this);
					chatTextItem.setModel(msgInFragment);
					rspHboxox.addStyleClass("BOTContent");
					rspHboxox.addItem(chatTextItem);
				}
				else if(caiType==='quickReplies')
				{
					var chatData = {"firstbuttitle": msg.buttons[0].title,"firstbutval": msg.buttons[0].value,
					"secbuttitle": msg.buttons[1].title,"secbutval": msg.buttons[1].value};
					var msgInFragment = new sap.ui.model.json.JSONModel(chatData);
					var chatTextItem = sap.ui.xmlfragment("com.hcl.hclBOT.fragments.QuickReplies", this);
					chatTextItem.setModel(msgInFragment);
					rspHboxox.addStyleClass("BOTContent");
					rspHboxox.addItem(chatTextItem);
				}
				else if(caiType==='card')
				{
					var chatData = {"cardtitle": msg.title,"cardsubtitle": msg.subtitle,"cardimageUrl": msg.imageUrl,
					"buttitle": msg.buttons[0].title,"buttype": msg.buttons[0].type,"butval": msg.buttons[0].value};
					var msgInFragment = new sap.ui.model.json.JSONModel(chatData);
					var chatTextItem = sap.ui.xmlfragment("com.hcl.hclBOT.fragments.Card", this);
					chatTextItem.setModel(msgInFragment);
					rspHboxox.addStyleClass("BOTContent");
					rspHboxox.addItem(chatTextItem);
				}
				else if(caiType==='list')
				{
					/*var chatData = {"cardtitle": msg.title,"cardsubtitle": msg.subtitle,"cardimageUrl": msg.imageUrl,
					"buttitle": msg.buttons[0].title,"buttype": msg.buttons[0].type,"butval": msg.buttons[0].value};*/
					var msgInFragment = new sap.ui.model.json.JSONModel(msg);
					var chatTextItem = sap.ui.xmlfragment("com.hcl.hclBOT.fragments.List", this);
					chatTextItem.setModel(msgInFragment);
					rspHboxox.addStyleClass("BOTContent");
					rspHboxox.addItem(chatTextItem);
				}
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
			var playAudio = sap.ui.getCore().getModel("chatBotModel").getData().items.audio;
			if(playAudio)
			{
				new Audio(sound).play();
			}
			
			if(msgType == "UserReq") {this.checkChat(msg);}
			
			/*var lastItem = oList.getItems()[oList.getItems().length-1]; 
			var oScrollContainer = sap.ui.getCore().byId("scrollBOT");
			oScrollContainer.scrollToElement(lastItem);
			oList.setSelectedItem(lastItem,true);*/
		},
		
		checkChat: function(msg) {
			var that = this;
			that.answer(msg);
			/*setTimeout(function(){
		    	that.answer(msg);
			}, 1000);*/
		},
		
		answer: function(msg) {
			
			//var lastMeMessage = sap.ui.getCore().byId("chat").getValue();
			var lastMeMessage = msg;
			console.log("Last Message from Me: " + lastMeMessage);
			
			var regTopic = new RegExp(lastMeMessage, "gmi");
			var caiRet = null;
			
			// <brain>
			// THIS IS A BRAIN OF BOT
		/*	var topicJSON = [{ask:"hi", ans:["Hello :) Nice to meet you"]},
			                 {ask:"hello", ans:["Hello there! How are you doing today?"]}
			                ];*/
			// </brain>
			
			/*for(var i = 0; i < topicJSON.length; i++)
			{
			    if( regTopic.test( topicJSON[i].ask ) ) {
			      console.log(topicJSON[i].ask + " is the same like " + lastMeMessage);
			      topicSel = i;
			      break;
			    }
			    else{
			      console.log(topicJSON[i].ask + " is NOT the same like " + lastMeMessage);
			    }
		    }
			
			console.log("Founded matching topic ask: ");
			console.log(topicSel);
			
			//Find answer in selected JSON
			if(topicSel != null)
			{
		    	var selectedAnswers = topicJSON[ topicSel ].ans;
		    	//var finAnswer = selectedAnswers[ this.getRandomInt(0, selectedAnswers.length-1) ];
		    	var finAnswer = selectedAnswers[0];
		    
		    	this.createMsgObj(finAnswer ,"BotReq");
			}
			else
			{
		    	this.createMsgObj("I don't know what you want!!" ,"BotReq");
			}*/
			
			/*var caiRet = [{
					      "type": "text",
					      "delay": 2,
					      "content": "ngngn",
					    }
			                ];*/
			/*var caiRet = [
							{
							    "type": "quickReplies",
							    "content": {
							      "title": "TITLE",
							      "buttons": [
							        {
							          "title": "Accept",
							          "value": "1"
							        },
							        {
							          "title": "Reject",
							          "value": "0"
							        }
							      ]
							    }
							  }
			                ];*/
			/*var caiRet = [
							{"type": "card",
						    "content": {
						      "title": "CARD_TITLE",
						      "subtitle": "CARD_SUBTITLE",
						      "imageUrl": "sap-icon://bus-public-transport",
						      "buttons": [
						        {
						          "title": "Book",
						          "type": "Emphasized",
						          "value": "1"
						        }
						      ]
						    }}
			                ];*/
            var caiRet = [
			{"type": "list",
		    "content": {
		      "elements": [
		        {
		          "title": "ELEM_1_TITLE",
		          "imageUrl": "sap-icon://bus-public-transport",
		          "subtitle": "ELEM_1_SUBTITLE",
		          "buttons": [
		            {
		              "title": "BUTTON_1_TITLE",
		              "type": "BUTTON_TYPE",
		              "value": "BUTTON_1_VALUE"
		            }
		          ]
		        },
		        {
		          "title": "ELEM_2_TITLE",
		          "imageUrl": "sap-icon://bus-public-transport",
		          "subtitle": "ELEM_2_SUBTITLE",
		          "buttons": [
		            {
		              "title": "BUTTON_2_TITLE",
		              "type": "BUTTON_TYPE",
		              "value": "BUTTON_2_VALUE"
		            }
		          ]
		        }
		      ],
		      "buttons": [
		        {
		          "title": "BUTTON_1_TITLE",
		          "type": "BUTTON_TYPE",
		          "value": "BUTTON_1_VALUE"
		        }
		      ]
		    }}
            ];
		
			var caiRetType=caiRet[0].type;
			var finAnswer = caiRet[0].content;
		    this.createMsgObj(finAnswer ,"BotReq",caiRetType);
			
			sap.ui.getCore().byId("chat").setValue("");
			sap.ui.getCore().byId("chat").setPlaceholder("Your message...");
			
			this.scrollingElement = document.querySelector(".chatWindowContainer");
			
			if(this.scrollingElement)
			{
				this.scrollHeight = this.scrollingElement.scrollHeight;
				$(this.scrollingElement).animate({
				   scrollTop: this.scrollHeight
				}, 500);
			}
		},
		
		getRandomInt: function(min, max) {
		    min = Math.ceil(min);
		    max = Math.floor(max);
		    return Math.floor(Math.random() * (max - min + 1)) + min;
		},
		
		parseOptText: function (oEvent) {
			
			var messageINP = oEvent.getSource().getText();
			messageINP = messageINP.replace(/^\s+|\s+$/g,"");
			if(messageINP == "") {return;}
			
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
		handleAudioSetting: function() {
			var hasAudio = sap.ui.getCore().byId("hasAudio").getState();
			sap.ui.getCore().getModel("chatBotModel").setProperty("/items/audio",hasAudio);
			//this._playAudio = false;
		},
		
		handleColorSelect: function (oEvent) {
			/*sap.m.MessageToast.show("Color Selected: value - " + oEvent.getParameter("value") +
				", \n defaultAction - " + oEvent.getParameter("defaultAction"));*/
			var color=  oEvent.getParameter("value");
			var style = document.createElement("style");
			style.type = "text/css";
			style.innerHTML = ".sapMText { color: "+color+" !important; }";
			document.getElementsByTagName('head')[0].appendChild(style);
			sap.ui.getCore().byId("list1").addStyleClass("sapMText");
			
		},
		
		handleFontSelect: function (oEvent) {
			
			//sap.m.MessageToast.show("Font Selected: value - " + oEvent.oSource.mProperties.alt);
			var font = oEvent.oSource.mProperties.alt;
			var fontSize = "";
			
			if(font == "small")
			{
				fontSize = "12px";
			}
			else if(font == "medium")
			{
				fontSize = "14px";
			}
			else if(font == "large")
			{
				fontSize = "16px";
			}
			var style = document.createElement("style");
			style.type = "text/css";
			style.innerHTML = ".sapMText { font-size: "+fontSize+" !important; }";
			document.getElementsByTagName('head')[0].appendChild(style);
			sap.ui.getCore().byId("list1").addStyleClass("sapMText");
		},
		
		onParentClicked: function(oEvent) {
			var oSelected = oEvent.mParameters.selected;
			var style = document.createElement("style");
			style.type = "text/css";
			if(oSelected == true)
			{
				style.innerHTML = ".clsHLayout .sapMColorPalette .sapMColorPaletteSquare { opacity: 0.5 !important; }";
				//style.innerHTML = ".clsHLayout .sapMColorPalette .sapMColorPaletteSquare:hover { margin: 0.3125rem; width: 1.75rem; height: 1.75rem; }";
				//style.innerHTML = ".clsHLayout .sapMColorPalette .sapMColorPaletteSquare:hover>div { border: 0px; }";				
				style.innerHTML += ".clsFontTypes .sapMImg { opacity: 0.5 !important;cursor: auto; }";
				document.getElementsByTagName('head')[0].appendChild(style);
				sap.ui.getCore().byId("hasAudio").setEnabled(false);
				sap.ui.getCore().byId("hasAudio").detachChange(this.handleAudioSetting);
				sap.ui.getCore().byId("smallimg").detachPress(this.handleFontSelect);
				sap.ui.getCore().byId("normalimg").detachPress(this.handleFontSelect);
				sap.ui.getCore().byId("largeimg").detachPress(this.handleFontSelect);
				sap.ui.getCore().byId("colorfunc").detachColorSelect(this.handleColorSelect);
				
				//Revert Changes (Default mode)
				
				sap.ui.getCore().getModel("chatBotModel").setProperty("/items/audio",true);
				
				var style = document.createElement("style");
				style.type = "text/css";
				style.innerHTML = ".sapMText { font-size: 0.875rem !important; }";
				style.innerHTML += ".sapMText { color: #000 !important; }";
				document.getElementsByTagName('head')[0].appendChild(style);
				sap.ui.getCore().byId("list1").addStyleClass("sapMText");
			}
			else
			{
				
				style.innerHTML = ".clsHLayout .sapMColorPalette .sapMColorPaletteSquare { opacity: 1 !important;cursor: pointer; }";
				style.innerHTML += ".clsFontTypes .sapMImg { opacity: 1 !important;cursor: pointer; }";
				document.getElementsByTagName('head')[0].appendChild(style);
				sap.ui.getCore().byId("hasAudio").setEnabled(true);
				sap.ui.getCore().byId("hasAudio").attachChange(this.handleAudioSetting);
				sap.ui.getCore().byId("smallimg").attachPress(this.handleFontSelect);
				sap.ui.getCore().byId("normalimg").attachPress(this.handleFontSelect);
				sap.ui.getCore().byId("largeimg").attachPress(this.handleFontSelect);
				sap.ui.getCore().byId("colorfunc").attachColorSelect(this.handleColorSelect);
			}
		}
	});
});