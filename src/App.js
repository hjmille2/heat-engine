// this makes circles

//0.3 adds in buttons
//0.4 add textboxes to the buttons and style with css
//0.5 adds a calculate button and an object containing all of the calculations, also adds sliders
//0.6 use slider input to select color of the circles, formats the circles on the page
//0.7 add limits to the sliders where tc cannot be higher than tc
//0.8 adds in the calculations and results and some formatting -- not necessarily correct
//0.9 adds in the choice to select which temperature system changed (resets slider to 0) the results panel to be formatted with a table
//0.10 adds tmax buttons and switching sliders and user input box
//0.11 adds reset button, when tempType changed, temperatures are converted
//0.12 adds in a heat engine and arrows
//0.13 adds in the arrows changing size



//must use npm rc-slider and rc-tooltip if copying this file to a new file
import React, {Component} from 'react';
import './App.css';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap.css';
//import Poly from "react-svg-polygon";
import Arrow from "@elsdoerfer/react-arrow";




class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedOption: "Qh",
      thSliderValue : 1,
      tcSliderValue : 0,
      tcCircleColor : "rgb(0, 0, 0)",
      thCircleColor : "rgb(0, 0, 0)",
      efficiency:"0.00%",
      Qh:100,
      Qc:0,
      W:0,
      tempType:"K",
      tcTemp:0,
      thTemp:0,
      userInput:false,
      tMax:"10000",
      qhArrowSize:20,
      qcArrowSize:20,
      wArrowSize:20,
      wInput:"",
      qhInput:"",
      qcInput:"",
    };
  }

  //changes the state when a new radio button to change the input is selected
  onInputSelectionChange = (event) => {
    this.setState({selectedOption:event.target.value});
  };

  //updates the state with the new th slider value
  //makes sure the slider input is valid
  //determines the color of the circle and coverts the temperature if necessary
  //also updates the other values according to what is selected
  onThSliderChange = (value) => {
    this.setState({thSliderValue: value});
    this.checkValidSliders("th", value);
    this.determineCircleColor("thCircleColor", value);
    this.setTemp(value, "thTemp");
    this.updateResult();
    this.updateArrowSize();
    console.log(this.state.wArrowSize, this.state.qhArrowSize, this.state.qcArrowSize);
  };

  //updates the state with the new th slider value
  //makes sure the slider input is valid
  //determines the color of the circle and coverts the temperature if necessary
  //also updates the other values according to what is selected
  onTcSliderChange = (value) => {
    this.setState({tcSliderValue:value});
    this.checkValidSliders("tc", value);
    this.determineCircleColor("tcCircleColor", value);
    this.setTemp(value, "tcTemp");
    this.onCalcSubmit();
    this.updateArrowSize();
  };

  //determines what color the circle should be with each individual rbg value, puts it into a string and assigns it
  //to the appropriate circle
  determineCircleColor = (circle, inValue) =>{
    let red, blue, green;
    if(inValue <= 12){
      red = 0;
      blue = 0;
      green = 0;
    }
    else if(inValue > 12 && inValue <= 3061){
      red = inValue/12;
      blue=0;
      green=0;
    }
    else if(inValue > 3061 && inValue <= 6100){
      red=255;
      blue=(inValue/12)-255;
      green=0;
    }
    else if(inValue > 6100 && inValue <= 9150){
      red=255;
      blue=255;
      green=(inValue/12) - 510;
    }
    else if(inValue > 9150 && inValue <= 10000){
      red=255;
      blue=255;
      green=255;
    }
    //determine rgb to be used in the string
    const rgbString = `rgb(${red}, ${blue}, ${green})`;
    this.setState({[circle]:rgbString});
  };

  //checks to make sure that the slider values are correct
  //th is always higher than tc
  checkValidSliders = (circle, value) => {
    if(circle==="tc"){
      if(value >= this.state.thSliderValue){
        this.setState({thSliderValue:value+2});
        this.determineCircleColor("thCircleColor", (value+2));
      }
    }
    else{
      if(value <= this.state.tcSliderValue){
        this.setState({tcSliderValue:value-2});
        this.determineCircleColor("tcCircleColor", (value-2));
      }
    }
  };

  //determines what temp system to use from the state and converts
  //the temp to the appropriate system with methods from
  //thermocalulator object
  setTemp = (Kelvin, type) => {
    if(this.state.tempType==="K"){
      this.setState({[type]: Kelvin});
    }
    else if(this.state.tempType==="C"){
      const t = tempConversions.toCelsius(Kelvin).toFixed(2);
      this.setState({[type]:t});
    }
    else {
      const t = tempConversions.toFahrenheit(Kelvin).toFixed(2);
      this.setState({[type]:t});
    }
  };
  // end of setTemp

  //changes when something is typed into the W box
  inputChangeW = (event)=>{
    this.setState({"W":event.target.value});
  };

  //changes when something is typed into the QC box
  inputChangeQc = (event) => {
    this.setState({"Qc":event.target.value});
  };

  //changes when something is typed into the Qh
  inputChangeQh = (event) => {
    this.setState({"Qh":event.target.value});
  };


  //does the calculations based on the current state using thermocalculations object
  onCalcSubmit = () => {
    this.updateResult();
  };  //end of onCalcSubmit


  //calculates results based on the current state of the app
  updateResult = () => {
    const selected = this.state.selectedOption;
    if(selected==="W"){
      const E = (ThermoCalculations.calculateE(this.state.tcSliderValue, this.state.thSliderValue));
      const Qc = (ThermoCalculations.calcQcFromW(this.state.W, E));
      const Qh = (ThermoCalculations.calcQhFromW(Qc, this.state.W));
      this.setState({efficiency:`${E*100}%`, Qc:Qc, Qh:Qh});
    }
    else if(selected==="Qc"){
      const E = (ThermoCalculations.calculateE(this.state.tcSliderValue, this.state.thSliderValue));   //keeps to 2 decimal places
      const W = (ThermoCalculations.calcWFromQc(this.state.Qc, E));
      const Qh = (ThermoCalculations.calcQhFromQc(this.state.Qc, W));
      this.setState({efficiency:`${E*100}%`, W:W, Qh:Qh});
    }//end of Qc if block
    else if(selected==="Qh"){
      const E = (ThermoCalculations.calculateE(this.state.tcSliderValue, this.state.thSliderValue));
      const W = (ThermoCalculations.calcWFromQh(E, this.state.Qh));
      const Qc=(ThermoCalculations.calcQcFromQh(this.state.Qh, W));
      this.setState({efficiency:`${E*100}%`, W:W, Qc:Qc});
    }//end of Qh block
  };


  //changes the temp system and converts the temperatures in a callback function so that its not delayed
  onTempSelectionChange = (event) => {
    //must be a callback function so that the current state value is used
    this.setState({tempType : event.target.value}, ()=>{
      if(this.state.tempType === "C"){
        this.setTemp(this.state.tcSliderValue, "tcTemp");
        this.setTemp(this.state.thSliderValue, "thTemp");
      }
      else if(this.state.tempType==="F") {
        this.setTemp(this.state.tcSliderValue, "tcTemp");
        this.setTemp(this.state.thSliderValue, "thTemp");
      }
      else{
        this.setTemp(this.state.tcSliderValue, "tcTemp");
        this.setTemp(this.state.thSliderValue, "thTemp");
      }
    });
  }; //end of onTempSelection Change


  // changes the state to the current max of the sliders
  //callback function so that the methods called after set state use the correct state to determine
  //their output
  ontMaxChange = (event) => {
    this.setState({
      tMax:event.target.value,
      thSliderValue:1,
      tcSliderValue:0,
    }, () => {
      this.updateResult();
      this.determineCircleColor("thCircleColor", this.state.thSliderValue);
      this.determineCircleColor("tcCircleColor", this.state.tcSliderValue);
    });

  };

  //toggles user input
  //if true, the sliders and input boxes are shown
  //if false, they are not shown
  onUserInputChange = () => {
    this.setState({userInput:!this.state.userInput});
  };

  //run when the reset button is clicked
  //calculates with the current state and qh changes to 100
  onResetClick = () => {
    this.setState({Qh:100});
    const E = (ThermoCalculations.calculateE(this.state.tcSliderValue, this.state.thSliderValue));
    const W = (ThermoCalculations.calcWFromQh(E, this.state.Qh));
    const Qc=(ThermoCalculations.calcQcFromQh(this.state.Qh, W));
    this.setState({efficiency:`${E*100}%`, W:W, Qc:Qc});
  };

  updateArrowSize = () => {
    const qhSize = arrowSize.setArrowWidth(arrowSize.scaleValue(this.state.Qh, this.state.Qh));
    const qcSize = arrowSize.setArrowWidth(arrowSize.scaleValue(this.state.Qc, this.state.Qh));
    const wSize = arrowSize.setArrowWidth(arrowSize.scaleValue(this.state.W, this.state.Qh));

    this.setState({
      qhArrowSize:qhSize,
      qcArrowSize:qcSize,
      wArrowSize:wSize,
    })
  };


  render() {

    //creates the tooltip over the slider when moved
    const Handle = Slider.Handle;
    const handle = (props) => {
      const{value, dragging, index, ...restProps} = props;
      return(
          <Tooltip
              prefixCls="rc-slider-tooltip"
              overlay={value}
              visible={dragging}
              placement="top"
              key={index}
          >
            <Handle value={value} {...restProps} />
          </Tooltip>
      );
    };


    return (
        <div className="thermocalculatorApp">
          <div className="TempSelection">

            <div>
              <label className = "TempScale">Temperature Scale </label>
              <RadioButton
                  value="K"
                  checked={this.state.tempType === "K"}
                  className="TempRadioButton"
                  onChange={this.onTempSelectionChange}
              />
              <label className="TempLabel">Kelvin</label>
            </div>  {/*end of the Kelvin Button Div */}

            <div>
              <RadioButton
                  value="C"
                  checked={this.state.tempType==="C"}
                  className="TempRadioButton"
                  onChange={this.onTempSelectionChange}
              />
              <label className="TempLabel">Celsius</label>
            </div> {/*end of the celsius button div */}

            <div>
              <RadioButton
                  value="F"
                  checked={this.state.tempType==="F"}
                  className="TempRadioButton"
                  onChange={this.onTempSelectionChange}
              />
              <label className="TempLabel">Fahrenheit</label>
            </div> {/*end of the Fahrenheit button div */}

          </div> {/*end of the temp selection div */}

          <div className="MaxTempSelector">

            <div>
              <RadioButton
                  value="1000"
                  checked={this.state.tMax==="1000"}
                  className="MaxTempRadioButton"
                  onChange={this.ontMaxChange}
              />
              <label className="tMaxLabel">Tmax = 1000 K</label>
            </div>

            <div>
              <RadioButton
                  value="10000"
                  checked={this.state.tMax==="10000"}
                  className="MaxTempRadioButton"
                  onChange={this.ontMaxChange}
              />
              <label className="tMaxLabel">Tmax = 10000 K </label>
            </div>

          </div> {/* end of the max temp selector div */}

          <div className="userInput">
            <CheckBox
                checked={this.state.userInput}
                onChange={this.onUserInputChange}
                name="userInputCheckbox"
            />

            <label>User Input</label>
          </div>

          <div className="Sliders">
            {this.state.tMax === "10000" &&
            <div className="ThSlider10000">
              <label className="Slider-Label">Th</label>
              <Slider
                  className="Slide"
                  min={1}
                  max={10000}
                  value={this.state.thSliderValue}
                  onChange={this.onThSliderChange}
                  marks={{
                    1: 1,
                    1000: 1000,
                    2000: 2000,
                    3000: 3000,
                    4000: 4000,
                    5000: 5000,
                    6000: 6000,
                    7000: 7000,
                    8000: 8000,
                    9000: 9000,
                    10000: 10000
                  }}
                  handle={handle}
                  step={0.01}
              />
              <br/> <br/> <br/>
            </div>
            }

            {this.state.tMax === "10000" &&
            <div className="TcSlider10000">
              <label className="Slider-Label">Tc</label>
              <Slider
                  className="Slide"
                  min={0}
                  max={9999}
                  value={this.state.tcSliderValue}
                  onChange={this.onTcSliderChange}
                  marks={{
                    0: 0,
                    1000: 1000,
                    2000: 2000,
                    3000: 3000,
                    4000: 4000,
                    5000: 5000,
                    6000: 6000,
                    7000: 7000,
                    8000: 8000,
                    9000: 9000,
                    9999: 9999
                  }}
                  handle={handle}
                  step={0.01}
              />
              <br/>
            </div>
            }

            {this.state.tMax==="1000" &&
            <div className="ThSlider1000">
              <label className="Slider-Label">Th</label>
              <Slider
                  className="Slide"
                  min={1}
                  max={1000}
                  value={this.state.thSliderValue}
                  onChange={this.onThSliderChange}
                  marks={{
                    1: 1,
                    100:100,
                    200:200,
                    300:300,
                    400:400,
                    500:500,
                    600:600,
                    700:700,
                    800:800,
                    900:900,
                    1000: 1000,
                  }}
                  handle={handle}
                  step={0.01}
              />
              <br/> <br/> <br/>
            </div>
            }

            {this.state.tMax==="1000" &&
            <div className="TcSlider10000">
              <label className="Slider-Label">Tc</label>
              <Slider
                  className="Slide"
                  min={0}
                  max={999}
                  value={this.state.tcSliderValue}
                  onChange={this.onTcSliderChange}
                  marks={{
                    0: 0,
                    100:100,
                    200:200,
                    300:300,
                    400:400,
                    500:500,
                    600:600,
                    700:700,
                    800:800,
                    900:900,
                    999: 999
                  }}
                  handle={handle}
                  step={0.01}
              />
              <br/>
            </div>
            }

          </div> {/*end of the sliders div */}
          {this.state.userInput &&
          <div className="input">

            <div className="inputSelection">

              <div className="Qh-Selection">
                <RadioButton
                    value="Qh"
                    checked={this.state.selectedOption === "Qh"}
                    className="radio-button"
                    onChange = {this.onInputSelectionChange}
                />

                <label className="Input-Labels">Qh</label>

                <InputBox
                    className="input-box"
                    disabled={this.state.selectedOption !== "Qh"}
                    onChange={this.inputChangeQh}
                />

              </div>

              <div className="Qc-Selection">

                <RadioButton
                    value={"Qc"}
                    className={"radio-button"}
                    onChange={this.onInputSelectionChange}
                    checked={this.state.selectedOption === "Qc"}
                />

                <label>Qc</label>

                <InputBox
                    className="input-box"
                    disabled={this.state.selectedOption !== "Qc"}
                    onChange={this.inputChangeQc}
                />

              </div>

              <div className="W-Selection">

                <RadioButton
                    value={"W"}
                    className={"radio-button"}
                    onChange={this.onInputSelectionChange}
                    checked={this.state.selectedOption === "W"}
                />

                <label>W</label>

                <InputBox
                    className="input-box"
                    disabled={this.state.selectedOption !== "W"}
                    onChange={this.inputChangeW}
                />

                <div className ="Calculate-Button">

                  <button
                      type="button"
                      onClick={this.onCalcSubmit}
                      className="Calculate-Button"
                  >
                    Calculate
                  </button>

                </div>

                <div className="Reset-Button">
                  <button
                      type="button"
                      onClick={this.onResetClick}
                      className="Reset-Button"
                  >
                    Reset Qh(100 J)
                  </button>
                </div>

              </div>

            </div>
          </div>
          }

          <div className="diagrams">
            <div className = "ThCircle">
              <Circle
                  colorCode={this.state.thCircleColor}
                  circleName="Th"
                  xPos={50}
                  yPos={55}
                  radius={35}
              />
              <label className="thCircleLabel">Hot Source at Th</label>
            </div>

            <div>
              <label className="qhArrowLabel">Qh > </label>
              <Arrow
                  angle={180}
                  length={10}
                  lineWidth={this.state.qhArrowSize/50}
                  className="qhArrow"
              />
            </div>

            <div className = "HeatEngine">
              <Rectangle
                  fill="lightgreen"
                  width={80}
                  height={80}
              />
              <label className="HeatEngineLabel">Heat Engine</label>
            </div>

            <div>
              <label className="qcArrowLabel"> Qc > </label>
              <Arrow
                  angle={180}
                  length={10}
                  lineWidth={this.state.qcArrowSize/50}
                  className="qcArrow"
              />
            </div>

            <div className = "TcCircle">
              <Circle
                  colorCode={this.state.tcCircleColor}
                  circleName="Tc"
                  xPos={50}
                  yPos={55}
                  radius={35}
              />
              <label className="tcCircleLabel">Cold Source at Tc</label>
            </div>

            <div>
              <Arrow
                  angle={90}
                  length={10}
                  lineWidth={this.state.wArrowSize/50}
                  className="workArrow"
                />

            </div>

          </div>

          <div className="ResultsPanel">
            <ResultPanel
                efficiency={this.state.efficiency}
                Qh={this.state.Qh}
                Qc={this.state.Qc}
                W={this.state.W}
                Th={this.state.thTemp}
                Tc={this.state.tcTemp}
                tempType={this.state.tempType}
            />

          </div>

        </div>
    ); //end of return
  }// end of render

}//end of app class

