var OpenFileDlgType = 0;
//当前下载的文件名称
var downloadFileName = "";

//插件加载完毕后，会执行初始化化操作
$(function() {
	$("#left-tabs").tabs();
	$("#tabs").tabs();
	$("#playbacktabs").tabs();

	WebVideoCtrl.insertPluginObject("divPlugin", 500, 300);
	//初始化插件
	WebVideoCtrl.initPlugin(function() {
		//设置视频窗口的显示
		var num = parseInt($("#wndNum").find("option:selected").val());
		//设置窗口分割数
		WebVideoCtrl.setSplitNum(num);
		//初始化路径
		var videoPath = WebVideoCtrl.getDirectory(2);
		$("#LiveRecord").val(videoPath);

		var picpath = WebVideoCtrl.getDirectory(1);
		$("#LiveSnapshot").val(picpath);
		$("#loaddownPos").val("0");
		$("#loaddownSpeed").val("0");
		$("#loaddownEnd").val("YES");
		//设置双击可全屏功能
		WebVideoCtrl.enablePreviewDBClickFullSreen(true);

		WebVideoCtrl.addEventListener("DownloadByTimePos", function(eventParam) {
			var pos = eventParam["pos"];
			var speed = eventParam["speed"];
			var end = eventParam["end"];
			$("#loaddownPos").val(pos);
			$("#loaddownSpeed").val(speed);
			if (end == true) {
				$("#loaddownEnd").val("YES");
				$("#loaddownPos").val("100");
			} else {
				$("#loaddownEnd").val("NO");
			}
		});
		WebVideoCtrl.addEventListener("byTimeDownFileName", function(eventParam) {
			downloadFileName = eventParam["FileName"];
			var tips = "file name:" + $("#LiveRecord").val() + downloadFileName;
			$("#fileName").val(tips);
		});
		WebVideoCtrl.addEventListener("DownloadFileTimeLenth", function(eventParam) {
			$("#loadFileLenth").val(eventParam["Lenth"]);
		});
		WebVideoCtrl.addEventListener("ReturnWindInfo", function(eventParam) {
			var winID = eventParam["winID"];
			$('#winIDs').val(winID);
		});
		WebVideoCtrl.addEventListener("NetPlayState", function(eventParam) {
			var winID = eventParam["winID"];
			$('#winIDs').val(winID);
		});
		WebVideoCtrl.addEventListener("NetPlayTimeInform", function(eventParam) {
			var currentWinID = WebVideoCtrl.getSelectedWinID();
			for (var i = 0; i < eventParam.length; i++) {
				var winID = eventParam[i].WinID;

				if (winID == currentWinID) {
					$('#playtime').val(eventParam[i].PlayTime);
					break;
				}
			}
		});
		WebVideoCtrl.addEventListener("DeviceError", function(eventParam) {
			$('#storage_alarm_result').val(eventParam["event"]);
		});
		WebVideoCtrl.addEventListener("ChnlInfo", function(eventParam) {
			$("#channels").empty();
			$("#playbackChannels").empty();
			$("#downloadChannels").empty();
			$("#downloadChannels").append('<option value="-1" selected>全通道</option>');
			var channelNum = eventParam["ChanNum"];
			for (var i = 0; i < channelNum; i++) {
				var channel = i;
				var adjustedChannelName = "C" + (i + 1);

				//初始预览通道列表
				$("#channels").append("<option value='" + channel + "'>" + adjustedChannelName +
					"</option>");

				//初始回放通道列表
				$("#playbackChannels").append('<tr><td><input type="checkbox" value="' + channel + '" onchange="setWinBindedChannelEx();"></input></td>  <td>' + adjustedChannelName + '</td><td><select onchange="setWinBindedChannelEx();"><option value="0">M</option><option value="1">S</option></select></td> </tr>');

				//初始下载通道列表
				$("#downloadChannels").append("<option value='" + channel + "'>" +
					adjustedChannelName + "</option>");
			}
		});
		WebVideoCtrl.addEventListener("FileDialogInfo", function(eventParam) {
			var strFilePath = eventParam["FilePath"] + "\\";
			var strExt = eventParam["Ext"];

			if (OpenFileDlgType == 2) {
				$("#LiveRecord").val(strFilePath);
				WebVideoCtrl.setDirectory(OpenFileDlgType, strFilePath);
			} else if (OpenFileDlgType == 1) {
				$("#LiveSnapshot").val(strFilePath);
				WebVideoCtrl.setDirectory(OpenFileDlgType, strFilePath);
			}
		});
		WebVideoCtrl.addEventListener("QueryItemInfo", function(eventParam) {
			var end = eventParam["LastItem"];
			var ItemTotal = eventParam["ItemTotal"];
			$('#searchRecord').prop('disabled', !end);
		});
		WebVideoCtrl.addEventListener("InsertNetRecordFileInfo", function(eventParam) {
			addRecInfoToTable_download(eventParam.RecordFile);
		});
		WebVideoCtrl.addEventListener("SetNetPlayFileInfo", function(eventParam) {
			addRecInfoToTable(eventParam.Channel, eventParam.RecordFile);
		});
		WebVideoCtrl.addEventListener("AnalyzerData", function(eventParam) {
			handleAnalyzerData(eventParam);
		});
	});

	for (var i = 0; i < 36; i++) {
		$("#winIDs").append("<option value='" + i + "'>" + (i + 1) + "</option>");
	}

	var nowDate = new Date();

	$("#playbackDatepicker").datepicker({
		changeYear: true,
		changeMonth: true,
		dateFormat: 'yy-mm-dd'
	});
	$("#playbackDatepicker").datepicker('setDate', nowDate);

	$("#downloadStarttime").val($.datepicker.formatDate("yy-mm-dd 00:00:00", nowDate));
	$("#downloadEndtime").val($.datepicker.formatDate("yy-mm-dd 23:59:59", nowDate));
});

