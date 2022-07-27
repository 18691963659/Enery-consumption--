<template>
	<div class="nr">
		<div class="one">
			<div class="left1" style="flex: 2">
				<div class="zbcs"></div>
				<span class="wz">用电总表</span>
				<div style="display: flex;margin-top:10px">
					<div style="flex: 1;height: 110px">

						<p style="
                text-align: center;

                height: 32px;
                font-size: 28px;
                font-family: Source Han Sans CN;
                font-weight: bold;
               
                color: #00e7fe;
                opacity: 1;
              ">
							{{alldian==''?'暂无数据':
                          parseFloat(alldian[0].sensorDate).toFixed(0)
                          }}
						</p>

						<p style="
                text-align: center;
                height: 14px;
                font-size: 14px;
                font-family: Source Han Sans CN;
                font-weight: 400;
              
                color: rgba(255, 255, 255, 0.45);
                opacity: 1;
              ">
							kW·h
						</p>

						<p style="
                text-align: center;
                height: 18px;
                font-size: 18px;
                margin-top: 5px;
                font-family: Source Han Sans CN;
                font-weight: 400;
               
                color: #ffffff;
                opacity: 1;
              ">
							总电量
						</p>
					</div>
					<div style="flex: 2; height: 130px">
						<p class="list1">
							<span style="flex: 1">&emsp;</span>
							<span style="flex: 1">A相</span>
							<span style="flex: 1">B相</span>
							<span style="flex: 1.15">C相</span>
						</p>
						<p class="list2">
							<span style="
                  flex: 1;
                  font-size: 14px;
                  font-family: Source Han Sans CN;
                  font-weight: 500;
                 
                  color: #00a2ff;
                  opacity: 1;
                  margin-left: 10px;
                ">电流</span>
							<span style="flex: 1;line-height: 29px;"> {{alldian==''?'暂无数据':
                                parseFloat(alldian[4].sensorDate).toFixed(2)
                                }}</span>
							<span style="flex: 1;line-height: 29px;">{{alldian==''?'暂无数据':
                                parseFloat(alldian[6].sensorDate).toFixed(2)
                                }}</span>
							<span style="flex: 1;line-height: 29px;">{{alldian==''?'暂无数据':
                                parseFloat(alldian[5].sensorDate).toFixed(2)
                                }}</span>
						</p>
						<p class="list2">
							<span style="
                  flex: 1;
                  font-size: 14px;
                  font-family: Source Han Sans CN;
                  font-weight: 500;
                  line-height: 24px;
                  color: #00a2ff;
                  opacity: 1;
                  margin-left: 10px;
                ">电压</span>
							<span style="flex: 1;line-height: 29px;"> {{alldian==''?'暂无数据':
                                parseFloat(alldian[1].sensorDate).toFixed(1)
                                }}</span>
							<span style="flex: 1;line-height: 29px;">{{alldian==''?'暂无数据':
                                parseFloat(alldian[2].sensorDate).toFixed(1)
                                }}</span>
							<span style="flex: 1;line-height: 29px;">{{alldian==''?'暂无数据':
                                parseFloat(alldian[3].sensorDate).toFixed(1)
                                }}</span>
						</p>
						<p class="list2">
							<span style="
                  flex: 1;
                  font-size: 14px;
                  font-family: Source Han Sans CN;
                  font-weight: 500;
                  line-height: 24px;
                  color: #00a2ff;
                  opacity: 1;
                  margin-left: 10px;
                ">功率</span>
							<span style="flex: 1;line-height: 29px;"> {{alldian==''?'暂无数据':
                                parseFloat(alldian[7].sensorDate).toFixed(0)
                                }}</span>
							<span style="flex: 1;line-height: 29px;">{{alldian==''?'暂无数据':
                                parseFloat(alldian[8].sensorDate).toFixed(0)
                                }}</span>
							<span style="flex: 1;line-height: 29px;">{{alldian==''?'暂无数据':
                                parseFloat(alldian[9].sensorDate).toFixed(0)
                                }}</span>
						</p>
					</div>
				</div>
			</div>

			<div class="left2" style="flex: 1.5;">
				<div class="zbcs"></div>
				<span class="wz">主卧环境</span>

				<div class="right1s">
					<div>
						<div style="display:flex;margin: 10px;">
							<div
								style="flex:1;line-height:30px;height:36px;width: 80px;height: 30px;background: #00B9FF;text-align: center;">
								温度</div>
							<div
								style="flex:1.5;line-height:30px;width: 120px;height: 30px;;background: rgba(60, 74, 145, 0.1);text-align: center;">
								{{ zhuwo==''?'暂无数据': parseFloat(zhuwo[0].sensorDate).toFixed(1)+'℃' }}
							</div>
						</div>
						<div style="display:flex;line-height:30px;margin: 10px;">
							<div
								style="flex:1;line-height:30px;height:36px;width: 80px;height: 30px;;background: #00B9FF;text-align: center;">
								湿度</div>
							<div
								style="flex:1.5;width: 120px;height: 30px;;background: rgba(60, 74, 145, 0.1);text-align: center;">
								{{zhuwo==''?'暂无数据': parseFloat(zhuwo[1].sensorDate).toFixed(0) +'%RH'}}
							</div>
						</div>
						<div style="display:flex;line-height:30px;margin: 10px;">
							<div
								style="flex:1;height:36px;width: 80px;height: 30px;;background: #00B9FF;text-align: center;">
								CO₂</div>
							<div
								style="flex:1.5;line-height:30px;width: 120px;height: 30px;;background: rgba(60, 74, 145, 0.1);text-align: center;">
								{{zhuwo==''?'暂无数据': parseFloat(zhuwo[2].sensorDate).toFixed(0)+'ppm' }}
							</div>
						</div>
					</div>

					<div>
						<div style="display:flex;margin: 10px;">
							<div
								style="flex:1;line-height:30px;height:36px;width: 80px;height: 30px;;background: #00B9FF;text-align: center;">
								PM2.5</div>
							<div
								style="flex:1.5;line-height:30px;width: 120px;height: 30px;;background: rgba(60, 74, 145, 0.1);text-align: center;">
								{{ zhuwo==''?'暂无数据':parseFloat(zhuwo[4].sensorDate).toFixed(0)+'μg/m³' }}
							</div>
						</div>
						<div style="display:flex;margin: 10px;">
							<div
								style="flex:1;line-height:30px;height:36px;width: 80px;height: 30px;;background: #00B9FF;text-align: center;">
								PM10</div>
							<div
								style="flex:1.5;line-height:30px;width: 120px;height: 30px;;background: rgba(60, 74, 145, 0.1);text-align: center;">
								{{zhuwo==''?'暂无数据': parseFloat(zhuwo[3].sensorDate).toFixed(0) +'μg/m³'}}
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="left3" style="flex: 1.55">
				<div class="zbcs"></div>
				<span class="wz">书房环境</span>

				<div class="right1s">
					<div>
						<div style="display:flex;margin: 10px;">
							<div
								style="flex:1;line-height:30px;height:36px;width: 80px;height: 30px;background: #00C1BA;text-align: center;">
								温度</div>
							<div
								style="flex:1.5;line-height:30px;width: 120px;height: 30px;;background: rgba(60, 74, 145, 0.1);text-align: center;">
								{{ shufang==''?'暂无数据': parseFloat(shufang[0].sensorDate).toFixed(1)+'℃' }}
							</div>
						</div>
						<div style="display:flex;line-height:30px;margin: 10px;">
							<div
								style="flex:1;line-height:30px;height:36px;width: 80px;height: 30px;;background: #00C1BA;text-align: center;">
								湿度</div>
							<div
								style="flex:1.5;width: 120px;height: 30px;;background: rgba(60, 74, 145, 0.1);text-align: center;">
								{{shufang==''?'暂无数据': parseFloat(shufang[1].sensorDate).toFixed(0) +'%RH'}}
							</div>
						</div>
						<div style="display:flex;line-height:30px;margin: 10px;">
							<div
								style="flex:1;height:36px;width: 80px;height: 30px;;background: #00C1BA;text-align: center;">
								CO₂</div>
							<div
								style="flex:1.5;line-height:30px;width: 120px;height: 30px;;background: rgba(60, 74, 145, 0.1);text-align: center;">
								{{shufang==''?'暂无数据': parseFloat(shufang[2].sensorDate).toFixed(0)+'ppm' }}
							</div>
						</div>
					</div>

					<div>
						<div style="display:flex;margin: 10px;">
							<div
								style="flex:1;line-height:30px;height:36px;width: 80px;height: 30px;;background: #00C1BA;text-align: center;">
								PM2.5</div>
							<div
								style="flex:1.5;line-height:30px;width: 120px;height: 30px;;background: rgba(60, 74, 145, 0.1);text-align: center;">
								{{ shufang==''?'暂无数据':parseFloat(shufang[4].sensorDate).toFixed(0)+'μg/m³' }}
							</div>
						</div>
						<div style="display:flex;margin: 10px;">
							<div
								style="flex:1;line-height:30px;height:36px;width: 80px;height: 30px;;background: #00C1BA;text-align: center;">
								PM10</div>
							<div
								style="flex:1.5;line-height:30px;width: 120px;height: 30px;;background: rgba(60, 74, 145, 0.1);text-align: center;">
								{{shufang==''?'暂无数据': parseFloat(shufang[3].sensorDate).toFixed(0) +'μg/m³'}}
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="left4" style="flex: 1.6;">



				<div class="zbcs"></div>
				<span class="wz">茶室环境</span>

				<div class="right1s">
					<div>
						<div style="display:flex;margin: 10px;">
							<div
								style="flex:1;line-height:30px;height:36px;width: 80px;height: 30px;background: #5F50E5;text-align: center;">
								温度</div>
							<div
								style="flex:1.5;line-height:30px;width: 120px;height: 30px;;background: rgba(60, 74, 145, 0.1);text-align: center;">
								{{ chashi==''?'暂无数据': parseFloat(chashi[0].sensorDate).toFixed(1)+'℃' }}
							</div>
						</div>
						<div style="display:flex;line-height:30px;margin: 10px;">
							<div
								style="flex:1;line-height:30px;height:36px;width: 80px;height: 30px;;background: #5F50E5;text-align: center;">
								湿度</div>
							<div
								style="flex:1.5;width: 120px;height: 30px;;background: rgba(60, 74, 145, 0.1);text-align: center;">
								{{chashi==''?'暂无数据': parseFloat(chashi[1].sensorDate).toFixed(0) +'%RH'}}
							</div>
						</div>
						<div style="display:flex;line-height:30px;margin: 10px;">
							<div
								style="flex:1;height:36px;width: 80px;height: 30px;;background: #5F50E5;text-align: center;">
								CO₂</div>
							<div
								style="flex:1.5;line-height:30px;width: 120px;height: 30px;;background: rgba(60, 74, 145, 0.1);text-align: center;">
								{{chashi==''?'暂无数据': parseFloat(chashi[2].sensorDate).toFixed(0)+'ppm' }}
							</div>
						</div>
					</div>

					<div>
						<div style="display:flex;margin: 10px;">
							<div
								style="flex:1;line-height:30px;height:36px;width: 80px;height: 30px;;background: #5F50E5;text-align: center;">
								PM2.5</div>
							<div
								style="flex:1.5;line-height:30px;width: 120px;height: 30px;;background: rgba(60, 74, 145, 0.1);text-align: center;">
								{{ chashi==''?'暂无数据':parseFloat(chashi[4].sensorDate).toFixed(0)+'μg/m³' }}
							</div>
						</div>
						<div style="display:flex;margin: 10px;">
							<div
								style="flex:1;line-height:30px;height:36px;width: 80px;height: 30px;;background: #5F50E5;text-align: center;">
								PM10</div>
							<div
								style="flex:1.5;line-height:30px;width: 120px;height: 30px;;background: rgba(60, 74, 145, 0.1);text-align: center;">
								{{chashi==''?'暂无数据': parseFloat(chashi[3].sensorDate).toFixed(0) +'μg/m³'}}
							</div>
						</div>
					</div>
				</div>

			</div>





			<div class="right4" style="flex: 1.6">
				<div class="zbcs"></div>
				<span class="wz">客厅环境</span>

				<div class="right1s">
					<div>
						<div style="display:flex;margin: 10px;">
							<div
								style="flex:1;line-height:30px;height:36px;width: 80px;height: 30px;background: #00B9FF;text-align: center;">
								温度</div>
							<div
								style="flex:1.5;line-height:30px;width: 120px;height: 30px;;background: rgba(60, 74, 145, 0.1);text-align: center;">
								{{ keting==''?'暂无数据': parseFloat(keting[0].sensorDate).toFixed(1)+'℃' }}
							</div>
						</div>
						<div style="display:flex;line-height:30px;margin: 10px;">
							<div
								style="flex:1;line-height:30px;height:36px;width: 80px;height: 30px;;background: #00B9FF;text-align: center;">
								湿度</div>
							<div
								style="flex:1.5;width: 120px;height: 30px;;background: rgba(60, 74, 145, 0.1);text-align: center;">
								{{keting==''?'暂无数据': parseFloat(keting[1].sensorDate).toFixed(0) +'%RH'}}
							</div>
						</div>
						<div style="display:flex;line-height:30px;margin: 10px;">
							<div
								style="flex:1;height:36px;width: 80px;height: 30px;;background: #00B9FF;text-align: center;">
								CO₂</div>
							<div
								style="flex:1.5;line-height:30px;width: 120px;height: 30px;;background: rgba(60, 74, 145, 0.1);text-align: center;">
								{{keting==''?'暂无数据': parseFloat(keting[2].sensorDate).toFixed(0)+'ppm' }}
							</div>
						</div>
					</div>

					<div>
						<div style="display:flex;margin: 10px;">
							<div
								style="flex:1;line-height:30px;height:36px;width: 80px;height: 30px;;background: #00B9FF;text-align: center;">
								PM2.5</div>
							<div
								style="flex:1.5;line-height:30px;width: 120px;height: 30px;;background: rgba(60, 74, 145, 0.1);text-align: center;">
								{{ keting==''?'暂无数据':parseFloat(keting[4].sensorDate).toFixed(0)+'μg/m³' }}
							</div>
						</div>
						<div style="display:flex;margin: 10px;">
							<div
								style="flex:1;line-height:30px;height:36px;width: 80px;height: 30px;;background: #00B9FF;text-align: center;">
								PM10</div>
							<div
								style="flex:1.5;line-height:30px;width: 120px;height: 30px;;background: rgba(60, 74, 145, 0.1);text-align: center;">
								{{keting==''?'暂无数据': parseFloat(keting[3].sensorDate).toFixed(0) +'μg/m³'}}
							</div>
						</div>
					</div>
				</div>
			</div>





		</div>
		<div class="two">

			<div class="midds" style="display:flex">
				<div class="midd">
					<div class="zbcs"></div>
					<span class="wz">照明</span>
					<div class="lefts2">
						<div style="flex: 1">

							<p v-if="Lighting==''" style="text-align: center;margin-top: -30px; height: 32px;
