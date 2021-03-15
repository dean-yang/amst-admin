import './style.scss';
import {Spin} from 'antd';
import * as React from "react";
import ReactDOM from "react-dom";
import {
    LoadingOutlined
} from '@ant-design/icons'
const antIcon =  <LoadingOutlined className={`gym-loading-icon translate_c`}
                      style={{ fontSize: '32px' }} spin/>


class Loading {
    static tagsCount = 0;
    static show(){
        let loadingWraper = document.getElementById('gym-loading');
        if(loadingWraper){
            loadingWraper.setAttribute("class","show");
        }else{
            loadingWraper = document.createElement('div');
            loadingWraper.setAttribute("id","gym-loading");
            loadingWraper.setAttribute("class","show");
            ReactDOM.render(<Spin indicator={antIcon}/>,loadingWraper)
            document.body.appendChild(loadingWraper);
        }

    };
    static close(){
        let loadingWraper = document.getElementById('gym-loading');
        if(loadingWraper){
            loadingWraper.classList.remove("show");
            loadingWraper.setAttribute("class","hide");
        }
    };
    static add(){
        this.tagsCount++;
        this.show();
    };
    static remove(){
        this.tagsCount--;
        if(this.tagsCount > 0){
            return false;
        }else{
            this.close();
            return true;
        }
    };
}

export {Loading}