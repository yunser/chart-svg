<template>
    <div class="page page-help">
        <header class="page-header">
            <mu-appbar title="帮助手册">
                <!--<mu-icon-button icon="menu" slot="left"/>-->
                <!--<mu-flat-button label="expand_more" slot="right"/>-->
                <!--<mu-icon-button icon="expand_more" slot="right"/>-->
            </mu-appbar>
        </header>
        <main class="page-body">
            <mu-content-block>
                <article class="article">
                </article>
            </mu-content-block>
            <div class="container">
                <mu-row gutter>
                    <mu-col width="50" tablet="30" desktop="15">
                        <mu-list>
                            <mu-list-item title="简介"></mu-list-item>
                            <mu-list-item title="操作"></mu-list-item>
                        </mu-list>
                    </mu-col>
                    <mu-col width="50" tablet="30" desktop="45">
                        <div class="article shape-article">
                            <h2>简介</h2>
                            <p>Shapes 是一个简单的在线图形制作工具网站，可以方便地绘制简单的图形、SVG 文件编辑、作图等。</p>

                            <h2>功能介绍</h2>
                            <p>本软件具有如下功能：</p>
                            <ul>
                                <li>基本图形的绘制。</li>
                                <li>可导出 png 图片或 svg 文件。</li>
                            </ul>
                            <p>下一版本将会支持 UML 图。敬请期待。</p>

                            <h2>操作</h2>
                            <p>双击组件可以编辑文字。（基本图形无法添加文字）</p>
                            <p>双击路径可以编辑路径。</p>
                            <p>可以直接拖拽 svg 格式文件到编辑区，只支持预览，暂不支持编辑。</p>

                            <h3>导出</h3>
                            <p>在菜单【文件】->【下载】可以导出 PNG 图片或 SVG 图片。如果你希望下次能再次编辑图形，可以导出为 SVG 图片。</p>
                            <h3>导入</h3>
                            <p>直接将导出的 SVG 图片拖拽到编辑器即可。</p>

                            <h2>工具</h2>
                            <p>选择工具：选择形状、选择多个形状、拖拽改变形状位置、缩放、旋转。</p>
                            <p>直接选择工具：编辑形状，结合钢笔工具，可以绘制复杂的形状。</p>
                            <p>连线工具：链接两个形状。</p>
                            <p>取色工具：吸取形状的填充色，快速获取形状的颜色。</p>
                            <p>格式刷：？？？</p>

                            <h2>绘图</h2>
                            <p>直线：绘制直线。</p>
                            <p>矩形：绘制矩形。按住 Shift 键可以绘制正方形。</p>
                            <p>椭圆：绘制椭圆。按住 Shift 键可以绘制圆形。按住 Alt 键可以以某一点为中心画椭圆/圆。</p>
                            <p>多边形：绘制多边形。选择多边形后，按数字键可以设置多边形的边数。</p>
                            <p>星形：绘制星形。选择星形后，按数字键可以设置星形的角数。</p>
                            <p>文字：插入文字。</p>

                            <h2>快速命令</h2>

                            <h1>素材</h1>
                            <p>编辑器左侧的素材栏提供了常见的图形，可以直接拖拽到编辑器，方便我们快速制作图形。</p>
                            <p>此外，编辑器还支持导入 SVG 图形素材，你可以把 svg 格式的文件直接拖拽到编辑器。</p>
                            <div>常见的 svg 素材下载网站：<a href="http://www.iconfont.cn" target="_blank">Iconfont</a> </div>

                            <h2>批量操作</h2>
                            <p>使用选择工具可以选择多个形状，对多个形状进行批量操作，提供绘图效率。</p>

                            <h1>编组</h1>
                            <p>除了图形、图片、文本这样的基本图层之外，Shape 还有一些可以帮助你管理和展现导出的特殊图层。</p>
                            <h2>组</h2>
                            <p>你可以对多个图层进行 编组 ，并呈现为一个图层。</p>

                            <h1>画布</h1>
                            <p>Shape 支持自定义画布大小，你可以在右侧选项版【文档】里点击【切换大小】按钮来设置画布的大小。</p>
                            <h3>导航</h3>
                            <p>画布中的导航是非常容易的，你可以直接用鼠标滚轮滑动来控制方向。你还可以按住空格键，来使用抓手工具移动画布。并且，没有任何对象被选中的时候，你可以用方向键来移动画布。</p>
                            <h3>网格</h3>
                            <p>Shape 提供网格来辅助对齐，默认开启，可以在菜单栏【视图】里关闭网格。</p>
                            <h2>快捷键</h2>
                            <p>Shape 有一系列为数不多但相当实用的快捷键，他们能大大提高你的工作效率。</p>
                            <!--<ul>
                                <li>空白键：按住可以使用鼠标移动画布。</li>
                            </ul>-->

                            <table class="table table-bordered key-table">
                                <tr>
                                    <th width="80">分类</th>
                                    <th>快捷键</th>
                                    <th>功能</th>
                                    <th>补充说明</th>
                                </tr>


                                <tr>
                                    <td rowspan="2">全局操作</td>
                                    <td><span class="key">?</span></td>
                                    <td>帮助</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td><span class="key">Ctrl</span> + <span class="key">Shift</span></td>
                                    <td>保存</td>
                                    <td></td>
                                </tr>


                                <tr>
                                    <td rowspan="6">绘图</td>
                                    <td><span class="key">R</span></td>
                                    <td>直角矩形</td>
                                    <td>按 Shift 绘制正方形</td>
                                </tr>
                                <tr>
                                    <td><span class="key">L</span></td>
                                    <td>直线</td>
                                    <td>按 Shift 绘制水平、垂直或45°的直线</td>
                                </tr>
                                <tr>
                                    <td><span class="key">O</span></td>
                                    <td>椭圆</td>
                                    <td>按 Shift 绘制正圆</td>
                                </tr>
                                <tr>
                                    <td><span class="key">Alt</span></td>
                                    <td>以鼠标按下的位置作为绘制的形状的中心</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td><span class="key">Shift</span></td>
                                    <td>等比例缩放</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td><span class="key">3</span> - <span class="key">9</span></td>
                                    <td>绘制多边形或星形时，按数字键可以设置边数</td>
                                    <td></td>
                                </tr>


                                <tr>
                                    <td rowspan="8">操作对象</td>
                                    <td><span class="key">Delete</span> / <span class="key">Backspace</span></td>
                                    <td>删除所有选中组件</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td><span class="key">Ctrl</span> + <span class="key">A</span></td>
                                    <td>选中所有组件</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td><span class="key">Ctrl</span> + <span class="key">D</span></td>
                                    <td>快速复制</td>
                                    <td>按住 Alt 键后鼠标点击形状<!--拖动图形-->页可复制</td>
                                </tr>
                                <tr>
                                    <td><span class="key">Ctrl</span> + <span class="key">C</span></td>
                                    <td>复制组件到剪切板</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td><span class="key">Ctrl</span> + <span class="key">V</span></td>
                                    <td>粘贴组件</td>
                                    <td>右键，【粘贴】可以粘贴到鼠标位置</td>
                                </tr>
                                <tr>
                                    <td><span class="key">Ctrl</span> + <span class="key">X</span></td>
                                    <td>剪切组件</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td><span class="key">Ctrl</span> + <span class="key">G</span></td>
                                    <td>编组</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td><span class="key">Ctrl</span> + <span class="key">Shift</span> + <span class="key">G</span></td>
                                    <td>取消编组</td>
                                    <td></td>
                                </tr>

                                <!--<tr>
                                    <td rowspan="5">画布</td>
                                    <td><span class="key">Ctrl</span> + <span class="key">-</span></td>
                                    <td>缩小画布</td>
                                    <td></td>
                                </tr>-->
                                <tr>
                                    <td rowspan="4">画布</td>
                                    <td><span class="key">Ctrl</span> + <span class="key">+ / -</span></td>
                                    <td>放大 / 缩小画布</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td><span class="key">Ctrl</span> + <i class="draw-icon draw-icon-mousewheel" data-toggle="tooltip" title="滚轮"></i></td>
                                    <td>放大 / 缩小画布</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td><i class="draw-icon draw-icon-mousewheel" data-toggle="tooltip" title="滚轮"></i></td>
                                    <td>垂直滚动画布</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td><span class="key">Shift</span> + <i class="draw-icon draw-icon-mousewheel" data-toggle="tooltip" title="滚轮"></i></td>
                                    <td>水平滚动画布</td>
                                    <td></td>
                                </tr>


                                <tr>
                                    <td rowspan="2">辅助控制</td>
                                    <td><span class="key">Shift</span></td>
                                    <td>多选形状、调整（拖拽、缩放或旋转）时对齐到网格</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td><span class="key">← / → / ↑ / ↓</span></td>
                                    <td>移动选中形状</td>
                                    <td>按 Shift 每次按网格大小移动</td>
                                </tr>


                                <tr>
                                    <td rowspan="3">工具</td>
                                    <td><span class="key">D</span></td>
                                    <td>度量工具</td>
                                    <td></td>
                                </tr>
                            </table>

                        </div>
                    </mu-col>
                </mu-row>
            </div>
        </main>
        <div v-if="useCaseVisible">
            <div class="">
                <input v-model="useCase.roleName">
                <ul>
                    <li v-for="ca in useCase.cases">
                        {{ ca }}
                        <input :value="ca">
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                useCaseVisible: false,
                useCase: {
                    roleName: '管理员',
                    cases: ['用户管理', '店铺管理', '商品管理']
                }
            }
        },
        methods: {
        }
    }
</script>

<style scoped>
</style>
