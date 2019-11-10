import React from "react";
import { connect } from "react-redux";
import { Dispatch, bindActionCreators } from "redux";
import { CSSTransition } from "react-transition-group";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import { AppState } from "reducers/GlobalReducer";
import { inboxState, getNotifications } from "../../selectors";
import { NotificationModel } from "models/Notification";
import { loadNotifications, toggleInbox } from "../../actions";
import InboxItem from "./InboxItem";

interface Props {
  isOpen: boolean;
  loadNotifications: (id: number) => any;
  toggleInbox: () => void;
  notifications: NotificationModel[];
}

interface State {}

class Inbox extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.setInboxRef = this.setInboxRef.bind(this);
  }

  componentDidMount() {
    const { loadNotifications } = this.props;
    loadNotifications(99);

    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  private inboxRef: any;

  setInboxRef(node: any) {
    this.inboxRef = node;
  }

  handleClickOutside(event: any) {
    const { isOpen } = this.props;
    if (this.inboxRef && !this.inboxRef.contains(event.target) && isOpen)
      this.props.toggleInbox();
  }

  render() {
    const { isOpen, notifications, toggleInbox } = this.props;

    const nodes = notifications.map((item, i) => {
      return <InboxItem title={"Test"} text={item.message} key={`inbox-item-${i}`}/>;
    });

    return (
      <div ref={this.setInboxRef}>
        <CSSTransition
          in={isOpen}
          timeout={300}
          classNames="inbox"
          unmountOnExit
        >
          <div className={"inbox"}>
            <div className={"inbox-heading"}>
              <h3>Notifications</h3>
              <div
                className={"inbox-close"}
                onClick={() => isOpen && toggleInbox()}
              >
                <FontAwesomeIcon icon={faTimes} />
              </div>
            </div>
            <div className={"inbox-wrapper"}>{nodes}</div>
          </div>
        </CSSTransition>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  isOpen: inboxState(state),
  notifications: getNotifications(state)
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  loadNotifications: bindActionCreators(loadNotifications, dispatch),
  toggleInbox: bindActionCreators(toggleInbox, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Inbox);