function handleAnalyzerData(eventParam) {
	console.log(eventParam);
	var alarmType = eventParam.AlarmType;
	if (alarmType == 0x0000001A) //0x0000001A 人脸检测事件
	{
		/**
		人脸特征：
		0,// 未知	1,// 戴眼镜	2,// 微笑	3,// 愤怒	4,// 悲伤	
		5,// 厌恶	6,// 害怕	7,// 惊讶	8,// 正常	9,// 大笑	
		10,// 没戴眼镜	11,// 高兴	12,// 困惑	13,// 尖叫	14, // 戴太阳眼镜
		
		胡子状态：
		0,// 未知	1,// 未识别	2,// 没胡子	3,// 有胡子
		
		口罩状态：
		0,// 未知	1,// 未识别	2,// 没戴口罩	3,// 戴口罩
		
		嘴巴状态：
		0,// 未知	1,// 未识别	2,// 闭嘴	3,// 张嘴
		
		眼睛状态：
		0,// 未知	1,// 未识别	2,// 闭眼	3,// 睁眼	
		
		种族：
		0,// 未知	1,// 未识别	2,// 黄种人	3,// 黑人	4,// 白人	

		眼镜状态：
		0,// 未知	1,// 太阳眼镜	2,// 普通眼镜	
		
		人员建模状态：
		0,// 未知	1,// 建模失败,可能是图片不符合要求,需要换图片	2,// 有可用的特征值	3,// 正在计算特征值	4,// 已建模，但算法升级导致数据不可用，需要重新建模	
		
		人脸在摄像机画面中的状态：
		0,// 未知    1,// 出现    2,// 在画面中    3,// 离开
		
		民族：
		0,// 未知	1,// 维族(新疆)		2,// 其他	3,// 设备未识别
		
		大类业务方案：
		0,    // 未知业务       1,    // 视频浓缩       2,    //卡口       3,    // 电警       4,    // 单球违停       
		5,    // 主从违停       6,    // 交通事件"Traffic"       7,    // 通用行为分析"Normal"       8,    // 监所行为分析"Prison"       9,    // 金融行为分析"ATM"       
		10,   // 地铁行为分析       11,   // 人脸检测"FaceDetection"       12,   // 人脸识别"FaceRecognition"       13,   // 人数统计"NumberStat"       14,   // 热度图"HeatMap"       
		15,   // 视频诊断"VideoDiagnosis"       16,   // 视频增强       17,   // 烟火检测       18,   // 车辆特征识别"VehicleAnalyse"       19,   // 人员特征识别     
		20,	// 多预置点人脸检测"SDFaceDetect",配置一条规则但可以在不同预置点下生效	21,	// 球机热度图计划"HeatMapPlan" 	22,	// 球机客流量统计计划 "NumberStatPlan"	23,	// 金融人脸检测，包括正常人脸、异常人脸、相邻人脸、头盔人脸等针对ATM场景特殊优化	24,	// 高速交通事件检测"Highway"
		25,	// 城市交通事件检测 "City"	26,	// 民用简易跟踪"LeTrack"	27,	// 打靶相机"SCR"	28,   // 立体视觉(双目)"StereoVision"	29,   // 人体检测"HumanDetect"
		30,	// 人脸分析 "FaceAnalysis"	31,	// X光检测 "XRayDetection"	32,	// 双目相机客流量统计 "StereoNumber"    33,	// 人群分布图    34,	// 目标检测
		35,	// IVSS人脸检测 "FaceAttribute" 	36,	// IVSS人脸识别 "FaceCompare" 	37,	// 立体行为分析 "StereoBehavior"	38,	// 智慧城管 "IntelliCityMgr"	39,	// 防护舱（ATM舱内）"ProtectiveCabin"
		40,	// 飞机行为检测 "AirplaneDetect"	41,	// 人群态势（人群分布图服务）"CrowdPosture"	42,	// 打电话检测 "PhoneCallDetect"	43,	// 烟雾检测 "SmokeDetection"	44,	// 船只检测 "BoatDetection"
		45,	// 吸烟检测 "SmokingDetect"
		**/

		/**eventParam格式：
		{
			"Age": 30,// 年龄,-1表示该字段数据无效
			"Attractive": 61,// 魅力值, -1表示无效, 0未识别，识别时范围1-100,得分高魅力高
			"Beard": 2,// 胡子：0,// 未知	1,// 未识别	2,// 没胡子	3,// 有胡子
			"ChannelID": 1,				//通道号
			"EventAction": 1,// 事件动作,0表示脉冲事件,1表示持续性事件开始,2表示持续性事件结束;
			"EventID": 15010,// 事件ID
			"Eye": 0,// 眼睛状态：0,// 未知	1,// 未识别	2,// 闭眼	3,// 睁眼	
			"FaceDetectStatus": 0,// 人脸在摄像机画面中的状态：0,// 未知    1,// 出现    2,// 在画面中    3,// 离开
			"Faces": [// 多张人脸时使用,此时没有Object
				{
					"ObjectID": 0,// 物体ID,每个ID表示一个唯一的物体
					"ObjectType": "",// 物体类型
					"RelativeID": 0// 这张人脸抠图所属的大图的ID
				}
			],
			"Feature": [// 人脸特征数组：0,// 未知	1,// 戴眼镜	2,// 微笑	3,// 愤怒	4,// 悲伤	5,// 厌恶	6,// 害怕	7,// 惊讶	8,// 正常	9,// 大笑	10,// 没戴眼镜	11,// 高兴	12,// 困惑	13,// 尖叫	14, // 戴太阳眼镜
				1,
				8
			],
			"ImageIndex": 0,// 图片的序号, 同一时间内(精确到秒)可能有多张图片, 从0开始
			"Mask": 2,// 口罩状态：0,// 未知	1,// 未识别	2,// 没戴口罩	3,// 戴口罩
			"Mouth": 0,// 嘴巴状态：0,// 未知	1,// 未识别	2,// 闭嘴	3,// 张嘴
			"Name": "人脸检测",//事件名称
			"Nation": 0,// 民族：0,// 未知	1,// 维族(新疆)		2,// 其他	3,// 设备未识别
			"Object": {// 检测到的物体
				"Action": 1,// 物体动作:1:Appear 2:Move 3:Stay 4:Remove 5:Disappear 6:Split 7:Merge 8:Rename
				"BeginSequence": 0,// 开始帧序号（物体开始出现时的帧序号）
				"Confidence": 0,// 置信度(0~255),值越大表示置信度越高
				"EndSequence": 0,// 结束帧序号（物体消逝时的帧序号）
				"EndTime": "0000-00-00 00:00:00",// 结束时间戳（物体最后出现时）
				"ObjectID": 35129,// 物体ID,每个ID表示一个唯一的物体
				"ObjectSubType": "",// 物体子类别,根据不同的物体类型,可以取以下子类型：
				"ObjectType": "HumanFace",// 物体类型
				"PicEnble": true,// 是否有物体对应图片文件信息
				"PicInfo": {// 检测到的物体对应图片信息
					"Data": "data:image/png;base64,...",
					"FilePath": "",
					"Height": 1080,
					"Width": 1920
				},
				"RelativeID": 35129,// 相关物体ID
				"StartTime": "0000-00-00 00:00:00"// 开始时间戳（物体开始出现时）
			},
			"OccurrenceCount": 0,// 事件触发累计次数
			"PTS": 0,// 时间戳(单位是毫秒)
			"Race": 2,// 种族：0,// 未知	1,// 未识别	2,// 黄种人	3,// 黑人	4,// 白人	
			"Sex": 1,//性别 1:男 2:女 其它:未知
			"SnapDevAddress": "",// 抓拍当前人脸的设备地址,如：滨康路37号
			"UID": "",// 抓拍人员写入数据库的唯一标识符
			"UTC": "2017-10-20 14:03:07"//事件发生时间
		}
		**/
		$('#analyzerData_SnapImage').attr('src', eventParam.Object.PicInfo.Data);
	} else if (alarmType == 0x00000117) //0x00000117 人脸识别事件
	{
		/**eventParam格式：
		{
			"Age": 30,// 年龄,-1表示该字段数据无效
			"ChannelID": 1,				//通道号
			"Candidates": [// 当前人脸匹配到的候选对象信息
				{
					"Address": "",
					"ChannelID": 0,
					"IsHit": 0,
					"PersonInfo": {
						"Age": 0,
						"City": "",
						"Comment": "",
						"Country": "",
						"Day": 1,
						"Emotion": 0,
						"FacePicInfo": [
							{
								"Data": "",
								"FilePath": "",
								"Height": 0,
								"Width": 0
							}
						],
						"FeatureValue": "",
						"Glasses": 0,
						"GroupID": "22",
						"GroupName": "...............",
						"ID": "123456789",
						"IDType": 2,
						"ImportantRank": 0,
						"Month": 1,
						"PersonName": "...",
						"Province": "",
						"Sex": 1,
						"Type": 0,
						"UID": "50",
						"Year": 1980
					},
					"Range": 0,
					"SceneImage": {
						"Data": "data:image/png;base64,...",
						"FilePath": "",
						"Height": 0,
						"Width": 0
					},
					"Similarity": 95,
					"Time": "0000-00-00 00:00:00"
				}
			],
			"CandidatesEx": [// 当前人脸匹配到的候选对象信息扩展
				{
					"Address": "",
					"ChannelID": 0,
					"FilePathEx": "",
					"IsHit": 0,
					"PersonInfo": {
						"Age": 0,
						"AgeRange": [
							0,
							0
						],
						"City": "",
						"Comment": "",
						"Country": "",
						"CustomType": "",
						"Day": 1,
						"Emotion": 0,
						"FacePicInfo": [
							{
								"Data": "data:image/png;base64,...",
								"FilePath": "",
								"Height": 0,
								"Width": 0
							}
						],
						"Glasses": 0,
						"GroupID": "22",
						"GroupName": "...............",
						"HomeAddress": "",
						"ID": "123456789",
						"IDType": 2,
						"ImportantRank": 0,
						"IsCustomType": 0,
						"Month": 1,
						"PersonName": "...",
						"Province": "",
						"Sex": 1,
						"Type": 0,
						"UID": "50",
						"Year": 1980,
						"bAgeEnable": 0,
						"emBeard": 0,
						"emEye": 0,
						"emFeatureState": 2,
						"emGlassesType": 0,
						"emMask": 0,
						"emMouth": 0,
						"emRace": 0,
						"nAttractive": -1
					},
					"Range": 0,
					"SceneImage": {
						"Data": "data:image/png;base64,...",
						"FilePath": "",
						"Height": 0,
						"Width": 0
					},
					"Similarity": 95,
					"Time": "0000-00-00 00:00:00"
				}
			],
			"EventAction": 1,// 事件动作,0表示脉冲事件,1表示持续性事件开始,2表示持续性事件结束;
			"EventID": 15010,// 事件ID
			"FaceData": {// 人脸数据
				"Sex": 1,//性别 1:男 2:女 其它:未知
				"Age": 30,// 年龄,-1表示该字段数据无效
				"Race": 2,// 种族：0,// 未知	1,// 未识别	2,// 黄种人	3,// 黑人	4,// 白人	
				"Eye": 0,// 眼睛状态：0,// 未知	1,// 未识别	2,// 闭眼	3,// 睁眼	
				"Mask": 2,// 口罩状态：0,// 未知	1,// 未识别	2,// 没戴口罩	3,// 戴口罩
				"Mouth": 0,// 嘴巴状态：0,// 未知	1,// 未识别	2,// 闭嘴	3,// 张嘴
				"Attractive": 61,// 魅力值, -1表示无效, 0未识别，识别时范围1-100,得分高魅力高
				"Beard": 2,// 胡子：0,// 未知	1,// 未识别	2,// 没胡子	3,// 有胡子
				"Nation": 0,// 民族：0,// 未知	1,// 维族(新疆)		2,// 其他	3,// 设备未识别
				"Feature": [// 人脸特征数组：0,// 未知	1,// 戴眼镜	2,// 微笑	3,// 愤怒	4,// 悲伤	5,// 厌恶	6,// 害怕	7,// 惊讶	8,// 正常	9,// 大笑	10,// 没戴眼镜	11,// 高兴	12,// 困惑	13,// 尖叫	14, // 戴太阳眼镜
					1,
					8
				]
			},
			"FaceDetectStatus": 0,// 人脸在摄像机画面中的状态：0,// 未知    1,// 出现    2,// 在画面中    3,// 离开
			"GlobalScenePicEnable": true,// 全景图是否存在
			"GlobalScenePicInfo" : {// 全景图片信息
				"Data": "data:image/png;base64,...",
				"FilePath": "",
				"Height": 1080,
				"Width": 1920
			},
			"ImageIndex": 0,// 图片的序号, 同一时间内(精确到秒)可能有多张图片, 从0开始
			"IntelliCommInfo": {// 智能事件公共信息
				"ClassType":1,// 智能事件所属大类
					0,    // 未知业务       1,    // 视频浓缩       2,    //卡口       3,    // 电警       4,    // 单球违停       
					5,    // 主从违停       6,    // 交通事件"Traffic"       7,    // 通用行为分析"Normal"       8,    // 监所行为分析"Prison"       9,    // 金融行为分析"ATM"       
					10,   // 地铁行为分析       11,   // 人脸检测"FaceDetection"       12,   // 人脸识别"FaceRecognition"       13,   // 人数统计"NumberStat"       14,   // 热度图"HeatMap"       
					15,   // 视频诊断"VideoDiagnosis"       16,   // 视频增强       17,   // 烟火检测       18,   // 车辆特征识别"VehicleAnalyse"       19,   // 人员特征识别     
					20,	// 多预置点人脸检测"SDFaceDetect",配置一条规则但可以在不同预置点下生效	21,	// 球机热度图计划"HeatMapPlan" 	22,	// 球机客流量统计计划 "NumberStatPlan"	23,	// 金融人脸检测，包括正常人脸、异常人脸、相邻人脸、头盔人脸等针对ATM场景特殊优化	24,	// 高速交通事件检测"Highway"
					25,	// 城市交通事件检测 "City"	26,	// 民用简易跟踪"LeTrack"	27,	// 打靶相机"SCR"	28,   // 立体视觉(双目)"StereoVision"	29,   // 人体检测"HumanDetect"
					30,	// 人脸分析 "FaceAnalysis"	31,	// X光检测 "XRayDetection"	32,	// 双目相机客流量统计 "StereoNumber"    33,	// 人群分布图    34,	// 目标检测
					35,	// IVSS人脸检测 "FaceAttribute" 	36,	// IVSS人脸识别 "FaceCompare" 	37,	// 立体行为分析 "StereoBehavior"	38,	// 智慧城管 "IntelliCityMgr"	39,	// 防护舱（ATM舱内）"ProtectiveCabin"
					40,	// 飞机行为检测 "AirplaneDetect"	41,	// 人群态势（人群分布图服务）"CrowdPosture"	42,	// 打电话检测 "PhoneCallDetect"	43,	// 烟雾检测 "SmokeDetection"	44,	// 船只检测 "BoatDetection"
					45,	// 吸烟检测 "SmokingDetect"
				"PresetID": 0,// 该事件触发的预置点，对应该设置规则的预置点
			},
			"Name": "人脸检测",//事件名称
			"Object": {// 检测到的物体
				"Action": 1,// 物体动作:1:Appear 2:Move 3:Stay 4:Remove 5:Disappear 6:Split 7:Merge 8:Rename
				"BeginSequence": 0,// 开始帧序号（物体开始出现时的帧序号）
				"Confidence": 0,// 置信度(0~255),值越大表示置信度越高
				"EndSequence": 0,// 结束帧序号（物体消逝时的帧序号）
				"EndTime": "0000-00-00 00:00:00",// 结束时间戳（物体最后出现时）
				"ObjectID": 35129,// 物体ID,每个ID表示一个唯一的物体
				"ObjectSubType": "",// 物体子类别,根据不同的物体类型,可以取以下子类型：
				"ObjectType": "HumanFace",// 物体类型
				"PicEnble": true,// 是否有物体对应图片文件信息
				"PicInfo": {// 检测到的物体对应图片信息
					"Data": "data:image/png;base64,...",
					"FilePath": "",
					"Height": 1080,
					"Width": 1920
				},
				"RelativeID": 35129,// 相关物体ID
				"StartTime": "0000-00-00 00:00:00"// 开始时间戳（物体开始出现时）
			},
			"OccurrenceCount": 0,// 事件触发累计次数
			"Sex": 1,//性别 1:男 2:女 其它:未知
			"SnapDevAddress": "",// 抓拍当前人脸的设备地址,如：滨康路37号
			"UID": "",// 抓拍人员写入数据库的唯一标识符
			"UTC": "2017-10-20 14:03:07"//事件发生时间
		}
		**/
		$('#analyzerData_SnapImage').attr('src', eventParam.Object.PicInfo.Data);
		$('#analyzerData_CandidateImage').attr('src', eventParam.Candidates[0].PersonInfo.FacePicInfo[0].Data);
		$('#analyzerData_GlobalSceneImage').attr('src', eventParam.GlobalScenePicInfo.Data);
	}
}

