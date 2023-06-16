import React from 'react';
import { Col, Headline, Layout, Loading, MultiColumnList, Pane, Row } from '@folio/stripes/components';
import { FormattedMessage } from 'react-intl';
import { FILL_PANE_WIDTH } from '../../constants';
import { useLogs } from '../../hooks/useLogs';
import { LOGS_COLUMNS } from '../../constants/columns';
import { logsFormatter } from '../../util/formatters';

const Logs = () => {
  const { logs, isLogsLoading } = useLogs();

  const visibleColumns = LOGS_COLUMNS.map(i => i.value);

  const columnMapping = LOGS_COLUMNS.reduce((acc, el) => {
    acc[el.value] = el.label;

    return acc;
  }, {});

  const columnWidths = {
    linkToErrorFile: '100px'
  };

  return (
    <Pane
      data-test-sets-not-found
      defaultWidth={FILL_PANE_WIDTH}
      paneTitle={<FormattedMessage id="ui-oai-pmh.settings.logs.title" />}
    >
      <Row>
        <Col xs={12}>
          <Headline size="large" margin="small">
            <FormattedMessage id="ui-oai-pmh.settings.logs.head" />
          </Headline>
        </Col>
      </Row>
      <Row center>
        <Col xs={12}>
          {isLogsLoading ? (
            <Layout element="div" className="display-flex centerContent">
              <Loading size="large" />
            </Layout>
          ) : (
            <MultiColumnList
              contentData={logs?.requestMetadataCollection}
              columnMapping={columnMapping}
              visibleColumns={visibleColumns}
              formatter={logsFormatter}
              columnWidths={columnWidths}
            />
          )}
        </Col>
      </Row>
    </Pane>
  );
};

export default Logs;
