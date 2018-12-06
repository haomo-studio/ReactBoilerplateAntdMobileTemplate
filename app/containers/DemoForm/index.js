/**
 *
 * DemoForm
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import styled from 'styled-components';

import injectReducer from 'utils/injectReducer';
import {
  List,
  InputItem,
  Picker,
  DatePicker,
  TextareaItem,
  Button,
  Modal,
  Toast,
} from 'antd-mobile';
import { createForm } from 'rc-form';
import makeSelectDemoForm from './selectors';
import reducer from './reducer';

const Form = styled.form`
  margin-bottom: 1em;
`;

const maxDate = new Date();

const sexuals = [
  [
    {
      label: '男',
      value: '男',
    },
    {
      label: '女',
      value: '女',
    },
  ],
];

/* eslint-disable react/prefer-stateless-function */
export class DemoForm extends React.PureComponent {
  state = {
    name: null,
    sexual: ['男'],
    birthday: null,
    email: null,
    mobile: null,
    description: null,
    showSubmitModalStatus: false,
  };

  /**
   * 提交表单
   */
  onSubmit = () => {
    console.log(this.state);
    if (!this.validateMobile(this.state.mobile)) {
      return false;
    }

    if (!this.validateEmail(this.state.email)) {
      return false;
    }

    this.setState({
      showSubmitModalStatus: true,
    });
  };

  onReset = () => {
    this.props.form.resetFields();
    this.setState({
      name: null,
      sexual: ['男'],
      birthday: null,
      email: null,
      mobile: null,
      description: null,
      showSubmitModalStatus: false,
    });
  };

  /**
   * 关闭弹出框。key为弹出框的显示状态值
   * @param key
   * @returns {Function}
   */
  onClose = key => () => {
    this.setState({
      [key]: false,
    });
  };

  /**
   * 验证手机号
   * @param value
   */
  validateMobile = value => {
    const regex = /^((\+)?86|((\+)?86)?)0?1[3458]\d{9}$/;
    if (value) {
      // 使用正则表达式变量的test方法进行校验
      if (regex.test(value)) {
        return true;
      }
    }
    // 这里的callback函数会报错

    Toast.fail('请输入正确的手机号码！');
    return false;
  };

  /**
   * 验证邮箱
   * @param value
   * @returns {boolean}
   */
  validateEmail = value => {
    let regex = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
    if (value) {
      // 使用正则表达式变量的test方法进行校验
      if (regex.test(value)) {
        return true;
      }
    }
    Toast.fail('请输入正确的邮箱！');
    return false;
  };

  render() {
    const { getFieldProps, getFieldError } = this.props.form;

    return (
      <div>
        <Helmet>
          <title>DemoForm</title>
          <meta name="description" content="Description of DemoForm" />
        </Helmet>

        <Modal
          visible={this.state.showSubmitModalStatus}
          transparent
          maskClosable={false}
          onClose={this.onClose('showSubmitModalStatus')}
          title="提交成功"
          footer={[
            {
              text: '确认',
              onPress: () => {
                console.log('ok');
                this.onClose('showSubmitModalStatus')();
              },
            },
          ]}
          wrapProps={{ onTouchStart: this.onWrapTouchStart }}
        >
          <div style={{ height: 100, overflow: 'scroll' }}>提交成功！</div>
        </Modal>

        <Form>
          <List renderHeader={() => '添加个人信息'}>
            <InputItem
              placeholder="请输入名称"
              value={this.state.name}
              onChange={v => this.setState({ name: v })}
            >
              名称
            </InputItem>
            <Picker
              data={sexuals}
              title="性别"
              cascade={false}
              extra="请选择性别"
              value={this.state.sexual}
              onChange={v => this.setState({ sexual: v })}
              onOk={v => this.setState({ sexual: v })}
            >
              <List.Item arrow="horizontal">性别</List.Item>
            </Picker>
            <InputItem
              placeholder="请输入邮箱"
              value={this.state.email}
              onChange={v => this.setState({ email: v })}
            >
              邮箱
            </InputItem>
            <InputItem
              placeholder="请输入手机号"
              value={this.state.mobile}
              onChange={v => this.setState({ mobile: v })}
            >
              手机号
            </InputItem>
            <DatePicker
              mode="date"
              value={this.state.birthday}
              maxDate={maxDate}
              onChange={v => this.setState({ birthday: v })}
            >
              <List.Item arrow="horizontal">出生日期</List.Item>
            </DatePicker>
            <TextareaItem
              title="个人说明"
              placeholder="请输入个人说明（不超过300字）"
              rows={5}
              value={this.state.description}
              onChange={v => this.setState({ description: v })}
              autoHeight
            />

            <List.Item>
              <Button
                type="primary"
                size="small"
                inline
                onClick={this.onSubmit}
              >
                提交
              </Button>
              <Button
                size="small"
                inline
                style={{ marginLeft: '2.5px' }}
                onClick={this.onReset}
              >
                重置
              </Button>
            </List.Item>
          </List>
        </Form>
      </div>
    );
  }
}

DemoForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  demoForm: makeSelectDemoForm(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'demoForm', reducer });

export default compose(
  withReducer,
  withConnect,
)(createForm()(DemoForm));