function tagscheck(a) {
	var trList = $("#pfile_rec_tbody").children("tr");
	for (i = 0; i < trList.length; i++) {
		if (a == trList[i]) {
			trList[i].style.background = "#ccc"
		} else {
			trList[i].style.background = ""
		}
	}
}

//添加录像文件信息到回放列表
function addRecInfoToTable(nChn, recInfo) {
	for (var i = 0; i < recInfo.length; i++) {
		var tmpInfo = recInfo[i];
		var channel = nChn + 1;
		var $tr = $("<tr onclick='tagscheck(this)'>" + "<td>" + tmpInfo.Length + 'KB' + "</td>" + "<td>" + tmpInfo
			.StartTime + "</td>" + "<td>" + tmpInfo.EndTime + "</td>" + "<td>" + 'D' + channel + "</td>" + "</tr>");
		$('#pfile_rec_tbody').append($tr);
	}
	var trList = $("#pfile_rec_tbody").children("tr");
	trList[0].style.background = "#ccc"
}

function tagscheck_download(a) {
	var trList = $("#pfile_rec_tbody_download").children("tr");
	for (i = 0; i < trList.length; i++) {
		if (a == trList[i]) {
			trList[i].style.background = "#ccc"
		} else {
			trList[i].style.background = ""
		}
	}
}

