var jayfunction = function() {
	//UI control
	var $doc,$win,$html,$body;
	
	$doc = $(document);
	
    /* 页面切换开始 */
// page transitions
	var $main = $( '#wrapper' ),
		$pages = $main.children( 'div.layout' ),
		//$iterate = $( '.rems-logo-box' ),
		animcursor = getRandomArbitrary(1,67), // random 67 num
		//animcursor = globalRandomNum, // random 67 num
		pagesCount = $pages.length,
		current = 0,
		isAnimating = false,
		endCurrPage = false,
		endNextPage = false,
		animEndEventNames = {
			'WebkitAnimation' : 'webkitAnimationEnd',
			'OAnimation' : 'oAnimationEnd',
			'msAnimation' : 'MSAnimationEnd',
			'animation' : 'animationend'
		},
		// animation end event name
		animEndEventName = animEndEventNames[ Modernizr.prefixed( 'animation' ) ],
		// support css animations
		support = Modernizr.cssanimations;

    /* 页面切换结束 */

	(function tab() {
		var index = "";
		var $this;
		var $target = $(".toggle-tabs-001 > .tablayout");
		return $doc.on("click", ".subhead-tab-warp > .tabs", function(e) {
			$this = $(this);
			index = $this.index();
			$this.addClass("cur").siblings().removeClass("cur");
			$target.eq(index).addClass("cur").siblings().removeClass("cur");
		});
	})();
	
	window.pageName = "index";

	if (typeof pageName != 'undefined' && pageName == "index") {
		require([
			"http://cdn.bootcss.com/Swiper/3.0.6/js/swiper.min.js",
			"css!http://cdn.bootcss.com/Swiper/3.0.6/css/swiper.min"
		],function(){
			
			
			var jsonDataRight = {};
			$doc.on("index_jsonload", function(e) {
				console.log(jsonDataRight)
				var $div = $("<div>");
				$.each(jsonDataRight, function(i,data){
					var _location = data.address;
					var _locationName = data.projectname;
					var _protype = data.industryclassname;
					var _pic =  (function() {
						var defimg = "images/loacationimg00.jpg"
						if (data.projectid == "1") {
							defimg = "images/loacationimg01.jpg"
						}
						if (data.projectid == "3") {
							defimg = "images/loacationimg02.jpg"
						}
						if (data.projectid == "4") {
							defimg = "images/loacationimg03.jpg"
						}
						return defimg
					})();
					
					
					var _m = 12,_y =2015
					
					var _buildingarea = data.buildingarea;
					var _supplyarea = data.supplyarea;
					
					var _refh = data.longitude;
					var _refv = data.latitude;
					
					
					//百度地图
					var point = new BMap.Point(_refh,_refv);  // 创建点坐标  
					var myIcon = new BMap.Icon("images/icon-location-1.png", new BMap.Size(69,102));
					var marker2 = new BMap.Marker(point,{icon:myIcon});  // 创建标注
					bdmap.addOverlay(marker2);     
					
					
					var template =
					//'<a class="swiper-slide irhitemsheight" href="page1.html" refh="'+_refh+'" refv="'+_refv+'" >'+
					'<div class="swiper-slide irhitemsheight" refh="'+_refh+'" refv="'+_refv+'" >'+
					'	<div class="mapview-line-hov">'+
					'		<div class="mapview-line-cycle">'+
					'			<div class="icon-loaction"></div>'+
					'		</div>'+
					'		<div class="mv-local">'+_location+'</div>'+
					'		<div class="mv-localname">'+_locationName+'</div>'+
					'	</div>'+
					'	<div class="mapview-right-text-wrap">'+
					'		<div class="inner-cycle-top flexmid">'+
					'			<p>'+_buildingarea+' ㎡</p>'+
					'			<h2>建筑</h2>'+
					'		</div>'+
					'		<div class="inner-cycle-bot flexmid">'+
					'			<h2>供能</h2>'+
					'			<p>'+_supplyarea+' ㎡</p>'+
					'		</div>'+
					'		<span class="inner-text">'+
					'			<i class="it-line-hov"></i>'+
					'			<em>'+_protype+'</em>'+
					'		</span>'+
					'	</div>'+
					'	<div class="mapview-cycle-wrap">'+
					'		<div class="mapview-cycle"><img src="'+_pic+'" alt="">'+
					'			<div class="mpv-cycle-detail flexmid">'+
					'				<h3>二氧化碳排放总量 (kg)</h3>'+
					'				<p>21321321132231</p>'+
					'				<h3>成本总量 (rmb)</h3>'+
					'				<p>21321321132231</p>'+
					'				<h3>用电总量 (kwh)</h3>'+
					'				<p>21321321132231</p>'+
					'			</div>'+
					'		</div>'+
					'		<div class="mapview-cycle-tips">'+
					'			<div class="icon-si flexmid">'+
					'				<img src="images/icon-bulid-1.png" alt="">'+
					'			</div>'+
					'			<div class="text-date flexmid">'+
					'				<h2>'+_m+'</h2>'+
					'				<p>'+_y+'</p>'+
					'			</div>'+
					'		</div>'+
					'	</div>'+
					'	</div>';
					//'	</div>'+
					//'</a>';
					$div.append(template);
					template = ""
				})
				
				$("#index_right_swiper .swiper-wrapper").html($div.html())
				$div = null;
				jsonDataRight = null;
				var INDEX_RIGHT_SWIPER = new Swiper("#index_right_swiper", {
					direction:"vertical",
					nextButton:"#slider_next",
					prevButton:"#slider_prew",
					mousewheelControl: true,
					slidesPerView: 3
				});


			})
			
			
			
			$.ajax({
				type : "get",
				async:true,
				url : "ajaxsample/gislist.js",
				dataType : "jsonp",
				jsonp: "callback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
				jsonpCallback:"define",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
				success : function(json){
					jsonDataRight = json;
					$doc.trigger("index_jsonload")
				},
					error:function(){
					alert('加载数据失败');
				}
			});
		
			
			
			
			
			var INDEX_LEFT_SWIPER = new Swiper("#index_left_swiper", {
				slidesPerView: 1,
				slidesPerColumn: 3,
				paginationHide:false,
				mousewheelControl: true,
				paginationClickable: true,
				pagination:"#ils_pages"
			});
			
			
			
			
		    $('#goHome').on('click', function(e) {
            
                    window.pageName = "index";

                    if(window.pageName == "index")
                        $('#unityPlayer').css({'visibility':'hidden'}) // 隐藏3d
                    switchPage(); //切换页面         
            });	
			$("#index_right_swiper").on("click", ".swiper-slide", function(e) {
				var $this = $(this);
				var _relh = $this.attr("refh");
				var _relv = $this.attr("refv");
				var point = new BMap.Point( Number(_relh),Number(_relv) );
//				console.log(point)
				bdmap.centerAndZoom(point,20);
				var _actclass = "mapview-active"
				if ( !$this.hasClass(_actclass) ){
					$this.addClass(_actclass).siblings().removeClass(_actclass);
					e.preventDefault();
				} else {
                    window.pageName = "page01";
                    if(window.pageName == "page01")
                        $('#unityPlayer').css({'visibility':'visible'}) // 隐藏3d
                    switchPage(); //切换页面         
                }
			});
			
		});
		
		/*var mapchartoption = {
			color:["#f3f8fe"],
			tooltip : {
				show:false,
				trigger: 'item',
        		showDelay: 0
			},
			series:[
				{
					
					type: 'map',
					mapType: 'china',
					roam: false,
					itemStyle:{
						normal:{
							color:["#f3f8fe"],	
							borderWidth:4,
							borderColor:"#7a8ea8",
							label:{
								show:true,
								textStyle: {
									fontWeight:'normal',
									fontSize:48
								}
							}
						},
						emphasis:{
							color:["#328dde"],
							label:{
								
								show:true
							}
						}
					},
					data:[]
				}
			]
		}
		var mapchart= echarts.init(document.getElementById('Amapcontent'));
		mapchart.setOption(mapchartoption)*/
		
	}//index end
	
	$doc.on("click", ".ctr-button", function() {
		$(".xa-bottom-layout").toggleClass("show")
	});
	if (typeof pageName != 'undefined' ) {
		require([
			"css!http://cdn.bootcss.com/bootstrap-datepicker/1.4.0/css/bootstrap-datepicker.standalone.min.css",
			"css!http://cdn.bootcss.com/bootstrap-datepicker/1.4.0/css/bootstrap-datepicker3.standalone.min.css",
			"http://cdn.bootcss.com/bootstrap-datepicker/1.4.0/js/bootstrap-datepicker.min.js"
		],function() {
			require([
			"http://cdn.bootcss.com/bootstrap-datepicker/1.4.0/locales/bootstrap-datepicker.zh-CN.min.js"],function(e) {
				$('.dateinput-year').datepicker({
					startView:2,
					minViewMode:2,
					format:'yyyy',
					language:"zh-CN"
				});
				$('.dateinput-months').datepicker({
					startView:1,
					minViewMode:1,
					format:'mm',
					language:"zh-CN"
				});
				$('.dateinput-day').datepicker({
					startView:0,
					minViewMode:0,
					format:'dd',
					language:"zh-CN"
				});
			})
			
		});
//		alert(document.documentElement.clientWidth)
//		alert(document.documentElement.clientHeight)
		
	} if (typeof pageName == 'undefined') {
		throw new Error('没有定义页面名称')
	}
	
	var $xa_modal_overlay = $(".xa-modal-overlay"),
		$xa_modal_wrapper = $(".xa-modal-wrapper");
		
	
	$doc.on("click", ".clsbtn", function(e) {
		$xa_modal_wrapper.on("animationend.ane webkitAnimationEnd.ane", function(e) {
			$xa_modal_wrapper.addClass("modal-hide");
			$xa_modal_wrapper.removeClass("modal-hidding");
			$doc.trigger("modalhide");
			$xa_modal_wrapper.off(".ane");
		});
		$xa_modal_wrapper.addClass("modal-hidding");
		$xa_modal_overlay.addClass("modal-overlay-hide");

        $('#unityPlayer').css({'visibility':'visible'}); // 显示3d
	});
	
	function showModal(callback) {
		$xa_modal_wrapper.on("animationend.ane webkitAnimationEnd.ane", function() {
			$xa_modal_wrapper.removeClass("modal-showing");
			$doc.trigger("modalshow");
			if (typeof callback == "function") {
				callback();
			}
			$xa_modal_wrapper.off(".ane");
		});
		$xa_modal_wrapper.removeClass("modal-hide");
		$xa_modal_wrapper.addClass("modal-showing");
		$xa_modal_overlay.removeClass("modal-overlay-hide")
        $('#unityPlayer').css({'visibility':'hidden'}) // 隐藏3d
	}
	
	
	
	var $modalinnerChartWrap = $("#chartinner");
	var modalchartobj ;
	$doc.on("click", "#showModal_1", function() {
		modalchartobj = null;
		$modalinnerChartWrap[0].innerHTML= "";
		function show_1_callback() {
			console.log("show 1 call back");
			modalchartobj = echarts.init(document.getElementById('chartinner'), defaultTheme);
			modalchartobj.setOption(optionModal);
		}
		showModal(show_1_callback);
	}).on("click", "#showModal_2",function() {
		function show_2_callback() {
			console.log("show 1 call back")
		}
		showModal(show_2_callback);
	}).on("click", "#showModal_3",function() {
		function show_3_callback() {
			console.log("show 1 call back")
		}
		showModal(show_3_callback);
	}).on("click", "#showModal_4",function() {
		modalchartobj = null;
		$modalinnerChartWrap[0].innerHTML= "";
		function show_4_callback() {
			console.log("show 4 call back");
			modalchartobj = echarts.init(document.getElementById('chartinner'), defaultTheme);
			modalchartobj.setOption(optionModal2);
			
		}
		showModal(show_4_callback);
	}).on("click", "#showModal_5",function() {
		modalchartobj = null;
		$modalinnerChartWrap[0].innerHTML= "";
		var $span1 = $("<span>").html("成本能源结构图").css({
			"position":"absolute",
			"left":"1610px",
			"fontSize":"60px",
			"top":"90px"
		});
		var $span2 = $("<span>").html("收益能源结构图").css({
			"position":"absolute",
			"left":"2320px",
			"fontSize":"60px",
			"top":"90px"
		});
		function show_5_callback() {
			console.log("show 5 call back");
			modalchartobj = echarts.init(document.getElementById('chartinner'), defaultTheme);
			modalchartobj.setOption(optionModal3);
			
			console.log($span1,$span2)
			$modalinnerChartWrap.prepend( $("<div>").attr("id", "tempss").css("position", "relative") )
			$(document.getElementById("tempss")).prepend($span1)
			$(document.getElementById("tempss")).prepend($span2)
		}
		showModal(show_5_callback);
	}).on("click", "#showModal_6",function() {
		function show_6_callback() {
			console.log("show 1 call back")
		}
		showModal(show_6_callback);
	}).on("click", "#showModal_7",function() {
		function show_7_callback() {
			console.log("show 1 call back")
		}
		showModal(show_7_callback);
	}).on("click", "#showModal_8",function() {
		modalchartobj = null;
		$modalinnerChartWrap[0].innerHTML= "";
		var $span1 = $("<span>").html("成本能源结构图").css({
			"position":"absolute",
			"left":"1610px",
			"fontSize":"60px",
			"top":"90px"
		});
		var $span2 = $("<span>").html("收益能源结构图").css({
			"position":"absolute",
			"left":"2320px",
			"fontSize":"60px",
			"top":"90px"
		});
		function show_5_callback() {
			$.ajax({
				type : "get",
				async:true,
				url : "ajaxsample/pop_inc_col.js",
				dataType : "jsonp",
				jsonp: "callback",
				jsonpCallback:"popinc_col",
				success : function(jsoncol){
					
					$.ajax({
						type : "get",
						async:true,
						url : "ajaxsample/pop_inc_pie.js",
						dataType : "jsonp",
						jsonp: "callback",
						jsonpCallback:"popinc_pie",
						success : function(jsonpie){
							$.ajax({
								type : "get",
								async:true,
								url : "ajaxsample/pop_inc_pie2.js",
								dataType : "jsonp",
								jsonp: "callback",
								jsonpCallback:"popinc_pie2",
								success : function(jsonpie2){
									console.log(jsoncol,"dataCOL");
									console.log(jsonpie,"dataPIE");
									console.log(jsonpie2,"dataPIE2");
									
									
									modalchartobj = echarts.init(document.getElementById('chartinner'), defaultTheme);
									var opt = optionModal3;
									var xAxisdata = [];
									var colsdata01 = [];
									var colsdata02 = [];
									var piedata = [];
									var piedata2 = [];
									$.each(jsoncol[0].costdatas, function(index,data) {
										xAxisdata[index] = data.rectime;
										colsdata01[index] = data.data;
									});
									$.each(jsoncol[0].incomedatas, function(index,data) {
										colsdata02[index] = data.data;
									});
									$.each(jsonpie, function(index,data) {
										piedata[index] = {
											value : data.y, name:data.name
										}
									});
									$.each(jsonpie2, function(index,data) {
										piedata2[index] = {
											value : data.y, name:data.name
										}
									});


									console.log(colsdata01,"col1")
									console.log(colsdata02,"col2")

									opt.xAxis[0].data = xAxisdata;
									opt.series[0].data = colsdata01;
									opt.series[0].barWidth = 15;
									opt.series[1].data = colsdata02;
									opt.series[1].barWidth = 15;
									opt.series[2].data = piedata;
									opt.series[3].data = piedata2;
									modalchartobj.setOption(opt);
									$modalinnerChartWrap.prepend( $("<div>").attr("id", "tempss").css("position", "relative") )
									$(document.getElementById("tempss")).prepend($span1)
									$(document.getElementById("tempss")).prepend($span2)
								},
									error:function(){
									alert('加载饼图数据2据失败');
								}
							});
						},
							error:function(){
							alert('弹出层饼图加载失败');
						}
					})
				},
					error:function(){
					alert('弹出层柱状图加载失败');
				}
			})
			console.log("show 8 call back");
		}
		showModal(show_5_callback);
	}).on("click", "#showModal_9",function() {
		modalchartobj = null;
		$modalinnerChartWrap[0].innerHTML= "";
		var $span1 = $("<span>").html("成本能源结构图").css({
			"position":"absolute",
			"left":"1610px",
			"fontSize":"60px",
			"top":"90px"
		});
		var $span2 = $("<span>").html("收益能源结构图").css({
			"position":"absolute",
			"left":"2320px",
			"fontSize":"60px",
			"top":"90px"
		});
		function show_5_callback() {
			console.log("show 5 call back");
			modalchartobj = echarts.init(document.getElementById('chartinner'), defaultTheme);
			modalchartobj.setOption(optionModal3);
			
			console.log($span1,$span2)
			$modalinnerChartWrap.prepend( $("<div>").attr("id", "tempss").css("position", "relative") )
			$(document.getElementById("tempss")).prepend($span1)
			$(document.getElementById("tempss")).prepend($span2)
		}
		showModal(show_5_callback);
	}).on("click", "#showModal_10",function() {
		function show_10_callback() {
			console.log("show 1 call back")
		}
		showModal(show_10_callback);
	}).on("click", "#showModal_11",function() {
		function show_11_callback() {
			console.log("show 1 call back")
		}
		showModal(show_11_callback);
	}).on("click", "#showModal_12",function() {
		function show_12_callback() {
			console.log("show 1 call back")
		}
		showModal(show_12_callback);
	});
	
	
	//Charts
	if (typeof echarts == 'undefined' ) {
		return 
	} else {
	var defaultTheme = "macarons"; // 默认chart主题
//	var myCharts = echarts.init(document.getElementById('pie1'), defaultTheme);
//	var myCharts2 = echarts.init(document.getElementById('pie2'), defaultTheme);
//	var myChartsPie3 = echarts.init(document.getElementById('pie3'), defaultTheme);
//	var myChartsPie4 = echarts.init(document.getElementById('pie4'), defaultTheme);
//	var myCharts3 = echarts.init(document.getElementById('barchart-1'), defaultTheme);
//	var myCharts4 = echarts.init(document.getElementById('barchart-2'), defaultTheme);
	var mycolumnChart3 = echarts.init(document.getElementById('columnChart3'), defaultTheme);
	var mycolumnChart4 = echarts.init(document.getElementById('columnChart4'), defaultTheme);
	var mycolumnChart5 = echarts.init(document.getElementById('columnChart5'), defaultTheme);
//	var myModalChart = echarts.init(document.getElementById('chartinner'), defaultTheme);
	var radius = [130,160];
	var labelTop = {
		normal : {
			label : {
				show : true,
				position : 'center',
				formatter : '{b}',
				textStyle: {
					fontSize:48,
					baseline : 'bottom'
				}
			},
			labelLine : {
				show : false
			}
		}
	};
	var labelFromatter = {
		normal : {
			label : {
				formatter : function (params){
					//保留小数点后面1位
					return  Math.floor((100 - params.value)*10)/10 + '%';
				},
				textStyle: {
					fontWeight:'bold',
					fontSize:36,
					baseline : 'top'
				}
			}
		},
	};
	var labelBottom = {
		normal : {
			color: '#ccc',
			label : {
				show : true,
				position : 'center'
			},
			labelLine : {
				show : false
			}
		},
		emphasis: {
			color: 'rgba(0,0,0,0)'
		}
	};
	
	var animationDurationAll = 300;
	
	var optionsPie1 = {
		animationDuration: animationDurationAll,
		color : ['#faaf3b'],
		series : [
			{
				type : 'pie',
				center : ['50%', '50%'],
				radius : radius,
				x: '0%', // for funnel
				itemStyle : labelFromatter,
				data : [
					{name:'', value: 30, itemStyle : labelBottom},
					{name:'节能率', value: 70,itemStyle : labelTop}
				]
			}
		]
	};
	var optionsPie2 = {
		animationDuration: animationDurationAll,
		color : [ '#22b473'],
		series : [
			{
				type : 'pie',
				center : ['50%', '50%'],
				radius : radius,
				x: '0%', // for funnel
				itemStyle : labelFromatter,
				data : [
					{name:'', value:60, itemStyle : labelBottom},
					{name:'CO2减排率', value:40,itemStyle : labelTop}
				]
			}
		]
	};
	
	
	
	var optionsbar1 = {
		animationDuration: animationDurationAll,
		backgroundColor: "#fff",
		calculable: false,
		grid: {
			borderWidth:0,
			x: 30,
			x2: 30,
			y: 60,
			y2: 60
		},
		xAxis: [
			{
				splitLine: {
					show: false
				},
				axisTick: {
					show: false
				},
				axisLine: {
					show: false
				},
				axisLabel: {
					textStyle: {
						color: '#989898',
						fontWeight: 'bolder',
						fontSize: 30
					}
				},
				type: 'category',
				show: true,
				data: ['当前能耗', '常规能耗'],
			}
		],
		yAxis: [
			{
				
				type: 'value',
				show: false
			}
		],
		series: [
			{
				name: 'xx',
				type: 'bar',
				barWidth : 42,
				itemStyle: {
					normal: {
						color: function(params) {
							// build a color map as your need.
							var colorList = [
							  '#faaf3b','#B5C334','#FCCE10','#E87C25','#27727B',
							   '#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD',
							   '#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0'
							];
							return '#faaf3b';
						},
						label: {
							textStyle:{
								fontSize:24
							},
							show: true,
							position: 'top',
							formatter: function(params) {
								var html = params.value + "\n" + "标煤(t)";
								return html;
							} 
						}
					}
				},
				data: [25406,16406]
			},
			
		]

	};
	
	var columnChartopt = {
		grid:{
			x:"100px",
			x0:"10px"
		},
		legend: {
			x:"right",
			data:['当年成本','当年收益']
		},
		xAxis : [
			{
				axisLine:{
					lineStyle:{
						color: '#989898'
					}
				},
				axisLabel:{
					textStyle:{
						color: '#989898',
						fontWeight: 'bolder',
						fontSize: 24
					}
				},
				type : 'category',
				data : [2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015]
			}
		],
		yAxis : [
			{
				type : 'value',
				axisLine:{
					lineStyle:{
						color: '#989898'
					}
				},
				axisLabel:{
					textStyle:{
						color: '#989898',
						fontWeight: 'bolder',
						fontSize: 24
					}
				}
			}
		],
		series:[
			{
				name:"当年成本",
				type:'bar',
				barWidth : 20,
				barCategoryGap:'40%',
				itemStyle : 
				{
					normal: {
						color: '#22b473',
						borderRadius: 5,
						label : {
							show: false,
							position: 'left',
							formatter: '{b}'
						}
					}
				},
				data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
			},
			{
				name:"当年收益",
				type:"bar",
				barWidth : 20,
				barCategoryGap:'40%',
				itemStyle : { 
					normal: 
					{
						color: '#00a89c',
						borderRadius: 5,
						label : {
							show: false,
							position: 'left',
							formatter: '{b}'
						}
					}
				},
				data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
			}
		]
	};
	
	
		
		
		
	var optionModal = {
		animationDuration: animationDurationAll,
		color:["#55b6d8", "#2bbaba", "#1c7099", "#038cc4"],
		title : {
			show:false
		},
		tooltip : {
			trigger: 'axis'
		},
		legend: {
			show:false,
			data:['意向','预购','成交']
		},
		toolbox: {
			show : false,
			feature : {
				mark : {show: true},
				dataView : {show: true, readOnly: false},
				magicType : {show: true, type: ['line', 'bar', 'stack', 'tiled']},
				restore : {show: true},
				saveAsImage : {show: true}
			}
		},
		grid:{
			x2:"50%"
		},
		calculable : false,
		xAxis : [
			{
				type : 'category',
				boundaryGap : false,
				data : ['2009','2010','2011','2012','2013','2014','2015'],
				axisLabel:{
					textStyle:{
						fontSize:40
					}	
				}
			}
		],
		yAxis : [
			{
				type : 'value',
				axisLabel:{
					textStyle:{
						fontSize:40
					}	
				}
				
			}
		],
		series : [
			{
				name:'成交',
				type:'line',
				smooth:true,
				itemStyle: {normal: {areaStyle: {type: 'default'}}},
				data:[10, 12, 21, 54, 260, 830, 710]
			},
			{
				name:'预购',
				type:'line',
				smooth:true,
				itemStyle: {normal: {areaStyle: {type: 'default'}}},
				data:[30, 182, 434, 791, 390, 30, 10]
			},
			{
				name:'意向',
				type:'line',
				smooth:true,
				itemStyle: {normal: {areaStyle: {type: 'default'}}},
				data:[1320, 1132, 601, 234, 120, 90, 20]
			},
			{
				calculable : true,
				name:'意向',
				type:'pie',
				roseType : 'area',
				center: (function() {
					var half = 2908/2
					var k = [half*1.5, "50%"]
					return k
				})(),
				radius :[120, (function() {
					return 995/2 - 180
				})()],
				itemStyle :　{
					normal : {
						label:{
							 formatter :function (params){
								//  console.log(params)
									return params.name + '\n' + (params.percent + '%')
								},
							textStyle:{
								fontSize:40
							}
						},
						labelLine : {
							lineStyle:{
								width:4
							},
							length : 50
						}
					}
				},
				data:[
					{value:748, name:'土壤源热泵机组'},
					{value:451, name:'冷温水循环泵'},
					{value:247, name:'冷温水循环泵2'},
					{value:502, name:'其他'}
				]
			}
		]
	};

	var optionModal2itemsty = {
		normal:{
			lineStyle:{
				width:10
			},
			
		}
	}	
	var optionModal2 = {
		animationDuration: animationDurationAll,
		color:["#f6921e","#f05a24", "#ec1c24", "#c0272d"],
		tooltip : {
			show:false,
			trigger: 'axis'
		},
		legend: {
			itemWidth:80,
			itemHeight:40,
			textStyle:{
				fontSize:40
			},
			data:['供电','供热','供热水','供蒸汽']
		},
		toolbox: {
			show : false,
			feature : {
				mark : {show: true},
				dataView : {show: true, readOnly: false},
				magicType : {show: true, type: ['line', 'bar', 'stack', 'tiled']},
				restore : {show: true},
				saveAsImage : {show: true}
			}
		},
		calculable : false,
		xAxis : [
			{
				type : 'category',
				boundaryGap : false,
				axisLabel:{
					textStyle:{
						fontSize:40
					}	
				},
				data : ['周一','周二','周三','周四','周五','周六','周日']
			}
		],
		yAxis : [
			{
				axisLabel:{
					textStyle:{
						fontSize:40
					}	
				},
				type : 'value'
			}
		],
		series : [
			{
				name:'供电',
				type:'line',
				symbolSize:10,
				stack: '总量',
				itemStyle:optionModal2itemsty,
				data:[120, 132, 101, 134, 90, 230, 210]
			},
			{
				name:'供热',
				type:'line',
				symbolSize:10,
				stack: '总量',
				itemStyle:optionModal2itemsty,
				data:[220, 182, 191, 234, 290, 330, 310]
			},
			{
				name:'供热水',
				type:'line',
				symbolSize:10,
				stack: '总量',
				itemStyle:optionModal2itemsty,
				data:[150, 232, 201, 154, 190, 330, 410]
			},
			{
				name:'供蒸汽',
				type:'line',
				symbolSize:10,
				stack: '总量',
				itemStyle:optionModal2itemsty,
				data:[320, 332, 301, 334, 390, 330, 320]
			}
		]
	};	

		
	var optionModal3 = {
		animationDuration: animationDurationAll,
		color:["#55b6d8", "#2bbaba", "#1c7099", "#038cc4"],
		title : {
			show:false
		},
		tooltip : {
			trigger: 'axis'
		},
		legend: {
			x:"45%",
			data:['当年成本','当年收益']
		},
		toolbox: {
			show : false,
			feature : {
				mark : {show: true},
				dataView : {show: true, readOnly: false},
				magicType : {show: true, type: ['line', 'bar', 'stack', 'tiled']},
				restore : {show: true},
				saveAsImage : {show: true}
			}
		},
		grid:{
			y:200,
			y2:200,
			x2:"50%"
		},
		calculable : false,
		xAxis : [
			{
				axisLine:{
					lineStyle:{
						color: '#989898'
					}
				},
				axisLabel:{
					textStyle:{
						color: '#989898',
						fontWeight: 'bolder',
						fontSize: 24
					}
				},
				type : 'category',
				data : [2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015]
			}
		],
		yAxis : [
			{
				type : 'value',
				axisLine:{
					lineStyle:{
						color: '#989898'
					}
				},
				axisLabel:{
					textStyle:{
						color: '#989898',
						fontWeight: 'bolder',
						fontSize: 24
					}
				}
			}
		],
		series : [
			{
				name:"当年成本",
				type:'bar',
				barWidth : 20,
				barCategoryGap:'40%',
				itemStyle : 
				{
					normal: {
						color: '#22b473',
						borderRadius: 5,
						label : {
							show: false,
							position: 'left',
							formatter: '{b}'
						}
					}
				},
				data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
			},
			{
				name:"当年收益",
				type:"bar",
				barWidth : 20,
				barCategoryGap:'40%',
				itemStyle : { 
					normal: 
					{
						color: '#00a89c',
						borderRadius: 5,
						label : {
							show: false,
							position: 'left',
							formatter: '{b}'
						}
					}
				},
				data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
			},
			{
				calculable : false,
				name:'意向',
				type:'pie',
				roseType : 'area',
				center: (function() {
					var half = 2908/2
					var k = [half*1.25, "50%"]
					return k
				})(),
				radius :[120, (function() {
					return 995/2 - 180
				})()],
				itemStyle :　{
					normal : {
						label:{
							show:false,
							 formatter :function (params){
								//  console.log(params)
									return params.name + '\n' + (params.percent + '%')
								},
							textStyle:{
								fontSize:40
							}
						},
						labelLine : {
							show:false,
							lineStyle:{
								width:4
							},
							length : 50
						}
					}
				},
				data:[
					{value:748, name:'土壤源热泵机组'},
					{value:451, name:'冷温水循环泵'},
					{value:247, name:'冷温水循环泵2'},
					{value:502, name:'其他'}
				]
			},
			{
				calculable : false,
				name:'意向',
				type:'pie',
				roseType : 'area',
				center: (function() {
					var half = 2908/2
					var k = [half*1.75, "50%"]
					return k
				})(),
				radius :[120, (function() {
					return 995/2 - 180
				})()],
				itemStyle :　{
					normal : {
						label:{
							show:false,
							 formatter :function (params){
								//  console.log(params)
									return params.name + '\n' + (params.percent + '%')
								},
							textStyle:{
								fontSize:40
							}
						},
						labelLine : {
							show:false,
							lineStyle:{
								width:4
							},
							length : 50
						}
					}
				},
				data:[
					{value:748, name:'土壤源热泵机组'},
					{value:451, name:'冷温水循环泵'},
					{value:247, name:'冷温水循环泵2'},
					{value:502, name:'其他'}
				]
			}
		]
	};	
		
		
		
		
	
	
//	myCharts.setOption(optionsPie1);
//	myCharts2.setOption(optionsPie2);
//	myCharts3.setOption(optionsbar1);
//	var optionsbar2 = optionsbar1;
//	optionsbar2.series[0].itemStyle.normal.color = "#22b473";
//	optionsbar2.series[0].itemStyle.normal.label.formatter = function(params) {
//		return params.value + "\n" + "标煤(kg)";
//	};
//	optionsbar2.series[0].data = [5406,16406];
//	optionsbar2.xAxis[0].data = ["常规碳排放","常规能耗"];
//	myCharts4.setOption(optionsbar2);
	
	
	/*var optionsPie3 = optionsPie1;
	var value = 75;
	var secValue = 100 - 75;
	optionsPie3.color = ["#ec1e79"];
	optionsPie3.series[0].data[0].value = secValue;
	optionsPie3.series[0].data[1].value = value;
	optionsPie3.series[0].data[1].name = "系统能效";
	myChartsPie3.setOption(optionsPie3);*/
	
	/*var optionsPie4 = optionsPie1;
	value = 15;
	secValue = 100 - value;
	optionsPie4.color = ["#92278e"];
	optionsPie4.series[0].data[0].value = secValue;
	optionsPie4.series[0].data[1].value = value;
	optionsPie4.series[0].data[1].name = "可再生能源\n利用率";
	optionsPie4.series[0].data[1].itemStyle.normal.label.textStyle.fontSize =36;
	myChartsPie4.setOption(optionsPie4);*/
	
	
	
	mycolumnChart4.setOption(columnChartopt);
	//示例加载数据
	var columnChartopt5 = columnChartopt;
	columnChartopt.series[0].data = [1230, 1233, 3412, 2000, 111, 575, 4777, 3547, 554, 500, 900, 200];
	columnChartopt.series[1].data = [1000, 2233, 1412, 1000, 311, 275, 2377, 1547, 254, 100, 700, 100];
	mycolumnChart5.setOption(columnChartopt5);
	
		
		
		
		
		
	$doc.on("leftjsonpdataReady", function(){
		console.log(leftjsonpdata,"left Json Data load");
		var datalength = leftjsonpdata.length;
//		console.log(datalength)
		$.each(leftjsonpdata, function(index, data) {
			if ( index <= 1) {
				var _name,
					_percent,
					data_1_name,
					data_1_val,
					data_1_unit,
					data_2_name,
					data_2_val,
					data_2_unit,
					data_3_name,
					data_3_val,
					data_3_unit,
					classGroup;

				_name = data.name;
				_percent = data.datavalue;
				/* */
				data_1_name = data.data1.name;
				data_1_val = data.data1.datavalue;
				data_1_unit = data.data1.unitname;
				/* */
				data_2_name = data.data2.name;
				data_2_val = data.data2.datavalue;
				data_2_unit = data.data2.unitname;

				data_3_name = data.data3.name;
				data_3_val = data.data3.datavalue;
				data_3_unit = data.data3.unitname;

				classGroup = ".leftGruop_" + index;
				var $classGroup = $(classGroup)
				$classGroup.find(".chart-text-block").find("p").eq(0).html(data_1_name)
				$classGroup.find(".chart-text-block").find("p").eq(1).html(data_1_val+ " " +data_1_unit)
				
				var $chartel = $classGroup.filter(function() {
					var $this = $(this);
					if ($this.hasClass("dib") && $this.attr("id")) {
						return $this;
					}
				})
//				console.log($chartel)
				var myCharts = echarts.init($chartel[0], defaultTheme);
				var chartOPT;
				if (index == "0") {
					chartOPT = optionsPie1;
					chartOPT.color = ['#f8ae3b'];
				} else if (index == "1") {
					chartOPT = optionsPie2
					chartOPT.color = ['#21b171'];
				}
				
				
				var secVal = 100 - _percent;
				chartOPT.series[0].data[0].value = secVal
				chartOPT.series[0].data[1].value = _percent
				chartOPT.series[0].data[1].name = _name
				myCharts.setOption(chartOPT);
				
				
				
				var $chartel2 = $classGroup.filter(function() {
					var $this = $(this);
					if ($this.hasClass("hov-line-chartblock") && $this.attr("id")) {
						return $this;
					}
				})
				
				console.log($chartel2)
				var myCharts2x = echarts.init($chartel2[0], defaultTheme);
				
				var chartOPT2 = optionsbar1;
				chartOPT2.series[0].itemStyle.normal.label.formatter = function(params) {
					return params.value + "\n" + data_2_unit;
				};
				chartOPT2.series[0].data = [data_2_val,data_3_val];
				chartOPT2.xAxis[0].data = [data_2_name,data_3_name];
				if (index == "0") {
					chartOPT2.series[0].itemStyle.normal.color = "#f8ae3b";
					
				} else if (index == "1") {
					chartOPT2.series[0].itemStyle.normal.color = "#21b171";
				}
				myCharts2x.setOption(chartOPT2)
				
				
				/*var optionsbar2 = optionsbar1;
				optionsbar2.series[0].itemStyle.normal.color = "#f8ae3b";
				optionsbar2.series[0].itemStyle.normal.label.formatter = function(params) {
					return params.value + "\n" + "标煤(kg)";
				};
				optionsbar2.series[0].data = [5406,16406];
				optionsbar2.xAxis[0].data = ["常规碳排放","常规能耗"];
				myCharts4.setOption(optionsbar2);*/
				
				
				
				
				
				
				/*console.log(
					_name,
					_percent,
					data_1_name,
					data_1_val,
					data_1_unit,
					data_2_name,
					data_2_val,
					data_2_unit,
					data_3_name,
					data_3_val,
					data_3_unit,
					classGroup
				)*/
			} else {
				var _name,
					_percent,
					data_1_name,
					data_1_val,
					data_1_unit,
					data_2_name,
					data_2_val,
					data_2_unit,
					data_3_name,
					data_3_val,
					data_3_unit,
					classGroup;

				_name = data.name;
				_percent = data.datavalue;
				/* */
				data_1_name = data.data1.name;
				data_1_val = data.data1.datavalue;
				data_1_unit = data.data1.unitname;
				/* */
				data_2_name = data.data2.name;
				data_2_val = data.data2.datavalue;
				data_2_unit = data.data2.unitname;

				classGroup = ".leftGruop_" + index; 


				/*console.log(
					_name,
					_percent,
					data_1_name,
					data_1_val,
					data_1_unit,
					data_2_name,
					data_2_val,
					data_2_unit,
					classGroup
				)*/
				
				classGroup = ".leftGruop_" + index;
				var $classGroup = $(classGroup);
				var $classGroupBlock = $classGroup.find(".hov-line-chartblock");
				var $classGroupBlock_p = $classGroupBlock.find("p");
				
				
				var $chartel = $classGroup.filter(function() {
					var $this = $(this);
					if ($this.hasClass("dib") && $this.attr("id")) {
						return $this;
					}
				})
//				console.log($chartel)
				var myCharts = echarts.init($chartel[0], defaultTheme);
				var chartOPT;
				if (index == "2") {
					chartOPT = optionsPie1;
					chartOPT.color = ['#ec1e79'];
					chartOPT.series[0].data[0].value = 100 - _percent;
					chartOPT.series[0].data[1].value = (function() {
						if (_percent > 100) {
							return 100;
						} else {
							return _percent;
						}
					})();
					chartOPT.series[0].data[1].name = _name;
					
				} else if (index == "3") {
					chartOPT = optionsPie1
					chartOPT.color = ['#92278e'];
					chartOPT.series[0].data[0].value = 100 - _percent;
					chartOPT.series[0].data[1].value = _percent;
					chartOPT.series[0].data[1].name = (function() {
						if (_name == "可再生能源利用率") return "可再生能源\n利用率"
					})();
					chartOPT.series[0].data[1].itemStyle.normal.label.textStyle.fontSize =36;
				}
				myCharts.setOption(chartOPT)
				
				
				
				
				$classGroupBlock_p.eq(0).html( data_1_name )
				$classGroupBlock_p.eq(2).html( data_2_name )
				
				$classGroupBlock_p.eq(1).find("font").html(data_1_val)
				$classGroupBlock_p.eq(1).find("span").html(data_1_unit)
				
				$classGroupBlock_p.eq(3).find("font").html(data_2_val)
				$classGroupBlock_p.eq(3).find("span").html(data_2_unit)
				
			}
			
		});
	});
		
		
		
		
		
	var leftjsonpdata = {};
	$.ajax({
		type : "get",
		async:true,
		url : "ajaxsample/leftjsonp.js",
		dataType : "jsonp",
		jsonp: "callback",
		jsonpCallback:"leftjsonp",
		success : function(json){
			leftjsonpdata = json;
			$doc.trigger("leftjsonpdataReady")
		},
			error:function(){
			alert('加载左侧图表数据失败');
		}
	});
		
		
		
		
		
		
		
		
	//判断echart undefined end
//			modalchartobj = echarts.init(document.getElementById('chartinner'), defaultTheme);
//			modalchartobj.setOption(optionModal3);
	$doc.on("tab01chartjsonloadM", function(e) {
		console.log(tab01chartjsonM);
		$("#cou_01").html("￥ "+tab01chartjsonM[0].costsum);
		$("#cou_02").html("￥ "+tab01chartjsonM[0].incomesum);
		var dates1 = [];
		var dates2 = [];
		var dateX = [];
		var columnChartoptInit = columnChartopt;
		$.each(tab01chartjsonM[0].costdatas, function(i, d) {
			dates1[i] = d.data;
			dateX[i] = d.rectime;
		})
		$.each(tab01chartjsonM[0].incomedatas, function(i, d) {
			dates2[i] = d.data;
		})
		columnChartoptInit.xAxis[0].data = dateX;
		columnChartoptInit.series[0].data = dates1;
		columnChartoptInit.series[1].data = dates2;
		mycolumnChart4.setOption(columnChartoptInit);

	}).on("tab01chartjsonloadD", function(e) {
		console.log(tab01chartjsonD);
		$("#cou_03").html("￥ "+tab01chartjsonD[0].costsum);
		$("#cou_04").html("￥ "+tab01chartjsonD[0].incomesum);
		var dates1 = [];
		var dates2 = [];
		var dateX = [];
		var columnChartoptInit = columnChartopt;
		$.each(tab01chartjsonD[0].costdatas, function(i, d) {
			dates1[i] = d.data;
			dateX[i] = d.rectime;
		})
		$.each(tab01chartjsonD[0].incomedatas, function(i, d) {
			dates2[i] = d.data;
		})
		columnChartoptInit.xAxis[0].data = dateX;
		columnChartoptInit.series[0].data = dates1;
		columnChartoptInit.series[1].data = dates2;
		mycolumnChart5.setOption(columnChartoptInit);
	}).on("tab01chartjsonloadY", function(e) {
		console.log(tab01chartjsonY);
		$("#cou_05").html("￥ "+tab01chartjsonY[0].costsum);
		$("#cou_06").html("￥ "+tab01chartjsonY[0].incomesum);
		var dates1 = [];
		var dates2 = [];
		var dateX = [];
		var columnChartoptInit = columnChartopt;
		$.each(tab01chartjsonY[0].costdatas, function(i, d) {
			dates1[i] = d.data;
			dateX[i] = d.rectime;
		})
		$.each(tab01chartjsonY[0].incomedatas, function(i, d) {
			dates2[i] = d.data;
		})
		columnChartoptInit.xAxis[0].data = dateX;
		columnChartoptInit.series[0].data = dates1;
		columnChartoptInit.series[1].data = dates2;
		mycolumnChart3.setOption(columnChartoptInit);
	});
	var tab01chartjsonM = {};
	$.ajax({
		type : "get",
		async:true,
		url : "ajaxsample/costsumM.js",
		dataType : "jsonp",
		jsonp: "callback",
		jsonpCallback:"costsumM",
		success : function(json){
			tab01chartjsonM = json;
			$doc.trigger("tab01chartjsonloadM")
		},
			error:function(){
			alert('加载图表01数据失败');
		}
	});
	var tab01chartjsonD = {};
	$.ajax({
		type : "get",
		async:true,
		url : "ajaxsample/costsumD.js",
		dataType : "jsonp",
		jsonp: "callback",
		jsonpCallback:"costsumD",
		success : function(json){
			tab01chartjsonD = json;
			$doc.trigger("tab01chartjsonloadD")
		},
			error:function(){
			alert('加载图表01数据失败');
		}
	});		

	
	var tab01chartjsonY = {};
	$.ajax({
		type : "get",
		async:true,
		url : "ajaxsample/costsumY.js",
		dataType : "jsonp",
		jsonp: "callback",
		jsonpCallback:"costsumY",
		success : function(json){
			tab01chartjsonY = json;
			$doc.trigger("tab01chartjsonloadY")
		},
			error:function(){
			alert('加载图表01数据失败');
		}
	});		
		
		
	}
	
	
	
	
	//RecvMsgFormUnity();
		function RecvMsgFormUnity(str, callback)
		{
            $.ajax({
                url: 'test.json'
              , type: 'GET'
            }).done(function(data){
                console.log(data.labeldata[1].datavalue)
                var d = JSON.stringify(data)
                u.getUnity().SendMessage("AnchorPoint", "RecvMessage",d);
            });
		}
		
			var config = {
				width: 3100, 
				//height: 2180,
				height: 2100,
				params: { enableDebugging:"0" }
				
			};
			var u = new UnityObject2(config);

			jQuery(function() {

				var $missingScreen = jQuery("#unityPlayer").find(".missing");
				var $brokenScreen = jQuery("#unityPlayer").find(".broken");
				$missingScreen.hide();
				$brokenScreen.hide();
				
				u.observeProgress(function (progress) {
					switch(progress.pluginStatus) {
						case "broken":
							$brokenScreen.find("a").click(function (e) {
								e.stopPropagation();
								e.preventDefault();
								u.installPlugin();
								return false;
							});
							$brokenScreen.show();
						break;
						case "missing":
							$missingScreen.find("a").click(function (e) {
								e.stopPropagation();
								e.preventDefault();
								u.installPlugin();
								return false;
							});
							$missingScreen.show();
						break;
						case "installed":
							$missingScreen.remove();
						break;
						case "first":
						break;
					}
				});
                $('.change3D').on('click', function(){
                    var n = $(this).data('num')
                    if(n == 1) u.initPlugin(jQuery("#unityPlayer")[0], "TestWeb1.unity3d");
                    else u.initPlugin(jQuery("#unityPlayer")[0], "TestWeb.unity3d");
                }); 
                //if(window.pageName == "page01")
                    u.initPlugin(jQuery("#unityPlayer")[0], "TestWeb1.unity3d"); // 初始化3d
			});


    // 页面切换效果
        function switchPage() {
			if( isAnimating ) {
				return false;
			}
			if( animcursor > 67) {
				animcursor = 1;
			}
			nextPage( animcursor );
			++animcursor;
        }
// random
function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
	function init() {
		$pages.each( function() {
			var $page = $( this );
			$page.data( 'originalClassList', $page.attr( 'class' ) );
		} );

		$pages.eq( current ).addClass( 'pt-page-current' );

	}

	function nextPage( animation ) {

		if( isAnimating ) {
			return false;
		}

		isAnimating = true;
		
		var $currPage = $pages.eq( current );

		if( current < pagesCount - 1 ) {
			++current;
		}
		else {
			current = 0;
		}

		var $nextPage = $pages.eq( current ).addClass( 'pt-page-current' ),
			outClass = '', inClass = '';

		switch( animation ) {

			case 1:
				outClass = 'pt-page-moveToLeft';
				inClass = 'pt-page-moveFromRight';
				break;
			case 2:
				outClass = 'pt-page-moveToRight';
				inClass = 'pt-page-moveFromLeft';
				break;
			case 3:
				outClass = 'pt-page-moveToTop';
				inClass = 'pt-page-moveFromBottom';
				break;
			case 4:
				outClass = 'pt-page-moveToBottom';
				inClass = 'pt-page-moveFromTop';
				break;
			case 5:
				outClass = 'pt-page-fade';
				inClass = 'pt-page-moveFromRight pt-page-ontop';
				break;
			case 6:
				outClass = 'pt-page-fade';
				inClass = 'pt-page-moveFromLeft pt-page-ontop';
				break;
			case 7:
				outClass = 'pt-page-fade';
				inClass = 'pt-page-moveFromBottom pt-page-ontop';
				break;
			case 8:
				outClass = 'pt-page-fade';
				inClass = 'pt-page-moveFromTop pt-page-ontop';
				break;
			case 9:
				outClass = 'pt-page-moveToLeftFade';
				inClass = 'pt-page-moveFromRightFade';
				break;
			case 10:
				outClass = 'pt-page-moveToRightFade';
				inClass = 'pt-page-moveFromLeftFade';
				break;
			case 11:
				outClass = 'pt-page-moveToTopFade';
				inClass = 'pt-page-moveFromBottomFade';
				break;
			case 12:
				outClass = 'pt-page-moveToBottomFade';
				inClass = 'pt-page-moveFromTopFade';
				break;
			case 13:
				outClass = 'pt-page-moveToLeftEasing pt-page-ontop';
				inClass = 'pt-page-moveFromRight';
				break;
			case 14:
				outClass = 'pt-page-moveToRightEasing pt-page-ontop';
				inClass = 'pt-page-moveFromLeft';
				break;
			case 15:
				outClass = 'pt-page-moveToTopEasing pt-page-ontop';
				inClass = 'pt-page-moveFromBottom';
				break;
			case 16:
				outClass = 'pt-page-moveToBottomEasing pt-page-ontop';
				inClass = 'pt-page-moveFromTop';
				break;
			case 17:
				outClass = 'pt-page-scaleDown';
				inClass = 'pt-page-moveFromRight pt-page-ontop';
				break;
			case 18:
				outClass = 'pt-page-scaleDown';
				inClass = 'pt-page-moveFromLeft pt-page-ontop';
				break;
			case 19:
				outClass = 'pt-page-scaleDown';
				inClass = 'pt-page-moveFromBottom pt-page-ontop';
				break;
			case 20:
				outClass = 'pt-page-scaleDown';
				inClass = 'pt-page-moveFromTop pt-page-ontop';
				break;
			case 21:
				outClass = 'pt-page-scaleDown';
				inClass = 'pt-page-scaleUpDown pt-page-delay300';
				break;
			case 22:
				outClass = 'pt-page-scaleDownUp';
				inClass = 'pt-page-scaleUp pt-page-delay300';
				break;
			case 23:
				outClass = 'pt-page-moveToLeft pt-page-ontop';
				inClass = 'pt-page-scaleUp';
				break;
			case 24:
				outClass = 'pt-page-moveToRight pt-page-ontop';
				inClass = 'pt-page-scaleUp';
				break;
			case 25:
				outClass = 'pt-page-moveToTop pt-page-ontop';
				inClass = 'pt-page-scaleUp';
				break;
			case 26:
				outClass = 'pt-page-moveToBottom pt-page-ontop';
				inClass = 'pt-page-scaleUp';
				break;
			case 27:
				outClass = 'pt-page-scaleDownCenter';
				inClass = 'pt-page-scaleUpCenter pt-page-delay400';
				break;
			case 28:
				outClass = 'pt-page-rotateRightSideFirst';
				inClass = 'pt-page-moveFromRight pt-page-delay200 pt-page-ontop';
				break;
			case 29:
				outClass = 'pt-page-rotateLeftSideFirst';
				inClass = 'pt-page-moveFromLeft pt-page-delay200 pt-page-ontop';
				break;
			case 30:
				outClass = 'pt-page-rotateTopSideFirst';
				inClass = 'pt-page-moveFromTop pt-page-delay200 pt-page-ontop';
				break;
			case 31:
				outClass = 'pt-page-rotateBottomSideFirst';
				inClass = 'pt-page-moveFromBottom pt-page-delay200 pt-page-ontop';
				break;
			case 32:
				outClass = 'pt-page-flipOutRight';
				inClass = 'pt-page-flipInLeft pt-page-delay500';
				break;
			case 33:
				outClass = 'pt-page-flipOutLeft';
				inClass = 'pt-page-flipInRight pt-page-delay500';
				break;
			case 34:
				outClass = 'pt-page-flipOutTop';
				inClass = 'pt-page-flipInBottom pt-page-delay500';
				break;
			case 35:
				outClass = 'pt-page-flipOutBottom';
				inClass = 'pt-page-flipInTop pt-page-delay500';
				break;
			case 36:
				outClass = 'pt-page-rotateFall pt-page-ontop';
				inClass = 'pt-page-scaleUp';
				break;
			case 37:
				outClass = 'pt-page-rotateOutNewspaper';
				inClass = 'pt-page-rotateInNewspaper pt-page-delay500';
				break;
			case 38:
				outClass = 'pt-page-rotatePushLeft';
				inClass = 'pt-page-moveFromRight';
				break;
			case 39:
				outClass = 'pt-page-rotatePushRight';
				inClass = 'pt-page-moveFromLeft';
				break;
			case 40:
				outClass = 'pt-page-rotatePushTop';
				inClass = 'pt-page-moveFromBottom';
				break;
			case 41:
				outClass = 'pt-page-rotatePushBottom';
				inClass = 'pt-page-moveFromTop';
				break;
			case 42:
				outClass = 'pt-page-rotatePushLeft';
				inClass = 'pt-page-rotatePullRight pt-page-delay180';
				break;
			case 43:
				outClass = 'pt-page-rotatePushRight';
				inClass = 'pt-page-rotatePullLeft pt-page-delay180';
				break;
			case 44:
				outClass = 'pt-page-rotatePushTop';
				inClass = 'pt-page-rotatePullBottom pt-page-delay180';
				break;
			case 45:
				outClass = 'pt-page-rotatePushBottom';
				inClass = 'pt-page-rotatePullTop pt-page-delay180';
				break;
			case 46:
				outClass = 'pt-page-rotateFoldLeft';
				inClass = 'pt-page-moveFromRightFade';
				break;
			case 47:
				outClass = 'pt-page-rotateFoldRight';
				inClass = 'pt-page-moveFromLeftFade';
				break;
			case 48:
				outClass = 'pt-page-rotateFoldTop';
				inClass = 'pt-page-moveFromBottomFade';
				break;
			case 49:
				outClass = 'pt-page-rotateFoldBottom';
				inClass = 'pt-page-moveFromTopFade';
				break;
			case 50:
				outClass = 'pt-page-moveToRightFade';
				inClass = 'pt-page-rotateUnfoldLeft';
				break;
			case 51:
				outClass = 'pt-page-moveToLeftFade';
				inClass = 'pt-page-rotateUnfoldRight';
				break;
			case 52:
				outClass = 'pt-page-moveToBottomFade';
				inClass = 'pt-page-rotateUnfoldTop';
				break;
			case 53:
				outClass = 'pt-page-moveToTopFade';
				inClass = 'pt-page-rotateUnfoldBottom';
				break;
			case 54:
				outClass = 'pt-page-rotateRoomLeftOut pt-page-ontop';
				inClass = 'pt-page-rotateRoomLeftIn';
				break;
			case 55:
				outClass = 'pt-page-rotateRoomRightOut pt-page-ontop';
				inClass = 'pt-page-rotateRoomRightIn';
				break;
			case 56:
				outClass = 'pt-page-rotateRoomTopOut pt-page-ontop';
				inClass = 'pt-page-rotateRoomTopIn';
				break;
			case 57:
				outClass = 'pt-page-rotateRoomBottomOut pt-page-ontop';
				inClass = 'pt-page-rotateRoomBottomIn';
				break;
			case 58:
				outClass = 'pt-page-rotateCubeLeftOut pt-page-ontop';
				inClass = 'pt-page-rotateCubeLeftIn';
				break;
			case 59:
				outClass = 'pt-page-rotateCubeRightOut pt-page-ontop';
				inClass = 'pt-page-rotateCubeRightIn';
				break;
			case 60:
				outClass = 'pt-page-rotateCubeTopOut pt-page-ontop';
				inClass = 'pt-page-rotateCubeTopIn';
				break;
			case 61:
				outClass = 'pt-page-rotateCubeBottomOut pt-page-ontop';
				inClass = 'pt-page-rotateCubeBottomIn';
				break;
			case 62:
				outClass = 'pt-page-rotateCarouselLeftOut pt-page-ontop';
				inClass = 'pt-page-rotateCarouselLeftIn';
				break;
			case 63:
				outClass = 'pt-page-rotateCarouselRightOut pt-page-ontop';
				inClass = 'pt-page-rotateCarouselRightIn';
				break;
			case 64:
				outClass = 'pt-page-rotateCarouselTopOut pt-page-ontop';
				inClass = 'pt-page-rotateCarouselTopIn';
				break;
			case 65:
				outClass = 'pt-page-rotateCarouselBottomOut pt-page-ontop';
				inClass = 'pt-page-rotateCarouselBottomIn';
				break;
			case 66:
				outClass = 'pt-page-rotateSidesOut';
				inClass = 'pt-page-rotateSidesIn pt-page-delay200';
				break;
			case 67:
				outClass = 'pt-page-rotateSlideOut';
				inClass = 'pt-page-rotateSlideIn';
				break;

		}

		$currPage.addClass( outClass ).on( animEndEventName, function() {
			$currPage.off( animEndEventName );
			endCurrPage = true;
			if( endNextPage ) {
				onEndAnimation( $currPage, $nextPage );
			}
		} );

		$nextPage.addClass( inClass ).on( animEndEventName, function() {
			$nextPage.off( animEndEventName );
			endNextPage = true;
			if( endCurrPage ) {
				onEndAnimation( $currPage, $nextPage );
			}
		} );

		if( !support ) {
			onEndAnimation( $currPage, $nextPage );
		}

	}

	function onEndAnimation( $outpage, $inpage ) {

		endCurrPage = false;
		endNextPage = false;
		resetPage( $outpage, $inpage );
		isAnimating = false;
	}

	function resetPage( $outpage, $inpage ) {
		$outpage.attr( 'class', $outpage.data( 'originalClassList' ) );
		$inpage.attr( 'class', $inpage.data( 'originalClassList' ) + ' pt-page-current' );

	}

	init();


};
       
