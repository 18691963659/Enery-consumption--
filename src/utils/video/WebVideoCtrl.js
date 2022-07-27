var WebVideoCtrl = (function(e)
{
	//事件响应函数列表
	var eventHandlerMap = new Map();
	//插件对象
	var pluginObject;
	//初始化成功函数
	var initSuccess;
	//总通道数
	var totalChannelNum = 16;
	//当前选中窗口ID
	var currentWinID = 0;
	
	/**
	*@description 获得浏览器类型
	*/
	var browser = function(){
		var e=/(chrome)[ \/]([\w.]+)/,
		t=/(safari)[ \/]([\w.]+)/,
		n=/(opera)(?:.*version)?[ \/]([\w.]+)/,
		r=/(msie) ([\w.]+)/,
		s=/(trident.*rv:)([\w.]+)/,
		o=/(mozilla)(?:.*? rv:([\w.]+))?/,
		i=navigator.userAgent.toLowerCase(),
		a=e.exec(i)||t.exec(i)||n.exec(i)||r.exec(i)||s.exec(i)||i.indexOf("compatible")<0&&o.exec(i)||["unknow","0"];
		a.length>0&&a[1].indexOf("trident")>-1&&(a[1]="msie");
		var c={};
		return c[a[1]]=!0,c.version=a[2],c
	} 
	
	/**
	*@description 判断插件是否安装
	*@return Boolean
	*/
	var checkPluginInstall = function()
	{
		var e = false;
		if(browser().msie)
		{
			try{
				new ActiveXObject("WebActiveEXE.Plugin.1");
				e = true;
			}
			catch(n)
			{
				e = false;
			}
		}
		else 
		{
			for(var r=0,s=navigator.mimeTypes.length;s>r;r++)
			{
				if("application/media-plugin-version-3.1.0.2"==navigator.mimeTypes[r].type.toLowerCase())
				{
					e = true;
					break;
				}
			}
		}
		return e;
	};
	
	/**
	*@description 插入插件
	*@param{String} sContainerID 插件的容器ID
	*@param{Num}    iWidth       插件的宽
	*@param{Num}    iHeight      插件的高
	*@return void
	*/
	function insertPluginObject(sContainerID,iWidth,iHeight){
		//如果是IE浏览器的话
		if (browser().msie) {
				var sSize = " width=" + "\"" + iWidth.toString() + "\"" + " height=" + "\"" + iHeight.toString() + "\"";
				var sHtmlValue = "<object classid=\"CLSID:7F9063B6-E081-49DB-9FEC-D72422F2727F\" codebase=\"webrec.cab\""  + sSize + "id=\"dhVideo\">" + "</object>"
				$("#" + sContainerID).html(sHtmlValue);
		} else {
			var sSize = " width=" + "\"" + iWidth.toString() + "\"" + " height=" + "\"" + iHeight.toString() + "\"";
			var sHtmlValue = "<object type=\"application/media-plugin-version-3.1.0.2\"" + sSize + "id=\"dhVideo\">" + "</object>";
			$("#" + sContainerID).html(sHtmlValue);
		}
		return true;
	}

	/**
	*@description 初始化插件
	*@param{Function} fnCallback 初始化成功后的回调函数
	*/
	var initPlugin = function(fnCallback){
		initSuccess = fnCallback;
		checkReady();
		return true;
	}
	
	function checkReady(){
	     pluginObject = document.getElementById("dhVideo");
         try {
				//获得插件
				pluginObject = document.getElementById("dhVideo");
				//监听事件
				pluginObject.AddEventListener("TransEvent",handleEvent);
				pluginObject.AddEventListener("FileDialogInfo",FileDialogInfoEvent);
				pluginObject.AddEventListener("InsertNetRecordFileInfo",InsertNetRecordFileInfoEvent);
				pluginObject.AddEventListener("NetPlayTimeInform",NetPlayTimeInformEvent);
				pluginObject.AddEventListener("SetNetPlayFileInfo",SetNetPlayFileInfo);
				
				WebVideoCtrl.setInitParams('device', 4, false, 'DVR');//主要是配置machinename值，方便在录像下载名称中使用
				
				//回调
				initSuccess();
            } catch (e){
				setTimeout(checkReady,500);
         }
	}
	
	/**
	*@description 设置初始参数
	*@param{String} sMachineName
	*@param{Num} iLocalChannelsNumber
	*@param{Num} IsMultiPreviewShow
	*@param{String} sMachineType
	*/
	var setInitParams=function(sMachineName, iLocalChannelsNumber, IsMultiPreviewShow, sMachineType){
		var params = {
			"MachineName":sMachineName,
			"LocalChannelsNumber":iLocalChannelsNumber,
			"IsMultiPreviewShow":IsMultiPreviewShow,
			"MachineType":sMachineType};
		pluginObject.SetInitParams(JSON.stringify(params))
	}
	
	/**
	*@description 注册事件监听函数
	*@param{String} sEventName 事件名称，支持以下事件：
	*	DownloadByTimePos		//按时间下载进度
	*	byTimeDownFileName		//按时间下载的录像文件名
	*	DownloadFileTimeLenth	//下载文件的时间长度（单位秒）
	*	ReturnWindInfo			//预览模式窗口信息
	*	NetPlayState			//回放模式播放状态
	*	NetPlayTimeInform		//回放模式回放时间
	*	DeviceError				//设备异常
	*	ChnlInfo				//通道信息
	*	FileDialogInfo 			//文件对话框信息
	*	QueryItemInfo 			//录像总的页数信息
	*	InsertNetRecordFileInfo //queryRecordInfoByTimeEx 查询时的录像信息事件，没有满足条件的录像则不触发该事件，可通过 "QueryItemInfo" 事件判断是否有录像
	*	SetNetPlayFileInfo 		//控件内部查询时的录像信息事件：切换日期、绑定通道时触发
	*@param{Function} fnEventHandler 处理函数 function(jsonEventParam){}
	*/
	function addEventListener (sEventName, fnEventHandler) {
		eventHandlerMap.put(sEventName, fnEventHandler);
	}

	//触发事件
	function FireEvent (sEventName, jsonEventParam) {
		var fnEventHandler = eventHandlerMap.get(sEventName);
		if(fnEventHandler != undefined)
		{
			fnEventHandler(jsonEventParam);
		}
	}
	
	//showFileBrowse 接口的事件回调
	function FileDialogInfoEvent(sFilePath, sExt){
		var param = {};
		param.FilePath = sFilePath;
		param.Ext = sExt;
		FireEvent("FileDialogInfo", param);
	}	

	//回放进度回调
	function NetPlayTimeInformEvent(sTime){ //sTime:00112349|
	    var timeArray=sTime.split('|');

		var param = [];
		
	    for(var i = 0; i < timeArray.length; i++) {
			if(timeArray[i] == '') {
				continue;
			}

			var tmpTime = timeArray[i];

			var winID = tmpTime.substr(0,2) - 0;
			var time=tmpTime.substr(2,2)+":"+tmpTime.substr(4,2)+":"+tmpTime.substr(6,2);

			var t = {};
			t.WinID = winID;
			t.PlayTime = time;

			param.push(t);
		}
		
		FireEvent("NetPlayTimeInform", param);
	}

	//queryRecordInfoByTimeEx 接口的事件回调
	//配合 "QueryItemInfo" 事件使用：
	//没有满足条件的录像则不触发该事件，可通过 "QueryItemInfo" 事件判断是否有录像
	function InsertNetRecordFileInfoEvent(iChannel, bEnd, sInfo){
	    if(sInfo != ''){
	    	//strValue "2019032802000320190328040004-00-3656060-0-00-07-00-68657-00-00:"
	    	// "开始时间结束时间-录像类型-大小-记录序号-码流类型-通道号-磁盘号-起始簇号-是否是重要录像-文件定位索引"
			var recInfo = [];
			recInfo = sInfo.split(':');

			var param = {};
			param.Channel = iChannel;
			param.IsEnd = bEnd;
			param.RecordFile = [];

			for(var i = 0; i < recInfo.length; i++) {
				if(recInfo[i] == '') {
					continue;
				}
				var recArry = recInfo[i].split('-');
				var time = getFormatTimeStr(recArry[0]);

				var tmpInfo = {};
				tmpInfo.StartTime = time[0];
				tmpInfo.EndTime = time[1];
				tmpInfo.RecordFileType = recArry[1] - 0;
				tmpInfo.Length = recArry[2] - 0;
				tmpInfo.Index = recArry[3] - 0;
				tmpInfo.StreamType = recArry[4] - 0;
				tmpInfo.Channel = recArry[5] - 0;
				tmpInfo.DriveNo = recArry[6] - 0;
				tmpInfo.StartCluster = recArry[7] - 0;
				tmpInfo.ImportantRecID = recArry[8] - 0;
				tmpInfo.Hint = recArry[9] - 0;

				param.RecordFile.push(tmpInfo);
			}

			FireEvent("InsertNetRecordFileInfo", param);
		}
	}

	//控件内部查询录像回调：切换日期、绑定通道
	function SetNetPlayFileInfo(iChannel, sInfo){
		if(sInfo != ''){
			//sInfo "2019032803583520190328050711-00-4179019-0-68717-0-0:"
			// "开始时间结束时间-录像类型-大小-磁盘号-起始簇号-是否是重要录像-文件定位索引"
			var recInfo = [];
			recInfo = sInfo.split(':');

			var param = {};
			param.Channel = iChannel;
			param.RecordFile = [];

			for(var i = 0; i < recInfo.length; i++) {
				if(recInfo[i] == '') {
					continue;
				}
				var recArry = recInfo[i].split('-');
				var time = getFormatTimeStr(recArry[0]);

				var tmpInfo = {};
				tmpInfo.Channel = iChannel;
				tmpInfo.StartTime = time[0];
				tmpInfo.EndTime = time[1];
				tmpInfo.RecordFileType = recArry[1] - 0;
				tmpInfo.Length = recArry[2] - 0;
				tmpInfo.DriveNo = recArry[3] - 0;
				tmpInfo.StartCluster = recArry[4] - 0;
				tmpInfo.ImportantRecID = recArry[5] - 0;
				tmpInfo.Hint = recArry[6] - 0;

				param.RecordFile.push(tmpInfo);
			}

			FireEvent("SetNetPlayFileInfo", param);
		}
	}
	
	//时间格式转换：2019032803583520190328050711 => ["2019-03-28 03:58:35", "2019-03-28 05:07:11"]
	function getFormatTimeStr(time){
		var st = time.slice(0, 14);
		var et = time.slice(14);
		var convertTime = function(str) {
			return str.slice(0, 4)+'-'+str.slice(4, 6)+'-'+str.slice(6, 8)+' '+str.slice(8, 10)+':'+str.slice(10, 12)+':'+str.slice(12, 14);
		}
		return [convertTime(st), convertTime(et)];
	}

	//事件处理函数
	function handleEvent(message){
		var messageObject = $.parseJSON(message);
		var eventName = "";
		var eventParam = {};

		if(("EventName" in  messageObject))
		{
			eventName = messageObject["EventName"];
			eventParam = messageObject["EventParam"];
			
			//根据不同的事件类型来处理
			if("ReturnWindInfo" == eventName){
				var winID = eventParam["winID"];
				currentWinID = winID;
			}else if("NetPlayState" == eventName){
				var winID = eventParam["winID"];
				currentWinID = winID;
			}else if("PTZPosition" == eventName){
				var CCordinate = function(x,y){
					this.x = x;
					this.y = y;
				};
				var ConvertCoordinate = function (tCor, fCor) { //将左边转换为传递给云台的参数坐标，tCor: 结束点，fCor：起始点
					return new CCordinate(parseInt((tCor.x - fCor.x) * 8192 * 2 / width), parseInt((tCor.y - fCor.y) * 8192 * 2 / width));
				};
				var parms = messageObject["EventParam"];
				var channel = parms.channel;
				var width = parms.winWidth - 0 //视频窗口宽度
				var height = parms.winHight - 0; //视频窗口高度
				var reverse = parms.isReverse ? 1 : -1; //放大or缩小
				var fromCor = new CCordinate(parms.selRegion.left - 0, parms.selRegion.top - 0); //拖框的起始点
				var toCor = new CCordinate(parms.selRegion.right - 0, parms.selRegion.bottom - 0); //拖框的结束点
				var videoCenterCor = new CCordinate(width / 2, height / 2); //原来的视频中心点
				var winCenterCor = new CCordinate(Math.round(Math.abs(((toCor.x + fromCor.x) / 2))), Math.round(Math.abs(((toCor.y + fromCor.y) / 2)))); //拖动窗口的中心点
				var argCordinate = ConvertCoordinate(winCenterCor, videoCenterCor); ////换算拖动框的中心点与视频中心点的坐标差
				var multiple = reverse * Math.round(Math.abs(width * height / ((toCor.x - fromCor.x) * (toCor.y - fromCor.y))));//缩放倍数
				
				//lCommand: 0x33快速三维定位
				pluginObject.ControlPtzEx(channel, 51, argCordinate.x, argCordinate.y, multiple, 0);
			}
		}else if(("ChnlInfo" in  messageObject)){
			eventName = "ChnlInfo";
			eventParam = messageObject[eventName];

			totalChannelNum = messageObject["ChnlInfo"]["ChanNum"];
		}

		FireEvent(eventName, eventParam);
	}
	
	/**
	*@description 打开浏览文件夹对话框
	*/
	var showFileBrowse = function(){
		var path = pluginObject.ShowFileBrowse();
		if (path != "") {
			//Chrome/Firefox: ShowFileBrowse函数直接返回选择的路径
			FileDialogInfoEvent(path, "");
		} else {
			//IE: 函数返回空字符串，通过addEventListener()注册的事件监听函数FileDialogInfo(strFilePath, szExt)将信息传给调用者
		};
	}
	
	/**
	*@description 设置路径
	*@param{Num} iType 路径类型：1：抓图；2：录像
	*@param{String} path 存储路径
	*/
	var setDirectory = function(iType,path){
		pluginObject.SetConfigPath(iType,path);
	}
	/**
	*@description 获得用户路径
	*@param{Num} iType 路径类型：1：抓图；2：录像
	*/
	var getDirectory = function(iType){
		return pluginObject.GetConfigPath(iType);
	}

	/**
	*@description 设置窗口的显示数目
	*@param{Num}  iNum 要显示的数目
	*@return Boolean
	*/
	var setSplitNum = function(iNum){
	   setCustomWndPos(false);
	   if (browser().msie){
			pluginObject.put_lVideoWindNum(iNum);
	   }else{
			pluginObject.SetMonitorShowWinNumber(iNum);
	   }
	}
	/**
	*@description 设置自定义窗口位置
	*@param{Num}  bEnable 是否使能自定义窗口
	*@return Boolean
	*/
	var setCustomWndPos = function(bEnable){
		//"Pos"参数说明: [0.005,0.005,0.995,0.5]
		//[自定义窗口左上角 x 坐标，自定义窗口左上角 y 坐标，自定义窗口右下角 x 坐标，自定义窗口右下角 y 坐标]
		//坐标值均为该点在插件的总宽(x)或总高(y)中所占的比例，取值范围为[0,1]
		var str = '{\
				    "Protocol": "SetCustomWndPos",\
				    "Params": {\
				        "Enable": '+bEnable+',\
				        "detail": {\
				            "totalWndNumer": 2,\
				            "CustomWndPos": [\
				                {\
				                    "Index": 0,\
				                    "Pos": [0.005,0.005,0.995,0.5]\
				                },\
				                {\
				                    "Index": 1,\
				                    "Pos": [0.005,0.51,0.995,0.995]\
				                }\
				            ]\
				        }\
				    }\
				}';
		pluginObject.ProtocolPluginWithWebCall(str);
		return true;
	}
	
	/**
	*@description 切换到全屏
	*@param{Boolean} 
	*/
	var setFullscreen = function(){
		pluginObject.OnFullScreenClk();
		return true;
	}

	/**
	*@description 获取所有通道信息
	*@return Json
	*/
	var getAllChannelInfo = function(){
		var str = '{"Protocol": "GetAllChannelInfo"}';
		//"{ \"Result\" : [ { \"Channel\" : 0, \"ChannelName\" : \"IPC人脸\", \"IP\" : \"171.5.23.143\" }, { \"Channel\" : 1, \"ChannelName\" : \"IPC558\", \"IP\" : \"10.172.18.213\" } ] }\n"
		var ret = pluginObject.ProtocolPluginWithWebCall(str);
		ret = $.parseJSON(ret);
		return ret.Result;
	}
	
	/**
	*@description 获取总通道数
	*@return Num 总通道数
	*/
	var getTotalChannelNum = function(){
		return totalChannelNum;
	}

	/**
	*@description 获得选中的窗口ID
	*/
	var getSelectedWinID = function(){
		return currentWinID;
	}
	
	/**登录设备
	*@description 初始化插件
	*@param{String} sIp         设备IP
	*@param{Num} iPort          服务端口
	*@param{String} sUserName   用户名
	*@param{String} sPassword   密码
	*@param{Num} iProtocol      通信协议  
	*@return Num 登录结果
	*/
	var login = function(sIp,iPort,sUserName,sPassword,iProtocol){
		var ret = pluginObject.LoginDeviceEx(sIp,iPort,sUserName,sPassword,iProtocol);
		return ret;
	}
	
	/**
	*@description 登出设备
	*@return Boolean
	*/
	var logout = function(){
		return pluginObject.LogoutDevice();
	}
	
	/**
	*@description 设置当前模式，开启预览或回放前，需设置到对应模式
	*@param{Num}  iMode 模式类型：1：预览；4：回放
	*/
	var setModuleMode = function(iMode){		
		pluginObject.SetModuleMode(iMode);
	}

	/**
	*@description 使能预览双击全屏功能
	*@param{Boolean} bEnable 是否使能
	*/
	var enablePreviewDBClickFullSreen = function(bEnable){
		var protocol = {
			"Protocol": "EnablePreviewDBClickFullSreen",
			"Params": {
				"Enable": bEnable
			}
		};

		pluginObject.ProtocolPluginWithWebCall(JSON.stringify(protocol));
	}

	/**
	*@description 设置预览实时性等级
	*@param{Num}  iLevel 实时性等级，0-6
	*@return Boolean
	*/
	var setDelayTime = function(iLevel){
			pluginObject.SetAdjustFluency(iLevel);
	}
	
	/**
	*@description 在选中的窗口上播放视频
	*@param{Num} iChannel 通道号
	*@param{Num} iStreamType 码流类型，1：主码流；2：辅码流
	*/
	var connectRealVideo = function(iChannel,iStreamType){
          pluginObject.SetModuleMode(1);
          pluginObject.ConnectRealVideo(iChannel,iStreamType);		  
	}
	/**
	*@description 在指定的窗口上播放视频
	*@param{Num} iChannel 通道号
	*@param{Num} iStreamType 码流类型，1：主码流；2：辅码流
	*@param{Num} iWinID 窗口号
	*/
	var connectRealVideoEx = function(iChannel,iStreamType,iWinID){
          pluginObject.SetModuleMode(1);
          pluginObject.ConnectRealVideoEx(iChannel,iStreamType,iWinID);
	}
	
	/**
	*@description 关闭当前选中通道的视频
	*@param{Num} iChannel 通道号
	*/
	var closePlayer = function(iChannel){
			pluginObject.DisConnectRealVideo(iChannel);
			return true;
	}
	
	/**
	*@description 关闭指定的窗口上视频，预览、回放均可使用
	*@param{Num} iWinID 窗口号
	*/
	var closePlayerEx = function(iWinID){
		enableVideoFunc(iWinID, "CloseVideo", true);
	}

	/**
	*@description 回放：绑定通道
	*@param{Num}  iWinNumber 窗口数
	*@param{Num}  iWinSel 设置当前选中窗口号
	*@param{JSON}  通道信息，格式[0,1,2,3]
	*@return
	*/
	var setWinBindedChannelEx = function(iWinNumber,iWinSel,jsonChannels){
		var chs = {
			"Channels":jsonChannels
		}
		pluginObject.SetWinBindedChannelEx(iWinNumber,iWinSel,JSON.stringify(chs),"Channels");
	}
	/**
	*@description 回放：切换日期
	*@param{Num}  iYear 年
	*@param{Num}  iMonth 月
	*@param{Num}  iDay 日
	*@return
	*/
	var switchDay = function(iYear, iMonth, iDay){
		pluginObject.SwitchDay(iYear, iMonth, iDay);
	}

	/**
	*@description 按时间回放（窗口已绑定过通道号，setWinBindedChannelEx接口）
	*@param{Num}  iWinID 窗口号
	*@param{String}  sStartTime 开始时间
	*@return
	*/
	var playBackByTime = function(iWinID, sStartTime){
		pluginObject.PlayBackByTime(iWinID,sStartTime);
	}
	/**
	*@description 按时间回放
	*@param{Num}  iWinID 窗口号
	*@param{Num}  iChannel 通道号
	*@param{Num}  iStreamType 码流类型，1：主码流；2：辅码流
	*@param{String}  sStartTime 开始时间
	*@param{String}  sEndTime 结束时间
	*@return
	*/
	var playBackByTimeEx = function(iWinID, iChannel, iStreamType, sStartTime, sEndTime){
		var channel = iChannel;
		if(iStreamType == 2)
		{
			//辅码流
			channel = channel + getTotalChannelNum();
		}
		var protocol = {
			"Protocol": "LocateTimeAbilityProtocol",
			"Params": {
				"Opration": "PLAY",
				"Channel": iChannel,
				"DateFormat": "YYYY-MM-DD hh:mm:ss",
				"PlayerID": iWinID < 0 ? currentWinID : iWinID,
				"Type": "dav",
				"UseOffset": true,//false时，默认前后偏移10s
				"Beforeoffset": 0,
				"Endoffset": 0,
				"RecordInfo": [
					{
						"Channel": iChannel,
						"StartTime": sStartTime,
						"EndTime": sEndTime
					}
				]
			}
		};

		pluginObject.ProtocolPluginWithWebCall(JSON.stringify(protocol));
	}

	/**
	*@description 设置回放速度
	*@param{Num}  iSpeed 回放速度，0-8
	*@return Boolean
	*/
	var setPlaySpeed=function(iSpeed){
	     pluginObject.SpeedPlayBack(iSpeed);
	}

	/**
	*@description 暂停回放
	*/
	var pausePlayBack=function(){
		pluginObject.PausePlayBack();
	}
	/**
	*@description 恢复回放
	*/
	var resumePlayback=function(){
	    var protocol = {"Protocol":"ResumePlayback","Params":{}};
		pluginObject.ProtocolPluginWithWebCall(JSON.stringify(protocol));
	}
	/**
	*@description 停止回放
	*/
	var stopPlayBack=function(){
	    pluginObject.StopPlayBack();
	}
	
	/**
	*@description 查询录像信息
	*@param{Num}  iChannel 通道号
	*@param{Num}  iStreamType 码流类型，1：主码流；2：辅码流
	*@param{Num}  iRecType 录像类型
	*@param{String}  sStartTime 开始时间
	*@param{String}  sEndTime 结束时间
	*@param{Num}  iMaxNumber 查询总数
	*@return Boolean
	*@verbatim
	*通过addEventListener()注册的事件监听函数"QueryItemInfo"将总的页数信息传给调用者
	*通过addEventListener()注册的事件监听函数"InsertNetRecordFileInfo"将录像文件信息传给调用者，
	*	没有满足条件的录像则不触发该监听函数(可通过"QueryItemInfo"判断是否有录像)
	*@endverbatim
	*/
	var queryRecordInfoByTimeEx = function(iChannel, iStreamType, iRecType, sStartTime, sEndTime, iMaxNumber){
		var query = {
			"channel": iChannel,
			"streamType": iStreamType,
			"recType": iRecType,
			"startTime": sStartTime,
			"endTime": sEndTime,
			"maxNumber": iMaxNumber
		};
		return pluginObject.QueryRecordInfoByTimeEx(JSON.stringify(query));
	};
	
	/**
	*@description 按时间下载录像
	*@param{Num}  iChannel 通道号
	*@param{Num}  iStreamType 码流类型，1：主码流；2：辅码流
	*@param{String}  sStartTime 开始时间
	*@param{String}  sEndTime 结束时间
	*@param{String}  sSavePathName 保存文件夹
	*@param{String}  sFormat 下载格式
	*@return Num 操作结果
	*/
	var downloadFile=function(iChannel,iStreamType,sStartTime,sEndTime,sSavePathName,sFormat){
		return pluginObject.DownloadRecordByTimeEx(iChannel,iStreamType,sStartTime,sEndTime,sSavePathName,sFormat);		
	}
	/**
	*@description 停止下载
	*/
	var stopDownloadFile=function(){
	    pluginObject.StopDownloadByTime();
	}
	
	/**
	*@description 获取已下载的录像文件长度
	*@param{String} sFileName 录像文件名（需在设置的录像文件夹下）
	*@verbatim
	*通过addEventListener()注册的事件监听函数"DownloadFileTimeLenth"将信息传给调用者
	*@endverbatim
	*/
	var getFileTimeLength=function(sFileName){
		var protocol = {
			"Protocol": "GetFileTimeLenth",
			"Params": {
				"FileName": sFileName
			}
		};

		pluginObject.ProtocolPluginWithWebCall(JSON.stringify(protocol));
	}

	var enableVideoFunc = function(iWinID, sFuncName, bEnable){
	    var protocol = {"Protocol":"EnableVideoFunc","Params":[{"index":iWinID,"funcName":sFuncName, "enable":bEnable}]};
		pluginObject.ProtocolPluginWithWebCall(JSON.stringify(protocol));
		return true;
	}
	
	/**
	*@description 设置IPC对讲参数
	*@param{Num}  iChannel 通道号
	*@param{Num}  iEncodeType 语音编码类型，0：无头PCM；1：带头PCM；2：G711a；3：AMR；4：G711u；5：G726；
	*										6：G723_53；7：G723_63；8：AAC；9：OGG；10：G729；
	*										11：MPEG2；12：MPEG2-Layer2；13：G.722.1；21：ADPCM；22：MP3；
	*@param{Num}  iAudioBit 位数，如8或16
	*@param{Num}  iSampleRate 采样率，如8000或16000
	*@param{Num}  iPacketPeriod 打包周期，单位ms，如25
	*/
	var setIpcTalkAduioFromat=function(iChannel, iEncodeType, iAudioBit, iSampleRate, iPacketPeriod){
		var protocol = {
			"Protocol": "IPCTalkAduioFromat",
			"Params": {
				"channel": iChannel,
				"fromat":{
					"encodeType": iEncodeType,
					"nAudioBit": iAudioBit,
					"dwSampleRate": iSampleRate,
					"nPacketPeriod": iPacketPeriod
				}
			}
		};
		pluginObject.ProtocolPluginWithWebCall(JSON.stringify(protocol));
		return true;
	}
	
	/**
	*@description IPC语音对讲控制
	*@param{Num} iWinID 窗口号
	*@param{Boolean} bEnable 是否使能
	*/
	var controlIpcTalking=function(iWinID, bEnable){
		enableVideoFunc(iWinID, "TalkToIpc", bEnable);
	}

	/**
	*@description 语音对讲控制
	*@param{Boolean} bEnable 是否使能
	*@return Num 使能结果
	*/
	var controlTalking = function (bEnable) {
		return pluginObject.ControlTalking(bEnable ? 1 : 0);
	}
	
	/**
	*@description 抓图片
	*@param{Num} iWinID 窗口号
	*@param{String} sPicName 存储的图片名
	*/
	var crabOnePicture = function(iWinID, sPicName){
	    var protocol = {"Protocol":"EnableVideoFunc","Params":[{"index":iWinID,"funcName":"Snapshot", "enable":true,"picName":sPicName}]};
		pluginObject.ProtocolPluginWithWebCall(JSON.stringify(protocol));
		return true;
	}
	
	/**
	*@description 手动录像控制
	*@param{Num} iWinID 窗口号
	*@param{Boolean} bEnable 是否使能
	*/
	var controlRecordingVideo = function(iWinID, bEnable){
		enableVideoFunc(iWinID, "Record", bEnable);
		return true;
	}
	
	//设置音量
	var setVolume = function(volume,cb){
	}
	
	/**
	*@description 声音控制
	*@param{Num} iWinID 窗口号
	*@param{Boolean} bEnable 是否使能
	*/
	var controlSound = function(iWinID, bEnable){
		enableVideoFunc(iWinID, "Audio", bEnable);
		return true;
	}
	
	/**
	*@description 电子放大控制
	*@param{Num} iWinID 窗口号
	*@param{Boolean} bEnable 是否使能	
	*/
	var controlEZoom = function(iWinID, bEnable){
		enableVideoFunc(iWinID, "ZoomIn", bEnable);
		return true;
	}
	
	/**
	*@description 控制PTZ快速三维定位是否开启（开/关之间循环切换）
	*@param{Num} iWinID 窗口号
	*/
	var Ptz_3DLocate = function(iWinID){
		var unusedParam = 0;
		pluginObject.ControlPtz(unusedParam,unusedParam,unusedParam,unusedParam, iWinID);
	}
	
	/**
	*@description 左上移动
	*@param{Num} iVerticalSpeed    垂直速度
	*@param{Num} iLevelSpeed       水平速度
	*@param{Boolean} flag  开启停止标志
	*/
	var Ptz_moveUpperLeft = function(iChannel,iVerticalSpeed,iLevelSpeed,flag){
		 pluginObject.ControlPtzEx(iChannel, 32, iVerticalSpeed, iLevelSpeed, 0, flag);
	}
	
	/**
	*@description 右上移动
	*@param{Num} iVerticalSpeed    垂直速度
	*@param{Num} iLevelSpeed       水平速度
	*@param{Boolean} flag  开启停止标志
	*/
	var Ptz_moveUpperRight = function(iChannel,iVerticalSpeed,iLevelSpeed,flag){
		pluginObject.ControlPtzEx(iChannel, 33, iVerticalSpeed, iLevelSpeed, 0, flag);
	}
	
	/**
	*@description 左下移动
	*@param{Num} iVerticalSpeed    垂直速度
	*@param{Num} iLevelSpeed       水平速度
	*@param{Boolean} flag  开启停止标志
	*/
	var Ptz_moveLowerLeft = function(iChannel,iVerticalSpeed,iLevelSpeed,flag){
		pluginObject.ControlPtzEx(iChannel, 34, iVerticalSpeed, iLevelSpeed, 0, flag);
	}
	
	/**
	*@description 右下移动
	*@param{Num} iVerticalSpeed    垂直速度
	*@param{Num} iLevelSpeed       水平速度
	*@param{Boolean} flag  开启停止标志
	*/
	var Ptz_moveLowerRight = function(iChannel,iVerticalSpeed,iLevelSpeed,flag){
		pluginObject.ControlPtzEx(iChannel, 35, iVerticalSpeed, iLevelSpeed, 0, flag);
	}
	
	/**
	*@description 上移动
	*@param{Num} iVerticalSpeed   垂直速度
	*@param{Boolean} flag         开启停止标志
	*/
	var Ptz_moveUpwards = function(iChannel,iVerticalSpeed,flag){
		pluginObject.ControlPtzEx(iChannel, 0, 0, iVerticalSpeed, 0, flag);
	}
	
	/**
	*@description 下移动
	*@param{Num} iVerticalSpeed   垂直速度
	*@param{Boolean} flag         开启停止标志
	*/
	var Ptz_moveLower = function(iChannel,iVerticalSpeed,flag){
		pluginObject.ControlPtzEx(iChannel, 1, 0,iVerticalSpeed,  0, flag);
	}
	
	/**
	*@description 左移动
	*@param{Num} iLevelSpeed   水平速度
	*@param{Boolean} flag      开启停止标志
	*/
	var Ptz_moveLeft = function(iChannel,iLevelSpeed,flag){
		pluginObject.ControlPtzEx(iChannel, 2, 0, iLevelSpeed, 0, flag);
	}
	
	/**
	*@description 右移动
	*@param{Num} iLevelSpeed   水平速度
	*@param{Boolean} flag      开启停止标志
	*/
	var Ptz_moveRight = function(iChannel,iLevelSpeed,flag){
		pluginObject.ControlPtzEx(iChannel, 3, 0, iLevelSpeed, 0, flag);
	}

	/**
	*@description 控制变倍
	*@param{Num} iSpeed     倍数
	*@param{Num} flag      增加或减少标志
	*       - 0:增加
	*       - 1:减少
	*@param{Boolean} flag1      开启停止标志
	*/
	var Ptz_controlZoom = function(iChannel,iSpeed,flag,flag1){
		if(flag==0){
		    pluginObject.ControlPtzEx(iChannel,4,0,iSpeed,0,flag1); 
		}
		else{
			pluginObject.ControlPtzEx(iChannel,5,0,iSpeed,0,flag1);
		}
	}
	
	/**
	*@description 控制变焦
	*@param{Num} iSpeed     倍数
	*@param{Num} flag      增加或减少标志
	*       - 0:增加
	*       - 1:减少
	*@param{Boolean} flag1      开启停止标志
	*/
	var Ptz_controlFocus = function(iChannel,iSpeed,flag,flag1){
		if(flag==0){
			pluginObject.ControlPtzEx(iChannel,7,0,iSpeed,0,flag1);
		}
		else{
			pluginObject.ControlPtzEx(iChannel,6,0,iSpeed,0,flag1);
		}
	}
	
	/**
	*@description 控制光圈
	*@param{Num} iSpeed     倍数
	*@param{Num} flag      增加或减少标志
	*       - 0:增加
	*       - 1:减少
	*@param{Boolean} flag1      开启停止标志
	*/
	var Ptz_controlAperture = function(iChannel,iSpeed,flag,flag1){
		if(flag==0){
			pluginObject.ControlPtzEx(iChannel,8,0,iSpeed,0,flag1);
		}
		else{
			pluginObject.ControlPtzEx(iChannel,9,0,iSpeed,0,flag1);
		}
	}
	
	/**
	*@description 设置自定义标题
	*@param{Num}  iChannel 通道号
	*@param{JSON}  jsonOSDInfo 标题信息，格式{"Text":["osd1","osd2"], "Pos":[10,10], "BackColor":[255,255,255,1], "FrontColor":[255,255,255,1], "BlendType":1}
	*/
	var setCustomTitle = function(iChannel, jsonOSDInfo){
		var protocol = {"Protocol":"SetCustomTitle","Params":{"Channel":iChannel,"CustomTitle":jsonOSDInfo}};
		//{"Protocol":"SetCustomTitle","Params":{"Channel": 0, "CustomTitle":{"Text":["osd1","osd2"], "Pos":[10,10], "BackColor":[255,255,255,1], "FrontColor":[255,255,255,1], "BlendType":1}}}
		pluginObject.ProtocolPluginWithWebCall(JSON.stringify(protocol));
	}
	/**
	*@description 获取录像模式
	*@param{Num}  iChannel 通道号
	*@return JSON 录像模式信息
	*/
	var getRecordMode = function(iChannel){
		//{"Protocol":"GetRecordMode","Params":{"Channel": 0}}
		//return:
		//	Channel为非-1时：'{"Result":{"Channel":0, "RecordMode":{"Mode":0,"ModeExtra1":1,"ModeExtra2":2}}}'
		//	Channel为  -1时：'{"Result":{"Channel":-1, "RecordMode":[{"Mode":0,"ModeExtra1":1,"ModeExtra2":2},...]}}'
		var protocol = {"Protocol":"GetRecordMode","Params":{"Channel":iChannel}};
		var ret = pluginObject.ProtocolPluginWithWebCall(JSON.stringify(protocol));
		ret = $.parseJSON(ret);
		return ret.Result;
	}
	/**
	*@description 设置录像模式
	*@param{Num}  iChannel 通道号
	*@param{JSON}  jsonRecordMode 录像模式信息
	*/
	var setRecordMode = function(iChannel, jsonRecordMode){
		//Channel为非-1时：{"Protocol":"SetRecordMode","Params":{"Channel": 0, "RecordMode":{"Mode":0, "ModeExtra1":1, "ModeExtra2":2}}}
		//Channel为  -1时：{"Protocol":"SetRecordMode","Params":{"Channel": -1, "RecordMode":[{"Mode":0, "ModeExtra1":1, "ModeExtra2":2},...]}}
		//return:
		//	'{"Result":true}'
		var protocol = {"Protocol":"SetRecordMode","Params":{"Channel":iChannel,"RecordMode":jsonRecordMode}};
		var ret = pluginObject.ProtocolPluginWithWebCall(JSON.stringify(protocol));
		ret = $.parseJSON(ret);
		return ret.Result;
	}
	/**
	*@description 获取存储空间
	*@param{Num}  iType 磁盘类型
	*@return
	*/
	var getStorageSpace = function(iType){
		var protocol = {"Protocol":"GetStorageSpace","Params":{"VolumeType":iType}};
		var ret = pluginObject.ProtocolPluginWithWebCall(JSON.stringify(protocol));
		return JSON.stringify(ret);
	}
	/**
	*@description 使能存储异常报警
	*@param{Boolean}  bEnable 是否使能
	*@return
	*/
	var storageAlarm = function(bEnable){
		var protocol = {"Protocol":"AddDeviceInfoAlarmMessage","Params":{"Enable":bEnable}};
		var ret = pluginObject.ProtocolPluginWithWebCall(JSON.stringify(protocol));
		return JSON.stringify(ret);
	}
	/**
	*@description 锁定录像
	*@param{Num}  iChannel 通道号
	*@param{String}  sStartTime 开始时间
	*@param{String}  sEndTime 结束时间
	*@param{Boolean}  bEnable 是否锁定
	*@return
	*/
	var markFile = function(iChannel, sStartTime, sEndTime, bEnable){
		var protocol = {"Protocol":"MarkFileByTime","Params":{"Channel":iChannel,"StartTime":sStartTime, "EndTime":sEndTime,"MarkFlag":bEnable}};
		var ret = pluginObject.ProtocolPluginWithWebCall(JSON.stringify(protocol));
		return JSON.stringify(ret);
	}

	/**
	*@description 实时上传智能分析数据
	*@param{Num}  iChannel 通道号
	*@return
	*/
	var startRealLoadPicture = function(iChannel) {
		var protocol = {"Protocol":"StartRealLoadPicture","Params":{"Channel": iChannel}};
		pluginObject.ProtocolPluginWithWebCall(JSON.stringify(protocol));
	}

	/**
	*@description 停止上传智能分析数据
	*@param{Num}  iChannel 通道号
	*@return
	*/
	var stopRealLoadPicture = function(iChannel) {
	    var protocol = {"Protocol":"StopRealLoadPicture","Params":{"Channel": iChannel}};
		pluginObject.ProtocolPluginWithWebCall(JSON.stringify(protocol));
	}

	var setIVSEnable = function(iIVSType, bEnable) {
	    var protocol = {"Protocol":"SetIVSEnable","Params":{"IVSType": iIVSType, "Enable": bEnable}};
		pluginObject.ProtocolPluginWithWebCall(JSON.stringify(protocol));
	}
	
	return {
		browser:browser,
		checkPluginInstall:checkPluginInstall,
		insertPluginObject:insertPluginObject,
		initPlugin:initPlugin,
		setInitParams:setInitParams,
		addEventListener:addEventListener,

		showFileBrowse:showFileBrowse,
		setDirectory:setDirectory,
		getDirectory:getDirectory,

		setSplitNum:setSplitNum,
		setFullscreen:setFullscreen,
		setCustomWndPos:setCustomWndPos,

		getSelectedWinID:getSelectedWinID,
		getAllChannelInfo:getAllChannelInfo,
		getTotalChannelNum:getTotalChannelNum,

		login:login,
		logout:logout,

		setModuleMode:setModuleMode,

		enablePreviewDBClickFullSreen:enablePreviewDBClickFullSreen,
		setDelayTime:setDelayTime,
		connectRealVideo:connectRealVideo,
		connectRealVideoEx:connectRealVideoEx,
		closePlayer:closePlayer,
		closePlayerEx:closePlayerEx,

		switchDay:switchDay,
		setWinBindedChannelEx:setWinBindedChannelEx,
		playBackByTime:playBackByTime,
		playBackByTimeEx:playBackByTimeEx,
		stopPlayBack:stopPlayBack,
		pausePlayBack:pausePlayBack,
		resumePlayback:resumePlayback,
		setPlaySpeed:setPlaySpeed,

		queryRecordInfoByTimeEx:queryRecordInfoByTimeEx,
		downloadFile:downloadFile,
		stopDownloadFile:stopDownloadFile,
		getFileTimeLength:getFileTimeLength,

		setIpcTalkAduioFromat:setIpcTalkAduioFromat,
		controlIpcTalking:controlIpcTalking,
		controlTalking:controlTalking,
		crabOnePicture:crabOnePicture,
		controlRecordingVideo:controlRecordingVideo,
		setVolume:setVolume,
		controlSound:controlSound,
		controlEZoom:controlEZoom,

		Ptz_moveUpperLeft:Ptz_moveUpperLeft,
		Ptz_moveUpperRight:Ptz_moveUpperRight,
		Ptz_moveLowerLeft:Ptz_moveLowerLeft,
		Ptz_moveLowerRight:Ptz_moveLowerRight,
		Ptz_moveLeft:Ptz_moveLeft,
		Ptz_moveRight:Ptz_moveRight,
		Ptz_moveUpwards:Ptz_moveUpwards,
		Ptz_moveLower:Ptz_moveLower,
		Ptz_3DLocate:Ptz_3DLocate,
		Ptz_controlZoom:Ptz_controlZoom,
		Ptz_controlFocus:Ptz_controlFocus,
		Ptz_controlAperture:Ptz_controlAperture,

		setCustomTitle:setCustomTitle,
		getRecordMode:getRecordMode,
		setRecordMode:setRecordMode,
		getStorageSpace:getStorageSpace,
		storageAlarm:storageAlarm,
		markFile:markFile,

		startRealLoadPicture:startRealLoadPicture,
		stopRealLoadPicture:stopRealLoadPicture,

		setIVSEnable:setIVSEnable
	};
	
})(this);

$(function () {
    // 检查插件是否已经安装过
    var iRet = WebVideoCtrl.checkPluginInstall();
    if (0 == iRet) {
        alert("您还未安装过插件，双击开发包目录里下的Package里的webplugin.exe进行安装！");
        return;
    }
});