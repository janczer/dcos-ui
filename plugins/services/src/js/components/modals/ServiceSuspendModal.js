import { FormattedMessage, injectIntl } from "react-intl";
import { Confirm } from "reactjs-components";
import React, { PropTypes } from "react";
import PureRender from "react-addons-pure-render-mixin";

import ModalHeading from "#SRC/js/components/modals/ModalHeading";

import AppLockedMessage from "./AppLockedMessage";
import Pod from "../../structs/Pod";
import Service from "../../structs/Service";
import ServiceTree from "../../structs/ServiceTree";
import IntlContext from "#SRC/js/components/IntlContext";

class ServiceSuspendModal extends React.Component {
  constructor() {
    super(...arguments);

    this.state = {
      errorMsg: null
    };

    this.shouldComponentUpdate = PureRender.shouldComponentUpdate.bind(this);
  }

  componentWillUpdate(nextProps) {
    const requestCompleted = this.props.isPending && !nextProps.isPending;

    const shouldClose = requestCompleted && !nextProps.errors;

    if (shouldClose) {
      this.props.onClose();
    }
  }

  componentWillReceiveProps(nextProps) {
    const { errors } = nextProps;
    if (!errors) {
      this.setState({ errorMsg: null });

      return;
    }

    if (typeof errors === "string") {
      this.setState({ errorMsg: errors });

      return;
    }

    let { message: errorMsg = "", details } = errors;
    const hasDetails = details && details.length !== 0;

    if (hasDetails) {
      errorMsg = details.reduce(function(memo, error) {
        return `${memo} ${error.errors.join(" ")}`;
      }, "");
    }

    if (!errorMsg || !errorMsg.length) {
      errorMsg = null;
    }

    this.setState({ errorMsg });
  }

  shouldForceUpdate() {
    return this.state.errorMsg && /force=true/.test(this.state.errorMsg);
  }

  getErrorMessage() {
    const { errorMsg = null } = this.state;

    if (!errorMsg) {
      return null;
    }

    if (this.shouldForceUpdate()) {
      return <AppLockedMessage service={this.props.service} />;
    }

    return (
      <h4 className="text-align-center text-danger flush-top">{errorMsg}</h4>
    );
  }

  getServiceLabel() {
    const { service } = this.props;

    if (service instanceof Pod) {
      return "Pod";
    }

    if (service instanceof ServiceTree) {
      return "Group";
    }

    return "Service";
  }

  getModalHeading() {
    const serviceLabel = this.getServiceLabel();

    return (
      <IntlContext intl={this.props.intl}>
        <ModalHeading>
          <FormattedMessage id="Hk_pnnQyWM" defaultMessage={`Suspend`} />
          {serviceLabel}
        </ModalHeading>
      </IntlContext>
    );
  }

  render() {
    const { isPending, onClose, open, service, suspendItem } = this.props;
    const serviceLabel = this.getServiceLabel();
    const serviceName = service.getName();

    return (
      <Confirm
        disabled={isPending}
        header={this.getModalHeading()}
        open={open}
        onClose={onClose}
        leftButtonCallback={onClose}
        rightButtonText={`Suspend ${serviceLabel}`}
        rightButtonCallback={() => suspendItem(this.shouldForceUpdate())}
        showHeader={true}
      >
        <IntlContext intl={this.props.intl}>
          <p>
            <FormattedMessage
              id="ryta2hXJZf"
              defaultMessage={`Suspending the`}
            />
            {" "}
            <strong>{serviceName}</strong>
            {" "}
            {serviceLabel.toLowerCase()}
            {" "}
            will remove all currently running instances of the
            {" "}
            {serviceLabel.toLowerCase()}.
            {" "}
            The
            {" "}
            {serviceLabel.toLowerCase()}
            <FormattedMessage
              id="BJ5a32XJbG"
              defaultMessage={`will not be deleted.`}
            />
          </p>
          {this.getErrorMessage()}
        </IntlContext>
      </Confirm>
    );
  }
}

ServiceSuspendModal.propTypes = {
  suspendItem: PropTypes.func.isRequired,
  errors: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  isPending: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  service: PropTypes.oneOfType([
    PropTypes.instanceOf(ServiceTree),
    PropTypes.instanceOf(Service)
  ]).isRequired
};

module.exports = injectIntl(ServiceSuspendModal);
