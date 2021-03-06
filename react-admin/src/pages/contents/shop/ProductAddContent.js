import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from "react-router-dom";
import {bindActionCreators} from "redux";
import WithContentLoadingHOC from "../../../components/WithContentLoadingHOC";
import {Button, Cascader, Form, Input, InputNumber, Result, message, notification, Radio} from "antd";
import PicUpload from "../../../components/PicUpload";
import {httpAddProduct} from "../../../data/http/HttpRequest";
import {addProduct} from "../../../data/redux/reducers/shop/ProductActionCreator";

class ProductAddContent extends Component {

    form = React.createRef();

    goToCategoryAdding = (e) => {
        this.props.history.push("/shop/categoryEdit");
    };

    onChange = (e) => {

    };
    onFinish = (e) => {
        httpAddProduct(e,(response)=>{
            this.form.current.resetFields();
            console.log(response);
            this.props.addProduct(response.data);
            notification.success({message:"添加商品成功!"});
        },fail=>{
            message.error(fail.message);
        });
    };



    render() {
        if (this.props.categoryTreeData.length === 0)
            return (<Result
                status="warning"
                title="提示"
                subTitle="请先添加种类,再添加商品"
                extra={<Button type="primary" onClick={this.goToCategoryAdding}>去添加种类</Button>}
            />);
        return (
            <div>
                <Form
                    scrollToFirstError={true}
                    labelAlign={"right"}
                      labelCol={{
                          xs: {span: 4, offset: 1},
                          sm: {span: 4, offset: 2},
                          md: {span: 4, offset: 6},
                          lg: {span: 2, offset: 7}
                      }}
                      wrapperCol={{
                          xs: {span: 18, offset: 0},
                          sm: {span: 16, offset: 0},
                          md: {span: 8, offset: 0},
                          lg: {span: 8, offset: 0}
                      }}
                    ref={this.form}

                    name="nest-messages" onFinish={this.onFinish}>
                    <Form.Item name={'name'} label="商品名称" rules={[{required: true}]}>
                        <Input/>
                    </Form.Item>

                    <Form.Item name={'price'} label="价格" initialValue={0}
                               rules={[{type: 'number', min: 0, max: 999999}]}>
                        <InputNumber/>
                    </Form.Item>
                    <Form.Item name={'quantity_remaining'} label="库存" initialValue={99}
                               rules={[{type: 'number', min: 0, max: 999999}]}>
                        <InputNumber/>
                    </Form.Item>
                    <Form.Item name={'priority'} label="排名" initialValue={1} extra={"数值越小 排名越靠前 最小值为0  最大值为 999999"}
                               rules={[{type: 'number', min: 0, max: 999999}]}>
                        <InputNumber placeholder={"商品排名"}/>
                    </Form.Item>

                    <Form.Item name={['categoryIds']} label="种类" extra={"商品种类, 目前仅支持单层级"} rules={[{required: true}]}>
                        <Cascader showSearch={{matchInputWidth: true}} options={this.props.categoryTreeData}
                                  onChange={this.onChange} placeholder="请选择种类"/>
                    </Form.Item>
                    <Form.Item name={'weight'} label="重量(克)" extra={"商品重量, 可不填"}
                               rules={[{type: 'number', min: 0, max: 999999}]}>
                        <InputNumber placeholder={"商品重量"}/>
                    </Form.Item>
                    <Form.Item name={'status'} label="商品状态"  initialValue={"IN_STOCK"}
                               rules={[{required: true}]}>
                        <Radio.Group>
                            <Radio.Button value="IN_STOCK">上架商品</Radio.Button>
                            <Radio.Button value="OUT_OF_STOCK">下架商品</Radio.Button>
                        </Radio.Group>

                    </Form.Item>
                    <Form.Item name={['description']} label="描述" rules={[{required: true}]}>
                        <Input.TextArea rows={4}/>
                    </Form.Item>
                    <Form.Item label="图片上传" name={['imgs']}  valuePropName={'imgIdList'}
                               trigger={'imgIdList'} extra={"默认第一张会作为封面"}
                               hasFeedback={true}
                               rules={[{required: true, message: '请至少上传一张图片'}]}>
                        <PicUpload />
                    </Form.Item>


                    <Form.Item wrapperCol={{xs: {offset: 5}, sm: {offset: 6}, md: {offset: 10}, lg: {offset: 9}}}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}


const mapDispatch = (dispatch, ownProps) => {
    return bindActionCreators({
        addProduct
    }, dispatch);
}

export default withRouter(connect(null, mapDispatch)(WithContentLoadingHOC(ProductAddContent)));