//creates circles using svg
//takes in color, name, its position, and the radius of the circle
class Circle extends Component {
  render(){
    const{
      colorCode,
      circleName = "", //optional variable
      xPos,
      yPos,
      radius,
    } = this.props;

    return (

        <svg>
          <circle cx={xPos} cy={yPos} r={radius} fill={colorCode} className={circleName}/>
        </svg>
    ); //end of return
  }//end of render
}//end of circle component

//creates radio buttons
//takes in a value, whether its checked, a name, and a function to do when a change occurs
class RadioButton extends Component {

  render () {

    const {
      type = "radio",
      value,
      checked,
      name = "",
      onChange,
    } = this.props;


    return (
        <input
            type={type}
            name={name}
            value={value}
            checked={checked}
            onChange={onChange}
        />
    ); //end of return


  } // end of render
}// end of RadioButton

//creates input boxes
//takes in className so that its easier to change all of them, whether its disabled or not, and a funciton
//for when a change happens
class InputBox extends Component {
  render() {
    const {
      type="text",
      className,
      disabled,
      onChange,
    } = this.props;

    return (
        <input
            type={type}
            className={className}
            disabled={disabled}
            onChange={onChange}
        />
    )//end of return
  }//end of render

}//end of InputBox


//creates a checkbox
//takes in whether or not its checked, a name, and a function for when a change happens
class CheckBox extends Component {
  render() {
    const {
      type="checkbox",
      checked,
      name="",
      onChange

    } = this.props;

    return (
        <input
            type={type}
            name={name}
            checked={checked}
            onChange={onChange}
        />
    ); //end of return
  } //end of render
}