font-size: 24px;
font-family: Source Han Sans CN;
 font-weight: bold;
color: #00e7fe;
 opacity: 1;
">
								暂无数据
							</p>
							<p v-else style="
                text-align: center;
                margin-top: -30px;
                height: 32px;
                font-size: 28px;
                font-family: Source Han Sans CN;
                font-weight: bold;
               
                color: #00e7fe;
                opacity: 1;
              ">
								{{ parseFloat(Lighting[0].sensorDate).toFixed(0) }}
							</p>

							<p style="
                text-align: center;
                height: 14px;
                font-size: 14px;
                font-family: Source Han Sans CN;
                font-weight: 400;
                line-height: 24px;
                color: rgba(255, 255, 255, 0.45);
                opacity: 1;
              ">
								kW·h
							</p>

							<p style="
                text-align: center;
                height: 18px;
                margin-top: 10px;
                font-size: 18px;
                font-family: Source Han Sans CN;
                font-weight: 400;
                line-height: 31px;
                color: #ffffff;
                opacity: 1;
              ">
								总电量
							</p>
						</div>

						<div style="flex:0.02; 
                    height: 85px;
                    margin-top: -22px;
                    background: rgba(60, 74, 145, 0.2);"></div>

						<div style="flex: 1.2">

							<p v-if="Lighting==''" style="text-align: center;margin-top: -30px; height: 32px;
							font-size: 24px;
							font-family: Source Han Sans CN;
							font-weight: bold;
							color: #00e7fe;
							opacity: 1;
							">
								暂无数据
							</p>

							<p v-else style="
                text-align: center;

                height: 32px;
                font-size: 28px;
                font-family: Source Han Sans CN;
                font-weight: bold;
                margin-top: -30px;
                color: #00e7fe;
                opacity: 1;
              ">
								{{parseFloat(Lighting[2].sensorDate).toFixed(2) }}
							</p>

							<p style="
                text-align: center;
                height: 14px;
                font-size: 14px;
                font-family: Source Han Sans CN;
                font-weight: 400;
                line-height: 24px;
                color: rgba(255, 255, 255, 0.45);
                opacity: 1;
              ">
								A
							</p>

							<p style="
                text-align: center;
                height: 18px;
                margin-top: 10px;
                font-size: 18px;
                font-family: Source Han Sans CN;
                font-weight: 400;
                line-height: 31px;
                color: #ffffff;
                opacity: 1;
              ">
								电流
							</p>
						</div>
						<div style="flex:0.02; 
                    height: 85px;
                    margin-top: -22px;
                    background: rgba(60, 74, 145, 0.2);"></div>
						<div style="flex: 1">
							<p v-if="Lighting==''" style="text-align: center;margin-top: -30px; height: 32px;
							font-size: 24px;
							font-family: Source Han Sans CN;
							font-weight: bold;
							color: #00e7fe;
							opacity: 1;
							">
								暂无数据
							</p>
							<p v-else style="
                text-align: center;

                height: 32px;
                font-size: 28px;
                font-family: Source Han Sans CN;
                font-weight: bold;
                margin-top: -30px;
                color: #00e7fe;
                opacity: 1;
              ">
								{{parseFloat(Lighting[1].sensorDate).toFixed(1) }}
							</p>

							<p style="
                text-align: center;
                height: 14px;
                font-size: 14px;
                font-family: Source Han Sans CN;
                font-weight: 400;
                line-height: 24px;
                color: rgba(255, 255, 255, 0.45);
                opacity: 1;
              ">
								V
							</p>

							<p style="
                text-align: center;
                height: 18px;
                margin-top: 10px;
                font-size: 18px;
                font-family: Source Han Sans CN;
                font-weight: 400;
                line-height: 31px;
                color: #ffffff;
                opacity: 1;
              ">
								电压
							</p>
						</div>
					</div>
				</div>
				<div class="midd">
					<div class="zbcs"></div>
					<span class="wz">空调</span>
					<div class="lefts2">
						<div style="flex: 1;">
							<p v-if="conditioner==''" style="text-align: center;margin-top: -30px; height: 32px;
							font-size: 24px;
							font-family: Source Han Sans CN;
							font-weight: bold;
							color: #00e7fe;
							opacity: 1;
							">
								暂无数据
							</p>



							<p v-else style="
                text-align: center;
                height: 32px;
                font-size: 28px;
                font-family: Source Han Sans CN;
                font-weight: bold;
               margin-top: -30px;
              
                color: #00e7fe;
                opacity: 1;
                height: 30px;
              ">
								{{parseFloat(conditioner[0].sensorDate).toFixed(0) }}
							</p>

							<p style="
                text-align: center;
                height: 14px;
                font-size: 14px;
                font-family: Source Han Sans CN;
                font-weight: 400;
                line-height: 24px;
                color: rgba(255, 255, 255, 0.45);
                opacity: 1;
              ">
								kW·h
							</p>

							<p style="
                text-align: center;
                height: 18px;
                margin-top: 10px;
                font-size: 18px;
                font-family: Source Han Sans CN;
                font-weight: 400;
                line-height: 31px;
                color: #ffffff;
                opacity: 1;
              ">
								总电量
							</p>
							<br><br>
						</div>

						<div style="flex:0.02; 
                    height: 85px;
                    margin-top: -22px;
                    background: rgba(60, 74, 145, 0.2);"></div>

						<div style="flex: 1">
							<p v-if="conditioner==''" style="text-align: center;margin-top: -30px; height: 32px;
							font-size: 24px;
							font-family: Source Han Sans CN;
							font-weight: bold;
							color: #00e7fe;
							opacity: 1;
							">
								暂无数据
							</p>
							<p v-else style="
                text-align: center;

                height: 32px;
                font-size: 28px;
                font-family: Source Han Sans CN;
                font-weight: bold;
                margin-top: -30px;
                color: #00e7fe;
                opacity: 1;
              ">
								{{parseFloat(conditioner[2].sensorDate).toFixed(2) }}
							</p>

							<p style="
                text-align: center;
                height: 14px;
                font-size: 14px;
                font-family: Source Han Sans CN;
                font-weight: 400;
                line-height: 24px;
                color: rgba(255, 255, 255, 0.45);
                opacity: 1;
              ">
								A
							</p>

							<p style="
                text-align: center;
                height: 18px;
                margin-top: 10px;
                font-size: 18px;
                font-family: Source Han Sans CN;
                font-weight: 400;
                line-height: 31px;
                color: #ffffff;
                opacity: 1;
              ">
								电流
							</p>
						</div>
						<div style="flex:0.02; 
                    height: 85px;
                    margin-top: -22px;
                    background: rgba(60, 74, 145, 0.2);
                   "></div>
						<div style="flex: 1">
							<p v-if="conditioner==''" style="text-align: center;margin-top: -30px; height: 32px;
							font-size: 24px;
							font-family: Source Han Sans CN;
							font-weight: bold;
							color: #00e7fe;
							opacity: 1;
							">
								暂无数据
							</p>

							<p v-else style="
                text-align: center;

                height: 32px;
                font-size: 28px;
                font-family: Source Han Sans CN;
                font-weight: bold;
                margin-top: -30px;
                color: #00e7fe;
                opacity: 1;
              ">
								{{parseFloat(conditioner[1].sensorDate).toFixed(1) }}
							</p>

							<p style="
                text-align: center;
                height: 14px;
                font-size: 14px;
                font-family: Source Han Sans CN;
                font-weight: 400;
                line-height: 24px;
                color: rgba(255, 255, 255, 0.45);
                opacity: 1;
              ">
								V
							</p>

							<p style="
                text-align: center;
                height: 18px;
                margin-top: 10px;
                font-size: 18px;
                font-family: Source Han Sans CN;
                font-weight: 400;
                line-height: 31px;
                color: #ffffff;
                opacity: 1;
              ">
								电压
							</p>
						</div>
					</div>
				</div>
			</div>
			<p style="width: 300px;
            height: 32px;
            font-size: 20px;
            font-family: Source Han Sans CN;
            font-weight: bold;
            line-height: 54px;
            color: #00E7FE;
            margin-left:30px;
            opacity: 1;">碳排放量：{{alldian==''?'暂无数据':
                          parseFloat(alldian[0].sensorDate*0.6671).toFixed(0)}}kgCO₂</p>

			<img style="float:right;margin-right:50px;margin-top:0px" src="../assets//imgs/ewm.png" alt="">
			<!-- <img class="middel" src="../assets/imgs/41.png" alt="" /> -->

			<p style="margin-top:640px;">

				<span style="width: 180px;
	height: 40px;
	background: rgba(60, 74, 145, 0.5);
            font-size: 16px;
            font-family: Source Han Sans CN;
           padding: 10px;
            line-height: 54px;
            color: #00E7FE;
            margin-left:30px;
			
            opacity: 1;">辐射温度：<span style="color:white">{{weather==''?'暂无数据': parseFloat(blackball).toFixed(1)
                                }}℃</span></span>

				<!-- <span style="width: 300px;
        
	height: 40px;
	background: rgba(60, 74, 145, 0.5);
            font-size: 16px;
            font-family: Source Han Sans CN;
           padding: 10px;
            line-height: 54px;
            color: #00E7FE;
            margin-left:30px;
            opacity: 1;">PMV：<span style="color:white">{{parseFloat(pddpmv.pmv).toFixed(2)}}</span></span>

				<span style="width: 300px;
       
	height: 40px;
	background: rgba(60, 74, 145, 0.5);
            font-size: 16px;
            font-family: Source Han Sans CN;
           padding: 10px;
            line-height: 54px;
            color: #00E7FE;
            margin-left:30px;
            opacity: 1;">PPD：<span style="color:white">{{parseFloat(pddpmv.ppd).toFixed(0)}}%</span></span>
				<table class="tb" border cellpadding="0" cellspacing="0" style="color: #00E7FE;margin-left: 30px;">
					<tr>
						<td style="width: 800px;">热舒适指标</td>
						<td>热</td>
						<td>暖</td>
						<td>微暖</td>
						<td>适中</td>
						<td>微凉</td>
						<td>凉</td>
						<td>冷</td>
					</tr>
					<tr>
						<td>PMV值</td>
						<td>+3</td>
						<td>+2</td>
						<td>+1</td>
						<td>0</td>
						<td>-1</td>
						<td>-2</td>
						<td>-3</td>
					</tr>
				</table> -->

			</p>

			<p style="font-size: 16px;
