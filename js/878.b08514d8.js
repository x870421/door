(self["webpackChunkh990"]=self["webpackChunkh990"]||[]).push([[878],{4392:function(e){!function(t,d){e.exports=d()}(0,(function(){"use strict";return function(e,t,d){t.prototype.isBetween=function(e,t,a,i){var n=d(e),r=d(t),s="("===(i=i||"()")[0],c=")"===i[1];return(s?this.isAfter(n,a):!this.isBefore(n,a))&&(c?this.isBefore(r,a):!this.isAfter(r,a))||(s?this.isBefore(n,a):!this.isAfter(n,a))&&(c?this.isAfter(r,a):!this.isBefore(r,a))}}}))},9878:function(e,t,d){"use strict";d.r(t),d.d(t,{default:function(){return B}});var a=d(3396),i=d(7139);const n={class:"p-sm-4 p-2"},r={class:"table-page-search-submitButtons",style:{float:"right",overflow:"hidden"}},s=(0,a._)("br",null,null,-1),c=(0,a.Uk)(" 匯出excel "),o={key:0,class:"ps-2"};function _(e,t,d,_,l,u){const m=(0,a.up)("a-range-picker"),p=(0,a.up)("a-form-item"),v=(0,a.up)("a-col"),h=(0,a.up)("a-input"),f=(0,a.up)("a-select-option"),A=(0,a.up)("a-select-opt-group"),x=(0,a.up)("a-select"),g=(0,a.up)("a-button"),E=(0,a.up)("a-row"),y=(0,a.up)("a-form"),w=(0,a.up)("a-table-column"),j=(0,a.up)("user-outlined"),b=(0,a.up)("a-table"),k=(0,a.up)("a-spin"),R=(0,a.up)("a-card"),O=(0,a.up)("FacePic");return(0,a.wg)(),(0,a.iD)("div",n,[(0,a.Wm)(R,null,{default:(0,a.w5)((()=>[(0,a.Wm)(y,{model:l.search,class:"ant-advanced-search-form"},{default:(0,a.w5)((()=>[(0,a.Wm)(E,{gutter:24},{default:(0,a.w5)((()=>[(0,a.Wm)(v,{lg:8,md:12,sm:24,xs:24},{default:(0,a.w5)((()=>[(0,a.Wm)(p,{label:e.$t("startAndEndTime")},{default:(0,a.w5)((()=>[(0,a.Wm)(m,{class:"w-100",ranges:l.ranges,value:l.search["date-picker"],"onUpdate:value":t[0]||(t[0]=e=>l.search["date-picker"]=e)},null,8,["ranges","value"])])),_:1},8,["label"])])),_:1}),(0,a.Wm)(v,{lg:8,md:12,sm:24,xs:24},{default:(0,a.w5)((()=>[(0,a.Wm)(p,{label:e.$t("cardID")},{default:(0,a.w5)((()=>[(0,a.Wm)(h,{value:l.search.card_id,"onUpdate:value":t[1]||(t[1]=e=>l.search.card_id=e),placeholder:e.$t("cardIDFeedBack")},null,8,["value","placeholder"])])),_:1},8,["label"])])),_:1}),(0,a.Wm)(v,{lg:8,md:12,sm:24,xs:24},{default:(0,a.w5)((()=>[(0,a.Wm)(p,{label:e.$t("name")},{default:(0,a.w5)((()=>[(0,a.Wm)(h,{value:l.search.username,"onUpdate:value":t[2]||(t[2]=e=>l.search.username=e),placeholder:e.$t("nameFeedBack")},null,8,["value","placeholder"])])),_:1},8,["label"])])),_:1}),(0,a.Wm)(v,{lg:8,md:12,sm:24,xs:24},{default:(0,a.w5)((()=>[(0,a.Wm)(p,{label:e.$t("event")},{default:(0,a.w5)((()=>[(0,a.Wm)(x,{"option-label-prop":"children",allowClear:"","label-in-value":"","show-search":"",value:l.search.event_code,"onUpdate:value":t[3]||(t[3]=e=>l.search.event_code=e),placeholder:e.$t("eventFeedBack"),class:"w-100"},{default:(0,a.w5)((()=>[(0,a.Wm)(A,{label:e.$t("cardEvent")},{default:(0,a.w5)((()=>[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(l.cardType,((t,d)=>((0,a.wg)(),(0,a.j4)(f,{key:d,value:e.$t(t)},{default:(0,a.w5)((()=>[(0,a.Uk)((0,i.zw)(e.$t(t)),1)])),_:2},1032,["value"])))),128))])),_:1},8,["label"]),(0,a.Wm)(A,{label:e.$t("hardwareEvent")},{default:(0,a.w5)((()=>[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(l.eventType,((t,d)=>((0,a.wg)(),(0,a.j4)(f,{key:d,value:e.$t(t)},{default:(0,a.w5)((()=>[(0,a.Uk)((0,i.zw)(e.$t(t)),1)])),_:2},1032,["value"])))),128))])),_:1},8,["label"])])),_:1},8,["value","placeholder"])])),_:1},8,["label"])])),_:1}),(0,a.Wm)(v,{lg:16,md:24,sm:24,xs:24},{default:(0,a.w5)((()=>[(0,a._)("span",r,[(0,a.Wm)(g,{onClick:u.searchData,type:"primary"},{default:(0,a.w5)((()=>[(0,a.Uk)((0,i.zw)(e.$t("search")),1)])),_:1},8,["onClick"]),(0,a.Wm)(g,{style:{"margin-left":"8px"},onClick:u.resetData},{default:(0,a.w5)((()=>[(0,a.Uk)((0,i.zw)(e.$t("reset")),1)])),_:1},8,["onClick"])])])),_:1})])),_:1})])),_:1},8,["model"]),s,(0,a.Wm)(g,{onClick:u.exportCSV,title:e.$t("add"),type:"primary"},{default:(0,a.w5)((()=>[c])),_:1},8,["onClick","title"]),(0,a.Wm)(k,{spinning:l.spinning,tip:"Loading..."},{default:(0,a.w5)((()=>[(0,a.Wm)(b,{id:"table",class:"mt-2",size:"small","data-source":l.renderData,pagination:{size:"middle","show-quick-jumper":!0,defaultPageSize:20,position:["bottomLeft"],pageSizeOptions:["10","20","30","40"]}},{bodyCell:(0,a.w5)((({column:t,record:d})=>[t&&"event_time"===t.key?((0,a.wg)(),(0,a.iD)("div",o,(0,i.zw)(u.dayjs(d.event_time).format("YYYY-MM-DD HH:mm:ss")),1)):t&&"event_class_name"===t.key?((0,a.wg)(),(0,a.iD)(a.HY,{key:1},[(0,a.Uk)((0,i.zw)(e.$t(d.event_class_name)),1)],64)):t&&"event_code_name"===t.key?((0,a.wg)(),(0,a.iD)(a.HY,{key:2},[(0,a.Uk)((0,i.zw)(e.$t(d.event_code_name)),1)],64)):t&&"action"===t.key?((0,a.wg)(),(0,a.j4)(g,{key:3,title:d.avatar_url,type:"text",onClick:e=>u.openPic(d)},{icon:(0,a.w5)((()=>[(0,a.Wm)(j)])),_:2},1032,["title","onClick"])):(0,a.kq)("",!0)])),default:(0,a.w5)((()=>[(0,a.Wm)(w,{class:"ps-4 table-bg-primary",key:"event_time",title:e.$t("date"),"data-index":"event_time",sorter:(e,t)=>u.dayjs(e.event_time,"YYYY/MM/DD")-u.dayjs(t.event_time,"YYYY/MM/DD")},null,8,["title","sorter"]),(0,a.Wm)(w,{class:"table-bg-primary",key:"card_id",title:e.$t("cardID"),"data-index":"card_id",ellipsis:!0,responsive:["md"]},null,8,["title"]),(0,a.Wm)(w,{class:"table-bg-primary",key:"username",title:e.$t("name"),"data-index":"username",ellipsis:!0},null,8,["title"]),(0,a.Wm)(w,{class:"table-bg-primary",key:"shift_code_name",title:e.$t("shift"),"data-index":"shift_code_name",ellipsis:!0,responsive:["md"],filters:[{text:"上班",value:"1"},{text:"下班",value:"2"},{text:"外出",value:"3"},{text:"返回",value:"4"},{text:"加班開始",value:"5"},{text:"加班結束",value:"6"}],onFilter:(e,t)=>t.shift_code===e},null,8,["title","onFilter"]),(0,a.Wm)(w,{class:"table-bg-primary text-nowrap",key:"event_class_name",title:e.$t("eventClass"),width:"7.5rem","data-index":"event_class_name",responsive:["lg"]},null,8,["title","width"]),(0,a.Wm)(w,{class:"table-bg-primary text-nowrap",key:"event_code_name",title:e.$t("event"),width:"25%","data-index":"event_code_name"},null,8,["title"]),(0,a.Wm)(w,{width:"5rem",class:"table-bg-primary",key:"action",title:e.$t("photo"),"data-index":"action"},null,8,["title"])])),_:1},8,["data-source"])])),_:1},8,["spinning"])])),_:1}),(0,a.Wm)(O,{temp:l.temp,modal:l.modal},null,8,["temp","modal"])])}d(7658);const l=["alt","src"];function u(e,t,i,n,r,s){const c=(0,a.up)("a-modal");return(0,a.wg)(),(0,a.iD)("div",null,[(0,a.Wm)(c,{visible:r.showModal.visible,title:r.tempObj.username,footer:null,onCancel:s.handleCancel},{default:(0,a.w5)((()=>[(0,a._)("img",{alt:r.tempObj.avatar_url,style:{width:"100%"},src:d(990)("./"+r.tempObj.avatar_url)},null,8,l)])),_:1},8,["visible","title","onCancel"])])}var m={props:["modal","temp"],data(){return{showModal:{},tempObj:{}}},watch:{modal:{handler(){this.showModal=this.modal},deep:!0,immediate:!0},temp(e){this.tempObj=e}},methods:{handleCancel(){this.showModal.visible=!1}}},p=d(89);const v=(0,p.Z)(m,[["render",u]]);var h=v,f={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M858.5 763.6a374 374 0 00-80.6-119.5 375.63 375.63 0 00-119.5-80.6c-.4-.2-.8-.3-1.2-.5C719.5 518 760 444.7 760 362c0-137-111-248-248-248S264 225 264 362c0 82.7 40.5 156 102.8 201.1-.4.2-.8.3-1.2.5-44.8 18.9-85 46-119.5 80.6a375.63 375.63 0 00-80.6 119.5A371.7 371.7 0 00136 901.8a8 8 0 008 8.2h60c4.4 0 7.9-3.5 8-7.8 2-77.2 33-149.5 87.8-204.3 56.7-56.7 132-87.9 212.2-87.9s155.5 31.2 212.2 87.9C779 752.7 810 825 812 902.2c.1 4.4 3.6 7.8 8 7.8h60a8 8 0 008-8.2c-1-47.8-10.9-94.3-29.5-138.2zM512 534c-45.9 0-89.1-17.9-121.6-50.4S340 407.9 340 362c0-45.9 17.9-89.1 50.4-121.6S466.1 190 512 190s89.1 17.9 121.6 50.4S684 316.1 684 362c0 45.9-17.9 89.1-50.4 121.6S557.9 534 512 534z"}}]},name:"user",theme:"outlined"},A=f,x=d(9388);function g(e){for(var t=1;t<arguments.length;t++){var d=null!=arguments[t]?Object(arguments[t]):{},a=Object.keys(d);"function"===typeof Object.getOwnPropertySymbols&&(a=a.concat(Object.getOwnPropertySymbols(d).filter((function(e){return Object.getOwnPropertyDescriptor(d,e).enumerable})))),a.forEach((function(t){E(e,t,d[t])}))}return e}function E(e,t,d){return t in e?Object.defineProperty(e,t,{value:d,enumerable:!0,configurable:!0,writable:!0}):e[t]=d,e}var y=function(e,t){var d=g({},e,t.attrs);return(0,a.Wm)(x.Z,g({},d,{icon:A}),null)};y.displayName="UserOutlined",y.inheritAttrs=!1;var w=y,j=d(5743),b=d.n(j),k=(d(5874),d(4392)),R=d.n(k),O={components:{UserOutlined:w,FacePic:h},data(){return{cardType:{"0x01":"合法卡","0x02":"密碼錯誤","0x03":"需要密碼時，必需為刷卡,不能用擊鍵卡號","0x04":"許可權不合","0x05":"假日許可權不合","0x06":"卡片時效已過","0x07":"無此卡號","0x08":"群組卡比對成功開門","0x09":"群組卡比對成功不開門","0xa":"考勤卡","0xb":"黑名單發警報","0xc":"解除警報","0xd":"第一張主卡或副卡或雙重卡","0xe":"輸入代碼錯誤","0xf":"刷卡加代碼不開門","0x10":"巡邏卡開門","0x11":"巡邏卡不開門","0x12":"巡邏卡許可權不符，不開門","0x13":"連動代碼卡","0x14":"刷卡加代碼許可權不符，不開門","0x15":"黑名單","0x16":"在常開時區刷卡","0x17":"anti比對失敗","0x18":"無任何卡號開門","0x19":"保全卡設定","0x1a":"保全卡解除","0x1b":"設定保全時迴路異常，則無法設定","0x1d":"錯誤超過次數，發警報","0x1e":"解除警報","0x20":"進入設定模式(母卡)","0x21":"指紋比對通過","0x22":"指紋比對失敗","0x30":"解除卡","0x31":"脅迫卡","0x32":"違反多門互鎖規則","0x33":"群組卡規則錯誤","0x34":"群組卡規則正確，但暫開門","0x35":"群組卡規則正確，並合法開門","0x36":"群組卡超級密碼正確","0x37":"群組卡超級密碼錯誤"},eventType:{"0101":"初始化成功","0102":"重新啟動","0103":"裝置離線/重新連線事件","012a":"求救事件","0201":"管理碼通過","0202":"脅迫碼通過","0203":"解除碼通過","0204":"多門互鎖規則事件","0205":"群組卡規則事件","0206":"持續開門狀態開始","0301":"Sensor 事件","0302":"Relay 事件","0401":"門被外力開啟","0402":"門未關妥狀態發生","0403":"防拆偵測觸動","0404":"門磁動作","0405":"門磁復歸/門未關妥狀態解除","0406":"開門","0407":"關門","0408":"開門按鈕觸動","0501":"佈撤防事件","0502":"時間內未佈防事件"},search:{},renderData:[],loggers:[{avatar_url:"dummy3.jpg",card_id:"5073374112063",door_id:1,event_class:1,event_code:"03010101",event_time:"2022-03-05T06:45:31.151164",id:1,index_pointer:200,input_mode:0,is_fatched:0,person_id:"0496126852386",reader_id:2,shift_code:"4",username:"鞏宗翰"},{avatar_url:"dummy1.jpg",card_id:"4260086275457",door_id:1,event_class:0,event_code:"0x34",event_time:"2021-11-21T06:45:31.161071",id:2,index_pointer:null,input_mode:1,is_fatched:0,person_id:"9240346421256",reader_id:4,shift_code:"2",username:"陳雅筑"},{avatar_url:"dummy1.jpg",card_id:"7080763352212",door_id:1,event_class:1,event_code:"01030000",event_time:"2021-10-01T06:45:31.162283",id:3,index_pointer:null,input_mode:1,is_fatched:0,person_id:"0717202637773",reader_id:3,shift_code:"6",username:"黃郁雯"},{avatar_url:"dummy3.jpg",card_id:"6282060700470",door_id:1,event_class:1,event_code:"02040000",event_time:"2021-01-15T06:45:31.162911",id:4,index_pointer:null,input_mode:1,is_fatched:0,person_id:"7874979522039",reader_id:4,shift_code:"1",username:"李雅慧"},{avatar_url:"dummy3.jpg",card_id:"5179031160504",door_id:1,event_class:1,event_code:"04020000",event_time:"2020-09-25T06:45:31.163612",id:5,index_pointer:null,input_mode:1,is_fatched:0,person_id:"3230744151288",reader_id:1,shift_code:"5",username:"孫佩珊"},{avatar_url:"dummy1.jpg",card_id:"6636711846398",door_id:1,event_class:0,event_code:"0x22",event_time:"2022-05-02T06:45:31.164327",id:6,index_pointer:null,input_mode:0,is_fatched:0,person_id:"2965731468155",reader_id:3,shift_code:"5",username:"王怡君"},{avatar_url:"dummy3.jpg",card_id:"0138589512161",door_id:1,event_class:1,event_code:"04080000",event_time:"2022-05-02T06:45:31.164953",id:7,index_pointer:null,input_mode:0,is_fatched:0,person_id:"7672964755215",reader_id:5,shift_code:"3",username:"吳俊賢"},{avatar_url:"dummy1.jpg",card_id:"9109500297475",door_id:1,event_class:1,event_code:"012A0000",event_time:"2021-10-30T06:45:31.165579",id:8,index_pointer:null,input_mode:1,is_fatched:0,person_id:"7530416960801",reader_id:1,shift_code:"1",username:"韓怡婷"},{avatar_url:"dummy2.jpg",card_id:"2040424459891",door_id:1,event_class:1,event_code:"01020000",event_time:"2021-04-06T06:45:31.166203",id:9,index_pointer:null,input_mode:1,is_fatched:0,person_id:"4180373733371",reader_id:5,shift_code:"5",username:"茹傑克"},{avatar_url:"dummy2.jpg",card_id:"3318777206523",door_id:1,event_class:0,event_code:"0x1a",event_time:"2021-03-07T06:45:31.166829",id:10,index_pointer:null,input_mode:1,is_fatched:0,person_id:"0093016531446",reader_id:4,shift_code:"1",username:"黃雅惠"},{avatar_url:"dummy3.jpg",card_id:"1775602299150",door_id:1,event_class:1,event_code:"02010000",event_time:"2022-08-12T06:45:31.167458",id:11,index_pointer:null,input_mode:1,is_fatched:0,person_id:"3459775878388",reader_id:2,shift_code:"3",username:"謝懿"},{avatar_url:"dummy3.jpg",card_id:"2916414139855",door_id:1,event_class:1,event_code:"04030000",event_time:"2020-06-13T06:45:31.168084",id:12,index_pointer:null,input_mode:1,is_fatched:0,person_id:"0866137336739",reader_id:3,shift_code:"5",username:"馬琬婷"},{avatar_url:"dummy1.jpg",card_id:"4185218461044",door_id:1,event_class:0,event_code:"0x22",event_time:"2022-03-13T06:45:31.168706",id:13,index_pointer:null,input_mode:1,is_fatched:0,person_id:"9561015662283",reader_id:2,shift_code:"3",username:"黃婉婷"},{avatar_url:"dummy2.jpg",card_id:"4843889065922",door_id:1,event_class:1,event_code:"03010000",event_time:"2021-08-16T06:45:31.169414",id:14,index_pointer:null,input_mode:1,is_fatched:0,person_id:"5143098787202",reader_id:4,shift_code:"3",username:"全建宏"},{avatar_url:"dummy3.jpg",card_id:"2267814667579",door_id:1,event_class:0,event_code:"0x07",event_time:"2022-11-10T06:45:31.170037",id:15,index_pointer:null,input_mode:1,is_fatched:0,person_id:"2240343225151",reader_id:3,shift_code:"3",username:"蘇婉婷"},{avatar_url:"dummy3.jpg",card_id:"9729206175619",door_id:1,event_class:1,event_code:"04020000",event_time:"2022-02-09T06:45:31.170696",id:16,index_pointer:null,input_mode:1,is_fatched:0,person_id:"8220911440340",reader_id:5,shift_code:"2",username:"侯嘉玲"},{avatar_url:"dummy2.jpg",card_id:"5732880726590",door_id:1,event_class:1,event_code:"02050000",event_time:"2022-01-12T06:45:31.171320",id:17,index_pointer:null,input_mode:1,is_fatched:0,person_id:"2058298065117",reader_id:5,shift_code:"3",username:"何冠廷"},{avatar_url:"dummy3.jpg",card_id:"9223917405701",door_id:1,event_class:0,event_code:"0x10",event_time:"2021-01-30T06:45:31.171943",id:18,index_pointer:null,input_mode:1,is_fatched:0,person_id:"2032249788454",reader_id:3,shift_code:"4",username:"張淑芬"},{avatar_url:"dummy3.jpg",card_id:"9223917405701",door_id:1,event_class:1,event_code:"04070000",event_time:"2020-04-16T06:45:31.172051",id:19,index_pointer:null,input_mode:1,is_fatched:0,person_id:"2032249788454",reader_id:1,shift_code:"3",username:"張淑芬"},{avatar_url:"dummy1.jpg",card_id:"2539125588264",door_id:1,event_class:0,event_code:"0x34",event_time:"2021-11-08T06:45:31.172730",id:20,index_pointer:null,input_mode:1,is_fatched:0,person_id:"7904363701266",reader_id:2,shift_code:"1",username:"賓雅琪"},{avatar_url:"dummy2.jpg",card_id:"6772637300931",door_id:1,event_class:1,event_code:"02030000",event_time:"2022-05-16T06:45:31.173354",id:21,index_pointer:null,input_mode:1,is_fatched:0,person_id:"0858436650272",reader_id:3,shift_code:"6",username:"李惠雯"},{avatar_url:"dummy3.jpg",card_id:"4843889065922",door_id:1,event_class:1,event_code:"01020000",event_time:"2021-07-26T06:45:31.173977",id:22,index_pointer:null,input_mode:1,is_fatched:0,person_id:"5143098787202",reader_id:1,shift_code:"5",username:"全建宏"},{avatar_url:"dummy2.jpg",card_id:"4336378978457",door_id:1,event_class:1,event_code:"01010000",event_time:"2020-11-10T06:45:31.174601",id:23,index_pointer:null,input_mode:1,is_fatched:0,person_id:"3556905039524",reader_id:1,shift_code:"3",username:"鄒怡安"},{avatar_url:"dummy3.jpg",card_id:"9378651515800",door_id:1,event_class:1,event_code:"02020000",event_time:"2022-08-23T06:45:31.175225",id:24,index_pointer:null,input_mode:1,is_fatched:0,person_id:"4521255086268",reader_id:1,shift_code:"6",username:"劉哲瑋"},{avatar_url:"dummy1.jpg",card_id:"2355680262827",door_id:1,event_class:0,event_code:"0x16",event_time:"2022-01-30T06:45:31.175847",id:25,index_pointer:null,input_mode:1,is_fatched:0,person_id:"0471264595241",reader_id:3,shift_code:"4",username:"仝彥廷"},{avatar_url:"dummy3.jpg",card_id:"2723417085160",door_id:1,event_class:1,event_code:"01020000",event_time:"2020-08-11T06:45:31.176548",id:26,index_pointer:null,input_mode:1,is_fatched:0,person_id:"8676225632405",reader_id:2,shift_code:"1",username:"楊郁婷"},{avatar_url:"dummy1.jpg",card_id:"2723417085160",door_id:1,event_class:0,event_code:"0x08",event_time:"2021-03-02T06:45:31.176659",id:27,index_pointer:null,input_mode:1,is_fatched:0,person_id:"8676225632405",reader_id:5,shift_code:"4",username:"楊郁婷"},{avatar_url:"dummy2.jpg",card_id:"4687784695057",door_id:1,event_class:1,event_code:"01030000",event_time:"2022-03-06T06:45:31.177340",id:28,index_pointer:null,input_mode:1,is_fatched:0,person_id:"7032270418370",reader_id:4,shift_code:"4",username:"李中山"},{avatar_url:"dummy2.jpg",card_id:"9275888907173",door_id:1,event_class:1,event_code:"05020000",event_time:"2021-04-26T06:45:31.177965",id:29,index_pointer:null,input_mode:1,is_fatched:0,person_id:"7688164371520",reader_id:5,shift_code:"6",username:"曾宜庭"},{avatar_url:"dummy1.jpg",card_id:"3992987896813",door_id:1,event_class:1,event_code:"02040000",event_time:"2021-11-06T06:45:31.178588",id:30,index_pointer:null,input_mode:1,is_fatched:0,person_id:"8519564917850",reader_id:5,shift_code:"6",username:"韓家銘"},{avatar_url:"dummy2.jpg",card_id:"9109500297475",door_id:1,event_class:0,event_code:"0x34",event_time:"2022-01-23T06:45:31.179212",id:31,index_pointer:null,input_mode:1,is_fatched:0,person_id:"7530416960801",reader_id:2,shift_code:"2",username:"韓怡婷"},{avatar_url:"dummy1.jpg",card_id:"2355680262827",door_id:1,event_class:0,event_code:"0x16",event_time:"2022-01-06T06:45:31.179902",id:32,index_pointer:null,input_mode:1,is_fatched:0,person_id:"0471264595241",reader_id:4,shift_code:"5",username:"仝彥廷"},{avatar_url:"dummy1.jpg",card_id:"4572780816479",door_id:1,event_class:1,event_code:"04060000",event_time:"2022-08-26T06:45:31.180529",id:33,index_pointer:null,input_mode:1,is_fatched:0,person_id:"4386556033133",reader_id:2,shift_code:"4",username:"雷鈺婷"},{avatar_url:"dummy3.jpg",card_id:"3340572105251",door_id:1,event_class:0,event_code:"0x01",event_time:"2020-09-22T06:45:31.181193",id:34,index_pointer:null,input_mode:1,is_fatched:0,person_id:"9212264801694",reader_id:3,shift_code:"6",username:"羅俊賢"},{avatar_url:"dummy2.jpg",card_id:"0613617479598",door_id:1,event_class:1,event_code:"04070000",event_time:"2021-02-05T06:45:31.181817",id:35,index_pointer:null,input_mode:1,is_fatched:0,person_id:"4613316129103",reader_id:2,shift_code:"1",username:"童佳玲"},{avatar_url:"dummy3.jpg",card_id:"4648052796739",door_id:1,event_class:0,event_code:"0x16",event_time:"2020-06-27T06:45:31.182440",id:36,index_pointer:null,input_mode:1,is_fatched:0,person_id:"1527872297837",reader_id:3,shift_code:"6",username:"覃怡君"},{avatar_url:"dummy3.jpg",card_id:"0469553026842",door_id:1,event_class:1,event_code:"02060000",event_time:"2022-10-27T06:45:31.183065",id:37,index_pointer:null,input_mode:0,is_fatched:0,person_id:"4652947407310",reader_id:5,shift_code:"3",username:"張佩君"},{avatar_url:"dummy2.jpg",card_id:"5452750479158",door_id:1,event_class:1,event_code:"01020000",event_time:"2021-03-09T06:45:31.183687",id:38,index_pointer:null,input_mode:1,is_fatched:0,person_id:"2878561460001",reader_id:2,shift_code:"5",username:"陳婷婷"},{avatar_url:"dummy3.jpg",card_id:"6636711846398",door_id:1,event_class:1,event_code:"02060000",event_time:"2021-11-27T06:45:31.184338",id:39,index_pointer:null,input_mode:1,is_fatched:0,person_id:"2965731468155",reader_id:5,shift_code:"2",username:"王怡君"},{avatar_url:"dummy3.jpg",card_id:"4336378978457",door_id:1,event_class:0,event_code:"0x01",event_time:"2022-07-27T06:45:31.184970",id:40,index_pointer:null,input_mode:1,is_fatched:0,person_id:"3556905039524",reader_id:2,shift_code:"6",username:"鄒怡安"}],ranges:{},modal:{visible:!1},temp:{},spinning:!1}},watch:{"$i18n.locale":{handler(e){switch(e){case"en":this.ranges={Today:[b()(),b()()],"This Week":[b()().startOf("week"),b()().endOf("week")],"This Month":[b()().startOf("month"),b()().endOf("month")],"This Year":[b()().startOf("year"),b()().endOf("year")]};break;case"zh-TW":this.ranges={"當日":[b()(),b()()],"當周":[b()().startOf("week"),b()().endOf("week")],"當月":[b()().startOf("month"),b()().endOf("month")],"當年":[b()().startOf("year"),b()().endOf("year")]};break}},immediate:!0}},methods:{dayjs:b(),resetData(){this.search={card_id:"",username:"",start:"",end:"",event_code:null},this.getData()},exportCSV(){let e=[];const t=[];this.loggers.forEach(((d,a)=>{0===a&&(e=Object.keys(d),t.push(e.join(",")));const i=[];e.forEach((e=>{i.push(d[e])})),t.push(i.join(","))}));const d=t.join("\r\n"),a=document.createElement("a"),i=encodeURIComponent(d);a.href="data:application/csv;charset=utf-8,%EF%BB%BF"+i,a.setAttribute("download","data.csv"),a.setAttribute("hidden",!0),a.click()},openPic(e){this.modal.visible=!0,this.temp=e},searchData(){if(this.renderData=this.loggers.filter((e=>e.card_id.match(this.search.card_id)&&e.username.match(this.search.username))),this.search.event_code&&(this.renderData=this.renderData.filter((e=>e.event_code.slice(0,4).trim()===this.search.event_code.key))),this.search["date-picker"]){b().extend(R());const e=this.search["date-picker"][0],t=this.search["date-picker"][1];this.renderData=this.renderData.filter((d=>b()(d.event_time).isBetween(b()(e),b()(t),null,"[]")))}},getData(){this.loggers.forEach((e=>{switch(e.event_code_name=this.cardType[e.event_code.slice(0,4).trim()]||this.eventType[e.event_code.slice(0,4).trim()]||"",e.event_class_name=0===e.event_class?"cardEvent":1===e.event_class?"hardwareEvent":e.event_class,e.shift_code){case"1":e.shift_code_name="上班";break;case"2":e.shift_code_name="下班";break;case"3":e.shift_code_name="外出";break;case"4":e.shift_code_name="返回";break;case"5":e.shift_code_name="加班開始";break;case"6":e.shift_code_name="加班結束";break}})),this.renderData=JSON.parse(JSON.stringify(this.loggers))}},created(){this.getData()}};const Q=(0,p.Z)(O,[["render",_]]);var B=Q},990:function(e,t,d){var a={"./dummy1.jpg":9350,"./dummy2.jpg":2067,"./dummy3.jpg":5198};function i(e){var t=n(e);return d(t)}function n(e){if(!d.o(a,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return a[e]}i.keys=function(){return Object.keys(a)},i.resolve=n,e.exports=i,i.id=990},9350:function(e,t,d){"use strict";e.exports=d.p+"img/dummy1.34a630c8.jpg"},2067:function(e,t,d){"use strict";e.exports=d.p+"img/dummy2.f2c10d4a.jpg"},5198:function(e){"use strict";e.exports="data:image/jpeg;base64,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"}}]);