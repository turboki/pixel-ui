import React, { Component, Fragment } from "react";
import { ListItem, Input, Select, ListHeader, Icon } from 'react-onsenui';
import ColorPicker from './ColorPicker';


class Step extends Component {
    constructor() {
        super();
    }

    update = (event) => {
        const { value, name } = event.target;
        const {mode, colors, wait, loop, idx} = this.props;
        let updatedProps = {mode, colors, wait, loop, [name]: value}
        this.props.update(idx, updatedProps)
    }

    render() {
        return (
            <Fragment>
                <ListHeader>
                    <div className="center">
                        Step: {this.props.idx + 1}
                        <Icon
                            style={{float: "right", marginRight: "5px", color: "red", cursor: "pointer"}}
                            onClick={() => this.props.remove(this.props.idx)}
                            size={{default: 16, material: 18}}
                            icon={{default: 'times', material: 'times'}}
                        />
                    </div>
                </ListHeader>
                <ListItem>
                    <div className="center">
                        Mode:
                    </div>
                    <div className="right">
                        <Select
                            name="mode"
                            value={this.props.mode}
                            onChange={(event) => (this.update(event))}
                            >
                            <option value="rainbow">Rainbow</option>
                            <option value="solid_rainbow">Solid Rainbow</option>
                            <option value="solid">Solid</option>
                            <option value="fade">Fade</option>
                            <option value="chase">Chase</option>
                            <option value="wave">Wave</option>
                            <option value="marquee">Marquee</option>
                            <option value="twinkle">Twinkle</option>
                            <option value="twinkle_adv">Twinkle Fade</option>
                            <option value="heartbeat">Heartbeat</option>
                            <option value="creepy">Creepy</option>
                            
                        </Select>
                    </div>
                </ListItem>
                <ListItem>
                    <div className="center">
                        Colors: 
                    </div>
                    <div className="right">
                        <ColorPicker colors={this.props.colors} update={this.update}></ColorPicker>
                    </div>
                </ListItem>
                <ListItem>
                    <div className="center">
                        Wait Time: 
                    </div>
                    <div className="right">
                        <Input
                            name="wait"
                            onChange={(event) => (this.update(event))}
                            value={this.props.wait}
                            placeholder='Loop Speed'
                            type="number"
                        />
                    </div>
                </ListItem>
                <ListItem>
                    <div className="center">
                        Number of Loops:
                    </div>
                    <div className="right">
                        <Input
                            name="loop"
                            onChange={(event) => (this.update(event))}
                            value={this.props.loop}
                            placeholder='Number of Loops'
                            type="number" />
                    </div>
                </ListItem>
            </Fragment>
        );
    }
}

export default Step;