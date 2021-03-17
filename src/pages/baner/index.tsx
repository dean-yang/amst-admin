import { Image, message } from 'antd';
import {useState,useEffect} from 'react'
import {Button,Modal,Form,Input,Upload} from 'antd'
import api from '../../api'
import fetch from '../../services/axios'

function Banner(props:any) {
    const [form] = Form.useForm();
    const [visible,setVisible] = useState(false)
    const [type,setType] = useState(false)
    const [data,setData] = useState([])
    const  getBanner = ()=>{
        fetch.post(api.getbanner,{}).then((res:any) => {
            setData(res.data)
        })
    }
    useEffect(()=>{
        getBanner()
    },[])
    const onFinish = (value:any)=>{
        if(type){
            fetch.post(api.updatebanner,value).then(()=>{
                message.success('修改成功')
                setVisible(false)
                getBanner()
            })
        }else{
            fetch.post(api.setbanner,value).then(()=>{
                message.success('插入成功')
                setVisible(false)
                getBanner()
            })
        }
    }
    const addUpdate = (flag:boolean,updateList?:any)=>{
        setVisible(true)
        setType(flag)
        if(flag){
            form.setFieldsValue(updateList)
        }
    }
    const clickHandlerDelte = (item:any)=>{
        fetch.post(api.deletebanner,item).then(()=>{
            message.success('删除成功')
            getBanner()
        })
    }
    return (
        <div >
            <Button onClick={()=>addUpdate(false)} type="primary" size={'large'} style={{margin:"0 auto",display:'block',marginBottom:"20px",}}>
                添加
            </Button>
            <div>
            {
                data.map((item:any) => (
                    <div
                    key={item.banner_id}
                    style={{display:"flex",justifyContent:"center",alignItems:"center"}}
                    >
                    <Image
                        width={720}
                        height={200}
                        src={item.banner_src}
                        alt={item.banner_name}
                    />
                        <Button onClick={()=>addUpdate(true,item)}  type="primary" style={{margin:"0 10px"}}>
                            修改
                        </Button>
                        <Button onClick={()=>clickHandlerDelte(item)}  style={{margin:"0 10px"}} type="primary" danger >
                            删除
                        </Button>
                    </div>
                    
                ))
            }
            </div>
           
            <Modal
                visible={visible}
                title={`${type ? '修改banner' : '添加banner'}`}
                onCancel={()=>{
                    setVisible(false)
                }}
                footer={false}
                destroyOnClose
            >

            <Form  name="control-ref" onFinish={onFinish} form={form} preserve={false}>


                 {
                        type && <Form.Item
                                    name={'banner_id'}
                                    label={'id'}
                                    rules={[{required: true,message:"无id不能修改"}]}
                                >
                         <Input disabled/>
                     </Form.Item>
                    }


                    <Form.Item 
                    name="banner_name" 
                    label="banner名称" 
                    rules={[{ required: true,message:"请填写分类名称" }]}>
                    <Input />
                    </Form.Item>
                    <Form.Item
                        label="图片地址"
                        name="banner_src"
                        rules={[{ required: true, message: '请上传图片' }]}
                    >
                        <Input disabled placeholder={`图片不能超过2m`}/>

                    </Form.Item>
                    <Form.Item>
                    <Upload 
                            accept={'image/png, image/jpeg, image/jpg'}
                            action={'http://47.108.200.61:3000/admin/uploadImg/banner'}
                            name="file"
                            method={'post'}
                            onChange={(info:any)=>{
                                if(info.file.status === 'done' && info.file.response){
                                    form.setFieldsValue({banner_src:info.file.response.data.url})
                                }  else if(info.file.status === 'removed'){
                                    form.setFieldsValue({ banner_src:''});
                                } 
                            }}
                            maxCount={1}
                            listType={'picture'}
                        >
                            <Button >上传图片</Button>
                    </Upload>
                    </Form.Item>
                    <Form.Item  >
                        <Button type="primary" htmlType="submit">
                        Submit
                        </Button>
                    </Form.Item>
                    </Form>

            </Modal>
        </div>
    )
}

export default Banner
