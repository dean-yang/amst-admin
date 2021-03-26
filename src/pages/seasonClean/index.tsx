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
    useEffect(() => {
        getsecondClassification()
        getchangeSeasonClean()
    }, [])
    const getsecondClassification = ()=>{
        fetch.post(api.getsecondClassification,{}).then((res:any)=>{
            setFirstClass(res.data.list)
        })
    }
    const getchangeSeasonClean = ()=>{
        fetch.post(api.getchangeSeasonClean,{}).then((res:any)=>{
            setDataSouce(res.data)
        }) 
    }
    const columns = [
        {
            title:"关联二级产品id",
            dataIndex:"second_classification_id",
        },{
            title:"关联二级产品名字",
            dataIndex:"second_classification_name",
        },{
            title:"id",
            dataIndex:"clean_changeSeason_id",
        },{
            title:"名字",
            dataIndex:"clean_changeSeason_name",
        },{
            title:"换季清洗图片",
            dataIndex:"clean_changeSeason_image_url",
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
        fetch.post(api.deletechangeSeasonClean,record).then(()=>{
            message.success('删除成功')
            getchangeSeasonClean()
        })
    }
    const onFinish = (value:any) => {
        if(type){
            fetch.post(api.updatechangeSeasonClean,value).then(()=>{
                getchangeSeasonClean()
                message.success('修改成功')
                setVisible(false)
            })
        }else{
            fetch.post(api.setchangeSeasonClean,value).then(() => {
                getchangeSeasonClean()
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
            <Table columns={columns} dataSource={dataSouce} rowKey={(record)=>record.clean_changeSeason_id}/>
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
                                        name="clean_changeSeason_id" 
                                        label="id" 
                                        rules={[{ required: true,message:"无id不可修改" }]}>
                                        <Input disabled/>
                                    </Form.Item>
                        
                    }
                    <Form.Item
                        label="二级产品"
                        name="second_classification_id"
                        rules={[{ required: true, message: '必须选择二级产品' }]}
                    >
                        <Select
                            allowClear
                            placeholder={`请选择二级产品`}
                        >
                            {
                                firstClass.map((item:any)=>(
                                    <Select.Option value={item.second_classification_id} key={item.second_classification_id}>
                                        {
                                            item.second_classification_name
                                        }
                                    </Select.Option>
                                ))
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item 
                    name="clean_changeSeason_name" 
                    label="名称" 
                    rules={[{ required: true,message:"请填写名称" }]}>
                    <Input />
                    </Form.Item>
                    <Form.Item
                        label="换季清洗图片地址"
                        name="clean_changeSeason_image_url"
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
                                    form.setFieldsValue({clean_changeSeason_image_url:info.file.response.data.url})
                                }  else if(info.file.status === 'removed'){
                                    form.setFieldsValue({ clean_changeSeason_image_url:''});
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
