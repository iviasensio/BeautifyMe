define(["qlik", "ng!$q","./js/util"], function(qlik, ng, utils) {
    "use strict";
    var app = qlik.currApp();
    var vObjs = [];
    var vDatePickers = [];
    var getObj = function() {
        var defer = ng.defer();
        app.getAppObjectList('sheet', function(reply) {
            var str = "";
            vObjs = [];
            vDatePickers = [];
            $.each(reply.qAppObjectList.qItems, function(key, value) {
                var sheet = value.qInfo.qId + '';
                if (sheet == qlik.navigation.getCurrentSheetId().sheetId) {
                    var objlist = [];
                    $.each(value.qData.cells, function(k, v) {
                        var vLabel = v.name;
                        if(vLabel.length > 6){vLabel = vLabel.substring(0,6) + '..'};
                        vObjs.push({
                            value: v.name + '#:#' + v.type,
                            label: vLabel + ' : ' + v.type,
                        });

                        if(v.type == 'qlik-date-picker'){
                            vDatePickers.push(v.name);
                        }                        
                    });
                    return defer.resolve(vObjs);
                }
            });
        });
        return defer.promise;
    };
    var boolDatePicker = function(id){
        return jQuery.inArray(id, vDatePickers)
    }
    var vImgSize = [{
                        value: "auto",
                        label: "Original Size"
                    }, {
                        value: "contain",
                        label: "Always fit"
                    }, {
                        value: "100%",
                        label: "Fit to width"
                    }, {
                        /*value: "auto 100%",*/
                        value: "cover",
                        label: "Fit to height"
                    }, {
                        value: "100% 100%",
                        label: "Stretch to fit"
                    }, {
                        value: "percentage",
                        label: "Chose a percentage"
                    }];
    var vFontFamily = [{
                        value: "unset",
                        label: "Default"
                    },{
                        value: "Aharoni",
                        label: "Aharoni"
                    },{
                        value: "Arial",
                        label: "Arial"
                    }, {
                        value: "Brush Script MT",
                        label: "Brush Script MT"
                    }, {
                        value: "Calibri",
                        label: "Calibri"
                    }, {
                        value: "Comic Sans MS",
                        label: "Comic Sans MS"
                    }, {
                        value: "erasdust",
                        label: "Erasdust"
                    },{
                        value: "Heebo, sans-serif",
                        label: "Heebo"
                    },{
                        value: "Handcrafted",
                        label: "Handcrafted"
                    },{
                        value: "Ink Free",
                        label: "Ink Free"
                    }, {
                        value: "Lucida Handwriting",
                        label: "Lucida Handwriting"
                    }, {
                        value: "Marker",
                        label: "Marker"
                    }, {
                        value: "OpenSans",
                        label: "OpenSans"
                    }, {
                        value: "Oswald",
                        label: "Oswald"
                    }, {
                        value: "Playfair Display, serif",
                        label: "Playfair Display"
                    },{
                        value: "QlikView Sans, sans-serif",
                        label: "QlikView Sans"
                    },{
                        value: "sans-serif",
                        label: "MS Sans Serif"
                    }, {
                        value: "Tahoma",
                        label: "Tahoma"
                    }, {
                        value: "Telotet",
                        label: "Telotet"
                    }, {
                        value: "Verdana",
                        label: "Verdana"
                    }];
    var vIcons = [{
                    value: "tick",
                    component: "icon-item",
                    icon: "tick",
                    size: "small"
                }, {
                    value: "search",
                    component: "icon-item",
                    icon: "search",
                    size: "small"
                }, {
                    value: "triangle_bottom",
                    component: "icon-item",
                    icon: "triangle_bottom",
                    size: "small"
                },{
                    value: "add",
                    component: "icon-item",
                    icon: "add",
                    size: "small"
                },{
                    value: "arrow_down",
                    component: "icon-item",
                    icon: "arrow_down",
                    size: "small"
                },{
                    value: "filter",
                    component: "icon-item",
                    icon: "filter",
                    size: "small"                    
                }];
    return {
        type: "items",
        component: "accordion",
        items: {            
            settings: {
                uses: "settings",
                items: {                    
                    //General settings
                    Settings: {
                        component: "items",
                        label: "General Settings",
                        items: {
                            MultiKPIBool: {
                                ref : "multikpibool",
                                type : "boolean",
                                component : "switch",
                                label : "Hide MultiKPI Obj",
                                options: [{
                                    value: false,
                                    label: "Not necessary"
                                }, {
                                    value: true,
                                    label: "Please"
                                }],
                                defaultValue: false
                            },                            
                            FontFamily: {
                                ref: "fontfamily",
                                type: "string",
                                component: "dropdown",
                                label: "Font family",
                                options: vFontFamily,
                                defaultValue: "unset"                                
                            },
                            SheetDefaultTextColorBool: {
                                ref : "shdefaulttextcolorbool",
                                type : "boolean",
                                component : "switch",
                                label : "Change text colors",
                                options: [{
                                    value: false,
                                    label: "Default"
                                }, {
                                    value: true,
                                    label: "Custom"
                                }],
                                defaultValue: false                                
                            },                            
                            FontColorBool: {
                                ref : "fontcolorbool",
                                type : "boolean",
                                component : "switch",
                                label : "Define font color",
                                options: [{
                                    value: false,
                                    label: "Single"
                                }, {
                                    value: true,
                                    label: "Custom"
                                }],
                                defaultValue: false,
                                show : function(data) {
                                    return data.shdefaulttextcolorbool;
                                }                               
                            },
                            FontColor: {
                                type: "string",
                                ref: "fontcolor",
                                label: "Font color expression",
                                defaultValue : "#808080",
                                expression : "optional",
                                show : function(data) {
                                    return data.fontcolorbool && data.shdefaulttextcolorbool;
                                }
                            },
                            FontSingleColor: {
                                ref: "fontsinglecolor",
                                label: "Font single color",
                                type: "object",  
                                component: "color-picker",  
                                defaultValue: {  
                                    color: '#808080'  
                                },
                                show : function(data) {
                                    return !data.fontcolorbool && data.shdefaulttextcolorbool;
                                }
                            },
                            CustomTitleBool: {
                                ref : "customtitlebool",
                                type : "boolean",
                                component : "switch",
                                label : "Custom Titles",
                                options: [{
                                    value: false,
                                    label: "Single"
                                }, {
                                    value: true,
                                    label: "Custom"
                                }],
                                defaultValue: false
                            },
                            TitlesPosition: {
                                type: "string",
                                component: "item-selection-list",
                                icon: !0,
                                horizontal: !0,
                                label: "Titles alignment",
                                ref: "titlealign",
                                defaultValue: "left",
                                items: [{
                                    value: "left",
                                    component: "icon-item",
                                    icon: "align_left"
                                }, {
                                    value: "center",
                                    icon: "align_center",
                                    component: "icon-item"
                                }, {
                                    value: "right",
                                    icon: "align_right",
                                    component: "icon-item"
                                }],
                                show : function(data) {
                                    return data.customtitlebool;
                                }
                            },
                            TitleSingleColor: {
                                ref: "titlesinglecolor",
                                label: "Titles single color",
                                type: "object",  
                                component: "color-picker",  
                                defaultValue: {  
                                    color: '#808080'  
                                },
                                show : function(data) {
                                    return data.customtitlebool;
                                }
                            },
                            TitlesFontSize: {                                
                                type: "number",
                                component: "slider",
                                label: "Titles font size",
                                ref: "TitlesFontSize",
                                min: 100,
                                max: 200,
                                step: 5,
                                defaultValue: 115,
                                show : function(data) {
                                    return data.customtitlebool;
                                }
                            },
                            TitlesPadding: {                                
                                type: "number",
                                component: "slider",
                                label: "Titles padding",
                                ref: "TitlesPadding",
                                min: 0,
                                max: 100,
                                step: 5,
                                defaultValue: 30,
                                show : function(data) {
                                    return data.customtitlebool;
                                }
                            },
                            GeneralRulesBool: {
                                ref : "qvbgcolorbool",
                                type : "boolean",
                                component : "switch",
                                label : "Set objects background",
                                options: [{
                                    value: false,
                                    label: "Default"
                                }, {
                                    value: true,
                                    label: "Custom"
                                }],
                                defaultValue: false
                            },
                            GRBGColorTypeBool: {
                                ref : "qvbgcolortypebool",
                                type : "boolean",
                                component : "switch",
                                label : "Define background color",
                                options: [{
                                    value: false,
                                    label: "Single"
                                }, {
                                    value: true,
                                    label: "Custom"
                                }],
                                defaultValue: false,
                                show : function(data) {
                                    return data.qvbgcolorbool;
                                }                              
                            },
                            GRBGSingleColor: {
                                ref: "qvbgsinglecolor",
                                label: "Background single color",
                                type: "object",  
                                component: "color-picker",  
                                defaultValue: {  
                                    color: '#ffffff'  
                                },
                                show : function(data) {
                                    return !data.qvbgcolortypebool && data.qvbgcolorbool;
                                }
                            },
                            GRBGCustomColor: {
                                type: "string",
                                ref: "qvbgcustomcolor",
                                label: "Background color expression",
                                defaultValue : "transparent",
                                expression : "optional",
                                show : function(data) {
                                    return data.qvbgcolortypebool && data.qvbgcolorbool;
                                }
                            },
                            borderBool: {
                                ref : "qvborderbool",
                                type : "boolean",
                                component : "switch",
                                label : "Set a border",
                                options: [{
                                    value: true,
                                    label: "On"
                                }, {
                                    value: false,
                                    label: "Off"
                                }],
                                defaultValue: false
                            },
                            borderColor: {
                                ref: "qvbordercolor",
                                label: "Border color",
                                type: "object",  
                                component: "color-picker",  
                                defaultValue: {  
                                    color: "#f2f2f2"  
                                },
                                show : function(data) {
                                    return  data.qvborderbool;
                                }
                            },
                            borderWidth: {
                                type: "number",
                                component: "slider",
                                label: "Border width",
                                ref: "qvborderwidth",
                                min: 0,
                                max: 10,
                                step: 1,
                                defaultValue: 1,
                                show : function(data) {
                                    return  data.qvborderbool;
                                }                               
                            },
                            borderRadius: {
                                type: "number",
                                component: "slider",
                                label: "Border radius",
                                ref: "qvborderradius",
                                min: 0,
                                max: 50,
                                step: 5,
                                defaultValue: 0,
                                show : function(data) {
                                    return  data.qvborderbool;
                                }                               
                            },
                            borderShadowBool: {
                                ref : "qvbordershadowbool",
                                type : "boolean",
                                component : "switch",
                                label : "Shadow",
                                options: [{
                                    value: true,
                                    label: "On"
                                }, {
                                    value: false,
                                    label: "Off"
                                }],
                                defaultValue: false,
                                show : function(data) {
                                    return  data.qvborderbool;
                                } 
                            },
                            borderShadowType: {
                                ref: "qvbordershadowtype",
                                type: "string",
                                component: "buttongroup",
                                options: [ {
                                    value: 'simple',
                                    label: "Simple"
                                }, {
                                    value: '3d',
                                    label: "3D"
                                }, {
                                    value: 'embossed',
                                    label: "Embossed"
                                }],
                                defaultValue: "3d",
                                show : function(data) {
                                    return data.qvborderbool && data.qvbordershadowbool;
                                }
                            }
                        }
                    },
                    //Sheet settings
                    Sheet: {
                        label: "Custom Sheet",
                        type: "items",
                        items: {
                            StepSheet0: {
                                label: "Modify a variable when using mobile:",
                                component: "text"
                            },
                            SheetHideMobileBool: {
                                ref : "SheetHideMobileBool",
                                type : "boolean",
                                component : "switch",
                                label: "Hide/show for mobile",
                                options: [{
                                    value: true,
                                    label: "True"
                                }, {
                                    value: false,
                                    label: "False"
                                }],
                                defaultValue: false
                            },  
                            SheetHideVariable: {
                                type: "string",
                                component: "dropdown",
                                label: "Select hide variable",
                                ref: "SheetHideVariable",
                                options: utils.getVariableList({listType: 'variable', sortBy: 'title'}),
                                defaultValue: 'vBeautifyMeHideSheet',
                                show : function(data) {
                                    return data.SheetHideMobileBool;
                                }
                            },
                            SheetVariableValue: {
                                ref : "SheetVariableValue",
                                type : "boolean",
                                component : "switch",
                                label : "Toogle value",
                                options: [{
                                    value: 1,
                                    label: "1"
                                }, {
                                    value: 0,
                                    label: "0"
                                }],
                                defaultValue: 0,
                                show : function(data) {
                                    return data.SheetHideMobileBool;
                                } 
                            },
                            SheetNavigationBool: {
                                ref : "SheetNavigationBool",
                                type : "boolean",
                                component : "switch",
                                label: "Navigate to a sheet",
                                options: [{
                                    value: true,
                                    label: "True"
                                }, {
                                    value: false,
                                    label: "False"
                                }],
                                defaultValue: false,
                                show : function(data) {
                                    return data.SheetHideMobileBool;
                                }
                            },  
                            SheetNavigationId: {
                                type: "string",
                                component: "dropdown",
                                label: "Jump to Sheet",
                                ref: "SheetNavigationId",
                                options: utils.getPPList({listType: 'sheet', sortBy: 'title'}),
                                show : function(data) {
                                    return data.SheetHideMobileBool && data.SheetNavigationBool;
                                }
                            },
                            SheetChangeBackgroundBool: {
                                ref : "shchangebgBool",
                                type : "boolean",
                                component : "switch",
                                label: "Modify background",
                                options: [{
                                    value: true,
                                    label: "True"
                                }, {
                                    value: false,
                                    label: "False"
                                }],
                                defaultValue: false
                            },  
                            SheetBackgroundColorBool: {
                                ref : "shbgcolorbool",
                                type : "boolean",
                                component : "switch",
                                label : "Define background color",
                                options: [{
                                    value: false,
                                    label: "Single"
                                }, {
                                    value: true,
                                    label: "Custom"
                                }],
                                defaultValue: false,
                                show : function(data) {
                                    return data.shchangebgBool;
                                }                             
                            },
                            SheetBackgroundCustomColor: {
                                type: "string",
                                ref: "shbgcustomcolor",
                                label: "Background color expression",
                                defaultValue : "",
                                expression : "optional",
                                show : function(data) {
                                    return data.shchangebgBool && data.shbgcolorbool;
                                }
                            },
                            SheetBackgroundSingleColor: {
                                ref: "shbgsinglecolor",
                                label: "Background single color",
                                type: "object",  
                                component: "color-picker",  
                                defaultValue: {  
                                    color: '#ffffff'  
                                },
                                show : function(data) {
                                    return data.shchangebgBool && !data.shbgcolorbool;
                                }
                            },
                            SheetBackgroundDegreeBool: {
                                ref : "shbgdegreebool",
                                type : "boolean",
                                component : "switch",
                                label : "Use degree",
                                options: [{
                                    value: false,
                                    label: "False"
                                }, {
                                    value: true,
                                    label: "True"
                                }],
                                defaultValue: false,
                                show : function(data) {
                                    return data.shchangebgBool;
                                }                             
                            },
                            //2nd color
                            SheetBackgroundColorBool2: {
                                ref : "shbgcolorbool2",
                                type : "boolean",
                                component : "switch",
                                label : "Define 2nd color",
                                options: [{
                                    value: false,
                                    label: "Single"
                                }, {
                                    value: true,
                                    label: "Custom"
                                }],
                                defaultValue: false,
                                show : function(data) {
                                    return data.shchangebgBool && data.shbgdegreebool;
                                }
                            },
                            SheetBackgroundCustomColor2: {
                                type: "string",
                                ref: "shbgcustomcolor2",
                                label: "Background 2nd color expression",
                                defaultValue : "#ffffff",
                                expression : "optional",
                                show : function(data) {
                                    return data.shchangebgBool && data.shbgcolorbool2 && data.shbgdegreebool;
                                }
                            },
                            SheetBackgroundSingleColor2: {
                                ref: "shbgsinglecolor2",
                                label: "Degree single 2nd color",
                                type: "object",  
                                component: "color-picker",  
                                defaultValue: {  
                                    color: '#cccccc'  
                                },
                                show : function(data) {
                                    return data.shchangebgBool && !data.shbgcolorbool2 && data.shbgdegreebool;
                                }
                            },
                            SheetBackgroundDegreePosition: {
                                type: "string",
                                component: "align-matrix",
                                icon: !0,
                                horizontal: !0,
                                label: "Direction",
                                ref: "shbgdegreedir",
                                defaultValue: "centerRight",
                                show : function(data) {
                                    return data.shchangebgBool && data.shbgdegreebool;
                                }
                            },
                            //Adding a background responsive left panel
                            SheetBackgroundLeftPanelBool: {
                                ref : "shbgleftpanelbool",
                                type : "boolean",
                                component : "switch",
                                label : "Add a left panel",
                                options: [{
                                    value: false,
                                    label: "Single"
                                }, {
                                    value: true,
                                    label: "Custom"
                                }],
                                defaultValue: false,
                                show : function(data) {
                                    return data.shchangebgBool;
                                }
                            },
                            SheetBackgroundLeftPanelWidth: {
                                type: "number",
                                component: "slider",
                                label: "Left panel width",
                                ref: "shbgleftpanelwidth",
                                min: 1,
                                max: 50,
                                step: 1,
                                defaultValue: 7,
                                show : function(data) {
                                    return  data.shchangebgBool && data.shbgleftpanelbool;
                                }                               
                            },
                            SheetBackgroundLeftPanelColor: {
                                ref: "shbgleftpanelcolor",
                                label: "Left panel color",
                                type: "object",  
                                component: "color-picker",  
                                defaultValue: {  
                                    color: '#cccccc'  
                                },
                                show : function(data) {
                                    return data.shchangebgBool && data.shbgleftpanelbool;
                                }
                            },
                            //Adding a background responsive right panel
                            SheetBackgroundReftPanelBool: {
                                ref : "shbgrightpanelbool",
                                type : "boolean",
                                component : "switch",
                                label : "Add a right panel",
                                options: [{
                                    value: false,
                                    label: "Single"
                                }, {
                                    value: true,
                                    label: "Custom"
                                }],
                                defaultValue: false,
                                show : function(data) {
                                    return data.shchangebgBool;
                                }
                            },
                            SheetBackgroundRightPanelWidth: {
                                type: "number",
                                component: "slider",
                                label: "Right panel width",
                                ref: "shbgrightpanelwidth",
                                min: 1,
                                max: 50,
                                step: 1,
                                defaultValue: 7,
                                show : function(data) {
                                    return data.shchangebgBool && data.shbgrightpanelbool;
                                }                               
                            },
                            SheetBackgroundRightPanelColor: {
                                ref: "shbgrightpanelcolor",
                                label: "Right panel color",
                                type: "object",  
                                component: "color-picker",  
                                defaultValue: {  
                                    color: '#cccccc'  
                                },
                                show : function(data) {
                                    return data.shchangebgBool && data.shbgrightpanelbool;
                                }
                            },
                            //Background Image
                            StepSheet1: {
                                label: "",
                                component: "text"
                            },
                            SheetBackgroundImgBool: {
                                ref : "shbgimgbool",
                                type : "boolean",
                                component : "switch",
                                label : "Add a background image",
                                options: [{
                                    value: false,
                                    label: "No, thanks"
                                }, {
                                    value: true,
                                    label: "Yes, please"
                                }],
                                defaultValue: false,
                                show : function(data) {
                                    return data.shchangebgBool;
                                }
                            },
                            SheetBackgroundImgSource: {
                                type: "string",
                                ref: "shbgimgsrc",
                                component: "radiobuttons",
                                label: "Image source",
                                options: [
                                  {
                                    value: "url",
                                    label: "Image from Url"
                                  },
                                  {
                                    value: "lib",
                                    label: "Image from library"
                                  }
                                ],
                                defaultValue: "lib",
                                show : function(data) {
                                    return data.shchangebgBool && data.shbgimgbool;
                                }
                            },                                        
                            SheetBackgroundImgMedia: {
                                label:"Image media",
                                component: "media",
                                ref: "shbgimgmedia",
                                layoutRef: "shbgimgmedia",
                                type: "string",
                                show : function(data) {
                                    return data.shchangebgBool && data.shbgimgbool && data.shbgimgsrc == 'lib';
                                }
                            },
                            SheetBackgroundImgUrl: {
                                type: "string",
                                ref: "shbgimgmeurl",
                                label: "Image url",
                                defaultValue : '',
                                expression : "optional",
                                show : function(data) {
                                    return data.shchangebgBool && data.shbgimgbool && data.shbgimgsrc == 'url';
                                }
                            },   
                            SheetBackgroundImgOpacity: {                                
                                type: "number",
                                component: "slider",
                                label: "Opacity",
                                ref: "shbgimgopacity",
                                min: 0,
                                max: 1,
                                step: 0.1,
                                defaultValue: 1,
                                show : function(data) {
                                    return data.shchangebgBool && data.shbgimgbool;
                                }
                            },
                            SheetBackgroundImgSize: {
                                ref: "shbgimgsize",
                                type: "string",
                                component: "dropdown",
                                label: "Size",
                                options: vImgSize,
                                defaultValue: "cover",
                                show : function(data) {
                                    return data.shchangebgBool && data.shbgimgbool;
                                }
                            },
                            SheetBackgroundImgPosition: {
                                type: "string",
                                component: "align-matrix",
                                icon: !0,
                                horizontal: !0,
                                label: "Direction",
                                ref: "shbgimgdir",
                                defaultValue: "centerCenter",
                                show : function(data) {
                                    return data.shchangebgBool && data.shbgimgbool && data.shbgimgsize != 'cover' && data.shbgimgsize != '100% 100%';
                                }
                            },
                            SheetBackgroundImgSizePerc: {
                                type: "number",
                                component: "slider",
                                label: "Custom percentage %",
                                ref: "shbgimgsizeperc",
                                min: 5,
                                max: 100,
                                step: 5,
                                defaultValue: 50,
                                show : function(data) {
                                    return  data.shchangebgBool && data.shbgimgbool && data.shbgimgsize == 'percentage';
                                }                               
                            },
                            SheetBackgroundPaddingBool: {
                                ref : "shbgpaddingbool",
                                type : "boolean",
                                component : "switch",
                                label : "Add image padding",
                                options: [{
                                    value: false,
                                    label: "No, thanks"
                                }, {
                                    value: true,
                                    label: "Yes, please"
                                }],
                                defaultValue: false,
                                show : function(data) {
                                    return  data.shchangebgBool && data.shbgimgbool;
                                } 
                            },
                            SheetBackgroundImgPadding: {
                                type: "number",
                                component: "slider",
                                label: "Padding %",
                                ref: "shbgimgpadding",
                                min: 0,
                                max: 20,
                                step: 1,
                                defaultValue: 0,
                                show : function(data) {
                                    return  data.shchangebgBool && data.shbgimgbool && data.shbgpaddingbool;
                                }                               
                            },
                            // Background shadow
                            SheetBackgroundShadowBool: {
                                ref : "shbgshadowbool",
                                type : "boolean",
                                component : "switch",
                                label : "Add a shadow",
                                options: [{
                                    value: false,
                                    label: "No, thanks"
                                }, {
                                    value: true,
                                    label: "Yes, please"
                                }],
                                defaultValue: false,
                                show : function(data) {
                                    return  data.shchangebgBool;
                                } 
                            },
                            SheetBackgroundShadowSize: {
                                type: "number",
                                component: "slider",
                                label: "Shadow size",
                                ref: "shbgshadowsize",
                                min: 0,
                                max: 20,
                                step: 1,
                                defaultValue: 5,
                                show : function(data) {
                                    return  data.shchangebgBool && data.shbgshadowbool;
                                }                               
                            },
                            SheetBackgroundPadding: {
                                type: "number",
                                component: "slider",
                                label: "Padding size",
                                ref: "shbgpadding",
                                min: 0,
                                max: 80,
                                step: 5,
                                defaultValue: 20,
                                show : function(data) {
                                    return  data.shchangebgBool && data.shbgshadowbool;
                                }                               
                            },
                            SheetBackgroundPaddingColor: {
                                ref: "shbgpaddingcolor",
                                label: "Padding color",
                                type: "object",  
                                component: "color-picker",  
                                defaultValue: {  
                                    color: '#cccccc'  
                                },
                                show : function(data) {
                                    return data.shchangebgBool && data.shbgshadowbool;
                                }
                            },
                            // Title bar
                            StepSheet2: {
                                label: ". . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .",
                                component: "text"
                            },
                            SheetTitle: {
                                type: "string",
                                component: "radiobuttons",
                                label: "Sheet title bar",
                                ref: "sheettitle",
                                options: [{
                                    value: "s",
                                    label: "Show"
                                }, {
                                    value: "h",
                                    label: "Hide"
                                }, {
                                    value: "t",
                                    label: "Transparent"
                                }, {
                                    value: "l",
                                    label: "Hide Title"
                                }],
                                defaultValue: "s"
                            },
                            SheetTitleColorBool: {
                                ref : "sheettitlecolbool",
                                type : "boolean",
                                component : "switch",
                                label : "Change top tab color",
                                options: [{
                                    value: false,
                                    label: "No, thanks"
                                }, {
                                    value: true,
                                    label: "Yes, please"
                                }],
                                defaultValue: false,
                                show : function(data) {
                                    return data.sheettitle == 's' || data.sheettitle == 'l';
                                }                              
                            },
                            SheetTitleSingleColor: {
                                ref: "sheettitlecolor",
                                label: "Top tab color",
                                type: "object",  
                                component: "color-picker",  
                                defaultValue: {  
                                    color: '#ce8c25'  
                                },
                                show : function(data) {
                                    return (data.sheettitle == 's' || data.sheettitle == 'l') && data.sheettitlecolbool;
                                }
                            },
                            SheetTitleImgBool: {
                                ref : "sheettitleimgbool",
                                type : "boolean",
                                component : "switch",
                                label : "Top tab image",
                                options: [{
                                    value: false,
                                    label: "No, thanks"
                                }, {
                                    value: true,
                                    label: "Yes, please"
                                }],
                                defaultValue: false,
                                show : function(data) {
                                    return data.sheettitle == 's' || data.sheettitle == 'l';
                                }                              
                            },
                            SheetTitleImg: {
                                label:"Image media",
                                component: "media",
                                ref: "sheettitleimg",
                                layoutRef: "sheettitleimg",
                                type: "string",
                                show : function(data) {
                                    return (data.sheettitle == 's' || data.sheettitle == 'l') && data.sheettitleimgbool;
                                }
                            }
                        }
                    },
                    //Filter-pane settings
                    FilterPaneBool: {
                        component: "items",
                        label: "Filter Pane settings",
                        items: {
                            FilterPaneBool: {
                                ref : "filterpanebool",
                                type : "boolean",
                                component : "switch",
                                label : "Change default settings",
                                options: [{
                                    value: false,
                                    label: "No, thanks"
                                }, {
                                    value: true,
                                    label: "Yes, please"
                                }],
                                defaultValue: false
                            },
                            FilterBgBool: {
                                ref : "filterbgbool",
                                type : "boolean",
                                component : "switch",
                                label : "Change Background",
                                options: [{
                                    value: false,
                                    label: "No, thanks"
                                }, {
                                    value: true,
                                    label: "Yes, please"
                                }],
                                defaultValue: false,
                                show : function(data) {
                                    return data.filterpanebool;
                                }
                            },
                            FilterBgTranspBool: {
                                ref : "filterbgtranspbool",
                                type : "boolean",
                                component : "switch",
                                label : "Make transparent",
                                options: [{
                                    value: false,
                                    label: "No, thanks"
                                }, {
                                    value: true,
                                    label: "Yes, please"
                                }],
                                defaultValue: false,
                                show : function(data) {
                                    return data.filterpanebool && data.filterbgbool;
                                }
                            },
                            FilterPaneBgSingleColor: {
                                ref: "fpbgsinglecolor",
                                label: "Background color",
                                type: "object",  
                                component: "color-picker",  
                                defaultValue: {  
                                    color: '#ffffff'  
                                },
                                show : function(data) {
                                    return data.filterpanebool && data.filterbgbool && !data.filterbgtranspbool;
                                }
                            },
                            FilterPaneSingleColor: {
                                ref: "fpsinglecolor",
                                label: "Text color",
                                type: "object",  
                                component: "color-picker",  
                                defaultValue: {  
                                    color: '#595959'  
                                },
                                show : function(data) {
                                    return data.filterpanebool;
                                }
                            },
                            FilterPaneFontFamily: {
                                ref: "fpfontfamily",
                                type: "string",
                                component: "dropdown",
                                label: "Font family",
                                options: vFontFamily,
                                defaultValue: "unset",
                                show : function(data) {
                                    return data.filterpanebool;
                                }                              
                            },
                            FilterPaneFontSize: {                                
                                type: "number",
                                component: "slider",
                                label: "Font size",
                                ref: "fpfontsize",
                                min: 14,
                                max: 20,
                                step: 1,
                                defaultValue: 14,
                                show : function(data) {
                                    return data.filterpanebool;
                                }
                            },
                            FilterPaneLabelAlign: {
                                type: "string",
                                component: "item-selection-list",
                                icon: !0,
                                horizontal: !0,
                                label: "Labels alignment",
                                ref: "fplabelalign",
                                defaultValue: "left",
                                items: [{
                                    value: "left",
                                    component: "icon-item",
                                    icon: "align_left"
                                }, {
                                    value: "center",
                                    icon: "align_center",
                                    component: "icon-item"
                                }, {
                                    value: "right",
                                    icon: "align_right",
                                    component: "icon-item"
                                }],
                                show : function(data) {
                                    return data.filterpanebool;
                                }
                            },
                            FilterBorderBool: {
                                ref : "filterborderbool",
                                type : "boolean",
                                component : "switch",
                                label : "Drop border",
                                options: [{
                                    value: false,
                                    label: "No, thanks"
                                }, {
                                    value: true,
                                    label: "Yes, please"
                                }],
                                defaultValue: false,
                                show : function(data) {
                                    return data.filterpanebool;
                                }
                            },
                            FilterIconBool: {
                                ref : "filtericonbool",
                                type : "boolean",
                                component : "switch",
                                label : "Add an icon",
                                options: [{
                                    value: false,
                                    label: "No, thanks"
                                }, {
                                    value: true,
                                    label: "Yes, please"
                                }],
                                defaultValue: false,
                                show : function(data) {
                                    return data.filterpanebool;
                                }
                            },
                            FilterIcon: {
                                type: "string",
                                component: "item-selection-list",
                                icon: !0,
                                horizontal: !0,
                                label: "Icon",
                                translation: "properties.icon",
                                ref: "filtericon",
                                defaultValue: "arrow_down",
                                items: vIcons,
                                show : function(data) {
                                    return data.filterpanebool && data.filtericonbool;
                                }
                            },
                            FilterStateLineHeight: {                                
                                type: "number",
                                component: "slider",
                                label: "State line height",
                                ref: "fpstatelineheight",
                                min: 0,
                                max: 5,
                                step: 1,
                                defaultValue: 4,
                                show : function(data) {
                                    return data.filterpanebool;
                                }
                            }
                        }
                    },
                    //Text Object settings
                    TextObjBool: {
                        component: "items",
                        label: "Text Object settings",
                        items: {
                            //XS
                            TextXSBool: {
                                ref : "txtxsbool",
                                type : "boolean",
                                component : "switch",
                                label : "Change XS settings",
                                options: [{
                                    value: false,
                                    label: "No, thanks"
                                }, {
                                    value: true,
                                    label: "Yes, please"
                                }],
                                defaultValue: false
                            },
                            TextXSFontFamily: {
                                ref: "txtxsfontfamily",
                                type: "string",
                                component: "dropdown",
                                label: "Font family",
                                options: vFontFamily,
                                defaultValue: "unset",
                                show : function(data) {
                                    return data.txtxsbool;
                                }                              
                            },
                            TextXSFontSize: {                                
                                type: "number",
                                component: "slider",
                                label: "Font size",
                                ref: "txtxsfontsize",
                                min: 65,
                                max: 85,
                                step: 5,
                                defaultValue: 65,
                                show : function(data) {
                                    return data.txtxsbool;
                                }
                            },
                            // S
                            TextSBool: {
                                ref : "txtsbool",
                                type : "boolean",
                                component : "switch",
                                label : "Change S settings",
                                options: [{
                                    value: false,
                                    label: "No, thanks"
                                }, {
                                    value: true,
                                    label: "Yes, please"
                                }],
                                defaultValue: false
                            },
                            TextSFontFamily: {
                                ref: "txtsfontfamily",
                                type: "string",
                                component: "dropdown",
                                label: "Font family",
                                options: vFontFamily,
                                defaultValue: "unset",
                                show : function(data) {
                                    return data.txtsbool;
                                }                              
                            },
                            TextSFontSize: {                                
                                type: "number",
                                component: "slider",
                                label: "Font size",
                                ref: "txtsfontsize",
                                min: 85,
                                max: 100,
                                step: 5,
                                defaultValue: 85,
                                show : function(data) {
                                    return data.txtsbool;
                                }
                            },
                            // M
                            TextMBool: {
                                ref : "txtmbool",
                                type : "boolean",
                                component : "switch",
                                label : "Change M settings",
                                options: [{
                                    value: false,
                                    label: "No, thanks"
                                }, {
                                    value: true,
                                    label: "Yes, please"
                                }],
                                defaultValue: false
                            },
                            TextMFontFamily: {
                                ref: "txtmfontfamily",
                                type: "string",
                                component: "dropdown",
                                label: "Font family",
                                options: vFontFamily,
                                defaultValue: "unset",
                                show : function(data) {
                                    return data.txtmbool;
                                }                              
                            },
                            TextMFontSize: {                                
                                type: "number",
                                component: "slider",
                                label: "Font size",
                                ref: "txtmfontsize",
                                min: 100,
                                max: 140,
                                step: 10,
                                defaultValue: 100,
                                show : function(data) {
                                    return data.txtmbool;
                                }
                            },
                            // L
                            TextLBool: {
                                ref : "txtlbool",
                                type : "boolean",
                                component : "switch",
                                label : "Change L settings",
                                options: [{
                                    value: false,
                                    label: "No, thanks"
                                }, {
                                    value: true,
                                    label: "Yes, please"
                                }],
                                defaultValue: false
                            },
                            TextLFontFamily: {
                                ref: "txtlfontfamily",
                                type: "string",
                                component: "dropdown",
                                label: "Font family",
                                options: vFontFamily,
                                defaultValue: "unset",
                                show : function(data) {
                                    return data.txtlbool;
                                }                              
                            },
                            TextLFontSize: {                                
                                type: "number",
                                component: "slider",
                                label: "Font size",
                                ref: "txtlfontsize",
                                min: 140,
                                max: 200,
                                step: 10,
                                defaultValue: 140,
                                show : function(data) {
                                    return data.txtlbool;
                                }
                            },
                            // XL
                            TextXLBool: {
                                ref : "txtxlbool",
                                type : "boolean",
                                component : "switch",
                                label : "Change XL settings",
                                options: [{
                                    value: false,
                                    label: "No, thanks"
                                }, {
                                    value: true,
                                    label: "Yes, please"
                                }],
                                defaultValue: false
                            },
                            TextXLFontFamily: {
                                ref: "txtxlfontfamily",
                                type: "string",
                                component: "dropdown",
                                label: "Font family",
                                options: vFontFamily,
                                defaultValue: "unset",
                                show : function(data) {
                                    return data.txtxlbool;
                                }                              
                            },
                            TextXLFontSize: {                                
                                type: "number",
                                component: "slider",
                                label: "Font size",
                                ref: "txtxlfontsize",
                                min: 200,
                                max: 600,
                                step: 10,
                                defaultValue: 200,
                                show : function(data) {
                                    return data.txtxlbool;
                                }
                            },
                            TextXLGrowBool: {
                                ref : "txtxlgrowbool",
                                type : "boolean",
                                component : "switch",
                                label : "Add a grow effect",
                                options: [{
                                    value: false,
                                    label: "False"
                                }, {
                                    value: true,
                                    label: "True"
                                }],
                                defaultValue: false,
                                show : function(data) {
                                    return data.txtxlbool;
                                }
                            }
                        }
                    },
                    //Buttons
                    ButtonsSettings: {
                        component: "items",
                        label: "Button settings",
                        items: {
                            BtnTransparentBool: {
                                ref : "btntranspbool",
                                type : "boolean",
                                component : "switch",
                                label : "Transparent background",
                                options: [{
                                    value: false,
                                    label: "No, thanks"
                                }, {
                                    value: true,
                                    label: "Yes, please"
                                }],
                                defaultValue: false                                
                            },
                            BtnFontFamily: {
                                ref: "btnfontfamily",
                                type: "string",
                                component: "dropdown",
                                label: "Font family",
                                options: vFontFamily,
                                defaultValue: "unset"                                
                            },
                            BtnShadowBool: {
                                ref : "btnshadowbool",
                                type : "boolean",
                                component : "switch",
                                label : "Border shadow",
                                options: [{
                                    value: true,
                                    label: "On"
                                }, {
                                    value: false,
                                    label: "Off"
                                }],
                                defaultValue: false                                
                            },
                            BtnTextShadowBool: {
                                ref : "btntextshadowbool",
                                type : "boolean",
                                component : "switch",
                                label : "Text shadow",
                                options: [{
                                    value: true,
                                    label: "On"
                                }, {
                                    value: false,
                                    label: "Off"
                                }],
                                defaultValue: false                                
                            },
                            BtnHoverBool: {
                                ref : "btnhoverbool",
                                type : "boolean",
                                component : "switch",
                                label : "Change on hover",
                                options: [{
                                    value: true,
                                    label: "On"
                                }, {
                                    value: false,
                                    label: "Off"
                                }],
                                defaultValue: false                                
                            },
                            BtnHoverSingleColor: {
                                ref: "btnhoversinglecolor",
                                label: "Text color",
                                type: "object",  
                                component: "color-picker",  
                                defaultValue: {  
                                    color: '#808080'  
                                },
                                show : function(data) {
                                    return data.btnhoverbool;
                                }
                            }
                        }
                    },
                    //KPI
                    KPISettings: {
                        component: "items",
                        label: "KPI settings",
                        items: {
                            KPIModifyBool: {
                                ref : "kpimodifybool",
                                type : "boolean",
                                component : "switch",
                                label : "Change default settings",
                                options: [{
                                    value: false,
                                    label: "No, thanks"
                                }, {
                                    value: true,
                                    label: "Yes, please"
                                }],
                                defaultValue: false                                
                            },
                            KPIFontFamily: {
                                ref: "kpifontfamily",
                                type: "string",
                                component: "dropdown",
                                label: "Font family",
                                options: vFontFamily,
                                defaultValue: "unset",
                                show : function(data) {
                                    return data.kpimodifybool;
                                }                               
                            },
                            KPILabelColor: {
                                ref: "kpilabelcolor",
                                label: "Label color",
                                type: "object",  
                                component: "color-picker",  
                                defaultValue: {  
                                    color: '#595959'  
                                },
                                show : function(data) {
                                    return data.kpimodifybool;
                                }
                            },
                            KPIBorderBool: {
                                ref : "kpiborderbool",
                                type : "boolean",
                                component : "switch",
                                label : "Set a border",
                                options: [{
                                    value: true,
                                    label: "On"
                                }, {
                                    value: false,
                                    label: "Off"
                                }],
                                defaultValue: false
                            },
                            KPIBorderColor: {
                                ref: "kpibordercolor",
                                label: "Border color",
                                type: "object",  
                                component: "color-picker",  
                                defaultValue: {  
                                    color: "#f2f2f2"  
                                },
                                show : function(data) {
                                    return  data.kpiborderbool;
                                }
                            },
                            KPIBorderWidth: {
                                type: "number",
                                component: "slider",
                                label: "Border width",
                                ref: "kpiborderwidth",
                                min: 0,
                                max: 10,
                                step: 1,
                                defaultValue: 1,
                                show : function(data) {
                                    return  data.kpiborderbool;
                                }                               
                            },
                            KPIBorderRadius: {
                                type: "number",
                                component: "slider",
                                label: "Border radius",
                                ref: "kpiborderradius",
                                min: 0,
                                max: 50,
                                step: 5,
                                defaultValue: 0,
                                show : function(data) {
                                    return  data.kpiborderbool;
                                }                               
                            }
                        }
                    },
                    //Tables
                    Tables: {
                        component: "items",
                        label: "Tables",
                        items: {
                            TablesHeaderUnset: {                                
                                ref : "TablesHeaderUnset",
                                type : "boolean",
                                component : "switch",
                                label : "Delete straight table header",
                                options: [{
                                    value: false,
                                    label: "False"
                                }, {
                                    value: true,
                                    label: "True"
                                }],
                                defaultValue: false
                            },
                            TableHeaderColorBool: {
                                ref : "TableHeaderColorBool",
                                type : "boolean",
                                component : "switch",
                                label : "Add a header background",
                                options: [{
                                    value: false,
                                    label: "False"
                                }, {
                                    value: true,
                                    label: "True"
                                }],
                                defaultValue: false
                            },
                            TableHeaderColor: {
                                ref: "TableHeaderColor",
                                label: "Header background color",
                                type: "object",  
                                component: "color-picker",  
                                defaultValue: {  
                                    color: '#f2f2f2'  
                                },
                                show : function(data) {
                                    return data.TableHeaderColorBool;
                                }
                            },
                            TableHeaderTextColor: {
                                ref: "TableHeaderTextColor",
                                label: "Header font color",
                                type: "object",  
                                component: "color-picker",  
                                defaultValue: {  
                                    color: '#595959'  
                                },
                                show : function(data) {
                                    return data.TableHeaderColorBool;
                                }
                            },
                            TableHeaderTitleBool: {
                                ref : "TableHeaderTitleBool",
                                type : "boolean",
                                component : "switch",
                                label : "Set settings to title",
                                options: [{
                                    value: false,
                                    label: "False"
                                }, {
                                    value: true,
                                    label: "True"
                                }],
                                defaultValue: false,
                                show : function(data) {
                                    return data.TableHeaderColorBool;
                                }
                            },
                            TableButtonsOutBool: {
                                ref : "TableButtonsOutBool",
                                type : "boolean",
                                component : "switch",
                                label : "Hide dimension buttons",
                                options: [{
                                    value: false,
                                    label: "False"
                                }, {
                                    value: true,
                                    label: "True"
                                }],
                                defaultValue: false
                            },                           
                            TablePijamaBool: {
                                ref : "TablePijamaBool",
                                type : "boolean",
                                component : "switch",
                                label : "Add a pijama",
                                options: [{
                                    value: false,
                                    label: "False"
                                }, {
                                    value: true,
                                    label: "True"
                                }],
                                defaultValue: false
                            },
                            TablePijamaBGColor: {
                                ref: "TablePijamaBGColor",
                                label: "Pijama background color",
                                type: "object",  
                                component: "color-picker",  
                                defaultValue: {  
                                    color: '#f2f2f2'  
                                },
                                show : function(data) {
                                    return data.TablePijamaBool;
                                }
                            },
                            TablePijamaFontColor: {
                                ref: "TablePijamaFontColor",
                                label: "Pijama font color",
                                type: "object",  
                                component: "color-picker",  
                                defaultValue: {  
                                    color: '#595959'  
                                },
                                show : function(data) {
                                    return data.TablePijamaBool;
                                }
                            },
                            StepTables1: {
                                label: "",
                                component: "text"
                            },
                            StepTablesHighlightHelpBool: {
                                ref : "StepTablesHighlightHelpBool",
                                type : "boolean",
                                component : "switch",
                                label : "Need more info here",
                                options: [{
                                    value: false,
                                    label: "False"
                                }, {
                                    value: true,
                                    label: "True"
                                }],
                                defaultValue: false
                            },
                            StepTables2: {
                                label: "Useful to custom specific labels with bold, italic, font-size...",
                                component: "text",
                                show : function(data) {
                                    return data.StepTablesHighlightHelpBool;
                                }
                            },
                            StepTables3: {
                                label: "Requisites : use a dark background in the table row to create a highlight text class. Then the extension will identify and manage it.",
                                component: "text",
                                show : function(data) {
                                    return data.StepTablesHighlightHelpBool;
                                }
                            },
                            TableHighlightBool: {
                                ref : "TableHighlightBool",
                                type : "boolean",
                                component : "switch",
                                label : "Custom highlighted texts",
                                options: [{
                                    value: false,
                                    label: "False"
                                }, {
                                    value: true,
                                    label: "True"
                                }],
                                defaultValue: false
                            },
                            TablesTextStyleBold: {
                                ref: "TablesTextStyleBold",
                                type: "boolean",
                                component: "checkbox",
                                label: "Bold",
                                defaultValue: false,
                                show : function(data) {
                                    return data.TableHighlightBool;
                                }
                            },
                            TablesTextStyleItalic: {
                                ref: "TablesTextStyleItalic",
                                type: "boolean",
                                component: "checkbox",
                                label: "Italic",
                                defaultValue: false,
                                show : function(data) {
                                    return data.TableHighlightBool;
                                }
                            },
                            TablesTextStyleUnderline: {
                                ref: "TablesTextStyleUnderline",
                                type: "boolean",
                                component: "checkbox",
                                label: "Underlined",
                                defaultValue: false,
                                show : function(data) {
                                    return data.TableHighlightBool;
                                }
                            },
                            TablesTextStyleFontSize: {                                
                                type: "number",
                                component: "slider",
                                label: "Font size",
                                ref: "TablesTextStyleFontSize",
                                min: 13,
                                max: 23,
                                step: 1,
                                defaultValue: 13,
                                show : function(data) {
                                    return data.TableHighlightBool;
                                }
                            },
                            TableTextStyleColor: {
                                ref: "TableTextStyleColor",
                                label: "Highlight text color",
                                type: "object",  
                                component: "color-picker",  
                                defaultValue: {  
                                    color: '#595959'  
                                },
                                show : function(data) {
                                    return data.TableHighlightBool;
                                }
                            },
                            TableBackgroundStyleColor: {
                                ref: "TableBackgroundStyleColor",
                                label: "Highlight background",
                                type: "object",  
                                component: "color-picker",  
                                defaultValue: {  
                                    color: '#cccccc'  
                                },
                                show : function(data) {
                                    return data.TableHighlightBool;
                                }
                            },
                            TableStyleAlign: {
                                type: "string",
                                component: "item-selection-list",
                                icon: !0,
                                horizontal: !0,
                                label: "Labels alignment",
                                ref: "TableStyleAlign",
                                defaultValue: "left",
                                items: [{
                                    value: "left",
                                    component: "icon-item",
                                    icon: "align_left"
                                }, {
                                    value: "center",
                                    icon: "align_center",
                                    component: "icon-item"
                                }, {
                                    value: "right",
                                    icon: "align_right",
                                    component: "icon-item"
                                }],
                                show : function(data) {
                                    return data.TableHighlightBool;
                                }
                            },                            
                            TableBordersUnset: {
                                ref : "TableBordersUnset",
                                type : "boolean",
                                component : "switch",
                                label : "Borders collapse",
                                options: [{
                                    value: false,
                                    label: "Unset"
                                }, {
                                    value: true,
                                    label: "Set"
                                }],
                                defaultValue: true
                            },
                            TablesBordersRadius: {                                
                                type: "number",
                                component: "slider",
                                label: "Cell border radius",
                                ref: "TablesBordersRadius",
                                min: 0,
                                max: 20,
                                step: 1,
                                defaultValue: 0                                
                            },
                            TableVerticalAlignBool: {
                                ref : "TableVerticalAlignBool",
                                type : "boolean",
                                component : "switch",
                                label : "Vertical align center",
                                options: [{
                                    value: false,
                                    label: "False"
                                }, {
                                    value: true,
                                    label: "True"
                                }],
                                defaultValue: false
                            },
                        }
                    },
                    //Container tabs
                    Containers: {
                        component: "items",
                        label: "Containers",
                        items: {                                                        
                            ContainerBGBool: {
                                ref : "ContainerBGBool",
                                type : "boolean",
                                component : "switch",
                                label : "Custom background",
                                options: [{
                                    value: false,
                                    label: "False"
                                }, {
                                    value: true,
                                    label: "True"
                                }],
                                defaultValue: false                                
                            },
                            ContainerBGColor: {
                                ref: "ContainerBGColor",
                                label: "Active background",
                                type: "object",  
                                component: "color-picker",  
                                defaultValue: {  
                                    color: '#ffc000'  
                                },
                                show : function(data) {
                                    return data.ContainerBGBool;
                                }
                            },
                            ContainerTextBool: {
                                ref : "ContainerTextBool",
                                type : "boolean",
                                component : "switch",
                                label : "Custom text color",
                                options: [{
                                    value: false,
                                    label: "False"
                                }, {
                                    value: true,
                                    label: "True"
                                }],
                                defaultValue: false                                
                            },
                            ContainerTextColor: {
                                ref: "ContainerTextColor",
                                label: "Active text color",
                                type: "object",  
                                component: "color-picker",  
                                defaultValue: {  
                                    color: '#595959'  
                                },
                                show : function(data) {
                                    return data.ContainerTextBool;
                                }
                            },
                            ContainerBorderBool: {
                                ref : "ContainerBorderBool",
                                type : "boolean",
                                component : "switch",
                                label : "Custom border color",
                                options: [{
                                    value: false,
                                    label: "False"
                                }, {
                                    value: true,
                                    label: "True"
                                }],
                                defaultValue: false                                
                            },
                            ContainerBorderColor: {
                                ref: "ContainerBorderColor",
                                label: "Active border color",
                                type: "object",  
                                component: "color-picker",  
                                defaultValue: {  
                                    color: '#009845'  
                                },
                                show : function(data) {
                                    return data.ContainerBorderBool;
                                }
                            }
                        }
                    },
                    //Variable input
                    VariableInputObj: {
                        component: "items",
                        label: "Variable Input",
                        items: {                                                        
                            VarBGColorBool: {
                                ref : "VarColorsBool",
                                type : "boolean",
                                component : "switch",
                                label : "Custom colors",
                                options: [{
                                    value: false,
                                    label: "False"
                                }, {
                                    value: true,
                                    label: "True"
                                }],
                                defaultValue: false                                
                            },
                            VarBGSingleColor: {
                                ref: "VarBGSingleColor",
                                label: "Single color",
                                type: "object",  
                                component: "color-picker",  
                                defaultValue: {  
                                    color: '#ffc000'  
                                },
                                show : function(data) {
                                    return data.VarColorsBool;
                                }
                            },
                            VarFontSingleColor: {
                                ref: "VarFontSingleColor",
                                label: "Single color",
                                type: "object",  
                                component: "color-picker",  
                                defaultValue: {  
                                    color: '#595959'  
                                },
                                show : function(data) {
                                    return data.VarColorsBool;
                                }
                            }
                        }
                    },
                    //Rules by Object Id
                    RulesByObjectId: {
                        type: "array",
                        ref: "listItemsId",
                        label: "Object List",
                        itemTitleRef: "label",
                        allowAdd: true,
                        allowRemove: true,
                        addTranslation: "Add Item",
                        items: {                            
                            IdsObjList:{
                                type: "string",
                                component: "dropdown",
                                label: "Select Object Id",
                                ref: "ObjId",
                                options: function() {
                                    return getObj().then(function(items) {
                                        return items;
                                    });
                                }
                            },
                            IdsFindBool: {
                                ref : "IdsFindBool",
                                type : "boolean",
                                component : "switch",
                                label : "Find it",
                                options: [{
                                    value: false,
                                    label: "False"
                                }, {
                                    value: true,
                                    label: "True"
                                }],
                                defaultValue: false                                
                            },
                            IdsFindBool: {
                                ref : "IdsFindBool",
                                type : "boolean",
                                component : "switch",
                                label : "Find it",
                                options: [{
                                    value: false,
                                    label: "False"
                                }, {
                                    value: true,
                                    label: "True"
                                }],
                                defaultValue: true                                
                            },
                            IdsAlignDatePickerBool: {
                                ref : "IdsAlignDatePickerBool",
                                type : "boolean",
                                component : "switch",
                                label : "Align components",
                                options: [{
                                    value: false,
                                    label: "False"
                                }, {
                                    value: true,
                                    label: "True"
                                }],
                                defaultValue: false,
                                show : function(data) {
                                    return boolDatePicker(data.ObjId) >= 0;
                                }                              
                            },
                            IdsBGColorBool: {
                                ref : "IdsBGColorBool",
                                type : "boolean",
                                component : "switch",
                                label : "Background color",
                                options: [{
                                    value: false,
                                    label: "False"
                                }, {
                                    value: true,
                                    label: "True"
                                }],
                                defaultValue: false,
                                show : function(data) {
                                    return data.ObjId.substring(data.ObjId.indexOf('#:#') + 3) != 'action-button';
                                }                           
                            },
                            IdsBGSingleColor: {
                                ref: "IdsBGSingleColor",
                                label: "Single color",
                                type: "object",  
                                component: "color-picker",  
                                defaultValue: {  
                                    color: '#595959'  
                                },
                                show : function(data) {
                                    return data.IdsBGColorBool && data.ObjId.substring(data.ObjId.indexOf('#:#') + 3) != 'action-button';
                                }
                            },
                            IdsFontColorBool: {
                                ref : "IdsFontColorBool",
                                type : "boolean",
                                component : "switch",
                                label : "Font color",
                                options: [{
                                    value: false,
                                    label: "False"
                                }, {
                                    value: true,
                                    label: "True"
                                }],
                                defaultValue: false,
                                show : function(data) {
                                    return data.ObjId.substring(data.ObjId.indexOf('#:#') + 3) != 'action-button';
                                }                  
                            },
                            IdsFontSingleColor: {
                                ref: "IdsFontSingleColor",
                                label: "Single color",
                                type: "object",  
                                component: "color-picker",  
                                defaultValue: {  
                                    color: '#ffffff'  
                                },
                                show : function(data) {
                                    return data.IdsFontColorBool && data.ObjId.substring(data.ObjId.indexOf('#:#') + 3) != 'action-button';
                                }
                            },
                            IdsImgBool: {
                                ref : "IdsImgBool",
                                type : "boolean",
                                component : "switch",
                                label : "Background image",
                                options: [{
                                    value: false,
                                    label: "No, thanks"
                                }, {
                                    value: true,
                                    label: "Yes, please"
                                }],
                                defaultValue: false,
                                show : function(data) {
                                    return data.ObjId.substring(data.ObjId.indexOf('#:#') + 3) != 'action-button';
                                }                                                 
                            },
                            IdsImgSource: {
                                type: "string",
                                ref: "IdsImgSource",
                                component: "radiobuttons",
                                label: "Image source",
                                options: [
                                  {
                                    value: "url",
                                    label: "Image from Url"
                                  },
                                  {
                                    value: "lib",
                                    label: "Image from library"
                                  }
                                ],
                                defaultValue: "lib",
                                show : function(data) {
                                    return data.IdsImgBool && data.ObjId.substring(data.ObjId.indexOf('#:#') + 3) != 'action-button';
                                }
                            },                                        
                            IdsImgMedia: {
                                label:"Image media",
                                component: "media",
                                ref: "IdsImgMedia",
                                layoutRef: "IdsImgMedia",
                                type: "string",
                                show : function(data) {
                                    return data.IdsImgBool && data.IdsImgSource == 'lib' && data.ObjId.substring(data.ObjId.indexOf('#:#') + 3) != 'action-button';
                                }
                            },
                            IdsImgUrl: {
                                type: "string",
                                ref: "IdsImgUrl",
                                label: "Image url",
                                defaultValue : '',
                                expression : "optional",
                                show : function(data) {
                                    return data.IdsImgBool && data.IdsImgSource == 'url' && data.ObjId.substring(data.ObjId.indexOf('#:#') + 3) != 'action-button';
                                }
                            },
                            IdsImgPosition: {
                                type: "string",
                                component: "align-matrix",
                                icon: !0,
                                horizontal: !0,
                                label: "Position",
                                ref: "idsimgpos",
                                defaultValue: "centerCenter",
                                show : function(data) {
                                    return data.IdsImgBool && data.ObjId.substring(data.ObjId.indexOf('#:#') + 3) != 'action-button';
                                }
                            },
                            IdsImgSize: {
                                ref: "idsimgsize",
                                type: "string",
                                component: "dropdown",
                                label: "Size",
                                options: vImgSize,
                                defaultValue: "cover",
                                show : function(data) {
                                    return data.IdsImgBool && data.ObjId.substring(data.ObjId.indexOf('#:#') + 3) != 'action-button';
                                }
                            },
                            IdsImgSizePerc: {
                                type: "number",
                                component: "slider",
                                label: "Custom percentage %",
                                ref: "idsimgsizeperc",
                                min: 5,
                                max: 100,
                                step: 5,
                                defaultValue: 50,
                                show : function(data) {
                                    return  data.IdsImgBool && data.idsimgsize == 'percentage' && data.ObjId.substring(data.ObjId.indexOf('#:#') + 3) != 'action-button';
                                }                               
                            },
                            //
                            IdsBorderBool: {
                                ref : "idsborderbool",
                                type : "boolean",
                                component : "switch",
                                label : "Set a border",
                                options: [{
                                    value: true,
                                    label: "On"
                                }, {
                                    value: false,
                                    label: "Off"
                                }],
                                defaultValue: false
                            },
                            IdsBorderColor: {
                                ref: "idsbordercolor",
                                label: "Border color",
                                type: "object",  
                                component: "color-picker",  
                                defaultValue: {  
                                    color: "#f2f2f2"  
                                },
                                show : function(data) {
                                    return  data.idsborderbool;
                                }
                            },
                            IdsBorderWidth: {
                                type: "number",
                                component: "slider",
                                label: "Border width",
                                ref: "idsborderwidth",
                                min: 0,
                                max: 10,
                                step: 1,
                                defaultValue: 1,
                                show : function(data) {
                                    return  data.idsborderbool;
                                }                               
                            },
                            IdsBorderRadius: {
                                type: "number",
                                component: "slider",
                                label: "Border radius",
                                ref: "idsborderradius",
                                min: 0,
                                max: 50,
                                step: 5,
                                defaultValue: 0,
                                show : function(data) {
                                    return  data.idsborderbool;
                                }                               
                            },
                            //
                            IdsShadowBool: {
                                ref : "idshadowbool",
                                type : "boolean",
                                component : "switch",
                                label : "Add a shadow",
                                options: [{
                                    value: true,
                                    label: "On"
                                }, {
                                    value: false,
                                    label: "Off"
                                }],
                                defaultValue: false                                
                            },
                            StepIds1: {
                                label: "",
                                component: "text"
                            },
                            IdsEffectBool: {
                                ref : "IdsEffectBool",
                                type : "boolean",
                                component : "switch",
                                label : "Add an effect",
                                options: [{
                                    value: false,
                                    label: "False"
                                }, {
                                    value: true,
                                    label: "True"
                                }],
                                defaultValue: false
                            },
                            IdsEffect: {
                                type: "string",
                                ref: "IdsEffect",
                                component: "radiobuttons",
                                label: "Chose an effect",
                                options: [
                                  {
                                    value: "expand",
                                    label: "Expand right"
                                  },
                                  {
                                    value: "grow",
                                    label: "Expand down"
                                  }
                                ],
                                defaultValue: "expand",
                                show : function(data) {
                                    return data.IdsEffectBool;
                                }
                            },     
                            IdsOverlapHBool: {
                                ref : "IdsOverlapHBool",
                                type : "boolean",
                                component : "switch",
                                label : "Move horizontally",
                                options: [{
                                    value: false,
                                    label: "False"
                                }, {
                                    value: true,
                                    label: "True"
                                }],
                                defaultValue: false
                            },
                            IdsMovingH: {                                
                                type: "number",
                                component: "slider",
                                label: "% displacement",
                                ref: "IdsMovingH",
                                min: 0,
                                max: 100,
                                step: 1,
                                defaultValue: 1,
                                show : function(data) {
                                    return data.IdsOverlapHBool;
                                }
                            },     
                            IdsOverlapVBool: {
                                ref : "IdsOverlapVBool",
                                type : "boolean",
                                component : "switch",
                                label : "Move vertically",
                                options: [{
                                    value: false,
                                    label: "False"
                                }, {
                                    value: true,
                                    label: "True"
                                }],
                                defaultValue: false
                            },
                            IdsMovingV: {                                
                                type: "number",
                                component: "slider",
                                label: "% displacement",
                                ref: "IdsMovingV",
                                min: 0,
                                max: 100,
                                step: 1,
                                defaultValue: 1,
                                show : function(data) {
                                    return data.IdsOverlapVBool;
                                }
                            },
                            IdsZIndex: {                                
                                type: "number",
                                component: "slider",
                                label: "Shape Index",
                                ref: "IdsZIndex",
                                min: 0,
                                max: 3,
                                step: 1,
                                defaultValue: 2,
                                show : function(data) {
                                    return data.IdsOverlapVBool || data.IdsOverlapHBool;
                                }
                            },
                            IdsHPadding: {
                                ref : "IdsHPadding",
                                type : "boolean",
                                component : "switch",
                                label : "Remove H padding",
                                options: [{
                                    value: false,
                                    label: "False"
                                }, {
                                    value: true,
                                    label: "True"
                                }],
                                defaultValue: false
                            },
                            IdsVPadding: {
                                ref : "IdsVPadding",
                                type : "boolean",
                                component : "switch",
                                label : "Remove V padding",
                                options: [{
                                    value: false,
                                    label: "False"
                                }, {
                                    value: true,
                                    label: "True"
                                }],
                                defaultValue: false
                            }
                        }                        
                    },                                   
                    //Final CSS code generated
                    CSS: {
                        component: "items",
                        label: "CSS",
                        items: {
                            CSSManual: {
                                type: "string",
                                ref: "cssmanual",
                                label: "Add some CSS manually",
                                defaultValue : "",
                                expression : "optional"
                            },
                            CSSOutput: {
                                label:"CSS Output",
                                component: "textarea",
                                rows: 20,//the amount of rows in the textarea component (default is 3)
                                maxlength: 10000,//will not allow more than 10000 characters
                                ref: "cssoutput"
                            }
                        }
                    },
                    about: {
                        component: "items",
                        label: "About",
                        items: {
                            header: {
                                label: "BeautifyMe Extension",
                                style: "header",
                                component: "text"
                            },
                            paragraph1: {
                                label: "BeautifyMe extension is deployed to help adding a custom style to your sheets.",
                                component: "text"
                            },
                            paragraph2: {
                                label: "BeautifyMe is an extension created by Ivan Felipe, offered under MIT License.",
                                component: "text"
                            }
                        }
                    }
                }
            }            
        }
    }
});