//添加录像文件信息到下载列表
function addRecInfoToTable_download(recInfo) {
	for (var i = 0; i < recInfo.length; i++) {
		var tmpInfo = recInfo[i];
		var channel = tmpInfo.Channel + 1;
		var $tr = $("<tr onclick='tagscheck_download(this)'>" + "<td>" + tmpInfo.Length + 'KB' + "</td>" + "<td>" +
			tmpInfo.StartTime + "</td>" + "<td>" + tmpInfo.EndTime + "</td>" + "<td>" + 'D' + channel + "</td>" +
			"</tr>");
		$('#pfile_rec_tbody_download').append($tr);
	}
	var trList = $("#pfile_rec_tbody_download").children("tr");
	trList[0].style.background = "#ccc"
}

//窗口切换事件
function changeWndNum(num) {
	//设置视频窗口的显示
	var num = parseInt($("#wndNum").find("option:selected").val());
	WebVideoCtrl.setSplitNum(num);
}

function changeDelayTime(level) {
	var level = parseInt($("#netsPreach").find("option:selected").val());
	WebVideoCtrl.setDelayTime(level);
}

function changePlaySpeed(speed) {
	WebVideoCtrl.setPlaySpeed(speed);
}

//设备登录
function clickLogin() {
	var szIP = $("#loginip").val();
	szPort = $("#port").val() - 0;
	szUsername = $("#username").val();
	szPassword = $("#password").val();
	rtspPort = $("#rtspport").val() - 0;
	protocol = $("#protocolType").val() - 0;
	if ("" == szIP || "" == szPort) {
		return;
	}
	var port = parseInt($("#port").val());
	//判断当前设备是否已经登录
	var ret = WebVideoCtrl.login(szIP, port, szUsername, szPassword, 0);
	if (ret == 0) {
		alert("login successed");
	} else {
		alert("login failed: " + ret);
		return;
	}

	$("#tabs fieldset").each(function(index) {
		$(this).prop('disabled', false);
	})
}