font-family: Source Han Sans CN;
font-weight: 300;
line-height: 27px;
margin-top:15px;
color:#FFFFFF;text-align:center">数据来源:西安建筑科技大学·绿色建筑评估研究中心</p>


		</div>
		<div class="three">
			<div class="right3" style="flex: 1.1">
				<div class="zbcs"></div>
				<span class="wz">国家气象总局-西安实时数据</span>
				<div class="left4s">
					<div>
						<p class="listbottom">
							<span style="
                  flex: 1;
                  font-size: 14px;
                  font-family: Source Han Sans CN;
                  font-weight: 500;
                  line-height: 28px;
                  color: #00a2ff;
                  opacity: 1;
                  margin-left: 10px;
                ">温度</span>
							<span style="flex: 1">{{dtweather.weather.temperature}}</span>
							<span style="flex: 1">℃</span>
						</p>
						<p class="listbottom">
							<span style="
                  flex: 1;
                  font-size: 14px;
                  font-family: Source Han Sans CN;
                  font-weight: 500;
                  line-height: 28px;
                  color: #00a2ff;
                  opacity: 1;
                  margin-left: 10px;
                ">湿度</span>
							<span style="flex: 1">{{dtweather.weather.humidity}}</span>
							<span style="flex: 1">%RH</span>
						</p>
						<p class="listbottom">
							<span style="
                  flex: 1;
                  font-size: 14px;
                  font-family: Source Han Sans CN;
                  font-weight: 500;
                  line-height: 28px;
                  color: #00a2ff;
                  opacity: 1;
                  margin-left: 10px;
                ">风速</span>
							<span style="flex: 1">{{dtweather.wind.speed}}</span>
							<span style="flex: 1">m/s</span>
						</p>
						<p class="listbottom">
							<span style="
                  flex: 1;
                  font-size: 14px;
                  font-family: Source Han Sans CN;
                  font-weight: 500;
                  line-height: 28px;
                  color: #00a2ff;
                  opacity: 1;
                  margin-left: 10px;
                ">风向</span>
							<span style="flex: 1">{{dtweather.wind.direct}}/{{dtweather.wind.power}}</span>

						</p>
					</div>

					<div>
						<p class="listbottom">
							<span style="
                  flex: 1;
                  font-size: 14px;
                  font-family: Source Han Sans CN;
                  font-weight: 500;
                  line-height: 28px;
                  color: #00a2ff;
                  opacity: 1;
                  margin-left: 10px;
                ">体感温度</span>
							<span style="flex: 1">{{dtweather.weather.feelst}}</span>
							<span style="flex: 1">℃</span>
						</p>
						<p class="listbottom">
							<span style="
                  flex: 1;
                  font-size: 14px;
                  font-family: Source Han Sans CN;
                  font-weight: 500;
                  line-height: 28px;
                  color: #00a2ff;
                  opacity: 1;
                  margin-left: 10px;
                ">舒适度</span>
							<span style="flex: 1">{{dtweather.weather.rcomfort}}</span>
							<span style="flex: 1"></span>
						</p>
						<p class="listbottom">
							<span style="
                  flex: 1;
                  font-size: 14px;
                  font-family: Source Han Sans CN;
                  font-weight: 500;
                  line-height: 28px;
                  color: #00a2ff;
                  opacity: 1;
                  margin-left: 10px;
                ">AQI</span>
							<span style="flex: 1">{{dtweathers}}</span>
							<span style="flex: 1"></span>
						</p>

					</div>

				</div>



			</div>

			<div class="right3" style="flex: 1.1">
				<div class="zbcs"></div>
				<span class="wz">高新·天谷雅舍室外无人值守气象站数据</span>
				<div class="left4s">
					<div>
						<p class="listbottom">
							<span style="
                  flex: 1;
                  font-size: 14px;
                  font-family: Source Han Sans CN;
                  font-weight: 500;
                  line-height: 28px;
                  color: #00a2ff;
                  opacity: 1;
                  margin-left: 10px;
                ">温度</span>
							<span style="flex: 1">{{weather==''?'暂无数据': parseFloat(weather[0].sensorDate).toFixed(1)
                                }}</span>
							<span style="flex: 1">{{weather==''?'':'℃'}}</span>
						</p>
						<p class="listbottom">
							<span style="
                  flex: 1;
                  font-size: 14px;
                  font-family: Source Han Sans CN;
                  font-weight: 500;
                  line-height: 28px;
                  color: #00a2ff;
                  opacity: 1;
                  margin-left: 10px;
                ">湿度</span>
							<span style="flex: 1">{{weather==''?'暂无数据': parseFloat(weather[1].sensorDate).toFixed(0)
                                }}</span>
							<span style="flex: 1">{{weather==''?'':'%RH'}}</span>
						</p>
						<p class="listbottom">
							<span style="
                  flex: 1;
                  font-size: 14px;
                  font-family: Source Han Sans CN;
                  font-weight: 500;
                  line-height: 28px;
                  color: #00a2ff;
                  opacity: 1;
                  margin-left: 10px;
                ">风速</span>
							<span style="flex: 1">{{weather==''?'暂无数据': parseFloat(weather[6].sensorDate).toFixed(1)
                                }}</span>
							<span style="flex: 1">{{weather==''?'':'m/s'}}</span>
						</p>
						<p class="listbottom">
							<span style="
                  flex: 1;
                  font-size: 14px;
                  font-family: Source Han Sans CN;
                  font-weight: 500;
                  line-height: 28px;
                  color: #00a2ff;
                  opacity: 1;
                  margin-left: 10px;
                ">风向</span>
							<span style="flex: 1">{{weather==''?'暂无数据': fx }}</span>
						</p>
					</div>

					<div>
						<p class="listbottom">
							<span style="
                  flex: 1;
                  font-size: 14px;
                  font-family: Source Han Sans CN;
                  font-weight: 500;
                  line-height: 28px;
                  color: #00a2ff;
                  opacity: 1;
                  margin-left: 10px;
                ">PM2.5</span>
							<span style="flex: 1">{{weather==''?'暂无数据': parseFloat(weather[4].sensorDate).toFixed(0)
                                }}</span>
							<span style="flex: 1">{{weather==''?'':'μg/m³'}}</span>
						</p>
						<p class="listbottom">
							<span style="
                  flex: 1;
                  font-size: 14px;
                  font-family: Source Han Sans CN;
                  font-weight: 500;
                  line-height: 28px;
                  color: #00a2ff;
                  opacity: 1;
                  margin-left: 10px;
                ">PM10</span>
							<span style="flex: 1">{{weather==''?'暂无数据': parseFloat(weather[5].sensorDate).toFixed(0)
                                }}</span>
							<span style="flex: 1">{{weather==''?'':'μg/m³'}}</span>
						</p>
						<p class="listbottom">
							<span style="
                  flex: 1;
                  font-size: 14px;
                  font-family: Source Han Sans CN;
                  font-weight: 500;
                  line-height: 28px;
                  color: #00a2ff;
                  opacity: 1;
                  margin-left: 10px;
                ">噪声</span>
							<span style="flex: 1">{{weather==''?'暂无数据': parseFloat(weather[2].sensorDate).toFixed(0)
                                }}</span>
							<span style="flex: 1">{{weather==''?'':'dB'}}</span>
						</p>
						<p class="listbottom">
							<span style="
                  flex: 1;
                  font-size: 14px;
                  font-family: Source Han Sans CN;
                  font-weight: 500;
                  line-height: 28px;
                  color: #00a2ff;
                  opacity: 1;
                  margin-left: 10px;
                ">太阳辐射</span>
							<span style="flex: 1">{{weather==''?'暂无数据': parseFloat(weather[8].sensorDate).toFixed(0)
                                }}</span>
							<span style="flex: 1">{{weather==''?'':'W/m²'}}</span>
						</p>
					</div>

				</div>
			</div>


			<div class="right4" style="flex: 0.95">
				<div class="zbcs"></div>
				<span class="wz">厨房环境</span>

				<div class="right1s">
					<div>
						<div style="display:flex;margin: 10px;">
							<div
								style="flex:1;line-height:30px;height:36px;width: 80px;height: 30px;background: #00C193;text-align: center;">
								温度</div>
							<div
								style="flex:1.5;line-height:30px;width: 120px;height: 30px;;background: rgba(60, 74, 145, 0.1);text-align: center;">
								{{ zhuwei==''?'暂无数据': parseFloat(zhuwei[0].sensorDate).toFixed(1)+'℃' }}
							</div>
						</div>
						<div style="display:flex;line-height:30px;margin: 10px;">
							<div
								style="flex:1;line-height:30px;height:36px;width: 80px;height: 30px;;background: #00C193;text-align: center;">
								湿度</div>
							<div
								style="flex:1.5;width: 120px;height: 30px;;background: rgba(60, 74, 145, 0.1);text-align: center;">
								{{zhuwei==''?'暂无数据': parseFloat(zhuwei[1].sensorDate).toFixed(0) +'%RH'}}
							</div>
						</div>
						<div style="display:flex;line-height:30px;margin: 10px;">
							<div
								style="flex:1;height:36px;width: 80px;height: 30px;;background: #00C193;text-align: center;">
								CO₂</div>
							<div
								style="flex:1.5;line-height:30px;width: 120px;height: 30px;;background: rgba(60, 74, 145, 0.1);text-align: center;">
								{{zhuwei==''?'暂无数据': parseFloat(zhuwei[2].sensorDate).toFixed(0)+'ppm' }}
							</div>
						</div>
					</div>

					<div>
						<div style="display:flex;margin: 10px;">
							<div
								style="flex:1;line-height:30px;height:36px;width: 80px;height: 30px;;background: #00C193;text-align: center;">
								PM2.5</div>
							<div
								style="flex:1.5;line-height:30px;width: 120px;height: 30px;;background: rgba(60, 74, 145, 0.1);text-align: center;">
								{{ zhuwei==''?'暂无数据':parseFloat(zhuwei[4].sensorDate).toFixed(0)+'μg/m³' }}
							</div>
						</div>
						<div style="display:flex;margin: 10px;">
							<div
								style="flex:1;line-height:30px;height:36px;width: 80px;height: 30px;;background: #00C193;text-align: center;">
								PM10</div>
							<div
								style="flex:1.5;line-height:30px;width: 120px;height: 30px;;background: rgba(60, 74, 145, 0.1);text-align: center;">
								{{zhuwei==''?'暂无数据': parseFloat(zhuwei[3].sensorDate).toFixed(0) +'μg/m³'}}
							</div>
						</div>
					</div>
				</div>
			</div>


			<div class="right4" style="flex: 0.95">
				<div class="zbcs"></div>
				<span class="wz">老人房环境</span>

				<div class="right1s">
					<div>
						<div style="display:flex;margin: 10px;">
							<div
								style="flex:1;line-height:30px;height:36px;width: 80px;height: 30px;background: #00C193;text-align: center;">
								温度</div>
							<div
								style="flex:1.5;line-height:30px;width: 120px;height: 30px;;background: rgba(60, 74, 145, 0.1);text-align: center;">
								{{ laorenfang==''?'暂无数据': parseFloat(laorenfang[0].sensorDate).toFixed(1)+'℃' }}
							</div>
						</div>
						<div style="display:flex;line-height:30px;margin: 10px;">
							<div
								style="flex:1;line-height:30px;height:36px;width: 80px;height: 30px;;background: #00C193;text-align: center;">
								湿度</div>
							<div
								style="flex:1.5;width: 120px;height: 30px;;background: rgba(60, 74, 145, 0.1);text-align: center;">
								{{laorenfang==''?'暂无数据': parseFloat(laorenfang[1].sensorDate).toFixed(0) +'%RH'}}
							</div>
						</div>
						<div style="display:flex;line-height:30px;margin: 10px;">
							<div
								style="flex:1;height:36px;width: 80px;height: 30px;;background: #00C193;text-align: center;">
								CO₂</div>
							<div
								style="flex:1.5;line-height:30px;width: 120px;height: 30px;;background: rgba(60, 74, 145, 0.1);text-align: center;">
								{{laorenfang==''?'暂无数据': parseFloat(laorenfang[2].sensorDate).toFixed(0)+'ppm' }}
							</div>
						</div>
					</div>

					<div>
						<div style="display:flex;margin: 10px;">
							<div
								style="flex:1;line-height:30px;height:36px;width: 80px;height: 30px;;background: #00C193;text-align: center;">
								PM2.5</div>
							<div
								style="flex:1.5;line-height:30px;width: 120px;height: 30px;;background: rgba(60, 74, 145, 0.1);text-align: center;">
								{{ laorenfang==''?'暂无数据':parseFloat(laorenfang[4].sensorDate).toFixed(0)+'μg/m³' }}
							</div>
						</div>
						<div style="display:flex;margin: 10px;">
							<div
								style="flex:1;line-height:30px;height:36px;width: 80px;height: 30px;;background: #00C193;text-align: center;">
								PM10</div>
							<div
								style="flex:1.5;line-height:30px;width: 120px;height: 30px;;background: rgba(60, 74, 145, 0.1);text-align: center;">
								{{laorenfang==''?'暂无数据': parseFloat(laorenfang[3].sensorDate).toFixed(0) +'μg/m³'}}
							</div>
						</div>
					</div>
				</div>
			</div>



			<div class="right4" style="flex: 1">
				<div class="zbcs"></div>
				<span class="wz">老人房卫环境</span>

				<div class="right1s">
					<div>
						<div style="display:flex;margin: 10px;">
							<div
								style="flex:1;line-height:30px;height:36px;width: 80px;height: 30px;background: #5F50E5;text-align: center;">
								温度</div>
							<div
								style="flex:1.5;line-height:30px;width: 120px;height: 30px;;background: rgba(60, 74, 145, 0.1);text-align: center;">
								{{ zhuwei1==''?'暂无数据': parseFloat(zhuwei1[0].sensorDate).toFixed(1)+'℃' }}
							</div>
						</div>
						<div style="display:flex;line-height:30px;margin: 10px;">
							<div
								style="flex:1;line-height:30px;height:36px;width: 80px;height: 30px;;background: #5F50E5;text-align: center;">
								湿度</div>
							<div
								style="flex:1.5;width: 120px;height: 30px;;background: rgba(60, 74, 145, 0.1);text-align: center;">
								{{zhuwei1==''?'暂无数据': parseFloat(zhuwei1[1].sensorDate).toFixed(0) +'%RH'}}
							</div>
						</div>
						<div style="display:flex;line-height:30px;margin: 10px;">
							<div
								style="flex:1;height:36px;width: 80px;height: 30px;;background: #5F50E5;text-align: center;">
								CO₂</div>
							<div
								style="flex:1.5;line-height:30px;width: 120px;height: 30px;;background: rgba(60, 74, 145, 0.1);text-align: center;">
								{{zhuwei1==''?'暂无数据': parseFloat(zhuwei1[2].sensorDate).toFixed(0)+'ppm' }}
							</div>
						</div>
					</div>

					<div>
						<div style="display:flex;margin: 10px;">
							<div
								style="flex:1;line-height:30px;height:36px;width: 80px;height: 30px;;background: #5F50E5;text-align: center;">
								PM2.5</div>
							<div
								style="flex:1.5;line-height:30px;width: 120px;height: 30px;;background: rgba(60, 74, 145, 0.1);text-align: center;">
								{{ zhuwei1==''?'暂无数据':parseFloat(zhuwei1[4].sensorDate).toFixed(0)+'μg/m³' }}
							</div>
						</div>
						<div style="display:flex;margin: 10px;">
							<div
								style="flex:1;line-height:30px;height:36px;width: 80px;height: 30px;;background: #5F50E5;text-align: center;">
								PM10</div>
							<div
								style="flex:1.5;line-height:30px;width: 120px;height: 30px;;background: rgba(60, 74, 145, 0.1);text-align: center;">
								{{zhuwei1==''?'暂无数据': parseFloat(zhuwei1[3].sensorDate).toFixed(0) +'μg/m³'}}
							</div>
						</div>
					</div>
				</div>
			</div>

		</div>
	</div>
