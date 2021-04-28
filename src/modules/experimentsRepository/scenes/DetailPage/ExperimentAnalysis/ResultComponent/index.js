import React from 'react';
import ReactDOM from 'react-dom';
//import './form.css';
import Visualizer from "cmp-visualizer";
import { result } from 'lodash';

export default class ResultComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  renderForm = () => {
    let outputType = this.props.outputType;
    let result = this.props.result;
    console.log("result: ".result);
    let models = [{ "model": false, "id": this.props.result.id }]

    let output = (
      <output name="result" for="a b"></output>
    );

    if (outputType == "float") {
      output = (
        <React.Fragment key={'i' + outputType}>
          <output name="result" for="a b">{result}</output>
        </React.Fragment>
      );
    }
    else if (outputType == "string") {
      output = (
        <React.Fragment key={'i' + outputType}>
          <output name="result" for="a b">{result}</output>
        </React.Fragment>
      );
    }
    else if (outputType == "array") {
      let id = result.id;
      let data = {};
      data[id] = result;
      console.log(data);
      console.log(models);
      output = (
        <>
          <section className="section">
            <div className="container">
              <div className="columns is-full-height">
                <div className="column">
                  <div className="box is-full-height is-padding-extended">
                    {Object.keys(result).length ? (
                      <Visualizer
                        inputData={data}
                        models={models}
                        width="100%"
                      />
                    ) : (
                        <progress className="progress is-primary" max="100">
                          30%
                        </progress>
                      )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      );
    }
    return (
      <div key={"g" + outputType} className="form-group">
        {output}
      </div>
    );
  }

  render() {
    let title = this.props.title || "Dynamic Form";

    return (
      <div className={this.props.className}>
        <h5 className="title is-4 m-b-10">{title}</h5>
        <form className="dynamic-form" onSubmit={(e) => { this.onSubmit(e) }}>
          <div className="form-group">
            {this.renderForm()}
          </div>
        </form>
      </div>
    )
  }

}