function switchDeviceInfo(ip) {
	DemoUI.updateDeviceInfo(ip);
}

function clickLogout() {
	WebVideoCtrl.logout();
	$('#pfile_rec_tbody').empty();
	$('#pfile_rec_tbody_download').empty();
	alert("login out successed");

	$("#tabs fieldset").each(function(index) {
		$(this).prop('disabled', true);
	})
}

function GetFileTimeLength() {
	var end = $("#loaddownEnd").val()
	if (end != "YES") {
		alert("download not finished,please wait a minitues,then get file timeLenth!");
	}
	if (downloadFileName == "") {
		alert("file name is empty!");
	}
	WebVideoCtrl.getFileTimeLength(downloadFileName);
}

function downloadFile() {
	var format = $('#downLoadFormat').find("option:selected").text();
	var trList = $("#pfile_rec_tbody_download").children("tr");
	for (i = 0; i < trList.length; i++) {
		if (trList[i].style.background == "rgb(204, 204, 204)" || trList[i].style.background == "#ccc") {
			var startTime = $(trList[i]).find('td').eq(1).text();
			var endTime = $(trList[i]).find('td').eq(2).text();
			var channelTxt = $(trList[i]).find('td').eq(3).text().substr(1);
			var channel = parseInt(channelTxt) - 1;
			var streamType = parseInt($("#record_streamtype").val(), 10);
			//pluginObject.DownloadRecordByTimeEx(channel,streamType,startTime,endTime,$("#LiveRecord").val()+'\\',format);

			WebVideoCtrl.downloadFile(channel, streamType, startTime, endTime, $("#LiveRecord").val() + '\\', format);
			break;
		}
	}
}

function clearDownloadInfo() {
	$("#loaddownPos").val("0");
	$("#loaddownSpeed").val("0");
	$("#loaddownEnd").val("YES");
	$("#loadFileLenth").val("0");
}

function stopDownloadFile() {
	WebVideoCtrl.stopDownloadFile();
}

function clickPause() {
	WebVideoCtrl.pausePlayBack();
}

function clickResume() {
	WebVideoCtrl.resumePlayback();
}

function clickStopPlayback() {
	WebVideoCtrl.stopPlayBack();
}