</template>
<script>
	import axios from 'axios';
	const url = 'https://weixin.baierinfo.com/app';
	
	import {
		comf
	} from '../common/pmvppd/comfortmodels.js';
	export default {
		data() {
			return {
				blackball:0,
				alldian: "",
				conditioner: '',
				Lighting: '',
				weather: '',
				chashi: '',
				shufang: '',
				zhuwo: '',
				qixiang: '',
				keting: '',
				laorenfang: '',
				fx: '',
				dtweather: '',
				dtweathers: '',
				shows: '',
				zhuwei: '',
				zhuwei1: '',
				pddpmv: []
			};
		},
		created() {

		},
		mounted() {

			this.shows = localStorage.setItem('shows', false);
			// this.shows=localStorage.getItem('shows')
			// console.log(this.shows)
			this.getData()
			this.getconditioner()
			this.getLighting()
			this.getweather()
			this.getbedroom()
			this.getbedroom1()
			this.getbedroom2()
			this.getbedroom3()
			this.getbedroom4()
			this.getbedroom5()
			this.getbedroom6()
			this.getqixiang()
				this.fushewendu()
			this.getqixiang1()
			window.setInterval(() => {
				this.getData()
				this.getconditioner()
				this.getLighting()
				this.getweather()
				this.getbedroom()
				this.getbedroom1()
				this.getbedroom2()
				this.getbedroom3()
				this.getbedroom4()
				this.getbedroom5()
				this.getbedroom6()
				this.getqixiang()
				this.getqixiang1()
					this.fushewendu()
			}, 300000);

		},
		methods: {

			getData() {

				axios.get(`${url}/getEnvironData?sensornum=tgyy220401&equipmentId=5`, {
					params: {

					}
				}).then((res) => {
					// console.log(res.data.list,'9999');
					this.alldian = res.data.list
				}).catch(function (error) {
					console.log(error);
				});
			},
			getconditioner() {
				axios.get(`${url}/getEnvironData?sensornum=tgyy220402&equipmentId=4`, {
					params: {

					}
				}).then((res) => {
					// console.log(res.data.list, 111);
					this.conditioner = res.data.list
				}).catch(function (error) {
					console.log(error);
				});
			},

			getLighting() {
				axios.get(`${url}/getEnvironData?sensornum=tgyy220403&equipmentId=4`, {
					params: {

					}
				}).then((res) => {

					this.Lighting = res.data.list
				}).catch(function (error) {
					console.log(error);
				});
			},
			getweather() {
				axios.get(`${url}/getEnvironData?sensornum=tgyy2205oe01&equipmentId=3`, {
					params: {

					}
				}).then((res) => {

					if (res.data.list[7].sensorDate == 0) {
						this.fx = "北风"
					} else if (res.data.list[7].sensorDate == 1) {
						this.fx = "东北风"
					} else if (res.data.list[7].sensorDate == 2) {
						this.fx = "东风"
					} else if (res.data.list[7].sensorDate == 3) {
						this.fx = "东南风"
					} else if (res.data.list[7].sensorDate == 4) {
						this.fx = "南风"
					} else if (res.data.list[7].sensorDate == 5) {
						this.fx = "西南风"
					} else if (res.data.list[7].sensorDate == 6) {
						this.fx = "西风"
					} else if (res.data.list[7].sensorDate == 7) {
						this.fx = "西北风"
					}
					this.weather = res.data.list
				}).catch(function (error) {
					console.log(error);
				});
			},
			//茶室
			getbedroom() {
				axios.get(`${url}/getEnvironData?sensornum=BR86ENV042702&equipmentId=1`, {
					params: {

					}
				}).then((res) => {
					// console.log(res,'茶室')
					this.chashi = res.data.list
				}).catch(function (error) {
					console.log(error);
				});
			},
			//书房
			getbedroom1() {
				axios.get(`${url}/getEnvironData?sensornum=BR86ENV042703&equipmentId=1`, {
					params: {

					}
				}).then((res) => {
					// console.log(res,'书房') 
					this.shufang = res.data.list
				}).catch(function (error) {
					console.log(error);
				});
			},
			//主卧
			getbedroom2() {
				axios.get(`${url}/getEnvironData?sensornum=BR86ENV042704&equipmentId=1`, {
					params: {

					}
				}).then((res) => {
					// console.log(res,'主卧')
					this.zhuwo = res.data.list
				}).catch(function (error) {
					console.log(error);
				});
			},


			//客厅
			getbedroom3() {
				axios.get(`${url}/getEnvironData?sensornum=BR86ENV042701&equipmentId=1`, {
					params: {

					}
				}).then((res) => {
					// console.log(res,'客厅')
					this.keting = res.data.list

					// console.info(comf.pmvElevatedAirspeed(parseFloat(res.data.list[0].sensorDate), parseFloat(this.weather[3].sensorDate), 0.1, parseFloat(res.data.list[1].sensorDate), 1, 0.5, 0));
					this.pddpmv = (comf.pmvElevatedAirspeed(parseFloat(res.data.list[0].sensorDate), parseFloat(
							this.weather[3].sensorDate), 0.1, parseFloat(res.data.list[1].sensorDate), 1,
						0.5, 0));
					// console.log(this.pddpmv )	
				}).catch(function (error) {
					console.log(error);
				});
			},

			//老人房
			getbedroom4() {
				axios.get(`${url}/getEnvironData?sensornum=BR86ENV042705&equipmentId=1`, {
					params: {

					}
				}).then((res) => {
					// console.log(res,'老人房')
					this.laorenfang = res.data.list
				}).catch(function (error) {
					console.log(error);
				});
			},

			//厨房
			getbedroom5() {
				axios.get(`${url}/getEnvironData?sensornum=BR86ENV042706&equipmentId=1`, {
					params: {

					}
				}).then((res) => {
					// console.log(res,'老人房')
					this.zhuwei = res.data.list
				}).catch(function (error) {
					console.log(error);
				});
			},
			//老人房卫
			getbedroom6() {
				axios.get(`${url}/getEnvironData?sensornum=BR86ENV042707&equipmentId=1`, {
					params: {

					}
				}).then((res) => {
					// console.log(res,'老人房')
					this.zhuwei1 = res.data.list
				}).catch(function (error) {
					console.log(error);
				});
			},
			getqixiang() {
				// axios.get('/api/', this.ruleForm)
				//     .then((res) => {
				//         console.log(res)
				//     })
				//     .catch((error) => {
				//         console.log(error)
				//     })
				axios.get('/api/f/rest/real/57036.json').then(res => {
					// console.log(res.data.weather)
					// console.log(res)
					this.dtweather = res.data

				})



			},
			//辐射温度
			
			fushewendu() {
				axios.get(`${url}/getEnvironData?sensornum=tgyyblackball01&equipmentId=3`, {
					params: {

					}
				}).then((res) => {
					// console.log(res,'辐射温度')
					this.blackball=res.data.list[0].sensorDate
					// this.zhuwo = res.data.list
				}).catch(function (error) {
					console.log(error);
				});
			},
			getqixiang1() {
				// axios.get('/api/', this.ruleForm)
				//     .then((res) => {
				//         console.log(res)
				//     })
				//     .catch((error) => {
				//         console.log(error)
				//     })
				axios.get('/api/f/rest/aqi/57036.json').then(res => {
					// console.log(res.data.weather)
					// console.log(res)
					this.dtweathers = res.data.aqi

				})



			},
		}
	};
