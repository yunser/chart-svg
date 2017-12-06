<template>
    <div class="page page-home">
        <header id="layout-header" class="layout-header navbar navbar-light" role="navigation">
            <div class="container">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle" data-toggle="collapse"
                            data-target="#navbar-collapse">
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand" href="#">Shapes</a>
                </div>
                <div id="navbar-collapse" class="collapse navbar-collapse">
                    <ul class="nav navbar-nav" id="menu-layoutit">
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" data-toggle="dropdown">
                                文件 <i class="caret"></i>
                            </a>
                            <ul class="dropdown-menu dropdown-menu-right">
                                <li><a id="new" href="#">新建</a></li>
                                <li><a href="#" @click="save">保存</a></li>
                                <li><a href="#" @click="downloadPng">下载（png格式）</a></li>
                                <li><a href="#" @click="downloadSvg">下载（svg格式）</a></li>
                            </ul>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" data-toggle="dropdown">
                                视图 <i class="caret"></i>
                            </a>
                            <ul class="dropdown-box dropdown-box-right insert-box">
                                <label class="control-label">
                                    <input id="show-grid" class="form-control" type="checkbox" checked>
                                    显示网格
                                </label>
                            </ul>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" data-toggle="dropdown">
                                模板 <i class="caret"></i>
                            </a>
                            <ul class="dropdown-box dropdown-box-right template-box">
                                <ul class="widget-list">
                                    <li class="widget-item">
                                        <svg viewBox="0 0 100 100"
                                             xmlns="http://www.w3.org/2000/svg" version="1.1">
                                            <g id="SvgjsG1008"><polygon id="SvgjsPolygon1009" points="0,0 100,100 0,200" fill="#69bfd0" stroke="#000000" stroke-width="1" class="elem elem-draggable elem-rotateable"></polygon><polygon id="SvgjsPolygon1010" points="0,0 200,0 100,100" fill="#ccfe67" stroke="#000000" stroke-width="1" class="elem elem-draggable elem-rotateable"></polygon><polygon id="SvgjsPolygon1011" points="200,0 200,100 150,150 150,50" fill="#f33d65" stroke="#000000" stroke-width="1" class="elem elem-draggable elem-rotateable"></polygon><polygon id="SvgjsPolygon1012" points="150,50 150,150 100,100" fill="#faf61b" stroke="#000000" stroke-width="1" class="elem elem-draggable elem-rotateable"></polygon><polygon id="SvgjsPolygon1013" points="100,100 150,150 100,200 50,150" fill="#a594c0" stroke="#000000" stroke-width="1" class="elem elem-draggable elem-rotateable"></polygon><polygon id="SvgjsPolygon1014" points="50,150 100,200 0,200" fill="#f78fce" stroke="#000000" stroke-width="1" class="elem elem-draggable elem-rotateable"></polygon><polygon id="SvgjsPolygon1015" points="200,100 200,200 100,200" fill="#f6c928" stroke="#000000" stroke-width="1" class="elem elem-draggable elem-rotateable"></polygon></g>
                                        </svg>
                                        <div class="name">圆</div>
                                    </li>

                                </ul>
                            </ul>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" data-toggle="dropdown">
                                帮助 <i class="caret"></i>
                            </a>
                            <ul class="dropdown-menu dropdown-menu-right">
                                <li><router-link to="/help" target="_blank">帮助页面</router-link></li>
                                <!--<li><a href="help.html" target="_blank">帮助页面</a></li>-->
                                <li><a href="/" target="_blank">更多工具</a></li>
                                <li><a href="#" @click="about">关于</a></li>
                            </ul>
                        </li>
                        <li class="nav-item navbar-form">
                            <button id="quick-help" class="btn btn-info" href="#">快速导航</button>
                            <button class="btn btn-info" href="#" @click.prevent="makeUseCase">生成用例图</button>
                        </li>
                    </ul>
                    <ul class="nav navbar-nav pull-right">
                        <li class="nav-item navbar-form">
                            <a id="display-show" class="btn btn-default" data-toggle="tooltip" data-placement="bottom" title="预览"><i class="draw-icon draw-icon-eye"></i></a>
                            <a id="fullscreen" class="btn btn-default" @click="fullscreen" data-toggle="tooltip" data-placement="bottom" title="切换全屏"><i class="draw-icon draw-icon-fullscreen"></i></a>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
        <div id="layout-tool" class="layout-tool">
            <div id="type-list-box">
                <h4 class="title">工具</h4>
                <span class="">
            <button class="btn btn-default active" data-type="select" data-toggle="tooltip" title="选择工具（V）" type="button"><i class="draw-icon draw-icon-pointer"></i></button>
            <button class="btn btn-default" data-type="select2" data-toggle="tooltip" title="直接选择工具" type="button"><i class="draw-icon draw-icon-pointer"></i></button>
            <button class="btn btn-default" data-type="join" data-toggle="tooltip" title="连线工具（J）"><i class="draw-icon draw-icon-line"></i></button>
                    <!--<a id="drag-svg" class="btn btn-default">移动画布</a>-->
            <button class="btn btn-default" data-type="path" data-toggle="tooltip" title="钢笔工具（P）"><i class="draw-icon draw-icon-pen"></i></button>
            <button class="btn btn-default" data-type="straw" data-toggle="tooltip" title="取色工具"><i class="draw-icon draw-icon-straw"></i></button>
            <button class="btn btn-default" data-type="brush" data-toggle="tooltip" title="格式刷"><i class="draw-icon draw-icon-clear"></i></button>
        </span>
                <span>
            <button class="btn btn-default" data-toggle="tooltip" title="清空画布" @click="clear">
                <i class="draw-icon draw-icon-clear"></i></button>
                    <!--<button id="svg-position" class="btn btn-default">画布还原</button>-->
        </span>
                <span id="shape-tools">
            <h4 class="title">绘图</h4>
            <button class="btn btn-default" data-type="line" data-toggle="tooltip" title="直线（L）"><i class="draw-icon draw-icon-line"></i></button>
            <button class="btn btn-default" data-type="rect" data-toggle="tooltip" title="矩形（R）"><i class="draw-icon draw-icon-rect"></i></button>
            <button class="btn btn-default" data-type="ellipse" data-toggle="tooltip" title="椭圆（0）"><i class="draw-icon draw-icon-ellipse"></i></button>
            <button class="btn btn-default" data-type="polygon" data-toggle="tooltip" title="多边形"><i class="draw-icon draw-icon-polygon"></i></button>
            <button class="btn btn-default" data-type="start" data-toggle="tooltip" title="星形"><i class="draw-icon draw-icon-star"></i></button>
            <button class="btn btn-default" data-type="text" data-toggle="tooltip" title="文字"><i class="draw-icon draw-icon-text"></i></button>
        </span>
                <span id="pen-tools" class="pen-tools">
            <h4 class="title">钢笔工具</h4>
            <span id="pen-list" class="btn-group">
                <button id="pen-draw" class="btn btn-default active" type="button" data-toggle="tooltip" title="钢笔工具"><i class="draw-icon draw-icon-pen"></i></button>
                <button id="pen-point" class="btn btn-default" type="button" data-toggle="tooltip" title="锚点工具(shift + C)"><i class="draw-icon draw-icon-pen"></i></button>
                <button id="pen-delete" class="btn btn-default" type="button" data-toggle="tooltip" title="删除锚点工具(-)"><i class="draw-icon draw-icon-pen"></i></button>
                <button id="pen-add" class="btn btn-default" type="button" data-toggle="tooltip" title="添加锚点工具(+)"><i class="draw-icon draw-icon-pen"></i></button>
                <button id="pen-move" class="btn btn-default" type="button" data-toggle="tooltip" title="移动锚点工具"><i class="draw-icon draw-icon-pen"></i></button>
            </span>
        </span>
            </div>
        </div>
        <div id="layout-body" class="layout-body">
            <div class="shape-box bootstro" data-bootstro-width="200px" data-bootstro-title="组件栏" data-bootstro-content="点击插入组件，也可以直接拖拽到右边编辑区" data-bootstro-placement="right">
                <!--panel-group-->
                <div class="" id="accordion">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <h4 class="panel-title"><a data-toggle="collapse" href="#collapseOne">基本形状</a></h4>
                        </div>
                        <div id="collapseOne" class="panel-collapse collapse in">
                            <div class="panel-body">
                                <ul id="widget-list2" class="widget-list">
                                    <li class="widget-item">
                                        <svg class="svg" viewBox="0 0 200 200"
                                             xmlns="http://www.w3.org/2000/svg" version="1.1">
                                            <polyline class="elem elem-resizable elem-draggable"  points="20,20 40,25 60,40 80,120 120,140 200,180"
                                                      style="fill:none;stroke:black;stroke-width:3" />
                                        </svg>
                                        <div class="name">折线</div>
                                    </li>
                                    <li class="widget-item">
                                        <svg class="svg" viewBox="0 0 200 200"
                                             xmlns="http://www.w3.org/2000/svg" version="1.1">
                                            <image class="elem elem-resizable elem-draggable" data-type="image" xlink:href="/static/img/baidu.png" x="0" y="0" height="80" width="160"/>
                                        </svg>
                                        <div class="name">图片</div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <h4 class="panel-title">
                                <a data-toggle="collapse" href="#collapseTwo">常用组件</a>
                            </h4>
                        </div>
                        <div id="collapseTwo" class="panel-collapse collapse">
                            <div class="panel-body">
                                <ul id="widget-list" class="widget-list">
                                    <li class="widget-item">
                                        <svg viewBox="0 0 100 100"
                                             xmlns="http://www.w3.org/2000/svg" version="1.1">
                                            <g class="elem elem-resizable elem-draggable elem-lineable" fill="#09c" stroke="#fff">
                                                <circle cx="40" cy="40" r="40" stroke-width="1"></circle>
                                                <text x="45" y="48.75" fill="#fff" stroke="none" text-anchor="middle"></text>
                                            </g>
                                        </svg>
                                        <div class="name">圆</div>
                                    </li>
                                    <li class="widget-item">
                                        <svg viewBox="0 0 200 200"
                                             xmlns="http://www.w3.org/2000/svg" version="1.1">
                                            <g class="elem elem-resizable elem-draggable elem-lineable" data-type="widget" fill="#09c" stroke="#fff">
                                                <ellipse cx="103" cy="55" rx="100" ry="50" stroke-width="1"></ellipse>
                                                <text class="" x="100" y="50" fill="#fff" stroke="none" text-anchor="middle"></text>
                                            </g>
                                        </svg>
                                        <div class="name">椭圆</div>
                                    </li>
                                    <li class="widget-item">
                                        <svg class="svg" viewBox="0 0 100 100"
                                             xmlns="http://www.w3.org/2000/svg" version="1.1">
                                            <g class="elem" data-type="widget">
                                                <rect x="0" y="0" width="80" height="40" stroke-width="1" id="SvgjsRect9193" class="" fill="#0099cc"></rect>
                                                <text class="" x="40.154022216796875" y="26.32050132751465" fill="#fff" text-anchor="middle" id="SvgjsText9191">21212</text>
                                            </g>
                                            <!--
                                                                                <g class="elem elem-lineable" data-type="widget" stroke="#fff">
                                                                                    <rect x="0" y="0" width="80" height="40" stroke-width="1"></rect>
                                                                                    <text class="" x="45" y="28.75" fill="#fff" text-anchor="middle"></text>
                                                                                </g>-->
                                        </svg>
                                        <div class="name">矩形</div>
                                    </li>
                                    <li class="widget-item">
                                        <svg class="svg" viewBox="0 0 100 100"
                                             xmlns="http://www.w3.org/2000/svg" version="1.1">
                                            <g class="elem elem-resizable elem-draggable elem-lineable" data-type="widget" fill="#09c" stroke="#fff">
                                                <rect x="0" y="0" width="80" height="40" rx="10" ry="10" stroke-width="1"></rect>
                                                <text class="" x="45" y="28.75" fill="#fff" text-anchor="middle"></text>
                                            </g>
                                        </svg>
                                        <div class="name">圆角矩形</div>
                                    </li>
                                    <li class="widget-item">
                                        <svg class="svg" viewBox="0 0 100 100"
                                             xmlns="http://www.w3.org/2000/svg" version="1.1">
                                            <g class="elem elem-resizable elem-draggable elem-lineable">
                                                <rect id="_Gef_10" x="5" y="5" width="80" height="40" rx="10" ry="10" fill="none" stroke="none" stroke-width="2"></rect>
                                                <text id="_Gef_11" class="" x="45" y="28.75" text-anchor="middle">文字</text>
                                            </g>
                                        </svg>
                                        <div class="name">文字</div>
                                    </li>
                                    <li class="widget-item">
                                        <svg class="svg" viewBox="0 0 100 100"
                                             xmlns="http://www.w3.org/2000/svg" version="1.1">
                                            <g class="elem elem-draggable elem-lineable" transform="matrix(1,0,0,1,0,0)">
                                                <rect width="80" height="40" x="5" y="5" rx="10" ry="10"
                                                      fill="#f6f7ff" stroke="#03689a" stroke-width="2"></rect>
                                                <g class="elem-icon" transform="matrix(1,0,0,1,8.03212833404541,14.056219100952148)">
                                                    <path id="kity_path_40" fill="#840023" stroke="none" d="M0,13c0,3.866,3.134,7,7,7h6c3.866,0,7-3.134,7-7V7H0V13z" transform="translate( 0.5 0.5 )"></path>
                                                    <path id="kity_path_41" fill="#FF1200" stroke="none" d="M20,10c0,3.866-3.134,7-7,7H7c-3.866,0-7-3.134-7-7V7c0-3.866,3.134-7,7-7h6c3.866,0,7,3.134,7,7V10z" opacity="0.8" transform="translate( 0.5 0.5 )"></path>
                                                    <text id="kity_text_42" text-rendering="geometricPrecision" x="9.5" y="10" text-anchor="middle" font-style="italic" font-size="12" fill="white" dy="4">1
                                                    </text>
                                                </g>
                                                <text font-family="Helvetica, Arial, sans-serif" x="45"
                                                      y="28.75" class="" text-anchor="middle">步骤
                                                </text>
                                            </g>
                                            <div class="name">步骤</div>
                                        </svg>
                                    </li>
                                    <li class="widget-item">
                                        <svg class="svg" viewBox="0 0 100 100"
                                             xmlns="http://www.w3.org/2000/svg" version="1.1">
                                            <g class="elem elem-draggable elem-lineable">
                                                <circle class="elem-lineable" opacity="0.44" fill="#72AE42" cx="31.452" cy="12.847" r="12.847"/>
                                                <polygon fill="#72AE42" points="6.304,32.801 0,39.105 0,91.536 12.147,91.536 12.147,65.603 12.659,65.603 12.659,131 30.7,131
		30.7,78.62 31.827,78.62 31.827,131 50.278,131 50.278,65.603 50.791,65.603 50.791,91.536 62.989,91.536 62.989,39.362
		56.428,32.801 	"/>
                                            </g>
                                            <div class="name">参与者</div>
                                        </svg>
                                    </li>
                                    <li class="widget-item">
                                        <svg class="svg" viewBox="0 0 200 200"
                                             xmlns="http://www.w3.org/2000/svg" version="1.1">
                                            <g class="elem elem-resizable elem-draggable elem-lineable">
                                                <ellipse cx="79.91969299316406" cy="41.76705741882324" rx="80" ry="40" fill="#09c" stroke="#ffffff" stroke-width="2" id="1"></ellipse>
                                                <text class="" x="86" y="46" fill="#ffffff" text-anchor="middle">用例</text>
                                            </g>
                                        </svg>
                                        <div class="name">用例</div>
                                    </li>
                                    <li class="widget-item">
                                        <svg class="svg" viewBox="0 0 400 400"
                                             xmlns="http://www.w3.org/2000/svg" version="1.1">
                                            <g class="elem elem-draggable">
                                                <rect data-style="fixedHeight" x="2.991962432861328" y="1.9879446029663086" width="275.6345443725586" height="40" fill="#09c" stroke="#000" stroke-width="2"></rect>
                                                <rect data-style="fixedTop" x="1.9879379272460938" y="43.15260314941406" width="276.63453674316406" height="186.29718017578125" fill="#aad3e0" stroke="#f0e3e3" stroke-width="2"></rect>
                                                <text data-style="fixedY" x="109.3974609375" y="25.065937399864197"  fill="#fff">容器标题</text>
                                            </g>
                                        </svg>
                                        <div class="name">容器</div>
                                    </li>
                                    <li class="widget-item">
                                        <svg class="svg" viewBox="0 0 400 400"
                                             xmlns="http://www.w3.org/2000/svg" version="1.1">
                                            <g class="elem elem-resizable elem-draggable">
                                                <polygon fill="#0099CC" stroke="#000000" stroke-width="2" points="115.175,135.878 71.164,112.498 26.953,135.499 35.589,86.417
	0.052,51.478 49.4,44.524 71.647,-0.071 93.511,44.713 142.797,52.091 106.962,86.724 "/>
                                                <text class="" x="45" y="28.75" fill="#fff" text-anchor="middle"></text>
                                            </g>
                                        </svg>
                                        <div class="name">星形</div>
                                    </li>
                                    <li class="widget-item">
                                        <svg class="svg" viewBox="0 0 400 400"
                                             xmlns="http://www.w3.org/2000/svg" version="1.1">
                                            <g class="elem elem-resizable elem-draggable">
                                                <polygon fill="#0099CC" stroke="#000000" stroke-width="2" points="102.962,5.89 9,79.517 102.962,153.89 198.134,79.89 "/>
                                                <text class="" x="45" y="28.75" fill="#fff" text-anchor="middle"></text>
                                            </g>
                                        </svg>
                                        <div class="name">菱形</div>
                                    </li>
                                    <li class="widget-item">
                                        <svg class="svg" viewBox="0 0 400 400"
                                             xmlns="http://www.w3.org/2000/svg" version="1.1">
                                            <g class="elem elem-resizable elem-draggable">
                                                <polygon fill="#0099CC" stroke="#000000" stroke-width="2" points="34.638,127.139 -0.725,65.89 34.638,4.641 105.362,4.641
	140.725,65.89 105.362,127.139 "/>
                                                <text class="" x="45" y="28.75" fill="#fff" text-anchor="middle"></text>
                                            </g>
                                        </svg>
                                        <div class="name">多边形</div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <h4 class="panel-title">
                                <a data-toggle="collapse" href="#collapseTwo3">流程图</a>
                            </h4>
                        </div>
                        <div id="collapseTwo3" class="panel-collapse collapse">
                            <div class="panel-body">
                                <ul class="widget-list">
                                    <li class="widget-item">
                                        <svg viewBox="0 0 100 100"
                                             xmlns="http://www.w3.org/2000/svg" version="1.1">
                                            <g class="elem elem-resizable elem-draggable elem-lineable" fill="#09c" stroke="#fff">
                                                <circle cx="44" cy="44" r="34.5" stroke-width="1"></circle>
                                                <text class="" x="45" y="48.75" fill="#fff" stroke="none" text-anchor="middle"></text>
                                            </g>
                                        </svg>
                                        <div class="name">圆</div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <h4 class="panel-title">
                                <a data-toggle="collapse" href="#collapseTwo4">UI</a>
                            </h4>
                        </div>
                        <div id="collapseTwo4" class="panel-collapse collapse">
                            <div class="panel-body">
                                <ul class="widget-list">
                                    <li class="widget-item">
                                        <svg viewBox="0 0 100 100"
                                             xmlns="http://www.w3.org/2000/svg" version="1.1">
                                            <!--<g fill="#09c" stroke="#fff">
                                                <circle cx="44" cy="44" r="34.5" stroke-width="1"></circle>
                                                <text class="" x="45" y="48.75" fill="#fff" stroke="none" text-anchor="middle"></text>
                                            </g>-->
                                            <g class="elem elem-resizable elem-draggable elem-lineable"><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><path d="M 10 5 C 10 4 11 2 13 2 L 23 2 C 25 2 26 4 26 5 L 26 31 C 26 32 25 34 23 34 L 13 34 C 11 34 10 32 10 31 Z Z M 11 5 L 11 31 L 25 31 L 25 5 Z" fill="#ffffff" stroke="#c0c0c0" stroke-miterlimit="10" pointer-events="all"></path><ellipse cx="15" cy="3" rx="0.24" ry="0.24" fill="#ffffff" stroke="#c0c0c0" pointer-events="all"></ellipse><rect x="16" y="32" width="4" height="1" rx="0" ry="0" fill="#ffffff" stroke="#c0c0c0" pointer-events="all"></rect><rect x="16" y="3" width="4" height="0" rx="0" ry="0" fill="#ffffff" stroke="#c0c0c0" pointer-events="all"></rect><ellipse cx="20" cy="3" rx="0.24" ry="0.24" fill="#ffffff" stroke="#c0c0c0" pointer-events="all"></ellipse><ellipse cx="21" cy="3" rx="0.24" ry="0.24" fill="#ffffff" stroke="#c0c0c0" pointer-events="all"></ellipse><ellipse cx="23" cy="3" rx="0.32" ry="0.32" fill="#ffffff" stroke="#c0c0c0" pointer-events="all"></ellipse></g></g><g></g><g></g></g>
                                        </svg>
                                        <div class="name">圆</div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!--<div class="layout-left">
                <ul id="tool-tab" class="nav nav-tabs">
                    <div class="nav-item active"><a id="tab-style" class="nav-link" href="#tab11" data-toggle="tab">编辑</a></div>
                    <div class="nav-item"><a class="nav-link" href="#tab12" data-toggle="tab">外观</a></div>
                    <div class="nav-item"><a id="tab-index" class="nav-link" href="#tab13" data-toggle="tab">文档</a></div>
                    <div class="nav-item"><a class="nav-link" href="#tab14" data-toggle="tab">其他</a></div>
                </ul>
                <div class="tab-content">
                    <div id="tab11" class="tab-pane fade active in">
                        <div class="form-horizontal">
                            <div>1212</div>
                        </div>
                    </div>
                    <div id="tab12" class="tab-pane fade">
                        <div class="form-horizontal">
                            <div>343444</div>
                        </div>
                    </div>
                </div>
            </div>-->
            <div id="workplace-box" class="workplace-box">
                <div id="workplace" class="workplace">
                    <div id="svg-box" class="svg-box bootstro"  data-bootstro-step='1' data-bootstro-width="200px" data-bootstro-title="编辑区" data-bootstro-content="可以在这里编辑形状" data-bootstro-placement="right">
                        <canvas id="bg-canvas" class="canvas"></canvas>
                        <svg id="svg" class="svg" viewBox="0 0 700 500"
                             xmlns="http://www.w3.org/2000/svg" version="1.1">
                            <defs>
                                <!-- style 在 vue 中会报错 -->
                                <!--<style type="text/css"></style>-->
                                <marker id="markerArrow" markerWidth="13" markerHeight="13" refx="2" refy="6" orient="auto">
                                    <path d="M2,2 L10,6 L2,10 L6,6 L2,2" style="fill: #000000;" />
                                </marker>
                                <marker id="arrow" markerWidth="10" markerHeight="10" refx="0" refy="3" orient="auto" markerUnits="strokeWidth">
                                    <path d="M0,0 L0,6 L9,3 z"/>
                                </marker>
                                <linearGradient id="orange_red" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" style="stop-color:rgb(255,255,0);
