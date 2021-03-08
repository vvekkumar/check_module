import { render } from '@testing-library/react';
import React from 'react';
import ImageMapper from 'react-image-mapper';
import './mapper.css';
import download from '../../images/download.jpg';

var MAP = {
    name: "my-map",
    areas: [
      { name: "1", shape: "rect", coords: [0,2,600,320],active:true},
    ]
  }
  URL = "https://c1.staticflickr.com/5/4052/4503898393_303cfbc9fd_b.jpg";
class Mapper extends React.Component {
    constructor() {
        super();
        this.state={hoveredArea:''};
    }
    getInitialState() {
		return { hoveredArea: null, msg: null, moveMsg: null };
	}
	load() {
		this.setState({ msg: "Interact with image !" });
	}
	clicked(area) {
		this.setState({
			msg: `You clicked on ${area.shape} at coords ${JSON.stringify(
				area.coords
			)} !`
		});
	}
	clickedOutside(evt) {
		const coords = { x: evt.nativeEvent.layerX, y: evt.nativeEvent.layerY };
		this.setState({
			msg: `You clicked on the image at coords ${JSON.stringify(coords)} !`
		});
	}
	moveOnImage(evt) {
		const coords = { x: evt.nativeEvent.layerX, y: evt.nativeEvent.layerY };
		this.setState({
			moveMsg: `You moved on the image at coords ${JSON.stringify(coords)} !`
		});
	}
	enterArea(area) {
		this.setState({
			hoveredArea: area,
			msg: `You entered ${area.shape} ${area.name} at coords ${JSON.stringify(
				area.coords
			)} !`
		});
	}
	leaveArea(area) {
		this.setState({
			hoveredArea: null,
			msg: `You leaved ${area.shape} ${area.name} at coords ${JSON.stringify(
				area.coords
			)} !`
		});
	}
	moveOnArea(area, evt) {
		const coords = { x: evt.nativeEvent.layerX, y: evt.nativeEvent.layerY };
		this.setState({
			moveMsg: `You moved on ${area.shape} ${
				area.name
			} at coords ${JSON.stringify(coords)} !`
		});
	}

    
    getTipPosition(area) {
        return { top: `${area.center[1]}px`, left: `${area.center[0]}px` };
    }
  
   
    render(){
    return (
        <div>
          <ImageMapper src={download} map={MAP} width={500} 
       onLoad={() => this.load()}
       onClick={area => this.clicked(area)}
       onMouseEnter={area => this.enterArea(area)}
       onMouseLeave={area => this.leaveArea(area)}
       onMouseMove={(area, _, evt) => this.moveOnArea(area, evt)}
       onImageClick={evt => this.clickedOutside(evt)}
       onImageMouseMove={evt => this.moveOnImage(evt)}
       lineWidth={4}
       strokeColor={"white"}
          />
        {this.state.hoveredArea && (
							<span
								className="tooltip"
								style={{ ...this.getTipPosition(this.state.hoveredArea) }}
							>
								{this.state.hoveredArea && this.state.hoveredArea.name}
							</span>
						)}
                        	<pre className="message">
						{this.state.msg ? this.state.msg : null}
					</pre>
					<pre>{this.state.moveMsg ? this.state.moveMsg : null}</pre>
        </div>
    )
    }
}

export default Mapper;