</script>
<style lang="scss" scoped>
	* {
		margin: 0;
		padding: 0;
	}

	.right1s {
		display: flex;
		height: 130px;

		font-size: 16px;
		font-family: Source Han Sans CN;
		font-weight: 500;
		line-height: 27px;
		color: #FFFFFF;
		opacity: 1;
		margin-top: -30px;

		div {
			flex: 1;

			p {

				height: 16px;
				font-size: 16px;
				font-family: Source Han Sans CN;
				font-weight: 500;
				line-height: 27px;
				color: #FFFFFF;
				opacity: 1;


			}
		}

	}

	.middel {}

	.left4s {
		display: flex;

		div {
			flex: 1;
			height: 130px;
			margin: 7px;
			margin-top: -16px
		}
	}

	.lefts2 {
		display: flex;

		div {
			flex: 1;



			opacity: 1;
			margin: 10px;
		}
	}

	.list1 {
		display: flex;
		flex: 1;
		margin-top: -25px;
		margin-left: 10px;
		height: 14px;
		font-size: 14px;
		font-family: Source Han Sans CN;
		font-weight: 400;
		line-height: 24px;
		color: rgba(255, 255, 255, 0.45);
		opacity: 1;

	}

	.list2 {
		span {
			height: 14px;
			font-size: 14px;
			font-family: Source Han Sans CN;
			font-weight: 400;
			line-height: 24px;
			color: #ffffff;
			opacity: 1;
		}

		width: 290px;
		height: 30px;
		margin-left: 10px;
		margin-top: 6px;
		background: rgba(60, 74, 145, 0.1);
		opacity: 1;

		display: flex;
		flex: 1;
	}

	.listbottom {
		span {
			height: 14px;
			font-size: 14px;
			font-family: Source Han Sans CN;
			font-weight: 400;
			line-height: 28px;
			color: #ffffff;
			opacity: 1;
		}

		height: 28px;
		margin-left: 10px;
		margin-top: 3px;
		background: rgba(60, 74, 145, 0.1);
		opacity: 1;

		display: flex;
		flex: 1;
	}

	.wz {
		width: 72px;

		font-size: 18px;
		font-family: Source Han Sans CN;
		font-weight: 400;
		line-height: 31px;
		color: #ffffff;
		opacity: 1;
		position: relative;
		left: 30px;
		top: -25px;
	}

	.left1 {
		background-image: url(~@/assets/imgs/1-1.png);
		background-size: 471.5px 210px;
		background-repeat: no-repeat;


	}

	.left2 {
		background-image: url(~@/assets/imgs/1-5.png);
		background-repeat: no-repeat;
		background-size: 471.5px 162px;

	}

	.left3 {
		background-image: url(~@/assets/imgs/1-5.png);
		background-repeat: no-repeat;
		background-size: 471.5px 162px;

	}

	.left4 {
		background-image: url(~@/assets/imgs/1-5.png);
		background-repeat: no-repeat;
		background-size: 471.5px 162px;

	}

	.right1 {
		background-image: url(~@/assets/imgs/1-5.png);
		background-repeat: no-repeat;

	}

	.right2 {
		background-image: url(~@/assets/imgs/1-2.png);
		background-repeat: no-repeat;

	}

	.right3 {
		background-image: url(~@/assets/imgs/1-4.png);
		background-repeat: no-repeat;
		background-size: 471.5px 186px;

	}

	.right4 {
		background-image: url(~@/assets/imgs/1-5.png);
		background-repeat: no-repeat;
		background-size: 471.5px 162px;
	}

	.zbcs {
		margin-left: 1.25rem;
		margin-top: 0.5rem;
		width: 4px;
		height: 18px;
		background: rgba(57, 255, 255, 0.39);
		opacity: 1;
	}

	.tb,
	.tb td {
		border: 0.1px solid #00e7fe;
		width: 400px;
		height: 10px;
		text-align: center;
	}

	.midd {
		flex: 1;
		background-image: url(~@/assets/imgs/1-4.png);
		background-repeat: no-repeat;
		background-size: 420.5px 141.42px;
		height: 141.42px;
		margin: 0 25px;

	}

	.nr {

		height: 59.375rem;

		display: flex;

		.one {
			flex: 1;
			margin-left: 10px;
			// border: 1px solid blue;
			display: flex;
			flex-direction: column;

			div {
				// border: 1px solid red;
			}
		}

		.two {
			flex: 2;
			background-image: url(../assets/imgs/41.png);
			background-repeat: no-repeat;
			background-position: center;
			background-position-y: 70%;
		}

		.three {
			flex: 1;
			// border: 1px solid blue;
			display: flex;
			flex-direction: column;
			margin-right: 10px;

			div {
				// border: 1px solid red;
			}
		}
	}
</style>