var beauty_style;
var laySettings = [];
var laySheet = [];
var layQV = [];
var layFP = [];
var layTXT = [];
var layBTN = [];
var layTable = [];
var layCont = [];
var layVar = [];
var layIDs = [];
var layCSS = '';
var oneOpened = true;
var editMode = '';
var vType;
define( ["jquery",
		 "ng!$q",
		 "qlik",
		 "css!./css/BeautifyMe",
		 "./Properties"
		 ],
	
	function ($,ng,qlik,cssContent,properties) {
		'use strict';
		var app = qlik.currApp();	
		
		function toggleId () {	
			/*******General Settings********/
			beauty_style = '.qv-object-BeautifyMe{height: 0px!important;}';
			if(laySettings.MultiKPI){
				beauty_style += '.qv-object-qlik-multi-kpi{height: 0px!important;}';
			}
					
			beauty_style += '.qv-object *{';			
			if(laySettings.NewFontColor){				
				beauty_style += 'color: ' + laySettings.FontColor + ';';
			}
			if(laySettings.FontFamily != 'unset'){
				beauty_style += 'font-family: ' + laySettings.FontFamily + ';';
			}
			beauty_style += '}';
			// Titles
			beauty_style += '.qv-object .qv-object-title {display: inline-block;' +
    			'text-align: ' + laySettings.TitleAlign + ';' +
    			'color:' + laySettings.TitleColor + '!important;}';
    		beauty_style += '.qv-inline-edit-value {' +
    			'text-align: ' + laySettings.TitleAlign + ';' +
    			'color:' + laySettings.TitleColor + ';' + 
    			'font-size:' + laySettings.TitleFontSize + '%;' +
    			'}';
    		beauty_style += '.qv-object .qv-object-footnote, .qv-object .qv-object-subtitle {' +
				'text-align: ' + laySettings.TitleAlign + ';}';

			/*******Sheet Settings********/
			if(laySheet.shbgcolor2 == 'none'){
				beauty_style += '.qvt-sheet {' +
				'opacity:' + laySheet.shbgimgopacity + ';' +
  				'background: ' + laySheet.shbgimg + ' ' + laySheet.shbgcolor1 + ';' +
  				'background-repeat: no-repeat;' +
  				'background-size: ' + laySheet.shbgimgsize + ';' +
  				'background-position: ' + laySheet.shbgimgdir + ';' +
  				'}'+
  				'.qv-gridcell.zoom{background-color:' + laySheet.shbgcolor1 + ';}' +
  				//needed for mobile
  				'.sheet-list #grid .qv-gridcell.zoom, .sheet-list #grid .qv-gridcell.zoom .cell-content {' +
  				'opacity:' + laySheet.shbgimgopacity + ';' +
  				'background: ' + laySheet.shbgimg + ' ' + laySheet.shbgcolor1 + '!important;' +
  				'background-repeat: no-repeat;' +
  				'background-size: ' + laySheet.shbgimgsize + ';' +
  				'background-position: ' + laySheet.shbgimgdir + ';' +
  				'}'+
				'@media screen and (max-height: 480px), screen and (max-width: 640px) {.sheet-list #grid {' +
 				'opacity:' + laySheet.shbgimgopacity + ';' +
  				'background: ' + laySheet.shbgimg + ' ' + laySheet.shbgcolor1 + '!important;' +
  				'background-repeat: no-repeat;' +
  				'background-size: ' + laySheet.shbgimgsize + ';' +
  				'background-position: ' + laySheet.shbgimgdir + ';' +
  				'}}';
			}else{				
				beauty_style += '.qvt-sheet {' +
  				'overflow:hidden;' +
  				'opacity:' + laySheet.shbgimgopacity + ';';
  				if(laySheet.shbgdegreedir == 'center'){
  					beauty_style += 'background-image:' + laySheet.shbgimg + ' radial-gradient(' + laySheet.shbgcolor1 + ' , ' + laySheet.shbgcolor2 + ');';
  				}else{
  					beauty_style += 'background-image:' + laySheet.shbgimg + ' linear-gradient(to ' + laySheet.shbgdegreedir + ', ' + laySheet.shbgcolor1 + ' , ' + laySheet.shbgcolor2 + ');';
  				}
  				beauty_style += 'background-repeat: no-repeat;' +
  				'background-size: ' + laySheet.shbgimgsize + ';' +
  				'background-position: ' + laySheet.shbgimgdir + ';' +
  				'}';
  				if(laySheet.shbgdegreedir == 'center'){ 
  					beauty_style += '.qv-gridcell.zoom{background-image:' + laySheet.shbgimg + ' radial-gradient(' + laySheet.shbgcolor1 + ' , ' + laySheet.shbgcolor2 + ');}';
  				}else{
  					beauty_style += '.qv-gridcell.zoom{background-image:' + laySheet.shbgimg + ' linear-gradient(to ' + laySheet.shbgdegreedir + ', ' + laySheet.shbgcolor1 + ' , ' + laySheet.shbgcolor2 + ');}';
  				}
  				//needed for mobile
	  			beauty_style += '.sheet-list #grid .qv-gridcell.zoom, .sheet-list #grid .qv-gridcell.zoom .cell-content {' +
	  				'opacity:' + laySheet.shbgimgopacity + ';';
	  			if(laySheet.shbgdegreedir == 'center'){
  					beauty_style += 'background-image:' + laySheet.shbgimg + ' radial-gradient(' + laySheet.shbgcolor1 + ' , ' + laySheet.shbgcolor2 + ');';
  				}else{
  					beauty_style += 'background-image:' + laySheet.shbgimg + ' linear-gradient(to ' + laySheet.shbgdegreedir + ', ' + laySheet.shbgcolor1 + ' , ' + laySheet.shbgcolor2 + ');';
  				}
	  			beauty_style += 'background-repeat: no-repeat;' +
	  				'background-size: ' + laySheet.shbgimgsize + ';' +
	  				'background-position: ' + laySheet.shbgimgdir + ';' +
	  				'}';
				beauty_style += '@media screen and (max-height: 480px), screen and (max-width: 640px) {.sheet-list #grid {' +
	 				'opacity:' + laySheet.shbgimgopacity + ';';
	  			if(laySheet.shbgdegreedir == 'center'){
  					beauty_style += 'background-image:' + laySheet.shbgimg + ' radial-gradient(' + laySheet.shbgcolor1 + ' , ' + laySheet.shbgcolor2 + ');';
  				}else{
  					beauty_style += 'background-image:' + laySheet.shbgimg + ' linear-gradient(to ' + laySheet.shbgdegreedir + ', ' + laySheet.shbgcolor1 + ' , ' + laySheet.shbgcolor2 + ');';
  				}
	  				beauty_style += 'background-repeat: no-repeat;' +
	  				'background-size: ' + laySheet.shbgimgsize + ';' +
	  				'background-position: ' + laySheet.shbgimgdir + ';' +
	  				'}}';
			}
			if(laySheet.sheettitle == 'h'){
				beauty_style += '.qv-panel-sheet .sheet-title-container{visibility:hidden;height:0}';
			}else if(laySheet.sheettitle == 't'){
				beauty_style += '.qv-panel-sheet .sheet-title-container{background:transparent!important;border: none!important;}';
			}

			/******QV Object settings***********/	

			if(layQV.QVBgColor){
				beauty_style += 'article{' + layQV.QVBgColor + 'overflow: visible;}' +
				'.sheet-list #grid .cell-content .qv-object{' + layQV.QVBgColor + '}';
			}
			if(layQV.QVBorder){
				beauty_style += 'article{' + layQV.QVBorder + '}';				
			}

			/******filter Pane ****************/
			if(layFP.FPBool){
				beauty_style += '.qv-collapsed-listbox{' + layFP.FPSettings + '}';
				beauty_style += '.qv-collapsed-listbox .title-wrapper .title {' + layFP.FPTitleSettings + '}';

				if(layFP.FPBorderBool){
					beauty_style += '.qv-collapsed-listbox{border:none!important;}';
				}

				if(layFP.FPIconBool){
					beauty_style += '.qv-collapsed-listbox .title-wrapper .title:before {font-feature-settings: "liga";' +
				    '-webkit-font-smoothing: antialiased;' +
				    '-moz-osx-font-smoothing: grayscale;' +
				    'direction: ltr;' +
				    'display: inline-block;' +
				    'font-family: LUI icons;' +
				    'font-size: 16px;' +
				    'font-style: normal;' +
				    'font-variant-ligatures: discretionary-ligatures;' +
				    'font-weight: 400;' +
				    'letter-spacing: 0;' +
				    'text-transform: none;' +
					'text-decoration: inherit;' +
					'content: "' + layFP.FPIcon +'";' +
					'margin-right: 5px;' +
    				'position: absolute;' +
    				'right: 0;}';
				}
			}

			/******text object ****************/
			if(layTXT.XSBool){
				beauty_style += '.qv-object-text-image .qv-media-tool-editor [size="1"], .qv-object-text-image .qv-media-tool-html [size="1"] {' +
				    'font-size: ' + layTXT.XSSize + '%;' +
				    'font-family: ' + layTXT.XSFamily + ';' +
					'}';
				beauty_style += '.qv-object-text-image .qv-media-tool-html.responsive-text.bp-3 [size="1"] {' +
				    'font-size: ' + layTXT.XSSize + '%;' +
					'}';
			}
			if(layTXT.SBool){
				beauty_style += '.qv-object-text-image .qv-media-tool-editor [size="2"], .qv-object-text-image .qv-media-tool-html [size="2"] {' +
				    'font-size: ' + layTXT.SSize + '%;' +
				    'font-family: ' + layTXT.SFamily + ';' +
					'}';
				beauty_style += '.qv-object-text-image .qv-media-tool-html.responsive-text.bp-3 [size="2"] {' +
				    'font-size: ' + layTXT.SSize + '%;' +
					'}';
			}
			if(layTXT.MBool){
				beauty_style += '.qv-object-text-image .qv-media-tool-editor [size="3"], .qv-object-text-image .qv-media-tool-html [size="3"] {' +
				    'font-size: ' + layTXT.MSize + '%;' +
				    'font-family: ' + layTXT.MFamily + ';' +
					'}';
				beauty_style += '.qv-object-text-image .qv-media-tool-html.responsive-text.bp-3 [size="3"] {' +
				    'font-size: ' + layTXT.MSize + '%;' +
					'}';
			}
			if(layTXT.LBool){
				beauty_style += '.qv-object-text-image .qv-media-tool-editor [size="4"], .qv-object-text-image .qv-media-tool-html [size="4"] {' +
				    'font-size: ' + layTXT.LSize + '%;' +
				    'font-family: ' + layTXT.LFamily + ';' +
					'}';
				beauty_style += '.qv-object-text-image .qv-media-tool-html.responsive-text.bp-3 [size="4"] {' +
				    'font-size: ' + layTXT.LSize + '%;' +
					'}';
			}
			if(layTXT.XLBool){
				beauty_style += '.qv-object-text-image .qv-media-tool-editor [size="5"], .qv-object-text-image .qv-media-tool-html [size="5"] {' +							     
				    'font-size: ' + layTXT.XLSize + '%;' +
				    'font-family: ' + layTXT.XLFamily + ';' +
					'}';
				beauty_style += '.qv-object-text-image .qv-media-tool-html.responsive-text.bp-3 [size="5"] {' +
				    'font-size: ' + layTXT.XLSize + '%;' +
					'}';
				if(layTXT.XLGrow){
					beauty_style += '.qv-object-text-image .qv-media-tool-editor [size="5"], .qv-object-text-image .qv-media-tool-html [size="5"] {'+
				    'font-size: ' + layTXT.XLSize + '%;' +
				    'animation: text-increasing 9s;' +
				    'animation-fill-mode: forwards;' +
				    'animation-play-state: running;' +
				    'animation-timing-function: linear;' +
					'}' +
					'@keyframes text-increasing {' +
				    '0% {' +
				        'font-size: 0%;' +
				    '}' +
				    '100% {' +
				        'font-size: ' + layTXT.XLSize  + '%;' +
				    '}' +
					'}';
				}
			}

			/************* Button Settings **************/
			if(layBTN.BTNFamily != 'unset'){
				beauty_style += '.qv-object-action-button button text {' +
				    'font-family:' + layBTN.BTNFamily + '!important;' +			    
				'}'
			}
			if(layBTN.BTNShadowBool){
				beauty_style += '.qv-object-action-button button{' +
				    'box-shadow: -3px 3px 5px #000000;' +
				'}';
			}
			if(layBTN.BTNTextShadowBool){
				beauty_style += '.qv-object-action-button button text span{' +
				    'text-shadow: 2px 7px 5px rgb(0 0 0 / 30%), 0px -4px 10px rgb(255 255 255 / 30%);' +
				'}';	
			}
			if(layBTN.BTNTranspBool){
				beauty_style += '.qv-object-action-button button{' +
	    			'background-color:transparent!important;' +
				'}';
			}
			if(layBTN.BTNHoverBool){
				beauty_style += '.qv-object-action-button button:hover{color:' + layBTN.BTNHoverColor + '!important;}';
			}
			/************* Tables ***********************/
			if(layTable.TablePijamaBool){
				beauty_style += 'tr:nth-child(even) {' +
							  'background-color: ' + layTable.TablePijamaBGColor + '!important;' +
							  'color: ' + layTable.TablePijamaFontColor + '!important;' +
							'}';
			}
			if(layTable.TableHeaderColorBool){
				beauty_style += '.qv-object-pivot-table .qv-pt .cell .left-meta-headers{background:' + layTable.TableHeaderColor + '!important;}' +
							//'.qv-object-pivot-table .qv-pt .cell .top-meta{background-color:' + layTable.TablePijamaBGColor + '!important;}' +
							'th.cell.ng-scope.header.empty.top-meta.meta{background-color:' + layTable.TableHeaderColor + '!important;}' +
							'.qv-pt .cell.header.top{background-color:' + layTable.TableHeaderColor + '!important;color:' + layTable.TableHeaderTextColor + ';}' +
							'.qv-pt .cell.left-meta.empty.bottom-meta, .qv-pt .cell.top.empty.bottom-meta{background-color:' + layTable.TableHeaderColor + '!important;}' +
							'.qv-pt .cell.left-meta.empty, .qv-pt .cell.top.empty{background-color:' + layTable.TableHeaderColor + '!important;}' +
							'.qv-object-pivot-table .qv-pt .cell .top-meta-headers{background:' + layTable.TableHeaderColor + '!important;}' +
							//'.qv-object-table header{background:' + layTable.TableHeaderColor + '!important;color:' + layTable.TableHeaderTextColor + '}' +
							'.qv-object-table .qv-st-header-cell{background:' + layTable.TableHeaderColor + '!important;color:' + layTable.TableHeaderTextColor + ';}';
							if(layTable.TableHeaderTitleBool){
								beauty_style += '.qv-object-pivot-table .qv-object-header{background:' + layTable.TableHeaderColor + '!important;}';
								beauty_style += '.qv-object-table .qv-object-header{background:' + layTable.TableHeaderColor + '!important;}';
							}
			}			
			if(layTable.TableButtonsOutBool){
				beauty_style += '.qv-object-pivot-table .qv-pt .cell .left-meta-headers{display:none}';
			}
			if(layTable.TableHighlightBool){
				beauty_style += '.qv-st-data-cell-color-light {' + layTable.TableHighlightProps + '}';
				beauty_style += '.qv-st-data-cell-color-light .qv-st-value{text-align:' + layTable.TableStyleAlign + '!important;}';
			}
			/************* Container ********************/

			beauty_style += 'li.lui-tab.ng-scope.lui-active{';
			if(layCont.ContBGBool){
				beauty_style += 'background-color:' + layCont.ContBGColor + '!important;';
			}
			if(layCont.ContBorderBool){
				beauty_style += 'border-bottom: 2px solid ' + layCont.ContBorderColor + ';';
			}
			beauty_style += '}';
			if(layCont.ContTextBool){
				beauty_style += 'li.lui-tab.ng-scope.lui-active span{' +
				'color:' + layCont.ContTextColor + '!important;' +				
				'}';
			}
			/************* Variable input ***************/

			if(layVar.VarColorsBool){
				beauty_style += '.qv-object-qlik-variable-input input[type=range] {'+
					'background:transparent;'+
				'}';
				beauty_style += '.qv-object-qlik-variable-input .qlik .rangelabel {' +
				    'background: ' + layVar.VarBGColor + '!important;' +
				    'font-family: open sans!important;' +
				    'color: ' + layVar.VarFontColor + ';' +
				    'font-weight: bold;' +
				'}';
			}

			/************* IDs settings *****************/

			layIDs.forEach(function(s) {
				if(s.IDsType == 'filterpane' && s.IDsBGColorBool){
					beauty_style += 'div[tid="' + s.IDsID +'"] .qv-collapsed-listbox{background:' + s.IDsBGSingleColor + '!important;}';
				}
				if(s.IDsType != 'action-button'){
					beauty_style += 'div[tid="' + s.IDsID +'"] .qv-object{'
					if(s.IDsBGColorBool){
						if(s.IDsType != 'filterpane'){
							beauty_style += 'background:' + s.IDsBGSingleColor + '!important;';
						}
					}
					if(s.IDsImgBool){
						beauty_style += 'background-image: url(' + s.IDsImg +')!important;' +
					    'background-repeat: no-repeat!important;' +
					    'background-size: ' + s.IDsImgSize +'!important;' +
					    'background-position: ' + s.IDsImgPos + '!important;';
					}
					    					
					beauty_style += '}'


					if(s.IDsFontColorBool){
						beauty_style += 'div[tid="' + s.IDsID +'"] .qv-object span{' +				
						    'color:' + s.IDsFontColor + '!important;}';
					}
				}
				
				if(s.IDsEffectBool){
					if(s.IDsEffect == 'expand'){
						beauty_style += 'div[tid="' + s.IDsID + '"] .qv-object .qv-object-content{' +
							'overflow: hidden;' +
						  	'white-space: nowrap;' +
						  	'margin: 0 auto;' +
						  	'animation: ' +
						    'typing 5s steps(40, end);' +
						'}' +

						'@keyframes typing {' +
						  'from { width: 0 }' +
						  'to { width: 80% }' +
						'}';

						/*'@keyframes blink-caret {' +
						  'from, to { border-color: transparent }' +
						  '50% { border-color: orange; }' +
						'}';*/
					}else{
						beauty_style += 'div[tid="' + s.IDsID + '"] .qv-object .qv-object-content{' +
							'overflow: hidden;' +
						  	'white-space: nowrap;' +
						  	'margin: 0 auto;' +
						  	'animation: ' +
						    'typing 5s steps(40, end);' +
						'}' +

						'@keyframes typing {' +
						  'from { height: 0 }' +
						  'to { height: 100% }' +
						'}';
						beauty_style += 'div[tid="' + s.IDsID + '"] .qv-object-text-image .qv-media-tool-html {' +
						'overflow-y:hidden;}';
					}
				}

				if(s.IDsOverlapHBool){
					beauty_style += 'div[tid="' + s.IDsID + '"]{' +
					'left: calc(' + s.IDsOverlapHPerc + '% + 2px)!important;' +
					'z-index:2;}';

				}
				if(s.IDsOverlapVBool){		
					beauty_style += 'div[tid="' + s.IDsID + '"]{' + 
					'top: calc(' + s.IDsOverlapVPerc + '% + 2px)!important;' +
					'z-index:2;}';					
				}
				
				if(s.IDsDatePicker || s.IDsType == 'qlik-date-picker'){
					beauty_style += '.lui-icon--calendar{' +
					    'padding-left: 8px!important;' +
					'}' +
					'.qv-object-qlik-date-picker {' +
					    'padding-top: 10px!important;' +
					'}' +
					'.qv-object-qlik-date-picker .show-range{';
						if(s.IDsBGColorBool){
					    	beauty_style += 'background:' + s.IDsBGSingleColor + '!important;';
					    }else{
					    	beauty_style += 'background:transparent!important;';
					    }
						if(s.IDsFontColorBool){
							beauty_style += 'color:' + s.IDsFontColor + '!important;';
						}
						beauty_style += 'padding:5px!important;' +
					'}';
				}
			})						
			
			beauty_style += layCSS;

			if(qlik.navigation.getMode() == 'edit'){

			    $( '.qv-object, .qv-panel-sheet' ).each( function ( i, el ) {
					var s = angular.element( el ).scope();

					if ( s.layout || (s.$$childHead && s.$$childHead.layout) ) {
						var layout = s.layout || s.$$childHead.layout, model = s.model || s.$$childHead.model;						
						$( el ).append( '<div id = "' + s.model.id + '"class="BeautifyMe-tooltip">' +
						'<a id="BeautifyMeBtn" class="BeautifyMe-btn" title="' + s.model.layout.qInfo.qType + '"><i class="lui-icon lui-icon--copy"></i></a> id : ' + s.model.id +							
						'</div>' );
						
						$( el ).find('#BeautifyMeBtn').on( 'click', function () {

							model.getProperties().then( function ( reply ) {
								var vObjectId = reply.qInfo.qId;
								var vObjectType = reply.qInfo.qType;
								navigator.clipboard.writeText(vObjectId);
							})
						})
					} 
				})			
			}			
		}

		return {
			initialProperties: {
				version: 1.0,
				showTitles: false
			}, 
			definition : properties,
				support: {
				export: false,
				exportData: false,
				snapshot: false
			},
			addons: {
				uses: "addons"
			},
			beforeDestroy: function(){
				$('#beautyme-style').remove();
			},
			prePaint: function(d) {
				//var app = qlik.currApp();
				app.variable.getContent('vBeautifyMeHideSheet').then(function(model){
				    console.log('OK Prepaint')
				}).catch(function(error) {
					app.variable.create({
					    qName : 'vBeautifyMeHideSheet',
					    qDefinition : '1'
					});					
				})
				var vOpposite = 1;
				if(d.SheetVariableValue == 1){
					vOpposite = 0;
				}
				if(d.SheetHideMobileBool){
					if($(window).width() < 641 || $(window).height() < 481){
						app.variable.setNumValue(d.SheetHideVariable,d.SheetVariableValue);
						if(d.SheetNavigationBool && qlik.navigation.getMode() != 'edit'){
							qlik.navigation.gotoSheet(d.SheetNavigationId);
						}
					}else{
						app.variable.setNumValue(d.SheetHideVariable,vOpposite);
					}
				}				
			},
			paint: function ( $element,layout ) {	
				var myObject = this;	
				var vOpposite = 1;
				if(layout.SheetVariableValue == 1){
					vOpposite = 0;
				}			
				if(layout.SheetHideMobileBool){
					if($(window).width() < 641 || $(window).height() < 481){
						app.variable.setNumValue(layout.SheetHideVariable,layout.SheetVariableValue);
						if(layout.SheetNavigationBool && qlik.navigation.getMode() != 'edit'){
							qlik.navigation.gotoSheet(layout.SheetNavigationId);
						}
					}else{
						app.variable.setNumValue(layout.SheetHideVariable,vOpposite);
					}
				}				

				$( ".BeautifyMe-tooltip" ).remove();
				$('#beautyme-style').remove();
				/* Sheet */
				// Background color
				var vShBgColor1;
				if(layout.shbgcolorbool){
					vShBgColor1 = layout.shbgcustomcolor;
				}else{
					vShBgColor1 = layout.shbgsinglecolor.color;
				}
				
				var vShBgColor2 = 'none';
				if(layout.shbgdegreebool){
					if(layout.shbgcolorbool2){
						vShBgColor2 = layout.shbgcustomcolor2;
					}else{
						vShBgColor2 = layout.shbgsinglecolor2.color;
					}
				}
				
				var vShBgDegreeDir;
				switch (layout.shbgdegreedir){
         			case 'topLeft':
         				vShBgDegreeDir = 'left top';
         				break;
         			case 'topCenter':
         				vShBgDegreeDir = 'left';
         				break;
         			case 'topRight':
         				vShBgDegreeDir = 'left bottom';
         				break;
         			case 'centerLeft':
         				vShBgDegreeDir = 'top';
         				break;
         			case 'centerCenter':
         				vShBgDegreeDir = 'center';
         				break;
         			case 'centerRight':
         				vShBgDegreeDir = 'bottom';
         				break;
         			case 'bottomLeft':
         				vShBgDegreeDir = 'right top';
         				break;
         			case 'bottomCenter':
         				vShBgDegreeDir = 'right bottom';
         				break;
         			case 'bottomRight':
         				vShBgDegreeDir = 'right';
         				break;
         		}
         		// Background Image
         		var vShBgImg = '';
         		if(layout.shbgimgbool){
         			if(layout.shbgimgsrc == 'url'){
						vShBgImg = 'url("' + layout.shbgimgmeurl + '"),';
         			}else{
         				vShBgImg = 'url("' + layout.shbgimgmedia + '"),';         				
         			}
         		}
         		var vShBgImgDir = 'default';
         		if(layout.shbgimgsize != 'cover' && layout.shbgimgsize != '100% 100%'){
	         		switch (layout.shbgimgdir){
	         			case 'topLeft':
	         				vShBgImgDir = '0% 0%';
	         				break;
	         			case 'topCenter':
	         				vShBgImgDir = '0% 50%';
	         				break;
	         			case 'topRight':
	         				vShBgImgDir = '0% 110%';
	         				break;
	         			case 'centerLeft':
	         				vShBgImgDir = '50% 0%';
	         				break;
	         			case 'centerCenter':
	         				vShBgImgDir = '50% 50%';
	         				break;
	         			case 'centerRight':
	         				vShBgImgDir = '50% 110%';
	         				break;
	         			case 'bottomLeft':
	         				vShBgImgDir = '100% 0%';
	         				break;
	         			case 'bottomCenter':
	         				vShBgImgDir = '100% 50%';
	         				break;
	         			case 'bottomRight':
	         				vShBgImgDir = '100% 110%';
	         				break; 
	         		}
	         	}

	         	var vShBgImgSize = layout.shbgimgsize;
	         	if(vShBgImgSize == 'percentage'){
	         		vShBgImgSize = layout.shbgimgsizeperc + '%';	         		
	         	}

         		var vFontColor;
				if(layout.fontcolorbool){
					vFontColor = layout.fontcolor;
				}else{
					vFontColor = layout.fontsinglecolor.color;
				}

				// qv-object settings
				var QVBgColor = false;				
				if(layout.qvbgcolorbool){
					if(layout.qvbgcolortypebool){
						QVBgColor = 'background-color: ' + layout.qvbgcustomcolor +' !important;';
					}else{
						QVBgColor = 'background-color: ' + layout.qvbgsinglecolor.color +' !important;';
					}

				}
				var QVBorder = false;
				if(layout.qvborderbool){
					QVBorder = 'border:' + layout.qvborderwidth + 'px solid ' + layout.qvbordercolor.color + '!important;';	
					if(layout.qvborderradius > 0){
						QVBorder += 'border-radius:' + layout.qvborderradius + 'px!important;';						
					}
					if(layout.qvbordershadowbool){
						var vBorderShadow;
						switch (layout.qvbordershadowtype){
							case 'simple':
								vBorderShadow = 'box-shadow:1.5px 1.5px #7b7a78;';
							break;
							case '3d': 
								vBorderShadow = 'box-shadow: 3px 4px 7px rgba(81,67,21,0.8);';
							break;
							case 'embossed':
								vBorderShadow = 'box-shadow: 2px 7px 5px rgba(0,0,0,0.3), 0px -4px 10px rgba(255,255,255,0.3);';
							break;
						}
						QVBorder += vBorderShadow;
					}
				}

				var vFPSettings = '';
				var vFPTitleSettings;
				if(layout.filterpanebool){
					if(layout.filterbgbool){
						vFPSettings = 'background: ' + layout.fpbgsinglecolor.color + '!important;';
					}
					vFPSettings += 'font-family: ' + layout.fpfontfamily +'!important;';
					vFPTitleSettings = 'font-size:' + layout.fpfontsize +'px;text-align:' + layout.fplabelalign + ';color:' + layout.fpsinglecolor.color + ';';
				}		

				var vTableHighlightProps = '';
				if(layout.TableHighlightBool){

					if(layout.TablesTextStyleBold){
						vTableHighlightProps += 'font-weight: bold;';
					}
					if(layout.TablesTextStyleItalic){
						vTableHighlightProps += 'font-style: italic;';
					}
					if(layout.TablesTextStyleUnderline){
						vTableHighlightProps += 'text-decoration: underline;';
					}
					vTableHighlightProps += 'font-size: ' + layout.TablesTextStyleFontSize + 'px;';
					vTableHighlightProps += 'color: ' + layout.TableTextStyleColor.color + ';background:' + layout.TableBackgroundStyleColor.color + '!important;';					
				}
				
         		laySettings = {"MultiKPI":layout.multikpibool,"FontFamily":layout.fontfamily,"NewFontColor":layout.shdefaulttextcolorbool,"FontColor":vFontColor,"TitleAlign":layout.titlealign,"TitleColor":layout.titlesinglecolor.color,"TitleFontSize":layout.TitlesFontSize};
         		laySheet = {"shbgcolor1":vShBgColor1,"shbgcolor2":vShBgColor2,"shbgdegreedir":vShBgDegreeDir,"shbgimg":vShBgImg,"shbgimgopacity":layout.shbgimgopacity,"shbgimgdir":vShBgImgDir,"shbgimgsize":vShBgImgSize,"sheettitle":layout.sheettitle};         		
         		layQV = {"QVBgColor":QVBgColor,"QVBorder":QVBorder}				
				layFP = {"FPBool":layout.filterpanebool,"FPSettings":vFPSettings,"FPTitleSettings":vFPTitleSettings,"FPBorderBool":layout.filterborderbool,"FPIconBool":layout.filtericonbool,"FPIcon":layout.filtericon};
				layTXT = {"XSBool":layout.txtxsbool,"XSFamily":layout.txtxlfontfamily,"XSSize":layout.txtxsfontsize,"SBool":layout.txtsbool,"SFamily":layout.txtsfontfamily,"SSize":layout.txtsfontsize,"MBool":layout.txtmbool,"MFamily":layout.txtmfontfamily,"MSize":layout.txtmfontsize,"LBool":layout.txtlbool,"LFamily":layout.txtlfontfamily,"LSize":layout.txtlfontsize,"XLBool":layout.txtxlbool,"XLFamily":layout.txtxlfontfamily,"XLSize":layout.txtxlfontsize,"XLGrow":layout.txtxlgrowbool};
				layBTN = {"BTNTranspBool":layout.btntranspbool,"BTNFamily":layout.btnfontfamily,"BTNShadowBool":layout.btnshadowbool,"BTNTextShadowBool":layout.btntextshadowbool,"BTNHoverBool":layout.btnhoverbool,"BTNHoverColor":layout.btnhoversinglecolor.color};
				layTable = {"TablePijamaBool":layout.TablePijamaBool,"TablePijamaBGColor":layout.TablePijamaBGColor.color,"TablePijamaFontColor":layout.TablePijamaFontColor.color,"TableHeaderColorBool":layout.TableHeaderColorBool,"TableHeaderColor":layout.TableHeaderColor.color,"TableHeaderTextColor":layout.TableHeaderTextColor.color,"TableButtonsOutBool":layout.TableButtonsOutBool,"TableHighlightBool":layout.TableHighlightBool,"TableHighlightProps":vTableHighlightProps,"TableHeaderTitleBool":layout.TableHeaderTitleBool,"TableStyleAlign":layout.TableStyleAlign};
				layCont = {"ContBGBool":layout.ContainerBGBool,"ContBGColor":layout.ContainerBGColor.color,"ContTextBool":layout.ContainerTextBool,"ContTextColor":layout.ContainerTextColor.color,"ContBorderBool":layout.ContainerBorderBool,"ContBorderColor":layout.ContainerBorderColor.color};
				layVar = {"VarColorsBool":layout.VarColorsBool,"VarBGColor":layout.VarBGSingleColor.color,"VarFontColor":layout.VarFontSingleColor.color};
				layIDs = [];
				
				layout.listItemsId.forEach(function(s) {
					if(s.ObjId.length > 0){
						var vObjId = s.ObjId.substring(0,s.ObjId.indexOf('#:#'));
						var vObjType = s.ObjId.substring(s.ObjId.indexOf('#:#') + 3);
						var vImgId;
						if(s.IdsImgBool){
							if(s.IdsImgSource == 'url'){
								vImgId = s.IdsImgUrl;
		         			}else{
		         				vImgId = s.IdsImgMedia;
		         			}
						}
						var vIdsImgPos = '';
		         		switch (s.idsimgpos){
		         			case 'topLeft':
		         				vIdsImgPos = '0% 0%';
		         				break;
		         			case 'topCenter':
		         				vIdsImgPos = '0% 50%';
		         				break;
		         			case 'topRight':
		         				vIdsImgPos = '0% 100%';
		         				break;
		         			case 'centerLeft':
		         				vIdsImgPos = '50% 0%';
		         				break;
		         			case 'centerCenter':
		         				vIdsImgPos = '50% 50%';
		         				break;
		         			case 'centerRight':
		         				vIdsImgPos = '50% 100%';
		         				break;
		         			case 'bottomLeft':
		         				vIdsImgPos = '100% 0%';
		         				break;
		         			case 'bottomCenter':
		         				vIdsImgPos = '100% 50%';
		         				break;
		         			case 'bottomRight':
		         				vIdsImgPos = '100% 100%';
		         				break; 
		         		}
		         		var vIdsImgSize = s.idsimgsize;
						if(vIdsImgSize == 'percentage'){
							vIdsImgSize = s.idsimgsizeperc + '%';
						}
					
						var layID = {"IDsID":vObjId,"IDsType":vObjType,"IDsBGColorBool":s.IdsBGColorBool,"IDsBGSingleColor":s.IdsBGSingleColor.color,"IDsFontColorBool":s.IdsFontColorBool,"IDsFontColor":s.IdsFontSingleColor.color, "IDsImgBool":s.IdsImgBool,"IDsImg":vImgId,"IDsImgPos":vIdsImgPos,"IDsImgSize":vIdsImgSize,"IDsEffectBool":s.IdsEffectBool,"IDsEffect":s.IdsEffect,"IDsOverlapHBool":s.IdsOverlapHBool,"IDsOverlapHPerc":s.IdsMovingH,"IDsOverlapVBool":s.IdsOverlapVBool,"IDsOverlapVPerc":s.IdsMovingV,"IDsDatePicker":s.IdsAlignDatePickerBool};
						layIDs.push(layID);
					
					}
					
				})	

				layCSS = layout.cssmanual;
								
				var beauty_prev = beauty_style;
				toggleId();
				layout.listItemsId.forEach(function(s) {
					if(s.ObjId.length > 0){
						if(s.IdsFindBool && qlik.navigation.getMode() == 'edit'){
							var vObjId = s.ObjId.substring(0,s.ObjId.indexOf('#:#'));
							$('#' + vObjId).addClass("BeautifyMe-btn-find");						
						}else{
							$('#' + vObjId).removeClass('BeautifyMe-btn-find');
						}
					}
				})		
				var vValid = beauty_style.replace(/"/g, "'");
				if(oneOpened || beauty_prev != beauty_style){
					myObject.backendApi.applyPatches([
						{
							"qPath": "/cssoutput",
							"qOp": "replace",
							"qValue": '"' + vValid + '"'
						}
					], false);
				}
				oneOpened = false;
				beauty_prev = beauty_style;				
				$('<style id="beautyme-style"></style>').html(beauty_style).appendTo('head');
			}
		};
	});
