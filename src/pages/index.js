import React from 'react';
import { connect } from 'dva';
import styles from './index.less';
import Home from './home/page'

function IndexPage() {
  return (
    <div className={styles.normal}>
      hello
      <Home />
    </div>
  );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
