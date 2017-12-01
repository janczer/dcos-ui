import { FormattedMessage } from "react-intl";
import React from "react";

import ConfigurationMap from "../../../components/ConfigurationMap";
import ConfigurationMapLabel from "../../../components/ConfigurationMapLabel";
import ConfigurationMapRow from "../../../components/ConfigurationMapRow";
import ConfigurationMapSection
  from "../../../components/ConfigurationMapSection";
import ConfigurationMapValue from "../../../components/ConfigurationMapValue";
import Overlay from "../../../structs/Overlay";

class VirtualNetworkDetailsTab extends React.Component {
  render() {
    const { overlay } = this.props;

    return (
      <div className="container">
        <ConfigurationMap>
          <ConfigurationMapSection>
            <ConfigurationMapRow>
              <ConfigurationMapLabel>
                <FormattedMessage id="HkWfI6hXkZG" defaultMessage={`Name`} />
              </ConfigurationMapLabel>
              <ConfigurationMapValue>
                {overlay.getName()}
              </ConfigurationMapValue>
            </ConfigurationMapRow>
            <ConfigurationMapRow>
              <ConfigurationMapLabel>
                <FormattedMessage
                  id="BJGM8an7JWM"
                  defaultMessage={`IP Subnet`}
                />
              </ConfigurationMapLabel>
              <ConfigurationMapValue>
                {overlay.getSubnet()}
              </ConfigurationMapValue>
            </ConfigurationMapRow>
          </ConfigurationMapSection>
        </ConfigurationMap>
      </div>
    );
  }
}

VirtualNetworkDetailsTab.propTypes = {
  overlay: React.PropTypes.instanceOf(Overlay)
};

module.exports = VirtualNetworkDetailsTab;
