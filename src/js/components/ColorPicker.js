import React, { Component, Fragment } from "react";
import { Button, Input } from 'react-onsenui';
import { createPopover } from "onsenui";


class ColorPicker extends Component {
    constructor(props) {
        super();
        this.state = {
            color: "#ff00ff"
        }
    }

    addColor = () => {
        const {colors = ""} = this.props;
        const colorArray = colors === "" ? [] : colors.split(',')
        colorArray.push(this.state.color);
        this.props.update({
            target: {
                name: "colors",
                value: colorArray.join(',')
            }
        })
    }

    removeColor = (index) => {
        const {colors = ""} = this.props;
        const colorArray = colors === "" ? [] : colors.split(',')
        colorArray.splice(index, 1)
        this.props.update({
            target: {
                name: "colors",
                value: colorArray.join(',')
            }
        })
    }

    pickColor = (event) => {
        const {value} = event.target;
        this.setState({
            color: value
        })
    }

    

    render() {
        const {colors = ""} = this.props;
        const colorArray = colors === "" ? [] : colors.split(',')
        return (
            <div>
                <div>
                    {colorArray.map((color, idx) => 
                        <span key={`color-${idx}`} 
                            className="notification" 
                            style={{backgroundColor: color, marginRight: '2px'}}
                            onClick={() => this.removeColor(idx)}
                        >&nbsp;</span>
                    )}
                </div>
                <Input
                    name="color"
                    value={this.state.color}
                    onChange={(event) => this.pickColor(event)}
                    placeholder='red,blue,#ffffff'
                    type="color"
                    style={{width: "100px"}} />
                <Button name="colors" modifier="quiet" onClick={() => this.addColor()}>
                    +
                </Button>
            </div>
        );
    }
}

export default ColorPicker;