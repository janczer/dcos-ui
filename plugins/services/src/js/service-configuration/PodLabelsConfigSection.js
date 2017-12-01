import { FormattedMessage, injectIntl } from "react-intl";
import React from "react";

import ConfigurationMapHeading
  from "#SRC/js/components/ConfigurationMapHeading";
import ConfigurationMapSection
  from "#SRC/js/components/ConfigurationMapSection";

import {
  getSharedIconWithLabel,
  getContainerNameWithIcon
} from "../utils/ServiceConfigDisplayUtil";
import ConfigurationMapTable from "../components/ConfigurationMapTable";

class PodLabelsConfigSection extends React.Component {
  getColumns() {
    return [
      {
        heading: this.props.intl.formatMessage({
          id: "S1aZlp3Q1ZM",
          defaultMessage: "Key"
        }),
        prop: "key"
      },
      {
        heading: this.props.intl.formatMessage({
          id: "Hk0Wx63m1-f",
          defaultMessage: "Value"
        }),
        prop: "value"
      },
      {
        heading: this.props.intl.formatMessage({
          id: "Sk1feahmybf",
          defaultMessage: "Container"
        }),
        prop: "container"
      }
    ];
  }

  render() {
    const { onEditClick } = this.props;
    const { labels = {}, containers = [] } = this.props.appConfig;

    let combinedLabels = [];

    if (labels != null) {
      combinedLabels = Object.keys(labels).reduce((memo, key) => {
        memo.push({
          key: <code>{key}</code>,
          value: labels[key],
          container: getSharedIconWithLabel()
        });

        return memo;
      }, []);
    }

    combinedLabels = containers.reduce((memo, container) => {
      const { labels = {} } = container;

      if (labels != null) {
        return Object.keys(labels).reduce((cvMemo, key) => {
          cvMemo.push({
            key: <code>{key}</code>,
            value: labels[key],
            container: getContainerNameWithIcon(container)
          });

          return cvMemo;
        }, memo);
      }

      return memo;
    }, combinedLabels);

    if (!combinedLabels.length) {
      return null;
    }

    return (
      <div>
        <ConfigurationMapHeading level={1}>
          <FormattedMessage id="Hy3Wla3Xy-f" defaultMessage={`Labels`} />
        </ConfigurationMapHeading>
        <ConfigurationMapSection key="pod-general-section">
          <ConfigurationMapTable
            columnDefaults={{ hideIfEmpty: true }}
            columns={this.getColumns()}
            data={combinedLabels}
            onEditClick={onEditClick}
            tabViewID="multienvironment"
          />
        </ConfigurationMapSection>
      </div>
    );
  }
}

PodLabelsConfigSection.defaultProps = {
  appConfig: {}
};

PodLabelsConfigSection.propTypes = {
  appConfig: React.PropTypes.object,
  onEditClick: React.PropTypes.func
};

module.exports = injectIntl(PodLabelsConfigSection);
