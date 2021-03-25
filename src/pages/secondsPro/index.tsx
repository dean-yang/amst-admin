import {Form,Table,Input,Button,Image,Modal,Select,Upload, message} from 'antd'
import {useState,useEffect} from 'react'
import fetch from '../../services/axios'
import api from '../../api'


function SecondsPro() {
    const [form] = Form.useForm();
    const [visible,setVisible] = useState(false)
    const [type,setType] = useState(false)
    const [firstClass,setFirstClass] = useState([])
    const [dataSouce,setDataSouce] = useState([])
    const [pageNo,setPageNo] = useState(0)
    const [pageSize,setPageSize] = useState(10)
    useEffect(() => {
        getfirstClassification()
        getsecondClassification()
    }, [])
    const getfirstClassification = ()=>{
        fetch.post(api.getfirstClassification,{}).then((res:any)=>{
            setFirstClass(res.data)
        })
    }
    const getsecondClassification = ()=>{
        fetch.post(api.getsecondClassification,{pageNo,pageSize}).then((res:any)=>{
            setDataSouce(res.data)
        }) 
    }
    const columns = [
        {
            title:"关联一级分类id",
            dataIndex:"first_classification_id",
        },{
            title:"关联一级分类名字",
            dataIndex:"first_classification_name",
        },{
            title:"id",
            dataIndex:"second_classification_id",
        },{
            title:"产品名字",
            dataIndex:"second_classification_name",
        },{
            title:"产品图片",
            dataIndex:"second_classification_image_url",
            render:(text:string) => (
                <Image src={text} width={100} height={100}/>
            )
        },{
            title:"操作",
            dataIndex:"caozuo",
            render:(text:any,record:any)=>{
                return (
                    <div>
                        <Button type="primary" size="small" style={{margin:"0 5px"}} onClick={()=>clickHandlerUpdate(record)}>修改</Button>
                        <Button type="primary" size="small" danger style={{margin:"0 5px"}} onClick={()=>clickHandleDelete(record)}>删除</Button>
                    </div>
                )
            }
        }
    ]
    const clickHandlerUpdate = (record:any)=>{
        setType(true)
        setVisible(true)
        form.setFieldsValue(record)
    }
    const  clickHandleDelete = (record:any)=>{
        fetch.post(api.deletesecondClassification,record).then(()=>{
            message.success('删除成功')
            getsecondClassification()
        })
    }
    const onFinish = (value:any) => {
        if(type){
            fetch.post(api.updatesecondClassification,value).then(()=>{
                getsecondClassification()
                message.success('修改成功')
                setVisible(false)
            })
        }else{
            fetch.post(api.setsecondClassification,value).then(() => {
                getsecondClassification()
                message.success('插入成功')
                setVisible(false)
            })
        }
    }
    return (
        <div>
            <Button type="primary" onClick={()=>{
                    setVisible(true)
                    setType(false)
                }} >添加</Button>
            <Table columns={columns} dataSource={dataSouce} rowKey={`second_classification_id`}/>
            <Modal
                visible={visible}
                title={`${type ? '修改产品' : '添加产品'}`}
                onCancel={()=>{
                    setVisible(false)
                }}
                footer={false}
                destroyOnClose
            >
                <Form  name="control-ref" onFinish={onFinish} form={form} preserve={false}>
                    {
                        type  &&    <Form.Item 
                                        name="second_classification_id" 
                                        label="id" 
                                        rules={[{ required: true,message:"无id不可修改" }]}>
                                        <Input disabled/>
                                    </Form.Item>
                        
                    }
                    <Form.Item
                        label="一级分类"
                        name="first_classification_id"
                        rules={[{ required: true, message: '必须选择一级分类' }]}
                    >
                        <Select
                            allowClear
                            placeholder={`请选择一级分类`}
                        >
                            {
                                firstClass.map((item:any)=>(
                                    <Select.Option value={item.first_classification_id} key={item.first_classification_id}>
                                        {
                                            item.first_classification_name
                                        }
                                    </Select.Option>
                                ))
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item 
                    name="second_classification_name" 
                    label="产品名称" 
                    rules={[{ required: true,message:"请填写产品名称" }]}>
                    <Input />
                    </Form.Item>
                    <Form.Item
                        label="图片地址"
                        name="second_classification_image_url"
                        rules={[{ required: true, message: '请上传图片' }]}
                    >
                        <Input disabled placeholder={`图片不能超过2m`}/>

                    </Form.Item>
                    <Form.Item>
                    <Upload 
                            accept={'image/png, image/jpeg, image/jpg'}
                            action={'http://47.108.200.61:3000/admin/uploadImg'}
                            name="file"
                            method={'post'}
                            onChange={(info:any)=>{
                                if(info.file.status === 'done' && info.file.response){
                                    form.setFieldsValue({second_classification_image_url:info.file.response.data.url})
                                }  else if(info.file.status === 'removed'){
                                    form.setFieldsValue({ second_classification_image_url:''});
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
export default SecondsPro
