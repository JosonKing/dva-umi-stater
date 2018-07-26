import React from 'react';
import { connect } from 'dva';
import styles from './index.less';
import Home from './home/page'

function IndexPage() {
  return (
    <div className={styles.normal}>
      <h1>买买买，反正能报销</h1>
      <Home />
    </div>
  );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
