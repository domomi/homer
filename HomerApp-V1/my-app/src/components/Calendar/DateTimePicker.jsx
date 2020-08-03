import React, { useState } from 'react';
import DateTimePicker from 'react-datetime-picker';
import $ from 'jquery'

const ENDPOINT = 'http://localhost:443'

export default function DateTimePickerPage() {


  const [value, onChange] = useState(new Date());

    
  
  return (
    <div>
      <DateTimePicker
        onChange={onChange}
        value={value}
        
      />
    </div>
  );
}