stop-opacity:1"/>
                                    <stop offset="100%" style="stop-color:rgb(255,0,0);
stop-opacity:1"/>
                                </linearGradient>
                            </defs>
                            <g id="line">
                            </g>
                            <g id="all">

                                <!-- 旋转测试 -->
                                <!--<g class="elem elem-resizable elem-draggable">
                                    <rect x="201.1" y="327" transform="matrix(0.74 0.6726 -0.6726 0.74 312.7228 -77.911)" class="st0" width="112" height="77"/>
                                    <rect x="274.8" y="462.8" transform="matrix(0.74 0.6726 -0.6726 0.74 428.491 -85.8783)" class="st0" width="101" height="97"/>
                                </g>-->

                                <!-- 普通测试 -->
                                <!--<g id="SvgjsG1795" class="elem" data-asd="1494679813957"><rect id="SvgjsRect1567" width="100" height="50" fill="#0099cc" stroke="#000000" stroke-width="1" class="elem-resizable" opacity="1" x="100" y="250"></rect><rect id="SvgjsRect1012" width="50" height="50" fill="#0099cc" stroke="#000000" stroke-width="1" class="elem-resizable" opacity="1" x="50" y="100"></rect><rect id="SvgjsRect1013" width="50" height="100" fill="#0099cc" stroke="#000000" stroke-width="1" class="elem-resizable" opacity="1" x="150" y="100"></rect><rect id="SvgjsRect1353" width="50" height="100" fill="#0099cc" stroke="#000000" stroke-width="1" class="elem-resizable" opacity="1" x="50" y="200"></rect></g>
                                <rect id="SvgjsRect1012" width="57.204301075268816" height="57.204301075268816" fill="#0099cc" stroke="#000000" stroke-width="1" class="elem elem-resizable" opacity="1" x="221.79211469534047" y="132.4731182795699"></rect>
                                <rect id="SvgjsRect1013" width="60.21505376344086" height="65.23297491039426" fill="#0099cc" stroke="#000000" stroke-width="1" class="elem elem-resizable" opacity="1" x="281.00358422939064" y="276.9892473118279"></rect>
                                -->
                                <!--<g class="elem elem-resizable elem-draggable"  id="minder_node2" transform="matrix( 1 0 0 1 278 0 )"><g id="node_expander1" transform="translate( -77 0 )" style="cursor: pointer;" display="none"><path id="kity_path_36" fill="white" stroke="gray" d="M6,0A6,6,0,1,1,-6,0A6,6,0,1,1,6,0"></path><path id="kity_path_37" fill="none" stroke="gray"></path></g><path id="node_outline2" fill="rgb(238, 243, 246)" stroke="rgb(57, 80, 96)" d="M-67,-16h140a3,3,0,0,1,3,3v26a3,3,0,0,1,-3,3h-140a3,3,0,0,1,-3,-3v-26a3,3,0,0,1,3,-3z" stroke-width="3"></path><g id="node_text2" transform="translate( 0 -2.1 )" fill="black"><text id="kity_text_33" text-rendering="inherit" dominant-baseline="text-before-edge" font-size="14" dy="0" y="-7">分支主题</text></g><g id="node_priority2" transform="translate( -25 -10 )"><path id="kity_path_45" fill="#840023" stroke="none" d="M0,13c0,3.866,3.134,7,7,7h6c3.866,0,7-3.134,7-7V7H0V13z" transform="translate( 0.5 0.5 )"></path><path id="kity_path_46" fill="#FF1200" stroke="none" d="M20,10c0,3.866-3.134,7-7,7H7c-3.866,0-7-3.134-7-7V7c0-3.866,3.134-7,7-7h6c3.866,0,7,3.134,7,7V10z" opacity="0.8" transform="translate( 0.5 0.5 )"></path><text id="kity_text_47" text-rendering="geometricPrecision" x="9.5" y="10" text-anchor="middle" font-style="italic" font-size="12" fill="white" dy="4">1</text></g><g id="node_progress1" transform="translate( -40 0 ) matrix( 1 0 0 1 0.5 0.5 )"><path id="kity_path_49" fill="#FFED83" stroke="none" d="M9,0A9,9,0,1,1,-9,0A9,9,0,1,1,9,0"></path><path id="kity_path_50" fill="#43BC00" stroke="none" d="M0 0L9 0A9,9,0,0,0,-6.363961030678928 -6.3639610306789285A9,9,0,0,0,-1.6532731788489267e-15 9L0 0z"></path><path id="kity_path_51" fill="#8E8E8E" stroke="none" d="M10,3c4.418,0,8,3.582,8,8h1c0-5.523-3.477-10-9-10S1,5.477,1,11h1C2,6.582,5.582,3,10,3z" transform="translate( -10 -10 )"></path><path id="kity_path_53" fill="#EEE" stroke="none" transform="translate( -10 -10 )" d="M15.812,7.896l-6.75,6.75l-4.5-4.5L6.25,8.459l2.812,2.803l5.062-5.053L15.812,7.896z" display="none"></path><path id="kity_path_52" fill="url(#kity_linearGradient_17)" stroke="none" transform="translate( -10 -10 )" d="M10,0C4.477,0,0,4.477,0,10c0,5.523,4.477,10,10,10s10-4.477,10-10C20,4.477,15.523,0,10,0zM10,18c-4.418,0-8-3.582-8-8s3.582-8,8-8s8,3.582,8,8S14.418,18,10,18z"></path></g></g>
        -->
                                <!--<g class="elem elem-resizable elem-draggable" id="node_priority1" transform="translate(0,0)">
                                    <path id="kity_path_40" fill="#840023" stroke="none"
                                          d="M0,13c0,3.866,3.134,7,7,7h6c3.866,0,7-3.134,7-7V7H0V13z"
                                          transform="translate( 0.5 0.5 )"></path>
                                    <path id="kity_path_41" fill="#FF1200" stroke="none"
                                          d="M20,10c0,3.866-3.134,7-7,7H7c-3.866,0-7-3.134-7-7V7c0-3.866,3.134-7,7-7h6c3.866,0,7,3.134,7,7V10z"
                                          opacity="0.8" transform="translate( 0.5 0.5 )"></path>
                                    <text id="kity_text_42" text-rendering="geometricPrecision" x="9.5" y="10"
                                          text-anchor="middle" font-style="italic" font-size="12" fill="white" dy="4">1
                                    </text>
                                </g>-->

                                <!--<line class="elem elem-resizable elem-draggable" x1="0" y1="0" x2="100" y2="100"
                                      marker-end="url(#arrow)"
                                      max-length="200" stroke="#000" stroke-width="2" id="SvgjsLine1029"></line>-->


                                <!--<polygon class="elem elem-resizable elem-draggable" id="SvgjsPolygon1006" points="350,50 283,250 450,122 250,122 416,250" stroke="#000000" stroke-width="1" fill="none" pointer-events="all"></polygon>
        -->
                                <!-- 渐变 -->
                                <!--<ellipse id="asda" class="elem" cx="200" cy="190" rx="85" ry="55"
                                         style="fill:url(#orange_red)"/>-->

                                <!-- 符合路径 -->

                                <!--<path id="path" class="elem elem-resizable elem-draggable" fill="#0099CC" stroke="#000000" stroke-width="2" d="M329.5930066649428 454.9820567225014C379.66946690466085 384.14153828994824 409.82078552111165 293.0359147077616 409.82078552111165 193.60638890894137C409.82078552111165 158.81556057015717 406.10851334463564 125.05237448034029 399.16761008509604 92.80496070774984L63.42919158935547 193.60638890894137L329.5930066649428 454.9820567225014Z " data-asd="1494251090833"></path>

                                <path class="elem elem-resizable elem-draggable" d="M173.6746749878639 183.71485710144043H253.6746749878639V223.71485710144043H173.6746749878639V183.71485710144043ZM51.20481872565688 51.204811096191406H174.20480346686782V163.20080184936523H51.20481872565688V51.204811096191406Z " stroke="#000000" stroke-width="2" fill="#0099cc" data-topath-type="rect" data-topath-id="SvgjsRect1040"></path>
                                <path id="XMLID_6_" class="elem elem-resizable elem-draggable" fill="#E60012" stroke="#000000" d="M15,15.429v115.714h175.714V15.429H15z
                 M145.714,93.286H60v-40h85.714V93.286z"/>-->
                                <!--<path  id="XMLID_2_"  class="elem elem-resizable elem-draggable" d="M53.6,381.1l110-260c0,0,241.4-51.4,288.6-12.9s47.1,252.9,47.1,252.9L297.6,525.4L53.6,381.1z"
                                />-->
                                <!--<path id="XMLID_1_" class="elem" d="M112.1,299.7L269.3,81.1c0,0,150,52.9,177.1,100c27.1,47.1-68.6,254.3-68.6,254.3L112.1,299.7z"
                                />-->

                                <!-- 多组嵌套测试 -->
                                <!--<g id="g1" class="elem draggable elem-draggable" transform="matrix(1,0,0,1,446,240)">
                                    <path id="node_outline1" fill="rgb(115, 161, 191)" stroke="rgb(57, 80, 96)"
                                          d="M-37,-26h268a5,5,0,0,1,5,5v42a5,5,0,0,1,-5,5h-268a5,5,0,0,1,-5,-5v-42a5,5,0,0,1,5,-5z"
                                          stroke-width="3"></path>
                                    <g id="node_text1" transform="translate( 0 -2.4 )" fill="white">
                                        <text id="kity_text_22" text-rendering="inherit" dominant-baseline="text-before-edge"
                                              font-size="16" dy="0" y="-20">天生我才网站（前端）信息架构
                                        </text>
                                        <text id="kity_text_1910" text-rendering="inherit" dominant-baseline="text-before-edge"
                                              font-size="16" dy="0" y="4">【深圳市爱闻科技有限公司】
                                        </text>
                                    </g>
                                    <g id="node_priority1" transform="translate( -30 -10 )">
                                        <path id="kity_path_4030" fill="#01467F" stroke="none"
                                              d="M0,13c0,3.866,3.134,7,7,7h6c3.866,0,7-3.134,7-7V7H0V13z"
                                              transform="translate( 0.5 0.5 )"></path>
                                        <path id="kity_path_4031" fill="#0074FF" stroke="none"
                                              d="M20,10c0,3.866-3.134,7-7,7H7c-3.866,0-7-3.134-7-7V7c0-3.866,3.134-7,7-7h6c3.866,0,7,3.134,7,7V10z"
                                              opacity="0.8" transform="translate( 0.5 0.5 )"></path>
                                        <text id="kity_text_4032" text-rendering="geometricPrecision" x="9.5" y="10"
                                              text-anchor="middle" font-style="italic" font-size="12" fill="white" dy="5">2
                                        </text>
                                    </g>
                                </g>-->

                                <!-- 连线测试 -->
                                <!--<line data-line="line" class="elem elem-joinable" lineStart="node-circle-1" lineEnd="end-1" x1="300" y1="150" x2="450" y2="150" stroke="red" stroke-width="2"></line>
                                <g id="end-1" class="elem elem-draggable elem-lineable">
                                    <rect id="_Gef_8" x="414.46240234375" y="131.4516143798828" width="80" height="40" rx="10" ry="10" fill="#F6F7FF" stroke="#03689A" stroke-width="2" class=""></rect>
                                    <text id="_Gef_9" class="" x="456.69232177734375" y="155.22262001037598" text-anchor="middle">步骤1</text>
                                </g>
                                <g id="asd2" class="elem elem-draggable elem-lineable" transform="matrix(1,0,0,1,404.216833114624,42.79919767379761)" cursor="pointer">
                                    <rect id="_Gef_10" x="5" y="5" width="80" height="40" rx="10" ry="10" fill="#F6F7FF" stroke="#03689A" stroke-width="2"></rect>
                                    <text id="_Gef_11" class="" x="45" y="28.75" text-anchor="middle">步骤2</text>
                                </g>
                                <circle data-title="12" title="12" id="node-circle-1" class="elem elem-resizable elem-draggable elem-lineable" cx="300" cy="150" r="20" stroke="#000"  fill="#000" />
                                -->
                            </g>
                            <g id="tmp">
                            </g>
                        </svg>
                        <canvas id="front-canvas" class="canvas" style="pointer-events: none;"></canvas>
                        <!-- 编辑文字 -->
                        <div id="input-box" class="input-box">
                            <textarea class="input"></textarea>
                        </div>
                    </div>

                </div>
            </div>
            <div class="edit-tool">
                <ul id="tool-tab" class="nav nav-tabs">
                    <div class="nav-item active"><a id="tab-style" class="nav-link" href="#tab11" data-toggle="tab">编辑</a></div>
                    <div class="nav-item"><a class="nav-link" href="#tab12" data-toggle="tab">外观</a></div>
                    <div class="nav-item"><a id="tab-index" class="nav-link" href="#tab13" data-toggle="tab">文档</a></div>
                    <div class="nav-item"><a class="nav-link" href="#tab14" data-toggle="tab">其他</a></div>
                </ul>
                <div class="tab-content">
                    <div id="tab11" class="tab-pane fade active in">
                        <div class="form-horizontal">
                            <div class="form-groups">
                                <h4 class="title">填充</h4>
                                <div class="form-group">
                                    <label class="control-label col-sm-3">填充</label>
                                    <div class="col-sm-8">
                                        <input id="editor-fill-color" class="form-control" type="text">
                                        <div class="btn-group">
                                            <!--<button class="btn btn-default">颜色</button>-->
                                            <!--<button class="btn btn-default">渐变</button>-->
                                            <button id="editor-fill-none" class="btn btn-default" data-toggle="tooltip" title="不填充"><i class="draw-icon draw-icon-no"></i></button>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="control-label col-sm-3">不透明度</label>
                                    <div class="col-sm-4">
                                        <input id="editor-opacity" class="form-control" type="number" max="100" min="0" step="1">
                                    </div>
                                </div>
                            </div>
                            <div class="form-groups">
                                <h4 class="title">线条</h4>
                                <div class="form-group">
                                    <label class="control-label col-sm-3">线条色</label>
                                    <div class="col-sm-4">
                                        <input id="editor-stroke-color" class="form-control" type="text">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="control-label col-sm-3">线条宽度</label>
                                    <div class="col-sm-4">
                                        <input id="editor-stroke-width" class="form-control" type="number" min="0" max="100">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="control-label col-sm-3">线条样式</label>
                                    <div class="col-sm-4">
                                        <select id="stroke-dasharray" class="form-control">
                                            <option value="none">无</option>
                                            <option value="2,5">点线</option>
                                            <option value="10,5">虚线</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div id="editor-img-box" class="editor-box editor-image-box">
                                <div class="form-groups">
                                    <h4 class="title">图片编辑</h4>
                                    <div class="form-group">
                                        <button id="editor-relace-img" class="btn btn-primary">替换图片</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="tab12" class="tab-pane fade">
                        <div class="form-horizontal">
                            <div class="editor-box editor-base-box">
                                <div class="tip">请选择组件进行编辑</div>
                            </div>
                            <div id="editor-text-box" class="editor-box editor-text-box">
                            </div>
                            <div class="editor-box editor-common-box">
                                <div class="form-groups">
                                    <h4 class="title">大小及位置</h4>
                                    <div class="form-group">
                                        <label class="control-label col-sm-3">水平位置X</label>
                                        <div class="col-sm-4">
                                            <input id="editor-x" class="form-control" type="number">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="control-label col-sm-3">垂直位置Y</label>
                                        <div class="col-sm-4">
                                            <input id="editor-y" class="form-control" type="number">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="control-label col-sm-3">宽度</label>
                                        <div class="col-sm-4">
                                            <input id="editor-width" class="form-control" type="number" min="0">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="control-label col-sm-3">高度</label>
                                        <div class="col-sm-4">
                                            <input id="editor-height" class="form-control" type="number" min="0">
                                        </div>
                                    </div>
                                </div>
                                <div class="form-groups">
                                    <h4 class="title">旋转</h4>
                                    <div class="form-group">
                                        <label class="control-label col-sm-3">旋转</label>
                                        <div class="col-sm-4">
                                            <input id="editor-rotation" class="form-control" type="number">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="editor-box editor-shape-box">
                                <div class="form-groups">
                                    <h4 class="title">形状</h4>
                                    <div class="form-group">
                                        <label class="control-label col-sm-3">类型</label>
                                        <div class="col-sm-9">
                                            <div id="editor-type" class="form-control-static">1212</div>
                                        </div>
                                    </div>
                                    <div class="editor-type-box editor-circle-box">
                                        <div class="form-group">
                                            <label class="control-label col-sm-3">半径</label>
                                            <div class="col-sm-4">
                                                <input id="editor-radius" class="form-control" type="number" min="0">
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="control-label col-sm-3">圆心X</label>
                                            <div class="col-sm-4">
                                                <input id="editor-circle-cx" class="form-control" type="number" min="0">
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="control-label col-sm-3">圆心Y</label>
                                            <div class="col-sm-4">
                                                <input id="editor-circle-cy" class="form-control" type="number" min="0">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="editor-type-box editor-text-box">
                                        <div class="form-group">
                                            <label class="control-label col-sm-3">字体</label>
                                            <div class="col-sm-9">
                                                <select id="editor-font-family" class="form-control">
                                                    <option>微软雅黑</option>
                                                    <option>宋体</option>
                                                    <option>仿宋</option>
                                                    <option>楷体</option>
                                                    <option>黑体</option>
                                                    <option>Heiti SC</option>
                                                    <option>Open Sans</option>
                                                    <option>Verdana</option>
                                                    <option>Tahoma</option>
                                                    <option>Georgia</option>
                                                    <option>Trebuchet MS</option>
                                                    <option>Lucida Family</option>

                                                    <option>Arial</option>
                                                    <option>Georgia</option>
                                                    <option>Times New Roman</option>
                                                    <option>Courier New</option>
                                                    <option>Impact</option>
                                                    <option>Comic Sans MS</option>
                                                    <option>Garamond</option>
                                                    <option>Lucida Console</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="editor-type-box editor-rect-box editor-image-box">
                                        <div class="form-group">
                                            <label class="control-label col-sm-3">水平圆角</label>
                                            <div class="col-sm-4">
                                                <input id="editor-rect-rx" class="form-control" type="number" min="0">
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="control-label col-sm-3">垂直圆角</label>
                                            <div class="col-sm-4">
                                                <input id="editor-rect-ry" class="form-control" type="number" min="0">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="editor-type-box editor-ellipse-box">
                                        <div class="form-group">
                                            <label class="control-label col-sm-3">中心位置X</label>
                                            <!--<div class="col-sm-4">
                                                <div class="input-group">
                                                    <span class="input-group-addon">X</span>
                                                    <input id="editor-ellipse-cx" class="form-control" type="number" min="0">
                                                </div>
                                            </div>-->
                                            <div class="col-sm-4">
                                                <input id="editor-ellipse-cx" class="form-control" type="number" min="0">
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="control-label col-sm-3">中心位置Y</label>
                                            <div class="col-sm-4">
                                                <input id="editor-ellipse-cy" class="form-control" type="number" min="0">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!--<div class="form-groups">
                                    <h4 class="title">图标</h4>
                                    <ul id="icon-list" class="widget-list">
                                        <li class="widget-item">
                                            <svg class="svg" viewBox="0 0 100 100"
                                                 xmlns="http://www.w3.org/2000/svg" version="1.1">
                                                <g id="node_priority2" transform="translate( -25 -10 )"><path id="kity_path_45" fill="#01467F" stroke="none" d="M0,13c0,3.866,3.134,7,7,7h6c3.866,0,7-3.134,7-7V7H0V13z" transform="translate( 0.5 0.5 )"></path><path id="kity_path_46" fill="#0074FF" stroke="none" d="M20,10c0,3.866-3.134,7-7,7H7c-3.866,0-7-3.134-7-7V7c0-3.866,3.134-7,7-7h6c3.866,0,7,3.134,7,7V10z" opacity="0.8" transform="translate( 0.5 0.5 )"></path><text id="kity_text_47" text-rendering="geometricPrecision" x="9.5" y="10" text-anchor="middle" font-style="italic" font-size="12" fill="white" dy="4">2</text></g>
                                                <div class="name">样式一</div>
                                            </svg>
                                        </li>
                                    </ul>

                                </div>
                                <div class="form-groups">
                                    <h4 class="title">形状样式</h4>
                                    <ul id="style-list" class="widget-list">
                                        <li class="widget-item">
                                            <svg class="svg" viewBox="0 0 100 100"
                                                 xmlns="http://www.w3.org/2000/svg" version="1.1">
                                                <g class="elem elem-draggable elem-lineable" transform="matrix(1,0,0,1,0,0)">
                                                    <rect width="80" height="40" x="5" y="5" rx="10" ry="10"
                                                          fill="#f6f7ff" stroke="#03689a" stroke-width="2"></rect>
                                                    <text font-family="Helvetica, Arial, sans-serif" x="45"
                                                          y="28.75" class="" text-anchor="middle">步骤
                                                    </text>
                                                </g>
                                                <div class="name">样式一</div>
                                            </svg>
                                        </li>
                                    </ul>

                                </div>-->
                            </div>
                        </div>
                    </div>
                    <div id="tab13" class="tab-pane fade">
                        <div class="form-horizontal">
                            <div class="form-groups">
                                <h4 class="title">画布大小</h4>
                                <div class="form-group">
                                    <label class="control-label col-sm-3">文档宽度</label>
                                    <div class="col-sm-4">
                                        <div id="editor-doc-width" class="form-control-static">100px</div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="control-label col-sm-3">文档高度</label>
                                    <div class="col-sm-4">
                                        <div id="editor-doc-height" class="form-control-static">100px</div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="control-label col-sm-3"></label>
                                    <div class="col-sm-4">
                                        <button id="switch" class="btn btn-default">切换大小</button>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="control-label col-sm-3">网格大小</label>
                                    <div class="col-sm-4">
                                        <input id="editor-grid" class="form-control" type="number" value="50">
                                    </div>
                                </div>
                            </div>
                            <div class="form-groups">
                                <h4 class="title">缩略图</h4>
                                <div id="thumbnail" class="thumbnail-box">
                                    <div id="thumbnail-canvas" class="thumbnail-canvas"></div>
                                    <div id="thumbnail-viewbox" class="thumbnail-viewbox"></div>
                                </div>
                                <div class="form-group">
                                    <label class="control-label col-sm-3">缩放</label>
                                    <div class="col-sm-4">
                                        <p id="scale-num" class="form-control-static">100%</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div><!-- /.tab-pane -->
                    <div id="tab14" class="tab-pane fade">
                        <div class="form-horizontal">
                            <div class="editor-box editor-base-box">
                                <div class="tip">请选择组件进行编辑</div>
                            </div>
                            <div class="editor-box editor-common-box">
                                <div class="form-groups">
                                    <h4 class="title">其他属性</h4>
                                    <div class="form-group">
                                        <label class="control-label col-sm-3">屏幕提示</label>
                                        <div class="col-sm-9">
                                            <textarea id="editor-tip" class="form-control" rows="4" placeholder="提示文本"></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="position"><span id="position">(0, 0)</span></div>
        <ul id="color-list" class="color-list">
            <li class="color-item active" style="background-color: #000" data-color="#000"></li>
            <li class="color-item" style="background-color: #f00" data-color="#f00"></li>
            <li class="color-item" style="background-color: #80FF00" data-color="#80FF00"></li>
            <li class="color-item" style="background-color: #00FFFF" data-color="#00FFFF"></li>
            <li class="color-item" style="background-color: #808080" data-color="#808080"></li>
            <li class="color-item" style="background-color: #FF8000" data-color="#FF8000"></li>
            <li class="color-item" style="background-color: #408080" data-color="#408080"></li>
            <li class="color-item" style="background-color: #8000FF" data-color="#8000FF"></li>
            <li class="color-item" style="background-color: #CCCC00" data-color="#CCCC00"></li>
        </ul>
        <!-- 元素右键菜单 -->
        <ul id="elem-menu" class="elem-menu dropdown-menu dropdown-context-menu">
            <li><a id="elem-menu-cut" href="#">剪切<span class="tip">（Ctrl + X）</span></a></li>
            <li><a id="elem-menu-copy" href="#">复制<span class="tip">（Ctrl + C）</span></a></li>
            <li><a id="elem-menu-paste" href="#">粘贴<span class="tip">（Ctrl + V）</span></a></li>
            <li class="divider"></li>
            <li><a id="elem-menu-group-add" href="#">编组<span class="tip">（Ctrl + G）</span></a></li>
            <li><a id="elem-menu-group-cancel" href="#">取消分组</a></li>
            <li class="divider"></li>
            <li class="dropdown-submenu"> <a href="#">对齐</a>
                <ul class="dropdown-menu pull-right">
                    <li><a id="elem-menu-align-left" href="#">左对齐</a></li>
                    <li><a id="elem-menu-align-center" href="#">居中</a></li>
                    <li><a id="elem-menu-align-right" href="#">右对齐</a></li>
                    <li class="divider"></li>
                    <li><a id="elem-menu-align-top" href="#">顶部</a></li>
                    <li><a id="elem-menu-align-middle" href="#">中间</a></li>
                    <li><a id="elem-menu-align-bottom" href="#">底部</a></li>
                </ul>
            </li>
            <li class="dropdown-submenu"> <a href="#">排列</a>
                <ul class="dropdown-menu pull-right">
                    <li><a id="elem-menu-move-front" href="#">置于顶层</a></li>
                    <li><a id="elem-menu-move-behind" href="#">置于底层</a></li>
                    <li><a id="elem-menu-move-up" href="#">上移一层</a></li>
                    <li><a id="elem-menu-move-down" href="#">下移一层</a></li>
                </ul>
            </li>
            <li class="divider"></li>
            <li class="dropdown-submenu"> <a href="#">样式</a>
                <ul class="dropdown-menu pull-right">
                    <li><a id="elem-copy-style" href="#">复制样式</a></li>
                    <li><a id="elem-paste-style" href="#">粘贴样式</a></li>
                </ul>
            </li>
            <li><a id="elem-menu-delete" href="#">删除</a></li>
        </ul>

        <!-- 左侧预览菜单 -->
        <ul id="preview-menu" class="preview-menu dropdown-menu">
            <li><a href="#">复制（Ctrl + C）</a></li>
            <li><a href="#">粘贴（Ctrl + V）</a></li>
            <li class="divider"></li>
            <li><a id="preview-menu-delete" href="#">删除（Delete）</a></li>
        </ul>
        <!-- 编辑器右键菜单 -->
        <ul id="editor-menu" class="dropdown-menu">
            <li><a id="editor-menu-paste" href="#">粘贴</a></li>
        </ul>
        <div id="tip-box" class="tip-box">
            <div>X: 120</div>
            <div>Y: 130</div>
        </div>
        <div id="preview-box" class="preview-box">
            <canvas id="preview-canvas" class="canvas"></canvas>
            <a id="preview-close" class="preview-close" href="">关闭</a>
        </div>
        <!-- 组件预览 -->
        <div id="widget-box" class="widget-box">
            <div id="widget-box-name" class="name">圆形</div>
        </div>
        <!-- 拖拽测试 -->
        <div id="drag"></div>
        <!-- 选择显示框 -->
        <div id="select-box" class="select-box"></div>
        <div id="new-dialog" class="new-dialog">
            <form class="form-horizontal">
                <div class="form-group">
                    <label class="control-label col-sm-4">宽度(px)</label>
                    <div class="col-sm-4">
                        <input id="new-dialog-width" class="form-control" value="500" type="number">
                    </div>
                </div>
                <div class="form-group">
                    <label class="control-label col-sm-4">高度(px)</label>
                    <div class="col-sm-4">
                        <input id="new-dialog-height" class="form-control" value="500" type="number">
                    </div>
                </div>
                <div class="form-group">
                    <label class="control-label col-sm-4">背景内容</label>
                    <div class="col-sm-4">
                        <select id="new-dialog-bg" class="form-control">
                            <option value="0">白色</option>
                            <option value="1">透明</option>
                        </select>
                    </div>
                </div>
                <div class="form-group">
                    <label class="control-label col-sm-4"></label>
                    <div class="col-sm-4">
                        <button id="new-dialog-ok" class="btn btn-primary">确定</button>
                    </div>
                </div>
            </form>
        </div>
        <!-- 调整大小 -->
        <div id="resize-dialog" class="resize-dialog">
            <form class="form-horizontal">
                <div class="form-group">
                    <label class="control-label col-sm-4">宽度(px)</label>
                    <div class="col-sm-4">
                        <input id="resize-dialog-width" class="form-control" value="500" type="number">
                    </div>
                </div>
                <div class="form-group">
                    <label class="control-label col-sm-4">高度(px)</label>
                    <div class="col-sm-4">
                        <input id="resize-dialog-height" class="form-control" value="500" type="number">
                    </div>
                </div>
                <div class="form-group">
                    <label class="control-label col-sm-4"></label>
                    <div class="col-sm-4">
                        <button id="resize-dialog-ok" class="btn btn-primary">确定</button>
                    </div>
                </div>
            </form>
        </div>
        <!-- 左侧拖拽时用到 -->
        <div id="asd" style="display: none"></div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
            }
        },
        mounted() {
            this.init()
        },
        methods: {
            about() {
                ui.alert('Shapes v17.4')
            },
            fullscreen() {
            },
            // 保存
            save() {
                this.et.save()
            },
            // 下载
            downloadPng() {
                this.et.download()
            },
            downloadSvg() {
                this.et.download('svg')
            },
            // 清除
            clear() {
                this.et.clear()
            },
            init() {
                var et = new SVGEditor('svg-box', 'svg', {
                    width: 560,
                    height: 560,
                    grid: 50
                })
                this.et = et
                this.et.setShowGrid(true)
                this.et.initIndex()
                this.et.usePlugin('select')
                this.et.preloadPlugin('join')

                var path = SVG.get('path');
                //et.dealPath(path);

                // 新建
                $('#new').on('click', function (e) {
                    e.preventDefault();
                    et.clear();
                });

                // 显示网格
                $('#show-grid').on('change', function () {
                    et.setShowGrid(this.checked);
                });

                // 调整画布大小
                $('#switch').on('click', function () {
                    $('#resize-dialog-width').val(et.width);
                    $('#resize-dialog-height').val(et.height);

                    $('#resize-dialog').dialog({
                        title: '调整大小',
                        btn: false
                    });

                    $('#resize-dialog-ok').one('click', function (e) {
                        e.preventDefault();

                        var width = $('#resize-dialog-width').val() || 500;
                        var height = $('#resize-dialog-height').val() || 500;
                        //var bg = $('#new-dialog-bg').val();
                        $('#resize-dialog').dialog('hide');
                        et.newSize(width, height);
                    });
                });

                // TODO 和插件冲突
                $(document).on('click', '[data-type]', function () {
                    var type = $(this).data('type');
                    et.usePlugin(type);
                });

                $('#undo').on('click', function () {
                });

                $('#redo').on('click', function () {
                });

                $('#play').on('click', function () {
                    et.play();
                });

                $('#type-list-box').selectable({
                    item: '.btn'
                });

                // 全屏
                var isFullScreen = false;

                function fullElem(docElm) {
                    if (docElm.requestFullscreen) {
                        docElm.requestFullscreen();
                    } else if (docElm.msRequestFullscreen) {
                        docElm.msRequestFullscreen();
                    } else if (docElm.mozRequestFullScreen) {
                        docElm.mozRequestFullScreen();
                    } else if (docElm.webkitRequestFullScreen) {
                        docElm.webkitRequestFullScreen();
                    }
                }

                // 预览
                $('#display-show').on('click', function () {
                    et.preview();
                    $('#preview-box').show();
                });
                $('#preview-close').on('click', function (e) {
                    e.preventDefault();
                    $('#preview-box').hide();
                });

                // 全屏
                $("#fullscreen").click(function () {
                    var docElm = document.getElementById('editor');

                    if (!isFullScreen) {
                        $(this).html('<i class="draw-icon draw-icon-fullscreen2"></i>');
                        isFullScreen = true;
                        // 全屏播放
                        fullElem(document.documentElement);
                    } else {
                        $(this).html('<i class="draw-icon draw-icon-fullscreen"></i>');
                        isFullScreen = false;
                        // 取消全屏
                        if (document.exitFullscreen) {
                            document.exitFullscreen();
                        } else if (document.msExitFullscreen) {
                            document.msExitFullscreen();
                        } else if (document.mozCancelFullScreen) {

                            document.mozCancelFullScreen();
                        } else if (document.webkitCancelFullScreen) {
                            document.webkitCancelFullScreen();
                        }
                    }
                });

                document.onselectstart=new Function("event.returnValue=false;");

                // 快速导航
                $('#quick-help').on('click', function (e) {
                    e.preventDefault();
                    bootstro.start('.bootstro', {
                        nextButtonText: '继续 >>',
                        prevButtonText: '<< 返回',
                        finishButtonText: '关闭'
                    });
                });

                $("[data-toggle='tooltip']").tooltip();

                //$('#tab13').tab();

                // 添加分组
                $('#elem-menu-group-add').on('click', function (e) {
                    et.groupSelectedElem();
                });
                // 取消分组
                $('#elem-menu-group-cancel').on('click', function (e) {
                    et.ungroupSelectedElem();
                });

                $('#elem-menu-move-front').on('click', function () {
                    et.frontSelectedElem();
                });
                $('#elem-menu-move-behind').on('click', function () {
                    et.backSelectedElem();
                });
                $('#elem-menu-move-up').on('click', function () {
                    et.forwardSelectedElem();
                });
                $('#elem-menu-move-down').on('click', function () {
                    et.backwardSelectedElem();
                });
                // 剪切
                $('#elem-menu-cut').on('click', function (e) {
                    et.cutSelectedElem();
                });
                // 复制
                $('#elem-menu-copy').on('click', function (e) {
                    et.copySelectedElem();
                });
                // 粘贴
                $('#elem-menu-paste,#editor-menu-paste').on('click', function (e) {
                    et.pasteElem();
                });
                // 删除
                $('#elem-menu-delete').on('click', function (e) {
                    et.removeSelectedElem();
                });
                // 对齐
                $('#elem-menu-align-left').on('click', function (e) {
                    if (et.selectedElems.length === 1) {
                        et.dealSelectedElem(function (el) {
                            var rbox = et.rbox(el);
                            et.moveElem(el, 0, rbox.y);
                        });
                    } else if (et.selectedElems.length > 1) {
                        var x = et.rbox(et.selectedElems[0]).x;
                        et.selectedElems.forEach(function (el) {
                            var rbox = et.rbox(el);
                            et.moveElem(el, x, rbox.y);
                        });
                    }
                });
                $('#elem-menu-align-right').on('click', function (e) {
                    if (et.selectedElems.length === 1) {
                        et.dealSelectedElem(function (el) {
                            var rbox = et.rbox(el);
                            et.moveElem(el, et.width0 - rbox.width, rbox.y);
                        });
                    } else if (et.selectedElems.length > 1) {
                        var firstBox = et.rbox(et.selectedElems[0]);
                        et.selectedElems.forEach(function (el) {
                            var rbox = et.rbox(el);
                            var x = firstBox.x + firstBox.width - rbox.width;
                            et.moveElem(el, x, rbox.y);
                        });
                    }
                });
                $('#elem-menu-align-center').on('click', function (e) {
                    if (et.selectedElems.length === 1) {
                        et.dealSelectedElem(function (el) {
                            var rbox = et.rbox(el);
                            et.moveElem(el, (et.width0 - rbox.width) / 2, rbox.y);
                        });
                    } else if (et.selectedElems.length > 1) {
                        var firstBox = et.rbox(et.selectedElems[0]);
                        et.selectedElems.forEach(function (el) {
                            var rbox = et.rbox(el);
                            var x = firstBox.x + (firstBox.width - rbox.width) / 2;
                            et.moveElem(el, x, rbox.y);
                        });
                    }
                });
                $('#elem-menu-align-top').on('click', function (e) {
                    if (et.selectedElems.length === 1) {
                        et.dealSelectedElem(function (el) {
                            var rbox = et.rbox(el);
                            et.moveElem(el, rbox.x, 0);
                        });
                    } else if (et.selectedElems.length > 1) {
                        var firstBox = et.rbox(et.selectedElems[0]);
                        et.selectedElems.forEach(function (el, idx) {
                            if (idx !== 0) {
                                var rbox = et.rbox(el);
                                var y = firstBox.y;
                                et.moveElem(el, rbox.x, y);
                            }
                        });
                    }
                });
                $('#elem-menu-align-middle').on('click', function (e) {
                    if (et.selectedElems.length === 1) {
                        et.dealSelectedElem(function (el) {
                            var rbox = et.rbox(el);
                            et.moveElem(el, rbox.x, (et.height0 - rbox.height) / 2);
                        });
                    } else if (et.selectedElems.length > 1) {
                        var firstBox = et.rbox(et.selectedElems[0]);
                        et.selectedElems.forEach(function (el, idx) {
                            if (idx !== 0) {
                                var rbox = et.rbox(el);
                                var y = firstBox.y + (firstBox.height - rbox.height) / 2;
                                et.moveElem(el, rbox.x, y);
                            }
                        });
                    }
                });
                $('#elem-menu-align-bottom').on('click', function (e) {
                    if (et.selectedElems.length === 1) {
                        et.dealSelectedElem(function (el) {
                            var rbox = et.rbox(el);
                            et.moveElem(el, rbox.x, et.height0 - rbox.height);
                        });
                    } else if (et.selectedElems.length > 1) {
                        var firstBox = et.rbox(et.selectedElems[0]);
                        et.selectedElems.forEach(function (el, idx) {
                            if (idx !== 0) {
                                var rbox = et.rbox(el);
                                var y = firstBox.y + firstBox.height - rbox.height;
                                et.moveElem(el, rbox.x, y);
                            }
                        });
                    }
                });
                // 样式
                $('#elem-menu-align-middle').on('click', function (e) {
                    if (et.selectedElems.length === 1) {
                        et.dealSelectedElem(function (el) {
                            var rbox = et.rbox(el);
                            et.moveElem(el, rbox.x, (et.height0 - rbox.height) / 2);
                        });
                    }
                });
            },
            makeUseCase() {

            }
        }
    }
</script>

<style scoped>
</style>
