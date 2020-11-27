import React, { Component } from "react";
import { Page, Switch, Button, List, ListTitle, ListItem, Card, Range } from 'react-onsenui';
import Step from './Step';


class Form extends Component {
    constructor() {
        super();

        this.state = {
            running: true,
            brightness: 1,
            steps: [
                {
                    mode: "rainbow",
                    colors: "",
                    wait: "0.001",
                    loop: "1"
                }
            ]
        };
    }

    apiCall = (query, message) => {
        fetch(`/api?${query}`)
            .then((resp) => {
                return resp.json()
            }) 
            .then((data) => {
                console.log(message)                    
            })
            .catch((error) => {
                console.log(error, "Error communicating with API")
            })
    }

    toggleRunning = (event) => {
        const { value } = event;
        this.apiCall(`running=${value}`, `Lights are ${value? 'on': 'off'}`)
        this.setState({
            running: value
        })
    }

    updateBrightness = (event) => {
        const {value} = event.target;
        this.apiCall(`brightness=${parseInt(value)/100}`, `Lights are at ${parseInt(value)}% brightness`)
        this.setState({brightness: parseInt(value)})
    }

    pushConfig = (event) => {
        const {steps} = this.state;
        if (steps.length > 1) {
            const stringifiedSteps = steps.reduce((acc, curr) => {
                const {mode, colors, loop, wait} = curr;
                acc.push(`${mode}:${colors}:${wait}:${loop}`)
                return acc 
            }, [])
            this.apiCall(`steps=${stringifiedSteps.join('|')}`, "Lights are shining")
        } else if(steps.length == 1) {
            const {mode, colors, loop, wait} = steps[0];
            this.apiCall(`mode=${mode}&colors=${colors}&wait=${wait}&loop=${loop}`,"Lights are shining")
        } else {
            console.log("add some steps man...")
        }
    }

    addStep = () => {
        this.setState(state => {
            const steps = state.steps.concat({
                mode: "rainbow",
                colors: "",
                wait: "0.001",
                loop: "1"
            });
            return {
              steps
            };
        });
    }

    removeStep = (index) => {
        this.setState(state => {
            const steps = [...state.steps]
            steps.splice(index, 1);
            return {
              steps
            };
        });
    }

    updateStep = (index, step) => {
        this.setState(state => {
            const steps = [...state.steps]
            steps[index] = step;
            return {
              steps
            };
        });
    }

    render() {
        return (
            <Page contentStyle={{padding: 40}}>
                <h1>Pixel UI</h1>
                <form>
                    <Card>
                        <ListTitle>Active</ListTitle>
                        <List>
                            <ListItem>
                                <label className="center" htmlFor="running">Running:</label>
                                <div className="right">
                                <Switch inputId="running" checked={this.state.running} onChange={this.toggleRunning} />
                                </div>
                            </ListItem>
                            <ListItem>
                                <label className="center" htmlFor="brightness">Brightness:</label>
                                <div className="right">
                                    <Range name="brightness"
                                        value={this.state.brightness}
                                        onMouseUp={(event) => this.updateBrightness(event)}
                                        />
                                </div>
                            </ListItem>
                        </List>
                    </Card>
                    <Card>
                        <ListTitle>Steps</ListTitle>
                        <List>
                            {this.state.steps.map((step, idx)=> 
                                <Step key={`step-`+idx} update={this.updateStep} remove={this.removeStep} idx={idx} {...step}></Step>
                            )}
                             <ListItem>
                                <div className="right">
                                    <Button modifier="quiet" onClick={this.addStep}>
                                        + Add Step
                                    </Button>
                                </div>
                             </ListItem>
                        </List>
                    </Card>
                    <Button modifier="large--cta" onClick={() => this.pushConfig()}>
                        Light it up!
                    </Button>
                </form>
            </Page>
        );
    }
}

export default Form;