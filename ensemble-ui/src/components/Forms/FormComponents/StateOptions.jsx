import React from "react";

const states = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS',
  'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH',
  'OK', 'OR', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'VI', 'WA', 'WV', 'WI', 'WY']

/**
 *
 * @returns {JSX.Element} a list of <option> tags with values set to each 2-letter state/territory abbreviation
 * @constructor
 */
export default function StateOptions() {
  return(
    <>
      {/* length will be one more than the maximum index, so it won't be a key for any other options */}
      <option key={states.length}>Select a state...</option>
    {
    states.map( (stateAbbreviation, index) => (
        <option key={index} value={stateAbbreviation} children={stateAbbreviation}/>
    ))}
    </>
  );
}
