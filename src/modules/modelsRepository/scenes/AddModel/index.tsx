import React from "react";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
//import { moduleNames as modelsNames } from "../../reducers/MainReducer";
import ProgressNav from "components/ProgressNav";
import {moduleNames as modelsNames} from "../../../modelsRepository/reducers/MainReducer";
import api from "../../services";

class AddModel extends React.PureComponent {
    state = {
        selectedFile: null,
        txt: null
    };

    onFileChange = event => {
        this.setState({ selectedFile: event.target.files[0] });
    };

    onFileUpload = () => {
        api.importModel(this.state.txt)
    };



    fileData = () => {
        if (this.state.selectedFile) {
            const reader = new FileReader();
            reader.onload = async (e) => {
                this.state.txt = (e.target.result);
                alert(this.state.txt);
            };
            reader.readAsText(this.state.selectedFile);
        } else {
            return (
                <div>
                    <br />
                    <h4>Choose the file before Uploading</h4>
                </div>
            );
        }
    };

    render() {
        return (
            <>
            <BreadcrumbsItem to={`/${modelsNames.url}/detail`}>
                New model
            </BreadcrumbsItem>
                <div className="section">
                    <div className="container">
                        <h2>Import SBML v3 model</h2>
                        <div>
                            <input type="file" onChange={this.onFileChange} />
                            <button onClick={this.onFileUpload}>
                                Upload
                            </button>
                        </div>
                        {this.fileData()}
                    </div>
                </div>
            </>
        );
    }
}

export default AddModel;
