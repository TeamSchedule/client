import React, { useState } from 'react';


export default function useForceUpdate(){
    const [value, setValue] = useState(true);
    return () => setValue(value => !value);
}
