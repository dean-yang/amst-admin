import {Table,Image, Button, Modal,Form,Input,Upload,message} from 'antd'
import { FormInstance } from 'antd/lib/form';
import React, { Component } from 'react'
import api from '../../api' 
import fetch from '../../services/axios'

class FirstClass extends Component<any,any> {
    formRef = React.createRef<FormInstance>();
    constructor(props:any){
        super(props)
        this.state = {
            dataSouce:[],
            visible:false,
            type:false  // false 新增  true 修改
        } 
    }
    columns = [
        {
            title:"id",
            dataIndex:"first_classification_id",
        },{
            title:"分类名字",
            dataIndex:"first_classification_name",
        },{
            title:"分类图片",
            dataIndex:"first_classification_image_url",
            render:(text:string) => (
                <Image src={text} width={100} height={100}/>
            )
        },{
            title:"操作",
            dataIndex:"caozuo",
            render:(text:any,record:any)=>{
                return (
                    <div>
                        <Button type="primary" size="small" style={{margin:"0 5px"}} onClick={()=>this.clickHandlerUpdate(record)}>修改</Button>
                        <Button type="primary" size="small" danger style={{margin:"0 5px"}} onClick={()=>this.clickHandleDelete(record)}>删除</Button>
                    </div>
                )
            }
        }
    ]

    clickHandlerUpdate = (record:any)=>{
        this.setState({
            visible:true,
            type:true
        },()=>{
            this.formRef.current!.setFieldsValue(record)
        })
    }

    clickHandleDelete = (record:any) => {
        const {first_classification_id} = record
        fetch.post(api.deletefirstClassification,{first_classification_id}).then(()=>{
            message.success('删除成功')
            this.setState({
                visible:false
            },this.getfirstClassification)
        })
    }
    getfirstClassification(){
        fetch.post(api.getfirstClassification,{}).then((res:any)=>{
            this.setState({
                dataSouce:res.data
            })
        })
    }
    onFinish = (value:any)=>{
        const {
            type
        } = this.state
        if(type){
            fetch.post(api.updatefirstClassification,value).then(()=>{
                message.success('修改成功')
                this.setState({
                    visible:false
                },this.getfirstClassification)
            })
        }else{
            fetch.post(api.setfirstClassification,value).then(()=>{
                message.success('插入成功')
                this.setState({
                    visible:false
                },this.getfirstClassification)
            })
        }
    }
    componentDidMount(){
        this.getfirstClassification()
    }
    render() {
        const {
            visible,
            dataSouce,
            type
        } = this.state
        return (
            <div>
                <Button type="primary" onClick={()=>{
                    this.setState({
                        visible:!visible,
                        type:false
                    })
                }} >添加</Button>
                <Table columns={this.columns} dataSource={dataSouce} rowKey={'first_classification_id'}/>
                <Modal
                    visible={visible}
                    footer={false}
                    onCancel={()=>{this.setState({visible:false})}}
                    title={'添加一级分类'}
                    destroyOnClose
                    
                >
                 <Form ref={this.formRef} name="control-ref" onFinish={this.onFinish} preserve={false}>
                    {
                        type && <Form.Item
                                    name={'first_classification_id'}
                                    label={'id'}
                                    rules={[{required: true,message:"无id不能修改"}]}
                                >
                         <Input disabled/>
                     </Form.Item>
                    }
                    <Form.Item 
                    name="first_classification_name" 
                    label="分类名称" 
                    rules={[{ required: true,message:"请填写分类名称" }]}>
                    <Input placeholder={`4字标题`} maxLength={4}/>
                    </Form.Item>
                    <Form.Item
                        label="图片地址"
                        name="first_classification_image_url"
                        rules={[{ required: true, message: '请上传图片' }]}
                    >
                        <Input disabled placeholder={`图片不能超过2m`}/>

                    </Form.Item>
                    <Form.Item>
                    <Upload 
                            accept={'image/png, image/jpeg, image/jpg'}
                            action={'http://47.108.200.61:3000/admin/uploadImg/firstClassImages'}
                            name="file"
                            method={'post'}
                            onChange={(info:any)=>{
                                if(info.file.status === 'done' && info.file.response){
                                    console.log(info.file.url)
                                    this.formRef.current!.setFieldsValue({
                                         first_classification_image_url: info.file.response.data.url,
                                    })
                                }  else if(info.file.status === 'removed'){
                                    this.formRef.current!.setFieldsValue({
                                        first_classification_image_url: '',
                                   })
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
}

export default  FirstClass