function clickStartPlayback() {
	if ($("#playbackField_1").is(":visible")) {
		var trList = $("#pfile_rec_tbody").children("tr");
		for (i = 0; i < trList.length; i++) {
			if (trList[i].style.background == "rgb(204, 204, 204)" || trList[i].style.background == "#ccc") {
				var startTime = $(trList[i]).find('td').eq(1).text();
				var endTime = $(trList[i]).find('td').eq(2).text();
				var channelTxt = $(trList[i]).find('td').eq(3).text().substr(1);
				var channel = parseInt(channelTxt) - 1;

				var winID = WebVideoCtrl.getSelectedWinID();
				var time = startTime.split(" ")[1]; //"11:00:08"
				WebVideoCtrl.playBackByTime(winID, time);
				break;
			}
		}
	} else {
		var channel = $("#playbackByTime_channel").val() - 0;
		var streamType = $("#playbackByTime_streamType").val() - 0;
		var winID = $("#playbackByTime_winID").val() - 0;
		var startTime = $("#playbackByTime_startTime").val();
		var endTime = $("#playbackByTime_endTime").val();
		WebVideoCtrl.playBackByTimeEx(winID, channel, streamType, startTime, endTime);
	}
}

function clickRecordSearch() {
	$('#pfile_rec_tbody_download').empty(); //先清空上次搜索结果
	var ch = parseInt($("#downloadChannels").val(), 10);
	var streamType = parseInt($("#streamtype").val(), 10);
	var startTime = $("#downloadStarttime").val();
	var endTime = $("#downloadEndtime").val();
	var maxNumber = 500;
	var recType = 0;
	WebVideoCtrl.queryRecordInfoByTimeEx(ch, streamType, recType, startTime, endTime, maxNumber);
}

function clickStartRealPlay() {
	//获得通道号
	var iChannel = $("#channels").val() - 0;
	//获得码流类型
	var iStreamType = parseInt($("#streamtype").val(), 10);
	WebVideoCtrl.connectRealVideo(iChannel, iStreamType);
}

function clickStartRealPlayEx() {
	//获得通道号
	var iChannel = $("#channels").val() - 0;
	//获得码流类型
	var iStreamType = parseInt($("#streamtype").val(), 10);
	//窗口号
	var iWinID = $("#winIDs").val() - 0;
	WebVideoCtrl.connectRealVideoEx(iChannel, iStreamType, iWinID);
}

function changeStreamType(streamtype) {
	//获得播放器信息
	if (0 != WebVideoCtrl.getSelectedPlayerID()) {
		clickStartRealPlay();
	}
}

function changedownLoadFormat(format) {
	downloadFormat = format;
}

//关闭选中窗口的实时监视
function clickStopRealPlay() {
	//窗口号
	var iWinID = $("#winIDs").val() - 0;
	WebVideoCtrl.closePlayerEx(iWinID);
}

//开启对讲
function clickStartVoiceTalk() {
	WebVideoCtrl.controlTalking(true);
}

//关闭对讲
function clickStopVoiceTalk() {
	WebVideoCtrl.controlTalking(false);
}

// 打开选择框
function clickOpenFileDlg(type) {
	OpenFileDlgType = type;
	WebVideoCtrl.showFileBrowse();
}

function clickSetVolume() {
	//设置选中窗口的音量
	WebVideoCtrl.setVolume(parseInt($("#volume").val(), 10), {
		cbSuccess: function(winIndex) {},
		cbFailed: function(winIndex) {}
	});
}

function clickOpenSound() {
	var winID = WebVideoCtrl.getSelectedWinID();
	WebVideoCtrl.controlSound(winID, true);
}

function clickCloseSound() {
	var winID = WebVideoCtrl.getSelectedWinID();
	WebVideoCtrl.controlSound(winID, false);
}

function clickEnableEZoom() {
	var winID = WebVideoCtrl.getSelectedWinID();
	WebVideoCtrl.controlEZoom(winID, true);
}

function clickDisableEZoom() {
	var winID = WebVideoCtrl.getSelectedWinID();
	WebVideoCtrl.controlEZoom(winID, false);
}

function clickFullScreen() {
	WebVideoCtrl.setFullscreen();
}

function clickEnableIpcTalk() {
	var winID = WebVideoCtrl.getSelectedWinID();
	WebVideoCtrl.setIpcTalkAduioFromat(0, 2, 16, 16000, 25)
	WebVideoCtrl.controlIpcTalking(winID, true);
}

function clickDisableIpcTalk() {
	var winID = WebVideoCtrl.getSelectedWinID();
	WebVideoCtrl.controlIpcTalking(winID, false);
}

function clickCapturePic() {
	var winID = WebVideoCtrl.getSelectedWinID();
	var picName = $("#snapPicName").val();
	WebVideoCtrl.crabOnePicture(winID, picName);
}

function clickStartRecord() {
	var winID = WebVideoCtrl.getSelectedWinID();
	WebVideoCtrl.controlRecordingVideo(winID, true);
}

function clickStopRecord() {
	var winID = WebVideoCtrl.getSelectedWinID();
	WebVideoCtrl.controlRecordingVideo(winID, false);
}

function mouseUPLeftPTZControl(flag) {
	var iChannel = $("#channels").val() - 0;
	//获得移动速度
	var speed = parseInt($("#ptzspeed").val(), 10)
	WebVideoCtrl.Ptz_moveUpperLeft(iChannel, speed, speed, flag);
}

function mouseUpPTZControl(flag) {
	var iChannel = $("#channels").val() - 0;
	var speed = parseInt($("#ptzspeed").val(), 10)
	WebVideoCtrl.Ptz_moveUpwards(iChannel, speed, flag);
}

function mouseUPRightPTZControl(flag) {
	var iChannel = $("#channels").val() - 0;
	//获得移动速度
	var speed = parseInt($("#ptzspeed").val(), 10)
	WebVideoCtrl.Ptz_moveUpperRight(iChannel, speed, speed, flag);
}