//object containing all of the calculations needed for the results panel of the app
const ThermoCalculations = {
  calculateE : function(Tc, Th) {
    const e = 1 - (Tc/Th);
    return e.toFixed(2);
  },

  calcWFromQc : function(Qc, E) {
    const w = Qc * (E/(1-E));
    return w.toFixed(2);
  },

  calcQhFromQc : function(Qc, W){
    const Qh = Qc + W;
    return parseFloat(Qh).toFixed(2);
  },

  calcQcFromW : function(W, E){
    const Qc = W/((1-E)/E);
    return Qc.toFixed(2);
  },

  calcQhFromW : function(Qc, W) {
    const Qh = Qc + W;
    return Qh.toFixed(2);
  },

  calcWFromQh : function(E, Qh) {
    const W = E*Qh;
    return W.toFixed(2);
  },

  calcQcFromQh : function(Qh, W) {
    const Qc = Qh-W;
    return Qc.toFixed(2);
  },
};

//creates the result panel
class ResultPanel extends Component {
  render() {
    const {
      efficiency,
      Qh,
      Qc,
      W,
      Th,
      Tc,
      tempType
    } = this.props;

    return (
        <table className = "ResultsTable">
          <thead>
          <tr>
            <th>Results:</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>Efficiency:</td>
            <td>{efficiency}</td>
          </tr>

          <tr>
            <td>Qh:</td>
            <td>{Qh} J</td>
          </tr>

          <tr>
            <td>Qc:</td>
            <td>{Qc} J</td>
          </tr>

          <tr>
            <td>w: </td>
            <td>{W} J</td>
          </tr>

          <tr>
            <td>Th: </td>
            <td>{Th} {tempType}</td>
          </tr>

          <tr>
            <td>Tc: </td>
            <td>{Tc} {tempType}</td>
          </tr>
          </tbody>
        </table>
    ); // end of return
  }// end of render
}//end of ResultPanel

