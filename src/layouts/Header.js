import { Menu, Icon } from 'antd';
import Link from 'umi/link';
import styles from './header.less';

function Header({ location }) {
  return (
    <div className={styles.menu}>
      <Menu
        selectedKeys={[location.pathname]}
        mode="horizontal"
        theme="dark"
      >
        <Menu.Item key="/">
          <Link to="/"><Icon type="home" />Home</Link>
        </Menu.Item>
        <Menu.Item key="/codes">
          <Link to="/codes"><Icon type="code" />Money</Link>
        </Menu.Item>
        <Menu.Item key="/users">
          <Link to="/users"><Icon type="bars" />Users</Link>
        </Menu.Item>
        <Menu.Item key="/me">
          <a href="https://github.com/JosonKing" target="_blank">me</a>
        </Menu.Item>
      </Menu>
    </div>
  );
}

export default Header;
