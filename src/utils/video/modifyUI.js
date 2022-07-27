var DemoUI = (function(e)
{
	return {
		setLoginDeviceIP:function(){},
		getLoginDeviceIP:function(){},
		removeDeviceInfo:function(ip){},
		updateDeviceInfo:function(ip){},
		setSvrPort:function(){},
		getSvrPort:function(){},
		setRtspPort:function(){},
		getRtspPort:function(){},
		setUsrName:function(){},
		getUsrName:function(){},
		setPassword:function(){},
		getPassword:function(){},
		addDeviceIP:function(){},
		removeDeviceIP:function(){},
		getCurDeviceIP:function(){},
		modifyChannelList:function(){},
		setCurChannel:function(){},
		getCurChannel:function(){},
		setCurStreamType:function(){},
		getCurStreamType:function(){},
		setCurProtocol:function(){},
		getCurProtocol:function(){},
		clearPresets:function(){}
	};
})(this);

$(function () {

	DemoUI.setLoginDeviceIP = function(ip){
		$("#loginip").val(ip);
	};
	
	DemoUI.getLoginDeviceIP = function(){
		return $("#loginip").val();
	};
	
	DemoUI.removeDeviceInfo = function(ip){
		//将设备信息清除
		DemoUI.removeDeviceIP();
		//设置当前的设备信息
		var selectDevice = DemoUI.getCurDeviceIP();
		DemoUI.updateDeviceInfo(selectDevice);
	}
	
	DemoUI.updateDeviceInfo = function(ip){
		var info = WebVideoCtrl.getDeviceInfo(ip);
		if(typeof info != "undefined")
		{
			//更新选中设备的信息
			DemoUI.setLoginDeviceIP(ip);
			DemoUI.setUsrName(info.userName);
			DemoUI.setPassword(info.password);
			DemoUI.setRtspPort(info.rtspPort);
			DemoUI.setSvrPort(info.port);
			DemoUI.setCurProtocol(info.protocol);
			$("#ips").val(ip);
			//更新通道数据
			DemoUI.modifyChannelList(info.channelNum);
		}else{
			//清理通道列表数据
			DemoUI.modifyChannelList(0);
		}
	}
	
	DemoUI.setSvrPort = function(port){
		$("#port").val(port.toString());
	};
	
	DemoUI.getSvrPort = function(){
		return ($("#port").val() - 0);
	};
	
	DemoUI.setRtspPort = function(port){
		$("#rtspport").val(port.toString());
	};
	
	DemoUI.getRtspPort = function(){
		return ($("#rtspport").val() - 0);
	};
	
	DemoUI.setUsrName = function(usrName){
		$("#username").val(usrName);
	};
	
	DemoUI.getUsrName = function(){
		return $("#username").val();
	};
	
	DemoUI.setPassword = function(password){
		$("#password").val(password);
	};
	
	DemoUI.getPassword = function(){
		return $("#password").val();
	};
	
	DemoUI.addDeviceIP = function(ip){
		$("#ips").append("<option value='" + ip + "'>" + ip + "</option>");
		$("#ips").val(ip)
	};
	
	DemoUI.removeDeviceIP = function(){
		var selectDevice = $("#ips").find("option:selected").text();
		$("#ips" + " option[value='" + selectDevice + "']").remove();
	};
	
	DemoUI.getCurDeviceIP = function(){
		return $("#ips").find("option:selected").text();
	};
	
	DemoUI.modifyChannelList = function(num){
		$("#channels").empty();
		//更新通道列表信息
		if(-1 != num)
		{
			var i = 1;
			for(;i <= num;i ++)
			{
				var subNode = "<option value=" + i.toString() + ">" + i.toString() + "</option>"
				$("#channels").append(subNode);
			}
		}
	};
	
	DemoUI.setCurChannel = function(chan){
		$("#channels").val(chan.toString());
	};
	
	DemoUI.getCurChannel = function(){
		return $("#channels").val();
	};

	DemoUI.setCurStreamType = function(type){
		$("#streamtype").val(type.toString());
	};
	
	DemoUI.getCurStreamType = function(){
		return $("#streamtype").val();
	};
	
	DemoUI.setCurProtocol = function(protocol){
		$("#protocolType").val(protocol.toString());
	};
	
	DemoUI.getCurProtocol = function(){
		return $("#protocolType").val();
	};
	
	DemoUI.clearPresets = function(){
		$("#presetList").empty();
	}
	
});