function mouseLefPTZControl(flag) {
	var iChannel = $("#channels").val() - 0;
	var speed = parseInt($("#ptzspeed").val(), 10)
	WebVideoCtrl.Ptz_moveLeft(iChannel, speed, flag);
}

function mouseRightPTZControl(flag) {
	var iChannel = $("#channels").val() - 0;
	//获得移动速度
	var speed = parseInt($("#ptzspeed").val(), 10)
	WebVideoCtrl.Ptz_moveRight(iChannel, speed, flag);
}

function mouseDownLeftPTZControl(flag) {
	var iChannel = $("#channels").val() - 0;
	//获得移动速度
	var speed = parseInt($("#ptzspeed").val(), 10)
	WebVideoCtrl.Ptz_moveLowerLeft(iChannel, speed, speed, flag);
}

function mouseDownRightPTZControl(flag) {
	var iChannel = $("#channels").val() - 0;
	//获得移动速度
	var speed = parseInt($("#ptzspeed").val(), 10)
	WebVideoCtrl.Ptz_moveLowerRight(iChannel, speed, speed, flag);
}

function mouseDownPTZControl(flag) {
	var iChannel = $("#channels").val() - 0;
	var speed = parseInt($("#ptzspeed").val(), 10)
	WebVideoCtrl.Ptz_moveLower(iChannel, speed, flag);
}

function openPtzLocate() {
	var iWinID = $("#winIDs").val() - 0;
	WebVideoCtrl.Ptz_3DLocate(iWinID);

	if ($("#openPtzLocate").hasClass("btn_checked")) {
		$("#openPtzLocate").removeClass("btn_checked");
	} else {
		$("#openPtzLocate").addClass("btn_checked");
	}
}

function PTZZoomout(flag) {
	var iChannel = $("#channels").val() - 0;
	var speed = parseInt($("#ptzspeed").val(), 10)
	WebVideoCtrl.Ptz_controlZoom(iChannel, speed, 1, flag);
}

function PTZZoomIn(flag) {
	var iChannel = $("#channels").val() - 0;
	var speed = parseInt($("#ptzspeed").val(), 10)
	WebVideoCtrl.Ptz_controlZoom(iChannel, speed, 0, flag);
}

function PTZFocusIn(flag) {
	var iChannel = $("#channels").val() - 0;
	var speed = parseInt($("#ptzspeed").val(), 10)
	WebVideoCtrl.Ptz_controlFocus(iChannel, speed, 0, flag);
}

function PTZFoucusOut(flag) {
	var iChannel = $("#channels").val() - 0;
	var speed = parseInt($("#ptzspeed").val(), 10)
	WebVideoCtrl.Ptz_controlFocus(iChannel, speed, 1, flag);
}

function PTZIrisIn(flag) {
	var iChannel = $("#channels").val() - 0;
	//获得移动速度
	var speed = parseInt($("#ptzspeed").val(), 10)
	WebVideoCtrl.Ptz_controlAperture(iChannel, speed, 0, flag);
}

function PTZIrisOut(flag) {
	var iChannel = $("#channels").val() - 0;
	var speed = parseInt($("#ptzspeed").val(), 10)
	WebVideoCtrl.Ptz_controlAperture(iChannel, speed, 1, flag);
}

function setCustomWndPos() {
	WebVideoCtrl.setCustomWndPos(true);
}

function getAllChannelInfo() {
	var ret = WebVideoCtrl.getAllChannelInfo();
	$("#channels").empty();
	$("#playbackChannels").empty();
	$("#downloadChannels").empty();
	$("#downloadChannels").append('<option value="-1" selected>全通道</option>');
	for (var i = 0; i < ret.length; ++i) {
		var channelInfo = ret[i];
		var channel = channelInfo.Channel;
		var channelName = channelInfo.ChannelName;
		var ip = channelInfo.IP;

		var adjustedChannelName = "C" + (channel + 1) + ":" + channelName + "(" + ip + ")";

		//初始预览通道列表
		$("#channels").append("<option value='" + channel + "'>" + adjustedChannelName + "</option>");

		//初始回放通道列表
		$("#playbackChannels").append('<tr> <td><input type="checkbox" value="' + channel + '" onchange="setWinBindedChannelEx();"></input></td> <td>' + adjustedChannelName + '</td><td><select onchange="setWinBindedChannelEx();"><option value="0">M</option> <option value="1">S</option> </select> </td> </tr>');

		//初始下载通道列表
		$("#downloadChannels").append("<option value='" + channel + "'>" + adjustedChannelName + "</option>");
	};
}

function switchToPreview() {
	WebVideoCtrl.setModuleMode(1);
}

function switchToPlayback() {
	WebVideoCtrl.setModuleMode(4);
}

function switchDay() {
	$('#pfile_rec_tbody').empty();

	var date = $("#playbackDatepicker").datepicker('getDate');

	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var day = date.getDate();
	WebVideoCtrl.switchDay(year, month, day);
}

function setWinBindedChannelEx() {
	$('#pfile_rec_tbody').empty();

	var nWinNumber = 1;
	var nWinSel = 0;
	var channels = [];

	$("#playbackChannels input").each(function(index) {
		var checked = $(this).is(":checked");
		var channel = $(this).val() - 0;

		if (checked) {
			var streamtype = $("#playbackChannels select").eq(index).val() - 0;
			//辅码流通道号：从所有主码流通道号后面开始排序
			//主: 0,1,2,3,...15
			//辅: 16,17,18,19,...31
			channel = streamtype * WebVideoCtrl.getTotalChannelNum() + channel;
			channels.push(channel);
		}
	})

	var channelsLength = channels.length;
	if (channelsLength <= 1) {
		nWinNumber = 1;
	} else if (channelsLength <= 4) {
		nWinNumber = 4;
	} else if (channelsLength <= 9) {
		nWinNumber = 9;
	} else {
		nWinNumber = 16;
	}

	for (var i = channelsLength; i < nWinNumber; i++) {
		//-1填充
		channels.push(-1);
	};

	switchDay();
	WebVideoCtrl.setWinBindedChannelEx(nWinNumber, nWinSel, channels);
}