//object that contains the temperature conversations
//conversations for kelvin to celsius and kelvin to fahrenheit
const tempConversions = {
  toCelsius : function(Kelvin){
    return Kelvin - 273.15;
  },

  toFahrenheit: function(Kelvin){
    return ((Kelvin-273.15)*1.8)+32;
  }
}; // end of tempConversions

class Rectangle extends Component{
  render () {
    const {
      className,
      fill,
      width,
      height,
      transform,
    } = this.props;
    return (
        <svg>
          <rect width={width} height={height} fill={fill} className={className} transform={transform}/>
        </svg>
    );
  }
}

// class Triangle extends Component {
//   render() {
//     const {
//       className = "",
//       r,
//     } = this.props;
//     return(
//         <Poly
//             className={className}
//             sides={3}
//             r={r}
//             fill="black"
//         />
//
//     );
//   }
// }
//
// class Arrow extends Component{
//   render(){
//     const {
//       arrowBodyName,
//       arrowBodyWidth,
//       arrowHeadName,
//       arrowHeadSize,
//       arrowBodyHeight,
//     }=this.props;
//     return (
//         <div>
//           <div className={arrowBodyName}>
//             <Rectangle
//                 className={arrowBodyName}
//                 fill="black"
//                 width={arrowBodyWidth}
//                 height={arrowBodyHeight}
//             />
//           </div>
//
//           <div className={arrowHeadName}>
//             <Triangle
//                 className={arrowHeadName}
//                 r={arrowHeadSize}
//             />
//           </div>
//         </div>
//     );
//   }
// }

//contains methods related to determining the size of the different arrows
const arrowSize = {
  scaleValue : function(inVal, Qh) {
    return (inVal*100)/Qh;
  },

  setArrowWidth : function(inVal) {
    const halfWorkArrowWidth = ((inVal/2.0)/2);
    if(inVal > 10) {
      return 2*halfWorkArrowWidth;
    }
    else if((inVal < 10)&&(inVal>0)){
      return 5;
    }
    else{
      return 0;
    }

  },
};

class ArrowShape extends Component {
  render() {
    const {
      angle,
      length,
      style
    } = this.props;
    return (
      <Arrow
          angle={angle}
          length={length}
          style={style}
        />
    );
  }
}

export default App;
