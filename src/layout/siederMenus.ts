import {
    ProfileOutlined,
    SwitcherOutlined,
    FolderOpenOutlined
  } from '@ant-design/icons';

export const menus = [
    {
        key:'/firstPro',
        icon:FolderOpenOutlined,
        name:'一级分类管理',
        url:"/firstPro"
    },{
        key:'/secondsPro',
        icon:ProfileOutlined,
        name:'二级产品管理',
        url:"/secondsPro"
    },{
        key:'/banner',
        icon:SwitcherOutlined,
        name:"banner管理",
        url:"/banner"
    },{
        key:'/catefullyChosen',
        icon:SwitcherOutlined,
        name:"精选管理",
        url:"/catefullyChosen"
    }
]