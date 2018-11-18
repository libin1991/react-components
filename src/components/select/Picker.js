import React from 'react';
import Popup from '../popup'
import PropTypes from 'prop-types'
import { Checkbox, CheckboxGroup} from '../checkbox'

class Picker extends React.Component {
  static propTypes = {
    open: PropTypes.bool,
    cancelText: PropTypes.string,
    confirmText: PropTypes.string,
    title: PropTypes.string,
    max: PropTypes.number,
    onClose: PropTypes.func,
    onChange: PropTypes.func
  }
  static defaultProps = {
    confirmText: '确定',
    cancelText: '取消'
  }
  constructor (props) {
    super(props)
    this.state = {
      value: this.props.value,
      open: this.props.open
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleConfirm = this.handleConfirm.bind(this)
    this.handleAfterClose = this.handleAfterClose.bind(this)
  }
  componentDidMount () {
    this.setState({open: true})
  }
  render () {
    let {children, max, title, cancelText, confirmText, fastClose, direction} = this.props
    let Checkboxs = React.Children.map(children, (item, index) => {
      return (
        <Checkbox
          value={item.props.value}
          key={index}
          disabled={item.props.disabled}
          label={item.props.label}
          >
          {item.props.children}
        </Checkbox>
      )
    })
    let myTitle = title
    if (max > 1 && this.state.value.length >= max) {
      myTitle = `选项不能超过${max}个`
    }
    return (
      <Popup open={this.state.open} fastClose={fastClose} onClose={this.handleCancel} onAfterClose={this.handleAfterClose} direction={direction}
        className="vx-select--picker"
        header={
          max !== 1 ? <div style={{}} className="vx-flexbox vx-option-picker--header">
            <button type="button" className="vx-option-picker--cancel" onClick={this.handleCancel}>{cancelText}</button>
            <button type="button" className="vx-flexbox--item vx-option-picker--placeholder">{myTitle}</button>
            <button type="button" disabled={!this.state.value.length} className="vx-option-picker--confirm" onClick={this.handleConfirm}>{confirmText}</button>
          </div> : undefined
        }
        >
        <div className="vx-option-picker--wrapper">
          <div className="vx-option-picker">
            <CheckboxGroup max={max} onChange={this.handleChange} value={this.state.value}>
              {Checkboxs}
            </CheckboxGroup>
          </div>
        </div>
      </Popup>
    );
  }
  handleChange (value) {
    if (this.props.max === 1) {
      this.onChange(value[0])
    }
    this.setState({
      value
    })
  }
  handleCancel () {
    this.setState({
      open: false
    })
  }
  handleAfterClose () {
    this.props.onClose && this.props.onClose()
  }
  handleConfirm () {
    this.onChange(this.state.value)
  }
  onChange (value) {
    this.setState({
      open: false
    }, () => {
      this.props.onChange && this.props.onChange(value)
    })
  }
}

export default Picker;
