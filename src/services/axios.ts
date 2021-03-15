import axios from 'axios'
import {message} from  'antd'
import {Loading} from '../components/loading'


const instance = axios.create({
    baseURL: 'http://47.108.200.61:3000/admin/',
    timeout: 20000,
    headers: {'token': localStorage.getItem('token')}
});

class fetch {
    static async post (url:string,params:{[propsName:string]:any}){
      Loading.add()
      return new Promise((resolve,reject)=>{
        instance.post(url,params).then(res => {
          Loading.remove()
          if(res.data.code === 0){
              window.location.href = '/login'
              message.error('登陆失效，请重新登陆')
          }else if (res.data.code === 1){
              return resolve(res.data)
          }else if(res.data.code === 2){
            message.error(res.data.message)
          }
          return reject()
        }).catch(err => {
          Loading.remove()
          message.error('sorryy,出现一个小问题')
          throw err
        })
      })
      
    }
}
export default fetch
