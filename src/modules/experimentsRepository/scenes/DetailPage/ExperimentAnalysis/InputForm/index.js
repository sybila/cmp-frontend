import React from 'react';
import ReactDOM from 'react-dom';
//import './form.css';

export default class InputForm extends React.Component {
    constructor(props) {
        super(props);
    }

    onSubmit = (e) => {
        e.preventDefault();
        if (this.props.onSubmit) this.props.onSubmit(this.state);
    }

    onChange = (e, key) => {
        this.setState({
            [key]: this[key].value
        })
    }

    renderForm = () => {
        let model = this.props.model;
        let formUI = model.map((m) => {
            let key = m.key;
            let label = m.name;
            let type = m.type;
            let description = m.description;
            console.log(key);

            let input = (
                <input
                    className="form-input"
                    type={type}
                    key={'i' + m.key}
                    name={label}
                    onChange={(e) => { this.onChange(e, 'i' + m.key) }}
                />
            );

            if (type == "ExperimentId") {
                input = (
                    <React.Fragment key={'i' + m.key}>
                        <input
                            ref={(key) => { this[label] = key }}
                            key={'i' + m.key}
                            type="number"
                            className={`input`}
                            id={key}
                            name={label}
                            step="1" min="0"
                            onChange={(e) => { this.onChange(e, label) }}
                        />
                    </React.Fragment>
                );
            }

            if (type == "VariableId") {
                input = (
                    <React.Fragment key={'i' + m.key}>
                        <input
                            ref={(key) => { this[label] = key }}
                            key={'i' + m.key}
                            type="number"
                            className={`input`}
                            id={key} name={label}
                            step="1" min="0"
                            onChange={(e) => { this.onChange(e, label) }}
                        />
                    </React.Fragment>
                );
            }

            if (type == "float") {
                input = (
                    <React.Fragment key={'i' + m.key}>
                        <input
                            ref={(key) => { this[label] = key }}
                            key={'i' + m.key}
                            type="number"
                            step="0.01"
                            id={key}
                            name={label}
                            onChange={(e) => { this.onChange(e, label) }}
                        />
                    </React.Fragment>
                );
            }

            if (type == "int") {
                input = (
                    <React.Fragment key={'i' + m.key}>
                        <input
                            ref={(key) => { this[label] = key }}
                            key={'i' + m.key}
                            type="number"
                            id={key}
                            name={label}
                            onChange={(e) => { this.onChange(e, label) }}
                        />
                    </React.Fragment>
                );
            }

            if (type == "bool") {
                let checked = false;
                input = (
                    <React.Fragment key={'i' + m.key}>
                        <input
                            ref={(key) => { this[label] = key }}
                            key={'i' + m.key}
                            className="form-input"
                            type="checkbox"
                            name={label}
                            checked={checked}
                            onChange={e => {
                                this.onChange(e, label);
                            }}
                        />
                    </React.Fragment>
                );

                input = <div className="form-group-checkbox">{input}</div>;
            }

            return (
                <div key={"g" + key} className="field">
                    <div className="field-body">
                        <div className="field">
                            <label className="label" key={"l" + key} htmlFor={key}>
                                {m.name}
                            </label>
                            <small id="helpText">{description}</small>
                            <div className="control">
                                {input}
                            </div>
                        </div>
                    </div>
                </div>
            );
        });
        return formUI;
    }

    render() {
        let title = this.props.title || "Dynamic Form";

        return (
            <div className="columns m-t-25">
                <h5 className="title is-4 m-b-10">{title}</h5>
                <form className="column is-8" onSubmit={(e) => { this.onSubmit(e) }}>
                    <div className="form-group">
                        {this.renderForm()}
                        <div className="control">
                            <button
                                type="submit"
                                className={"button is-primary m-t-20"}>
                                Run
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }

}