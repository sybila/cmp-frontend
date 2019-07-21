import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { AppState } from "../reducers/globalReducer";

interface Props {
  state: any;
  dispatch: Dispatch<any>;
  params?: any;
  location?: any;
}

interface State {
  isValid: boolean;
}

type Handler = (state: any, dispatch: Dispatch) => boolean | Promise<boolean>;

/**
 * Creates inline interceptor component class.
 * @param enter Interceptor function
 */
export const intercept = (enter: Handler, leave?: Handler) => {
  const mapDispatch = (dispatch: Dispatch) => ({ dispatch });
  const mapState = (state: AppState) => ({ state });

  return connect(
    mapState,
    mapDispatch
  )(
    class InlineInterceptor extends React.Component<Props, State> {
      constructor(props: Props) {
        super(props);

        this.state = {
          isValid: false
        };
      }

      componentWillMount() {
        this.intercept(this.props, enter);
      }

      componentWillUnmount() {
        if (leave) return this.intercept(this.props, leave, false);
      }

      render() {
        return (
          <React.Fragment>
            {this.state.isValid ? (
              this.props.children
            ) : (
              <div className="intercept"></div>
            )}
          </React.Fragment>
        );
      }

      intercept(props: Props, handler: Handler, setState = true) {
        const promise = Promise.resolve(handler(props.state, props.dispatch));

        promise.then((value: any) => {
          if ("function" === typeof value) {
            value();
            return;
          }

          if (setState)
            this.setState({
              isValid: !!value
            });
        });
      }
    }
  );
};
