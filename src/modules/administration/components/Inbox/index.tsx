import React from "react";
import { connect } from "react-redux";
import { Dispatch, bindActionCreators } from "redux";
import { CSSTransition } from "react-transition-group";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import onClickOutside from "react-onclickoutside";

import { AppState } from "reducers/GlobalReducer";
import { inboxState, getNotifications, getInbox } from "../../selectors";
import { NotificationModel } from "models/Notification";
import { loadNotifications, toggleInbox, markAsSeen } from "../../actions";
import InboxItem from "./InboxItem";

interface Props {
  isOpen: boolean;
  loadNotifications: (id: number) => any;
  markAsSeen: typeof markAsSeen;
  toggleInbox: () => void;
  notifications: NotificationModel[];
}

interface State {}

class Inbox extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.handleRemoveItem = this.handleRemoveItem.bind(this);
  }

  componentDidMount() {
    const { loadNotifications } = this.props;
    loadNotifications(99);
  }

  handleClickOutside(event: any) {
    const { isOpen, toggleInbox } = this.props;
    isOpen && toggleInbox();
  }

  handleRemoveItem(id: number) {
    this.props.markAsSeen(id);
  }

  render() {
    const { isOpen, notifications, toggleInbox } = this.props;

    const nodes = notifications.map((item, i) => {
      return (
        <InboxItem
          title={"Test"}
          text={item.message}
          key={`inbox-item-${i}`}
          onClose={() => this.handleRemoveItem(item.id)}
        />
      );
    });

    return (
      <div className="inbox-wrapper">
        <CSSTransition
          in={isOpen}
          timeout={300}
          classNames="inbox"
          unmountOnExit
        >
          <div className={"inbox"}>
            <div className={"inbox-heading"}>
              <h4>Notifications</h4>
              <div
                className={"inbox-close"}
                onClick={() => isOpen && toggleInbox()}
              >
                <FontAwesomeIcon icon={faTimes} />
              </div>
            </div>
            <div className={"inbox-messages"}>{nodes}</div>
          </div>
        </CSSTransition>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  isOpen: inboxState(state),
  notifications: getInbox(state)
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  loadNotifications: bindActionCreators(loadNotifications, dispatch),
  toggleInbox: bindActionCreators(toggleInbox, dispatch),
  markAsSeen: bindActionCreators(markAsSeen, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(onClickOutside(Inbox));
