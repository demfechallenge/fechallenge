import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/PropertyPage.css';
import Data from '../data.js';
import Logo from '../images/site-logo.svg';
import InputField from './InputField';
import { formatCurrency, formatLabel, formatDate, metersToMiles } from '../util/helpers';

class PropertyPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { data: Data, isEditing: false }
  }

  handleChange(key, value) {
    const propertyDetails = { ...this.state.data.propertyDetails }
    propertyDetails[key] = value
    this.setState({ propertyDetails })
  }

  render() {
    return (
      <div className='propertyPage container'>
        <div className='row header'>
          <div className='col'>
            <img className='siteLogo' src={Logo} alt='comehome logo' />
          </div>
          <div className='col'>
            <h3>{this.state.data.address.streetAddress}</h3>
          </div>
          <div className='col'>
            <h3>{formatCurrency(this.state.data.value)}</h3>
          </div>
        </div>
        <div className='row'>
          <img className='propertyPhoto placeHolder' src={this.state.data.photo} alt='Property' />
        </div>
        <div className='row title'>
          <h3>Property Info <button type="button" className="btn btn-link" onClick={() => this.setState({ isEditing: !this.state.isEditing })}>{this.state.isEditing ? 'Save' : 'Edit'}</button></h3>
        </div>

        <div className='row'>
          <form>
            <div className='columns'>
              {
                Object.keys(this.state.data.propertyDetails).map((key) => (
                  <InputField
                    dataKey={key}
                    label={formatLabel(key)}
                    value={this.state.data.propertyDetails[key]}
                    isEditing={this.state.isEditing}
                    onChange={(value) => this.handleChange(key, value)}
                  />
                ))
              }
            </div>
          </form>
        </div>
        <div className='row title'>
          <h3>Comparable Properties</h3>
        </div>
        <div className='row'>
          <div className='row comparablePropertiesContainer'>
            {
              this.state.data.comparableProperties.map((element) => (
                <div className='col-5 propertyCard'>
                  <div className='row'>
                    <div className='col-5'>
                      <img className='placeHolder' src={element.photo} alt='Property' />
                    </div>
                    <div className='col-7'>
                      <h5>{formatDate(element.soldDate)}</h5>
                      <h3>{formatCurrency(element.value)}</h3>
                      {element.soldAtAskingPrice ? 'Sold at asking price' : ''}
                    </div>
                  </div>
                  <div>
                    {element.address.streetAddress}<br />
                    {element.address.city}, {element.address.state} {element.address.zipcode}<br />
                    <br />
                    {element.livingSpace.bedrooms ? `${element.livingSpace.bedrooms} Bed | ` : ''}
                    {element.livingSpace.bathrooms ? `${element.livingSpace.bathrooms} Bath | ` : ''}
                    {element.livingSpace.livingArea ? `${element.livingSpace.livingArea.toLocaleString()} Sq Ft. | ` : ''}
                    {element.distanceFromSubjectMeters ? `${metersToMiles(element.distanceFromSubjectMeters)} miles away` : ''}
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    )
  }
}

export default PropertyPage;
