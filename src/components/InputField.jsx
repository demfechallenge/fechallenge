import React from 'react'
import { string, bool, func } from 'prop-types'

const PropTypes = {
    dataKey: string.isRequired,
    label: string.isRequired,
    value: string.isRequired,
    isEditing: bool.isRequired,
    onChange: func.isRequired
};

class InputField extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: props.value
        }
    }

    handleChange = (value) => {
        this.setState({ value })
        this.props.onChange(value)
    }

    render() {
        const {
            dataKey,
            label,
            isEditing
        } = this.props

        return (
        <div className="form-group row">
            <label htmlFor={dataKey} className="col-sm-4 col-form-label">{label}</label>
            <div className="col-sm-8">
              <input 
                type="text" 
                readOnly={!isEditing}
                className={`form-control${isEditing ? '' : '-plaintext'}`}
                id={dataKey}
                value={this.state.value}
                onChange={(e) => this.handleChange(e.target.value)}
                />
            </div>
        </div>
        )
    }
}

InputField.propTypes = PropTypes

export default InputField
