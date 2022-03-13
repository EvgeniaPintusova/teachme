import React from 'react';

export default ({ onChange, value, className, src, placeholder, type, name=type, children, pattern='.*' }) => (
    <div className={className}>
        <img src={src} alt={type} />
        <input type={type} name={name} pattern={pattern} required placeholder={placeholder} value={value} onChange={onChange}/>
        {children}
    </div>
)
