import { connect } from 'dva';
import { Table, Pagination, Popconfirm, Button } from 'antd';
import { routerRedux } from 'dva/router';
import styles from './Codes.css';
import { PAGE_SIZE } from '../constants';
import CodeModal from './CodeModal';

function Codes({ dispatch, list: dataSource, loading, total, page: current }) {
  function deleteHandler(id) {
    dispatch({
      type: 'codes/remove',
      payload: id,
    });
  }

  function pageChangeHandler(page) {
    dispatch(routerRedux.push({
      pathname: '/codes',
      query: { page },
    }));
  }

  function editHandler(id, values) {
    dispatch({
      type: 'codes/patch',
      payload: { id, values },
    });
  }

  function createHandler(values) {
    dispatch({
      type: 'codes/create',
      payload: values,
    });
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <a href="">{text}</a>,
    },
    {
      title: 'money',
      dataIndex: 'money',
      key: 'money',
    },
    {
      title: 'use',
      dataIndex: 'use',
      key: 'use',
    },
    {
      title: 'invoice',
      dataIndex: 'invoice',
      key: 'invoice',
    },
    {
      title: 'date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'remark',
      dataIndex: 'remark',
      key: 'remark',
    },
    {
      title: 'Operation',
      key: 'operation',
      render: (text, record) => (
        <span className={styles.operation}>
          <CodeModal record={record} onOk={editHandler.bind(null, record.id)}>
            <a>Edit</a>
          </CodeModal>
          <Popconfirm title="Confirm to delete?" onConfirm={deleteHandler.bind(null, record.id)}>
            <a href="">Delete</a>
          </Popconfirm>
        </span>
      ),
    },
  ];

  return (
    <div className={styles.normal}>
      <div>
        <div className={styles.create}>
          <CodeModal record={{}} onOk={createHandler}>
            <Button type="primary">Create Code</Button>
          </CodeModal>
        </div>
        <Table
          loading={loading}
          columns={columns}
          dataSource={dataSource}
          rowKey={record => record.id}
          pagination={false}
        />
        <Pagination
          className="ant-table-pagination"
          total={total}
          current={current}
          pageSize={PAGE_SIZE}
          onChange={pageChangeHandler}
        />
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  const { list, total, page } = state.codes;
  return {
    list,
    total,
    page,
    loading: state.loading.models.codes,
  };
}

export default connect(mapStateToProps)(Codes);