function setCustomTitle() {
	//titleInfo:{"Text":["title1","title2], "Pos":[10,10], "BackColor":[255,255,255,1], "FrontColor":[255,255,255,1], "BlendType":1}
	var iChannel = $("#channels").val() - 0;
	var titleInfo = {
		Text: [], //最多支持12行字符串叠加，每行字符串最大支持22个汉字或字节
		Pos: [100, 200], // 区域左上角位置[x,y], 坐标取值[0~8191]
		BackColor: [0, 0, 0, 0], //[R,G,B,A]
		FrontColor: [255, 255, 255, 255], //[R,G,B,A]
		BlendType: 1 //叠加类型：0,未知叠加类型; 1,叠加到主码流; 2,叠加到辅码流1; 3,叠加到辅码流2; 4,叠加到辅码流3; 5,叠加到抓图; 6,叠加到预览视频
	};

	titleInfo.Text.push($("#osdTitle_1").val());
	titleInfo.Text.push($("#osdTitle_2").val());
	titleInfo.Text.push($("#osdTitle_3").val());
	titleInfo.Text.push($("#osdTitle_4").val());
	titleInfo.Text.push($("#osdTitle_5").val());
	titleInfo.Text.push($("#osdTitle_6").val());
	titleInfo.Text.push($("#osdTitle_7").val());
	titleInfo.Text.push($("#osdTitle_8").val());

	WebVideoCtrl.setCustomTitle(iChannel, titleInfo);
}

function clearCustomTitle() {
	var iChannel = $("#channels").val() - 0;
	var titleInfo = {
		BlendType: 1 //叠加类型：0,未知叠加类型; 1,叠加到主码流; 2,叠加到辅码流1; 3,叠加到辅码流2; 4,叠加到辅码流3; 5,叠加到抓图; 6,叠加到预览视频
	};

	//titleInfo.Text 为空时表示清除叠加

	WebVideoCtrl.setCustomTitle(iChannel, titleInfo);
}

function getRecordMode() {
	var iChannel = $("#recordMode_channelID").val() - 0;
	var recordMode = WebVideoCtrl.getRecordMode(iChannel);
	$("#recordMode_result").val(JSON.stringify(recordMode.RecordMode));
}

function GetStorageSpace() {
	var type = $("#storageType").val() - 0;
	var space = WebVideoCtrl.getStorageSpace(type);
	$("#space_result").val(JSON.stringify(space));

}

function StorageAlarm() {
	var type = $("#enable_storagealarm").prop('checked');
	var alarm = WebVideoCtrl.storageAlarm(type);
	$("#storage_alarm_result").val(JSON.stringify(alarm));

}

function MarkFile() {
	var enable = $("#enable_MarkFile").prop('checked');
	var chn = $("#MarkFile_channelID").val();
	var starttime = $("#MarkStarttime").val();
	var endtime = $("#MarkEndtime").val();
	var mark = WebVideoCtrl.markFile(chn - 0, starttime, endtime, enable);
	$("#mark_result").val(JSON.stringify(mark));
}

function setRecordMode() {
	var iChannel = $("#recordMode_channelID").val() - 0;
	var recordMode = $("#recordMode_result").val();
	recordMode = $.parseJSON(recordMode);
	//recordMode：
	//Channel为非-1时：{"Mode":0,"ModeExtra1":1,"ModeExtra2":2}//"Mode"-主码流，"ModeExtra1"-辅码流1，"ModeExtra2"-辅码流2；0-自动录像，1-手动录像，2-关闭录像
	//Channel为  -1时：[{"Mode":0,"ModeExtra1":1,"ModeExtra2":2},...]//是一个数组，每个配置对应一个通道，未设置的通道会默认配置为{"Mode":0,"ModeExtra1":0,"ModeExtra2":0}
	WebVideoCtrl.setRecordMode(iChannel, recordMode);
}

function startRealLoadPicture() {
	var iChannel = $("#analyzerData_channelID").val() - 0;
	WebVideoCtrl.startRealLoadPicture(iChannel);
}

function stopRealLoadPicture() {
	var iChannel = $("#analyzerData_channelID").val() - 0;
	WebVideoCtrl.stopRealLoadPicture(iChannel);
}

function setIVSEnable(type, enable) {
	var iIVSType = type - 0;

	if (iIVSType == 65535) {
		$("#analyzerData_IVSTYPE_TRACK").prop("checked", enable ? true : false);
		$("#analyzerData_IVSTYPE_RULE").prop("checked", enable ? true : false);
		$("#analyzerData_IVSTYPE_ALARM").prop("checked", enable ? true : false);
		$("#analyzerData_IVSTYPE_POS").prop("checked", enable ? true : false);
	} else if (iIVSType != 65535 && !enable) {
		$("#analyzerData_IVSTYPE_All").prop("checked", false);
	}
	/**
	"IVSType"：该参数是以下任何智能类型值通过按位或的结果
	所支持的智能类型及对应值如下：
		IVS_TYPE_NONE = 0, 
		IVS_TYPE_TRACK = 1, 
		IVS_TYPE_RULE = 2, 
		IVS_TYPE_ALARM = 4, 
		IVS_TYPE_POS = 8, 
		IVS_TYPE_SYNOPSIS = 16, 
		IVS_TYPE_All = 65535//2^16 - 1: IVS类型最大扩展到16种
	**/
	WebVideoCtrl.setIVSEnable(iIVSType, enable);
}
