(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{141:function(e,t,a){"use strict";a.r(t);var l=a(1),n=a.n(l),c=a(6),r=a.n(c),i=(a(83),a(76)),s=a(35),o=a(14),u=a(15),m=a(17),h=a(16),d=a(18),p=(a(84),a(31)),E=(a(139),a(42)),C=(a(140),a(36)),b=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(m.a)(this,Object(h.a)(t).call(this,e))).onInputSelectionChange=function(e){a.setState({selectedOption:e.target.value})},a.onThSliderChange=function(e){a.setState({thSliderValue:e}),a.checkValidSliders("th",e),a.determineCircleColor("thCircleColor",e),a.setTemp(e,"thTemp"),a.updateResult(),a.updateArrowSize(),console.log(a.state.wArrowSize,a.state.qhArrowSize,a.state.qcArrowSize)},a.onTcSliderChange=function(e){a.setState({tcSliderValue:e}),a.checkValidSliders("tc",e),a.determineCircleColor("tcCircleColor",e),a.setTemp(e,"tcTemp"),a.onCalcSubmit(),a.updateArrowSize()},a.determineCircleColor=function(e,t){var l,n,c;t<=12?(l=0,n=0,c=0):t>12&&t<=3061?(l=t/12,n=0,c=0):t>3061&&t<=6100?(l=255,n=t/12-255,c=0):t>6100&&t<=9150?(l=255,n=255,c=t/12-510):t>9150&&t<=1e4&&(l=255,n=255,c=255);var r="rgb(".concat(l,", ").concat(n,", ").concat(c,")");a.setState(Object(s.a)({},e,r))},a.checkValidSliders=function(e,t){"tc"===e?t>=a.state.thSliderValue&&(a.setState({thSliderValue:t+2}),a.determineCircleColor("thCircleColor",t+2)):t<=a.state.tcSliderValue&&(a.setState({tcSliderValue:t-2}),a.determineCircleColor("tcCircleColor",t-2))},a.setTemp=function(e,t){if("K"===a.state.tempType)a.setState(Object(s.a)({},t,e));else if("C"===a.state.tempType){var l=N.toCelsius(e).toFixed(2);a.setState(Object(s.a)({},t,l))}else{var n=N.toFahrenheit(e).toFixed(2);a.setState(Object(s.a)({},t,n))}},a.inputChangeW=function(e){a.setState({W:e.target.value})},a.inputChangeQc=function(e){a.setState({Qc:e.target.value})},a.inputChangeQh=function(e){a.setState({Qh:e.target.value})},a.onCalcSubmit=function(){a.updateResult()},a.updateResult=function(){var e=a.state.selectedOption;if("W"===e){var t=T.calculateE(a.state.tcSliderValue,a.state.thSliderValue),l=T.calcQcFromW(a.state.W,t),n=T.calcQhFromW(l,a.state.W);a.setState({efficiency:"".concat(100*t,"%"),Qc:l,Qh:n})}else if("Qc"===e){var c=T.calculateE(a.state.tcSliderValue,a.state.thSliderValue),r=T.calcWFromQc(a.state.Qc,c),i=T.calcQhFromQc(a.state.Qc,r);a.setState({efficiency:"".concat(100*c,"%"),W:r,Qh:i})}else if("Qh"===e){var s=T.calculateE(a.state.tcSliderValue,a.state.thSliderValue),o=T.calcWFromQh(s,a.state.Qh),u=T.calcQcFromQh(a.state.Qh,o);a.setState({efficiency:"".concat(100*s,"%"),W:o,Qc:u})}},a.onTempSelectionChange=function(e){a.setState({tempType:e.target.value},function(){"C"===a.state.tempType?(a.setTemp(a.state.tcSliderValue,"tcTemp"),a.setTemp(a.state.thSliderValue,"thTemp")):(a.state.tempType,a.setTemp(a.state.tcSliderValue,"tcTemp"),a.setTemp(a.state.thSliderValue,"thTemp"))})},a.ontMaxChange=function(e){a.setState({tMax:e.target.value,thSliderValue:1,tcSliderValue:0},function(){a.updateResult(),a.determineCircleColor("thCircleColor",a.state.thSliderValue),a.determineCircleColor("tcCircleColor",a.state.tcSliderValue)})},a.onUserInputChange=function(){a.setState({userInput:!a.state.userInput})},a.onResetClick=function(){a.setState({Qh:100});var e=T.calculateE(a.state.tcSliderValue,a.state.thSliderValue),t=T.calcWFromQh(e,a.state.Qh),l=T.calcQcFromQh(a.state.Qh,t);a.setState({efficiency:"".concat(100*e,"%"),W:t,Qc:l})},a.updateArrowSize=function(){var e=O.setArrowWidth(O.scaleValue(a.state.Qh,a.state.Qh)),t=O.setArrowWidth(O.scaleValue(a.state.Qc,a.state.Qh)),l=O.setArrowWidth(O.scaleValue(a.state.W,a.state.Qh));a.setState({qhArrowSize:e,qcArrowSize:t,wArrowSize:l})},a.state={selectedOption:"Qh",thSliderValue:1,tcSliderValue:0,tcCircleColor:"rgb(0, 0, 0)",thCircleColor:"rgb(0, 0, 0)",efficiency:"0.00%",Qh:100,Qc:0,W:0,tempType:"K",tcTemp:0,thTemp:0,userInput:!1,tMax:"10000",qhArrowSize:20,qcArrowSize:20,wArrowSize:20,wInput:"",qhInput:"",qcInput:""},a}return Object(d.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){var e=p.a.Handle,t=function(t){var a=t.value,l=t.dragging,c=t.index,r=Object(i.a)(t,["value","dragging","index"]);return n.a.createElement(E.a,{prefixCls:"rc-slider-tooltip",overlay:a,visible:l,placement:"top",key:c},n.a.createElement(e,Object.assign({value:a},r)))};return n.a.createElement("div",{className:"thermocalculatorApp"},n.a.createElement("div",{className:"TempSelection"},n.a.createElement("div",null,n.a.createElement("label",{className:"TempScale"},"Temperature Scale "),n.a.createElement(v,{value:"K",checked:"K"===this.state.tempType,className:"TempRadioButton",onChange:this.onTempSelectionChange}),n.a.createElement("label",{className:"TempLabel"},"Kelvin")),"  ",n.a.createElement("div",null,n.a.createElement(v,{value:"C",checked:"C"===this.state.tempType,className:"TempRadioButton",onChange:this.onTempSelectionChange}),n.a.createElement("label",{className:"TempLabel"},"Celsius"))," ",n.a.createElement("div",null,n.a.createElement(v,{value:"F",checked:"F"===this.state.tempType,className:"TempRadioButton",onChange:this.onTempSelectionChange}),n.a.createElement("label",{className:"TempLabel"},"Fahrenheit"))," ")," ",n.a.createElement("div",{className:"MaxTempSelector"},n.a.createElement("div",null,n.a.createElement(v,{value:"1000",checked:"1000"===this.state.tMax,className:"MaxTempRadioButton",onChange:this.ontMaxChange}),n.a.createElement("label",{className:"tMaxLabel"},"Tmax = 1000 K")),n.a.createElement("div",null,n.a.createElement(v,{value:"10000",checked:"10000"===this.state.tMax,className:"MaxTempRadioButton",onChange:this.ontMaxChange}),n.a.createElement("label",{className:"tMaxLabel"},"Tmax = 10000 K ")))," ",n.a.createElement("div",{className:"userInput"},n.a.createElement(g,{checked:this.state.userInput,onChange:this.onUserInputChange,name:"userInputCheckbox"}),n.a.createElement("label",null,"User Input")),n.a.createElement("div",{className:"Sliders"},"10000"===this.state.tMax&&n.a.createElement("div",{className:"ThSlider10000"},n.a.createElement("label",{className:"Slider-Label"},"Th"),n.a.createElement(p.a,{className:"Slide",min:1,max:1e4,value:this.state.thSliderValue,onChange:this.onThSliderChange,marks:{1:1,1000:1e3,2000:2e3,3000:3e3,4000:4e3,5000:5e3,6000:6e3,7000:7e3,8000:8e3,9000:9e3,10000:1e4},handle:t,step:.01}),n.a.createElement("br",null)," ",n.a.createElement("br",null)," ",n.a.createElement("br",null)),"10000"===this.state.tMax&&n.a.createElement("div",{className:"TcSlider10000"},n.a.createElement("label",{className:"Slider-Label"},"Tc"),n.a.createElement(p.a,{className:"Slide",min:0,max:9999,value:this.state.tcSliderValue,onChange:this.onTcSliderChange,marks:{0:0,1000:1e3,2000:2e3,3000:3e3,4000:4e3,5000:5e3,6000:6e3,7000:7e3,8000:8e3,9000:9e3,9999:9999},handle:t,step:.01}),n.a.createElement("br",null)),"1000"===this.state.tMax&&n.a.createElement("div",{className:"ThSlider1000"},n.a.createElement("label",{className:"Slider-Label"},"Th"),n.a.createElement(p.a,{className:"Slide",min:1,max:1e3,value:this.state.thSliderValue,onChange:this.onThSliderChange,marks:{1:1,100:100,200:200,300:300,400:400,500:500,600:600,700:700,800:800,900:900,1000:1e3},handle:t,step:.01}),n.a.createElement("br",null)," ",n.a.createElement("br",null)," ",n.a.createElement("br",null)),"1000"===this.state.tMax&&n.a.createElement("div",{className:"TcSlider10000"},n.a.createElement("label",{className:"Slider-Label"},"Tc"),n.a.createElement(p.a,{className:"Slide",min:0,max:999,value:this.state.tcSliderValue,onChange:this.onTcSliderChange,marks:{0:0,100:100,200:200,300:300,400:400,500:500,600:600,700:700,800:800,900:900,999:999},handle:t,step:.01}),n.a.createElement("br",null)))," ",this.state.userInput&&n.a.createElement("div",{className:"input"},n.a.createElement("div",{className:"inputSelection"},n.a.createElement("div",{className:"Qh-Selection"},n.a.createElement(v,{value:"Qh",checked:"Qh"===this.state.selectedOption,className:"radio-button",onChange:this.onInputSelectionChange}),n.a.createElement("label",{className:"Input-Labels"},"Qh"),n.a.createElement(f,{className:"input-box",disabled:"Qh"!==this.state.selectedOption,onChange:this.inputChangeQh})),n.a.createElement("div",{className:"Qc-Selection"},n.a.createElement(v,{value:"Qc",className:"radio-button",onChange:this.onInputSelectionChange,checked:"Qc"===this.state.selectedOption}),n.a.createElement("label",null,"Qc"),n.a.createElement(f,{className:"input-box",disabled:"Qc"!==this.state.selectedOption,onChange:this.inputChangeQc})),n.a.createElement("div",{className:"W-Selection"},n.a.createElement(v,{value:"W",className:"radio-button",onChange:this.onInputSelectionChange,checked:"W"===this.state.selectedOption}),n.a.createElement("label",null,"W"),n.a.createElement(f,{className:"input-box",disabled:"W"!==this.state.selectedOption,onChange:this.inputChangeW}),n.a.createElement("div",{className:"Calculate-Button"},n.a.createElement("button",{type:"button",onClick:this.onCalcSubmit,className:"Calculate-Button"},"Calculate")),n.a.createElement("div",{className:"Reset-Button"},n.a.createElement("button",{type:"button",onClick:this.onResetClick,className:"Reset-Button"},"Reset Qh(100 J)"))))),n.a.createElement("div",{className:"diagrams"},n.a.createElement("div",{className:"ThCircle"},n.a.createElement(S,{colorCode:this.state.thCircleColor,circleName:"Th",xPos:50,yPos:55,radius:35}),n.a.createElement("label",{className:"thCircleLabel"},"Hot Source at Th")),n.a.createElement("div",null,n.a.createElement("label",{className:"qhArrowLabel"},"Qh > "),n.a.createElement(C.a,{angle:180,length:10,lineWidth:this.state.qhArrowSize/50,className:"qhArrow"})),n.a.createElement("div",{className:"HeatEngine"},n.a.createElement(y,{fill:"lightgreen",width:80,height:80}),n.a.createElement("label",{className:"HeatEngineLabel"},"Heat Engine")),n.a.createElement("div",null,n.a.createElement("label",{className:"qcArrowLabel"}," Qc > "),n.a.createElement(C.a,{angle:180,length:10,lineWidth:this.state.qcArrowSize/50,className:"qcArrow"})),n.a.createElement("div",{className:"TcCircle"},n.a.createElement(S,{colorCode:this.state.tcCircleColor,circleName:"Tc",xPos:50,yPos:55,radius:35}),n.a.createElement("label",{className:"tcCircleLabel"},"Cold Source at Tc")),n.a.createElement("div",null,n.a.createElement(C.a,{angle:90,length:10,lineWidth:this.state.wArrowSize/50,className:"workArrow"}))),n.a.createElement("div",{className:"ResultsPanel"},n.a.createElement(Q,{efficiency:this.state.efficiency,Qh:this.state.Qh,Qc:this.state.Qc,W:this.state.W,Th:this.state.thTemp,Tc:this.state.tcTemp,tempType:this.state.tempType})))}}]),t}(l.Component),S=function(e){function t(){return Object(o.a)(this,t),Object(m.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){var e=this.props,t=e.colorCode,a=e.circleName,l=void 0===a?"":a,c=e.xPos,r=e.yPos,i=e.radius;return n.a.createElement("svg",null,n.a.createElement("circle",{cx:c,cy:r,r:i,fill:t,className:l}))}}]),t}(l.Component),v=function(e){function t(){return Object(o.a)(this,t),Object(m.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){var e=this.props,t=e.type,a=void 0===t?"radio":t,l=e.value,c=e.checked,r=e.name,i=void 0===r?"":r,s=e.onChange;return n.a.createElement("input",{type:a,name:i,value:l,checked:c,onChange:s})}}]),t}(l.Component),f=function(e){function t(){return Object(o.a)(this,t),Object(m.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){var e=this.props,t=e.type,a=void 0===t?"text":t,l=e.className,c=e.disabled,r=e.onChange;return n.a.createElement("input",{type:a,className:l,disabled:c,onChange:r})}}]),t}(l.Component),g=function(e){function t(){return Object(o.a)(this,t),Object(m.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){var e=this.props,t=e.type,a=void 0===t?"checkbox":t,l=e.checked,c=e.name,r=void 0===c?"":c,i=e.onChange;return n.a.createElement("input",{type:a,name:r,checked:l,onChange:i})}}]),t}(l.Component),T={calculateE:function(e,t){return(1-e/t).toFixed(2)},calcWFromQc:function(e,t){return(e*(t/(1-t))).toFixed(2)},calcQhFromQc:function(e,t){return parseFloat(e+t).toFixed(2)},calcQcFromW:function(e,t){return(e/((1-t)/t)).toFixed(2)},calcQhFromW:function(e,t){return(e+t).toFixed(2)},calcWFromQh:function(e,t){return(e*t).toFixed(2)},calcQcFromQh:function(e,t){return(e-t).toFixed(2)}},Q=function(e){function t(){return Object(o.a)(this,t),Object(m.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){var e=this.props,t=e.efficiency,a=e.Qh,l=e.Qc,c=e.W,r=e.Th,i=e.Tc,s=e.tempType;return n.a.createElement("table",{className:"ResultsTable"},n.a.createElement("thead",null,n.a.createElement("tr",null,n.a.createElement("th",null,"Results:"))),n.a.createElement("tbody",null,n.a.createElement("tr",null,n.a.createElement("td",null,"Efficiency:"),n.a.createElement("td",null,t)),n.a.createElement("tr",null,n.a.createElement("td",null,"Qh:"),n.a.createElement("td",null,a," J")),n.a.createElement("tr",null,n.a.createElement("td",null,"Qc:"),n.a.createElement("td",null,l," J")),n.a.createElement("tr",null,n.a.createElement("td",null,"w: "),n.a.createElement("td",null,c," J")),n.a.createElement("tr",null,n.a.createElement("td",null,"Th: "),n.a.createElement("td",null,r," ",s)),n.a.createElement("tr",null,n.a.createElement("td",null,"Tc: "),n.a.createElement("td",null,i," ",s))))}}]),t}(l.Component),N={toCelsius:function(e){return e-273.15},toFahrenheit:function(e){return 1.8*(e-273.15)+32}},y=function(e){function t(){return Object(o.a)(this,t),Object(m.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){var e=this.props,t=e.className,a=e.fill,l=e.width,c=e.height,r=e.transform;return n.a.createElement("svg",null,n.a.createElement("rect",{width:l,height:c,fill:a,className:t,transform:r}))}}]),t}(l.Component),O={scaleValue:function(e,t){return 100*e/t},setArrowWidth:function(e){return e>10?2*(e/2/2):e<10&&e>0?5:0}},w=(l.Component,b);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(n.a.createElement(w,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},77:function(e,t,a){e.exports=a(141)},83:function(e,t,a){},84:function(e,t,a){}},[[77,1,2]]]);
//# sourceMappingURL=main.4710e7d5.chunk.js.map