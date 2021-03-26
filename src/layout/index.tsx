import React from 'react'
import { Layout, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';
import './style.scss'
import {menus} from  './siederMenus'
import { withRouter } from 'react-router-dom'

const { Header, Sider, Content } = Layout;

class AmstLayout extends React.Component <any,any>{
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    if(this.props.location.pathname === '/login'){
      return (
        <>
          {
            this.props.children
          }
        </>
      )
    }else{
      return (
        <Layout className={`amst-layout`}>
          <Sider trigger={null} collapsible collapsed={this.state.collapsed} style={{height:"100%"}}>
            <div className="logo" />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={[this.props.location.pathname]} onSelect={(item)=>{
              
            }}>
              {
                menus.map(item => (
                  <Menu.Item key={item.key} icon={<item.icon />} onClick={()=>{
                    this.props.history.push(item.url)
                  }}>
                      {item.name}
                </Menu.Item>
                ))
              }
            </Menu>
          </Sider>
          <Layout className="site-layout">
            <Header className="site-layout-background" style={{ padding: 0 }}>
              <div className="trigger" onClick={this.toggle}>
                {
                  this.state.collapsed  ?
                  <MenuUnfoldOutlined/> : 
                  <MenuFoldOutlined/>
                }
              </div>
            </Header>
            <Content
              className="site-layout-background"
              style={{
                margin: '24px 16px',
                padding: 24,
                minHeight: 280,
                overflow:"auto"
              }}
            >
              {
                this.props.children
              }
            </Content>
          </Layout>
        </Layout>
      );
    }

  }
}

export default withRouter(AmstLayout)
